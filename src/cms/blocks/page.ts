import type { Block } from "payload";
import { articleEditor, basicEditor, inlineEditor, richText } from "../fields/richText";
import { ctaGroup, linkGroup } from "../fields/link";
import { imageGroup } from "../fields/image";
import {
  CalloutBlock,
  CardBlock,
  GridBlock,
  KeywordTableBlock,
  PillsBlock,
  QuoteBlock,
  TextLinkBlock,
  contentBlocks,
} from "./content";
import { anchorIdField, textItems, toneField, visualField } from "./shared";

const titleRow = (label = "Heading") => ({
  type: "row" as const,
  fields: [
    { name: "title", type: "text" as const, required: true, label, admin: { width: "60%" } },
    { name: "highlight", type: "text" as const, label: "Gradient words", admin: { width: "40%", description: "Exact words from the heading to show in the brand gradient." } },
  ],
});

export const PageHeroBlock: Block = {
  slug: "pageHero",
  interfaceName: "PageHeroBlock",
  labels: { singular: "Page hero (H1)", plural: "Page heroes" },
  fields: [
    { name: "showBreadcrumbs", type: "checkbox", defaultValue: true, label: "Show breadcrumbs (edited in the Settings tab)" },
    { name: "eyebrow", type: "text" },
    titleRow("H1 heading"),
    richText("lead", inlineEditor, { label: "Intro", required: true }),
    richText("body", inlineEditor, { label: "Supporting text" }),
    ctaGroup("primary", "Primary button"),
    ctaGroup("secondary", "Secondary button"),
    textItems("trust", "Trust points"),
    {
      type: "row",
      fields: [
        {
          name: "mediaType",
          type: "select",
          defaultValue: "none",
          options: [
            { label: "None", value: "none" },
            { label: "Image", value: "image" },
            { label: "Diagram", value: "visual" },
          ],
          admin: { width: "34%" },
        },
        { ...visualField(), admin: { width: "33%", condition: (_, s) => s?.mediaType === "visual" } },
        {
          name: "mediaFrame",
          type: "select",
          defaultValue: "default",
          options: [
            { label: "Standard", value: "default" },
            { label: "Narrow (portrait)", value: "narrow" },
            { label: "Inset", value: "inset" },
          ],
          admin: { width: "33%", condition: (_, s) => s?.mediaType !== "none" },
        },
      ],
    },
    { ...imageGroup("image", "Hero image", { ratio: true }), admin: { condition: (_, s) => s?.mediaType === "image" } },
    { name: "location", type: "text", defaultValue: "hero", label: "Analytics location", admin: { position: "sidebar" } },
  ],
};

export const HomeHeroBlock: Block = {
  slug: "homeHero",
  interfaceName: "HomeHeroBlock",
  labels: { singular: "Homepage hero (H1)", plural: "Homepage heroes" },
  fields: [
    { name: "badge", type: "text" },
    titleRow("H1 heading"),
    { name: "lead", type: "textarea", required: true },
    { name: "body", type: "textarea" },
    ctaGroup("primary", "Primary button"),
    ctaGroup("secondary", "Secondary button"),
    textItems("trust", "Trust points"),
    imageGroup("image", "Hero photo"),
    {
      name: "founderChip",
      type: "group",
      label: "Floating founder badge",
      fields: [
        { type: "row", fields: [{ name: "initialsA", type: "text" }, { name: "initialsB", type: "text" }] },
        { type: "row", fields: [{ name: "title", type: "text" }, { name: "subtitle", type: "text" }] },
      ],
    },
    { name: "searchChip", type: "text", label: "Floating search query text" },
    { name: "marqueeLabel", type: "text", label: "Scrolling strip label (screen readers)" },
    textItems("marquee", "Scrolling strip items"),
  ],
};

export const CollectionHeroBlock: Block = {
  slug: "collectionHero",
  interfaceName: "CollectionHeroBlock",
  labels: { singular: "Hub hero (H1)", plural: "Hub heroes" },
  fields: [
    { name: "badge", type: "text" },
    titleRow("H1 heading"),
    { name: "lead", type: "textarea", required: true },
    { name: "body", type: "textarea" },
    { name: "bodyEmphasis", type: "checkbox", label: "Show supporting text in bold" },
    { name: "calloutTitle", type: "text", label: "Side note title (optional)" },
    richText("calloutBody", basicEditor, { label: "Side note text" }),
  ],
};

