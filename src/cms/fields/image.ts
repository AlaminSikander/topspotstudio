import type { GroupField } from "payload";
import { SITE_IMAGES } from "../lib/options";

/** An image chosen from the built-in site photography or from the Media library. */
export const imageGroup = (name = "image", label = "Image", { ratio = false }: { ratio?: boolean } = {}): GroupField => ({
  name,
  type: "group",
  label,
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "source",
          type: "select",
          defaultValue: "site",
          options: [
            { label: "Built-in site photo", value: "site" },
            { label: "Media library", value: "library" },
          ],
          admin: { width: "34%" },
        },
        {
          name: "siteImage",
          type: "select",
          label: "Site photo",
          options: Object.entries(SITE_IMAGES).map(([value, label]) => ({ label, value })),
          admin: { width: "66%", condition: (_, s) => s?.source !== "library" },
        },
        {
          name: "media",
          type: "upload",
          relationTo: "media",
          label: "Library image",
          admin: { width: "66%", condition: (_, s) => s?.source === "library" },
        },
      ],
    },
    {
      name: "alt",
      type: "text",
      label: "Alt text",
      admin: {
        description: "Describe the image for screen readers and search engines. For library images, leave empty to use the alt text saved on the image.",
      },
      validate: (v: unknown, { siblingData }: { siblingData: Record<string, unknown> }) =>
        siblingData?.source === "library" || (typeof v === "string" && v.trim().length > 0) || "Alt text is required for site photos.",
    },
    {
      type: "row",
      fields: [
        ...(ratio
          ? [
              {
                name: "ratio",
                type: "select" as const,
                defaultValue: "4/3",
                options: ["4/3", "3/2", "16/10", "1/1", "4/5", "3/4"].map((v) => ({ label: v, value: v })),
                admin: { width: "33%" },
              },
            ]
          : []),
        {
          name: "position",
          type: "text",
          label: "Focal position",
          admin: { width: "33%", placeholder: "center", description: 'CSS object-position, e.g. "50% 40%".' },
        },
      ],
    },
  ],
});
