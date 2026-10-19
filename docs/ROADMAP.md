# Top Spot Studio website: audit, roadmap and status

## 1. Starting condition

- The project folder was **empty**: no code, assets or repository. This is a new build, not a redesign.
- The developer handoff pack provided everything needed for content and structure:
  - 14 approved URLs (`APPROVED_URLS.csv`)
  - six V2 core page copies and eight supporting page copies
  - the brand & CRO system
  - technical and on-page SEO V2
  - a 97-row internal linking matrix
  - a launch QA tracker
- Supplied assets: the logo and favicon mark (PNG). No photography, screenshots, fonts or social images were supplied.
- Missing inputs, built around rather than invented:
  - production domain
  - official inbox
  - GA4/GTM/GSC access
  - privacy-policy approval
  - case-study screenshot permission
  - blog articles
  - founder photos

## 2. Reference site (careguidebd.com)

- **Adopted:** strong hero with a real visual and two CTAs; numbered service cards; split editorial sections with checklists; generous imagery; clean multi-column footer.
- **Deliberately not adopted** (it conflicts with the brand rules): animated stat counters with unverified numbers, team/culture photo galleries implying a large team, duplicated carousel markup, generic brochure copy.

## 3. Stack and architecture

- Next.js 16 (App Router, static generation), TypeScript, Tailwind CSS v4, `next/font` (Inter body, Poppins wordmark), `lucide-react` icons, `zod` validation, MDX for blog articles.
- Hosted on Vercel. The forms run as two serverless route handlers that send email through the Resend REST API.
- Cache Components is turned off because the site is fully static; classic static generation is simpler and avoids prerender constraints.
- All public copy is transcribed from the “public page copy” sections of the DOCX files. Developer notes, QA notes and internal references are never rendered.

```
Home → Market pages (NZ SEO, NZ Local SEO) → Industry pages (Tradies, Roofing, Web Design)
     → Case studies hub → 3 anonymised case studies
     → Free SEO Audit (primary conversion) / Contact (secondary; primary for Web Design)
```

## 4. Page-by-page roadmap and completion

Every page is complete when it meets all of these:

- its copy matches the DOCX
- it has one H1 and the approved title/meta
- it has a self-canonical
- every CTA resolves
- it has no overflow at 375/768/1440 px
- its images have alt text and fixed ratios
- its JSON-LD is valid

All 14 routes meet them (see `QA_REPORT.md`).

| Page | Sections (in order) | Visuals | Primary CTA | Status |
| --- | --- | --- | --- | --- |
| Home `/` | Hero → problem → services 01–03 → who we help → NZ focus → why us → process → proof → audit → FAQ → final CTA | Roofer photo + path card, search-journey diagram, 3 trade photos, remote-delivery diagram, comparison chart | Get a Free SEO Audit | Done |
| NZ SEO | Hero → approach → 8 services → who → process + packages → why → remote → proof → measure → audit → FAQ → CTA | Scope diagram, remote diagram, comparison chart | Get a Free SEO Audit | Done |
| NZ Local SEO | Hero → intent → 8 services → relevance/distance/prominence → who → process → measure → why → proof → audit → FAQ → CTA | Phone-search photo, local-signals diagram | Get a Free SEO Audit | Done |
| SEO for Tradies | Hero → why → gaps + trade examples → 8 services → trades grid → Local SEO → website → process → why → NZ focus → proof → audit → FAQ → CTA | Builders photo, trade/job matrix, 5 trade photos, local diagram, site wireframe | Get a Free SEO Audit | Done |
| Roofing SEO | Hero → search → gaps → 8 services → page map + journeys → local + trust → process → why → NZ focus → proof → audit → FAQ → CTA | Roof-tiles photo, roofing page map | Get a Free SEO Audit | Done |
| Web Design for Tradies | Hero → one main job → problems → what we build + example structure → who → SEO + web → process → scope + packages → why → market → FAQ → CTA | Desktop + mobile wireframe | Discuss Your Website Project → `/contact/` | Done |
| Case Studies hub | Hero + transparency → 3 cards → what they show → how we present → context → CTA | Metric cards | Get a Free SEO Audit | Done |
| 3 case studies | Hero metrics → at a glance → challenge/goals → work → results (+ chart) → why it worked → takeaway + transparency → CTA | Verified-data charts and growth cards | See What We’d Fix on Your Site / Get a Free SEO Audit | Done |
| About | Hero → story → founder-led → founders → focus → process → values → experience → where we work → CTA | Role-split diagram, remote diagram (no founder photos) | Get a Free SEO Audit | Done |
| Free SEO Audit | Hero → expectation strip → what you get → what we check → who → how → why → form → FAQ → CTA | Audit checklist visual | Get My Free SEO Audit | Done |
| Contact | Hero + form → what happens next → founder-reviewed → topics → who → FAQ → CTA | Icons | Send My Enquiry | Done |
| Blog `/blog/` | Hero → topics → goals → latest guides (empty state) → CTA; MDX article template | Post cards, author box | Contextual | Template done; held for articles |
| Privacy Policy | Draft based on the actual stack | — | — | Draft, awaiting approval |

## 5. Priorities as delivered