export const ContactHeroBlock: Block = {
  slug: "contactHero",
  interfaceName: "ContactHeroBlock",
  labels: { singular: "Contact hero + form (H1)", plural: "Contact heroes" },
  fields: [
    { name: "badge", type: "text" },
    titleRow("H1 heading"),
    { name: "lead", type: "textarea", required: true },
    { name: "emphasis", type: "text" },
    { name: "locationNote", type: "textarea" },
    { name: "showEmail", type: "checkbox", defaultValue: true, label: "Show the public contact email (Site settings) when set" },
    { name: "calloutTitle", type: "text" },
    richText("calloutBody", basicEditor),
    { name: "formTitle", type: "text", required: true, label: "Form heading (H2)" },
    { name: "formIntro", type: "textarea" },
  ],
};

export const LegalHeroBlock: Block = {
  slug: "legalHero",
  interfaceName: "LegalHeroBlock",
  labels: { singular: "Policy hero (H1)", plural: "Policy heroes" },
  fields: [
    { name: "badge", type: "text" },
    { name: "title", type: "text", required: true, label: "H1 heading" },
    { name: "lastUpdated", type: "text", label: "Last updated (display text)" },
    {
      name: "showNotice",
      type: "select",
      defaultValue: "untilApproved",
      options: [
        { label: "Until the policy is approved", value: "untilApproved" },
        { label: "Always", value: "always" },
        { label: "Never", value: "never" },
      ],
    },
    richText("notice", basicEditor),
  ],
};

export const LegalBodyBlock: Block = {
  slug: "legalBody",
  interfaceName: "LegalBodyBlock",
  labels: { singular: "Policy text", plural: "Policy text" },
  fields: [richText("content", articleEditor, { required: true })],
};

