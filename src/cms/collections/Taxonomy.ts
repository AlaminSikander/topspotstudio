import type { CollectionConfig } from "payload";
import { adminOnly, anyone, staffOnly } from "../access";
import { linkGroup } from "../fields/link";
import { auditAfterChange, auditAfterDelete } from "../hooks/audit";
import { revalidateSite } from "../hooks/revalidate";

const afterChange = (entity: string) => [
  auditAfterChange(entity),
  async ({ doc, req }: Parameters<ReturnType<typeof auditAfterChange>>[0]) => {
    await revalidateSite(req, `${entity} changed`);
    return doc;
  },
];

export const Authors: CollectionConfig = {
  slug: "authors",
  labels: { singular: "Author", plural: "Authors" },
  admin: { group: "Blog settings", useAsTitle: "name", defaultColumns: ["name", "role"] },
  access: { read: anyone, create: staffOnly, update: staffOnly, delete: adminOnly },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "bio", type: "textarea", required: true },
  ],
  hooks: { afterChange: afterChange("authors"), afterDelete: [auditAfterDelete("authors")] },
};

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Category", plural: "Categories" },
  admin: { group: "Blog settings", useAsTitle: "name", defaultColumns: ["name", "slug"] },
  access: { read: anyone, create: staffOnly, update: staffOnly, delete: adminOnly },
  fields: [
    { name: "name", type: "text", required: true, unique: true },
    { name: "slug", type: "text", required: true, unique: true },
    {
      name: "commercialLink",
      type: "group",
      label: "Related service link (shown after articles in this category)",
      fields: [{ name: "label", type: "text", required: true }, ...linkGroup("link", "Destination").fields],
    },
  ],
  hooks: { afterChange: afterChange("categories"), afterDelete: [auditAfterDelete("categories")] },
};
