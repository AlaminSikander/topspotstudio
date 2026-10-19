# QA report

**Build tested:** production build (`next build` + `next start`) with `NEXT_PUBLIC_SITE_ENV=production` and a local origin (`http://localhost:3100`) standing in for the final domain. Email delivery was tested against a local mock of the Resend API (`scripts/mock-resend.mjs`) because no real API key or inbox exists yet.

**Date:** 19 October 2026

All checks below are automated and re-runnable. Results are from the final build.

## Summary

| Area | Tool | Result |
| --- | --- | --- |
| Lint / types | `npm run lint`, `npm run typecheck` | 0 errors, 0 warnings |
| Production build | `npm run build` | All 13 approved pages, blog hub, privacy page and 15 OG images prerendered as static HTML |
| Crawl & SEO checks | `npm run qa:crawl` | **156 passed, 0 failed, 0 warnings** |
| Link matrix | part of `qa:crawl` | **96 / 96** applicable rows verified in rendered HTML (IL-019 blog footer link intentionally held) |
| Forms (desktop + mobile) | `npm run qa:forms` | **22 / 22 passed** |
| Navigation & keyboard | `npm run qa:nav` | **15 / 15 passed** |
| Responsive render | `npm run qa:screens` (375 / 768 / 1440 px × 15 pages) | No horizontal overflow, console errors or failed requests |
| Lighthouse (mobile, simulated throttling) | Lighthouse 12 on 10 pages | Performance 96–99, Accessibility 100, Best Practices 100, SEO 100 |

## Crawl & SEO checks (`scripts/check-site.mjs`)

For each of the 14 approved routes plus `/privacy-policy/`:

