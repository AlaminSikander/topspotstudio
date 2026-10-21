import { APIError, type CollectionConfig, type PayloadRequest } from "payload";
import { adminField, isAdmin, isStaff } from "../access";
import { auditAfterChange, auditAfterDelete, writeAuditLog } from "../hooks/audit";

export const MIN_PASSWORD_LENGTH = 12;

const countActiveAdmins = async (req: PayloadRequest, excludeId?: number | string) => {
  const { totalDocs } = await req.payload.count({
    collection: "users",
    overrideAccess: true,
    req,
    where: {
      and: [{ role: { equals: "admin" } }, { active: { not_equals: false } }, ...(excludeId ? [{ id: { not_equals: excludeId } }] : [])],
    },
  });
  return totalDocs;
};

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "User", plural: "Users & permissions" },
  admin: {
    group: "Settings",
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role", "active", "canPublish", "updatedAt"],
    description: "Only people listed here can sign in. There is no public registration.",
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== "admin",
  },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    useSessions: true,
    cookies: {
      secure: process.env.NODE_ENV === "production" && !process.env.CMS_ALLOW_INSECURE_COOKIES,
      sameSite: "Lax",
    },
    forgotPassword: { expiration: 60 * 60 * 1000 },
  },
  access: {
    admin: ({ req }) => isStaff(req),
    create: ({ req }) => isAdmin(req),
    read: ({ req }) => (isAdmin(req) ? true : req.user ? { id: { equals: req.user.id } } : false),
    update: ({ req }) => (isAdmin(req) ? true : req.user ? { id: { equals: req.user.id } } : false),
    delete: ({ req }) => isAdmin(req),
    unlock: ({ req }) => isAdmin(req),
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin — full access, users, settings, tracking codes", value: "admin" },
        { label: "Editor — pages, blog, media, SEO, links and redirects", value: "editor" },
      ],
      access: { create: adminField, update: adminField },
      saveToJWT: true,
    },
    {
      name: "canPublish",
      type: "checkbox",
      label: "Can publish and unpublish",
      defaultValue: true,
      access: { create: adminField, update: adminField },
      admin: { description: "Untick to limit an editor to saving drafts." },
      saveToJWT: true,
    },
    {
      name: "active",
      type: "checkbox",
      label: "Account active",
      defaultValue: true,
      access: { create: adminField, update: adminField },
      admin: { description: "Inactive accounts cannot sign in." },
      saveToJWT: true,
    },
    { name: "lastLoginAt", type: "date", admin: { readOnly: true, position: "sidebar" } },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.password !== undefined && typeof data.password === "string" && data.password.length < MIN_PASSWORD_LENGTH) {
          throw new APIError(`Passwords must be at least ${MIN_PASSWORD_LENGTH} characters.`, 400, undefined, true);
        }
        if (data?.email) data.email = String(data.email).trim().toLowerCase();
        return data;
      },
    ],
    beforeChange: [
      async ({ data, req, originalDoc, operation }) => {
        if (operation !== "update" || !originalDoc) return data;
        const demoting = originalDoc.role === "admin" && (data.role === "editor" || data.active === false);
        if (demoting && (await countActiveAdmins(req, originalDoc.id)) === 0) {
          throw new APIError("At least one active admin account is required.", 400, undefined, true);
        }
        return data;
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        if (req.user && String(req.user.id) === String(id)) throw new APIError("You cannot delete your own account.", 400, undefined, true);
        const target = await req.payload.findByID({ collection: "users", id, overrideAccess: true, req, depth: 0 });
        if (target?.role === "admin" && (await countActiveAdmins(req, id)) === 0) {
          throw new APIError("At least one active admin account is required.", 400, undefined, true);
        }
      },
    ],
    beforeLogin: [
      ({ user }) => {
        if ((user as { active?: boolean }).active === false) throw new APIError("This account is inactive.", 401, undefined, true);
        return user;
      },
    ],
    afterLogin: [
      async ({ req, user }) => {
        await req.payload.update({
          collection: "users",
          id: user.id,
          data: { lastLoginAt: new Date().toISOString() },
          overrideAccess: true,
          req,
          context: { skipAudit: true, disableRevalidate: true },
        });
        await writeAuditLog({ ...req, user } as typeof req, { action: "login", entity: "users", docId: String(user.id), docLabel: user.email });
      },
    ],
    afterLogout: [
      async ({ req }) => {
        if (req.user) await writeAuditLog(req, { action: "logout", entity: "users", docId: String(req.user.id), docLabel: (req.user as { email?: string }).email });
      },
    ],
    afterChange: [
      async (args) => {
        if (args.context?.skipAudit) return args.doc;
        return auditAfterChange("users")(args);
      },
    ],
    afterDelete: [auditAfterDelete("users")],
  },
};
