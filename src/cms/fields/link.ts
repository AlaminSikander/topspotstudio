import type { Field, GroupField } from "payload";
import { isSafeHref } from "../lib/paths";
import { TRACKED_EVENTS } from "../lib/options";

const validateHref = (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
  if (siblingData?.linkType === "internal") return true;
  if (!value) return "Enter a URL, e.g. /contact/, #section-id or https://example.com";
  return isSafeHref(String(value)) || "Use /path/, #anchor, https://, mailto: or tel: (javascript: and // URLs are not allowed)";
};

/** Fields for a single link: choose an existing page/post (kept in sync if its URL changes) or type a URL. */
export const linkFields = ({ required = true }: { required?: boolean } = {}): Field[] => [
  {
    type: "row",
    fields: [
      {
        name: "linkType",
        type: "radio",
        label: "Link to",
        defaultValue: "custom",
        options: [
          { label: "Page or post", value: "internal" },
          { label: "URL or #anchor", value: "custom" },
        ],
        admin: { layout: "horizontal", width: "50%" },
      },
      {
        name: "newTab",
        type: "checkbox",
        label: "Open in new tab",
        admin: { width: "50%", style: { alignSelf: "flex-end" } },
      },
    ],
  },
  {
    name: "doc",
    type: "relationship",
    label: "Destination page",
    relationTo: ["pages", "posts"],
    required,
    admin: { condition: (_, s) => s?.linkType === "internal" },
  },
  {
    name: "url",
    type: "text",
    label: "URL",
    required,
    validate: required
      ? validateHref
      : (v: unknown, o: { siblingData: Record<string, unknown> }) => (v ? validateHref(v, o) : true),
    admin: {
      condition: (_, s) => s?.linkType !== "internal",
      description: "Internal: /path/ with trailing slash. Same page: #section-id. External: https://…",
    },
  },
];

export const linkGroup = (name: string, label: string, opts: { required?: boolean } = {}): GroupField => ({
  name,
  type: "group",
  label,
  fields: linkFields(opts),
});

/** Button / call-to-action: label + link + optional analytics event. */
export const ctaGroup = (name: string, label: string, { required = false }: { required?: boolean } = {}): GroupField => ({
  name,
  type: "group",
  label,
  admin: { hideGutter: true },
  fields: [
    {
      name: "label",
      type: "text",
      label: "Button text",
      required,
    },
    ...linkFields({ required: false }),
    {
      name: "event",
      type: "select",
      label: "Analytics event (optional)",
      options: TRACKED_EVENTS.map((e) => ({ label: e, value: e })),
      admin: { description: "Links to /free-seo-audit/ send free_audit_cta_click automatically." },
    },
  ],
});
