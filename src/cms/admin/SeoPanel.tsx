"use client";

import { useDocumentInfo, useFormFields } from "@payloadcms/ui";
import { DESCRIPTION_RANGE, runSeoChecks, TITLE_RANGE } from "../lib/seo-checks";

const HERO_TYPES = ["homeHero", "pageHero", "collectionHero", "contactHero", "legalHero", "caseStudy"];

function Counter({ length, min, max, label }: { length: number; min: number; max: number; label: string }) {
  const level = length === 0 ? "error" : length < min || length > max ? "warn" : "ok";
  const pct = Math.min(100, Math.round((length / (max * 1.25)) * 100));
  const colour = { ok: "#16a34a", warn: "#d97706", error: "#dc2626" }[level];
  return (
    <div style={{ marginBottom: 8 }}>
      <div className="tss-muted" style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{label}</span>
        <span>
          {length} characters (guide {min}–{max})
        </span>
      </div>
      <div style={{ height: 4, background: "var(--theme-elevation-100)", borderRadius: 4, marginTop: 4 }}>
        <div style={{ width: `${pct}%`, height: 4, borderRadius: 4, background: colour }} />
      </div>
    </div>
  );
}

/** Live SEO preview and editorial checks. Character guides are typical display widths, not guaranteed limits. */
export function SeoPanel() {
  const { collectionSlug } = useDocumentInfo();
  const values = useFormFields(([fields]) => {
    const get = (p: string) => fields[p]?.value as unknown;
    let h1 = "";
    if (collectionSlug === "posts") h1 = String(get("seo.h1") || get("title") || "");
    else {
      for (let i = 0; i < 40; i++) {
        const type = get(`layout.${i}.blockType`);
        if (type === undefined) break;
        if (HERO_TYPES.includes(String(type))) {
          h1 = String(get(`layout.${i}.title`) ?? "");
          break;
        }
      }
    }
    return {
      title: String(get("seo.metaTitle") ?? ""),
      description: String(get("seo.metaDescription") ?? ""),
      keyword: String(get("seo.primaryKeyword") ?? ""),
      secondary: (get("seo.secondaryKeywords") as string[] | undefined) ?? [],
      noindex: get("seo.robotsIndex") === "noindex",
      canonical: String(get("seo.canonicalUrl") ?? ""),
      path: collectionSlug === "posts" ? `/blog/${String(get("slug") ?? "")}/` : String(get("path") ?? "/"),
      docTitle: String(get("title") ?? ""),
      excerpt: String(get("excerpt") ?? ""),
      h1,
    };
  });
  const isPost = collectionSlug === "posts";
  const title = values.title || (isPost ? `${values.docTitle} | Top Spot Studio` : values.docTitle);
  const description = values.description || (isPost ? values.excerpt : "");
  const checks = runSeoChecks({
    metaTitle: title,
    metaDescription: description,
    primaryKeyword: values.keyword,
    secondaryKeywords: values.secondary,
    h1: values.h1,
    canonical: values.canonical,
    noindex: values.noindex,
  });
  const host = (process.env.NEXT_PUBLIC_SITE_URL || "https://topspotstudio.com").replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div style={{ marginBottom: 24 }}>
      <div className="tss-panel">
        <p className="tss-muted" style={{ margin: "0 0 8px" }}>
          Search result preview (approximate — search engines may rewrite titles and descriptions)
        </p>
        <div className="tss-serp">
          <div className="tss-serp__url">
            {host}
            {values.path.replace(/\/$/, "").replace(/\//g, " › ")}
          </div>
          <div className="tss-serp__title">{title.length > 65 ? `${title.slice(0, 62)}…` : title || "(no title)"}</div>
          <div className="tss-serp__desc">{description.length > 160 ? `${description.slice(0, 157)}…` : description || "(no description)"}</div>
        </div>
      </div>
      <div className="tss-panel">
        <Counter length={title.length} min={TITLE_RANGE.min} max={TITLE_RANGE.max} label="SEO title" />
        <Counter length={description.length} min={DESCRIPTION_RANGE.min} max={DESCRIPTION_RANGE.max} label="Meta description" />
        <p className="tss-muted" style={{ margin: "10px 0 4px" }}>
          H1 on the page: <strong>{values.h1 || "(not found — add a hero section)"}</strong>
        </p>
        {checks.map((c) => (
          <div key={c.id} className="tss-check">
            <span className={`tss-dot tss-dot--${c.level}`} aria-hidden />
            <span>{c.message}</span>
          </div>
        ))}
        <p className="tss-muted" style={{ margin: "10px 0 0" }}>
          These are editorial suggestions only. They never change your content and do not guarantee rankings. Content-length and
          secondary-keyword checks run in the SEO manager after saving.
        </p>
      </div>
    </div>
  );
}