- Returns 200; unknown URLs return 404.
- Exactly one `<h1>`; heading levels never skip.
- `<title>` and meta description match the page documents (descriptions ≥ 70 characters).
- Self-referencing absolute canonical equal to `NEXT_PUBLIC_SITE_URL` + path.
- `og:image` present and resolves.
- `lang="en-NZ"`.
- Every `<img>` has an `alt` attribute (decorative images use `alt=""`).
- JSON-LD parses; no `LocalBusiness`, `Review`, `AggregateRating` or New Zealand address.
- No restricted client names (KOLHUB, PDCA, AutoRetouch) anywhere in the HTML.
- No stale case-study slugs (the three URL conflicts are fixed).
- No un-negated forbidden claims (“NZ-based”, “guaranteed #1”, “best”, “leading agency”, “NZ office”).
- No developer notes, “internal client reference” text or placeholder copy.

Site-wide:

- All internal links return 200 with no redirects.
- `robots.txt` (production): `Allow: /`, `Disallow: /api/`, sitemap reference.
- `sitemap.xml` (production): exactly the 13 approved indexable URLs, all on the canonical origin.

Indexing state in production mode:

| Page | Robots |
| --- | --- |
| 13 approved pages | `index, follow` |
| `/blog/` | `noindex, follow` until `NEXT_PUBLIC_BLOG_ENABLED=true` and ≥ 3 articles exist |
| `/privacy-policy/` | `noindex, follow` until `NEXT_PUBLIC_PRIVACY_APPROVED=true` |

Staging mode (any `NEXT_PUBLIC_SITE_ENV` other than `production`): every page sends `noindex` meta plus an `X-Robots-Tag: noindex, nofollow` header, `robots.txt` disallows everything and the sitemap is empty.

## Forms (`scripts/form-qa.mjs`)

Run at 1440 px and 375 px:

| Check | Audit form | Contact form |
| --- | --- | --- |
| Hero CTA scrolls to the form | PASS | — |
| Empty submit shows inline, field-level errors | PASS (5 errors) | PASS (4 errors) |
| Focus moves to the first invalid field | PASS | — |
| Invalid fields expose `aria-invalid` + `aria-describedby` | PASS | PASS |
| Entered data preserved after a validation error | — | PASS |
| Success state shown only after server confirmation | PASS | PASS |
| `free_audit_cta_click` → `free_audit_form_start` → exactly one `free_audit_form_submit` | PASS | — |
| `contact_form_start` → exactly one `contact_form_submit` | — | PASS |
| No personal data in `dataLayer` | PASS | PASS |

API checks (curl):

| Case | Response |
| --- | --- |
| Invalid fields | 422 with field-specific messages |
| Malformed JSON | 400 |
| Honeypot filled | 200 `{ok:true}`, no email sent |
| Submitted faster than 2.5 s | 200 `{ok:true}`, no email sent |
| Email not configured | 503 with a clear error (never a fake success) |
| GET request | 405 |
| Valid submission | 200; notification sent with readable text + HTML table, `reply_to` set to the visitor |

## Navigation & keyboard (`scripts/nav-qa.mjs`)

- The first Tab reaches “Skip to main content”, which moves focus to `#main`.
- The Industries dropdown opens with Enter, Tab moves into its links, Escape closes it, and the focus outline is visible.
- The header stays sticky after scrolling and always shows the Free SEO Audit CTA.
- The mobile menu opens and contains every nav link plus a full-width 48 px “Free SEO Audit” button. Escape closes it, and it closes after navigating.
- All primary buttons and submit buttons are at least 44 px tall.

## Lighthouse (mobile)

| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 96–97 | 100 | 100 | 100 | 2.6–2.8 s | 0 | 0 ms |
| NZ SEO | 97 | 100 | 100 | 100 | 2.6 s | 0 | 10 ms |
| NZ Local SEO | 99 | 100 | 100 | 100 | 2.1 s | 0 | 0 ms |
| Roofing SEO | 99 | 100 | 100 | 100 | 2.2 s | 0 | 0 ms |
| Web Design for Tradies | 97 | 100 | 100 | 100 | 2.6 s | 0 | 0 ms |
| Case study (influencer) | 99 | 100 | 100 | 100 | 2.0 s | 0 | 0 ms |
| Case Studies hub | 97 | 100 | 100 | 100 | 2.6 s | 0 | 0 ms |
| Free SEO Audit | 99 | 100 | 100 | 100 | 2.1 s | 0 | 0 ms |
| Contact | 96 | 100 | 100 | 100 | 2.8 s | 0 | 0 ms |
| About | 97 | 100 | 100 | 100 | 2.6 s | 0 | 0 ms |

The first run scored accessibility 96 because of two contrast findings (logo wordmark and muted text on soft teal); both were fixed and every page above was re-measured afterwards.

These are lab numbers on a local server with simulated slow-4G throttling. Field Core Web Vitals (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1) can only be confirmed with real-user data after launch.

## Issues found and fixed during QA

| Issue | Fix |
| --- | --- |
| Mobile menu links could not be tapped: the header’s `backdrop-blur` created a containing block that trapped the fixed-position menu | Removed `backdrop-filter` from the header |
| Form API calls hit a 308 redirect because of `trailingSlash` | Forms post to `/api/audit/` and `/api/contact/` |
| Filled honeypot returned a validation error (gives bots feedback) | Honeypot accepted at schema level and silently discarded |
| Muted text on soft-teal CTA bands at 4.33:1 contrast | Switched to body slate |
| Logo “STUDIO” flagged by contrast audit | Wordmark rendered as SVG to match the supplied logo (logos are exempt from WCAG contrast) |
| Pricing tiers squeezed in a narrow column on NZ SEO | Tiers moved to a full-width row |
| Proof metric cards cramped at half width | Proof section restructured with metrics full width |

## Known limitations and open items

- **Real email delivery not tested.** It needs `RESEND_API_KEY`, a verified sending domain (`FORM_FROM_EMAIL`) and the official inbox (`CONTACT_INBOX`). Once these are set, send one audit and one contact submission from desktop and mobile on the production domain and confirm they arrive (launch gate E).
- **GA4/GTM not connected.** Events are pushed to `dataLayer`; GTM loads only when `NEXT_PUBLIC_GTM_ID` is set. Verify in GTM Preview and GA4 DebugView, and mark `free_audit_form_submit` and `contact_form_submit` as key events.
- **Rate limiting is per server instance.** It is a best-effort guard; add Vercel Firewall rate limiting or a CAPTCHA only if spam appears.
- **Cross-browser:** tested in Chromium (Playwright and Chrome). Safari, Firefox and real iOS/Android devices should be spot-checked on the staging URL before launch.
- **Lighthouse figures are lab data**; field data is needed after launch.

## Mapping to `TSS_Launch_GSC_Tracker.xlsx`

| Tracker gate | Status from this build | Evidence |
| --- | --- | --- |
| Discovery — routes 200, canonicals, robots, sitemap | Pass on local production build; re-run on the final domain | `qa:crawl` output |
| Conversion — forms deliver once, success events | Pass with mock delivery; **real inbox test outstanding** | `qa:forms`, mock log |
| Trust & claims — Bangladesh-remote identity, anonymised cases | Pass (automated checks); Asif to approve wording and metrics | `qa:crawl` restricted-name + claim checks |
| Content paths — case slug fix, CTAs, contextual links | Pass | Link matrix 96/96 |
| Compliance — privacy, contact details | **Open**: privacy draft awaiting approval; official email not supplied | `/privacy-policy/` |
| Performance — mobile + accessibility QA | Pass (lab) | Lighthouse table |
| Measurement — GA4/GTM/GSC | **Open**: IDs and access not supplied | — |
