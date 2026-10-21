import "server-only";

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function clientIp(request: Request) {
  return (request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "unknown").trim();
}

/**
 * Fixed-window, per-instance limiter. It slows brute-force attempts against one server instance; for a hard
 * global limit add a Vercel Firewall rate-limit rule on /cms-api/users/login (documented in the release plan).
 */
export function rateLimit(request: Request, scope: string, { limit, windowMs }: { limit: number; windowMs: number }): Response | null {
  const key = `${scope}:${clientIp(request)}`;
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 5000) for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
    return null;
  }
  bucket.count += 1;
  if (bucket.count <= limit) return null;
  const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
  return Response.json(
    { errors: [{ message: "Too many attempts. Please wait and try again." }] },
    { status: 429, headers: { "Retry-After": String(retryAfter), "Cache-Control": "no-store" } },
  );
}
