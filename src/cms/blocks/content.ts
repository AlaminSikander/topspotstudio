import type { Block, Field } from "payload";
import { basicEditor, inlineEditor, richText } from "../fields/richText";
import { ctaGroup, linkGroup } from "../fields/link";
import { imageGroup } from "../fields/image";
import { iconField, spacingField, textItems } from "./shared";

const cardItemFields = (withCta = true): Field[] => [
  { type: "row", fields: [{ name: "title", type: "text", required: true, admin: { width: "70%" } }, { ...iconField(), admin: { width: "30%" } }] },
  richText("body", inlineEditor, { label: "Text" }),
  ...(withCta ? [ctaGroup("cta", "Link (optional)")] : []),
];

export const RichTextBlock: Block = {
  slug: "richText",
  interfaceName: "RichTextBlock",
  labels: { singular: "Text", plural: "Text" },
  fields: [
    {
      name: "style",
      type: "select",
      defaultValue: "default",
      options: [
        { label: "Normal", value: "default" },
        { label: "Large intro", value: "lead" },
        { label: "Large (light on dark)", value: "leadLight" },
        { label: "Article card", value: "proseCard" },
        { label: "Frosted note box", value: "glassBox" },
      ],
    },
    richText("content", basicEditor, { required: true }),
    spacingField,
  ],
};

export const SectionHeaderBlock: Block = {
  slug: "sectionHeader",
  interfaceName: "SectionHeaderBlock",
  labels: { singular: "Heading + intro", plural: "Headings" },
  fields: [
    { name: "anchorId", type: "text", label: "Heading ID (optional)" },
    { name: "eyebrow", type: "text" },
    { type: "row", fields: [{ name: "title", type: "text", required: true, label: "Heading (H2)", admin: { width: "60%" } }, { name: "highlight", type: "text", label: "Gradient words", admin: { width: "40%" } }] },
    richText("intro", basicEditor),
    spacingField,
  ],
};

export const FeatureListBlock: Block = {
  slug: "featureList",
  interfaceName: "FeatureListBlock",
  labels: { singular: "Feature list", plural: "Feature lists" },
  fields: [
    { name: "columns", type: "select", defaultValue: "2", options: ["2", "3"].map((v) => ({ label: `${v} columns`, value: v })) },
    { name: "items", type: "array", minRows: 1, fields: cardItemFields() },
    spacingField,
  ],
};

export const NumberedCardsBlock: Block = {
  slug: "numberedCards",
  interfaceName: "NumberedCardsBlock",
  labels: { singular: "Card grid", plural: "Card grids" },
  fields: [
    {
      type: "row",
      fields: [
        { name: "columns", type: "select", defaultValue: "3", options: ["2", "3", "4"].map((v) => ({ label: `${v} columns`, value: v })), admin: { width: "50%" } },
        { name: "numbered", type: "checkbox", defaultValue: true, label: "Show 01, 02… numbers", admin: { width: "50%" } },
      ],
    },
    { name: "items", type: "array", minRows: 1, fields: cardItemFields() },
    spacingField,
  ],
};

export const IconCardsBlock: Block = {
  slug: "iconCards",
  interfaceName: "IconCardsBlock",
  labels: { singular: "Icon cards", plural: "Icon cards" },
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { type: "row", fields: [{ name: "title", type: "text", required: true, admin: { width: "70%" } }, { ...iconField(), admin: { width: "30%" } }] },
        { name: "body", type: "textarea", required: true },
        ctaGroup("cta", "Link (optional)"),
      ],
    },
    spacingField,
  ],
};

export const ProcessStepsBlock: Block = {
  slug: "processSteps",
  interfaceName: "ProcessStepsBlock",
  labels: { singular: "Process steps", plural: "Process steps" },
  fields: [
    {
      name: "steps",
      type: "array",
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
    spacingField,
  ],
};

export const TierCardsBlock: Block = {
  slug: "tierCards",
  interfaceName: "TierCardsBlock",
  labels: { singular: "Pricing tiers", plural: "Pricing tiers" },
  fields: [
    { name: "heading", type: "text", label: "Heading (H3, optional)" },
    {
      name: "tiers",
      type: "array",
      minRows: 1,
      maxRows: 3,
      fields: [
        { type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "price", type: "text", required: true }, { name: "cadence", type: "text" }] },
        { name: "summary", type: "textarea", required: true },
        { name: "featured", type: "checkbox" },
      ],
    },
    { name: "note", type: "text", label: "Small print below the tiers" },
    spacingField,
  ],
};

