# Redirects and indexing

## Redirects

- Stored in **Redirects**; applied at request time by `src/app/(frontend)/[...slug]/page.tsx` (and by `blog/[slug]` for missing posts) through `redirectOrNotFound()`.
- Status codes: **308** (permanent) and **307** (temporary). These are the method-preserving equivalents of 301/302; search engines treat 308 like 301.
- A redirect only applies when no live page exists at that path, so a redirect can never hide a published page.
- Takes effect immediately (no rebuild). Saving any redirect also revalidates the site.
- Automatic redirects are created when a published post’s slug changes or a CMS page’s URL changes.
- Validation (`src/cms/lib/redirect-rules.ts`, tests REDIR-01…12): normalised lower-case trailing-slash source; homepage, reserved (`/admin`, `/cms-api`, `/api`, `/_next`, `/og`, `/preview`) and live paths rejected; destination must be live; chains and loops rejected; `//host` and `javascript:` rejected; external destinations https-only and admin-only.
- Existing behaviour preserved: `http→https` and `/about → /about/` (Vercel/Next) are unchanged. The site had no redirects before the CMS, and none were added.

## Indexing controls by environment

| Signal | `NEXT_PUBLIC_SITE_ENV=production` | Any other value (staging, preview, development) |
| --- | --- | --- |
| Robots meta | CMS setting (index/noindex, follow/nofollow); blog hub/posts noindex until blog launch; privacy noindex until approved | always `noindex` |
| `X-Robots-Tag` header | not sent on pages; `noindex, nofollow` on `/admin`, `/cms-api` (except media files), `/preview` | `noindex, nofollow` everywhere |
| `robots.txt` | Allow `/`; Disallow `/api/`, `/admin/`, `/cms-api/`, `/preview/`; sitemap link | `Disallow: /` |
| `sitemap.xml` | published, indexable, self-canonical URLs; `<lastmod>` from CMS | empty |
| Canonical | `NEXT_PUBLIC_SITE_URL` + path (or a validated https override) | same rule — preview domains are never used because the origin comes from the env var |
| Previews | always `noindex`, private, session-gated | same |

Admin and preview are protected by authentication, not just by noindex.

## Production indexing issue (unchanged, needs owner approval)

The live site currently sends `noindex` and an empty sitemap because its Production deployment was built without `NEXT_PUBLIC_SITE_ENV=production` and `NEXT_PUBLIC_SITE_URL`. Details and the exact fix: `../00-baseline/indexing-difference.md`. The CMS release does **not** change this; it is a separate approved step.
