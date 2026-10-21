import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { CheckList, Pill } from "@/components/sections/Blocks";
import { hasFormat, TEXT_FORMAT, type LexicalNode, type LexicalRoot } from "@/lib/cms/lexical";
import { isExternal, relFor, resolveHref, type LinkValue, type PathMap } from "@/lib/cms/links";

export type RichTone = "light" | "dark";

export type RichTextOptions = {
  tone?: RichTone;
  /** Class for links; pass "" inside .prose-tss where links are already styled. */
  linkClass?: string;
  listClass?: string;
  paths?: PathMap;
};

const STYLE_CLASS: Record<string, { light: string; dark: string }> = {
  emphasis: { light: "font-semibold text-navy", dark: "font-semibold text-white" },
  muted: { light: "text-muted", dark: "text-white/60" },
  small: { light: "text-base", dark: "text-base" },
  smallMuted: { light: "text-base text-muted", dark: "text-base text-white/60" },
  tinyMuted: { light: "text-sm text-muted", dark: "text-sm text-white/60" },
  display: { light: "font-display text-xl font-semibold text-navy md:text-2xl", dark: "font-display text-xl font-semibold text-white md:text-2xl" },
};

const ALIGN: Record<string, string> = { center: "text-center", right: "text-right", justify: "text-justify" };

const styleOf = (n: LexicalNode) => n.$?.style;

/** If every text node in a paragraph carries the same style, the style applies to the whole paragraph. */
function uniformStyle(node: LexicalNode): string | undefined {
  const styles = new Set<string | undefined>();
  const visit = (n: LexicalNode) => {
    if (n.type === "text") styles.add(styleOf(n));
    n.children?.forEach(visit);
  };
  node.children?.forEach(visit);
  return styles.size === 1 ? [...styles][0] : undefined;
}

type Ctx = Required<Pick<RichTextOptions, "tone">> & RichTextOptions & { paragraphStyle?: string };

function renderText(node: LexicalNode, ctx: Ctx, key: number): ReactNode {
  let el: ReactNode = node.text ?? "";
  if (hasFormat(node, TEXT_FORMAT.code)) el = <code>{el}</code>;
  if (hasFormat(node, TEXT_FORMAT.strikethrough)) el = <s>{el}</s>;
  if (hasFormat(node, TEXT_FORMAT.underline)) el = <u>{el}</u>;
  if (hasFormat(node, TEXT_FORMAT.italic)) el = <em>{el}</em>;
  if (hasFormat(node, TEXT_FORMAT.bold)) el = <strong className={ctx.tone === "dark" ? "text-white" : "text-navy"}>{el}</strong>;
  const style = styleOf(node);
  if (style && style !== ctx.paragraphStyle && STYLE_CLASS[style]) el = <span className={STYLE_CLASS[style][ctx.tone]}>{el}</span>;
  return <Fragment key={key}>{el}</Fragment>;
}

function linkClassFor(ctx: Ctx) {
  if (ctx.linkClass !== undefined) return ctx.linkClass || undefined;
  return ctx.tone === "dark" ? "font-semibold text-teal underline underline-offset-4 hover:text-white" : "text-link";
}

function renderLink(node: LexicalNode, ctx: Ctx, key: number): ReactNode {
  const fields = (node.fields ?? {}) as LinkValue & { title?: string; rel?: string[] };
  const href = resolveHref(fields, ctx.paths);
  const children = renderChildren(node.children, ctx);
  if (!href) return <span key={key}>{children}</span>;
  const rel = relFor(fields?.newTab, fields?.rel);
  const common = { className: linkClassFor(ctx), title: fields?.title || undefined, target: fields?.newTab ? "_blank" : undefined, rel };
  if (isExternal(href) || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
    return (
      <a key={key} href={href} {...common}>
        {children}
      </a>
    );
  }
  return (
    <Link key={key} href={href} {...common}>
      {children}
    </Link>
  );
}

