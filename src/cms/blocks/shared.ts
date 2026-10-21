import type { Field, SelectField, TextField } from "payload";
import { ICONS, TONES, VISUALS } from "../lib/options";

export const iconField = (name = "icon", label = "Icon"): SelectField => ({
  name,
  type: "select",
  label,
  options: ICONS.map((i) => ({ label: i, value: i })),
});

export const visualField = (name = "visual", label = "Diagram"): SelectField => ({
  name,
  type: "select",
  label,
  options: Object.entries(VISUALS).map(([value, label]) => ({ label, value })),
});

export const toneField = (defaultValue = "base"): SelectField => ({
  name: "tone",
  type: "select",
  label: "Background",
  defaultValue,
  options: [...TONES],
});

/** Top margin above a content block; "auto" picks the site's usual spacing for that block. */
export const spacingField: SelectField = {
  name: "spacing",
  type: "select",
  label: "Space above",
  defaultValue: "auto",
  options: [
    { label: "Automatic", value: "auto" },
    { label: "None", value: "0" },
    { label: "XS (16px)", value: "4" },
    { label: "S (20px)", value: "5" },
    { label: "S+ (24px)", value: "6" },
    { label: "M- (28px)", value: "7" },
    { label: "M (32px)", value: "8" },
    { label: "L (40px)", value: "10" },
    { label: "XL (48px)", value: "12" },
    { label: "XXL (56px)", value: "14" },
    { label: "XXXL (64px)", value: "16" },
  ],
  admin: { position: "sidebar" },
};

export const anchorIdField = (required = true): TextField => ({
  name: "anchorId",
  type: "text",
  label: "Section ID (anchor)",
  required,
  validate: (v: unknown) =>
    !v ? (required ? "Required" : true) : /^[a-z][a-z0-9-]*$/.test(String(v)) || "Lower-case letters, numbers and hyphens only (e.g. services).",
  admin: { description: "Used for #anchor links. Changing it can break existing links to this section." },
});

export const textItems = (name: string, label: string, { textarea = false }: { textarea?: boolean } = {}): Field => ({
  name,
  type: "array",
  label,
  fields: [textarea ? { name: "text", type: "textarea", required: true } : { name: "text", type: "text", required: true }],
});
