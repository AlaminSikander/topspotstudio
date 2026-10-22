# Top Spot Studio — Final CMS QA and handover report

Prepared 22 October 2026, 16:15 (UTC+6). Code tested: `main` at `a330b97` ("Fix production indexing and redirect www to the apex domain"), which is the code currently deployed to production. This report replaces the morning version (which tested `4ef3c0e`) and supersedes the status lines in `../FINAL-HANDOVER-REPORT.md` (see §5).

## 1. Summary

**CMS and website: PASS. Production SEO: FAIL, caused by one Vercel setting, not by code.**

- All CMS and website tests ran on an isolated copy of the production database (Neon branch `qa`) with a fake mail server. Nothing was deployed and no production data changed: all 53 production tables have the same row counts before and after testing (§6).
- CMS end-to-end suite: **120/120** on the first run. Broken-link detection: **7/7**. Crawl and SEO: **156/156**. Forms: **22/22**, with all 4 test emails delivered only to the mock inbox. Navigation: **15/15**. Screenshots of 15 routes at 375, 768 and 1440 px showed **no console errors, failed requests or horizontal overflow**. Lint and typecheck are clean and the production build succeeds.
- **Critical:** the live site still tells search engines not to index anything. The code fix in `a330b97` is live (the `www` redirect now works), but the Vercel Production environment has `NEXT_PUBLIC_SITE_ENV` set to a value other than `production`, and that explicit value overrides the new automatic fallback. The same build with the correct value behaves correctly (§4.1).

## 2. Results by checklist item

| # | Checklist item | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Production robots.txt, sitemap.xml, X-Robots-Tag, canonical | **FAIL** on production (robots, sitemap, noindex); canonicals and `www` redirect pass. **PASS** on QA with production settings. | §4.1, `logs/production-seo.log`, `logs/qa-crawl.log` |
| 2 | Edit title, meta description, content; publish/unpublish | **PASS** (21/21) | `raw/cms-qa-run3.json`: EDIT, DRAFT, PUB, SEO, SITEMAP |
| 3 | Blog draft, preview, publishing workflow | **PASS** (17/17) | BLOG, PREV, REV |
| 4 | Redirects, internal links, broken-link detection | **PASS** (15/15 + 7/7) | REDIR, LINK, `logs/broken-link-test.log` |
| 5 | Contact and audit forms to a mock destination | **PASS** (22/22 browser + 6 API checks) | `logs/qa-forms.log`, §4.5 |
| 6 | Admin authentication, permissions, audit log | **PASS** (44/44) | AUTH, PERM, ANON, AUDIT, SEC |
| 7 | QA crawl, build, typecheck, mobile regression | **PASS**, except `npm test` (Vitest not installed, no unit tests) | `logs/` |
| 8 | Report with screenshots, pass/fail, unresolved issues | Done (this file) | `screenshots/`, §3 |

The CMS suite also covered tracking codes (13/13), media (7/7), navigation globals (2/2) and cleanup (1/1); total 120.

## 3. Unresolved issues

