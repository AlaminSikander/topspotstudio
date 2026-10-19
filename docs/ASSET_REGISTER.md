# Asset register

Every image used on the site, where it came from, its licence and where it appears. Photos are stored as optimised JPEG masters in `src/assets/photos/` and served by `next/image` as AVIF/WebP at responsive sizes, with blur placeholders and lazy loading (hero images use `priority`).

Re-download photos with `node scripts/fetch-photos.mjs`. Regenerate logo/favicon files with `node scripts/generate-brand-assets.mjs`.

## Brand assets

| Asset | File | Source | Used on |
| --- | --- | --- | --- |
| Logo mark (vector) | `src/components/brand/Logo.tsx`, `public/brand/tss-mark.svg` | Traced from the supplied favicon artwork (`assets/brand/top-spot-studio-mark-original.png`) | Header, footer, hero card, OG images |
| Full logo (raster, trimmed) | `public/brand/top-spot-studio-logo.png` | Supplied logo (`assets/brand/top-spot-studio-logo-original.png`), trimmed | Organization schema `logo` |
| Favicon / app icons | `src/app/favicon.ico`, `src/app/icon.png`, `src/app/apple-icon.png` | Generated from the vector mark | Browser tabs, bookmarks, iOS home screen |
| Wordmark font | Poppins 500/600 via `next/font` | Google Fonts (SIL Open Font License) | Logo wordmark |
| Display font | Bricolage Grotesque (variable) via `next/font` | Google Fonts (SIL Open Font License) | Headings, metric numerals, footer wordmark |
| OG font files | `src/assets/fonts/Poppins-400.ttf`, `Poppins-600.ttf` | Google Fonts (SIL Open Font License) | Generated social images |
| Body font | Inter via `next/font` | Google Fonts (SIL Open Font License) | All text |
| Social share images | `src/app/og/[...slug]/route.tsx` → `/og/<page>.png` | Generated at build time (brand template) | `og:image` / `twitter:image` on every page |

Note: the supplied logo uses a slightly different navy (~`#0A2C4E`) from the brand palette (`#0F2742`). The vector logo uses the palette navy.

## Photography

All photos are free for commercial use. Neither licence requires attribution; credits are recorded here for traceability. None show Top Spot Studio staff, clients or a New Zealand office.

| File | Subject | Source & photographer | Licence | Placement |
| --- | --- | --- | --- | --- |
| `roofer-working-on-roof.jpg` | Roofer in hard hat on a pitched roof | [Pexels #37623622](https://www.pexels.com/photo/roofer-working-on-roof-installation-with-safety-gear-37623622/) — Bulat843 | Pexels License | Home hero; SEO for Tradies “Trades we can support” |
| `roof-tiles-installation.jpg` | Roof tiles laid on timber battens | [Unsplash RO9HIOzFSX0](https://unsplash.com/photos/roof-tiles-are-being-installed-on-a-wooden-frame-RO9HIOzFSX0) — Clement Proust | Unsplash License | Roofing SEO hero; Home “Who we help” (Roofing Companies) |
| `electrician-switchboard.jpg` | Electrician working in a switchboard | [Pexels #27928762](https://www.pexels.com/photo/a-man-is-working-on-an-electrical-panel-27928762/) — ranjeet . | Pexels License | Home “Who we help” (Tradies); Tradies trades grid |
| `plumber-fitting-pipe.jpg` | Gloved hands fitting a pipe to a radiator | [Pexels #29226620](https://www.pexels.com/photo/professional-plumber-installing-a-radiator-pipe-29226620/) — Sergei Starostin | Pexels License | Tradies trades grid |
| `builders-timber-frame.jpg` | Two builders on a timber house frame | [Pexels #8829878](https://www.pexels.com/photo/men-working-on-wooden-trusses-of-a-house-8829878/) — Ron Lach | Pexels License | SEO for Tradies hero; trades grid |
| `landscaper-trimming-lawn.jpg` | Landscaper trimming grass | [Pexels #20534859](https://www.pexels.com/photo/back-view-of-a-person-mowing-grass-20534859/) — Rodolfo Gaion | Pexels License | Home “Who we help” (Service Businesses); trades grid |
| `customer-searching-on-phone.jpg` | Person searching on a phone at home | [Pexels #36712997](https://www.pexels.com/photo/man-relaxing-on-couch-using-smartphone-at-home-36712997/) — Vitaly Gariev | Pexels License | Local SEO hero |

Rejected during selection: a plumber photo with a visible company logo on the uniform, a mitre-saw photo dominated by a tool brand, and several Unsplash+ (paid licence) images.

## Custom diagrams (built in code)

All diagrams use the brand palette and one line-icon set (`lucide-react`). Informative diagrams have an accessible label; decorative shapes use `aria-hidden`.

| Component | Purpose | Placement |
| --- | --- | --- |
| `SearchJourney` | Search → page → trust → enquiry, with leak points | Home “Getting found is only the first step” |
| `HeroPathCard` | Small “found → clear page → enquiry” card | Home hero overlay |
| `RemoteDeliveryVisual` | Bangladesh base → New Zealand market (no NZ office) | Home market focus, NZ SEO remote section, About “Where we work” |
| `SeoScopeDiagram` | Research / website & content / measurement | NZ SEO hero |
| `LocalSignalsDiagram` | Relevance, distance, prominence | Local SEO “How Local SEO works”, Tradies Local SEO section |
| `TradeJobMatrix` | Illustrative trade × job → page role | Tradies “Common gaps” |
| `RoofingPageMap` | Repairs / reroofing / replacement page roles and journeys | Roofing “Service pages should match real demand” |
| `SiteWireframe` | Sample tradie site on desktop + mobile | Web Design hero, Tradies website section |
| `AuditChecklistVisual` | Areas reviewed + 5–7 / 3 / 0 strip | Free SEO Audit hero |
| `RoleSplitDiagram` | Asif (SEO) / shared / Al Amin (web & QA) | About hero |
| `ComparisonBars` | Before/after bars from verified figures only | Proof sections, influencer and AI-editing case studies |

## Pending assets (need approval before use)

| Asset | Where it would go | Status |
| --- | --- | --- |
| Founder headshots | About founder cards (`photo` prop already supported) | Not used at launch, as instructed |
| Case-study screenshots (Search Console, Analytics, rankings) | Case study results sections | Not used — need written permission and redaction of client names, logos, account IDs |
| Real project photography / client website examples | Web Design “Trust and Proof”, Roofing trust section | None supplied |
| Blog featured images | Article template (`image` field) | Add per article when articles are approved |
