import { APIError, type CollectionBeforeChangeHook, type CollectionBeforeDeleteHook } from "payload";
import { canPublish, isAdmin } from "../access";
import { isDraftSave } from "./audit";

/** Records who created and last changed a document. Values always come from the session, never from the request body. */
export const stampUser: CollectionBeforeChangeHook = ({ data, req, operation, originalDoc }) => {
  const userId = (req.user as { id?: number } | null)?.id;
  if (!userId) return data;
  return {
    ...data,
    createdBy: operation === "create" ? userId : (originalDoc?.createdBy ?? data.createdBy),
    updatedBy: userId,
  };
};

/**
 * Editors without publishing permission can only save drafts.
 * Withdrawing a code-backed page (unpublishing) would return 404 for a live URL, so that is admin-only.
 */
export const enforcePublishing: CollectionBeforeChangeHook = async ({ data, req, originalDoc, operation, collection }) => {
  if (!req.user) return data;
  const publishing = data._status === "published";
  // originalDoc is the latest draft when one exists, so the live status is read from the published record.
  let liveStatus = originalDoc?._status;
  if (operation === "update" && originalDoc?.id && data._status === "draft" && !isDraftSave(req)) {
    const live = await req.payload.findByID({ collection: collection.slug as "pages", id: originalDoc.id, draft: false, depth: 0, overrideAccess: true, req, disableErrors: true });
    liveStatus = live?._status;
  }
  const unpublishing = data._status === "draft" && liveStatus === "published" && !isDraftSave(req);
  if ((publishing || unpublishing) && !canPublish(req)) {
    throw new APIError("Your account can save drafts but cannot publish or unpublish. Ask an admin to publish this change.", 403);
  }
  if (unpublishing && originalDoc?.routeType === "code" && !isAdmin(req)) {
    throw new APIError("Unpublishing a built-in page makes its live URL return 404. Only an admin can do this.", 403);
  }
  req.context.workflowAction = publishing ? "publish" : unpublishing ? "unpublish" : data._status === "draft" ? "draft" : undefined;
  return data;
};

/** Built-in pages map to route files in the codebase and must not be deleted from the CMS. */
export const protectCodePages: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const doc = await req.payload.findByID({ collection: "pages", id, depth: 0, overrideAccess: true, req, draft: true });
  if (doc?.routeType === "code") {
    throw new APIError(`"${doc.title}" is a built-in page (${doc.path}) and cannot be deleted. Unpublish it instead if it must be withdrawn.`, 403);
  }
};
