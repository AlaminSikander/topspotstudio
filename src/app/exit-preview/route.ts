import { draftMode } from "next/headers";
import { isValidPagePath } from "@/cms/lib/paths";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requested = new URL(request.url).searchParams.get("path") ?? "/";
  const path = isValidPagePath(requested) ? requested : "/";
  (await draftMode()).disable();
  return new Response(null, { status: 307, headers: { Location: path, "Cache-Control": "private, no-store" } });
}
