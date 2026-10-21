import { postPath } from "@/cms/lib/paths";

export type LinkValue = {
  linkType?: "internal" | "custom" | null;
  url?: string | null;
  newTab?: boolean | null;
  doc?: { relationTo: "pages" | "posts" | string; value: unknown } | null;
} | null | undefined;

export type PathMap = { pages: Map<string, string>; posts: Map<string, string> };

/** Resolves a link field (internal document reference or typed URL) to an href. Returns null when the target is missing. */
export function resolveHref(link: LinkValue, paths?: PathMap): string | null {
  if (!link) return null;
  if (link.linkType === "internal") {
    const ref = link.doc;
    if (!ref) return null;
    const v = ref.value as { id?: unknown; path?: string; slug?: string } | number | string | null;
    if (v && typeof v === "object") {
      if (ref.relationTo === "pages" && v.path) return v.path;
      if (ref.relationTo === "posts" && v.slug) return postPath(v.slug);
    }
    const id = String(v && typeof v === "object" ? v.id : v);
    if (ref.relationTo === "pages") return paths?.pages.get(id) ?? null;
    if (ref.relationTo === "posts") {
      const slug = paths?.posts.get(id);
      return slug ? postPath(slug) : null;
    }
    return null;
  }
  const url = link.url?.trim();
  return url || null;
}

export const isExternal = (href: string) => /^https?:\/\//i.test(href);

/** rel attribute for anchors: new tabs always get noopener/noreferrer; editor-chosen values are appended. */
export function relFor(newTab?: boolean | null, extra?: string[] | null) {
  const rel = new Set<string>(extra ?? []);
  if (newTab) {
    rel.add("noopener");
    rel.add("noreferrer");
  }
  return rel.size ? [...rel].join(" ") : undefined;
}
