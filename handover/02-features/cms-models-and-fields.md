# CMS models and fields

Source: `src/cms/` (collections, globals, blocks, fields, hooks) and `src/payload.config.ts`. Generated types: `src/payload-types.ts`.

## Collections

| Collection | Key fields | Access (anonymous / editor / admin) | Behaviour |
| --- | --- | --- | --- |
| **Pages** | title, path (unique), routeType (`code` built-in / `cms`), template, layout (blocks), caseStudyCard, seo, structuredData, breadcrumbs, createdBy/updatedBy | published only / CRUD except delete / all | Drafts + 50 versions; built-in paths read-only and undeletable; unpublishing built-in pages admin-only; CMS page URL change → automatic 308 redirect; structured-data preview endpoint |
| **Posts** (blog) | title, slug (unique), excerpt, heroImage, content (article editor), category, author, publishedAt, displayUpdatedAt, relatedPosts, cta, seo (+H1), structuredData.articleType | published only / CRUD except delete / all | Drafts + versions; publishedAt auto-set on first publish; slug change on a published post → automatic 308 redirect |
| **Media** | file, title, alt (required), caption, credit, licence, usage (UI) | read / create+update / all | Image types only, 8 MB, SVG blocked, WebP sizes 400/800/1600, focal point, “where used” panel |
| **Authors**, **Categories** | name/role/bio; name/slug/commercial link | read / CRU / all | Category commercial link shown after articles |
| **Redirects** | from (unique, normalised), to (page/post or URL), destination (resolved), statusCode 308/307, enabled, reason | none / CRUD (internal targets) / all | Validation: reserved paths, live pages, chains, loops, `//`, `javascript:`, external = admin + https |
| **Tracking & Verification Codes** (`code-snippets`) | name, provider, codeType, code, placement (head / bodyStart / bodyEnd), scope (all / pages / templates), environments, enabled (default off), requiresConsent + category, notes | none / none / all | Parsed allow-list, provider validation, never shown in previews or admin |
| **Users** | name, email, role, canPublish, active, lastLoginAt | none / self only / all | No public registration, lockout, sessions, last-admin protection |
| **Audit log** | action, entity, docId, docLabel, changedFields, user, userEmail | none / none / read only | Append-only |

## Globals

| Global | Fields |
| --- | --- |
| **Navigation** | items (link or dropdown with children: label, link, icon, note, visibility), header button |
| **Footer** | headline + gradient words, two buttons, description, show location, columns of links, copyright, bottom links, social links, watermark |
| **Site settings** (admin) | site name, tagline, location statement, public contact email, breadcrumb home label, default SEO title/description/social image, organisation schema (description, logo, country fixed to BD, areas served, founders, sameAs), shared proof figures/comparison, 404 page copy |

## SEO group (every page and post)

SEO title, meta description, primary keyword, secondary keywords (multi), optional H1 override (posts), robots index/noindex, robots follow/nofollow, include in sitemap, canonical override (https only, no `vercel.app`/localhost), append brand, Open Graph title/description/image, generated-image eyebrow/headline, X/Twitter title/description/image. Live panel: search preview, character guides, H1 detection, keyword checks.

## Structured data group (pages)

Schema type (WebPage, AboutPage, ContactPage, CollectionPage, Article, Blog), BreadcrumbList toggle, FAQPage from FAQ sections, Person from founder cards, ItemList from case-study cards, Service (name, type, description). JSON-LD preview with validation. No free-form JSON.

## Page blocks

| Block | Wraps / reproduces |
| --- | --- |
| Homepage hero | homepage dark hero, photo, floating badges, marquee |
| Page hero | `PageHero` (breadcrumbs, eyebrow, H1 + gradient words, intro, buttons, trust points, image or diagram) |
| Hub hero | case-studies and blog hub heroes (optional side note) |
| Contact hero + form | contact hero, location note, email, `ContactForm` |
| Policy hero / Policy text | privacy policy |
| Content section | `Section` with layouts: heading + content, text beside diagram/image (`SplitFeature`), editorial (`EditorialSplit`), two columns, centred |
| Stat strip | audit page figures |
| Experience & proof | `ProofSection` (figures from Site settings) |
| Call-to-action band | `CtaBand` (+ side checklist) |
| FAQ | `FaqSection` (+ FAQPage schema) |
| Form section | free-audit form section (`AuditForm`) |
| Case study (full layout) | `CaseStudyLayout` (hero figures, glance, challenge, goals, work, results table, visual, extra results, why it worked, takeaway, transparency, final CTA) |

Content blocks inside sections: Text, Heading + intro, Feature list, Card grid (numbered), Icon cards, Process steps, Pricing tiers, Checklist (with linked phrase), Callout, Card (white/soft/tint/navy/panel, icon rows, extra tiers/callout), Two-column grid, Keyword table, Statistics, Image cards, Service cards, Image tiles, Link pills panel, Pills, Quote panel, Buttons, Text link, Flow diagram, Link list panel, Founder cards, People list, Numbered grid, Case study cards, Blog goal cards, Latest posts. Each has a “Space above” setting.

Code-managed by design: form fields/validation/email delivery, diagrams (selectable by name), icon set (selectable), case-study layout labels such as “Browse all case studies”.
