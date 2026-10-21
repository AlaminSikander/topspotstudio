# Final handover report — Top Spot Studio CMS, website editor & SEO backend

Prepared 22 October 2026 for Asif (SEO owner) by the development workstream. Branch `feature/payload-seo-cms`.

## 1. Executive status

**PASS WITH DOCUMENTED LIMITATIONS — local acceptance complete; protected staging BLOCKED pending owner approvals; nothing deployed.**

- The CMS is implemented inside the existing Next.js app. All 15 public pages, the blog, navigation, footer, settings, SEO, structured data, redirects and tracking codes are editable at `/admin`.
- The CMS-rendered site is **content- and SEO-identical** to the pre-CMS site on all 15 routes (text, headings, links, image alts, JSON-LD, titles, descriptions, canonicals, robots). The original QA suites pass unchanged (crawl 156/0, forms 22/22, navigation 15/15, screenshots clean). A new end-to-end CMS suite passes 120/120.
- **Critical pre-existing issue (not caused or changed by this work):** the live site is not indexable because Production was built without `NEXT_PUBLIC_SITE_ENV=production` and `NEXT_PUBLIC_SITE_URL` (canonicals point to `http://localhost:3000`). Fix requires your approval (§5).
- Blocked: protected staging (needs a hosted database, media storage and Vercel access — cost/permission decisions).

## 2. What was implemented

| Requirement | Delivered |
| --- | --- |
| Secure admin at `/admin` | Payload 3.91 admin; no public registration; Admin/Editor roles; per-user “can publish” and “active”; lockout; rate limit; CSRF/CORS allow-list; audit log |
| Dashboard | Live counts: pages/posts published vs draft, missing titles/descriptions/keywords, broken links, redirected links, redirect conflicts, recent updates, publishing activity |
| Edit every page | 15 built-in routes migrated into ~40 structured blocks that reuse the existing components; add, remove, reorder sections; built-in URLs locked |
| Rich text + links on any text | Lexical editor: bold/italic/underline, lists, headings, alignment, text styles, internal page/post picker, URLs, `#anchors`, `mailto:`/`tel:`, new tab with safe `rel`, link title, nofollow/sponsored/ugc; crawlable `<a href>` output |
| SEO manager | Per page/post: SEO title, description, primary + secondary keywords, H1 (posts), canonical override, robots index/follow, sitemap inclusion, OG + X/Twitter fields; live search preview and checks; site-wide SEO manager with filters |
| Metadata in server HTML | Next.js metadata API from CMS data; one title/description/canonical; verified in raw HTML (SEO-01…08) |
| Tracking & Verification Codes | Admin-only; Header / Body-start / Footer placement; all pages / selected pages / templates; environment scope; enable/disable; provider validation (GSC, GTM head/body, GA4, Bing, Clarity, Meta Pixel); consent gating; never in admin/preview |
| Blog | Draft → preview → publish → update → slug change with automatic redirect → unpublish → restore version; listing, related posts, BlogPosting schema, sitemap rule preserved |
| Media library | Upload, alt (required), caption, credit/licence, sizes, focal point, usage panel, replacement on the same record, type/size validation, SVG blocked |
| Internal links | Link manager listing every link with status (OK/broken/redirected/unpublished/missing anchor/external) |
| Redirects | Runtime 308/307, immediate, safety validation (no live-page shadowing, chains, loops, open redirects) |
| Navigation, footer, settings | Globals with visibility rules (blog link hidden until launch), organisation schema facts (Bangladesh only), shared proof figures, 404 copy |
| Structured data | Organization, WebSite, WebPage/About/Contact/Collection, Service, Article/BlogPosting, Blog, BreadcrumbList, FAQPage, Person, ItemList from visible content; validation + preview; no free-form JSON |
| Sitemap / robots / canonicals | From published, indexable, self-canonical records; production-only as before; `/admin`, `/cms-api`, `/preview` disallowed |
| Preview | Draft Mode + valid CMS session; banner; noindex; no tracking codes |
| Cache | Static pages kept; publish/unpublish/global/redirect/code changes revalidate every path, OG images, sitemap and robots |

Route coverage: 15/15 public routes CMS-backed (`03-quality/ROUTE-PARITY.csv`). Code-managed by design: form fields and email delivery, diagrams/icons (selectable), case-study layout labels, environment flags.

## 3. Code and environment

| Item | Value |
| --- | --- |
| Branch | `feature/payload-seo-cms` (see `git log` for the latest commit) |
| Rollback tag | `pre-cms-baseline-bb8fe28` → `bb8fe281cbc74e738973ddec69b2837b9786e227` |
| Versions | Next 16.4.2, React 19.3.0, Payload 3.91.0 (+ db-postgres, richtext-lexical, next, ui, email-nodemailer, storage-vercel-blob), PostgreSQL 18 local |
| Migration | `src/migrations/20261021_150424_initial_cms_schema` |
| Staging URL | none (not deployed) |
| Production | untouched (no deploy, env, DNS or database changes) |

