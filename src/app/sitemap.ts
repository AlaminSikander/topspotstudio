import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { absoluteUrl } from "@/lib/seo";
import { BLOG_ENABLED, IS_PRODUCTION, PRIVACY_APPROVED, routes } from "@/lib/site";

const indexable = [
  routes.home,
  routes.nzSeo,
  routes.nzLocalSeo,
  routes.tradies,
  routes.roofing,
  routes.webDesign,
  routes.caseStudies,
  routes.caseInfluencer,
  routes.caseConsulting,
  routes.caseImageEditing,
  routes.audit,
  routes.about,
  routes.contact,
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_PRODUCTION) return [];
  const blogLive = BLOG_ENABLED && posts.length >= 3;
  const paths = [
    ...indexable,
    ...(PRIVACY_APPROVED ? [routes.privacy] : []),
    ...(blogLive ? [routes.blog, ...posts.map((p) => `/blog/${p.slug}/`)] : []),
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
