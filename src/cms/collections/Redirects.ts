import { APIError, type CollectionConfig, type PayloadRequest } from "payload";
import { isAdmin, staffOnly } from "../access";
import { linkFields } from "../fields/link";
import { auditStampFields } from "../fields/seo";
import { auditAfterChange, auditAfterDelete } from "../hooks/audit";
import { revalidateSite } from "../hooks/revalidate";
import { stampUser } from "../hooks/workflow";
import { normalizePath, postPath } from "../lib/paths";
import { checkRedirect } from "../lib/redirect-rules";

type LinkDoc = { relationTo: "pages" | "posts"; value: number | string | { id: number | string; path?: string; slug?: string } };

async function resolveDoc(req: PayloadRequest, doc: LinkDoc | undefined): Promise<string | null> {
  if (!doc) return null;
  const value = typeof doc.value === "object" ? doc.value : null;
  if (value?.path) return value.path;
  if (value?.slug) return postPath(value.slug);
  const id = value?.id ?? doc.value;
  const found = await req.payload.findByID({ collection: doc.relationTo, id: id as string, depth: 0, overrideAccess: true, req });
  if (!found) return null;
  return doc.relationTo === "pages" ? (found as { path: string }).path : postPath((found as { slug: string }).slug);
}

export async function livePaths(req: PayloadRequest) {
  const [pages, posts] = await Promise.all([
    req.payload.find({ collection: "pages", where: { _status: { equals: "published" } }, limit: 1000, depth: 0, overrideAccess: true, req, select: { path: true } }),
    req.payload.find({ collection: "posts", where: { _status: { equals: "published" } }, limit: 1000, depth: 0, overrideAccess: true, req, select: { slug: true } }),
  ]);
  return new Set<string>([...pages.docs.map((p) => p.path as string), ...posts.docs.map((p) => postPath(p.slug as string))]);
}

const siteHosts = () =>
  [process.env.NEXT_PUBLIC_SITE_URL, process.env.CMS_SERVER_URL, "https://topspotstudio.com", "https://www.topspotstudio.com"]
    .filter(Boolean)
    .map((u) => {
      try {
        return new URL(String(u)).hostname;
      } catch {
        return "";
      }
    })
    .filter(Boolean);

export const Redirects: CollectionConfig = {
  slug: "redirects",
  labels: { singular: "Redirect", plural: "Redirects" },
  admin: {
    group: "SEO",
    useAsTitle: "from",
    defaultColumns: ["from", "destination", "statusCode", "enabled", "reason", "updatedAt"],
    listSearchableFields: ["from", "url", "reason"],
    description:
      "Redirects apply immediately to URLs that do not match a live page (308 permanent / 307 temporary). Live pages cannot be redirected here; loops, chains and unsafe destinations are blocked.",
  },
  access: { read: staffOnly, create: staffOnly, update: staffOnly, delete: staffOnly },
  fields: [
    { name: "from", type: "text", required: true, unique: true, index: true, label: "Old path (source)", admin: { description: "e.g. /old-service-page/" } },
    { type: "group", name: "to", label: "Destination", admin: { hideGutter: true }, fields: linkFields() },
    { name: "destination", type: "text", admin: { readOnly: true, description: "Resolved destination (updated on save)." } },
    {
      type: "row",
      fields: [
        {
          name: "statusCode",
          type: "select",
          required: true,
          defaultValue: "308",
          options: [
            { label: "Permanent (308) — page has moved for good", value: "308" },
            { label: "Temporary (307) — short-term move", value: "307" },
          ],
          admin: { width: "60%" },
        },
        { name: "enabled", type: "checkbox", defaultValue: true, admin: { width: "40%" } },
      ],
    },
    { name: "reason", type: "textarea", required: true, label: "Reason / approval note" },
    ...auditStampFields,
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.from) data.from = normalizePath(String(data.from));
        return data;
      },
    ],
    beforeChange: [
      stampUser,
      async ({ data, req, originalDoc }) => {
        const to = data.to ?? originalDoc?.to ?? {};
        const destination = to.linkType === "internal" ? await resolveDoc(req, to.doc) : String(to.url ?? "");
        if (!destination) throw new APIError("Choose a destination page or enter a URL.", 400, undefined, true);
        data.destination = destination;
        if (data.enabled === false) return data;
        const all = await req.payload.find({ collection: "redirects", where: { enabled: { equals: true } }, limit: 2000, depth: 0, overrideAccess: true, req });
        const graph = new Map<string, string>();
        for (const r of all.docs) if (String(r.id) !== String(originalDoc?.id) && r.destination) graph.set(r.from as string, r.destination as string);
        const errors = checkRedirect(
          { from: data.from ?? originalDoc?.from, to: destination, external: /^https?:\/\//i.test(destination) },
          { livePaths: await livePaths(req), redirects: graph, siteHosts: siteHosts(), allowExternal: !req.user || isAdmin(req) },
        );
        if (errors.length) throw new APIError(errors.join(" "), 400, undefined, true);
        return data;
      },
    ],
    afterChange: [
      auditAfterChange("redirects"),
      async ({ doc, req }) => {
        await revalidateSite(req, `redirect ${doc.from}`);
        return doc;
      },
    ],
    afterDelete: [
      auditAfterDelete("redirects"),
      async ({ doc, req }) => {
        await revalidateSite(req, `redirect deleted ${doc.from}`);
        return doc;
      },
    ],
  },
};