export const CheckListBlock: Block = {
  slug: "checkList",
  interfaceName: "CheckListBlock",
  labels: { singular: "Checklist", plural: "Checklists" },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "variant",
          type: "select",
          defaultValue: "check",
          options: [
            { label: "Ticks (benefits)", value: "check" },
            { label: "Minus (gaps / problems)", value: "gap" },
          ],
          admin: { width: "50%" },
        },
        {
          name: "layout",
          type: "select",
          defaultValue: "default",
          options: [
            { label: "Simple list", value: "default" },
            { label: "Simple list, larger text", value: "large" },
            { label: "Two-column list in a card", value: "cardGrid" },
            { label: "List in a card", value: "card" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "text", type: "textarea", required: true },
        {
          type: "row",
          fields: [
            { name: "linkText", type: "text", label: "Words to link (optional)", admin: { width: "50%", description: "Must appear exactly in the text above." } },
            { ...linkGroup("link", "Link", { required: false }), admin: { width: "50%", condition: (_, s) => Boolean(s?.linkText) } },
          ],
        },
      ],
    },
    spacingField,
  ],
};

export const CalloutBlock: Block = {
  slug: "callout",
  interfaceName: "CalloutBlock",
  labels: { singular: "Callout note", plural: "Callout notes" },
  fields: [
    { name: "title", type: "text" },
    {
      name: "tone",
      type: "select",
      defaultValue: "teal",
      options: [
        { label: "Teal", value: "teal" },
        { label: "Neutral", value: "neutral" },
        { label: "On navy", value: "navy" },
      ],
    },
    richText("body", basicEditor, { required: true }),
    { name: "alignSelf", type: "checkbox", label: "Vertically centre in a column" },
    spacingField,
  ],
};

export const CardBlock: Block = {
  slug: "card",
  interfaceName: "CardBlock",
  labels: { singular: "Card", plural: "Cards" },
  fields: [
    {
      name: "variant",
      type: "select",
      defaultValue: "card",
      options: [
        { label: "White card", value: "card" },
        { label: "Soft gradient card", value: "soft" },
        { label: "Teal tint panel", value: "tint" },
        { label: "Deep navy panel", value: "deep" },
        { label: "Large white panel", value: "panel" },
      ],
    },
    { name: "title", type: "text", label: "Heading (H3)" },
    richText("body", basicEditor),
    { name: "bodyColumns", type: "checkbox", label: "Show text in two columns" },
    {
      name: "listLayout",
      type: "select",
      defaultValue: "stacked",
      options: [
        { label: "Stacked list", value: "stacked" },
        { label: "Three-column list", value: "grid3" },
        { label: "Bulleted list", value: "disc" },
      ],
    },
    {
      name: "iconRows",
      type: "array",
      label: "Icon rows (optional)",
      fields: [
        { type: "row", fields: [{ ...iconField(), admin: { width: "50%" } }, { name: "iconTone", type: "select", defaultValue: "teal", options: [{ label: "Teal", value: "teal" }, { label: "Coral", value: "coral" }], admin: { width: "50%" } }] },
        { name: "lead", type: "text", label: "Bold lead-in" },
        { name: "text", type: "textarea", required: true },
      ],
    },
    ctaGroup("link", "Link below the card text (optional)"),
    { name: "extra", type: "blocks", label: "Extra content inside the card", blocks: [TierCardsBlock, CalloutBlock] },
    spacingField,
  ],
};

export const KeywordTableBlock: Block = {
  slug: "keywordTable",
  interfaceName: "KeywordTableBlock",
  labels: { singular: "Keyword table", plural: "Keyword tables" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea" },
    {
      name: "rows",
      type: "array",
      minRows: 1,
      fields: [
        { type: "row", fields: [{ name: "keyword", type: "text", required: true }, { name: "position", type: "text", required: true }] },
      ],
    },
    spacingField,
  ],
};

export const GridBlock: Block = {
  slug: "grid",
  interfaceName: "GridBlock",
  labels: { singular: "Two-column grid", plural: "Grids" },
  fields: [
    { name: "columns", type: "select", defaultValue: "2", options: [{ label: "2 columns", value: "2" }] },
    { name: "items", type: "blocks", blocks: [CardBlock, CalloutBlock, KeywordTableBlock], minRows: 1 },
    spacingField,
  ],
};

