# Publishing demo (recorded, automated)

Environment: local production-mode build (`NEXT_PUBLIC_SITE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://topspotstudio.com`) on `http://localhost:3100`, local Postgres `tss_cms_dev`, mock SMTP. Script: `scripts/cms-qa.mjs`; results: `../03-quality/raw/cms-qa-results.json` (120/120 pass). Every test record is named `qa-test-*` and deleted at the end (CLEANUP check).

## Page lifecycle (CMS page via the catch-all route)

| Step | Check | Result |
| --- | --- | --- |
| Editor creates draft `/qa-test-page/` | EDIT-01 | 201 |
| Draft not public | DRAFT-01/02/03 | 404; API 403/404; not in sitemap |
| Publish | PUB-01/02 | 200; server-rendered |
| Metadata in initial HTML | SEO-01/02/03 | one `<title>`, one description, one self-canonical on `https://topspotstudio.com` |
| FAQ → schema | SEO-04 | FAQPage JSON-LD present |
| Internal link | LINK-01 | `<a href="/about/">linked words</a>` |
| Sitemap + OG image | SITEMAP-01, SEO-05 | URL added; `/og/qa-test-page.png` 200 |
| Save draft of live page | DRAFT-04 | live page unchanged |
| Preview | PREV-01…06 | needs session; shows draft; noindex; copied draft cookie alone shows published version; exit clears cookie |
| Publish reordered sections + external new-tab link | EDIT-03, LINK-02 | order changed; `target="_blank" rel="noopener noreferrer"` |
| Remove link | LINK-03 | anchor gone |
| Restore earlier version | REV-01 | original content back |
| Set noindex | SEO-06 | `noindex, follow` meta; removed from sitemap |
| Editor without publish permission | PERM-12 | draft saved, publish 403 |
| Unpublish | PUB-03 | 404; removed from sitemap |

## Edits to real pages (reverted automatically)

| Edit | Check | Result |
| --- | --- | --- |
| SEO title of SEO Services NZ | SEO-07/08 | `<title>` and `og:title` changed in server HTML, then restored |
| Homepage hero text | EDIT-04/05 | live homepage changed, then restored |
| Navigation label “About” | NAV-01/02 | header changed on every page, then restored |

## Blog lifecycle

| Step | Check | Result |
| --- | --- | --- |
| Draft post | BLOG-01/02 | 201; public 404 |
| Preview | BLOG-03 | visible to signed-in editor, noindex |
| Publish | BLOG-04/05 | article 200; listed on `/blog/`; BlogPosting + BreadcrumbList JSON-LD |
| Indexing rule | BLOG-06/07 | `noindex, follow` and excluded from sitemap while `NEXT_PUBLIC_BLOG_ENABLED` is false (unchanged launch rule) |
| Update | BLOG-08 | title change live |
| Slug change | BLOG-09 | old URL → 308 → new URL |
| Unpublish | BLOG-10 | 404; card removed from listing |

## Screenshots

`../03-quality/screenshots/admin/`: dashboard, pages list, page editor, SEO tab, structured-data tab, SEO manager, link manager, redirects, tracking-code form, posts, navigation.

A video walkthrough on a protected staging URL is pending because staging is not deployed (see known issues KI-01).
