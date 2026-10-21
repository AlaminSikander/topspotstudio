import "server-only";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { normalizePath } from "@/cms/lib/paths";
import { findRedirect } from "./queries";

/** For URLs with no live page: follow an enabled CMS redirect (308/307) or return a real 404. */
export async function redirectOrNotFound(path: string): Promise<never> {
  const hit = await findRedirect(normalizePath(path));
  if (hit) {
    if (hit.permanent) permanentRedirect(hit.destination);
    redirect(hit.destination);
  }
  notFound();
}
