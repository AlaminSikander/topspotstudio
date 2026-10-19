# Top Spot Studio website

The marketing website for Top Spot Studio, a founder-led SEO and web growth studio based in Bangladesh, working remotely with service businesses in New Zealand and other markets. It covers the 14 approved launch pages from the developer handoff pack, plus a Privacy Policy draft.

- **Stack:** Next.js 16 (App Router, static generation), TypeScript, Tailwind CSS v4, MDX (blog), zod (form validation)
- **Hosting:** Vercel
- **Forms:** two route handlers (`/api/audit/`, `/api/contact/`) that email submissions over SMTP (nodemailer)

More documentation:

- [`docs/ROADMAP.md`](docs/ROADMAP.md): audit, page-by-page roadmap, decisions for review, completed and outstanding work
- [`docs/ASSET_REGISTER.md`](docs/ASSET_REGISTER.md): every image, its source, licence and placement
- [`docs/QA_REPORT.md`](docs/QA_REPORT.md): test results and known limitations
- [`docs/source/internal-link-matrix.csv`](docs/source/internal-link-matrix.csv): the linking matrix, which the QA crawl checks automatically

## Requirements

- Node.js 20.9 or later (Vercel uses Node 22/24 by default)
- npm

## Run locally

```bash
npm install
cp .env.example .env.local   # then edit values (see below)
npm run dev                  # http://localhost:3000
```

Leaving the email variables empty in development is fine. The forms then return a clear “couldn’t send” error instead of a fake success.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Absolute origin, no trailing slash (e.g. `https://www.example.co.nz`). Used for canonicals, sitemap, OG and schema. |
| `NEXT_PUBLIC_SITE_ENV` | Yes | `production` makes the site indexable. Any other value sends `noindex` (meta and `X-Robots-Tag` header), blocks crawling in `robots.txt` and empties the sitemap. |
| `SMTP_HOST` | For forms | SMTP server host, e.g. `smtp.gmail.com` (server-only). |
| `SMTP_PORT` | For forms | SMTP port. Defaults to `587`; use `465` for implicit TLS. |
| `SMTP_SECURE` | Optional | `true` for implicit TLS. Defaults to `true` on port 465, otherwise STARTTLS is used when offered. |
| `SMTP_USER` / `SMTP_PASS` | For forms | SMTP credentials (for Gmail, an app password). Omit for unauthenticated relays. |
| `CONTACT_INBOX` | For forms | Inbox that receives Contact and Audit submissions (currently `alamin.6534@gmail.com`); comma-separate multiple addresses. |
| `FORM_FROM_EMAIL` | Optional | Sender, e.g. `Top Spot Studio <forms@yourdomain>`. Defaults to `SMTP_USER`; must be an address your SMTP provider allows you to send as. |
| `NEXT_PUBLIC_GTM_ID` | Optional | Google Tag Manager container. GTM only loads when this is set. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional | Public email shown on Contact and added as `ContactPoint` schema. |
| `NEXT_PUBLIC_PRIVACY_APPROVED` | Optional | Set `true` once the Privacy Policy is approved (makes it indexable and adds it to the sitemap). |
| `NEXT_PUBLIC_BLOG_ENABLED` | Optional | Set `true` once 3+ approved articles exist (adds the blog to the nav, footer and sitemap and makes the hub indexable). |
| `NEXT_PUBLIC_SHOW_DRAFTS` | Dev only | `true` renders draft articles (for template QA). Never set in production. |
`NEXT_PUBLIC_*` values are inlined at build time, so redeploy after changing them.

## Build

```bash
npm run lint
npm run typecheck
npm run build
npm run start               # serves the production build on :3000
```

## Deploy to Vercel

1. Push the repository to GitHub (or another Git provider) and import it in Vercel. The framework preset is detected as Next.js; no build settings need changing.
2. Under **Project → Settings → Environment Variables**:
   - **Preview:** `NEXT_PUBLIC_SITE_ENV=staging`, plus a `NEXT_PUBLIC_SITE_URL` (for example the preview domain). Keep Vercel Deployment Protection on, so staging is never public.
   - **Production:** `NEXT_PUBLIC_SITE_ENV=production`, the final `NEXT_PUBLIC_SITE_URL`, the three email variables and, when ready, `NEXT_PUBLIC_GTM_ID`.
