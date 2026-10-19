import "server-only";
import type { z } from "zod";
import { flattenErrors, MIN_FILL_MS, type FormResult } from "./forms";
import { isEmailConfigured, sendNotification } from "./email";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort per-instance limiter; serverless instances do not share this map.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: FormResult, status = 200) => Response.json(body, { status });

export async function handleFormPost<S extends z.ZodType<{ email: string; startedAt: number; company_website?: string }>>(
  request: Request,
  schema: S,
  build: (data: z.infer<S>) => { subject: string; heading: string; rows: [string, string][] },
) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "We couldn’t read that submission. Please try again." }, 400);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, message: "Too many submissions in a short time. Please wait a few minutes and try again." }, 429);
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return json({ ok: false, fieldErrors: flattenErrors(parsed.error), message: "Please check the highlighted fields." }, 422);
  }

  const data = parsed.data;
  // Honeypot filled or submitted implausibly fast: acknowledge without sending.
  if (data.company_website || Date.now() - data.startedAt < MIN_FILL_MS) {
    return json({ ok: true });
  }

  if (!isEmailConfigured()) {
    console.error("[forms] Email delivery is not configured (SMTP_HOST, CONTACT_INBOX, and FORM_FROM_EMAIL or SMTP_USER).");
    return json(
      { ok: false, message: "Sorry — we couldn’t send your request just now. Please try again later." },
      503,
    );
  }

  const mail = build(data);
  const result = await sendNotification({ ...mail, replyTo: data.email });
  if (!result.ok) {
    console.error("[forms] Delivery failed:", result.error);
    return json({ ok: false, message: "Sorry — we couldn’t send your request just now. Please try again in a moment." }, 502);
  }
  return json({ ok: true });
}
