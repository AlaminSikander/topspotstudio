# Packages and versions

Installed with `npm install --save-exact`; no `--force`/`--legacy-peer-deps`. `npm ls` reports no invalid or missing peers.

| Package | Version | Notes |
| --- | --- | --- |
| next | 16.4.2 | unchanged |
| react / react-dom | 19.3.0 | unchanged |
| typescript | 5.9.3 | `target` raised to ES2022 (Payload requirement) |
| tailwindcss / @tailwindcss/turbopack | 4.3.3 | Turbopack rule now only processes files that `@import "tailwindcss"` |
| payload | 3.91.0 | peer range `next >=16.3.3 <17` satisfied |
| @payloadcms/next, @payloadcms/ui | 3.91.0 | admin UI + REST handlers |
| @payloadcms/db-postgres | 3.91.0 | `blocksAsJSON`, migrations only |
| @payloadcms/richtext-lexical | 3.91.0 | editor |
| @payloadcms/email-nodemailer | 3.91.0 | only active when `SMTP_HOST` is set (password reset) |
| @payloadcms/storage-vercel-blob | 3.91.0 | only active when `BLOB_READ_WRITE_TOKEN` is set |
| graphql | 16.11.0 | Payload peer dependency (GraphQL endpoint disabled) |
| sharp | 0.35.5 | moved from devDependencies to dependencies (image resizing at runtime) |
| nodemailer | 10.1.7 | unchanged (forms) |
| playwright | 1.64.1 (dev) | unchanged (QA scripts) |

Runtime: Node 20.20.2 locally (`engines` raised to `>=20.18.1`; Vercel default Node 22/24 is compatible). PostgreSQL 18.4 (Homebrew) locally.

## `npm audit --omit=dev` (21 Oct 2026)

All advisories are transitive dependencies of build tooling or the admin code editor, not of public page rendering:

| Package | Severity | Path | Exposure |
| --- | --- | --- | --- |
| braces / micromatch / findup-sync / find-node-modules | high | `@payloadcms/plugin-cloud-storage`, `sass` → `chokidar` | Glob matching at build/dev time; not reachable from requests |
| esbuild, @esbuild-kit/*, drizzle-kit | moderate | `@payloadcms/db-postgres` → `drizzle-kit` | Migration CLI only; dev-server advisory |
| dompurify, monaco-editor | low | admin code field | Admin-only, authenticated |

The only offered fixes are breaking/forced changes, which the brief forbids. Re-run `npm audit` before release and upgrade Payload when a patched release is available (KI-08).