3. Add the production domain under **Settings → Domains**. Choose one preferred host (www or apex) and let Vercel redirect the other. HTTPS is automatic.
4. Deploy, then run the post-deploy checks below against the live URL.

### Going live (staging to production)

1. Confirm the launch blockers in `docs/ROADMAP.md` are resolved: domain, inbox, privacy approval, claim sign-off.
2. Make sure `NEXT_PUBLIC_SITE_ENV=production` is set **only** in the Production environment, then redeploy.
3. Check the live site:

   ```bash
   npm run qa:crawl -- https://www.yourdomain https://www.yourdomain
   ```

   Every approved page should report `index, follow`, a correct canonical, and a sitemap of 13 URLs.
4. Submit one Free SEO Audit and one Contact enquiry from desktop and from mobile. Confirm each arrives in the inbox exactly once and that GA4 DebugView shows exactly one submit event.
5. Verify the domain in Google Search Console and submit `https://www.yourdomain/sitemap.xml`.

## QA scripts

The scripts run against a running server (dev or production). Playwright's Chromium is needed once: `npx playwright install chromium`.

| Command | What it checks |
| --- | --- |
| `npm run qa:crawl -- <baseUrl> [canonicalOrigin]` | 200s, one H1, titles/descriptions, canonicals, `og:image`, `lang`, alt text, JSON-LD, restricted names, stale slugs, forbidden claims, internal links, link matrix, robots, sitemap, 404 |
| `npm run qa:forms -- <baseUrl>` | Validation, focus, success states and dataLayer events at desktop and mobile widths |
| `npm run qa:nav -- <baseUrl>` | Skip link, Industries dropdown keyboard support, sticky header, mobile menu, tap targets |
| `npm run qa:screens -- <baseUrl>` | Full-page screenshots at 375/768/1440 px into `.tmp/shots`, plus console errors and overflow |

To exercise a successful form submission locally without real SMTP credentials:

```bash
node scripts/mock-smtp.mjs                         # terminal 1
# .env.local: SMTP_HOST=localhost, SMTP_PORT=2525, CONTACT_INBOX=inbox@example.com,
#             FORM_FROM_EMAIL=Test <forms@example.com>
npm run dev                                        # terminal 2
npm run qa:forms                                   # terminal 3, then inspect .tmp/mock-smtp.log
```

## Project structure

```
src/
  app/                     Routes (one folder per approved URL), API routes, sitemap, robots, OG images
  components/
    brand/                 Logo (vector mark + wordmark)
    layout/                Header, Footer, Breadcrumbs
    sections/              Page sections: hero, cards, process, proof, FAQ, CTA band, case-study layout
    visuals/               Custom brand diagrams and data charts
    motion/                Scroll reveals, card spotlight, parallax and verified-figure counters (no animation library)
    forms/                 Audit and contact forms, fields, submit hook
    ui/                    CTA link (with tracking), responsive image, email link
    seo/                   JSON-LD helper
  content/                 Shared copy (home, case-study cards) and the blog registry + MDX articles
  lib/                     Site config and routes, SEO/metadata, schema builders, analytics, forms, email
  assets/                  Optimised photos and OG fonts
public/brand/              Logo files
assets/brand/              Original supplied logo artwork
scripts/                   Brand/photo generation and QA scripts
docs/                      Roadmap, asset register, QA report, link matrix
```

## Common edits

- **Page copy:** each page’s copy lives in its route file, e.g. `src/app/industries/roofing-seo/page.tsx`. Shared homepage copy is in `src/content/home.tsx`; case-study cards are in `src/content/case-studies.ts`.
- **Navigation and footer:** `src/lib/site.ts`.
- **Add a blog article:**
  1. Create `src/content/blog/<slug>.mdx`.
  2. Register it in `src/content/blog/index.ts` (title, description, excerpt, category, author, dates, optional image and CTA).
  3. Once three are live, set `NEXT_PUBLIC_BLOG_ENABLED=true`.
- **Add a founder photo:** import the image in `src/app/about/page.tsx` and set `photo` on the founder entry.
- **Brand colours and type:** the `@theme` tokens in `src/app/globals.css`.
