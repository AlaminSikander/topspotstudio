/** Seeds the CMS with the website's existing content (migrated from the pre-CMS JSX at tag pre-cms-baseline-bb8fe28). */
import type { Payload } from "payload";
import type { SeedPage } from "./helpers";
import { caseConsulting, caseImageEditing, caseInfluencer, caseStudiesHub } from "./content/case-studies";
import { about, audit, blogHub, contact, privacy } from "./content/company";
import { authors, categories, footer, navigation, siteSettings, templatePost } from "./content/globals";
import { home } from "./content/home";
import { roofing, tradies, webDesign } from "./content/industries";
import { nzLocalSeo, nzSeo } from "./content/services";

export const SEED_PAGES: SeedPage[] = [
  home,
  nzSeo,
  nzLocalSeo,
  tradies,
  roofing,
  webDesign,
  caseInfluencer,
  caseConsulting,
  caseImageEditing,
  caseStudiesHub,
  audit,
  about,
  contact,
  blogHub,
  privacy,
];

const context = { disableRevalidate: true, skipAudit: true, skipAutoRedirect: true };

type Refs = { pages: Map<string, number | string>; categories: Map<string, number | string> };

/** Turns typed links to existing pages into document references and resolves "@case:" / "@category:" placeholders. */
function resolveRefs<T>(value: T, refs: Refs): T {
  const visit = (v: unknown): unknown => {
    if (typeof v === "string") {
      if (v.startsWith("@case:")) return refs.pages.get(v.slice(6)) ?? v;
      if (v.startsWith("@category:")) return refs.categories.get(v.slice(10)) ?? v;
      return v;
    }
    if (Array.isArray(v)) return v.map(visit);
    if (!v || typeof v !== "object") return v;
    const o = Object.fromEntries(Object.entries(v as Record<string, unknown>).map(([k, x]) => [k, visit(x)]));
    const asLink = (target: Record<string, unknown>) => {
      if (target.linkType === "custom" && typeof target.url === "string" && refs.pages.has(target.url)) {
        target.linkType = "internal";
        target.doc = { relationTo: "pages", value: refs.pages.get(target.url) };
        delete target.url;
      }
    };
    if (o.type === "link" && o.fields && typeof o.fields === "object") asLink(o.fields as Record<string, unknown>);
    else asLink(o);
    return o;
  };
  return visit(value) as T;
}

async function upsertBy(payload: Payload, collection: "categories" | "authors", field: string, docs: Record<string, unknown>[]) {
  const map = new Map<string, number | string>();
  for (const data of docs) {
    const key = String(data[field]);
    const found = await payload.find({ collection, where: { [field]: { equals: key } }, limit: 1, overrideAccess: true, depth: 0 });
    const doc = found.docs[0] ?? (await payload.create({ collection, data: data as never, overrideAccess: true, context }));
    map.set(key, doc.id);
  }
  return map;
}

export async function seed(payload: Payload, { overwrite = false }: { overwrite?: boolean } = {}) {
  const log = (msg: string) => payload.logger.info({ msg: `[seed] ${msg}` });

  const categoryIds = await upsertBy(payload, "categories", "slug", categories);
  const authorIds = await upsertBy(payload, "authors", "name", authors.map((a) => ({ name: a.name, role: a.role, bio: a.bio })));
  const authorByKey = new Map(authors.map((a) => [a.key, authorIds.get(a.name)!]));

  // Pass 1: make sure every page record exists so links can reference it.
  const created = new Set<string>();
  for (const p of SEED_PAGES) {
    const existing = await payload.find({ collection: "pages", where: { path: { equals: p.path } }, limit: 1, overrideAccess: true, depth: 0, draft: true });
    if (existing.docs.length) continue;
    await payload.create({ collection: "pages", data: { title: p.title, path: p.path, routeType: "code", template: p.template as never }, draft: true, overrideAccess: true, context });
    created.add(p.path);
  }
  const all = await payload.find({ collection: "pages", limit: 1000, pagination: false, overrideAccess: true, depth: 0, draft: true });
  const refs: Refs = { pages: new Map(all.docs.map((d) => [d.path, d.id])), categories: categoryIds };

  // Pass 2: content, SEO and structured data; published so the live routes render it.
  for (const p of SEED_PAGES) {
    if (!created.has(p.path) && !overwrite) {
      log(`skip ${p.path} (exists)`);
      continue;
    }
    const data = resolveRefs({ ...p, routeType: "code", _status: "published" }, refs);
    await payload.update({ collection: "pages", id: refs.pages.get(p.path)!, data: data as never, overrideAccess: true, context, draft: false });
    log(`${created.has(p.path) ? "created" : "overwrote"} ${p.path}`);
  }

  const globals = [
    ["navigation", navigation, (g: Record<string, unknown>) => !(g.items as unknown[])?.length],
    ["footer", footer, (g: Record<string, unknown>) => !g.headline],
    ["site-settings", siteSettings, (g: Record<string, unknown>) => !g.tagline],
  ] as const;
  for (const [slug, data, isEmpty] of globals) {
    const current = await payload.findGlobal({ slug, overrideAccess: true, depth: 0 });
    if (!overwrite && !isEmpty(current as unknown as Record<string, unknown>)) {
      log(`skip global ${slug} (exists)`);
      continue;
    }
    await payload.updateGlobal({ slug, data: resolveRefs(data, refs) as never, overrideAccess: true, context });
    log(`seeded global ${slug}`);
  }

  const post = await payload.find({ collection: "posts", where: { slug: { equals: templatePost.slug } }, limit: 1, overrideAccess: true, draft: true });
  if (!post.docs.length) {
    const { category, author, ...rest } = templatePost;
    await payload.create({
      collection: "posts",
      data: resolveRefs({ ...rest, category: categoryIds.get(category)!, author: authorByKey.get(author)!, _status: "draft" }, refs) as never,
      draft: true,
      overrideAccess: true,
      context,
    });
    log(`created draft post ${templatePost.slug} (not published)`);
  }
  log("done");
}
