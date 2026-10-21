import "server-only";
import { cache } from "react";
import { postPath } from "@/cms/lib/paths";
import type { CodeSnippet, Footer, Navigation, Page, Post, SiteSetting } from "@/payload-types";
import type { PathMap } from "./links";
import { getPayloadClient, getPreviewContext } from "./payload";

/** Published page for a path, or the latest draft when an authenticated editor is previewing. */
export const getPage = cache(async (path: string): Promise<Page | null> => {
  const payload = await getPayloadClient();
  const preview = await getPreviewContext();
  const res = await payload.find({
    collection: "pages",
    where: { path: { equals: path } },
    draft: preview.draft,
    depth: 2,
    limit: 1,
    overrideAccess: false,
    user: preview.user ?? undefined,
  });
  return res.docs[0] ?? null;
});

/** True when a page record exists in any state (used to tell "unpublished" apart from "never migrated"). */
export const pageRecordExists = cache(async (path: string) => {
  const payload = await getPayloadClient();
  const { totalDocs } = await payload.count({ collection: "pages", where: { path: { equals: path } }, overrideAccess: true });
  return totalDocs > 0;
});

export const getPathMap = cache(async (): Promise<PathMap> => {
  const payload = await getPayloadClient();
  const [pages, posts] = await Promise.all([
    payload.find({ collection: "pages", limit: 1000, depth: 0, select: { path: true }, overrideAccess: true, pagination: false }),
    payload.find({ collection: "posts", limit: 1000, depth: 0, select: { slug: true }, where: { _status: { equals: "published" } }, overrideAccess: true, pagination: false }),
  ]);
  return {
    pages: new Map(pages.docs.map((p) => [String(p.id), p.path])),
    posts: new Map(posts.docs.map((p) => [String(p.id), p.slug])),
  };
});

export type SiteData = { settings: SiteSetting; navigation: Navigation; footer: Footer };

export const getSiteData = cache(async (): Promise<SiteData> => {
  const payload = await getPayloadClient();
  const [settings, navigation, footer] = await Promise.all([
    payload.findGlobal({ slug: "site-settings", depth: 1, overrideAccess: true }),
    payload.findGlobal({ slug: "navigation", depth: 1, overrideAccess: true }),
    payload.findGlobal({ slug: "footer", depth: 1, overrideAccess: true }),
  ]);
  return { settings, navigation, footer };
});

export const getPublishedPosts = cache(async (): Promise<Post[]> => {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    depth: 1,
    limit: 200,
    overrideAccess: false,
  });
  return res.docs;
});

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const payload = await getPayloadClient();
  const preview = await getPreviewContext();
  const res = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    draft: preview.draft,
    depth: 2,
    limit: 1,
    overrideAccess: false,
    user: preview.user ?? undefined,
  });
  return res.docs[0] ?? null;
});

export type RedirectHit = { destination: string; permanent: boolean };

export async function findRedirect(path: string): Promise<RedirectHit | null> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "redirects",
    where: { and: [{ from: { equals: path } }, { enabled: { equals: true } }] },
    depth: 1,
    limit: 1,
    overrideAccess: true,
  });
  const r = res.docs[0];
  if (!r) return null;
  let destination = r.destination ?? "";
  // Internal references are resolved at request time so they follow later URL changes of the target.
  if (r.to?.linkType === "internal" && r.to.doc && typeof r.to.doc.value === "object") {
    const v = r.to.doc.value as { path?: string; slug?: string; _status?: string };
    if (r.to.doc.relationTo === "pages" && v.path) destination = v.path;
    if (r.to.doc.relationTo === "posts" && v.slug) destination = postPath(v.slug);
  }
  if (!destination) return null;
  return { destination, permanent: r.statusCode !== "307" };
}

export const siteEnvironment = (): "production" | "staging" | "development" => {
  const env = process.env.NEXT_PUBLIC_SITE_ENV;
  if (env === "production") return "production";
  if (env === "development" || (!env && process.env.NODE_ENV === "development")) return "development";
  return "staging";
};

export const getCodeSnippets = cache(async (): Promise<CodeSnippet[]> => {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "code-snippets",
    where: { and: [{ enabled: { equals: true } }, { environments: { contains: siteEnvironment() } }] },
    depth: 0,
    limit: 100,
    overrideAccess: true,
    sort: "createdAt",
  });
  return res.docs;
});
