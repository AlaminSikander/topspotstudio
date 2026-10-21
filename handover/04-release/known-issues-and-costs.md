# Known issues, risks and costs

| ID | Severity | Issue | Impact | Workaround / owner decision |
| --- | --- | --- | --- | --- |
| KI-00 | **CRITICAL (pre-existing)** | Live Production sends `noindex`, `Disallow: /`, empty sitemap and `http://localhost:3000` canonicals | Site cannot be indexed | Set `NEXT_PUBLIC_SITE_ENV=production` + `NEXT_PUBLIC_SITE_URL` in Vercel Production and redeploy (separate approval). `../00-baseline/indexing-difference.md` |
| KI-01 | High (blocker) | Protected staging not deployed | No shared preview of the CMS | Approve hosted Postgres (preview + production branches), media storage and Vercel access |
| KI-02 | High (pre-existing) | `topspotstudio.com` and `www.topspotstudio.com` both return 200 | Duplicate host | Choose preferred host; redirect the other in Vercel Domains |
| KI-03 | Medium | Media uploads need durable storage on Vercel | Uploads on a deployed site would be lost | Approve Vercel Blob (or S3/R2) and set `BLOB_READ_WRITE_TOKEN` before any upload |
| KI-04 | Low | 404 for unknown URLs is a 404 with a client-rendered branded page (initial HTML is Next’s error shell) | Non-JS clients see a blank 404; SEO unaffected (status 404 + noindex) | Option: Proxy-based redirects + `global-not-found` (experimental) later |
| KI-05 | Medium | Login rate limit is per server instance | Distributed brute force less constrained (accounts still lock after 5 tries) | Add Vercel Firewall rate-limit rule on `/cms-api/users/login` |
| KI-06 | Medium | Admin on the same origin as the public site | An approved but malicious tracking script could act for a signed-in admin | Codes admin-only + audited; optionally host admin on a subdomain |
| KI-07 | Low | No CSP on public pages | Defence-in-depth only | Trial `Content-Security-Policy-Report-Only` once GTM/consent tools are chosen |
| KI-08 | Low | Transitive npm advisories (tooling/admin editor) | Not reachable from public requests | Upgrade Payload when patched; re-run `npm audit` |
| KI-09 | Owner decision | No primary/secondary keywords set (16 items) | Keyword checks inactive | Asif to enter keywords in each SEO tab — not invented by the developer |
| KI-10 | Owner decision (pre-existing copy) | Privacy policy still says “Resend delivers form submissions”; forms now use SMTP | Inaccurate policy text | Approve corrected wording, then edit in Pages → Privacy Policy |
| KI-11 | Owner decision | Privacy policy GTM/analytics paragraphs and contact-email sentence were conditional in code; migrated as currently rendered (GTM off, no email) | Must be updated if analytics/email are enabled | Edit the policy text in the CMS when GTM or the public email is switched on |
| KI-12 | Low | Admin API calls get one 308 hop (site uses trailing slashes) | Slight admin latency | None needed |
| KI-13 | Low | Minor spacing differences (≤ 8 px) in a few CMS-rendered card/column spots; structure 97–100 % identical | Visual nuance | Review screenshots; adjust block “Space above” if desired |
| KI-14 | Info | Scheduled publishing not enabled | — | Needs Payload jobs + Vercel Cron; can be added later |
| KI-15 | Info | Page-scoped codes allow only meta/link/async external scripts; body-start codes must be site-wide | By design (exact placement, client navigation) | Use site-wide scope for GTM-style snippets |
| KI-16 | Info | `pg` deprecation warning in CLI output (Payload internals) | None | Resolved by future Payload upgrade |

## Costs (none incurred)

| Item | Needed for | Indicative pricing model | Status |
| --- | --- | --- | --- |
| Hosted Postgres (e.g. Neon via Vercel Marketplace) | staging + production CMS | free tier available; paid by compute/storage | not purchased |
| Media storage (Vercel Blob or S3/R2) | uploads on deployed sites | per GB stored + transfer | not purchased |
| Vercel plan | Firewall rate limiting, Deployment Protection options | depends on current plan | not changed |
| Consent manager (if marketing scripts are added) | consent gating | free tiers exist | not chosen |
