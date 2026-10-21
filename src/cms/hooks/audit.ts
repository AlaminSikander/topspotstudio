import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook, PayloadRequest } from "payload";

const IGNORED = new Set(["updatedAt", "createdAt", "updatedBy", "createdBy", "id", "_status", "loginAttempts", "lockUntil", "sessions", "hash", "salt"]);

export function changedFields(doc: Record<string, unknown>, prev: Record<string, unknown> | undefined) {
  if (!prev) return [];
  const keys = new Set([...Object.keys(doc ?? {}), ...Object.keys(prev ?? {})]);
  return [...keys].filter((k) => !IGNORED.has(k) && JSON.stringify(doc?.[k] ?? null) !== JSON.stringify(prev?.[k] ?? null)).slice(0, 40);
}

type LogEntry = {
  action: "create" | "update" | "publish" | "unpublish" | "draft" | "delete" | "login" | "logout" | "restore";
  entity: string;
  docId?: string;
  docLabel?: string;
  fields?: string[];
  summary?: string;
};

export async function writeAuditLog(req: PayloadRequest, entry: LogEntry) {
  if (req.context?.skipAudit) return;
  try {
    const user = req.user as { id?: number | string; email?: string } | null;
    await req.payload.create({
      collection: "audit-logs",
      overrideAccess: true,
      req,
      context: { skipAudit: true, disableRevalidate: true },
      data: {
        action: entry.action,
        entity: entry.entity,
        docId: entry.docId,
        docLabel: entry.docLabel?.slice(0, 200),
        changedFields: entry.fields?.join(", "),
        summary: entry.summary,
        user: typeof user?.id === "number" ? user.id : undefined,
        userEmail: user?.email,
      },
    });
  } catch (err) {
    req.payload.logger.error({ msg: `Audit log write failed: ${(err as Error).message}` });
  }
}

/** Admin "Save draft" requests carry ?draft=true; "Unpublish" does not. */
export const isDraftSave = (req: PayloadRequest) => String(req.query?.draft) === "true";

const labelOf = (doc: Record<string, unknown>) => String(doc.title ?? doc.name ?? doc.from ?? doc.email ?? doc.filename ?? doc.id ?? "");

export const auditAfterChange =
  (entity: string): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, operation, req }) => {
    if (!req.user) return doc;
    const status = (doc as { _status?: string })._status;
    const prevStatus = (previousDoc as { _status?: string } | undefined)?._status;
    let action: LogEntry["action"];
    if (!status) action = operation === "create" ? "create" : "update";
    else if (status === "published") action = "publish";
    else if (prevStatus === "published" && !isDraftSave(req)) action = "unpublish";
    else action = "draft";
    await writeAuditLog(req, {
      action,
      entity,
      docId: String(doc.id),
      docLabel: labelOf(doc),
      fields: changedFields(doc, previousDoc),
    });
    return doc;
  };

export const auditAfterDelete =
  (entity: string): CollectionAfterDeleteHook =>
  async ({ doc, req }) => {
    if (!req.user) return doc;
    await writeAuditLog(req, { action: "delete", entity, docId: String(doc.id), docLabel: labelOf(doc) });
    return doc;
  };

export const auditGlobalChange =
  (entity: string): GlobalAfterChangeHook =>
  async ({ doc, previousDoc, req }) => {
    if (!req.user) return doc;
    await writeAuditLog(req, { action: "update", entity, docLabel: entity, fields: changedFields(doc, previousDoc) });
    return doc;
  };
