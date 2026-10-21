# Staging and security results

## Staging status: NOT DEPLOYED (blocked — owner decision)

A protected Vercel Preview needs (a) Vercel project access from this workstation (the Vercel CLI is not installed and no access was provided), (b) an approved hosted Postgres database separate from production (e.g. Neon via Vercel Marketplace — cost/region decision), and (c) approved media storage (Vercel Blob — cost decision). Per the brief, no paid service was activated. All acceptance testing was therefore done on an **isolated local production-mode build**, which is the documented fallback. Staging steps are in `../04-release/release-checklist.md`.

## Security checks (all automated in `scripts/cms-qa.mjs`, 120/120 pass)

| Area | Result | Test IDs |
| --- | --- | --- |
| Login / invalid login / unknown user / logout | pass | AUTH-01…05, AUTH-12 |
| No public registration (first-register closed, anonymous user creation 403) | pass | AUTH-06, AUTH-07 |
| Password policy (12+ chars) | pass | AUTH-08 |
| Lockout after 5 failures, admin unlock, inactive accounts blocked | pass | AUTH-09…11 |
| CSRF: cookie ignored from untrusted Origin | pass | AUTH-13 |
| Password reset email (mock SMTP only) | pass | AUTH-14 |
| Per-IP login rate limit (429 after 10/15 min) | pass | AUTH-15 |
| Session cookie `HttpOnly`, `SameSite=Lax`, `Secure` in production | pass | AUTH-04 (+ `Set-Cookie` verified with secure flag) |
| Editor cannot manage users, roles, settings, tracking codes, audit log, deletions | pass | PERM-01…08 |
| Built-in pages: undeletable, URL fixed, editors cannot unpublish | pass | PERM-09…11 |
| Publish permission per user | pass | PERM-12 |
| Anonymous API: users, redirects, codes, audit, settings, versions denied; no page creation; drafts hidden; GraphQL off | pass | ANON-01…09, DRAFT-02 |
| Draft confidentiality on the website and sitemap | pass | DRAFT-01, 03, 04 |
| Preview requires CMS session; stolen draft cookie useless; noindex; no tracking codes | pass | PREV-01…06, CODE-12 |
| Uploads: image types only, alt required, SVG and disguised files rejected, anonymous upload blocked | pass | MEDIA-01…07 |
| Tracking codes: admin-only, allow-listed elements, no inline handlers, https-only, placement enforced, consent gating | pass | CODE-01…13, PERM-04/07 |
| Redirect safety: no live-page shadowing, chains, loops, open redirects, `javascript:` | pass | REDIR-04…10 |
| Audit log append-only and complete for key actions | pass | AUDIT-01/02 |
| Admin/API `X-Robots-Tag` noindex, admin `no-store`, robots.txt disallow, admin views require login | pass | SEC-01…04 |
| No secrets (`PAYLOAD_SECRET`, `DATABASE_URL`, `SMTP_PASS`) in `.next/static` bundles or public HTML | pass | SEC-05/06 |

## Residual risks (see `../04-release/known-issues-and-costs.md`)

- Admin shares the public origin, so a malicious admin-approved script could act on behalf of a signed-in admin who browses the public site. Mitigation: codes are admin-only, audited and validated; option to serve the CMS from a separate subdomain later (KI-06).
- The login rate limit is per server instance; add a Vercel Firewall rate-limit rule for `/cms-api/users/login` in production (KI-05).
- No Content-Security-Policy on public pages (D17, KI-07).
- Transitive npm advisories in tooling (KI-08).
