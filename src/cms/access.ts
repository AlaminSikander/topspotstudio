import type { Access, FieldAccess, PayloadRequest, Where } from "payload";

export type Role = "admin" | "editor";

type StaffUser = { collection?: string; role?: Role; active?: boolean | null; canPublish?: boolean | null; id: number | string };

const staffUser = (req: PayloadRequest): StaffUser | null => {
  const user = req.user as StaffUser | null | undefined;
  if (!user || user.collection !== "users" || user.active === false) return null;
  return user;
};

export const isStaff = (req: PayloadRequest) => Boolean(staffUser(req));
export const isAdmin = (req: PayloadRequest) => staffUser(req)?.role === "admin";
export const canPublish = (req: PayloadRequest) => {
  const u = staffUser(req);
  return Boolean(u && (u.role === "admin" || u.canPublish !== false));
};

export const anyone: Access = () => true;
export const nobody: Access = () => false;
export const staffOnly: Access = ({ req }) => isStaff(req);
export const adminOnly: Access = ({ req }) => isAdmin(req);

/** Anonymous visitors only ever see published documents; drafts are staff-only. */
export const publishedOrStaff: Access = ({ req }) => {
  if (isStaff(req)) return true;
  const where: Where = { _status: { equals: "published" } };
  return where;
};

export const adminField: FieldAccess = ({ req }) => isAdmin(req);
export const staffField: FieldAccess = ({ req }) => isStaff(req);
