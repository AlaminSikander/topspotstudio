/**
 * Tiny Markdown → Lexical converter for seed content.
 *   Paragraphs: separated by a blank line. "{style} text" applies a text style to the whole paragraph
 *   (emphasis | muted | small | smallMuted | tinyMuted | display).
 *   Inline: **bold**, *italic*, [text](/url/), [text](https://… "newtab").
 *   Lists: "- item" / "1. item". Headings: "## " / "### ".
 *   Embedded blocks: "::checklist" | "::checklist gap" | "::dl" | "::pills" followed by "- " lines.
 *     ::dl items use "Term — definition".
 */
import { randomBytes } from "node:crypto";
import type { LexicalNode } from "../../lib/cms/lexical";

const oid = () => randomBytes(12).toString("hex");

type TextOpts = { format?: number; style?: string };

const textNode = (text: string, { format = 0, style }: TextOpts = {}): LexicalNode => ({
  type: "text",
  detail: 0,
  format,
  mode: "normal",
  style: "",
  text,
  version: 1,
  ...(style ? { $: { style } } : {}),
});

function inline(src: string, opts: TextOpts = {}): LexicalNode[] {
  const nodes: LexicalNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)(?:\s+"(newtab)")?\)/g;
  let last = 0;
  for (const m of src.matchAll(re)) {
    if (m.index! > last) nodes.push(textNode(src.slice(last, m.index), opts));
    if (m[1] !== undefined) nodes.push(...inline(m[1], { ...opts, format: (opts.format ?? 0) | 1 }));
    else if (m[2] !== undefined) nodes.push(...inline(m[2], { ...opts, format: (opts.format ?? 0) | 2 }));
    else {
      nodes.push({
        type: "link",
        format: "",
        indent: 0,
        version: 3,
        direction: "ltr",
        id: oid(),
        fields: { linkType: "custom", url: m[4], newTab: m[5] === "newtab" },
        children: inline(m[3], opts),
      });
    }
    last = m.index! + m[0].length;
  }
  if (last < src.length) nodes.push(textNode(src.slice(last), opts));
  return nodes;
}

const element = (type: string, children: LexicalNode[], extra: Record<string, unknown> = {}): LexicalNode => ({
  type,
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children,
  ...extra,
});

function paragraph(src: string): LexicalNode {
  const m = src.match(/^\{(\w+)\}\s+([\s\S]*)$/);
  const style = m?.[1];
  const body = m ? m[2] : src;
  return element("paragraph", inline(body.replace(/\n/g, " "), style ? { style } : {}), { textFormat: 0, textStyle: "" });
}

function list(lines: string[], ordered: boolean): LexicalNode {
  return element(
    "list",
    lines.map((l, i) => element("listitem", inline(l.replace(/^(-|\d+\.)\s+/, "")), { value: i + 1 })),
    { listType: ordered ? "number" : "bullet", start: 1, tag: ordered ? "ol" : "ul" },
  );
}

function block(header: string, lines: string[]): LexicalNode {
  const [kind, variant] = header.slice(2).trim().split(/\s+/);
  const items = lines.map((l) => l.replace(/^-\s+/, ""));
  let fields: Record<string, unknown>;
  if (kind === "checklist") fields = { blockType: "checkList", variant: variant === "gap" ? "gap" : "check", size: variant === "inherit" ? "inherit" : "base", items: items.map((text) => ({ id: oid(), text })) };
  else if (kind === "dl")
    fields = {
      blockType: "definitionList",
      items: items.map((t) => {
        const [term, ...rest] = t.split(" — ");
        return { id: oid(), term: term.trim(), definition: rest.join(" — ").trim() };
      }),
    };
  else if (kind === "pills") fields = { blockType: "pills", items: items.map((text) => ({ id: oid(), text })) };
  else throw new Error(`Unknown embedded block ${kind}`);
  return { type: "block", format: "", version: 2, fields: { id: oid(), blockName: "", ...fields } };
}

export function md(src: string) {
  const children: LexicalNode[] = [];
  const chunks = src
    .trim()
    .replace(/\r/g, "")
    .split(/\n\s*\n/)
    .map((c) => c.split("\n").map((l) => l.trim()).filter(Boolean));
  for (const lines of chunks) {
    if (!lines.length) continue;
    if (lines[0].startsWith("::")) children.push(block(lines[0], lines.slice(1)));
    else if (lines[0].startsWith("### ")) children.push(element("heading", inline(lines[0].slice(4)), { tag: "h3" }));
    else if (lines[0].startsWith("## ")) children.push(element("heading", inline(lines[0].slice(3)), { tag: "h2" }));
    else if (lines.every((l) => l.startsWith("- "))) children.push(list(lines, false));
    else if (lines.every((l) => /^\d+\.\s/.test(l))) children.push(list(lines, true));
    else children.push(paragraph(lines.join("\n")));
  }
  return { root: { type: "root", format: "", indent: 0, version: 1, direction: "ltr", children } };
}
