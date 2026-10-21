import "server-only";
import config from "@payload-config";
import { draftMode, headers } from "next/headers";
import { getPayload, type Payload } from "payload";
import { cache } from "react";

export const getPayloadClient = cache(async (): Promise<Payload> => getPayload({ config }));

export type PreviewContext = { draft: true; user: NonNullable<Awaited<ReturnType<Payload["auth"]>>["user"]> } | { draft: false; user: null };

/**
 * Drafts are only shown when Draft Mode is on AND the request carries a valid, active CMS session.
 * A leaked draft-mode cookie on its own reveals nothing.
 */
export const getPreviewContext = cache(async (): Promise<PreviewContext> => {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return { draft: false, user: null };
  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: await headers() });
  if (user && (user as { active?: boolean }).active !== false) return { draft: true, user };
  return { draft: false, user: null };
});
