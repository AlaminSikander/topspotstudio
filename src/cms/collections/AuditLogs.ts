import type { CollectionConfig } from "payload";
import { adminOnly, nobody } from "../access";

/** Append-only record of administrative changes. Written by hooks with overrideAccess; nobody can edit or delete entries via the API. */
export const AuditLogs: CollectionConfig = {
  slug: "audit-logs",
  labels: { singular: "Audit log entry", plural: "Audit log" },
  admin: {
    group: "Settings",
    useAsTitle: "summary",
    defaultColumns: ["createdAt", "action", "entity", "docLabel", "userEmail", "changedFields"],
    description: "Who changed what and when. Entries cannot be edited or deleted.",
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== "admin",
    pagination: { defaultLimit: 50 },
  },
  access: { read: adminOnly, create: nobody, update: nobody, delete: nobody },
  defaultSort: "-createdAt",
  fields: [
    {
      name: "action",
      type: "select",
      required: true,
      options: ["create", "update", "publish", "unpublish", "draft", "delete", "restore", "login", "logout"].map((v) => ({ label: v, value: v })),
    },
    { name: "entity", type: "text", required: true, label: "Collection / global" },
    { name: "docId", type: "text" },
    { name: "docLabel", type: "text", label: "Item" },
    { name: "changedFields", type: "text" },
    { name: "summary", type: "text" },
    { name: "user", type: "relationship", relationTo: "users" },
    { name: "userEmail", type: "text" },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        data.summary = data.summary || `${data.action} ${data.entity}${data.docLabel ? `: ${data.docLabel}` : ""}`;
        return data;
      },
    ],
  },
};
