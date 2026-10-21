import Link from "next/link";
import type { AdminViewServerProps } from "payload";
import { DefaultTemplate } from "@payloadcms/next/templates";
import { Gutter } from "@payloadcms/ui";
import { redirect } from "next/navigation";
import { auditSeo, loadSiteIndex, type SeoRow } from "../../lib/site-audit";

const FILTERS: { key: string; label: string; test: (r: SeoRow) => boolean }[] = [
  { key: "all", label: "All", test: () => true },
  { key: "issues", label: "Has errors", test: (r) => r.errors > 0 },
  { key: "missing-title", label: "Missing SEO title", test: (r) => !r.metaTitle && r.collection === "pages" },
  { key: "missing-description", label: "Missing description", test: (r) => !r.metaDescription && r.collection === "pages" },
  { key: "missing-keyword", label: "No primary keyword", test: (r) => !r.primaryKeyword },
  { key: "noindex", label: "Noindex", test: (r) => r.noindex },
  { key: "drafts", label: "Draft / unpublished", test: (r) => r.status !== "published" },
];

export async function SeoManager({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req } = initPageResult;
  if (!req.user) redirect("/admin/login");
  const filterKey = typeof searchParams?.filter === "string" ? searchParams.filter : "all";
  const filter = FILTERS.find((f) => f.key === filterKey) ?? FILTERS[0];
  const rows = auditSeo(await loadSiteIndex(req.payload)).filter(filter.test);

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={req.user}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter>
        <div className="tss-view">
          <h1>SEO manager</h1>
          <p className="tss-muted">
            Titles, descriptions and keywords for every page and post, with editorial checks. Character guides are typical display
            widths, not guaranteed limits. Click a title to edit its SEO tab.
          </p>
          <nav className="tss-filters" aria-label="Filter">
            {FILTERS.map((f) => (
              <Link key={f.key} href={`/admin/seo-manager?filter=${f.key}`} aria-current={f.key === filter.key}>
                {f.label}
              </Link>
            ))}
          </nav>
          <table className="tss-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>SEO title</th>
                <th>Meta description</th>
                <th>Keywords</th>
                <th>Checks</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={`${r.collection}-${r.id}`}>
                  <td style={{ minWidth: 180 }}>
                    <Link href={`/admin/collections/${r.collection}/${r.id}`}>
                      <strong>{r.title}</strong>
                    </Link>
                    <div className="tss-muted">{r.path}</div>
                    <span className={`tss-badge ${r.status === "published" ? "tss-badge--ok" : "tss-badge--warn"}`}>{r.status}</span>{" "}
                    {r.noindex ? <span className="tss-badge tss-badge--warn">noindex</span> : null}
                  </td>
                  <td>
                    {r.metaTitle || <em className="tss-muted">missing</em>}
                    <div className="tss-muted">{r.metaTitle.length} chars</div>
                  </td>
                  <td>
                    {r.metaDescription || <em className="tss-muted">missing</em>}
                    <div className="tss-muted">{r.metaDescription.length} chars</div>
                  </td>
                  <td>
                    <strong>{r.primaryKeyword || <em className="tss-muted">none</em>}</strong>
                    {r.secondaryKeywords.length ? <div className="tss-muted">{r.secondaryKeywords.join(", ")}</div> : null}
                  </td>
                  <td style={{ minWidth: 260 }}>
                    {r.checks
                      .filter((c) => c.level !== "ok")
                      .map((c) => (
                        <div key={c.id} className="tss-check">
                          <span className={`tss-dot tss-dot--${c.level}`} aria-hidden />
                          {c.message}
                        </div>
                      ))}
                    {r.errors + r.warnings === 0 ? <span className="tss-badge tss-badge--ok">All checks passed</span> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 ? <p className="tss-muted">Nothing matches this filter.</p> : null}
        </div>
      </Gutter>
    </DefaultTemplate>
  );
}
