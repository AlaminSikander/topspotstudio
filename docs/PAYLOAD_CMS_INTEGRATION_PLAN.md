# Payload CMS integration: compatibility report and phased plan

Status: **proposal, awaiting approval.** No files, packages, databases or deployments have been changed for this work.

Inspected: 21 October 2026, against commit `bb8fe28` (clean working tree).

## Summary

Payload CMS can be installed in this repository. The latest release (Payload 3.91.0) officially supports Next.js `>=16.3.3 <17`, React 19.x and Node `>=20.18.1`, and the project meets all three. Nothing blocks the integration, but three structural problems have to be solved first:

1. The root layout has to be split into route groups so the Payload admin panel gets its own layout.
2. The site is currently built entirely at build time, so it has to move to on-demand revalidation.
3. About 5,500 lines of page copy are written as JSX (inline links, highlights, icons, diagrams), which won't move into a CMS without careful modelling.

The recommended approach is hybrid and phased. Keep every existing route file and its design, and replace the hardcoded data inside them with CMS data one area at a time, starting with SEO settings, redirects and the blog.

---

## 1. Current `app/` structure and route mappings

Routes live in `src/app/` (path alias `@/*` → `./src/*`). `trailingSlash: true` is set, so every URL ends in `/`.

| URL | File | Rendering |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Static |
| `/markets/new-zealand/seo/` | `markets/new-zealand/seo/page.tsx` | Static |
| `/markets/new-zealand/local-seo/` | `markets/new-zealand/local-seo/page.tsx` | Static |
| `/industries/seo-for-tradies/` | `industries/seo-for-tradies/page.tsx` | Static |
| `/industries/roofing-seo/` | `industries/roofing-seo/page.tsx` | Static |
| `/industries/web-design-for-tradies/` | `industries/web-design-for-tradies/page.tsx` | Static |
| `/case-studies/` and 3 case studies | `case-studies/**/page.tsx` | Static |
| `/free-seo-audit/`, `/contact/`, `/about/`, `/privacy-policy/` | their own `page.tsx` | Static |
| `/blog/` | `blog/page.tsx` | Static |
| `/blog/[slug]/` | `blog/[slug]/page.tsx` | Static (SSG), `dynamicParams = false` |
| `/og/[...slug]` | `og/[...slug]/route.tsx` | `force-static` image route, `dynamicParams = false` |
| `/api/audit/`, `/api/contact/` | `route.ts` (POST, SMTP email) | Dynamic function |
| `/sitemap.xml`, `/robots.txt` | `sitemap.ts`, `robots.ts` | Static |
| 404 | `not-found.tsx` | — |

There is no `proxy.ts` or `middleware.ts`, and no redirects are configured anywhere. All route paths are centralised in `routes` inside `src/lib/site.ts`.

## 2. Versions

| Item | Installed | Payload 3.91.0 requirement |
| --- | --- | --- |
| next | 16.4.2 (pinned) | `>=16.3.3 <17` ✅ |
| react / react-dom | 19.3.0 (pinned) | `^19.2.1` ✅ |
| Node (local) | 20.20.2 | `>=20.18.1` ✅ |
| `engines.node` in `package.json` | `>=20.9.0` | Raise to `>=20.18.1` (Node 22 or 24 LTS recommended) |
| npm | 10.8.2 | — |
| typescript | 5.9.3 | ✅ |
| tailwindcss / @tailwindcss/turbopack | 4.3.3 | Needs testing (see risks) |
| @next/mdx | 16.4.2 | — |

Other dependencies: zod 4.6.7, nodemailer 10, lucide-react 1.59, eslint 9.39, sharp 0.35.5 (currently a devDependency). Payload also needs `graphql ^16.8.1` as a peer dependency.

## 3. Static export?

**No.** `next.config.ts` uses `output: "standalone"`, not `output: "export"`. That matters because Payload needs a server for its admin panel, REST/GraphQL API and auth, and none of those work under static export. Vercel ignores `standalone` and deploys normally.

Cache Components is off. `docs/ROADMAP.md` says this was deliberate because the site was fully static.

Other config worth knowing about:

- A custom Turbopack rule runs `@tailwindcss/turbopack` on **every** `*.css` file.
- `pageExtensions` is `ts, tsx, md, mdx`.
- Global security headers are set, including `X-Frame-Options: SAMEORIGIN`.
- Non-production environments get an `X-Robots-Tag: noindex, nofollow` header.

## 4. Server and client components

- **Server components:** all pages and the layout, plus most sections and blocks (`Blocks.tsx`, `PageHero`, `Section`, `FaqList`, `ProofSection`, `CaseStudyLayout`, `JsonLd`, `Diagrams`, and so on).
- **Client components (11):**
  - `Header`, `ScrollManager`, `MotionProvider`, `CountUp`, `BackToTop`, `CtaLink`, `EmailLink` and `CaseStudyCard`.
  - `ContactForm`, `AuditForm` and the `useFormSubmit` hook.
