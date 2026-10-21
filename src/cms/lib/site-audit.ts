import type { Payload } from "payload";
import type { Page, Post, Redirect } from "../../payload-types";
import { collectRichText, extractLinks, lexicalToText, type LexicalRoot } from "../../lib/cms/lexical";
import { isReservedPath, normalizePath, postPath } from "./paths";
import { runSeoChecks, seoScore, type SeoCheck } from "./seo-checks";

export type LinkStatus = "ok" | "broken" | "redirected" | "unpublished" | "external" | "anchor-missing";

export type LinkRow = {
  sourceType: "pages" | "posts" | "navigation" | "footer";
  sourceId: string | number;
  sourceTitle: string;
  sourcePath: string;
  anchorText: string;
  href: string;
  location: string;
  status: LinkStatus;
  newTab?: boolean;
};

export type SeoRow = {
  collection: "pages" | "posts";
  id: number | string;
  title: string;
  path: string;
  status: string;
  updatedAt: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  noindex: boolean;
  h1: string;
  checks: SeoCheck[];
  errors: number;
  warnings: number;
};

type LinkLike = { linkType?: string; url?: string | null; doc?: { relationTo: string; value: unknown } | null; newTab?: boolean | null; label?: string | null };

const STATIC_ANCHORS = new Set(["main", "faq", "audit-form", "contact-form", "proof"]);

/** First H1 of a page, from whichever hero block it uses. */
export function pageH1(page: Pick<Page, "layout" | "title">): string {
  for (const b of page.layout ?? []) {
    if (["homeHero", "pageHero", "collectionHero", "contactHero", "legalHero", "caseStudy"].includes(b.blockType)) return String((b as { title?: string }).title ?? "");
  }
  return "";
}

const SKIP_KEYS = new Set(["id", "blockType", "blockName", "url", "linkType", "anchorId", "headingId", "icon", "visual", "siteImage", "source", "tone", "layout", "spacing", "variant", "style", "position", "ratio", "location", "event", "mediaType", "mediaFrame", "align", "contentSpacing", "columns", "listLayout", "iconTone", "topSpacing", "centeredWidth", "showNotice", "form", "type", "valign", "gap", "size", "actionLocation"]);

/** All visible copy in a document's sections, for content-length and keyword checks. */
export function documentText(value: unknown): string {
  const parts: string[] = [];
  const visit = (v: unknown, key?: string) => {
    if (v == null || (key && SKIP_KEYS.has(key))) return;
    if (typeof v === "string") {
      if (!/^https?:|^\/|^#/.test(v)) parts.push(v);
      return;
    }
    if (typeof v !== "object") return;
    if ("root" in (v as object)) {
      parts.push(lexicalToText(v as LexicalRoot));
      return;
    }
    if (Array.isArray(v)) v.forEach((x) => visit(x));
    else for (const [k, x] of Object.entries(v)) if (k !== "seo" && k !== "structuredData" && k !== "value") visit(x, k);
  };
  visit(value);
  return parts.join(" ");
}

function collectLinkFields(value: unknown, path: string, out: { path: string; link: LinkLike; label: string }[]) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((v, i) => collectLinkFields(v, `${path}[${i}]`, out));
    return;
  }
  const obj = value as Record<string, unknown>;
  if ("root" in obj) return;
  if ("linkType" in obj && (obj.url || obj.doc)) {
    out.push({ path, link: obj as LinkLike, label: String(obj.label ?? "") });
  }
  for (const [k, v] of Object.entries(obj)) {
    if (k === "linkType") continue;
    if (k === "link" && v && typeof v === "object" && "linkType" in (v as object) && obj.label) {
      out.push({ path: `${path}.link`, link: v as LinkLike, label: String(obj.label) });
      continue;
    }
    collectLinkFields(v, path ? `${path}.${k}` : k, out);
  }
}

export async function loadSiteIndex(payload: Payload) {
  const [pages, posts, redirects] = await Promise.all([
    payload.find({ collection: "pages", draft: true, depth: 0, limit: 1000, pagination: false, overrideAccess: true }),
    payload.find({ collection: "posts", draft: true, depth: 0, limit: 1000, pagination: false, overrideAccess: true }),
    payload.find({ collection: "redirects", depth: 0, limit: 2000, pagination: false, overrideAccess: true }),
  ]);
  // Status of the live (published) version, independent of any newer draft.
  const [livePages, livePosts] = await Promise.all([
    payload.find({ collection: "pages", where: { _status: { equals: "published" } }, depth: 0, limit: 1000, pagination: false, overrideAccess: true, select: { path: true } }),
    payload.find({ collection: "posts", where: { _status: { equals: "published" } }, depth: 0, limit: 1000, pagination: false, overrideAccess: true, select: { slug: true } }),
  ]);
  const livePaths = new Set<string>([...livePages.docs.map((p) => p.path), ...livePosts.docs.map((p) => postPath(p.slug))]);
  const pageById = new Map(pages.docs.map((p) => [String(p.id), p]));
  const postById = new Map(posts.docs.map((p) => [String(p.id), p]));
  const enabledRedirects = redirects.docs.filter((r) => r.enabled !== false);
  return { pages: pages.docs as Page[], posts: posts.docs as Post[], redirects: redirects.docs as Redirect[], enabledRedirects, livePaths, pageById, postById, livePageIds: new Set(livePages.docs.map((p) => String(p.id))), livePostIds: new Set(livePosts.docs.map((p) => String(p.id))) };
}

