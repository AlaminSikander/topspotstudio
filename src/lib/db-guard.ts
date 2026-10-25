/**
 * Neon compute endpoints of the `production` branch (hostnames, not credentials). Update this list if the
 * production compute is ever replaced.
 */
export const PRODUCTION_DB_ENDPOINTS = ["ep-curly-surf-b49furta"] as const;

export function isProductionDatabase(url: string | undefined): boolean {
  if (!url) return false;
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return false;
  }
  const endpoint = host.split(".")[0]?.replace(/-pooler$/, "");
  return PRODUCTION_DB_ENDPOINTS.some((ep) => ep === endpoint);
}

/**
 * Only Vercel Production may use the production database. Local servers, scripts, QA runs and Vercel Previews
 * are refused unless ALLOW_PRODUCTION_DB=true is set for a deliberate one-off operation (e.g. `cms:migrate`).
 */
export function assertDatabaseAllowed(url: string | undefined, env: Record<string, string | undefined> = process.env): void {
  if (!isProductionDatabase(url)) return;
  if (env.VERCEL_ENV === "production" || env.ALLOW_PRODUCTION_DB === "true") return;
  throw new Error(
    "Refusing to connect to the PRODUCTION database outside Vercel Production. Point DATABASE_URL at the Neon " +
      "`development` or `qa` branch (see handover/04-release/database-separation.md), or set ALLOW_PRODUCTION_DB=true " +
      "for a deliberate production operation.",
  );
}