- Nav data comes from `site.ts` at build time and is passed to `Header`.

This split suits a CMS well: data can be fetched in server components through Payload's Local API, with no client-side fetching.

## 5. Metadata, sitemap, robots and schema

- **Root metadata** (`src/app/layout.tsx`): `metadataBase`, a title template, and robots meta driven by `NEXT_PUBLIC_SITE_ENV`.
- **Per-page metadata:** `pageMetadata()` in `src/lib/seo.ts` builds the absolute title, description, self-canonical, robots meta, OpenGraph and Twitter tags. The default OG image is `/og/<path>.png`.
- **OG images:** `og/[...slug]/route.tsx` has a **hardcoded** map of eyebrow and title per route.
- **Sitemap** (`sitemap.ts`): a hardcoded list of 13 routes. The privacy page and blog are added only when the matching environment flags are set. It returns an empty list outside production.
- **Robots** (`robots.ts`): disallows everything outside production. In production it disallows `/api/` and points to the sitemap.
- **Schema:**
  - `src/lib/schema.ts` has builders for `Organization`, `WebSite`, `BreadcrumbList`, `WebPage` (and the About, Contact and Collection variants), `Service`, `Article`, `FAQPage` and `@graph`.
  - `src/components/seo/JsonLd.tsx` renders the result with `<` escaped.
  - Organization and WebSite schema are output sitewide from the layout.
  - Each page builds its own graph. For example, the NZ SEO page outputs WebPage, Service, Breadcrumb and FAQ.
- **QA:** `npm run qa:crawl` already checks canonicals, titles, JSON-LD, the sitemap, robots and the 97-row internal link matrix (`docs/source/internal-link-matrix.csv`). This is the main tool for proving the migration didn't change SEO.

## 6. Hardcoded content and SEO fields

All content is currently in code:

- **Page copy:** each route file is 150–600 lines of JSX, about 5,500 lines in total. The copy includes inline `<Link>`s, highlighted spans, Lucide icons and custom diagram components.
- **Meta:** a `meta = { title, description, path }` object in each page file (`homeMeta` lives in `src/content/home.tsx`).
- **FAQs, process steps, pricing tiers and service lists:** inline arrays inside each page. The NZ SEO page, for example, contains the NZ$450 / NZ$700 / NZ$950 pricing.
- **Shared content:**
  - `src/content/home.tsx` and `src/content/case-studies.ts` (case cards and metrics).
  - Nav, footer and founders in `src/lib/site.ts`.
- **Blog:** a registry in `src/content/blog/index.ts` (authors, categories, `seoTitle`, `canonical`, `draft`, CTA) plus MDX files. There is one draft template post.
- **OG titles:** the map in `og/[...slug]/route.tsx`.
- **Feature flags:** `NEXT_PUBLIC_BLOG_ENABLED`, `NEXT_PUBLIC_PRIVACY_APPROVED` and `NEXT_PUBLIC_SHOW_DRAFTS`, all baked in at build time.

## 7. Risks of installing Payload in this repository

1. **Root layout conflict (high).** Payload's admin needs its own root layout. The current `src/app/layout.tsx` (with `globals.css`, Header, Footer, GTM and JSON-LD) would otherwise wrap the admin panel. Every public route has to move into an `app/(frontend)/` route group, and the admin goes into `app/(payload)/`. Route groups don't change URLs, but the diff touches every route file.
2. **Static to dynamic (high).** Nothing reads data at runtime today. With a CMS:
   - Builds need database access.
   - `blog/[slug]` and the OG route use `dynamicParams = false`, so newly published posts would return 404 until the next deploy.
   - OG image titles and the sitemap are hardcoded.
3. **Content fidelity (high).** Rich JSX doesn't map 1:1 to rich text. Inline links, gradient highlights, icons and diagram slots need deliberate block modelling. A naive migration would cause visible design regressions.
4. **SEO regression (high).** Moving titles, canonicals, schema, the sitemap and OG images into the CMS creates a risk of small differences. Editors could also set `noindex` by accident, create duplicate slugs or break internal links.
5. **`/api` namespace (medium).** Payload's REST API mounts at `/api/[...slug]` and GraphQL at `/api/graphql`. The existing `/api/audit/` and `/api/contact/` routes win because specific routes take priority over a catch-all, but Payload collections must never use the slugs `audit` or `contact`. Alternatively, move Payload's API to a different base path.
6. **`trailingSlash: true` (medium, needs testing).** The admin panel and API redirects need to be tested with trailing slashes turned on.
7. **Turbopack CSS rule (medium, needs testing).** The `*.css` rule would also run the Tailwind loader on Payload's admin CSS in `node_modules`. The rule may need narrowing, or Tailwind may need to move to `@tailwindcss/postcss`.
8. **Tooling:**
   - `tsconfig` targets ES2017 and needs an `@payload-config` path.
   - ESLint has to ignore the generated `payload-types.ts` and `importMap.js`.
   - `sharp` has to move to `dependencies`.
   - The `engines` field has to be bumped.