type SiteIndex = Awaited<ReturnType<typeof loadSiteIndex>>;

function anchorsOf(doc: Page | Post): Set<string> {
  const ids = new Set(STATIC_ANCHORS);
  const visit = (v: unknown) => {
    if (!v || typeof v !== "object") return;
    if (Array.isArray(v)) return v.forEach(visit);
    const o = v as Record<string, unknown>;
    if (typeof o.anchorId === "string" && o.anchorId) ids.add(o.anchorId);
    for (const x of Object.values(o)) visit(x);
  };
  visit((doc as Page).layout);
  return ids;
}

function statusFor(link: LinkLike, idx: SiteIndex, ownAnchors: Set<string>): { href: string; status: LinkStatus } {
  if (link.linkType === "internal" && link.doc) {
    const id = String(typeof link.doc.value === "object" && link.doc.value ? (link.doc.value as { id: unknown }).id : link.doc.value);
    if (link.doc.relationTo === "pages") {
      const p = idx.pageById.get(id);
      if (!p) return { href: `(deleted page #${id})`, status: "broken" };
      return { href: p.path, status: idx.livePageIds.has(id) ? "ok" : "unpublished" };
    }
    const p = idx.postById.get(id);
    if (!p) return { href: `(deleted post #${id})`, status: "broken" };
    return { href: postPath(p.slug), status: idx.livePostIds.has(id) ? "ok" : "unpublished" };
  }
  const href = String(link.url ?? "").trim();
  if (/^(https?:|mailto:|tel:)/i.test(href)) return { href, status: "external" };
  if (href.startsWith("#")) return { href, status: ownAnchors.has(href.slice(1)) ? "ok" : "anchor-missing" };
  const [pathPart, hash] = href.split("#");
  const path = normalizePath(pathPart);
  if (idx.livePaths.has(path)) {
    if (hash) {
      const target = idx.pages.find((p) => p.path === path);
      if (target && !anchorsOf(target).has(hash)) return { href, status: "anchor-missing" };
    }
    return { href, status: "ok" };
  }
  if (idx.enabledRedirects.some((r) => r.from === path)) return { href, status: "redirected" };
  if (isReservedPath(path)) return { href, status: "ok" };
  return { href, status: "broken" };
}

export function auditLinks(idx: SiteIndex, globals: { navigation?: unknown; footer?: unknown } = {}): LinkRow[] {
  const rows: LinkRow[] = [];
  const scan = (sourceType: LinkRow["sourceType"], doc: { id: number | string; title?: string } & Record<string, unknown>, sourcePath: string, content: unknown) => {
    const anchors = sourceType === "pages" || sourceType === "posts" ? anchorsOf(doc as unknown as Page) : new Set(STATIC_ANCHORS);
    for (const { path, value } of collectRichText(content)) {
      for (const l of extractLinks(value)) {
        const s = statusFor(l as LinkLike, idx, anchors);
        rows.push({ sourceType, sourceId: doc.id, sourceTitle: String(doc.title ?? sourceType), sourcePath, anchorText: l.text, href: s.href, location: path, status: s.status, newTab: l.newTab });
      }
    }
    const fields: { path: string; link: LinkLike; label: string }[] = [];
    collectLinkFields(content, "", fields);
    for (const f of fields) {
      const s = statusFor(f.link, idx, anchors);
      rows.push({ sourceType, sourceId: doc.id, sourceTitle: String(doc.title ?? sourceType), sourcePath, anchorText: f.label, href: s.href, location: f.path, status: s.status, newTab: Boolean(f.link.newTab) });
    }
  };
  for (const p of idx.pages) scan("pages", p as never, p.path, { layout: p.layout, breadcrumbs: p.breadcrumbs });
  for (const p of idx.posts) scan("posts", p as never, postPath(p.slug), { content: p.content, cta: p.cta });
  if (globals.navigation) scan("navigation", { id: "navigation", title: "Main navigation" }, "(all pages)", globals.navigation);
  if (globals.footer) scan("footer", { id: "footer", title: "Footer" }, "(all pages)", globals.footer);
  return rows;
}