| ID | Severity | Issue | Owner action |
| --- | --- | --- | --- |
| OI-1 | Critical | Production is not indexable: `robots.txt` is `Disallow: /`, the sitemap has 0 URLs, and every page sends `noindex, nofollow` in both the header and the meta tag. Re-checked 16:1x after the `a330b97` deploy with cache-busting requests. Cause: `NEXT_PUBLIC_SITE_ENV` is explicitly set to a non-production value in Vercel. | Vercel → Project → Settings → Environment Variables → **Production** scope: set `NEXT_PUBLIC_SITE_ENV=production` or delete it. Then redeploy Production, because the value is read at build time. Afterwards re-run `npm run qa:crawl -- https://topspotstudio.com` and submit the sitemap in Search Console. |
| OI-2 | High | Production email: the 22 Oct Vercel build log showed Gmail rejecting the SMTP login (`535`). If that's unchanged, contact/audit forms and CMS password resets fail in production. This can't be verified without Vercel access or sending a real email. | Re-enter `SMTP_PASS` (and check `SMTP_USER`) in Vercel without quotes, redeploy, then send one real test enquiry. |
| OI-3 | High | No durable media storage in production (`BLOB_READ_WRITE_TOKEN` was missing): images uploaded in `/admin` would be lost on the next deploy. Can't be verified from outside Vercel. | Vercel → Storage: create and connect a Blob store, then redeploy. Avoid uploading media until then. |
| OI-4 | Medium | `npm test` fails: the script runs Vitest, which isn't installed, and there are no unit test files. | Add Vitest and tests, or remove the script. Coverage today comes from the QA scripts. |
| OI-5 | Low | `CMS_EMAIL_FROM` must be a plain address. The CMS adds its own display name, so a value like `Name <cms@…>` (the format `FORM_FROM_EMAIL` accepts) produces a broken sender, `"Top Spot Studio CMS>" <cms@…>`. Seen on QA; `.env.example` doesn't warn about it. | In Vercel, set `CMS_EMAIL_FROM` to a bare address, e.g. `hello@topspotstudio.com`. Optionally add a note in `.env.example`. |
| OI-6 | Low | Some `www`/`http` URLs reach the apex in two hops: `https://www…/about` → `www…/about/` → apex, and `http://www…/` → `https://www…/` → apex. Canonical `www` URLs with a trailing slash take one hop. | Optional: Vercel → Domains, set `www.topspotstudio.com` to "Redirect to topspotstudio.com" (308). |
| OI-7 | Low | Unknown URLs return 404 correctly, but the page carries two robots meta tags (`noindex` and `noindex, follow`). Both say noindex, so there's no SEO harm. Related to known issue KI-04 (minimal 404 HTML shell). | None required; tidy up with the 404 template. |
| OI-8 | Low | The blog is linked in the header and footer but has **0 published posts**. The blog stays `noindex` and out of the sitemap while `NEXT_PUBLIC_BLOG_ENABLED=false`. The privacy policy is also `noindex` while `NEXT_PUBLIC_PRIVACY_APPROVED=false`. Both are intentional launch gates. | Publish about three articles, then set the blog flag to `true`. Set the privacy flag once the policy is approved. |
| OI-9 | Low | Dashboard: 15 pages/posts have no primary keyword. | Editorial: enter keywords in each page's SEO tab. |