9. **Operations:**
   - The admin panel will be publicly reachable.
   - The database and Blob storage add credentials and cost.
   - Preview deployments must not write to the production database.
   - Payload adds cold-start weight to functions. Public pages stay CDN-cached, but admin and revalidation requests pay this cost.
10. **Build-time flags.** `NEXT_PUBLIC_*` flags can't be switched from the CMS without a redeploy.

## 8. Changes needed to support Payload safely

- **Route groups:** move the public routes and layout into `app/(frontend)/`, and add `app/(payload)/admin/[[...segments]]` and `app/(payload)/api/...`.
- **Next.js config:** wrap `next.config.ts` with `withPayload(withMDX(...))`. Keep the headers, add a Blob host to `images.remotePatterns`, and narrow the CSS loader rule if needed.
- **Payload config:** add `payload.config.ts` with the Postgres adapter, the Lexical editor, the SEO, redirects and nested-docs plugins, and Blob storage. Use migrations, not `push`, outside local development.
- **TypeScript and linting:** add the `@payload-config` path, raise the target to ES2022 and add ignores for the generated files.
- **Robots and headers:** disallow `/admin/` (and the Payload API base path if it moves), and send a `noindex` header on admin routes.
- **Dynamic routes:**
  - Set `dynamicParams = true` on `blog/[slug]`.
  - Make the OG route read data and revalidate on publish instead of being `force-static`.
  - Build the sitemap from the CMS.
- **Environment variables:** `PAYLOAD_SECRET`, `DATABASE_URL` (pooled), `BLOB_READ_WRITE_TOKEN`, `PREVIEW_SECRET`, and `NEXT_PUBLIC_SERVER_URL` (or reuse `NEXT_PUBLIC_SITE_URL`).
- **Access control:** only published documents are publicly readable. Use admin and editor roles, and turn off self-registration.

## 9. PostgreSQL and media storage

### Database

Neon Postgres through the Vercel Marketplace (Vercel no longer offers Vercel Postgres itself), connected with `@payloadcms/db-postgres`.

- Use Neon's **pooled** connection string and a small pool size for Fluid Compute.
- Keep separate Neon branches for production, preview and development, so preview deployments never touch production data.
- Run `payload migrate` before `next build` in the Vercel build command, and commit migrations to git.
- Put the database region near the functions. Sydney or Singapore suits NZ visitors and editors in Bangladesh.

### Media

`@payloadcms/storage-vercel-blob` with a public store and `clientUploads: true`. Serve images through `next/image` using a Blob `remotePatterns` entry, and make alt text required in the Media collection.

- The design images in `src/assets/photos` (static imports) and `public/brand` **stay in code**. Only editorial images, such as blog and case-study images, belong in the CMS.
- S3 or Cloudflare R2 via `@payloadcms/storage-s3` would also work, but Blob is the simplest choice on Vercel.

## 10. Preserving URLs, design, functionality and SEO

- **URLs:** keep every existing route folder. Each page fetches its document by a fixed `path` (for example `/markets/new-zealand/seo/`) instead of going through a generic catch-all. If editor-created pages are wanted later, add a `(frontend)/[...slug]` catch-all; explicit routes still take priority over it. Make `path` unique and validated, with trailing slashes enforced.
- **Design:** model content as **blocks that map 1:1 to existing components**, such as `PageHero`, `FeatureList`, `NumberedCards`, `ProcessSteps`, `TierCards`, `FaqSection`, `CtaBand`, `EditorialSplit` and `ProofSection`.
  - Icons become a select field holding Lucide icon names.
  - Diagrams become a select field listing the allowed visuals, so they stay in code.
  - Highlights become a `highlight` text field, which `PageHero` already supports.
- **Internal links:** use a link field that is either internal (a relationship to a page or post, resolved to its current path) or a custom URL. A slug change then can't break links, and can automatically create a redirect. Keep the link-matrix check in `qa:crawl`.
- **SEO:**
  - Keep `pageMetadata()` and the `schema.ts` builders as the only code that produces output. The CMS only supplies inputs: meta title and description, OG image, canonical override, a `noindex` flag, an "include in sitemap" flag, schema type, service type, and the OG eyebrow and title.
  - FAQ blocks feed `faqSchema` automatically.
  - Organization schema reads from a `SiteSettings` global.
  - Avoid free-form JSON-LD fields, or restrict them to admins with validation.