export const MetricGridBlock: Block = {
  slug: "metricGrid",
  interfaceName: "MetricGridBlock",
  labels: { singular: "Statistics", plural: "Statistics" },
  fields: [
    {
      name: "metrics",
      type: "array",
      minRows: 1,
      admin: { description: "Only publish figures that are documented and approved." },
      fields: [
        { type: "row", fields: [{ name: "value", type: "text", required: true }, { name: "label", type: "text", required: true }] },
        { name: "context", type: "text" },
      ],
    },
    spacingField,
  ],
};

export const ImageCardsBlock: Block = {
  slug: "imageCards",
  interfaceName: "ImageCardsBlock",
  labels: { singular: "Image cards", plural: "Image cards" },
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        imageGroup("image", "Image"),
        { type: "row", fields: [{ name: "title", type: "text", required: true }, { name: "tag", type: "text", label: "Badge (optional)" }] },
        { name: "body", type: "textarea", required: true },
        ctaGroup("cta", "Link (optional)"),
      ],
    },
    spacingField,
  ],
};

export const ServiceCardsBlock: Block = {
  slug: "serviceCards",
  interfaceName: "ServiceCardsBlock",
  labels: { singular: "Service cards (homepage)", plural: "Service cards" },
  fields: [
    { name: "items", type: "array", minRows: 2, admin: { description: "The first service is shown as the large featured card." }, fields: cardItemFields() },
    textItems("chips", "Featured card tags"),
    spacingField,
  ],
};

export const ImageTilesBlock: Block = {
  slug: "imageTiles",
  interfaceName: "ImageTilesBlock",
  labels: { singular: "Image tiles", plural: "Image tiles" },
  fields: [
    { name: "tiles", type: "array", minRows: 1, fields: [{ name: "name", type: "text", required: true }, imageGroup("image", "Image")] },
    { name: "extraLabel", type: "text", label: "Final dashed tile text (optional)" },
    spacingField,
  ],
};

export const LinkPillsBlock: Block = {
  slug: "linkPills",
  interfaceName: "LinkPillsBlock",
  labels: { singular: "Link pills panel", plural: "Link pills panels" },
  fields: [
    { name: "title", type: "text", label: "Heading (H3)" },
    { name: "links", type: "array", minRows: 1, fields: [{ name: "label", type: "text", required: true }, linkGroup("link", "Link")] },
    spacingField,
  ],
};

export const PillsBlock: Block = {
  slug: "pills",
  interfaceName: "PillsBlock",
  labels: { singular: "Pills", plural: "Pills" },
  fields: [textItems("items", "Pills"), spacingField],
};

export const QuoteBlock: Block = {
  slug: "quote",
  interfaceName: "QuoteBlock",
  labels: { singular: "Quote panel", plural: "Quote panels" },
  fields: [
    {
      name: "variant",
      type: "select",
      defaultValue: "compact",
      options: [
        { label: "Compact (on navy)", value: "compact" },
        { label: "Feature (on navy)", value: "feature" },
      ],
    },
    { name: "title", type: "text", label: "Heading (feature variant)" },
    textItems("before", "Paragraphs before the quote", { textarea: true }),
    { name: "quote", type: "textarea", required: true },
    { name: "after", type: "textarea", label: "Paragraph after the quote" },
    { name: "caption", type: "text", label: "Attribution" },
    spacingField,
  ],
};

export const ButtonsBlock: Block = {
  slug: "buttons",
  interfaceName: "ButtonsBlock",
  labels: { singular: "Buttons", plural: "Buttons" },
  fields: [
    ctaGroup("primary", "Primary button"),
    ctaGroup("secondary", "Secondary button"),
    { name: "location", type: "text", label: "Analytics location", admin: { description: "Sent as cta_location with tracked clicks." } },
    spacingField,
  ],
};

export const TextLinkBlock: Block = {
  slug: "textLink",
  interfaceName: "TextLinkBlock",
  labels: { singular: "Text link", plural: "Text links" },
  fields: [
    { name: "label", type: "text", required: true, label: "Link text" },
    linkGroup("link", "Destination"),
    {
      name: "style",
      type: "select",
      defaultValue: "text",
      options: [
        { label: "Underlined text link", value: "text" },
        { label: "Arrow link", value: "arrow" },
        { label: "Arrow link (on navy)", value: "arrowLight" },
      ],
    },
    spacingField,
  ],
};

export const FlowStepsBlock: Block = {
  slug: "flowSteps",
  interfaceName: "FlowStepsBlock",
  labels: { singular: "Flow diagram", plural: "Flow diagrams" },
  fields: [{ name: "title", type: "text", required: true }, textItems("steps", "Steps"), { name: "body", type: "textarea" }, spacingField],
};

