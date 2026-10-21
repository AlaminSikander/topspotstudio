# Indexing difference: live as-found vs local production mode

**CRITICAL — Production indexing configuration requires approval.**

Captured: 21 October 2026, 13:52 UTC, against `https://topspotstudio.com` and `https://www.topspotstudio.com`, from commit `bb8fe28` (tag `pre-cms-baseline-bb8fe28`). Nothing in Vercel or Production was changed.

## What the live site sends today (verified)

| Signal | Live value (every route) |
| --- | --- |
| `<meta name="robots">` | `noindex, nofollow` |
| `X-Robots-Tag` header | `noindex, nofollow` |
| `robots.txt` | `User-Agent: *` / `Disallow: /` |
| `sitemap.xml` | 200, empty `<urlset>` (0 URLs) |
| `<link rel="canonical">` | `http://localhost:3000/<path>` |
| `og:url`, `og:image`, JSON-LD `@id`/`url` | `http://localhost:3000/...` |
| Hosts | `https://topspotstudio.com/` **and** `https://www.topspotstudio.com/` both return 200 (no host redirect) |
| HTTP → HTTPS | `http://topspotstudio.com/` → 308 to `https://topspotstudio.com/` |
| Trailing slash | `/about` → 308 `/about/` |
| 404 | Unknown URL → 404 |
| GTM | Not loaded (no GTM container in HTML) |

Raw evidence: `raw/live-snapshot.csv`, `raw/live-snapshot.extras.md` (robots, sitemap, headers), `raw/live-www-snapshot.csv`, `raw/live-home.html`.

## What the same code produces with production settings (local)

Command: `NEXT_PUBLIC_SITE_ENV=production NEXT_PUBLIC_SITE_URL=https://topspotstudio.com npm run build && next start -p 3100`.

| Signal | Local production-mode value |
| --- | --- |
| Robots meta | `index, follow` on 13 approved pages; `noindex, follow` on `/blog/` (blog disabled, 0 posts) and `/privacy-policy/` (not approved) |
| `X-Robots-Tag` | not sent |
| `robots.txt` | `Allow: /`, `Disallow: /api/`, `Sitemap: https://topspotstudio.com/sitemap.xml` |
| `sitemap.xml` | 13 URLs on `https://topspotstudio.com` |
| Canonical | `https://topspotstudio.com/<path>` (self-referencing) |

Titles, descriptions, H1s and JSON-LD types are **identical** between live and local production mode for all 15 routes. Only environment-driven values differ. Evidence: `local-production-mode.csv`, `raw/local-production-snapshot.extras.md`.

## Cause (traced in code, reproduced locally)

`NEXT_PUBLIC_SITE_ENV` is read in four places, and `NEXT_PUBLIC_SITE_URL` feeds every absolute URL:

| File | Behaviour when `NEXT_PUBLIC_SITE_ENV !== "production"` |
| --- | --- |
| `next.config.ts` (`headers()`) | Adds `X-Robots-Tag: noindex, nofollow` to `/:path*` |
| `src/app/layout.tsx` (`metadata.robots`) | `index: false, follow: false` |
| `src/lib/seo.ts` (`pageMetadata`) | `index: false`; `follow` is also false |
| `src/app/robots.ts` | `Disallow: /`, no sitemap line |
| `src/app/sitemap.ts` | Returns `[]` |
| `src/lib/site.ts` (`SITE_URL`) | Falls back to `http://localhost:3000` when `NEXT_PUBLIC_SITE_URL` is unset |

A local build with both variables **unset** (`raw/local-env-unset-snapshot.csv`) reproduces the live output exactly: same robots meta, header, robots.txt, empty sitemap and `http://localhost:3000` canonicals.

**Conclusion:** the deployed Production build was made without `NEXT_PUBLIC_SITE_ENV=production` and without `NEXT_PUBLIC_SITE_URL`. Both are `NEXT_PUBLIC_*` values, so they are inlined at **build time**; setting them in Vercel only takes effect on a **new** deployment.

**What is not known:** the actual Vercel Production environment configuration was not inspected (no Vercel access from this environment, and the Vercel CLI is not installed). The cause above is inferred from identical output, not read from Vercel.

## Required owner action (not performed)

1. In Vercel → Project → Settings → Environment Variables, **Production** scope only: set `NEXT_PUBLIC_SITE_ENV=production` and `NEXT_PUBLIC_SITE_URL=https://topspotstudio.com` (or the `www` host if that is the preferred one).
2. Choose one preferred host and add a redirect for the other in Vercel → Domains (today both hosts serve 200 with the same content).
3. Trigger a new Production deployment, then re-run `node scripts/seo-snapshot.mjs https://topspotstudio.com` and `npm run qa:crawl -- https://topspotstudio.com https://topspotstudio.com`.
4. Keep Preview at `NEXT_PUBLIC_SITE_ENV=staging` with Deployment Protection on.

This is a separate change from the CMS release and must be approved on its own. The CMS branch keeps the same environment semantics (see `../02-features/redirects-and-indexing.md`).
