import { md } from "./md";

export { md };

export const link = (url: string, newTab = false) => ({ linkType: "custom" as const, url, newTab });
export const cta = (label: string, url: string, event?: string) => ({ label, ...link(url), ...(event ? { event } : {}) });
export const img = (siteImage: string, alt: string, position?: string, ratio?: string) => ({ source: "site" as const, siteImage, alt, ...(position ? { position } : {}), ...(ratio ? { ratio } : {}) });
export const items = (arr: string[]) => arr.map((text) => ({ text }));
export const card = (title: string, icon: string, body: string, ctaValue?: ReturnType<typeof cta>) => ({ title, icon, body: md(body), ...(ctaValue ? { cta: ctaValue } : {}) });
export const crumb = (label: string, url?: string) => (url ? { label, hasLink: true, link: link(url) } : { label, hasLink: false });
export const faq = (items: { q: string; a: string }[], extra: Record<string, unknown> = {}) => ({
  blockType: "faq",
  title: "Frequently Asked Questions",
  items: items.map((i) => ({ question: i.q, answer: i.a })),
  asideTitle: "Have a question that isn’t covered here?",
  asideLinkLabel: "Ask the founders directly",
  asideLink: link("/contact/"),
  ...extra,
});

export type SeedPage = {
  title: string;
  path: string;
  template: string;
  breadcrumbs?: ReturnType<typeof crumb>[];
  seo: { metaTitle: string; metaDescription: string; ogEyebrow: string; ogHeadline: string; robotsIndex?: string };
  structuredData: Record<string, unknown>;
  caseStudyCard?: Record<string, unknown>;
  layout: Record<string, unknown>[];
};