function renderBlock(node: LexicalNode, ctx: Ctx, key: number): ReactNode {
  const f = (node.fields ?? {}) as Record<string, unknown>;
  switch (f.blockType) {
    case "checkList": {
      const items = ((f.items as { text: string }[]) ?? []).map((i) => i.text);
      return (
        <CheckList
          key={key}
          variant={f.variant === "gap" ? "gap" : "check"}
          tone={ctx.tone === "dark" ? "navy" : "base"}
          className={f.size === "inherit" ? "" : "text-base"}
          items={items}
        />
      );
    }
    case "definitionList":
      return (
        <dl key={key} className="space-y-3 text-base">
          {((f.items as { term: string; definition: string }[]) ?? []).map((i) => (
            <div key={i.term}>
              <dt className={`inline font-semibold ${ctx.tone === "dark" ? "text-white" : "text-navy"}`}>{i.term} — </dt>
              <dd className="inline">{i.definition}</dd>
            </div>
          ))}
        </dl>
      );
    case "pills":
      return (
        <ul key={key} className="flex flex-wrap gap-2 !list-none !pl-0">
          {((f.items as { text: string }[]) ?? []).map((i) => (
            <li key={i.text}>
              <Pill>{i.text}</Pill>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

function renderNode(node: LexicalNode, ctx: Ctx, key: number): ReactNode {
  switch (node.type) {
    case "text":
      return renderText(node, ctx, key);
    case "linebreak":
      return <br key={key} />;
    case "tab":
      return " ";
    case "link":
    case "autolink":
      return renderLink(node, ctx, key);
    case "paragraph": {
      if (!node.children?.length) return null;
      const style = uniformStyle(node);
      const cls = [style && STYLE_CLASS[style]?.[ctx.tone], ALIGN[String(node.format)]].filter(Boolean).join(" ") || undefined;
      return (
        <p key={key} className={cls}>
          {renderChildren(node.children, { ...ctx, paragraphStyle: style })}
        </p>
      );
    }
    case "heading": {
      const Tag = (["h2", "h3", "h4", "h5", "h6"].includes(String(node.tag)) ? node.tag : "h3") as "h2" | "h3" | "h4";
      return (
        <Tag key={key} className={ALIGN[String(node.format)]}>
          {renderChildren(node.children, ctx)}
        </Tag>
      );
    }
    case "list": {
      const Tag = node.listType === "number" ? "ol" : "ul";
      return (
        <Tag key={key} className={ctx.listClass}>
          {renderChildren(node.children, ctx)}
        </Tag>
      );
    }
    case "listitem":
      return <li key={key}>{renderChildren(node.children, ctx)}</li>;
    case "quote":
      return <blockquote key={key}>{renderChildren(node.children, ctx)}</blockquote>;
    case "horizontalrule":
      return <hr key={key} />;
    case "upload": {
      const doc = node.value as { url?: string; alt?: string; width?: number; height?: number; caption?: string } | null;
      if (!doc || typeof doc !== "object" || !doc.url) return null;
      const caption = ((node.fields ?? {}) as { caption?: string }).caption || doc.caption;
      return (
        <figure key={key}>
          <Image src={doc.url} alt={doc.alt ?? ""} width={doc.width ?? 1200} height={doc.height ?? 800} sizes="(min-width: 768px) 720px, 100vw" className="rounded-[18px]" />
          {caption ? <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption> : null}
        </figure>
      );
    }
    case "block":
      return renderBlock(node, ctx, key);
    default:
      return node.children ? <span key={key}>{renderChildren(node.children, ctx)}</span> : null;
  }
}

function renderChildren(children: LexicalNode[] | undefined, ctx: Ctx): ReactNode {
  return children?.map((c, i) => renderNode(c, ctx, i));
}

export function hasRichText(value: LexicalRoot) {
  return Boolean(value?.root?.children?.some((c) => (c.children?.length ?? 0) > 0 || c.type === "block" || c.type === "upload" || c.type === "horizontalrule"));
}

/** Renders Payload Lexical JSON as crawlable HTML using the site's own typography classes. */
export function RichText({ value, tone = "light", ...rest }: { value: LexicalRoot } & RichTextOptions) {
  if (!value?.root) return null;
  return <>{renderChildren(value.root.children, { tone, ...rest })}</>;
}
