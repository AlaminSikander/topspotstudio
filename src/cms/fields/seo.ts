import type { Field, GroupField } from "payload";
import { DESCRIPTION_RANGE, TITLE_RANGE } from "../lib/seo-checks";

const validateCanonical = (value: unknown) => {
  if (!value) return true;
  const v = String(value);
  if (!/^https:\/\/[^\s]+$/.test(v)) return "Canonical must be an absolute https:// URL.";
  if (/\.vercel\.app/i.test(v)) return "Canonical must not point to a Vercel preview domain.";
  if (/localhost|127\.0\.0\.1/i.test(v)) return "Canonical must not point to localhost.";
  return true;
};

/** Per-document SEO controls. Output is generated in src/lib/cms/metadata.ts (Next.js metadata API). */
export const seoGroup = ({ showH1 = false }: { showH1?: boolean } = {}): GroupField => ({
  name: "seo",
  type: "group",
  label: "SEO",
  admin: { hideGutter: true },
  fields: [
    {
      name: "panel",
      type: "ui",
      admin: { components: { Field: "@/cms/admin/SeoPanel#SeoPanel" } },
    },
    {
      name: "metaTitle",
      type: "text",
      label: "SEO title (meta title)",
      maxLength: 120,
      admin: {
        description: `Shown as the page title in search results and browser tabs. Around ${TITLE_RANGE.min}–${TITLE_RANGE.max} characters usually displays in full, but search engines may rewrite or shorten it.`,
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "Meta description",
      maxLength: 320,
      admin: {
        description: `A short summary for search results. Around ${DESCRIPTION_RANGE.min}–${DESCRIPTION_RANGE.max} characters is a common guide; it is not guaranteed to be shown.`,
      },
    },
    {
      type: "row",
      fields: [
        { name: "primaryKeyword", type: "text", label: "Primary keyword", admin: { width: "50%" } },
        {
          name: "secondaryKeywords",
          type: "text",
          hasMany: true,
          label: "Secondary keywords",
          admin: { width: "50%", description: "Press Enter after each keyword." },
        },
      ],
    },
    ...(showH1
      ? [
          {
            name: "h1",
            type: "text",
            label: "H1 heading override",
            admin: { description: "Leave empty to use the post title as the H1." },
          } satisfies Field,
        ]
      : []),
    {
      type: "collapsible",
      label: "Indexing & canonical",
      admin: { initCollapsed: true },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "robotsIndex",
              type: "select",
              label: "Robots: index",
              defaultValue: "index",
              options: [
                { label: "index (allow in search results)", value: "index" },
                { label: "noindex (keep out of search results)", value: "noindex" },
              ],
              admin: { width: "50%" },
            },
            {
              name: "robotsFollow",
              type: "select",
              label: "Robots: follow",
              defaultValue: "follow",
              options: [
                { label: "follow", value: "follow" },
                { label: "nofollow", value: "nofollow" },
              ],
              admin: { width: "50%" },
            },
          ],
        },
        {
          name: "includeInSitemap",
          type: "checkbox",
          label: "Include in XML sitemap",
          defaultValue: true,
          admin: { description: "Noindex, draft and unpublished content is always excluded, whatever this setting says." },
        },
        {
          name: "canonicalUrl",
          type: "text",
          label: "Canonical URL override",
          validate: validateCanonical,
          admin: {
            description: "Leave empty for the normal self-referencing canonical on the preferred https domain. Only set this for syndicated or duplicate content.",
          },
        },
        {
          name: "appendBrand",
          type: "checkbox",
          label: "Append “| Top Spot Studio” to the SEO title",
          defaultValue: false,
          admin: { description: "Existing page titles already include the brand, so this is off by default." },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Social sharing (Open Graph & X/Twitter)",
      admin: { initCollapsed: true },
      fields: [
        { name: "ogTitle", type: "text", label: "Open Graph title", admin: { description: "Defaults to the SEO title." } },
        { name: "ogDescription", type: "textarea", label: "Open Graph description", admin: { description: "Defaults to the meta description." } },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
          label: "Open Graph image",
          admin: { description: "1200×630 recommended. Leave empty to use the generated branded image." },
        },
        {
          type: "row",
          fields: [
            { name: "ogEyebrow", type: "text", label: "Generated image eyebrow", admin: { width: "50%" } },
            { name: "ogHeadline", type: "text", label: "Generated image headline", admin: { width: "50%" } },
          ],
        },
        { name: "twitterTitle", type: "text", label: "X/Twitter title", admin: { description: "Defaults to the Open Graph title." } },
        { name: "twitterDescription", type: "textarea", label: "X/Twitter description" },
        { name: "twitterImage", type: "upload", relationTo: "media", label: "X/Twitter image" },
      ],
    },
  ],
});

/** Structured data inputs. JSON-LD itself is generated from these validated fields and the visible page content. */
export const pageSchemaGroup: GroupField = {
  name: "structuredData",
  type: "group",
  label: "Structured data",
  admin: { hideGutter: true },
  fields: [
    {
      name: "preview",
      type: "ui",
      admin: { components: { Field: "@/cms/admin/StructuredDataPreview#StructuredDataPreview" } },
    },
    {
      name: "pageType",
      type: "select",
      label: "Page schema type",
      defaultValue: "WebPage",
      options: [
        { label: "WebPage", value: "WebPage" },
        { label: "AboutPage", value: "AboutPage" },
        { label: "ContactPage", value: "ContactPage" },
        { label: "CollectionPage", value: "CollectionPage" },
        { label: "Article (case study)", value: "Article" },
        { label: "Blog (blog hub)", value: "Blog" },
      ],
    },
    { name: "breadcrumbs", type: "checkbox", label: "Output BreadcrumbList", defaultValue: true },
    { name: "faq", type: "checkbox", label: "Output FAQPage from FAQ sections", defaultValue: true },
    { name: "people", type: "checkbox", label: "Output Person entries from founder cards", defaultValue: false },
    { name: "itemList", type: "checkbox", label: "Output ItemList from case study cards", defaultValue: false },
    {
      name: "service",
      type: "group",
      label: "Service",
      fields: [
        { name: "enabled", type: "checkbox", label: "Output Service schema", defaultValue: false },
        {
          type: "row",
          fields: [
            { name: "name", type: "text", label: "Service name", admin: { width: "50%", condition: (_, s) => Boolean(s?.enabled) } },
            { name: "serviceType", type: "text", label: "Service type", admin: { width: "50%", condition: (_, s) => Boolean(s?.enabled) } },
          ],
        },
        {
          name: "description",
          type: "textarea",
          label: "Service description",
          admin: { condition: (_, s) => Boolean(s?.enabled), description: "Defaults to the meta description." },
        },
      ],
    },
  ],
};

export const auditStampFields: Field[] = [
  {
    name: "createdBy",
    type: "relationship",
    relationTo: "users",
    admin: { readOnly: true, position: "sidebar" },
  },
  {
    name: "updatedBy",
    type: "relationship",
    relationTo: "users",
    label: "Last updated by",
    admin: { readOnly: true, position: "sidebar" },
  },
];