Key files: `src/payload.config.ts`, `src/cms/**` (collections, blocks, fields, hooks, admin UI, seed), `src/components/cms/**` (renderers), `src/lib/cms/**` (queries, metadata, schema, links), `src/app/(frontend)/**`, `src/app/(payload)/**`, `scripts/cms-qa.mjs`, `scripts/parity-diff.mjs`, `scripts/seo-snapshot.mjs`, `scripts/cms-create-user.ts`.

## 4. QA summary

See `03-quality/build-and-test-results.md` and `QA-MATRIX.csv` (131 PASS, 1 recorded baseline finding, 1 pass-with-limitation, 1 blocked).

- Raw HTML example (CMS build, `/markets/new-zealand/seo/`): `<title>SEO Services NZ for Service Businesses | Top Spot Studio</title>`, one `<link rel="canonical" href="https://topspotstudio.com/markets/new-zealand/seo/">`, `<meta name="robots" content="index, follow">`, JSON-LD `WebPage|Service|BreadcrumbList|FAQPage` — identical to the pre-CMS build.
- Publishing evidence: SEO-07 (title edit visible in server HTML within seconds), SITEMAP-01/SEO-06/PUB-03 (sitemap add/remove), BLOG-01…10.
- Forms tested only against mock SMTP; no real email was sent.
- Bugs found and fixed during QA: silenced revalidation, unpublish detection with drafts (also a permission gap), login lock wait, media URL redirect (`01-architecture/implementation-decisions.md`).

## 5. Indexing diagnosis

Live (`https://topspotstudio.com`, 21 Oct 2026 13:52 UTC): `noindex, nofollow` meta and header on every page, `robots.txt` `Disallow: /`, empty sitemap, canonicals/OG on `http://localhost:3000`, apex and www both 200. A local build with the two variables unset reproduces this byte-for-byte; with `NEXT_PUBLIC_SITE_ENV=production` + `NEXT_PUBLIC_SITE_URL=https://topspotstudio.com` everything is correct (13-URL sitemap, self-canonicals, index/follow). **Remaining owner action:** set both variables in Vercel Production, choose the preferred host, redeploy. Full detail: `00-baseline/indexing-difference.md`.

## 6. Data, storage and security

Isolated local databases (`tss_cms_dev`, `tss_cms_test`); migrations only; backup/restore and rollback rehearsed with identical row counts. Media local in dev; Vercel Blob ready but disabled until approved. Security results: `03-quality/staging-security-results.md` (auth, roles, anonymous API, drafts, preview, uploads, codes, redirects, headers, secret scan — all pass).

## 7. Known issues, risks, costs

`04-release/known-issues-and-costs.md`. Highest: KI-00 indexing (pre-existing, critical), KI-01 staging blocked, KI-02 duplicate host, KI-03 media storage before any upload. No costs incurred.

## 8. Demo and usage

Admin login with credentials shared separately (create production accounts with `npm run cms:create-admin`). How to edit a title, page section, link, schema, blog post, image, redirect, internal link and tracking code: `02-features/cms-user-guide.md`. Screenshots: `03-quality/screenshots/admin/`.

## 9. Production release steps (plan only)

`04-release/release-checklist.md` (approvals → staging → backup → migrate → seed → accounts → firewall rule → deploy → smoke tests → monitor) and `04-release/database-migration-and-rollback.md` (rollback decision tree).

## 10. Owner approval checklist (yes / no)

| # | Decision | Yes / No |
| --- | --- | --- |
| 1 | Accept route/SEO parity evidence (`ROUTE-PARITY.csv`, `SEO-BEFORE-AFTER.csv`) | |
| 2 | Accept intentional changes: robots.txt also disallows `/admin/`, `/cms-api/`, `/preview/`; sitemap gains `<lastmod>` | |
| 3 | Approve hosted Postgres (provider, region, preview + production separation, cost) | |
| 4 | Approve media storage (Vercel Blob or S3/R2) and cost | |
| 5 | Provide Vercel access for a protected staging deployment | |
| 6 | Approve the separate Production indexing fix (set `NEXT_PUBLIC_SITE_ENV`, `NEXT_PUBLIC_SITE_URL`, redeploy) | |
| 7 | Choose preferred host: apex or www | |
| 8 | Approve corrected privacy-policy wording (SMTP instead of Resend) | |
| 9 | Enter primary/secondary keywords per page (your editorial decision) | |
| 10 | Approve account creation: Al Amin = Admin, Asif = Editor (with publish permission) | |
| 11 | Approve production release after staging passes | |
