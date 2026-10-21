# Implementation decisions

Branch `feature/payload-seo-cms`. Rollback tag `pre-cms-baseline-bb8fe28` → commit `bb8fe281cbc74e738973ddec69b2837b9786e227`.

| # | Decision | Why | Alternatives rejected |
| --- | --- | --- | --- |
| D1 | Payload CMS 3.91.0 installed **inside** the existing Next.js 16.4.2 app | Same deploy, same domain, Local API (no network hop) for server rendering | Separate CMS service (more infra, CORS, cost) |
| D2 | Routes split into `src/app/(frontend)` (site) and `src/app/(payload)` (admin + API) route groups | Payload needs its own root layout; route groups do not change URLs | Single root layout (admin would inherit site CSS/header) |
| D3 | REST API at **`/cms-api`**, GraphQL disabled | Avoids any collision with `/api/audit/` and `/api/contact/`; smaller attack surface | Keep `/api` and reserve slugs |
| D4 | Every existing route file kept; each is now a 10-line wrapper that renders its CMS record by fixed path | URLs and route ownership stay in code; a page cannot silently disappear (build fails if its record is missing) | One generic catch-all for all pages |
| D5 | Page content modelled as **blocks that wrap the existing React components** (`PageHero`, `NumberedCards`, `CtaBand`, `CaseStudyLayout` …) | Design parity comes from the same components; editors cannot break layout | Whole pages in one rich-text field |
| D6 | Postgres adapter with `blocksAsJSON: true` | Deeply nested blocks would otherwise create dozens of tables with long identifiers; JSON keeps the schema small (≈40 tables) and fast | Relational blocks |
| D7 | `push: false` — schema changes only through versioned migrations in `src/migrations/` | Same behaviour locally and in production; reviewable SQL | Payload dev auto-push |
| D8 | Lexical rich text with: bold/italic/underline, links (internal page/post picker, URL, `#anchor`, `mailto:`, `tel:`, new tab, title, nofollow/sponsored/ugc), lists, H3/H4, alignment, text styles, embedded checklist/definition-list/pill blocks | Lets editors add a URL to any selected text; renders as real `<a href>`; text styles reproduce existing paragraph classes | Markdown fields |
| D9 | Own Lexical → JSX renderer (`src/components/cms/RichText.tsx`) | Exact class names per context (light/navy tone, prose), `next/link` for internal links, safe `rel` | Payload default converters |
| D10 | Static prerendering kept for all public pages; `revalidatePath('/', 'layout')` + every page/post/OG/sitemap/robots path on any published change | Pages share nav, footer, settings and cross-links; site is ~20 routes so full revalidation is cheap and always consistent | Per-tag invalidation (more moving parts) |
| D11 | Runtime redirects in the `(frontend)/[...slug]` catch-all (308 permanent / 307 temporary), resolved per request from the `redirects` collection | Changes apply immediately without rebuild or a Proxy on every request; live pages can never be shadowed | `next.config` redirects (need redeploy), Proxy (runs on every request, extra cost) |
| D12 | Redirect rules: normalise source, block reserved paths, block live pages, block chains/loops, block `//` and `javascript:`, external destinations admin-only and https-only | Prevents loops, SEO damage and open redirects | — |
| D13 | Preview = Draft Mode **plus** a valid CMS session on every request; banner shown; `noindex`; no tracking codes | A copied draft cookie alone reveals nothing (tested PREV-05) | Secret-token preview links |
| D14 | Tracking & Verification Codes parsed into an allow-list (`meta`, `link`, `script`, `noscript`) and rendered as real elements in `<head>`, right after `<body>`, or before `</body>` | Exact placement semantics, no arbitrary HTML strings, provider validation (GSC, GTM head/body, GA4, Bing, Clarity, Meta Pixel) | Raw `dangerouslySetInnerHTML` blobs |
| D15 | Page-scoped codes limited to `<meta>`, `<link>` and async external scripts | Inline scripts would not re-run after client-side navigation; body-start needs site-wide scope | — |
| D16 | Consent strategy: codes flagged “wait for consent” render as `type="text/plain" data-category=…` | Standard pattern consumed by CookieYes/Cookiebot/Klaro; nothing marketing runs without a CMP | Loading everything for everyone |
| D17 | No new Content-Security-Policy on public pages | A nonce CSP forces every page to render dynamically (loses static/CDN caching) and conflicts with owner-added GTM; existing headers kept | Global CSP (documented as future option, KI-07) |
| D18 | `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_SITE_ENV` remain the authority for canonical origin and indexability; Site settings shows them read-only | A CMS value copied between databases could publish production canonicals from a preview | Editable base-URL field |
| D19 | `NEXT_PUBLIC_BLOG_ENABLED` and `NEXT_PUBLIC_PRIVACY_APPROVED` kept as env flags | Changing indexability is an owner decision; behaviour identical to before | CMS toggles |
| D20 | Roles: **admin** (everything) and **editor** (pages, posts, media, SEO, redirects to internal pages, navigation, footer); per-user “can publish” and “active” flags; editors cannot unpublish built-in pages | Matches handoff: Asif = Editor, Al Amin = Admin | — |
| D21 | Auth hardening: no public registration, 12-char minimum password, 5-attempt lockout (15 min), 8 h sessions with server-side sessions, `HttpOnly` + `SameSite=Lax` + `Secure` cookies, CSRF/CORS allow-list, per-IP login rate limit (10 / 15 min) | Brute-force and session protection | — |
| D22 | Append-only audit log written inside the same DB transaction with an isolated request context | Avoids row-lock waits and avoids silencing later hooks (bug found and fixed during QA) | — |
| D23 | Media: local `/media` in dev, Vercel Blob adapter installed but enabled only when `BLOB_READ_WRITE_TOKEN` exists; JPEG/PNG/WebP/AVIF/GIF ≤ 8 MB; SVG blocked; WebP derivatives | Durable storage needs owner cost approval | S3/R2 (equally possible) |
| D24 | Design photos stay as static imports (built-in “site photos”), selectable per block; library uploads optional | Keeps existing image URLs, blur placeholders and alt text | Re-uploading all photos |
| D25 | Content migration via `npm run cms:seed` (create-only, idempotent; `--overwrite` for local/staging) | Never overwrites editor changes by accident | Manual entry |
| D26 | `package.json` `"type": "module"` | Required for the Payload CLI on Node 20 (as in official templates); all scripts are already `.mjs` | SWC loader (tried, unnecessary) |
| D27 | Unknown URLs: catch-all renders uncached so newly added redirects work instantly | ISR would cache a 404 for every random URL | ISR catch-all (tested, rejected) |

## Notable bugs found and fixed during QA

1. **Revalidation silently skipped.** Payload merges a nested call’s `context` into the shared request; the audit-log write passed `disableRevalidate`, so later hooks skipped revalidation. Fixed with an isolated request copy (`isolatedReq`). Covered by SEO-07, EDIT-04, NAV-01, BLOG-04.
2. **Unpublish not detected when a draft existed.** Payload passes the latest draft as `originalDoc`; the live status is now read from the published record. This also closed a gap where an editor could have unpublished a built-in page.
3. **Lock wait on login.** Audit/last-login writes outside the login transaction waited on its row lock; now inside the transaction.
4. **Media URLs** gained a trailing slash (308 hop); normalised in `afterRead`.
