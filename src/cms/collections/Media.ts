import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CollectionConfig } from "payload";
import { adminOnly, anyone, isStaff, staffOnly } from "../access";
import { auditAfterChange, auditAfterDelete } from "../hooks/audit";
import { revalidateSite } from "../hooks/revalidate";
import { stampUser } from "../hooks/workflow";
import { auditStampFields } from "../fields/seo";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image", plural: "Media library" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["filename", "title", "alt", "width", "height", "updatedAt"],
    listSearchableFields: ["title", "alt", "filename", "caption"],
    description: "Images used on pages and in blog posts. JPEG, PNG, WebP, AVIF or GIF up to 8 MB. SVG uploads are disabled for security.",
  },
  access: {
    read: anyone,
    create: staffOnly,
    update: staffOnly,
    delete: adminOnly,
  },
  upload: {
    staticDir: path.resolve(dirname, "../../../media"),
    mimeTypes: ALLOWED_IMAGE_TYPES,
    adminThumbnail: "thumbnail",
    focalPoint: true,
    imageSizes: [
      { name: "thumbnail", width: 400, withoutEnlargement: true },
      { name: "card", width: 800, withoutEnlargement: true },
      { name: "hero", width: 1600, withoutEnlargement: true },
    ],
    formatOptions: { format: "webp", options: { quality: 82 } },
  },
  fields: [
    { name: "title", type: "text", label: "Descriptive title", admin: { description: "For finding the image in the library." } },
    {
      name: "alt",
      type: "text",
      required: true,
      maxLength: 200,
      label: "Alt text",
      admin: { description: "What the image shows, for screen readers and search engines. Use an empty-looking description only for decoration." },
    },
    { name: "caption", type: "textarea" },
    {
      type: "row",
      fields: [
        { name: "credit", type: "text", label: "Source / credit", admin: { width: "50%" } },
        { name: "licence", type: "text", label: "Licence / permission", admin: { width: "50%", description: "e.g. Unsplash licence, client permission" } },
      ],
    },
    { name: "usage", type: "ui", admin: { components: { Field: "@/cms/admin/MediaUsage#MediaUsage" } } },
    ...auditStampFields,
  ],
  endpoints: [
    {
      path: "/:id/usage",
      method: "get",
      handler: async (req) => {
        if (!isStaff(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const { mediaUsage } = await import("../lib/media-usage");
        return Response.json(await mediaUsage(req.payload, String(req.routeParams?.id)));
      },
    },
  ],
  hooks: {
    // With trailingSlash enabled, generated file URLs end in "/" and would cost a 308 hop on every image request.
    afterRead: [
      ({ doc }) => {
        const strip = (u?: string | null) => (typeof u === "string" ? u.replace(/(\.[a-z0-9]{2,5})\/$/i, "$1") : u);
        doc.url = strip(doc.url);
        doc.thumbnailURL = strip(doc.thumbnailURL);
        for (const size of Object.values((doc.sizes ?? {}) as Record<string, { url?: string | null }>)) if (size) size.url = strip(size.url);
        return doc;
      },
    ],
    beforeChange: [stampUser],
    afterChange: [
      auditAfterChange("media"),
      async ({ doc, operation, req }) => {
        if (operation === "update") await revalidateSite(req, `media ${doc.id} replaced/updated`);
        return doc;
      },
    ],
    afterDelete: [auditAfterDelete("media")],
  },
};
