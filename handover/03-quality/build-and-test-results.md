# Build and test results

All runs: 21–22 October 2026, local machine (macOS, Node 20.20.2, PostgreSQL 18.4), production-mode builds with `NEXT_PUBLIC_SITE_ENV=production NEXT_PUBLIC_SITE_URL=https://topspotstudio.com`, mock SMTP on `:2525` (no real email sent). Logs in `logs/` and `raw/`.

## Summary

| Area | Command | Baseline (pre-CMS, `bb8fe28`) | CMS branch (final build) |
| --- | --- | --- | --- |
| Lint | `npm run lint` | 0 problems | 0 problems |
| Types | `npm run typecheck` | 0 errors | 0 errors |
| Build | `npm run build` | OK, all pages static | OK; all 15 public pages still static (○); admin/API/preview/catch-all dynamic |
| Crawl & SEO | `npm run qa:crawl -- http://localhost:3100 https://topspotstudio.com` | 156 passed / 0 failed | **156 passed / 0 failed / 0 warnings** |
| Link matrix (96 rows) | part of crawl | 96/96 | 96/96 |
| Forms | `npm run qa:forms` | 22/22 | **22/22** (audit + contact, desktop + mobile, mock SMTP) |
| Navigation | `npm run qa:nav` | 15/15 | **15/15** |
| Screenshots | `npm run qa:screens` (375/768/1440 × 15) | no errors/overflow | **no console errors, failed requests or overflow** |
| SEO field diff | `node scripts/seo-snapshot.mjs` × 2 | — | **0 differences** in 24 fields × 15 routes (title, description, H1, canonical, robots, X-Robots-Tag, OG, Twitter, JSON-LD types, link/image counts, alts) |
| HTML parity | `node scripts/parity-diff.mjs http://localhost:3101 http://localhost:3100` | — | **15/15 routes identical** visible text, headings, links, image alts, JSON-LD (deep), head SEO tags; element/class structure 97.0–100% similar |
| CMS end-to-end | `node scripts/cms-qa.mjs` | — | **120 passed / 0 failed** |
| DB rehearsal | migrate → seed → migrate:down → migrate → dump → restore | — | pass, identical row counts |

## Where the remaining structural differences come from (97–100%)

Rendering through CMS blocks adds a few wrapper `<div>`s (block spacing) and, in a handful of places, uses the shared `SectionHeader`/card markup instead of one-off JSX (e.g. the “What these case studies show” column, card list spacing). Text, links, headings, images and schema are byte-identical; screenshots show no layout breakage. Small spacing differences (≤ 8 px) are possible in those spots; see the screenshots in `screenshots/site/` versus `../00-baseline/screenshots/`.

## Known test limitation

- **404 initial HTML** (REG-07): unknown URLs return 404 + `noindex`, and visitors see the same branded 404 page, but the initial HTML is Next.js’s minimal error shell with the page rendered on hydration (a Next 16 behaviour for `notFound()` in dynamic routes with multiple root layouts). Crawlers only need the 404 status. See KI-04.

## Test credentials

Local-only accounts `admin@tss.local` and `editor@tss.local`, random passwords stored in git-ignored `.tmp/cms-local-credentials.env`. They exist only in the local database and must not be recreated on any deployed environment.

## Commands to reproduce

```bash
npm ci
createdb tss_cms_dev && npm run cms:migrate && npm run cms:seed
node scripts/mock-smtp.mjs &                       # mock email
NEXT_PUBLIC_SITE_ENV=production NEXT_PUBLIC_SITE_URL=https://topspotstudio.com CMS_SERVER_URL=http://localhost:3100 npm run build
CMS_ALLOW_INSECURE_COOKIES=true SMTP_HOST=localhost SMTP_PORT=2525 CONTACT_INBOX=inbox@example.com \
  NEXT_PUBLIC_SITE_ENV=production NEXT_PUBLIC_SITE_URL=https://topspotstudio.com CMS_SERVER_URL=http://localhost:3100 npx next start -p 3100
npm run qa:crawl -- http://localhost:3100 https://topspotstudio.com
npm run qa:forms -- http://localhost:3100 && npm run qa:nav -- http://localhost:3100 && npm run qa:screens -- http://localhost:3100
CMS_ADMIN_EMAIL=… CMS_ADMIN_PASSWORD=… CMS_EDITOR_EMAIL=… CMS_EDITOR_PASSWORD=… node scripts/cms-qa.mjs http://localhost:3100
```

`CMS_ALLOW_INSECURE_COOKIES=true` is **local testing only** (lets curl/Node send the session cookie over plain-HTTP localhost); never set it on a deployed environment.