export const SectionBlock: Block = {
  slug: "section",
  interfaceName: "SectionBlock",
  labels: { singular: "Content section", plural: "Content sections" },
  fields: [
    {
      type: "row",
      fields: [
        { ...anchorIdField(), admin: { ...anchorIdField().admin, width: "34%" } },
        { ...toneField(), admin: { width: "33%" } },
        {
          name: "layout",
          type: "select",
          defaultValue: "stacked",
          options: [
            { label: "Heading then content", value: "stacked" },
            { label: "Text beside a diagram/image", value: "split" },
            { label: "Editorial (sticky heading + article text)", value: "editorial" },
            { label: "Two columns", value: "columns" },
            { label: "Centred text", value: "centered" },
          ],
          admin: { width: "33%" },
        },
      ],
    },
    {
      name: "header",
      type: "group",
      label: "Section heading",
      fields: [
        { name: "eyebrow", type: "text" },
        titleRow("Heading (H2)"),
        { name: "headingId", type: "text", label: "Heading ID (optional)", admin: { description: "Defaults to <section ID>-title." } },
        richText("intro", basicEditor, { label: "Intro text" }),
        {
          type: "row",
          fields: [
            { name: "align", type: "select", defaultValue: "left", options: [{ label: "Left", value: "left" }, { label: "Centre", value: "center" }], admin: { width: "50%" } },
            {
              name: "contentSpacing",
              type: "select",
              label: "Space before content",
              defaultValue: "12",
              options: [
                { label: "L (40px)", value: "10" },
                { label: "XL (48px)", value: "12" },
                { label: "XXL (56px)", value: "14" },
                { label: "XXXL (64px)", value: "16" },
              ],
              admin: { width: "50%" },
            },
          ],
        },
        ctaGroup("action", "Button beside the heading (optional)"),
        { name: "actionLocation", type: "text", label: "Button analytics location" },
      ],
    },
    {
      name: "split",
      type: "group",
      label: "Diagram / image",
      admin: { condition: (_, s) => s?.layout === "split" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "mediaType", type: "select", defaultValue: "visual", options: [{ label: "Diagram", value: "visual" }, { label: "Image", value: "image" }], admin: { width: "34%" } },
            { ...visualField(), admin: { width: "33%", condition: (_, s) => s?.mediaType !== "image" } },
            { name: "reverse", type: "checkbox", label: "Media on the left", admin: { width: "33%" } },
          ],
        },
        { name: "align", type: "select", defaultValue: "center", options: [{ label: "Centre", value: "center" }, { label: "Top", value: "start" }] },
        { ...imageGroup("image", "Image", { ratio: true }), admin: { condition: (_, s) => s?.mediaType === "image" } },
      ],
    },
    {
      name: "columns",
      type: "group",
      label: "Two-column options",
      admin: { condition: (_, s) => s?.layout === "columns" },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "ratio",
              type: "select",
              defaultValue: "1-1",
              options: [
                { label: "Equal", value: "1-1" },
                { label: "Narrow left", value: "0.9-1.1" },
                { label: "Narrower left", value: "0.85-1.15" },
                { label: "Narrowest left", value: "0.8-1.2" },
                { label: "Wide left", value: "1.1-0.9" },
              ],
              admin: { width: "34%" },
            },
            { name: "valign", type: "select", defaultValue: "start", options: [{ label: "Top", value: "start" }, { label: "Centre", value: "center" }], admin: { width: "33%" } },
            { name: "stickyFirst", type: "checkbox", label: "Keep left column visible while scrolling", admin: { width: "33%" } },
          ],
        },
        { name: "gap", type: "select", defaultValue: "default", options: [{ label: "Standard", value: "default" }, { label: "Wide", value: "wide" }] },
      ],
    },
    {
      name: "centeredWidth",
      type: "select",
      defaultValue: "medium",
      options: [
        { label: "Narrow", value: "narrow" },
        { label: "Medium", value: "medium" },
      ],
      admin: { condition: (_, s) => s?.layout === "centered" },
    },
    {
      name: "content",
      type: "blocks",
      label: "Content",
      blocks: contentBlocks,
      admin: { description: "In two-column sections this is the left column; in editorial sections it is the article text." },
    },
    {
      name: "columnB",
      type: "blocks",
      label: "Right column",
      blocks: contentBlocks,
      admin: { condition: (_, s) => s?.layout === "columns" },
    },
    {
      name: "aside",
      type: "blocks",
      label: "Below the sticky heading",
      blocks: [PillsBlock, TextLinkBlock, QuoteBlock],
      admin: { condition: (_, s) => s?.layout === "editorial" },
    },
    {
      name: "below",
      type: "blocks",
      label: "Full-width content below",
      blocks: contentBlocks,
      admin: { condition: (_, s) => s?.layout === "split" },
    },
    {
      name: "topSpacing",
      type: "select",
      defaultValue: "default",
      options: [
        { label: "Standard", value: "default" },
        { label: "Reduced (directly after a hero)", value: "reduced" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};

export const ProofBlock: Block = {
  slug: "proof",
  interfaceName: "ProofBlock",
  labels: { singular: "Experience & proof", plural: "Experience & proof" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Experience & proof" },
    { name: "title", type: "text", required: true },
    richText("intro", basicEditor, { required: true }),
    { name: "noteTitle", type: "text", defaultValue: "Proof note" },
    richText("note", basicEditor, { required: true }),
    { name: "ctaLabel", type: "text", defaultValue: "View SEO Case Studies" },
    {
      name: "info",
      type: "ui",
      admin: { components: { Field: "@/cms/admin/HelpText#ProofHelp" } },
    },
  ],
};

export const CtaBandBlock: Block = {
  slug: "ctaBand",
  interfaceName: "CtaBandBlock",
  labels: { singular: "Call-to-action band", plural: "Call-to-action bands" },
  fields: [
    { type: "row", fields: [{ ...anchorIdField(false), admin: { width: "50%" } }, { name: "tone", type: "select", defaultValue: "navy", options: [{ label: "Navy", value: "navy" }, { label: "Soft tint", value: "tint" }], admin: { width: "50%" } }] },
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text", required: true, label: "Heading (H2)" },
    richText("body", basicEditor),
    ctaGroup("primary", "Primary button", { required: true }),
    ctaGroup("secondary", "Secondary button"),
    { name: "location", type: "text", defaultValue: "final_cta", label: "Analytics location" },
    {
      name: "aside",
      type: "group",
      label: "Side checklist (optional)",
      fields: [{ name: "title", type: "text" }, textItems("items", "Checklist items")],
    },
  ],
};

export const FaqBlock: Block = {
  slug: "faq",
  interfaceName: "FaqBlock",
  labels: { singular: "FAQ", plural: "FAQs" },
  fields: [
    { name: "title", type: "text", defaultValue: "Frequently Asked Questions", label: "Heading (H2)" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true, admin: { description: "Each new line becomes a paragraph." } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "asideTitle", type: "text", defaultValue: "Have a question that isn’t covered here?", admin: { width: "50%" } },
        { name: "asideLinkLabel", type: "text", defaultValue: "Ask the founders directly", admin: { width: "50%" } },
      ],
    },
    linkGroup("asideLink", "Side link", { required: false }),
  ],
};

export const StatStripBlock: Block = {
  slug: "statStrip",
  interfaceName: "StatStripBlock",
  labels: { singular: "Stat strip", plural: "Stat strips" },
  fields: [
    { name: "label", type: "text", defaultValue: "What to expect", label: "Region label (screen readers)" },
    { name: "items", type: "array", minRows: 1, maxRows: 4, fields: [{ type: "row", fields: [{ name: "value", type: "text", required: true }, { name: "label", type: "text", required: true }] }] },
  ],
};

