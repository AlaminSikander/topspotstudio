import type { Payload } from "payload";
import { postPath } from "./paths";

const MEDIA_KEYS = new Set(["media", "heroImage", "ogImage", "twitterImage", "photo", "defaultOgImage"]);

const refId = (v: unknown) => (v && typeof v === "object" ? (v as { id?: unknown }).id : v);

function findRefs(value: unknown, mediaId: string, path: string, out: string[]) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) return value.forEach((v, i) => findRefs(v, mediaId, `${path}[${i}]`, out));
  const o = value as Record<string, unknown>;
  if (o.type === "upload" && o.relationTo === "media" && String(refId(o.value)) === mediaId) out.push(`${path} (rich text image)`);
  for (const [k, v] of Object.entries(o)) {
    if (MEDIA_KEYS.has(k) && v != null && String(refId(v)) === mediaId) out.push(path ? `${path}.${k}` : k);
    else findRefs(v, mediaId, path ? `${path}.${k}` : k, out);
  }
}

export type MediaUse = { collection: string; id: string | number; title: string; path: string; locations: string[] };

/** Where an image is referenced (latest versions of pages and posts, plus global settings). */
export async function mediaUsage(payload: Payload, mediaId: string): Promise<MediaUse[]> {
  const [pages, posts, settings] = await Promise.all([
    payload.find({ collection: "pages", draft: true, depth: 0, limit: 1000, pagination: false, overrideAccess: true }),
    payload.find({ collection: "posts", draft: true, depth: 0, limit: 1000, pagination: false, overrideAccess: true }),
    payload.findGlobal({ slug: "site-settings", depth: 0, overrideAccess: true }),
  ]);
  const uses: MediaUse[] = [];
  for (const p of pages.docs) {
    const locations: string[] = [];
    findRefs(p, mediaId, "", locations);
    if (locations.length) uses.push({ collection: "pages", id: p.id, title: p.title, path: p.path, locations });
  }
  for (const p of posts.docs) {
    const locations: string[] = [];
    findRefs(p, mediaId, "", locations);
    if (locations.length) uses.push({ collection: "posts", id: p.id, title: p.title, path: postPath(p.slug), locations });
  }
  const locations: string[] = [];
  findRefs(settings, mediaId, "", locations);
  if (locations.length) uses.push({ collection: "globals", id: "site-settings", title: "Site settings", path: "(site-wide)", locations });
  return uses;
}