- **Fallback:** keep the current TypeScript content as a fallback until each page reaches parity.
- **Proving parity:** before starting, snapshot every URL's `<head>`, JSON-LD, canonical and robots meta, the sitemap, and screenshots. After each phase, diff against the snapshot using `qa:crawl` and `qa:screens`.

## 11. Drafts, publishing, caching and revalidation

- **Drafts:** turn on Payload versions with drafts and autosave. The public read access rule is `_status = published`.
- **Preview:**
  - A `/preview/` route handler checks a secret, calls `(await draftMode()).enable()` and redirects to the page.
  - Pages check `draftMode()` and query with `draft: true`. Draft mode renders the page dynamically only for the editor; the public cached page isn't affected.
  - Payload Live Preview can show the site in an iframe; `X-Frame-Options: SAMEORIGIN` allows this because it's the same domain.
- **Caching:**
  - Keep the current model with Cache Components off, as the roadmap decided.
  - Pages stay statically prerendered. Data comes from the Payload Local API, wrapped in `unstable_cache` with tags such as `page:/about/`, `posts`, `settings`, `nav` and `redirects`.
- **Publishing:** Payload `afterChange` and `afterDelete` hooks call:
  - `revalidatePath(doc.path)` for that page, plus the blog hub and sitemap when a post changes.
  - `revalidateTag(tag, "max")` for shared data. Next.js 16 requires the two-argument form; the single-argument form is deprecated.
  - Changes to globals such as nav or settings revalidate the layout.
  - Pages regenerate on the next request and are shared across Vercel's CDN.
  - Revalidation is skipped when hooks run outside Next.js, for example in seed scripts.
- **Scheduled publishing:** Payload's `schedulePublish` needs its jobs queue plus a Vercel cron. Optional; can come later.

## 12. Implementation order and rollback

### Phases

**Phase 0 – Baseline (no code changes).** Tag the current release. Record a `qa:crawl` report, screenshots and head/JSON-LD snapshots for all URLs. Settle the open decisions listed below.

**Phase 1 – Spike on a branch.**

- Install Payload and split the routes into `(frontend)` and `(payload)`.
- Get the admin panel working against a local or Neon dev database. No frontend data changes yet.
- Pass criteria:
  - Lint, typecheck and build all succeed.
  - The `trailingSlash` and Turbopack CSS questions are resolved.
  - The crawl diff shows **zero** changes.

**Phase 2 – Infrastructure.** Set up Neon through the Marketplace (production and preview branches), a Blob store and the environment variables. Run migrations in the build. Lock down admin access, add the `/admin/` robots and header rules, and seed the first admin user.

**Phase 3 – SEO and redirects (low risk, high value).**

- Create the `SiteSettings` global (organisation, default OG image, social profiles) and per-path SEO overrides read by `pageMetadata()`.
- Add a `Redirects` collection. Apply redirects either from `next.config` `redirects()` at build time with a deploy hook, or in `proxy.ts` backed by Global Config synced on publish.
- Build the sitemap and OG titles from data.

**Phase 4 – Blog.**

- Create Posts, Authors, Categories and Media collections, and migrate the MDX posts to Lexical.
- Turn on `dynamicParams` and set up preview and draft mode.
- Move `BLOG_ENABLED` into `SiteSettings` once the nav is CMS-driven.

**Phase 5 – Shared content.** Case studies and case cards, FAQs, and the nav and footer globals, using internal link fields.

**Phase 6 – Core pages, one at a time.** Order: Privacy, then About and Contact, then the case-study pages, then the industry and market pages, then Home last. Run a parity diff before each page goes live.

**Phase 7 – Hardening.** Live Preview, editor documentation and validation rules (unique paths, title and description lengths, required alt text). Remove the old TypeScript content only after parity is confirmed.

### Rollback strategy

- **Code:** each phase ships as its own PR and tag. Vercel's instant rollback can promote the previous deployment at any time.
- **Content:** a `CMS_CONTENT` flag (per area) switches back to the existing TypeScript content until that area's old content is removed.
- **Database:**
  - Migrations are additive only. Destructive changes ship one release later.
  - Before each production migration, create a Neon branch or point-in-time restore point.
  - Payload versions allow restoring earlier document versions.
- **Media:** Blob files aren't touched by a code rollback.
- **SEO:** if any phase's crawl diff shows a changed canonical, robots value, title or schema, that phase doesn't go live.

## Open decisions before Phase 1

1. **Payload API path:** keep `/api` and reserve the `audit` and `contact` slugs, or move Payload to its own base path such as `/cms-api`.
2. **Redirect mechanism:** build-time redirects in `next.config` plus a deploy hook, or runtime redirects in `proxy.ts` backed by Global Config.
3. **Database region:** for example Sydney or Singapore.
