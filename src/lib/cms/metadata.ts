import type { Metadata } from "next";
import type { Media, Page, Post } from "@/payload-types";
import { postPath } from "@/cms/lib/paths";
import { pageMetadata } from "@/lib/seo";
import { BLOG_ENABLED, PRIVACY_APPROVED, SITE_NAME } from "@/lib/site";

const mediaUrl = (m: number | Media | null | undefined) => (m && typeof m === "object" && m.url ? m.url : undefined);

type Seo = NonNullable<Page["seo"]>;

function titleFor(seo: Seo | undefined, fallback: string) {
  const base = seo?.metaTitle?.trim() || fallback;
  return seo?.appendBrand ? `${base} | ${SITE_NAME}` : base;
}

/** Pages whose indexability is also gated by an environment flag (unchanged from the pre-CMS behaviour). */
function envNoindex(page: Pick<Page, "template">, publishedPostCount: number) {
  if (page.template === "legal") return !PRIVACY_APPROVED;
  if (page.template === "blogHub") return !BLOG_ENABLED || publishedPostCount < 3;
  return false;
}

export function cmsPageMetadata(page: Page, { draft = false, publishedPostCount = 0 }: { draft?: boolean; publishedPostCount?: number } = {}): Metadata {
  const seo = page.seo ?? {};
  const title = titleFor(seo, page.title);
  const description = seo.metaDescription?.trim() || "";
  return pageMetadata({
    title,
    description,
    path: page.path,
    type: page.template === "caseStudy" ? "article" : "website",
    noindex: draft || seo.robotsIndex === "noindex" || envNoindex(page, publishedPostCount),
    nofollow: seo.robotsFollow === "nofollow",
    canonical: seo.canonicalUrl || undefined,
    ogImage: mediaUrl(seo.ogImage),
    ogTitle: seo.ogTitle || undefined,
    ogDescription: seo.ogDescription || undefined,
    twitterTitle: seo.twitterTitle || undefined,
    twitterDescription: seo.twitterDescription || undefined,
    twitterImage: mediaUrl(seo.twitterImage),
  });
}

export function cmsPostMetadata(post: Post, { draft = false }: { draft?: boolean } = {}): Metadata {
  const seo = post.seo ?? {};
  const title = seo.metaTitle?.trim() ? titleFor(seo, post.title) : `${post.title} | ${SITE_NAME}`;
  return pageMetadata({
    title,
    description: seo.metaDescription?.trim() || post.excerpt,
    path: postPath(post.slug),
    type: "article",
    noindex: draft || !BLOG_ENABLED || seo.robotsIndex === "noindex",
    nofollow: seo.robotsFollow === "nofollow",
    canonical: seo.canonicalUrl || undefined,
    ogImage: mediaUrl(seo.ogImage) ?? mediaUrl(post.heroImage) ?? "/og/blog.png",
    ogTitle: seo.ogTitle || undefined,
    ogDescription: seo.ogDescription || undefined,
    twitterTitle: seo.twitterTitle || undefined,
    twitterDescription: seo.twitterDescription || undefined,
    twitterImage: mediaUrl(seo.twitterImage),
  });
}

/** Whether a page/post may appear in the XML sitemap (production only; checked again in sitemap.ts). */
export function sitemapEligiblePage(page: Page, publishedPostCount: number) {
  const seo = page.seo ?? {};
  return page._status === "published" && seo.robotsIndex !== "noindex" && seo.includeInSitemap !== false && !seo.canonicalUrl && !envNoindex(page, publishedPostCount);
}