export const FormSectionBlock: Block = {
  slug: "formSection",
  interfaceName: "FormSectionBlock",
  labels: { singular: "Form section", plural: "Form sections" },
  fields: [
    {
      name: "form",
      type: "select",
      required: true,
      defaultValue: "audit",
      options: [{ label: "Free SEO audit request", value: "audit" }],
      admin: { description: "The form fields, validation and email delivery stay in code so submissions keep working." },
    },
    anchorIdField(),
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text", required: true, label: "Heading (H2)" },
    { name: "intro", type: "textarea" },
    richText("aside", basicEditor, { label: "Side note" }),
  ],
};

export const CaseStudyBlock: Block = {
  slug: "caseStudy",
  interfaceName: "CaseStudyBlock",
  labels: { singular: "Case study (full layout)", plural: "Case studies" },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "title", type: "text", required: true, label: "H1 heading" },
            { name: "summary", type: "textarea", required: true },
            {
              name: "heroMetrics",
              type: "array",
              label: "Headline figures",
              admin: { description: "Only publish documented, approved figures." },
              fields: [{ type: "row", fields: [{ name: "value", type: "text", required: true }, { name: "label", type: "text", required: true }] }, { name: "context", type: "text" }],
            },
          ],
        },
        {
          label: "Overview",
          fields: [
            { name: "glance", type: "array", label: "Project at a glance", fields: [{ type: "row", fields: [{ name: "term", type: "text", required: true }, { name: "value", type: "text", required: true }] }] },
            textItems("challenge", "The challenge", { textarea: true }),
            textItems("goals", "The goals", { textarea: true }),
            { name: "work", type: "array", label: "What we worked on", fields: [{ name: "title", type: "text", required: true }, { name: "body", type: "textarea", required: true }] },
          ],
        },
        {
          label: "Results",
          fields: [
            { name: "resultsIntro", type: "textarea", required: true },
            {
              name: "results",
              type: "array",
              label: "Results table",
              fields: [{ type: "row", fields: [{ name: "result", type: "text", required: true }, { name: "metric", type: "text", required: true }, { name: "context", type: "text" }] }],
            },
            {
              name: "visual",
              type: "group",
              label: "Results visual",
              fields: [
                {
                  name: "type",
                  type: "select",
                  defaultValue: "none",
                  options: [
                    { label: "None", value: "none" },
                    { label: "Shared influencer comparison (Site settings)", value: "influencerComparison" },
                    { label: "Comparison bars", value: "bars" },
                    { label: "Figures panel", value: "panel" },
                  ],
                },
                { name: "title", type: "text", admin: { condition: (_, s) => s?.type === "bars" || s?.type === "panel" } },
                {
                  name: "bars",
                  type: "array",
                  admin: { condition: (_, s) => s?.type === "bars" },
                  fields: [
                    { name: "label", type: "text", required: true },
                    { type: "row", fields: [{ name: "before", type: "number", required: true }, { name: "after", type: "number", required: true }] },
                    { type: "row", fields: [{ name: "beforeLabel", type: "text", required: true }, { name: "afterLabel", type: "text", required: true }, { name: "change", type: "text", required: true }] },
                  ],
                },
                {
                  name: "metrics",
                  type: "array",
                  admin: { condition: (_, s) => s?.type === "panel" },
                  fields: [{ type: "row", fields: [{ name: "value", type: "text", required: true }, { name: "label", type: "text", required: true }] }, { name: "context", type: "text" }],
                },
                { name: "caption", type: "textarea", admin: { condition: (_, s) => s?.type === "bars" || s?.type === "panel" } },
              ],
            },
            { name: "afterResults", type: "blocks", label: "Extra results content", blocks: [CardBlock, GridBlock, CalloutBlock, KeywordTableBlock] },
          ],
        },
        {
          label: "Takeaways",
          fields: [
            { name: "whyItWorked", type: "array", label: "Why the strategy worked", fields: [{ name: "lead", type: "text", required: true }, { name: "body", type: "textarea", required: true }] },
            richText("takeaway", basicEditor, { required: true }),
            { name: "transparency", type: "textarea", required: true, label: "Transparency note" },
            { name: "finalTitle", type: "text", required: true, label: "Final CTA heading" },
            { name: "finalBody", type: "textarea", required: true, label: "Final CTA text" },
          ],
        },
      ],
    },
  ],
};

export const pageBlocks: Block[] = [
  HomeHeroBlock,
  PageHeroBlock,
  CollectionHeroBlock,
  ContactHeroBlock,
  LegalHeroBlock,
  SectionBlock,
  StatStripBlock,
  ProofBlock,
  CtaBandBlock,
  FaqBlock,
  FormSectionBlock,
  CaseStudyBlock,
  LegalBodyBlock,
];
