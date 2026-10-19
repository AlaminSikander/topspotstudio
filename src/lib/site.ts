export const SITE_NAME = "Top Spot Studio";
export const SITE_TAGLINE = "SEO & Web Growth for Service Businesses";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const IS_PRODUCTION = process.env.NEXT_PUBLIC_SITE_ENV === "production";
export const BLOG_ENABLED = process.env.NEXT_PUBLIC_BLOG_ENABLED === "true";
export const PRIVACY_APPROVED = process.env.NEXT_PUBLIC_PRIVACY_APPROVED === "true";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

export const LOCATION_STATEMENT =
  "Based in Bangladesh, working remotely with businesses in New Zealand and other international markets.";

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

export type NavLink = { label: string; href: string };
export type NavItem = NavLink | { label: string; children: NavLink[] };

export const industriesNav: NavLink[] = [
  { label: "SEO for Tradies", href: routes.tradies },
  { label: "Roofing SEO", href: routes.roofing },
  { label: "Web Design for Tradies", href: routes.webDesign },
];

export const mainNav: NavItem[] = [
  { label: "SEO", children: [{ label: "SEO Services NZ", href: routes.nzSeo }] },
  { label: "Local SEO", children: [{ label: "Local SEO NZ", href: routes.nzLocalSeo }] },
  { label: "Industries", children: industriesNav },
  { label: "Case Studies", href: routes.caseStudies },
  { label: "About", href: routes.about },
  ...(BLOG_ENABLED ? [{ label: "Blog", href: routes.blog }] : []),
  { label: "Contact", href: routes.contact },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "SEO Services NZ", href: routes.nzSeo },
      { label: "Local SEO NZ", href: routes.nzLocalSeo },
      { label: "Web Design for Tradies", href: routes.webDesign },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "SEO for Tradies", href: routes.tradies },
      { label: "Roofing SEO", href: routes.roofing },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: routes.about },
      { label: "Case Studies", href: routes.caseStudies },
      ...(BLOG_ENABLED ? [{ label: "Blog", href: routes.blog }] : []),
      { label: "Contact", href: routes.contact },
    ],
  },
  {
    title: "Get Started",
    links: [{ label: "Free SEO Audit", href: routes.audit }],
  },
];

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
