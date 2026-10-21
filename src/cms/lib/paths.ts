/** URL path helpers shared by the CMS (validation) and the site (routing). The site uses `trailingSlash: true`. */

export const RESERVED_PREFIXES = ["/admin", "/cms-api", "/api", "/_next", "/og", "/preview", "/exit-preview"] as const;
export const RESERVED_FILES = ["/robots.txt", "/sitemap.xml", "/favicon.ico", "/icon.png", "/apple-icon.png"] as const;

const PATH_RE = /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)*$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Lower-cases, strips query/hash, collapses slashes and enforces leading + trailing slash. */
export function normalizePath(input: string): string {
  let p = (input || "").trim();
  if (/^https?:\/\//i.test(p)) {
    try {
      p = new URL(p).pathname;
    } catch {
      return p;
    }
  }
  p = p.split(/[?#]/)[0] ?? "";
  p = p.replace(/\/{2,}/g, "/");
  if (!p.startsWith("/")) p = `/${p}`;
  if (!p.endsWith("/") && !/\.[a-z0-9]{2,5}$/i.test(p)) p = `${p}/`;
  return p.toLowerCase();
}

export function isValidPagePath(path: string): boolean {
  return path === "/" || PATH_RE.test(path);
}

export function isValidSlug(slug: string): boolean {
  return SLUG_RE.test(slug);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function isReservedPath(path: string): boolean {
  const p = path.toLowerCase();
  return (
    RESERVED_FILES.some((f) => p === f || p === `${f}/`) ||
    RESERVED_PREFIXES.some((prefix) => p === prefix || p === `${prefix}/` || p.startsWith(`${prefix}/`))
  );
}

export const postPath = (slug: string) => `/blog/${slug}/`;

/** Accepts the hrefs editors may type into a custom link. */
export function isSafeHref(href: string): boolean {
  const h = href.trim();
  if (!h || /\s/.test(h)) return false;
  if (h.startsWith("//")) return false;
  if (/^(javascript|data|vbscript):/i.test(h)) return false;
  return /^(\/|#|https:\/\/|http:\/\/|mailto:|tel:)/i.test(h);
}

export const isExternalHref = (href: string) => /^https?:\/\//i.test(href);
