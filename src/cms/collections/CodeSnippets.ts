import { APIError, type CollectionConfig } from "payload";
import { adminOnly } from "../access";
import { auditStampFields } from "../fields/seo";
import { auditAfterChange, auditAfterDelete } from "../hooks/audit";
import { revalidateSite } from "../hooks/revalidate";
import { stampUser } from "../hooks/workflow";
import { PAGE_TEMPLATES } from "../lib/options";
import { PROVIDER_RULES, validateSnippet, type SnippetInput } from "../lib/snippets";

export const CodeSnippets: CollectionConfig = {
  slug: "code-snippets",
  labels: { singular: "Tracking / verification code", plural: "Tracking & Verification Codes" },
  admin: {
    group: "SEO",
    useAsTitle: "name",
    defaultColumns: ["name", "provider", "placement", "scope", "enabled", "environments", "updatedAt"],
    description:
      "Admin only. Code pasted here runs on every targeted public page and can read page data and affect visitors. Only add code from a trusted provider. It is never run inside this admin area, and is not added to admin, preview or draft pages.",
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== "admin",
  },
  access: { read: adminOnly, create: adminOnly, update: adminOnly, delete: adminOnly },
  fields: [
    { name: "warning", type: "ui", admin: { components: { Field: "@/cms/admin/HelpText#SnippetWarning" } } },
    { name: "name", type: "text", required: true },
    {
      type: "row",
      fields: [
        {
          name: "provider",
          type: "select",
          required: true,
          defaultValue: "google-search-console",
          options: [...Object.entries(PROVIDER_RULES).map(([value, r]) => ({ label: r.label, value })), { label: "Custom snippet (trusted admins only)", value: "custom" }],
          admin: { width: "50%" },
        },
        {
          name: "codeType",
          type: "select",
          required: true,
          defaultValue: "meta",
          label: "Code type",
          options: [
            { label: "Verification meta tag", value: "meta" },
            { label: "Script", value: "script" },
            { label: "<noscript> fallback", value: "noscript" },
            { label: "Mixed", value: "mixed" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "code",
      type: "code",
      required: true,
      admin: {
        language: "html",
        description: "Paste the code exactly as supplied. Supported elements: <meta>, <link>, <script>, <noscript>. Inline event handlers and non-https URLs are rejected.",
      },
    },
    {
      name: "placement",
      type: "radio",
      required: true,
      defaultValue: "head",
      options: [
        { label: "Header — inside <head>", value: "head" },
        { label: "Body — immediately after the opening <body> tag", value: "bodyStart" },
        { label: "Footer — just before </body>", value: "bodyEnd" },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "scope",
          type: "select",
          required: true,
          defaultValue: "all",
          label: "Target",
          options: [
            { label: "All public pages", value: "all" },
            { label: "Selected pages", value: "pages" },
            { label: "Page templates", value: "templates" },
          ],
          admin: { width: "34%" },
        },
        {
          name: "pages",
          type: "relationship",
          relationTo: ["pages", "posts"],
          hasMany: true,
          admin: { width: "66%", condition: (_, s) => s?.scope === "pages" },
        },
        {
          name: "templates",
          type: "select",
          hasMany: true,
          options: [...PAGE_TEMPLATES, { label: "Blog post", value: "post" }],
          admin: { width: "66%", condition: (_, s) => s?.scope === "templates" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "environments",
          type: "select",
          hasMany: true,
          required: true,
          defaultValue: ["production"],
          options: [
            { label: "Production", value: "production" },
            { label: "Staging / preview", value: "staging" },
            { label: "Local development", value: "development" },
          ],
          admin: { width: "50%", description: "Based on NEXT_PUBLIC_SITE_ENV of the deployment." },
        },
        { name: "enabled", type: "checkbox", defaultValue: false, admin: { width: "50%", description: "New codes start disabled. Enable after testing locally." } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "requiresConsent", type: "checkbox", label: "Wait for visitor consent", admin: { width: "50%" } },
        {
          name: "consentCategory",
          type: "select",
          defaultValue: "analytics",
          options: [
            { label: "Analytics", value: "analytics" },
            { label: "Marketing", value: "marketing" },
            { label: "Functional", value: "functional" },
          ],
          admin: { width: "50%", condition: (_, s) => Boolean(s?.requiresConsent) },
        },
      ],
    },
    {
      name: "consentHelp",
      type: "ui",
      admin: { condition: (_, s) => Boolean(s?.requiresConsent), components: { Field: "@/cms/admin/HelpText#ConsentHelp" } },
    },
    { name: "notes", type: "textarea", label: "Internal notes" },
    ...auditStampFields,
  ],
  hooks: {
    beforeChange: [
      stampUser,
      ({ data, originalDoc }) => {
        const merged = { ...originalDoc, ...data } as SnippetInput & { scope: SnippetInput["scope"] };
        const errors = validateSnippet(merged);
        if (errors.length) throw new APIError(errors.join(" "), 400, undefined, true);
        return data;
      },
    ],
    afterChange: [
      auditAfterChange("code-snippets"),
      async ({ doc, req }) => {
        await revalidateSite(req, `code snippet ${doc.name}`);
        return doc;
      },
    ],
    afterDelete: [
      auditAfterDelete("code-snippets"),
      async ({ doc, req }) => {
        await revalidateSite(req, `code snippet deleted ${doc.name}`);
        return doc;
      },
    ],
  },
};