Closed since the morning report: **`www` not redirecting** (fixed by `a330b97`, verified live), and **AUTH-11 intermittent failure** (passed in the morning's second run and again this time).

## 4. Details

### 4.1 Production SEO (item 1)

Live checks, read-only, 15:49 and 16:1x (UTC+6), after `a330b97` was deployed:

| Check | Live result | Status |
| --- | --- | --- |
| `robots.txt` | `User-Agent: *` / `Disallow: /` | FAIL (OI-1) |
| `sitemap.xml` | 200, 0 URLs | FAIL (OI-1) |
| `X-Robots-Tag` | `noindex, nofollow` on every public page tested and on `robots.txt` | FAIL (OI-1) |
| Meta robots | `noindex, nofollow` | FAIL (OI-1) |
| Canonical | Exactly one self-referencing `https://topspotstudio.com/…/` canonical on all 9 public pages tested | PASS |
| `www` → apex | 308, keeps path and query (`www…/about/?x=1` → `https://topspotstudio.com/about/?x=1`) | PASS (see OI-6 for two-hop cases) |
| `http` → `https` | 308 | PASS |
| `/admin`, private API | `/admin` is `noindex, nofollow`; anonymous `/cms-api/users/` and `/cms-api/audit-logs/` return 403; GraphQL 404; the first-user screen is closed (`users/init` → `initialized: true`) | PASS |

The same code on the QA server with production settings (`NEXT_PUBLIC_SITE_ENV=production`) gave: `robots.txt` with `Allow: /`, media files allowed, `/api/`, `/admin/`, `/cms-api/`, `/preview/` and `/exit-preview/` disallowed, plus the absolute sitemap URL; a sitemap with 13 canonical URLs; `index, follow` on public pages; `noindex` only on the intentionally gated blog and privacy pages and on admin/preview; and the `www` redirect. The crawl passed 156/156. So OI-1 needs only the Vercel setting change and a redeploy.

### 4.2 Page editing and publishing (item 2) — 21/21

The editor creates a draft page; section order and reordering follow the CMS; a homepage hero edit appears on the live homepage and is then restored (EDIT-01…05). Drafts aren't public, aren't in the API or the sitemap, and saving a draft of a live page leaves the live page unchanged (DRAFT-01…04). Publishing renders the page on the server, and unpublishing returns a 404 and removes it from the sitemap (PUB-01…03, SITEMAP-01). SEO title and meta description edits appear in the server HTML (`<title>`, `og:title`). Each page has exactly one title, description and canonical, plus FAQ schema, an OG image and noindex handling, and the revert works (SEO-01…08).

### 4.3 Blog workflow (item 3) — 17/17

A draft post returns 404 publicly. It's visible in preview to a signed-in editor, and once published it gets a listing card and BlogPosting + BreadcrumbList schema. Updates work, a slug change creates a 308 redirect, and unpublishing removes both the post and its card (BLOG-01…10). Preview requires a CMS session, is `noindex`, shows drafts, ignores a copied draft-mode cookie without a session, and exits cleanly (PREV-01…06). Restoring an earlier revision works (REV-01).

### 4.4 Redirects, links and broken-link detection (item 4) — 15/15 + 7/7

Redirects (REDIR-01…12) cover 308 and 307 and path normalisation. They're blocked when they would shadow a live page, form a chain, or point to an open/protocol-relative, `javascript:`, reserved or non-live destination, and editors can't create off-site redirects. Admin-approved external https redirects work, and disabling a redirect restores the 404. Links render as crawlable `<a href>`, new-tab links get `rel="noopener noreferrer"`, and removal works (LINK-01…03).

Broken-link detection (`raw/broken-link-test.mjs`, QA database): two hidden test links were added to the footer through the CMS API as the QA admin. The Link Manager listed `/qa-missing-page/` as **Broken** and `/about/#qa-no-such-anchor` as **Missing #anchor**. The dashboard count went from 0 to 2, and back to 0 after the footer was restored. The public footer HTML was byte-identical before and after, and the hidden links were never rendered.

![Link Manager flagging the test links](screenshots/admin/link-manager-broken-links.jpg)

### 4.5 Forms (item 5) — 22/22 + 6

The audit and contact forms were tested at 1440 and 375 px. Both show inline errors on an empty submit, move focus to the first invalid field, set `aria-invalid`, keep entered data, and show success states. Analytics events fire with no personal data in the dataLayer. All 4 submissions (2 audit requests, 2 enquiries) went to the mock SMTP server on `localhost:2525`, recipient `inbox@example.com`. No real email was sent, because SMTP credentials were blanked in the QA environment.

Server-side checks on `/api/contact/` and `/api/audit/`: missing fields → 422 with field errors; malformed JSON → 400; GET → 405; repeated submissions from one IP → 429. The handler also has a honeypot field and a minimum fill time. The forms post to the trailing-slash URLs, so they never hit the 308.

### 4.6 Authentication, permissions, audit log (item 6) — 44/44

- **Authentication (AUTH-01…15):** wrong passwords and unknown accounts are rejected. The session cookie is HttpOnly + SameSite=Lax, and there's no public registration. Short passwords are rejected; 5 failures lock the account and an admin can unlock it. Inactive accounts are refused, logout works, and cross-origin cookie use is refused (CSRF). Password reset mail goes to the mock server only, and the login endpoint returns 429 after 10 attempts.
- **Permissions (PERM-01…12, ANON-01…09):** editors cannot see other users, create users, promote themselves, read tracking codes or the audit log, change settings, add codes, delete or unpublish built-in pages, or change their URLs. Editors without publish permission can only save drafts. Anonymous API access to users, redirects, codes, the audit log, settings and versions is denied, and GraphQL is disabled.
- **Audit log (AUDIT-01/02):** publish, unpublish, redirect, code and login events are recorded, and entries can't be deleted, even by an admin. The dashboard below shows this run's events attributed to `qa-admin@tss.local`.
- **Security (SEC-01…06):** admin and API responses send `noindex` and `no-store`, and there are no secrets or database URLs in client bundles or public HTML.

![CMS dashboard with recent audit-log activity](screenshots/admin/dashboard.jpg)

### 4.7 Build and regression (item 7)

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | 0 problems |
| Types | `npm run typecheck` | 0 errors |
| Unit tests | `npm test` | **Not runnable** (OI-4) |
| Build | `npm run build` | OK; 39 static pages; public pages static, admin/API/preview dynamic |
| Crawl and SEO | `npm run qa:crawl -- http://localhost:3100 https://topspotstudio.com` | 156 passed, 0 failed, 0 warnings |
| Navigation | `npm run qa:nav` | 15/15 |
| Mobile/tablet/desktop regression | `npm run qa:screens` (15 routes × 375/768/1440) | No console errors, failed requests or overflow |
| Admin screens | `node scripts/admin-screens.mjs` | 11 views, no page errors |

The build log contains an `ECONNREFUSED 127.0.0.1:2525` warning. That's expected: the mock mail server wasn't running during the build.

## 5. Production changes on 22 Oct (outside testing, on owner instruction)

`../FINAL-HANDOVER-REPORT.md` says "production untouched", "nothing deployed" and "isolated local databases". That's no longer accurate:

1. PR #1 was merged to `main` and deployed to production by Vercel.
2. Commit `a330b97` (SEO environment fallback and `www` redirect) was pushed to `main` at the owner's request at 15:32 and deployed automatically.
3. Local development (`.env.local`) points at the Neon **production** branch, so CMS edits from a local server change the live site. Use the `qa` branch for testing.
4. The first admin account (`alamin.6534@gmail.com`) was created in production.
5. Navigation and footer "Blog" links were changed to "always" on the live CMS.

No production change was made during this QA run. All production checks were GET requests, except one empty POST to `/cms-api/users/first-register/` to confirm first-user registration is closed. It returned 403 and created nothing, and the row counts confirm no change.

## 6. Test environment and safety

- **Database:** Neon branch `qa` (`br-ancient-cell-b4p6we1b`, host `ep-weathered-smoke`), copied from `production` on 22 Oct 07:37 UTC; **auto-expires 29 Oct 2026**. Its host was checked against production (`ep-curly-surf`) before testing.
- **Server:** `next start` on `localhost:3100`, production-mode build with `NEXT_PUBLIC_SITE_ENV=production`, separate `PAYLOAD_SECRET`, local media storage, GTM disabled, mock SMTP on `:2525`. Shell variables from `.tmp/qa.env` override `.env.local`; the only values taken from `.env.local` were the privacy flag and the empty contact email.
- **Test accounts:** `qa-admin@tss.local` and `qa-editor@tss.local` exist **only on the `qa` branch**. Their passwords are in git-ignored `.tmp/qa-credentials.env`.
- **Cleanup:** all QA records (`qa-test-*`) were removed by the suite (0 left in pages, posts and redirects), and the footer test links were reverted.
- **Production after testing:** 53 tables / 310 rows, identical to before testing. The latest page and post update times are unchanged (`02:36 UTC` and `21 Oct 22:28 UTC`), and there are no `qa-*` users (`raw/prod-row-counts-before.json`, `raw/prod-row-counts-after.json`).

## 7. Evidence index

- `logs/`: lint, typecheck, unit, build, crawl, forms, nav, screens, admin screens, broken-link test, production SEO checks, and CMS suite run 3 (this run). `cms-qa.log` and `cms-qa-run2.log` are from the morning runs on `4ef3c0e`.
- `raw/cms-qa-run3.json`: every CMS check with ID, area, status and detail (runs 1 and 2 kept for history).
- `raw/prod-row-counts-*.json`: production row counts before and after testing.
- `raw/broken-link-test.mjs`: the broken-link detection script (QA server only).
- `screenshots/site/`: 15 routes × 375/768/1440 px.
- `screenshots/admin/`: dashboard, pages list, page editor, SEO tab, structured data, SEO manager, Link Manager (normal and with broken test links), dashboard with broken-link count, redirects, tracking codes, posts, navigation.

## 8. Reproduce

```bash
neon connection-string qa --pooled   # QA database; never use the production URL for tests
source .tmp/qa.env                   # QA-only settings (git-ignored)
npm run build
MOCK_LOG=.tmp/mock-smtp-cms.log node scripts/mock-smtp.mjs &
npx next start -p 3100
npm run qa:crawl -- http://localhost:3100 https://topspotstudio.com
npm run qa:forms -- http://localhost:3100 && npm run qa:nav -- http://localhost:3100 && OUT=handover/05-final-qa/screenshots/site npm run qa:screens -- http://localhost:3100
source .tmp/qa-credentials.env && node scripts/cms-qa.mjs http://localhost:3100 handover/05-final-qa/raw/cms-qa-run3.json
node handover/05-final-qa/raw/broken-link-test.mjs http://localhost:3100 handover/05-final-qa/screenshots/admin
```

The current `.next` build uses the QA settings. Run `npm run build` with your normal settings before using `next start` locally.