| Priority | Work | Status |
| --- | --- | --- |
| P1 Critical | Scaffold, brand tokens, logo/favicons, header (sticky, Industries disclosure, mobile menu with CTA), footer, breadcrumbs, skip link, 404, all 14 routes with metadata/canonicals | Done |
| P2 Design | Shared components (hero, sections, numbered cards, feature lists, process steps, metrics, FAQ, CTA bands, case cards, forms), layout variety per brand rules | Done |
| P3 Content & visuals | All copy transcribed; 7 licensed photos; 11 custom diagrams; OG images; asset register | Done |
| P4 Functionality | Audit + contact forms (validation, honeypot, timing guard, rate limit, email), GTM events, 96 link-matrix links | Done (real inbox pending) |
| P5 Optimisation | Sitemap, robots, JSON-LD per template, staging/production indexing switch, accessibility, performance, QA scripts | Done |

## 6. Content and design decisions for Asif to review

1. **Coral button text colour.** The brand doc specifies white text on coral, but that is about 2.8:1 contrast and fails WCAG AA. Buttons use navy text on coral (about 5.5:1), with a darker navy on hover.
2. **Case-hub metrics for the influencer case.** The hub draft lists “8 → 3,323 organic sessions” and “+119% average session time”. The case document marks the sessions figure as *not verified*, and gives engagement as +220.7%. The hub card therefore shows only verified figures: 99 leads, +31.2% clicks, +88.0% impressions.
3. **Training-case page path removed.** The draft names the client’s most popular page by its URL path, which could identify the client. The public copy says “the site’s most popular page in the report attracted 838 users”.
4. **Breadcrumb parents.** There is no `/industries/` or `/markets/new-zealand/` page. Industry breadcrumbs show “Industries” as plain text (not a link, and excluded from schema), and market pages use Home → page, as the linking QA requires.
5. **Analytics event names.** The documents use three variants (`free_audit_submit`, `free_audit_form_submit`, `free_audit_submit_success`). The site uses the Developer Handoff names: `free_audit_cta_click`, `free_audit_form_start`, `free_audit_form_submit`, `contact_form_start`, `contact_form_submit`, `case_study_click`, `service_cta_click`, `outbound_email_click`. Rename them in `src/lib/analytics.ts` if GTM uses different ones.
6. **Audit form fields.** These follow the Free Audit page document (no phone field at launch). Location is optional with helper text, because the form cannot know whether a business is local.
7. **Contact success message.** The documents do not supply one. It reads: “Thanks — we’ve received your enquiry. One of the founders will review it and reply with the most sensible next step based on what you shared.” It makes no response-time promise.
8. **Blog empty state.** A short factual note links to the commercial pages. The hub stays noindexed, out of the nav, footer and sitemap, as the launch rule requires.
9. **Logo navy.** The supplied PNG uses roughly `#0A2C4E`; the site uses the palette navy `#0F2742` for the vector logo.

## 7. Completed vs outstanding

### Completed

- All 14 approved routes, plus the privacy draft and a custom 404.
- Brand system, responsive layouts, accessible navigation.
- All V2 and supporting copy, with anonymised case studies and the three URL conflicts fixed.
- Forms with validation, spam guards, email notifications and analytics events.
- Technical SEO:
  - canonicals
  - robots
  - sitemap
  - JSON-LD (Organization, WebSite, WebPage, Service, BreadcrumbList, Article, AboutPage/Person, ContactPage, CollectionPage/ItemList, FAQPage, Blog)
  - OG images
- Imagery: 7 licensed photos and 11 custom diagrams (see `ASSET_REGISTER.md`).
- Automated QA suite with results recorded in `QA_REPORT.md`.

### Outstanding (owner input needed)

| Item | Owner | Action |
| --- | --- | --- |
| Production domain + DNS + HTTPS | Asif / Al Amin | Buy the domain, add it in Vercel, set `NEXT_PUBLIC_SITE_URL` |
| Official inbox + Resend | Asif | Create the inbox, verify the sending domain in Resend, set `RESEND_API_KEY`, `CONTACT_INBOX`, `FORM_FROM_EMAIL`; send live test enquiries |
| Public contact email | Asif | Optional: set `NEXT_PUBLIC_CONTACT_EMAIL` (adds a mailto link and ContactPoint schema) |
| Privacy Policy approval | Asif (+ legal review if needed) | Review `/privacy-policy/`, then set `NEXT_PUBLIC_PRIVACY_APPROVED=true` |
| GTM / GA4 / GSC | Asif | Provide the GTM ID, configure GA4 key events, verify GSC and submit the sitemap after launch |
| Case-study claims sign-off | Asif | Confirm the metrics and wording, and screenshot permission if screenshots are wanted |
| Founder photos | Founders | Optional: add via the `photo` field in `src/app/about/page.tsx` |
| Blog articles | Asif / Al Amin | Add 3 approved MDX articles, then set `NEXT_PUBLIC_BLOG_ENABLED=true` |
| Cross-browser device check | Al Amin | Safari, Firefox, real iOS and Android on the staging URL |
| Go / No-Go | Both | Complete the launch tracker and switch `NEXT_PUBLIC_SITE_ENV=production` on the production deployment only |
