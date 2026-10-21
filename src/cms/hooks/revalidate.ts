import type { PayloadRequest } from "payload";

const ogPath = (path: string) => (path === "/" ? "/og/home.png" : `/og${path.replace(/\/$/, "")}.png`);

/**
 * Marks every public route for regeneration on its next request.
 * Pages share navigation, footer, settings and cross-page links, so a change anywhere revalidates the whole
 * (small) site: the frontend layout, each page and post path, OG images, the sitemap and robots.txt.
 */
export async function revalidateSite(req: PayloadRequest | undefined, reason: string) {
  if (!req || req.context?.disableRevalidate) return;
  let revalidatePath: (path: string, type?: "page" | "layout") => void;
  try {
    ({ revalidatePath } = await import("next/cache"));
  } catch (err) {
    req.payload.logger.error({ msg: `Revalidation unavailable (${reason}): ${(err as Error).message}` });
    return;
  }
  try {
    const [pages, posts] = await Promise.all([
      req.payload.find({ collection: "pages", depth: 0, limit: 1000, pagination: false, overrideAccess: true, req, select: { path: true } }),
      req.payload.find({ collection: "posts", depth: 0, limit: 1000, pagination: false, overrideAccess: true, req, select: { slug: true } }),
    ]);
    revalidatePath("/", "layout");
    for (const p of pages.docs) {
      revalidatePath(p.path);
      revalidatePath(ogPath(p.path));
    }
    for (const p of posts.docs) revalidatePath(`/blog/${p.slug}/`);
    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/sitemap.xml");
    revalidatePath("/robots.txt");
    req.payload.logger.info({ msg: `Revalidated site: ${reason}` });
  } catch (err) {
    // Scripts and migrations pass context.disableRevalidate, so a failure here means published changes may not appear.
    req.payload.logger.error({ msg: `Revalidation failed (${reason}): ${(err as Error).message}` });
  }
}

type StatusDoc = { _status?: "draft" | "published" | null } | null | undefined;

/** Public output only changes when a published version is created, updated or withdrawn. */
export const affectsPublicSite = (doc: StatusDoc, previousDoc: StatusDoc) =>
  doc?._status === "published" || previousDoc?._status === "published" || (!doc?._status && !previousDoc?._status);
