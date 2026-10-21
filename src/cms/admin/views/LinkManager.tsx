import Link from "next/link";
import type { AdminViewServerProps } from "payload";
import { DefaultTemplate } from "@payloadcms/next/templates";
import { Gutter } from "@payloadcms/ui";
import { redirect } from "next/navigation";
import { auditLinks, auditRedirects, loadSiteIndex, type LinkStatus } from "../../lib/site-audit";

const STATUS_LABEL: Record<LinkStatus, string> = {
  ok: "OK",
  broken: "Broken",
  redirected: "Redirected",
  unpublished: "Target unpublished",
  external: "External",
  "anchor-missing": "Missing #anchor",
};
const BADGE: Record<LinkStatus, string> = { ok: "ok", broken: "error", "anchor-missing": "error", redirected: "warn", unpublished: "warn", external: "" };

export async function LinkManager({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req } = initPageResult;
  if (!req.user) redirect("/admin/login");
  const idx = await loadSiteIndex(req.payload);
  const [navigation, footer] = await Promise.all([
    req.payload.findGlobal({ slug: "navigation", depth: 0, overrideAccess: true }),
    req.payload.findGlobal({ slug: "footer", depth: 0, overrideAccess: true }),
  ]);
  const all = auditLinks(idx, { navigation, footer });
  const status = typeof searchParams?.status === "string" ? searchParams.status : "all";
  const q = typeof searchParams?.q === "string" ? searchParams.q.toLowerCase() : "";
  const view = searchParams?.view === "redirects" ? "redirects" : "links";
  const rows = all
    .filter((r) => (status === "all" ? r.status !== "external" || q : status === "issues" ? ["broken", "anchor-missing", "redirected", "unpublished"].includes(r.status) : r.status === status))
    .filter((r) => !q || [r.sourceTitle, r.sourcePath, r.href, r.anchorText].some((v) => v.toLowerCase().includes(q)));
  const redirectIssues = auditRedirects(idx);
  const counts = (s: LinkStatus) => all.filter((r) => r.status === s).length;
  const editHref = (r: (typeof all)[number]) =>
    r.sourceType === "navigation" ? "/admin/globals/navigation" : r.sourceType === "footer" ? "/admin/globals/footer" : `/admin/collections/${r.sourceType}/${r.sourceId}`;

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
          <h1>Internal links &amp; redirects</h1>
          <p className="tss-muted">
            Every link in pages, posts, navigation and footer (latest saved versions), with destination checks. To add a link, select text in
            any rich-text field and use the link button; choose &ldquo;Page or post&rdquo; so the link follows the page if its URL changes.
          </p>
          <nav className="tss-filters" aria-label="Views">
            <Link href="/admin/link-manager" aria-current={view === "links" && status === "all"}>
              Internal links ({all.filter((r) => r.status !== "external").length})
            </Link>
            <Link href="/admin/link-manager?status=issues" aria-current={status === "issues"}>
              Needs attention ({counts("broken") + counts("anchor-missing") + counts("redirected") + counts("unpublished")})
            </Link>
            <Link href="/admin/link-manager?status=broken" aria-current={status === "broken"}>
              Broken ({counts("broken")})
            </Link>
            <Link href="/admin/link-manager?status=external" aria-current={status === "external"}>
              External ({counts("external")})
            </Link>
            <Link href="/admin/link-manager?view=redirects" aria-current={view === "redirects"}>
              Redirect conflicts ({redirectIssues.length})
            </Link>
            <Link href="/admin/collections/redirects">Manage redirects →</Link>
          </nav>
          {view === "redirects" ? (
            <table className="tss-table">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Issue</th>
                </tr>
              </thead>
              <tbody>
                {redirectIssues.map((r) => (
                  <tr key={`${r.id}-${r.issue}`}>
                    <td>
                      <Link href={`/admin/collections/redirects/${r.id}`}>{r.from}</Link>
                    </td>
                    <td>{r.issue}</td>
                  </tr>
                ))}
                {redirectIssues.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="tss-muted">
                      No redirect loops, chains or conflicts found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          ) : (
            <>
              <form method="get" style={{ margin: "0 0 12px" }}>
                <input type="hidden" name="status" value={status} />
                <input
                  type="search"
                  name="q"
                  defaultValue={q}
                  placeholder="Search source page, destination or anchor text"
                  aria-label="Search links"
                  style={{ width: "min(420px, 100%)", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--theme-elevation-200)", background: "var(--theme-input-bg)", color: "inherit" }}
                />
              </form>
              <table className="tss-table">
                <thead>
                  <tr>
                    <th>Source page</th>
                    <th>Anchor text</th>
                    <th>Destination</th>
                    <th>Status</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                      <td>
                        <Link href={editHref(r)}>{r.sourceTitle}</Link>
                        <div className="tss-muted">{r.sourcePath}</div>
                      </td>
                      <td>{r.anchorText || <em className="tss-muted">(no text)</em>}</td>
                      <td>
                        <code>{r.href}</code>
                        {r.newTab ? <div className="tss-muted">opens in new tab</div> : null}
                      </td>
                      <td>
                        <span className={`tss-badge ${BADGE[r.status] ? `tss-badge--${BADGE[r.status]}` : ""}`}>{STATUS_LABEL[r.status]}</span>
                      </td>
                      <td className="tss-muted" style={{ wordBreak: "break-all" }}>
                        {r.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {rows.length === 0 ? <p className="tss-muted">No links match.</p> : null}
            </>
          )}
        </div>
      </Gutter>
    </DefaultTemplate>
  );
}
