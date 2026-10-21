import config from "@payload-config";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import { isValidPagePath } from "@/cms/lib/paths";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };

/** Enables Draft Mode for signed-in CMS users only, then opens the requested page. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") ?? "/";
  if (!isValidPagePath(path)) return new Response("Invalid preview path", { status: 400, headers: NO_STORE });

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });
  if (!user || (user as { active?: boolean }).active === false) {
    const login = `/admin/login/?redirect=${encodeURIComponent(`/preview/?path=${encodeURIComponent(path)}`)}`;
    return new Response(null, { status: 307, headers: { ...NO_STORE, Location: login } });
  }

  (await draftMode()).enable();
  return new Response(null, { status: 307, headers: { ...NO_STORE, Location: path } });
}
