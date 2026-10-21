# Top Spot Studio CMS — user guide

For Asif (Editor) and Al Amin (Admin). No coding is needed for anything below.

## Signing in

1. Go to `https://<site>/admin` (locally `http://localhost:3000/admin`).
2. Enter the email and password you were given separately (never by chat or email in plain text).
3. After 5 wrong passwords the account locks for 15 minutes; an admin can unlock it under **Users & permissions**.
4. Forgot your password? Use **Forgot password** on the login screen (needs the site’s email settings). If email is not set up, an admin runs the reset command in `04-release/database-migration-and-rollback.md`.
5. Sessions end after 8 hours. Use the account menu → **Log out** on shared computers.

## The dashboard

The **Website overview** shows live numbers: pages and posts (published/draft), pages missing an SEO title or description, pages without a primary keyword, broken internal links, links pointing at redirected URLs, redirect conflicts, recently updated content and recent publishing activity. Click a number to see the list.

## Edit a page

1. **Pages** → click the page (e.g. *SEO Services NZ*).
2. **Content** tab: each block is one section of the page in the order you see on the website. Open a block to edit its text, buttons, images or list items.
   - Drag the handle on the left of a block to reorder; use **⋯ → Remove** to delete; **Add block** to insert a new section.
   - Built-in page URLs are fixed (greyed out) so links and rankings are protected.
3. Click **Save draft** to keep work private, **Preview** (eye icon) to see it on the real site, then **Publish changes** to make it live. The live page updates within a few seconds.

## Add a link to any text

1. In any text box, select the words.
2. Click the **link** icon in the toolbar (or the floating toolbar).
3. Choose **Page or post** to pick from a list (best: the link follows the page if its address ever changes) or **URL or #anchor** to type `/path/`, `#section-id` or `https://…`.
4. Optional: **Open in new tab** (adds safe `noopener noreferrer` automatically), a **Link title**, and `nofollow`/`sponsored` for external links.
5. To change or remove a link, click inside it and use the link popup (edit / remove).

Text styles (toolbar **A** menu): Emphasis, Muted, Small, Small + muted, Footnote, Display lead — these match the website’s existing styles.

## SEO for a page or post

Open the **SEO** tab:

- **SEO title** and **Meta description** — the bars show the usual display length. Search engines may still rewrite them.
- **Primary keyword** and **Secondary keywords** (press Enter after each) — the panel checks whether the keyword appears in the title, description and H1. These are suggestions only and never change your text.
- **Indexing & canonical**: index/noindex, follow/nofollow, include in sitemap, canonical override (leave empty normally).
- **Social sharing**: Open Graph and X/Twitter title, description and image. Leave empty to reuse the SEO title/description and the branded generated image.

The **SEO manager** (left menu → SEO tools) lists every page and post with its title, description, keywords and checks, with filters such as *Missing description*.

## Structured data

**Structured data** tab: choose the schema type and toggles (breadcrumbs, FAQ, service, founders, case-study list). The preview shows the exact JSON-LD that will be published and flags problems. FAQ schema is created from the FAQ section, so you only edit the questions once. After publishing, check the live URL in Google’s Rich Results Test.

## Blog posts

1. **Blog posts → Create new**: title, excerpt, featured image (with alt text), article body, category, author.
2. **Save draft** → **Preview** → **Publish**. Only published posts appear on `/blog/`, in related posts and (once the blog launch flag is on with 3+ posts) in the sitemap.
3. To withdraw a post, open it → **⋯ → Unpublish**. Its URL then returns 404.
4. Changing the slug of a published post automatically creates a 308 redirect from the old URL.
5. **Versions** (top right) shows every saved version; open one and **Restore** to go back.

Note: the blog hub and posts stay `noindex` until the blog is launched (`NEXT_PUBLIC_BLOG_ENABLED=true` with at least three approved articles) — this matches the agreed launch rule.

## Images

**Media library → Create new**: upload JPEG/PNG/WebP/AVIF/GIF up to 8 MB and write the **Alt text** (required). The **Where this image is used** panel lists pages using it. To replace an image everywhere, open it and upload a new file on the same record. Do not upload on the live site until cloud storage is approved (see known issues).

## Navigation and footer

Left menu → **Settings → Navigation** / **Footer**: change labels, order (drag), destinations, dropdown links and their short descriptions. “Only when the blog is enabled” keeps the Blog link hidden until launch.

## Internal links and redirects

- **Internal links & redirects** (SEO tools) lists every link on every page with its status: OK, Broken, Redirected, Target unpublished, Missing #anchor, External. Click the source page to fix it.
- **Redirects → Create new**: old path (e.g. `/old-page/`), destination (pick a page or type a path), **Permanent (308)** or **Temporary (307)**, and a reason. The system refuses redirects that would hide a live page, create a chain or loop, or send visitors to an unsafe address. Only admins can redirect to another website.

## Tracking & Verification Codes (admin only)

**SEO → Tracking & Verification Codes → Create new**

1. Choose the **Provider** (e.g. Google Search Console, Google Tag Manager head, Google Tag Manager body).
2. Paste the code exactly as the provider gave it.
3. Choose **Placement**: Header (`<head>`), Body (immediately after `<body>`), or Footer (before `</body>`). The system enforces the correct placement for known providers (e.g. GTM’s `<noscript>` must go in Body).
4. Choose **Target**: all pages, selected pages, or page templates.
5. Choose **Environments** and tick **Enabled** (new codes start disabled). Tick **Wait for visitor consent** for marketing/analytics scripts once a consent manager is installed.
6. Save, then confirm verification inside Google Search Console — saving here does not prove verification.

Codes never run inside the admin or in previews. Every change is recorded in the audit log. Do not add a GTM container here **and** set `NEXT_PUBLIC_GTM_ID` at the same time (it would load twice).

## Users (admin only)

**Settings → Users & permissions**: create accounts (12+ character passwords), choose **Admin** or **Editor**, untick **Can publish** to limit someone to drafts, untick **Account active** to block access without deleting history. At least one active admin is always kept.

## Audit log (admin only)

**Settings → Audit log** shows every login, publish, unpublish, edit and deletion with the person and time. Entries cannot be edited or deleted.
