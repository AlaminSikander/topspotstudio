/** Minimal typings and helpers for serialized Lexical rich text stored by Payload. */

export type LexicalNode = {
  type: string;
  version?: number;
  children?: LexicalNode[];
  text?: string;
  format?: number | string;
  tag?: string;
  listType?: "bullet" | "number" | "check";
  fields?: Record<string, unknown>;
  relationTo?: string;
  value?: unknown;
  $?: Record<string, string>;
  [key: string]: unknown;
};

export type LexicalRoot = { root: LexicalNode } | null | undefined;

export const TEXT_FORMAT = { bold: 1, italic: 2, strikethrough: 4, underline: 8, code: 16 } as const;
export const hasFormat = (node: LexicalNode, flag: number) => typeof node.format === "number" && (node.format & flag) === flag;

export function walk(node: LexicalNode | undefined, visit: (n: LexicalNode) => void) {
  if (!node) return;
  visit(node);
  node.children?.forEach((c) => walk(c, visit));
}

/** Plain text of a rich-text value, with paragraph breaks. Used for SEO checks and FAQ/answer schema. */
export function lexicalToText(value: LexicalRoot): string {
  if (!value?.root) return "";
  const out: string[] = [];
  const visit = (n: LexicalNode): string => {
    if (n.type === "text") return n.text ?? "";
    if (n.type === "linebreak") return "\n";
    if (n.type === "block") {
      const f = n.fields ?? {};
      const items = (f.items as { text?: string; term?: string; definition?: string }[] | undefined) ?? [];
      return items.map((i) => [i.term, i.definition, i.text].filter(Boolean).join(" ")).join("\n");
    }
    return (n.children ?? []).map(visit).join("");
  };
  for (const child of value.root.children ?? []) out.push(visit(child));
  return out.filter(Boolean).join("\n\n");
}

export type ExtractedLink = { text: string; linkType: string; url?: string; doc?: { relationTo: string; value: unknown }; newTab?: boolean };

export function extractLinks(value: LexicalRoot): ExtractedLink[] {
  const links: ExtractedLink[] = [];
  if (!value?.root) return links;
  walk(value.root, (n) => {
    if (n.type === "link" || n.type === "autolink") {
      const f = (n.fields ?? {}) as { linkType?: string; url?: string; doc?: { relationTo: string; value: unknown }; newTab?: boolean };
      const text = (n.children ?? []).map((c) => c.text ?? "").join("");
      links.push({ text, linkType: f.linkType ?? "custom", url: f.url, doc: f.doc, newTab: f.newTab });
    }
  });
  return links;
}

/** Visits every rich-text value nested anywhere inside a document (blocks, arrays, groups). */
export function collectRichText(value: unknown, path = "", out: { path: string; value: LexicalRoot }[] = []) {
  if (!value || typeof value !== "object") return out;
  if ("root" in (value as object) && typeof (value as { root?: unknown }).root === "object") {
    out.push({ path, value: value as LexicalRoot });
    return out;
  }
  if (Array.isArray(value)) value.forEach((v, i) => collectRichText(v, `${path}[${i}]`, out));
  else for (const [k, v] of Object.entries(value)) collectRichText(v, path ? `${path}.${k}` : k, out);
  return out;
}
