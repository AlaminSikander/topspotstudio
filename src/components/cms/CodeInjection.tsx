import { Fragment } from "react";
import type { CodeSnippet } from "@/payload-types";
import { parseSnippet, type SnippetNode, type SnippetPlacement } from "@/cms/lib/snippets";

const REACT_ATTR: Record<string, string> = {
  "http-equiv": "httpEquiv",
  charset: "charSet",
  crossorigin: "crossOrigin",
  referrerpolicy: "referrerPolicy",
  nomodule: "noModule",
  hreflang: "hrefLang",
};

function toProps(attrs: SnippetNode["attrs"]) {
  const props: Record<string, string | boolean> = {};
  for (const [k, v] of Object.entries(attrs)) props[REACT_ATTR[k] ?? k] = v;
  return props;
}

function renderNode(node: SnippetNode, key: string, consentCategory?: string | null) {
  const props = toProps(node.attrs);
  switch (node.tag) {
    case "meta":
      return <meta key={key} {...props} />;
    case "link":
      return <link key={key} {...props} />;
    case "noscript":
      return <noscript key={key} dangerouslySetInnerHTML={{ __html: node.content ?? "" }} />;
    case "script": {
      // Consent-gated scripts stay inert until a consent manager re-types them for the accepted category.
      const consent = consentCategory ? { type: "text/plain", "data-category": consentCategory, "data-consent": consentCategory } : {};
      if (props.src) return <script key={key} {...props} {...consent} />;
      return <script key={key} {...props} {...consent} dangerouslySetInnerHTML={{ __html: node.content ?? "" }} />;
    }
  }
}

export type SnippetTarget = { pageId?: number | string; collection?: "pages" | "posts"; template?: string };

export function selectSnippets(snippets: CodeSnippet[], placement: SnippetPlacement, target: SnippetTarget | "all") {
  return snippets.filter((s) => {
    if (s.placement !== placement) return false;
    if (target === "all") return s.scope === "all";
    if (s.scope === "templates") return Boolean(target.template && s.templates?.includes(target.template as never));
    if (s.scope === "pages") {
      return (s.pages ?? []).some((ref) => {
        const id = typeof ref.value === "object" ? ref.value.id : ref.value;
        return ref.relationTo === target.collection && String(id) === String(target.pageId);
      });
    }
    return false;
  });
}

/** Outputs approved tracking/verification snippets as real elements. Never rendered for previews or drafts. */
export function CodeInjection({ snippets }: { snippets: CodeSnippet[] }) {
  return (
    <>
      {snippets.map((s) => {
        const { nodes, errors } = parseSnippet(s.code);
        if (errors.length) return null;
        return <Fragment key={s.id}>{nodes.map((n, i) => renderNode(n, `${s.id}-${i}`, s.requiresConsent ? s.consentCategory : null))}</Fragment>;
      })}
    </>
  );
}
