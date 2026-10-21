# Release checklist (PLAN ONLY — do not execute without Asif’s written approval)

## A. Approvals (yes / no)

- [ ] Route and SEO parity accepted (`../03-quality/ROUTE-PARITY.csv`, `SEO-BEFORE-AFTER.csv`)
- [ ] Database provider, region and cost approved (preview + production, separate)
- [ ] Media storage provider and cost approved
- [ ] Production indexing fix (KI-00) approved as its **own** change, with its own deployment
- [ ] Preferred host (apex or www) chosen (KI-02)
- [ ] Privacy-policy wording updates approved (KI-10/11)

## B. Staging (protected Preview)

1. Create a preview database; set Preview env vars (`../04-release/environment-variable-names.md`) with `NEXT_PUBLIC_SITE_ENV=staging`.
2. Keep Vercel Deployment Protection ON for Preview.
3. Build command: `payload migrate && next build` (or run migrations once from a trusted machine).
4. `npm run cms:seed` against the preview DB; create preview-only accounts.
5. Run `qa:crawl`, `qa:forms` (test SMTP/sandbox inbox only), `qa:nav`, `qa:screens`, `scripts/cms-qa.mjs` against the preview URL (authenticated with `vercel curl` or a bypass token).
6. Verify preview is `noindex` (meta + header), `robots.txt` `Disallow: /`, sitemap empty, admin requires login.

## C. Production (after approval)

1. Back up: confirm the current Production deployment ID; `pg_dump` / provider snapshot of the production DB.
2. Set Production env vars (database, secret, Blob, `CMS_SERVER_URL`); do **not** change `NEXT_PUBLIC_SITE_ENV`/`NEXT_PUBLIC_SITE_URL` unless KI-00 is approved for this release.
3. Apply migrations once; seed once; create named accounts.
4. Add Vercel Firewall rate-limit rule for `POST /cms-api/users/login`.
5. Deploy the feature branch via PR merge.
6. Smoke tests (within 15 min):
   - `curl -I` home → 200; robots meta/header as intended for the approved indexing state
   - `robots.txt`, `sitemap.xml` content as intended
   - 15 routes 200; unknown URL 404; `/about` → 308 `/about/`
   - Submit one audit + one contact form to the real inbox (owner-approved test), confirm one email each
   - `/admin` login, edit + revert one SEO title, confirm live HTML updates
   - Upload one image (only if Blob configured)
7. Monitor Vercel logs and Search Console for 48 h.

## D. Rollback triggers

Any of: forms failing; any route not 200; canonical/robots differing from the approved state; admin exposing data; error rate spike. → Promote previous deployment (instant), then investigate. Restore DB from the snapshot only if data was damaged. See `database-migration-and-rollback.md`.
