import { APIError, type CollectionConfig } from "payload";
import { adminField, adminOnly, isStaff, publishedOrStaff, staffOnly } from "../access";
import { pageBlocks } from "../blocks/page";
import { linkFields } from "../fields/link";
import { auditStampFields, pageSchemaGroup, seoGroup } from "../fields/seo";
import { auditAfterChange, auditAfterDelete } from "../hooks/audit";
import { affectsPublicSite, revalidateSite } from "../hooks/revalidate";
import { enforcePublishing, protectCodePages, stampUser } from "../hooks/workflow";
import { PAGE_TEMPLATES } from "../lib/options";
import { isReservedPath, isValidPagePath, normalizePath } from "../lib/paths";
import { previewUrl } from "../lib/preview";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "path", "template", "_status", "updatedAt", "updatedBy"],
    listSearchableFields: ["title", "path"],
    description: "Every public page of the website. Built-in pages keep their URL; edit their sections, SEO and structured data here.",
    preview: (doc) => previewUrl(String(doc?.path ?? "/")),
    pagination: { defaultLimit: 50 },
  },
  defaultPopulate: { title: true, path: true, template: true, caseStudyCard: true },
  versions: { drafts: { schedulePublish: false }, maxPerDoc: 50 },
  access: {
    read: publishedOrStaff,
    readVersions: staffOnly,
    create: staffOnly,
    update: staffOnly,
    delete: adminOnly,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "layout",
              type: "blocks",
              label: "Page sections",
              blocks: pageBlocks,
              admin: { description: "Add, reorder or remove sections. Each section matches an existing website component, so the design stays consistent." },
            },
          ],
        },
        {
          label: "Case study card",
          admin: { condition: (data) => data?.template === "caseStudy" },
          fields: [
            {
              name: "caseStudyCard",
              type: "group",
              label: "Card shown on the Case Studies hub",
              fields: [
                { name: "label", type: "text", label: "Card label (anonymised client description)" },
                { name: "title", type: "text", label: "Card heading" },
                { name: "summary", type: "textarea" },
                {
                  name: "metrics",
                  type: "array",
                  maxRows: 3,
                  fields: [{ type: "row", fields: [{ name: "value", type: "text", required: true }, { name: "label", type: "text", required: true }] }],
                },
              ],
            },
          ],
        },
        { label: "SEO", fields: [seoGroup()] },
        { label: "Structured data", fields: [pageSchemaGroup] },
        {
          label: "Settings",
          fields: [
            {
              name: "breadcrumbs",
              type: "array",
              label: "Breadcrumbs",
              admin: { description: "Shown above the H1 and output as BreadcrumbList schema. Leave the link empty for a plain-text crumb (e.g. Industries)." },
              fields: [
                { name: "label", type: "text", required: true },
                { name: "hasLink", type: "checkbox", label: "Link this crumb", defaultValue: true },
                { type: "group", name: "link", admin: { condition: (_, s) => Boolean(s?.hasLink) }, fields: linkFields({ required: false }) },
              ],
            },
          ],
        },
      ],
    },
    { name: "title", type: "text", required: true, label: "Page name", admin: { position: "sidebar" } },
    {
      name: "path",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "URL path",
      access: { update: ({ req, doc }) => isStaff(req) && doc?.routeType !== "code" },
      admin: {
        position: "sidebar",
        description: "Built-in pages keep their existing URL (read-only). New CMS pages: lower-case words separated by hyphens, ending with /.",
      },
    },
    {
      name: "routeType",
      type: "select",
      defaultValue: "cms",
      required: true,
      label: "Page type",
      options: [
        { label: "Built-in route (URL fixed in code)", value: "code" },
        { label: "CMS page", value: "cms" },
      ],
      access: { create: adminField, update: adminField },
      admin: { position: "sidebar" },
    },
    {
      name: "template",
      type: "select",
      required: true,
      defaultValue: "standard",
      options: [...PAGE_TEMPLATES],
      access: { update: adminField },
      admin: { position: "sidebar" },
    },
    ...auditStampFields,
  ],
  endpoints: [
    {
      path: "/:id/structured-data",
      method: "get",
      handler: async (req) => {
        if (!req.user) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const { buildPageJsonLd } = await import("../../lib/cms/structured-data");
        const id = req.routeParams?.id as string;
        const doc = await req.payload.findByID({ collection: "pages", id, draft: true, depth: 2, overrideAccess: false, req });
        return Response.json(await buildPageJsonLd(doc, { draft: true }));
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.path) data.path = normalizePath(data.path);
        return data;
      },
    ],
    beforeChange: [
      stampUser,
      enforcePublishing,
      async ({ data, originalDoc, req }) => {
        const path = String(data.path ?? originalDoc?.path ?? "");
        const routeType = data.routeType ?? originalDoc?.routeType;
        if (!isValidPagePath(path)) throw new APIError(`"${path}" is not a valid path. Use lower-case words and hyphens, e.g. /my-page/.`, 400, undefined, true);
        if (originalDoc?.routeType === "code" && originalDoc.path !== path) {
          throw new APIError("Built-in pages keep their existing URL. Changing it requires a code change and an approved redirect.", 400, undefined, true);
        }
        if (routeType === "cms") {
          if (isReservedPath(path) || path.startsWith("/blog/") || path === "/") {
            throw new APIError(`"${path}" is reserved by the website and cannot be used for a CMS page.`, 400, undefined, true);
          }
          const redirect = await req.payload.find({ collection: "redirects", where: { from: { equals: path }, enabled: { equals: true } }, limit: 1, overrideAccess: true, req, depth: 0 });
          if (redirect.totalDocs) throw new APIError(`"${path}" is currently redirected. Disable that redirect first.`, 400, undefined, true);
        }
        return data;
      },
    ],
    afterChange: [
      auditAfterChange("pages"),
      async ({ doc, previousDoc, req }) => {
        if (
          previousDoc?.path &&
          previousDoc.path !== doc.path &&
          previousDoc._status === "published" &&
          doc.routeType === "cms" &&
          !req.context?.skipAutoRedirect
        ) {
          await req.payload.create({
            collection: "redirects",
            req,
            overrideAccess: true,
            data: {
              from: previousDoc.path,
              to: { linkType: "internal", doc: { relationTo: "pages", value: doc.id } },
              statusCode: "308",
              enabled: true,
              reason: `Automatic: page URL changed from ${previousDoc.path} to ${doc.path}`,
            },
          });
        }
        if (affectsPublicSite(doc, previousDoc)) await revalidateSite(req, `page ${doc.path}`);
        return doc;
      },
    ],
    beforeDelete: [protectCodePages],
    afterDelete: [
      auditAfterDelete("pages"),
      async ({ doc, req }) => {
        await revalidateSite(req, `page deleted ${doc.path}`);
        return doc;
      },
    ],
  },
};
