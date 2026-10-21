import type { Page, Post, SiteSetting } from "@/payload-types";
import { postPath } from "@/cms/lib/paths";
import { absoluteUrl } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, faqSchema, graph, ORG_ID, organizationSchema, serviceSchema, webPageSchema, websiteSchema, type Crumb } from "@/lib/schema";
import { resolveHref, type PathMap } from "./links";

type Block = NonNullable<Page["layout"]>[number];

export function crumbsFor(page: Pick<Page, "breadcrumbs">, paths?: PathMap): Crumb[] {
  return (page.breadcrumbs ?? []).map((c) => {
    const href = c.hasLink ? resolveHref(c.link as Parameters<typeof resolveHref>[0], paths) : null;
    return href ? { name: c.label, path: href } : { name: c.label };
  });
}

export const faqItemsOf = (page: Pick<Page, "layout">) =>
  (page.layout ?? []).filter((b): b is Extract<Block, { blockType: "faq" }> => b.blockType === "faq").flatMap((b) => (b.items ?? []).map((i) => ({ q: i.question, a: i.answer })));

function nestedBlocks(page: Pick<Page, "layout">) {
  const out: { blockType: string; [k: string]: unknown }[] = [];
  for (const b of page.layout ?? []) {
    out.push(b as never);
    if (b.blockType === "section") for (const key of ["content", "columnB", "below"] as const) for (const c of b[key] ?? []) out.push(c as never);
  }
  return out;
}

export function organizationFromSettings(s?: Partial<SiteSetting> | null) {
  return organizationSchema({
    name: s?.siteName ?? undefined,
    slogan: s?.tagline ?? undefined,
    description: s?.orgDescription ?? undefined,
    logoPath: s?.logoPath ?? undefined,
    addressCountry: s?.addressCountry ?? undefined,
    areaServed: s?.areaServed?.map((a) => a.country),
    founders: s?.founders?.map((f) => ({ name: f.name, role: f.role })),
    contactEmail: s?.contactEmail ?? undefined,
    sameAs: s?.sameAs?.map((x) => x.url),
  });
}

export const siteJsonLd = (s?: Partial<SiteSetting> | null) => graph(organizationFromSettings(s), websiteSchema());

export async function buildPageJsonLd(page: Page, { paths, draft = false }: { paths?: PathMap; draft?: boolean } = {}) {
  const sd = page.structuredData ?? {};
  const seo = page.seo ?? {};
  const name = seo.metaTitle || page.title;
  const description = seo.metaDescription || "";
  const nodes: object[] = [];
  const type = sd.pageType ?? "WebPage";

  if (type === "Article") {
    const cs = (page.layout ?? []).find((b) => b.blockType === "caseStudy") as Extract<Block, { blockType: "caseStudy" }> | undefined;
    nodes.push(articleSchema({ path: page.path, headline: cs?.title || page.title, description }));
  } else if (type === "Blog") {
    nodes.push({ "@type": "Blog", "@id": `${absoluteUrl(page.path)}#blog`, url: absoluteUrl(page.path), name, description, publisher: { "@id": ORG_ID }, inLanguage: "en-NZ" });
  } else {
    nodes.push(webPageSchema({ type: type as "WebPage", path: page.path, name, description }));
  }

  if (sd.service?.enabled && sd.service.name) {
    nodes.push(serviceSchema({ path: page.path, name: sd.service.name, serviceType: sd.service.serviceType || sd.service.name, description: sd.service.description || description }));
  }

  if (sd.itemList) {
    const cards = nestedBlocks(page).filter((b) => b.blockType === "caseStudyCards");
    const items = cards.flatMap((b) => ((b.caseStudies as (number | Page)[]) ?? []).filter((c): c is Page => typeof c === "object"));
    if (items.length) {
      nodes.push({
        "@type": "ItemList",
        itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(c.path), name: c.caseStudyCard?.title || c.title })),
      });
    }
  }

  if (sd.people) {
    for (const b of nestedBlocks(page).filter((x) => x.blockType === "founderCards")) {
      for (const f of (b.founders as { name: string; role: string }[]) ?? []) {
        nodes.push({ "@type": "Person", "@id": `${absoluteUrl(page.path)}#${f.name.toLowerCase().replace(/\s+/g, "-")}`, name: f.name, jobTitle: f.role, worksFor: { "@id": ORG_ID } });
      }
    }
  }

  const crumbs = crumbsFor(page, paths);
  if (sd.breadcrumbs !== false && crumbs.some((c) => c.path)) nodes.push(breadcrumbSchema(crumbs));

  const faq = faqItemsOf(page);
  if (sd.faq !== false && faq.length) nodes.push(faqSchema(faq));

  return { jsonLd: graph(...nodes), issues: validateJsonLd(graph(...nodes)), draft };
}

export async function buildPostJsonLd(post: Post) {
  const path = postPath(post.slug);
  const author = typeof post.author === "object" ? post.author : null;
  const image = typeof post.heroImage === "object" && post.heroImage?.url ? post.heroImage.url : undefined;
  const nodes: object[] = [];
  const articleType = post.structuredData?.articleType ?? "BlogPosting";
  if (articleType !== "none") {
    nodes.push({
      ...articleSchema({
        path,
        headline: post.seo?.h1 || post.title,
        description: post.seo?.metaDescription || post.excerpt,
        authorName: author?.name,
        datePublished: post.publishedAt?.slice(0, 10),
        dateModified: (post.displayUpdatedAt ?? post.publishedAt)?.slice(0, 10),
        image,
      }),
      "@type": articleType,
    });
  }
  nodes.push(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog/" },
      { name: post.title, path },
    ]),
  );
  return { jsonLd: graph(...nodes), issues: validateJsonLd(graph(...nodes)) };
}

const DISALLOWED = ["LocalBusiness", "AggregateRating", "Review"];

/** Structural checks for generated JSON-LD (parseable, required properties, no unsupported claims). */
export function validateJsonLd(input: { "@graph": object[] }): string[] {
  const data = input as { "@graph": Record<string, unknown>[] };
  const issues: string[] = [];
  let text = "";
  try {
    text = JSON.stringify(data);
    JSON.parse(text);
  } catch {
    return ["JSON-LD could not be serialised."];
  }
  if (DISALLOWED.some((t) => text.includes(`"${t}"`))) issues.push("Contains LocalBusiness, Review or AggregateRating, which are not supported by verified content.");
  if (/"addressCountry":"NZ"/.test(text)) issues.push("Implies a New Zealand address.");
  const types = data["@graph"].map((n) => n["@type"]);
  const dupes = types.filter((t, i) => types.indexOf(t) !== i && t !== "Person");
  if (dupes.length) issues.push(`Duplicate node types: ${[...new Set(dupes)].join(", ")}.`);
  for (const n of data["@graph"]) {
    const t = String(n["@type"]);
    if (["WebPage", "AboutPage", "ContactPage", "CollectionPage", "Blog"].includes(t) && (!n.name || !n.url)) issues.push(`${t} is missing name or url.`);
    if (["Article", "BlogPosting"].includes(t) && !n.headline) issues.push(`${t} is missing a headline.`);
    if (t === "FAQPage" && !(n.mainEntity as unknown[])?.length) issues.push("FAQPage has no questions.");
    if (t === "Service" && !n.name) issues.push("Service is missing a name.");
  }
  return issues;
}
