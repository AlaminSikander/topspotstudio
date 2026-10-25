# Database separation (development, QA, production)

Updated 26 October 2026. No credentials are recorded here; get connection strings from the Neon CLI when needed.

## Branches (Neon project `autumn-sunset-30993739`)

| Branch | ID | Compute endpoint | Used by | Expires |
| --- | --- | --- | --- | --- |
| `production` (default) | `br-nameless-term-b4ph1e49` | `ep-curly-surf-b49furta` | **Vercel Production only** | never |
| `development` | `br-bold-mud-b4hu7vph` | `ep-round-waterfall-b467le23` | Routine local development (`.env.local`) | never |
| `qa` | `br-ancient-cell-b4p6we1b` | `ep-weathered-smoke-b4nzp73w` | QA runs (`.tmp/qa.env`, git-ignored) | 29 Oct 2026 |

`development` and `qa` are copy-on-write copies of production taken on 25 Oct (development) and 22 Oct (qa). Writes to them never reach production.

## Three layers of protection

1. **Different hosts.** `.env.local` points at the `development` endpoint; the QA environment points at `qa`. The Neon CLI context (`.neon`) is also set to `development`, so `neon connection-string` without a branch name no longer returns production.
2. **Different passwords.** Neon copies role passwords into child branches. On 26 Oct the `neondb_owner` password was reset on `development` and `qa` (production unchanged), so a development or QA credential cannot log in to production even if the hostname is swapped.
3. **Code guard.** `src/lib/db-guard.ts` is called from `payload.config.ts`, so it covers `next dev`, `next start`, `next build`, every `payload` command (seed, migrate, create-admin) and the CMS QA suite. It refuses the production endpoint unless the process runs on **Vercel Production** (`VERCEL_ENV=production`) or `ALLOW_PRODUCTION_DB=true` is set explicitly for a deliberate one-off operation. Vercel Preview deployments are refused too. `scripts/cms-qa.mjs` additionally refuses to run against `topspotstudio.com`.

Unit tests (`tests/unit/db-guard.test.ts`) cover the guard. It was also checked against the real production connection string, which failed with "Refusing to connect to the PRODUCTION database outside Vercel Production" before any connection was opened.

## Day-to-day commands

```bash
npm run dev                                    # uses .env.local → development branch
neon connection-string development --pooled    # DATABASE_URL for .env.local
neon connection-string development             # DATABASE_URL_UNPOOLED (migrations)

# Refresh development from current production data (discards development changes)
neon branches reset development --parent

# Fresh QA branch for a test run (auto-expires; recreate when needed)
neon branches create --name qa-$(date +%Y%m%d) --parent production --expires-at "$(date -u -v+7d +%Y-%m-%dT%H:%M:%SZ)"
```

After resetting or recreating a branch, reset its password again so it differs from production:

```bash
neon api /projects/autumn-sunset-30993739/branches/<branch-id>/roles/neondb_owner/reset_password -X POST > /dev/null
```

Then update `.env.local` or the QA env file with `neon connection-string <branch>`.

## Production database operations

Migrations against production are the only routine reason to connect from a workstation. Run them deliberately:

```bash
ALLOW_PRODUCTION_DB=true DATABASE_URL_UNPOOLED="$(neon connection-string production)" npm run cms:migrate
```

Take a backup or note the Neon restore point first (see `database-migration-and-rollback.md`).

## Media storage per environment

| Environment | Storage |
| --- | --- |
| Local without token | `./media` (git-ignored) |
| Local / QA with the QA token | Vercel Blob store `topspotstudio-media-qa` (connected to the Vercel **Development** environment only) |
| Production | Vercel Blob store `topspotstudio-media` (connected to **Production** only) once approved |

Keeping separate stores means QA uploads and deletions can never remove production images.
