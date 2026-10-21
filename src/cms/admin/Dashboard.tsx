import Link from "next/link";
import type { Payload, TypedUser } from "payload";
import { siteOverview } from "../lib/site-audit";

const fmt = (iso: string) => new Date(iso).toLocaleString("en-NZ", { dateStyle: "medium", timeStyle: "short" });

function Stat({ value, label, href, level }: { value: number | string; label: string; href?: string; level?: "warn" | "error" }) {
  const body = (
    <>
      <strong>{value}</strong>
      <span className="tss-muted">{label}</span>
    </>
  );
  return <div className={`tss-stat ${level && Number(value) > 0 ? `tss-stat--${level}` : ""}`}>{href ? <Link href={href}>{body}</Link> : body}</div>;
}

/** Overview shown above the Payload dashboard. Every figure comes from live database records. */
export async function Dashboard({ payload, user }: { payload: Payload; user?: TypedUser | null }) {
  const o = await siteOverview(payload);
  const isAdmin = (user as { role?: string } | null)?.role === "admin";
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ marginBottom: 4 }}>Website overview</h2>
      <p className="tss-muted" style={{ marginTop: 0 }}>
        Live figures from the CMS database. Published changes appear on the website within seconds; drafts stay private.
      </p>
      <div className="tss-stats">
        <Stat value={o.pages.total} label={`Pages (${o.pages.published} published, ${o.pages.drafts} draft)`} href="/admin/collections/pages" />
        <Stat value={o.posts.published} label={`Published blog posts (${o.posts.drafts} draft)`} href="/admin/collections/posts" />
        <Stat value={o.missingTitle} label="Pages missing an SEO title" href="/admin/seo-manager?filter=missing-title" level="error" />
        <Stat value={o.missingDescription} label="Pages missing a meta description" href="/admin/seo-manager?filter=missing-description" level="error" />
        <Stat value={o.missingKeyword} label="Pages/posts without a primary keyword" href="/admin/seo-manager?filter=missing-keyword" level="warn" />
        <Stat value={o.brokenLinks} label="Broken internal links" href="/admin/link-manager?status=broken" level="error" />
        <Stat value={o.redirectedLinks} label="Links pointing at redirected URLs" href="/admin/link-manager?status=redirected" level="warn" />
        <Stat value={o.redirectIssues} label="Redirect conflicts" href="/admin/link-manager?view=redirects" level="error" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
        <div className="tss-panel">
          <strong>Recently updated</strong>
          <table className="tss-table" style={{ marginTop: 8 }}>
            <tbody>
              {o.recent.map((r) => (
                <tr key={`${r.collection}-${r.id}`}>
                  <td>
                    <Link href={`/admin/collections/${r.collection}/${r.id}`}>{r.title}</Link>
                    <div className="tss-muted">{r.path}</div>
                  </td>
                  <td>
                    <span className={`tss-badge ${r.status === "published" ? "tss-badge--ok" : "tss-badge--warn"}`}>{r.status}</span>
                  </td>
                  <td className="tss-muted">{fmt(r.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tss-panel">
          <strong>Recent publishing activity</strong>
          {o.activity.length ? (
            <table className="tss-table" style={{ marginTop: 8 }}>
              <tbody>
                {o.activity.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <span className="tss-badge">{a.action}</span> {a.docLabel}
                      <div className="tss-muted">{a.entity}</div>
                    </td>
                    <td className="tss-muted">{a.userEmail}</td>
                    <td className="tss-muted">{fmt(a.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="tss-muted">No publishing activity recorded yet.</p>
          )}
          {isAdmin ? (
            <p style={{ margin: "8px 0 0" }}>
              <Link href="/admin/collections/audit-logs">Full audit log →</Link>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
