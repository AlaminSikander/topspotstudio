import { APIError, type CollectionConfig } from "payload";
import { adminOnly, publishedOrStaff, staffOnly } from "../access";
import { articleEditor, richText } from "../fields/richText";
import { ctaGroup } from "../fields/link";
import { auditStampFields, seoGroup } from "../fields/seo";
import { auditAfterChange, auditAfterDelete } from "../hooks/audit";
import { affectsPublicSite, revalidateSite } from "../hooks/revalidate";
import { enforcePublishing, stampUser } from "../hooks/workflow";
import { isValidSlug, postPath, slugify } from "../lib/paths";
import { previewUrl } from "../lib/preview";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Blog post", plural: "Blog posts" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "category", "author", "_status", "publishedAt", "updatedAt"],
    listSearchableFields: ["title", "slug", "excerpt"],
    description: "Only published posts are visible on the website, in the blog listing and in the sitemap.",
    preview: (doc) => previewUrl(postPath(String(doc?.slug ?? ""))),
  },
  defaultPopulate: { title: true, slug: true, excerpt: true, heroImage: true, category: true, author: true, publishedAt: true, displayUpdatedAt: true },
  versions: { drafts: { schedulePublish: false }, maxPerDoc: 50 },
  access: {
    read: publishedOrStaff,
    readVersions: staffOnly,
    create: staffOnly,
    update: staffOnly,
    delete: adminOnly,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Article",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "excerpt", type: "textarea", required: true, maxLength: 320, admin: { description: "Shown under the H1 and on blog cards." } },
            { name: "heroImage", type: "upload", relationTo: "media", label: "Featured image" },
            richText("content", articleEditor, { required: true, label: "Article body" }),
            {
              name: "cta",
              type: "group",
              label: "Call to action after the article",
              fields: [
                { name: "title", type: "text" },
                { name: "body", type: "textarea" },
                ctaGroup("button", "Button"),
              ],
            },
          ],
        },
        { label: "SEO", fields: [seoGroup({ showH1: true })] },
        {
          label: "Structured data",
          fields: [
            {
              name: "structuredData",
              type: "group",
              label: "Structured data",
              fields: [
                { name: "preview", type: "ui", admin: { components: { Field: "@/cms/admin/StructuredDataPreview#StructuredDataPreview" } } },
                {
                  name: "articleType",
                  type: "select",
                  defaultValue: "BlogPosting",
                  options: [
                    { label: "BlogPosting", value: "BlogPosting" },
                    { label: "Article", value: "Article" },
                    { label: "None", value: "none" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "The URL is /blog/<slug>/. Changing the slug of a published post creates a redirect automatically." },
    },
    { name: "category", type: "relationship", relationTo: "categories", required: true, admin: { position: "sidebar" } },
    { name: "author", type: "relationship", relationTo: "authors", required: true, admin: { position: "sidebar" } },
    { name: "publishedAt", type: "date", label: "Publication date", admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } } },
    { name: "displayUpdatedAt", type: "date", label: "Show as updated on", admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } } },
    {
      name: "relatedPosts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      maxRows: 3,
      filterOptions: ({ id }) => ({ id: { not_equals: id } }),
      admin: { position: "sidebar", description: "Leave empty to show other posts in the same category." },
    },
    ...auditStampFields,
  ],
  endpoints: [
    {
      path: "/:id/structured-data",
      method: "get",
      handler: async (req) => {
        if (!req.user) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const { buildPostJsonLd } = await import("../../lib/cms/structured-data");
        const doc = await req.payload.findByID({ collection: "posts", id: req.routeParams?.id as string, draft: true, depth: 2, overrideAccess: false, req });
        return Response.json(await buildPostJsonLd(doc));
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) data.slug = slugify(String(data.title));
        if (data?.slug) data.slug = String(data.slug).trim().toLowerCase();
        return data;
      },
    ],
    beforeChange: [
      stampUser,
      enforcePublishing,
      ({ data }) => {
        if (data.slug && !isValidSlug(data.slug)) throw new APIError("Slug must be lower-case words separated by hyphens.", 400, undefined, true);
        if (data._status === "published" && !data.publishedAt) data.publishedAt = new Date().toISOString();
        return data;
      },
    ],
    afterChange: [
      auditAfterChange("posts"),
      async ({ doc, previousDoc, req }) => {
        if (previousDoc?.slug && previousDoc.slug !== doc.slug && previousDoc._status === "published" && doc._status === "published" && !req.context?.skipAutoRedirect) {
          const from = postPath(previousDoc.slug);
          const existing = await req.payload.find({ collection: "redirects", where: { from: { equals: from } }, limit: 1, overrideAccess: true, req });
          if (!existing.totalDocs) {
            await req.payload.create({
              collection: "redirects",
              req,
              overrideAccess: true,
              data: {
                from,
                to: { linkType: "internal", doc: { relationTo: "posts", value: doc.id } },
                statusCode: "308",
                enabled: true,
                reason: `Automatic: post slug changed from ${previousDoc.slug} to ${doc.slug}`,
              },
            });
          }
        }
        if (affectsPublicSite(doc, previousDoc)) await revalidateSite(req, `post ${doc.slug}`);
        return doc;
      },
    ],
    afterDelete: [
      auditAfterDelete("posts"),
      async ({ doc, req }) => {
        await revalidateSite(req, `post deleted ${doc.slug}`);
        return doc;
      },
    ],
  },
};
