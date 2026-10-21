# Database migration and rollback

## Migrations

- Directory: `src/migrations/`. Current: `20261021_150424_initial_cms_schema` (creates all CMS tables; the website had no database before).
- Create after a schema change: `npm run cms:migrate:create -- <name>`; review the SQL; commit.
- Apply: `npm run cms:migrate`. Status: `npm run cms:migrate:status`.
- `push` is disabled; never use `payload migrate:fresh` or `migrate:reset` on a shared database (they drop data).

## Rehearsal (done on `tss_cms_test`, log: `logs/db-rehearsal.log`)

1. Fresh migrate on an empty database — OK.
2. Seed — 16 records created (15 pages + draft post) plus globals.
3. `migrate:down` — removed all CMS tables (0 left) — **destructive; for empty/new databases only.**
4. Re-migrate — OK; status shows the migration as run.
5. `pg_dump` of `tss_cms_dev` → `pg_restore --clean` into `tss_cms_test` — identical row counts.

## Production release order (plan — not executed)

1. Create the production Postgres (approved provider/region; pooled connection string) and a **separate** preview database.
2. Take a provider snapshot / `pg_dump` (empty at first release).
3. Run `npm run cms:migrate` against production **once**, from a trusted machine or a build step that runs `payload migrate` before `next build`.
4. Run `npm run cms:seed` against production **once** (create-only; it never overwrites).
5. Create named accounts with `npm run cms:create-admin` (Al Amin admin, Asif editor); share passwords out-of-band.
6. Deploy.

## Rollback decision tree

| Situation | Action |
| --- | --- |
| Content mistake after publish | Open the page → **Versions** → restore the previous version → publish |
| Wrong redirect / code | Disable it in the CMS (takes effect immediately) |
| Deployment broken, database fine | Vercel → Deployments → promote the previous deployment (instant rollback) |
| Need the pre-CMS site | Promote the last pre-CMS Production deployment, or deploy tag `pre-cms-baseline-bb8fe28`. The pre-CMS code does not use the database, so no DB change is needed |
| Database corrupted / bad migration | Restore the provider snapshot or `pg_restore --clean` the latest dump; redeploy the matching code version |
| Future destructive migration | Ship additive changes first; remove columns one release later; snapshot before applying |

## Account recovery

If an admin is locked out and email is not configured:

```bash
CMS_RESET_PASSWORD=true CMS_USER_EMAIL=<email> CMS_USER_PASSWORD=<new password> npm run cms:create-admin
```

This resets the password, unlocks the account and re-activates it. Run it only from a trusted machine with the target database’s `DATABASE_URL`.
