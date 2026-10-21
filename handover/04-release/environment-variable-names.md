# Environment variables (names only — never commit or share values)

Set in Vercel → Project → Settings → Environment Variables, separately for **Production** and **Preview**. `NEXT_PUBLIC_*` values are inlined at **build time**: changing them requires a **new deployment** (redeploy), not just saving the setting.

| Name | Scope | Production | Preview / staging | Purpose |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_ENV` | build | `production` | `staging` | Indexability switch (robots, sitemap, X-Robots-Tag, meta robots). **Missing on live today** |
| `NEXT_PUBLIC_SITE_URL` | build | preferred https origin (`https://topspotstudio.com` or `www`) | preview origin | Canonicals, OG, sitemap, schema. **Missing on live today** |
| `NEXT_PUBLIC_GTM_ID` | build | optional | empty | Legacy GTM loader — do not also add GTM as a CMS code |
| `NEXT_PUBLIC_BLOG_ENABLED` | build | `false` until 3 approved posts | any | Blog nav/sitemap/indexing |
| `NEXT_PUBLIC_PRIVACY_APPROVED` | build | `false` until approved | any | Privacy indexing + notice |
| `NEXT_PUBLIC_CONTACT_EMAIL` | build | optional | optional | Fallback contact email (CMS setting wins) |
| `DATABASE_URL` | server | production DB (pooled) | **separate** preview DB | Payload Postgres |
| `DATABASE_POOL_MAX` | server | `5` | `5` | Connection pool size |
| `PAYLOAD_SECRET` | server | unique 32+ byte random | different random | Signs sessions/tokens |
| `CMS_SERVER_URL` | server | same as site URL | preview URL | CSRF/CORS allow-list origin |
| `BLOB_READ_WRITE_TOKEN` | server | after approval | separate store | Media storage |
| `CMS_EMAIL_FROM` | server | optional | optional | Sender for CMS password-reset emails |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | server | existing values | test/sandbox SMTP only | Forms + CMS password reset |
| `CONTACT_INBOX`, `FORM_FROM_EMAIL` | server | existing values | test inbox only | Form delivery |
| `CMS_ALLOW_INSECURE_COOKIES` | server | **never set** | **never set** | Local plain-HTTP testing only |

CLI-only (set in the shell for one command, never stored): `CMS_USER_EMAIL`, `CMS_USER_NAME`, `CMS_USER_ROLE`, `CMS_USER_PASSWORD`.

Where to verify `NEXT_PUBLIC_SITE_ENV` in Vercel: Project → Settings → Environment Variables → filter **Production** → the variable must exist with value `production`; then Deployments → latest Production → **Redeploy** (without build cache) so the value is inlined.
