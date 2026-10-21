import config from "@payload-config";
import "@payloadcms/next/css";
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from "@payloadcms/next/routes";
import { rateLimit } from "@/lib/cms/rate-limit";

const post = REST_POST(config);

/** Authentication endpoints get a per-IP limit in addition to Payload's per-account lockout (5 attempts / 15 min). */
const LIMITED = /\/cms-api\/users\/(login|forgot-password|reset-password|first-register)\/?$/;

export const GET = REST_GET(config);
export const PUT = REST_PUT(config);
export const PATCH = REST_PATCH(config);
export const DELETE = REST_DELETE(config);
export const OPTIONS = REST_OPTIONS(config);

export async function POST(request: Request, context: { params: Promise<{ slug: string[] }> }) {
  const { pathname } = new URL(request.url);
  if (LIMITED.test(pathname)) {
    const limited = rateLimit(request, `auth:${pathname.replace(/\/$/, "")}`, { limit: 10, windowMs: 15 * 60 * 1000 });
    if (limited) return limited;
  }
  return post(request, context);
}
