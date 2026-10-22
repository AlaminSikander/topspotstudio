export const SITE_NAME = "Top Spot Studio";
export const SITE_TAGLINE = "SEO & Web Growth for Service Businesses";

/** Preferred public origin. Every other host (e.g. www) is redirected here. */
export const CANONICAL_ORIGIN = "https://topspotstudio.com";
export const CANONICAL_HOST = new URL(CANONICAL_ORIGIN).host;
export const WWW_HOST = `www.${CANONICAL_HOST}`;

export type SiteEnv = "production" | "staging" | "development";

/**
 * On Vercel, VERCEL_ENV alone decides: Production is indexable, Preview/Development are staging, so a stale
 * NEXT_PUBLIC_SITE_ENV can never de-index the live site. Off Vercel (local, self-hosted) NEXT_PUBLIC_SITE_ENV applies.
 */
export function resolveSiteEnv(): SiteEnv {
  if (process.env.VERCEL_ENV === "production") return "production";
  if (process.env.VERCEL_ENV) return "staging";
  const explicit = process.env.NEXT_PUBLIC_SITE_ENV;
  if (explicit === "production" || explicit === "development") return explicit;
  if (explicit) return "staging";
  return process.env.NODE_ENV === "development" ? "development" : "staging";
}

export const SITE_ENV = resolveSiteEnv();
export const IS_PRODUCTION = SITE_ENV === "production";
/** Production canonicals, sitemap and structured data always use the canonical origin. */
export const SITE_URL = IS_PRODUCTION
  ? CANONICAL_ORIGIN
  : (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const BLOG_ENABLED = process.env.NEXT_PUBLIC_BLOG_ENABLED === "true";
export const PRIVACY_APPROVED = process.env.NEXT_PUBLIC_PRIVACY_APPROVED === "true";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

export const routes = {
  home: "/",
  nzSeo: "/markets/new-zealand/seo/",
  nzLocalSeo: "/markets/new-zealand/local-seo/",
  tradies: "/industries/seo-for-tradies/",
  roofing: "/industries/roofing-seo/",
  webDesign: "/industries/web-design-for-tradies/",
  caseStudies: "/case-studies/",
  caseInfluencer: "/case-studies/influencer-marketing-agency-seo-growth/",
  caseConsulting: "/case-studies/training-consulting-seo-growth/",
  caseImageEditing: "/case-studies/ai-image-editing-seo-growth/",
  audit: "/free-seo-audit/",
  about: "/about/",
  contact: "/contact/",
  blog: "/blog/",
  privacy: "/privacy-policy/",
} as const;

/** Fallback for Organization schema when Site settings has no founders. */
export const founders = [
  {
    name: "Asif Iqbal Khan",
    role: "Co-Founder & SEO Growth Lead",
  },
  {
    name: "Al Amin Sikander",
    role: "Co-Founder & Web Development & QA Lead",
  },
] as const;
