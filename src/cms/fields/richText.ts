import type { Block, RichTextField } from "payload";
import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  TextStateFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { TEXT_STYLES } from "../lib/options";

/** Inline list embedded in rich text, e.g. a checklist between two paragraphs. */
export const InlineCheckList: Block = {
  slug: "checkList",
  interfaceName: "InlineCheckListBlock",
  labels: { singular: "Checklist", plural: "Checklists" },
  fields: [
    {
      name: "variant",
      type: "select",
      defaultValue: "check",
      options: [
        { label: "Ticks (benefits)", value: "check" },
        { label: "Minus (gaps / problems)", value: "gap" },
      ],
    },
    { name: "size", type: "select", defaultValue: "base", options: [{ label: "Base text", value: "base" }, { label: "Inherit", value: "inherit" }] },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [{ name: "text", type: "textarea", required: true }],
    },
  ],
};

export const InlineDefinitionList: Block = {
  slug: "definitionList",
  interfaceName: "InlineDefinitionListBlock",
  labels: { singular: "Definition list", plural: "Definition lists" },
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "term", type: "text", required: true },
        { name: "definition", type: "textarea", required: true },
      ],
    },
  ],
};

export const InlinePills: Block = {
  slug: "pills",
  interfaceName: "InlinePillsBlock",
  labels: { singular: "Pill list", plural: "Pill lists" },
  fields: [{ name: "items", type: "array", minRows: 1, fields: [{ name: "text", type: "text", required: true }] }],
};

const linkFeature = () =>
  LinkFeature({
    enabledCollections: ["pages", "posts"],
    fields: ({ defaultFields }) => [
      ...defaultFields,
      {
        name: "title",
        type: "text",
        label: "Link title (optional)",
        admin: { description: "Optional tooltip / extra accessible label. The linked text should already describe the destination." },
      },
      {
        name: "rel",
        type: "select",
        hasMany: true,
        label: "Link relationship (external links)",
        options: [
          { label: "nofollow", value: "nofollow" },
          { label: "sponsored", value: "sponsored" },
          { label: "ugc", value: "ugc" },
        ],
        admin: { description: "noopener and noreferrer are added automatically for new-tab links." },
      },
    ],
  });

const textStyles = () => TextStateFeature({ state: { style: TEXT_STYLES } });

/** Short copy: paragraphs with bold/italic/underline, links and text styles. */
export const inlineEditor = lexicalEditor({
  features: () => [
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    linkFeature(),
    textStyles(),
    InlineToolbarFeature(),
    FixedToolbarFeature(),
  ],
});

/** Section copy: adds lists, small headings, alignment and embedded checklist/definition/pill blocks. */
export const basicEditor = lexicalEditor({
  features: () => [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ["h3", "h4"] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    linkFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    AlignFeature(),
    textStyles(),
    BlocksFeature({ blocks: [InlineCheckList, InlineDefinitionList, InlinePills] }),
    InlineToolbarFeature(),
    FixedToolbarFeature(),
  ],
});

/** Long-form articles and policies. */
export const articleEditor = lexicalEditor({
  features: () => [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    linkFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    AlignFeature(),
    BlockquoteFeature(),
    HorizontalRuleFeature(),
    UploadFeature({
      collections: {
        media: {
          fields: [{ name: "caption", type: "text", label: "Caption (optional)" }],
        },
      },
    }),
    textStyles(),
    BlocksFeature({ blocks: [InlineCheckList, InlineDefinitionList] }),
    InlineToolbarFeature(),
    FixedToolbarFeature(),
  ],
});

type RichOpts = { label?: string; required?: boolean; description?: string };

export const richText = (name: string, editor: RichTextField["editor"], opts: RichOpts = {}): RichTextField => ({
  name,
  type: "richText",
  label: opts.label,
  required: opts.required,
  editor,
  admin: opts.description ? { description: opts.description } : undefined,
});
