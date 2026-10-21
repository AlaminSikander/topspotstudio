import type { Field, GlobalConfig } from "payload";
import { adminField, adminOnly, staffOnly } from "../access";
import { ctaGroup, linkGroup } from "../fields/link";
import { auditGlobalChange } from "../hooks/audit";
import { revalidateSite } from "../hooks/revalidate";
import { ICONS } from "../lib/options";

const revalidateGlobal = (slug: string) => [
  auditGlobalChange(slug),
  async ({ doc, req }: Parameters<ReturnType<typeof auditGlobalChange>>[0]) => {
    await revalidateSite(req, `global ${slug}`);
    return doc;
  },
];

const visibility: Field = {
  name: "visibility",
  type: "select",
  defaultValue: "always",
  options: [
    { label: "Always shown", value: "always" },
    { label: "Only when the blog is enabled", value: "blogEnabled" },
    { label: "Hidden", value: "hidden" },
  ],
};

const navLink = (extra: Field[] = []): Field[] => [
  { name: "label", type: "text", required: true },
  ...linkGroup("link", "Destination").fields,
  ...extra,
  visibility,
];

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: { group: "Settings", description: "Global defaults used across the website, metadata and structured data." },
  access: { read: staffOnly, update: adminOnly },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "General",
          fields: [
            { name: "siteUrlInfo", type: "ui", admin: { components: { Field: "@/cms/admin/HelpText#SiteUrlInfo" } } },
            { type: "row", fields: [{ name: "siteName", type: "text", required: true, defaultValue: "Top Spot Studio" }, { name: "tagline", type: "text", required: true }] },
            { name: "locationStatement", type: "textarea", required: true, admin: { description: "Approved wording only. Top Spot Studio is Bangladesh-based and works remotely; do not add a New Zealand office or address." } },
            { name: "contactEmail", type: "email", label: "Public contact email", admin: { description: "Shown on the Contact page and in ContactPoint schema. Leave empty until the official inbox is confirmed." } },
            { name: "breadcrumbHomeLabel", type: "text", defaultValue: "Home" },
          ],
        },
        {
          label: "Default SEO",
          fields: [
            { name: "defaultTitle", type: "text", label: "Fallback page title" },
            { name: "defaultDescription", type: "textarea", label: "Fallback meta description" },
            { name: "defaultOgImage", type: "upload", relationTo: "media", label: "Fallback social image", admin: { description: "Optional. Otherwise each page gets the generated branded image." } },
          ],
        },
        {
          label: "Organisation schema",
          fields: [
            { name: "orgDescription", type: "textarea", required: true },
            { name: "logoPath", type: "text", defaultValue: "/brand/top-spot-studio-logo.png", access: { update: adminField } },
            {
              name: "addressCountry",
              type: "select",
              defaultValue: "BD",
              options: [{ label: "Bangladesh (BD)", value: "BD" }],
              admin: { description: "Only the verified business country is offered." },
            },
            { name: "areaServed", type: "array", fields: [{ name: "country", type: "text", required: true }] },
            { name: "founders", type: "array", fields: [{ type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "role", type: "text", required: true }] }] },
            { name: "sameAs", type: "array", label: "Official social profiles (sameAs)", fields: [{ name: "url", type: "text", required: true, validate: (v: unknown) => /^https:\/\//.test(String(v)) || "Use an https:// URL" }] },
          ],
        },
        {
          label: "Shared proof",
          description: "Figures shown in the “Experience & proof” sections. Only documented, approved numbers.",
          fields: [
            { name: "proofMetrics", type: "array", fields: [{ type: "row", fields: [{ name: "value", type: "text", required: true }, { name: "label", type: "text", required: true }] }, { name: "context", type: "text" }] },
            { name: "proofComparisonTitle", type: "text" },
            {
              name: "proofComparison",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true },
                { type: "row", fields: [{ name: "before", type: "number", required: true }, { name: "after", type: "number", required: true }] },
                { type: "row", fields: [{ name: "beforeLabel", type: "text", required: true }, { name: "afterLabel", type: "text", required: true }, { name: "change", type: "text", required: true }] },
              ],
            },
            { name: "proofComparisonCaption", type: "textarea" },
          ],
        },
        {
          label: "404 page",
          fields: [
            { name: "notFoundTitle", type: "text", defaultValue: "This page isn't here" },
            { name: "notFoundLead", type: "textarea" },
            { name: "notFoundLinks", type: "array", fields: [{ name: "label", type: "text", required: true }, ...linkGroup("link", "Destination").fields] },
          ],
        },
      ],
    },
  ],
  hooks: { afterChange: revalidateGlobal("site-settings") },
};

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  admin: { group: "Settings", description: "Main menu (desktop and mobile) and the header button." },
  access: { read: staffOnly, update: staffOnly },
  fields: [
    {
      name: "items",
      type: "array",
      label: "Menu items",
      fields: [
        { type: "row", fields: [{ name: "label", type: "text", required: true }, { name: "type", type: "select", defaultValue: "link", options: [{ label: "Link", value: "link" }, { label: "Dropdown", value: "dropdown" }] }] },
        { type: "group", name: "link", admin: { condition: (_, s) => s?.type !== "dropdown" }, fields: linkGroup("link", "Destination", { required: false }).fields },
        {
          name: "children",
          type: "array",
          label: "Dropdown links",
          admin: { condition: (_, s) => s?.type === "dropdown" },
          fields: navLink([
            { type: "row", fields: [{ name: "icon", type: "select", options: ICONS.map((i) => ({ label: i, value: i })) }, { name: "note", type: "text", label: "Short description" }] },
          ]),
        },
        visibility,
      ],
    },
    ctaGroup("cta", "Header button"),
  ],
  hooks: { afterChange: revalidateGlobal("navigation") },
};

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: { group: "Settings" },
  access: { read: staffOnly, update: staffOnly },
  fields: [
    { type: "row", fields: [{ name: "headline", type: "text", required: true }, { name: "headlineHighlight", type: "text", label: "Gradient words" }] },
    { type: "row", fields: [ctaGroup("primaryCta", "Primary button"), ctaGroup("secondaryCta", "Secondary button")] },
    { name: "description", type: "textarea", required: true },
    { name: "showLocation", type: "checkbox", defaultValue: true, label: "Show the location statement (Site settings)" },
    { name: "columns", type: "array", label: "Link columns", maxRows: 4, fields: [{ name: "title", type: "text", required: true }, { name: "links", type: "array", fields: navLink() }] },
    { name: "copyright", type: "text", label: "Copyright text", admin: { description: "Shown after “© <year> <site name>.”" } },
    { name: "bottomLinks", type: "array", label: "Bottom links", fields: navLink() },
    { name: "socialLinks", type: "array", label: "Social links (optional)", fields: [{ name: "label", type: "text", required: true }, { name: "url", type: "text", required: true, validate: (v: unknown) => /^https:\/\//.test(String(v)) || "Use an https:// URL" }] },
    { name: "watermark", type: "text", defaultValue: "TOP SPOT STUDIO" },
  ],
  hooks: { afterChange: revalidateGlobal("footer") },
};
