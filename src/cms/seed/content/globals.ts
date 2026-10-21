import { cta, link, md } from "../helpers";

const navChild = (label: string, url: string, icon: string, note: string) => ({ label, ...link(url), icon, note, visibility: "always" });
const navLink = (label: string, url: string, visibility = "always") => ({ label, ...link(url), visibility });

export const navigation = {
  items: [
    { label: "SEO", type: "dropdown", visibility: "always", children: [navChild("SEO Services NZ", "/markets/new-zealand/seo/", "Search", "Strategy, technical & on-page SEO")] },
    {
      label: "Local SEO",
      type: "dropdown",
      visibility: "always",
      children: [navChild("Local SEO NZ", "/markets/new-zealand/local-seo/", "MapPin", "Google Business Profile & local search")],
    },
    {
      label: "Industries",
      type: "dropdown",
      visibility: "always",
      children: [
        navChild("SEO for Tradies", "/industries/seo-for-tradies/", "Wrench", "Local search for trade businesses"),
        navChild("Roofing SEO", "/industries/roofing-seo/", "Hammer", "Our initial specialist niche"),
        navChild("Web Design for Tradies", "/industries/web-design-for-tradies/", "LayoutTemplate", "Websites built around enquiries"),
      ],
    },
    { label: "Case Studies", type: "link", visibility: "always", link: link("/case-studies/") },
    { label: "About", type: "link", visibility: "always", link: link("/about/") },
    { label: "Blog", type: "link", visibility: "always", link: link("/blog/") },
    { label: "Contact", type: "link", visibility: "always", link: link("/contact/") },
  ],
  cta: cta("Free SEO Audit", "/free-seo-audit/"),
};

export const footer = {
  headline: "SEO & Web Growth for Service Businesses",
  headlineHighlight: "Service Businesses",
  primaryCta: cta("Get a Free SEO Audit", "/free-seo-audit/"),
  secondaryCta: cta("Contact Us", "/contact/"),
  description: "Helping service businesses improve search visibility, strengthen their websites and create more opportunities for qualified enquiries.",
  showLocation: true,
  columns: [
    { title: "Services", links: [navLink("SEO Services NZ", "/markets/new-zealand/seo/"), navLink("Local SEO NZ", "/markets/new-zealand/local-seo/"), navLink("Web Design for Tradies", "/industries/web-design-for-tradies/")] },
    { title: "Industries", links: [navLink("SEO for Tradies", "/industries/seo-for-tradies/"), navLink("Roofing SEO", "/industries/roofing-seo/")] },
    { title: "Company", links: [navLink("About", "/about/"), navLink("Case Studies", "/case-studies/"), navLink("Blog", "/blog/"), navLink("Contact", "/contact/")] },
    { title: "Get Started", links: [navLink("Free SEO Audit", "/free-seo-audit/")] },
  ],
  copyright: "Founder-led SEO and web growth studio.",
  bottomLinks: [navLink("Privacy Policy", "/privacy-policy/"), navLink("Contact", "/contact/")],
  socialLinks: [],
  watermark: "TOP SPOT STUDIO",
};

export const siteSettings = {
  siteName: "Top Spot Studio",
  tagline: "SEO & Web Growth for Service Businesses",
  locationStatement: "Based in Bangladesh, working remotely with businesses in New Zealand and other international markets.",
  breadcrumbHomeLabel: "Home",
  orgDescription:
    "Founder-led SEO and web growth studio based in Bangladesh, working remotely with service businesses in New Zealand and other international markets.",
  logoPath: "/brand/top-spot-studio-logo.png",
  addressCountry: "BD",
  areaServed: [{ country: "New Zealand" }],
  founders: [
    { name: "Asif Iqbal Khan", role: "Co-Founder & SEO Growth Lead" },
    { name: "Al Amin Sikander", role: "Co-Founder & Web Development & QA Lead" },
  ],
  sameAs: [],
  proofMetrics: [
    { value: "99", label: "Tracked form leads", context: "From an anonymised Malaysian influencer marketing agency’s approximately seven-month SEO project." },
    { value: "+31.2%", label: "Google Search clicks", context: "869 → 1,140 between the documented comparison periods." },
    { value: "+88.0%", label: "Google Search impressions", context: "32.6K → 61.3K between the documented comparison periods." },
  ],
  proofComparisonTitle: "Documented comparison periods",
  proofComparison: [
    { label: "Google Search clicks", before: 869, after: 1140, beforeLabel: "869", afterLabel: "1,140", change: "+31.2%" },
    { label: "Google Search impressions", before: 32.6, after: 61.3, beforeLabel: "32.6K", afterLabel: "61.3K", change: "+88.0%" },
  ],
  proofComparisonCaption:
    "Google Search Console figures for an anonymised Malaysian influencer marketing agency. One historical project — not a forecast or guarantee.",
  notFoundTitle: "This page isn't here",
  notFoundLead: "The link may be out of date or the address may have a typo. These pages are a good place to pick up from.",
  notFoundLinks: [
    { label: "SEO Services NZ", ...link("/markets/new-zealand/seo/") },
    { label: "Local SEO NZ", ...link("/markets/new-zealand/local-seo/") },
    { label: "SEO for Tradies", ...link("/industries/seo-for-tradies/") },
    { label: "Case Studies", ...link("/case-studies/") },
  ],
};

export const categories = [
  { name: "SEO", slug: "seo", commercialLink: { label: "SEO services", ...link("/markets/new-zealand/seo/") } },
  { name: "Local SEO", slug: "local-seo", commercialLink: { label: "local SEO support", ...link("/markets/new-zealand/local-seo/") } },
  { name: "Tradie Growth", slug: "tradie-growth", commercialLink: { label: "SEO for tradies", ...link("/industries/seo-for-tradies/") } },
  { name: "Websites", slug: "websites", commercialLink: { label: "web design for tradies", ...link("/industries/web-design-for-tradies/") } },
];

export const authors = [
  { key: "asif", name: "Asif Iqbal Khan", role: "Co-Founder & SEO Growth Lead", bio: "Asif leads SEO strategy, audits, Local SEO and reporting at Top Spot Studio." },
  {
    key: "alamin",
    name: "Al Amin Sikander",
    role: "Co-Founder & Web Development & QA Lead",
    bio: "Al Amin leads website implementation, QA, performance and technical SEO support at Top Spot Studio.",
  },
];

/** The only pre-CMS article: an internal layout template, migrated as a DRAFT so it never becomes public. */
export const templatePost = {
  title: "Article template preview",
  slug: "article-template-preview",
  excerpt: "Internal preview used to QA the article layout. Replace with an approved article.",
  category: "seo",
  author: "asif",
  publishedAt: "2026-10-19T00:00:00.000Z",
  seo: { metaDescription: "Internal preview of the blog article template. Not for publication.", robotsIndex: "noindex" },
  cta: {
    title: "Need advice specific to your website?",
    body: "A guide can point you in the right direction. Your website may still have its own technical, local or content issues.",
    button: cta("Get My Free SEO Audit", "/free-seo-audit/"),
  },
  content: md(`This draft exists only to check the article layout during development. It is excluded from production builds and must be replaced with an approved article before the blog launches.

## A second-level heading

Body copy uses the reading width and line height defined for long-form content. Paragraphs stay short and specific.

- A bullet list item
- Another item with a [contextual link to SEO services](/markets/new-zealand/seo/)

### A third-level heading

1. An ordered step
2. Another step

**Bold text** highlights an important point without changing the heading structure.`),
};
