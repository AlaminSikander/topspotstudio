# Top Spot Studio website

The marketing website for Top Spot Studio, a founder-led SEO and web growth studio based in Bangladesh, working remotely with service businesses in New Zealand and other markets. It covers the 14 approved launch pages from the developer handoff pack, plus a Privacy Policy draft.

- **Stack:** Next.js 16 (App Router, static generation), Payload CMS 3 (admin at `/admin`, API at `/cms-api`, PostgreSQL), TypeScript, Tailwind CSS v4, zod (form validation)
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
cp .env.example .env.local   # then edit values (see below), including DATABASE_URL and PAYLOAD_SECRET
createdb tss_cms_dev         # local PostgreSQL
npm run cms:migrate          # create the CMS schema (versioned migrations in src/migrations)
npm run cms:seed             # import the existing website content (create-only, safe to re-run)
CMS_USER_EMAIL=you@example.com CMS_USER_NAME="Your Name" CMS_USER_ROLE=admin CMS_USER_PASSWORD='<12+ chars>' npm run cms:create-admin
npm run dev                  # site: http://localhost:3000  admin: http://localhost:3000/admin
```

The site needs the database at build and run time: every page is rendered from its CMS record. Full CMS documentation, QA evidence and the release plan are in [`handover/`](handover/README.md); the editor guide is [`handover/02-features/cms-user-guide.md`](handover/02-features/cms-user-guide.md).

Leaving the email variables empty in development is fine. The forms then return a clear “couldn’t send” error instead of a fake success.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Absolute origin, no trailing slash (`https://topspotstudio.com`). Used for canonicals, sitemap, OG and schema. Falls back to `https://topspotstudio.com` in production. |
| `NEXT_PUBLIC_SITE_ENV` | Recommended | `production` makes the site indexable. Any other value sends `noindex` (meta and `X-Robots-Tag` header), blocks crawling in `robots.txt` and empties the sitemap. When unset, Vercel's `VERCEL_ENV` decides: Production deployments are indexable, Preview/Development are not. |
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
| `DATABASE_URL`, `PAYLOAD_SECRET`, `CMS_SERVER_URL`, `BLOB_READ_WRITE_TOKEN` | CMS | Server-only CMS settings; see `.env.example` and `handover/04-release/environment-variable-names.md`. Drafts are previewed from the admin instead of a flag. |
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
3. Add the production domain under **Settings → Domains**. The preferred host is the apex `topspotstudio.com`; set `www.topspotstudio.com` to redirect to it (308). `next.config.ts` also redirects `www` to the apex as a fallback, so never configure the reverse (apex → www), which would loop. HTTPS is automatic.
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
| `node scripts/cms-qa.mjs <baseUrl>` | 120 end-to-end CMS checks (auth, roles, drafts, preview, publishing, revalidation, sitemap, redirects, tracking codes, uploads, audit, secrets). Needs `CMS_ADMIN_*` / `CMS_EDITOR_*` credentials; cleans up after itself |
| `node scripts/seo-snapshot.mjs <baseUrl> <out.csv>` | Raw-HTML SEO snapshot of every route plus robots/sitemap/headers |
| `node scripts/parity-diff.mjs <baselineUrl> <candidateUrl>` | Route-by-route HTML parity (text, links, headings, JSON-LD, meta, structure) |

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
  app/(frontend)/          Public routes (one folder per approved URL, each renders its CMS page) + catch-all for CMS pages/redirects
  app/(payload)/           Payload admin (/admin) and REST API (/cms-api)
  app/                     Form API routes, preview routes, sitemap, robots, OG images
  cms/                     Payload collections, globals, blocks, fields, hooks, admin UI, seed content
  components/cms/          Renderers that map CMS blocks and rich text onto the existing components
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

Content, SEO, navigation, footer, blog posts, redirects and tracking codes are edited in the CMS at `/admin` (see the user guide in `handover/02-features/`). Code changes are only needed for:

- **New block types or layout changes:** block configs in `src/cms/blocks/`, renderers in `src/components/cms/`.
- **Schema changes:** edit `src/cms/**`, then `npm run cms:types`, `npm run cms:migrate:create -- <name>`, review and commit the migration, `npm run cms:importmap` if admin components changed.
- **Brand colours and type:** the `@theme` tokens in `src/app/(frontend)/globals.css`.
- **Launch flags:** `NEXT_PUBLIC_BLOG_ENABLED` (blog indexing, once three approved articles are published) and `NEXT_PUBLIC_PRIVACY_APPROVED`.