export function auditSeo(idx: SiteIndex): SeoRow[] {
  const rows: SeoRow[] = [];
  for (const p of idx.pages) {
    const seo = p.seo ?? {};
    const text = documentText(p.layout);
    const links = collectRichText(p.layout).flatMap((r) => extractLinks(r.value)).map((l) => ({ text: l.text, href: l.url ?? "" }));
    const checks = runSeoChecks({
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      primaryKeyword: seo.primaryKeyword,
      secondaryKeywords: seo.secondaryKeywords ?? [],
      h1: pageH1(p),
      bodyText: text,
      links,
      canonical: seo.canonicalUrl,
      noindex: seo.robotsIndex === "noindex",
    });
    rows.push({
      collection: "pages",
      id: p.id,
      title: p.title,
      path: p.path,
      status: p._status ?? "draft",
      updatedAt: p.updatedAt,
      metaTitle: seo.metaTitle ?? "",
      metaDescription: seo.metaDescription ?? "",
      primaryKeyword: seo.primaryKeyword ?? "",
      secondaryKeywords: seo.secondaryKeywords ?? [],
      noindex: seo.robotsIndex === "noindex",
      h1: pageH1(p),
      checks,
      ...seoScore(checks),
    });
  }
  for (const p of idx.posts) {
    const seo = p.seo ?? {};
    const text = lexicalToText(p.content as LexicalRoot);
    const checks = runSeoChecks({
      metaTitle: seo.metaTitle || `${p.title} | Top Spot Studio`,
      metaDescription: seo.metaDescription || p.excerpt,
      primaryKeyword: seo.primaryKeyword,
      secondaryKeywords: seo.secondaryKeywords ?? [],
      h1: seo.h1 || p.title,
      bodyText: text,
      links: extractLinks(p.content as LexicalRoot).map((l) => ({ text: l.text, href: l.url ?? "" })),
      canonical: seo.canonicalUrl,
      noindex: seo.robotsIndex === "noindex",
    });
    rows.push({
      collection: "posts",
      id: p.id,
      title: p.title,
      path: postPath(p.slug),
      status: p._status ?? "draft",
      updatedAt: p.updatedAt,
      metaTitle: seo.metaTitle ?? "",
      metaDescription: seo.metaDescription ?? "",
      primaryKeyword: seo.primaryKeyword ?? "",
      secondaryKeywords: seo.secondaryKeywords ?? [],
      noindex: seo.robotsIndex === "noindex",
      h1: seo.h1 || p.title,
      checks,
      ...seoScore(checks),
    });
  }
  return rows;
}

export type RedirectIssue = { id: number | string; from: string; issue: string };

export function auditRedirects(idx: SiteIndex): RedirectIssue[] {
  const issues: RedirectIssue[] = [];
  const sources = new Map(idx.enabledRedirects.map((r) => [r.from, r]));
  for (const r of idx.enabledRedirects) {
    if (idx.livePaths.has(r.from)) issues.push({ id: r.id, from: r.from, issue: "Source is now a live page; the redirect never applies." });
    const dest = r.destination ?? "";
    if (dest.startsWith("/")) {
      const d = normalizePath(dest);
      if (sources.has(d)) issues.push({ id: r.id, from: r.from, issue: `Chain: destination ${d} is redirected again.` });
      else if (!idx.livePaths.has(d) && !isReservedPath(d)) issues.push({ id: r.id, from: r.from, issue: `Destination ${d} is not a live page.` });
    }
  }
  return issues;
}

export async function siteOverview(payload: Payload) {
  const idx = await loadSiteIndex(payload);
  const [navigation, footer, recentLogs] = await Promise.all([
    payload.findGlobal({ slug: "navigation", depth: 0, overrideAccess: true }),
    payload.findGlobal({ slug: "footer", depth: 0, overrideAccess: true }),
    payload.find({ collection: "audit-logs", where: { action: { in: ["publish", "unpublish", "delete"] } }, sort: "-createdAt", limit: 8, depth: 0, overrideAccess: true }),
  ]);
  const seo = auditSeo(idx);
  const links = auditLinks(idx, { navigation, footer });
  const redirectIssues = auditRedirects(idx);
  const recent = [...idx.pages.map((p) => ({ collection: "pages" as const, id: p.id, title: p.title, path: p.path, status: p._status ?? "draft", updatedAt: p.updatedAt })), ...idx.posts.map((p) => ({ collection: "posts" as const, id: p.id, title: p.title, path: postPath(p.slug), status: p._status ?? "draft", updatedAt: p.updatedAt }))]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 8);
  return {
    pages: { total: idx.pages.length, published: idx.pages.filter((p) => idx.livePageIds.has(String(p.id))).length, drafts: idx.pages.filter((p) => !idx.livePageIds.has(String(p.id))).length },
    posts: { total: idx.posts.length, published: idx.posts.filter((p) => idx.livePostIds.has(String(p.id))).length, drafts: idx.posts.filter((p) => !idx.livePostIds.has(String(p.id))).length },
    missingTitle: seo.filter((r) => !r.metaTitle && r.collection === "pages").length,
    missingDescription: seo.filter((r) => !r.metaDescription && r.collection === "pages").length,
    missingKeyword: seo.filter((r) => !r.primaryKeyword).length,
    brokenLinks: links.filter((l) => l.status === "broken" || l.status === "anchor-missing").length,
    redirectedLinks: links.filter((l) => l.status === "redirected").length,
    redirectIssues: redirectIssues.length,
    recent,
    activity: recentLogs.docs,
  };
}
