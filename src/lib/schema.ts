import { absoluteUrl } from "./seo";
import { CONTACT_EMAIL, founders, SITE_NAME, SITE_TAGLINE, SITE_URL } from "./site";

export const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Crumbs without a path render as plain text (no invented parent URLs) and are left out of schema. */
export type Crumb = { name: string; path?: string };

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/top-spot-studio-logo.png"),
    slogan: SITE_TAGLINE,
    description:
      "Founder-led SEO and web growth studio based in Bangladesh, working remotely with service businesses in New Zealand and other international markets.",
    address: { "@type": "PostalAddress", addressCountry: "BD" },
    areaServed: [{ "@type": "Country", name: "New Zealand" }],
    founder: founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
    ...(CONTACT_EMAIL
      ? { contactPoint: [{ "@type": "ContactPoint", contactType: "customer enquiries", email: CONTACT_EMAIL }] }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-NZ",
  };
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs
      .filter((c) => c.path)
      .map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: absoluteUrl(c.path as string),
      })),
  };
}

export function webPageSchema(opts: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${absoluteUrl(opts.path)}#webpage`,
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-NZ",
  };
}

export function serviceSchema(opts: { path: string; name: string; description: string; serviceType: string }) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(opts.path)}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "New Zealand" },
  };
}

export function articleSchema(opts: {
  path: string;
  headline: string;
  description: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@type": "Article",
    "@id": `${absoluteUrl(opts.path)}#article`,
    headline: opts.headline,
    description: opts.description,
    url: absoluteUrl(opts.path),
    mainEntityOfPage: absoluteUrl(opts.path),
    publisher: { "@id": ORG_ID },
    author: opts.authorName ? { "@type": "Person", name: opts.authorName } : { "@id": ORG_ID },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
    inLanguage: "en-NZ",
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
