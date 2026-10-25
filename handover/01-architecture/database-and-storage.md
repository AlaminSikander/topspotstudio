# Database and storage

> Since 22 Oct the CMS runs on Neon Postgres (branches `production`, `development`, `qa`). See `../04-release/database-separation.md`; the local databases below were used during the build phase.

## Databases (local, isolated)

| Database | Purpose |
| --- | --- |
| `tss_cms_dev` | Local development and the local production-mode QA build |
| `tss_cms_test` | Migration, rollback and restore rehearsals |

No other database was touched. There is no staging or production database yet; creating them needs owner approval (cost, region).

Connection: `DATABASE_URL` (server-only, in `.env.local`, git-ignored). Pool size `DATABASE_POOL_MAX` (default 5; keep small on Vercel Fluid Compute and use the provider’s **pooled** connection string).

## Schema

- One versioned migration: `src/migrations/20261021_150424_initial_cms_schema.ts` (+ `.json` snapshot). `push` is disabled, so the schema only changes through reviewed migrations.
- Blocks are stored as JSON (`blocksAsJSON`); about 40 tables in total.
- Versions/drafts: `_pages_v`, `_posts_v` (up to 50 versions per document).
- Unique constraints: `pages.path`, `posts.slug`, `redirects.from`, `users.email`, `categories.slug`, `categories.name`.
- Audit fields: `createdBy`, `updatedBy` (from the session, never from the request body), `createdAt`, `updatedAt`; `audit_logs` is append-only through the API.

## Recreate from scratch

```bash
createdb tss_cms_dev
# .env.local: DATABASE_URL, PAYLOAD_SECRET (openssl rand -hex 32), CMS_SERVER_URL=http://localhost:3000
npm run cms:migrate          # apply migrations
npm run cms:seed             # import the website's existing content (create-only)
CMS_USER_EMAIL=… CMS_USER_NAME=… CMS_USER_ROLE=admin CMS_USER_PASSWORD=… npm run cms:create-admin
```

## Backup and restore (rehearsed — `04-release/logs/db-rehearsal.log`)

```bash
pg_dump --format=custom --no-owner "$DATABASE_URL" -f backup.dump
pg_restore --clean --if-exists --no-owner -d "$TARGET_DATABASE_URL" backup.dump
```

Restoring the dev dump into `tss_cms_test` produced identical row counts (pages 15, page versions 48, posts 1, users 2, audit log 178).

## Media storage

| Environment | Storage | Status |
| --- | --- | --- |
| Local without token | `./media` (git-ignored), served at `/cms-api/media/file/<name>` | working |
| Local / QA | Vercel Blob store `topspotstudio-media-qa` (Vercel Development environment only) | tested 26 Oct: upload, retrieval, persistence across a clean rebuild, delete |
| Production | Vercel Blob store `topspotstudio-media` (Production only) via `@payloadcms/storage-vercel-blob` | see `06-production-readiness/PRODUCTION-READINESS-REPORT.md` |

The plugin runs with `alwaysInsertFields: true`, so the `media.prefix` and `media._objectkey` columns exist in every environment (migration `20261025_195558_media_storage_fields`). Without that migration, uploads fail with `column "_objectkey" does not exist` as soon as a Blob token is set.

Vercel’s server filesystem is ephemeral, so **do not upload media on a deployed environment without a Blob token.** The existing design photos are static build assets and are not affected.

Database separation (development, QA and production branches, and the production-database guard) is described in `../04-release/database-separation.md`.
