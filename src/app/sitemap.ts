import type { MetadataRoute } from "next";
import { postPath } from "@/cms/lib/paths";
import { sitemapEligiblePage } from "@/lib/cms/metadata";
import { getPayloadClient } from "@/lib/cms/payload";
import { absoluteUrl } from "@/lib/seo";
import { BLOG_ENABLED, IS_PRODUCTION, routes } from "@/lib/site";

const ORDER: string[] = Object.values(routes);

/** Published, indexable, self-canonical URLs only. Empty outside production (unchanged behaviour). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!IS_PRODUCTION) return [];
  const payload = await getPayloadClient();
  const [pages, posts] = await Promise.all([
    payload.find({ collection: "pages", where: { _status: { equals: "published" } }, depth: 0, limit: 1000, overrideAccess: false, pagination: false }),
    payload.find({ collection: "posts", where: { _status: { equals: "published" } }, depth: 0, limit: 1000, overrideAccess: false, pagination: false }),
  ]);
  const publishedPosts = posts.docs;
  const blogLive = BLOG_ENABLED && publishedPosts.length >= 3;
  const rank = (p: string) => (ORDER.includes(p) ? ORDER.indexOf(p) : ORDER.length);

  const pageEntries = pages.docs
    .filter((p) => sitemapEligiblePage(p, publishedPosts.length))
    .sort((a, b) => rank(a.path) - rank(b.path) || a.path.localeCompare(b.path))
    .map((p) => ({ url: absoluteUrl(p.path), lastModified: p.updatedAt }));

  const postEntries = blogLive
    ? publishedPosts
        .filter((p) => p.seo?.robotsIndex !== "noindex" && p.seo?.includeInSitemap !== false && !p.seo?.canonicalUrl)
        .map((p) => ({ url: absoluteUrl(postPath(p.slug)), lastModified: p.updatedAt }))
    : [];

  return [...pageEntries, ...postEntries];
}
