/** Editorial SEO checks. These are suggestions for editors, not ranking guarantees, and never rewrite content. */

export type SeoCheckLevel = "ok" | "warn" | "error";
export type SeoCheck = { id: string; level: SeoCheckLevel; message: string };

export type SeoCheckInput = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  primaryKeyword?: string | null;
  secondaryKeywords?: string[];
  h1?: string | null;
  bodyText?: string;
  links?: { text: string; href: string }[];
  canonical?: string | null;
  noindex?: boolean | null;
};

/** Typical display widths; search engines truncate by pixel width, so these are guides only. */
export const TITLE_RANGE = { min: 30, max: 60 } as const;
export const DESCRIPTION_RANGE = { min: 70, max: 160 } as const;

const GENERIC_ANCHORS = /^(click here|here|read more|more|learn more|this page|this link|link)$/i;

const normalise = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export const containsPhrase = (haystack: string | null | undefined, phrase: string | null | undefined) =>
  Boolean(haystack && phrase && normalise(haystack).includes(normalise(phrase)));

export const wordCount = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0);

export function runSeoChecks(input: SeoCheckInput): SeoCheck[] {
  const checks: SeoCheck[] = [];
  const add = (id: string, level: SeoCheckLevel, message: string) => checks.push({ id, level, message });
  const title = input.metaTitle?.trim() ?? "";
  const desc = input.metaDescription?.trim() ?? "";
  const kw = input.primaryKeyword?.trim() ?? "";

  if (!title) add("title", "error", "Meta title is missing.");
  else if (title.length < TITLE_RANGE.min) add("title", "warn", `Meta title is short (${title.length} characters).`);
  else if (title.length > TITLE_RANGE.max) add("title", "warn", `Meta title is ${title.length} characters and may be shortened in search results.`);
  else add("title", "ok", `Meta title length looks reasonable (${title.length} characters).`);

  if (!desc) add("description", "error", "Meta description is missing.");
  else if (desc.length < DESCRIPTION_RANGE.min) add("description", "warn", `Meta description is short (${desc.length} characters).`);
  else if (desc.length > DESCRIPTION_RANGE.max) add("description", "warn", `Meta description is ${desc.length} characters and may be shortened in search results.`);
  else add("description", "ok", `Meta description length looks reasonable (${desc.length} characters).`);

  if (!kw) {
    add("keyword", "warn", "No primary keyword set. Add one to enable keyword suggestions.");
  } else {
    add("kw-title", containsPhrase(title, kw) ? "ok" : "warn", containsPhrase(title, kw) ? "Primary keyword appears in the meta title." : "Primary keyword does not appear in the meta title.");
    add(
      "kw-description",
      containsPhrase(desc, kw) ? "ok" : "warn",
      containsPhrase(desc, kw) ? "Primary keyword appears in the meta description." : "Primary keyword does not appear in the meta description.",
    );
    if (input.h1 !== undefined) {
      add("kw-h1", containsPhrase(input.h1, kw) ? "ok" : "warn", containsPhrase(input.h1, kw) ? "Primary keyword appears in the H1." : "Primary keyword does not appear in the H1.");
    }
    if (input.bodyText !== undefined) {
      add("kw-body", containsPhrase(input.bodyText, kw) ? "ok" : "warn", containsPhrase(input.bodyText, kw) ? "Primary keyword appears in the page content." : "Primary keyword does not appear in the page content.");
    }
  }

  if (input.secondaryKeywords?.length && input.bodyText !== undefined) {
    const missing = input.secondaryKeywords.filter((k) => k.trim() && !containsPhrase(input.bodyText, k));
    if (missing.length) add("kw-secondary", "warn", `Secondary keywords not found in the content: ${missing.join(", ")}.`);
    else add("kw-secondary", "ok", "All secondary keywords appear in the content.");
  }

  if (input.bodyText !== undefined) {
    const words = wordCount(input.bodyText);
    add("thin", words < 300 ? "warn" : "ok", words < 300 ? `Content looks thin (${words} words).` : `Content length: about ${words} words.`);
  }

  if (input.links) {
    const generic = input.links.filter((l) => GENERIC_ANCHORS.test(l.text.trim()));
    if (generic.length) add("anchors", "warn", `${generic.length} link(s) use generic anchor text such as "click here".`);
    else if (input.links.length) add("anchors", "ok", "Link anchor text is descriptive.");
  }

  if (input.canonical && !/^https:\/\//.test(input.canonical)) add("canonical", "error", "Canonical override must be an absolute https:// URL.");
  if (input.canonical && /\.vercel\.app/i.test(input.canonical)) add("canonical", "error", "Canonical must not point to a Vercel preview domain.");
  if (input.noindex) add("noindex", "warn", "This page is set to noindex and will be excluded from search results and the sitemap.");

  return checks;
}

export const seoScore = (checks: SeoCheck[]) => ({
  errors: checks.filter((c) => c.level === "error").length,
  warnings: checks.filter((c) => c.level === "warn").length,
});