export const LinkListBlock: Block = {
  slug: "linkList",
  interfaceName: "LinkListBlock",
  labels: { singular: "Link list panel", plural: "Link list panels" },
  fields: [
    { name: "label", type: "text", label: "Small heading" },
    { name: "links", type: "array", minRows: 1, fields: [{ name: "label", type: "text", required: true }, linkGroup("link", "Link")] },
    spacingField,
  ],
};

export const FounderCardsBlock: Block = {
  slug: "founderCards",
  interfaceName: "FounderCardsBlock",
  labels: { singular: "Founder cards", plural: "Founder cards" },
  fields: [
    {
      name: "founders",
      type: "array",
      minRows: 1,
      fields: [
        { type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "role", type: "text", required: true }] },
        { name: "bio", type: "textarea", required: true },
        { name: "photo", type: "upload", relationTo: "media", admin: { description: "Optional approved headshot." } },
        textItems("strengths", "Core strengths"),
        textItems("responsibilities", "At Top Spot Studio"),
      ],
    },
    spacingField,
  ],
};

export const PersonCardsBlock: Block = {
  slug: "personCards",
  interfaceName: "PersonCardsBlock",
  labels: { singular: "People list", plural: "People lists" },
  fields: [
    { name: "people", type: "array", minRows: 1, fields: [{ type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "role", type: "text", required: true }] }, { name: "note", type: "text" }] },
    spacingField,
  ],
};

export const NumberedGridBlock: Block = {
  slug: "numberedGrid",
  interfaceName: "NumberedGridBlock",
  labels: { singular: "Numbered grid", plural: "Numbered grids" },
  fields: [{ name: "items", type: "array", minRows: 1, fields: [{ name: "title", type: "text", required: true }, { name: "body", type: "textarea", required: true }] }, spacingField],
};

export const CaseStudyCardsBlock: Block = {
  slug: "caseStudyCards",
  interfaceName: "CaseStudyCardsBlock",
  labels: { singular: "Case study cards", plural: "Case study cards" },
  fields: [
    {
      name: "caseStudies",
      type: "relationship",
      relationTo: "pages",
      hasMany: true,
      required: true,
      filterOptions: { template: { equals: "caseStudy" } },
      admin: { description: "Card text and figures are edited on each case study page (Case study card tab)." },
    },
    { name: "ctaLabel", type: "text", defaultValue: "Read the Case Study" },
    spacingField,
  ],
};

export const BlogGoalsBlock: Block = {
  slug: "blogGoals",
  interfaceName: "BlogGoalsBlock",
  labels: { singular: "Blog goal cards", plural: "Blog goal cards" },
  fields: [
    {
      name: "goals",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
        { type: "row", fields: [{ name: "category", type: "relationship", relationTo: "categories", required: true }, { name: "emptyLabel", type: "text", label: "Shown when no posts yet", defaultValue: "Guides" }] },
      ],
    },
    spacingField,
  ],
};

export const LatestPostsBlock: Block = {
  slug: "latestPosts",
  interfaceName: "LatestPostsBlock",
  labels: { singular: "Latest posts", plural: "Latest posts" },
  fields: [
    { name: "limit", type: "number", defaultValue: 12, min: 1, max: 48 },
    { name: "emptyTitle", type: "text", label: "Heading when no posts are published" },
    { name: "emptyBody", type: "textarea" },
    { name: "emptyLinks", type: "array", fields: [{ name: "label", type: "text", required: true }, linkGroup("link", "Link")] },
    spacingField,
  ],
};

export const contentBlocks: Block[] = [
  RichTextBlock,
  SectionHeaderBlock,
  FeatureListBlock,
  NumberedCardsBlock,
  IconCardsBlock,
  ProcessStepsBlock,
  TierCardsBlock,
  CheckListBlock,
  CalloutBlock,
  CardBlock,
  GridBlock,
  KeywordTableBlock,
  MetricGridBlock,
  ImageCardsBlock,
  ServiceCardsBlock,
  ImageTilesBlock,
  LinkPillsBlock,
  PillsBlock,
  QuoteBlock,
  ButtonsBlock,
  TextLinkBlock,
  FlowStepsBlock,
  LinkListBlock,
  FounderCardsBlock,
  PersonCardsBlock,
  NumberedGridBlock,
  CaseStudyCardsBlock,
  BlogGoalsBlock,
  LatestPostsBlock,
];

