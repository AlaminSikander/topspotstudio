/**
 * Parsing and validation for "Tracking & Verification Codes".
 * Snippets are parsed into a small allow-listed set of elements (meta, link, script, noscript) so they can be
 * rendered as real elements in the exact placement chosen, instead of injecting an arbitrary HTML string.
 */

export type SnippetPlacement = "head" | "bodyStart" | "bodyEnd";
export type SnippetProvider =
  | "google-search-console"
  | "google-tag-manager-head"
  | "google-tag-manager-body"
  | "google-analytics-4"
  | "bing-webmaster"
  | "microsoft-clarity"
  | "meta-pixel"
  | "custom";

export type SnippetNode = {
  tag: "meta" | "link" | "script" | "noscript";
  attrs: Record<string, string | true>;
  content?: string;
};

export type ParseResult = { nodes: SnippetNode[]; errors: string[] };

const ATTR_RE = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
const ALLOWED_ATTRS: Record<SnippetNode["tag"], RegExp> = {
  meta: /^(name|content|property|http-equiv|charset|data-[a-z0-9-]+)$/,
  link: /^(rel|href|as|type|crossorigin|hreflang|title|sizes|referrerpolicy|data-[a-z0-9-]+)$/,
  script: /^(src|async|defer|type|id|crossorigin|integrity|referrerpolicy|nomodule|nonce|data-[a-z0-9-]+)$/,
  noscript: /^$/,
};

function parseAttrs(raw: string, tag: SnippetNode["tag"], errors: string[]) {
  const attrs: Record<string, string | true> = {};
  for (const m of raw.matchAll(ATTR_RE)) {
    const name = m[1].toLowerCase();
    if (name === "/") continue;
    const value = m[2] ?? m[3] ?? m[4];
    if (/^on/.test(name)) {
      errors.push(`Inline event handler "${name}" is not allowed.`);
      continue;
    }
    if (!ALLOWED_ATTRS[tag].test(name)) {
      errors.push(`Attribute "${name}" is not allowed on <${tag}>.`);
      continue;
    }
    attrs[name] = value === undefined ? true : value;
  }
  return attrs;
}

const isHttpsUrl = (v: unknown) => typeof v === "string" && /^https:\/\/[^\s"'<>]+$/i.test(v);

function checkNoscriptContent(inner: string, errors: string[]) {
  const stripped = inner.replace(/<!--[\s\S]*?-->/g, "").trim();
  if (!stripped) return;
  const allowed = /^(?:\s*(?:<iframe\b[^>]*>\s*<\/iframe>|<img\b[^>]*\/?>)\s*)+$/i;
  if (!allowed.test(stripped)) {
    errors.push("<noscript> may only contain an <iframe> or <img> tracking fallback.");
    return;
  }
  for (const m of stripped.matchAll(/\bsrc\s*=\s*["']([^"']*)["']/gi)) {
    if (!isHttpsUrl(m[1])) errors.push("<noscript> fallback URLs must use https://.");
  }
  if (/\bon[a-z]+\s*=/i.test(stripped)) errors.push("Inline event handlers are not allowed inside <noscript>.");
}

export function parseSnippet(code: string): ParseResult {
  const errors: string[] = [];
  const nodes: SnippetNode[] = [];
  let rest = (code || "").replace(/<!--[\s\S]*?-->/g, "");
  const TAG_RE = /<(meta|link)\b([^>]*?)\/?>|<(script|noscript)\b([^>]*)>([\s\S]*?)<\/\3\s*>/gi;
  rest = rest.replace(TAG_RE, (_m, voidTag: string, voidAttrs: string, pairTag: string, pairAttrs: string, inner: string) => {
    const tag = (voidTag || pairTag).toLowerCase() as SnippetNode["tag"];
    const attrs = parseAttrs(voidTag ? voidAttrs : pairAttrs, tag, errors);
    if (tag === "script") {
      if (attrs.src !== undefined && !isHttpsUrl(attrs.src)) errors.push("Script src must be an absolute https:// URL.");
      if (attrs.src !== undefined && inner.trim()) errors.push("A <script> cannot have both src and inline code.");
      if (/<\/?script/i.test(inner)) errors.push("Nested <script> tags are not allowed.");
    }
    if (tag === "link" && attrs.href !== undefined && !isHttpsUrl(attrs.href)) errors.push("Link href must be an absolute https:// URL.");
    if (tag === "noscript") checkNoscriptContent(inner, errors);
    nodes.push({ tag, attrs, ...(pairTag ? { content: inner } : {}) });
    return "";
  });
  if (rest.trim()) {
    errors.push("Only <meta>, <link>, <script> and <noscript> elements are supported. Remove any other markup or text.");
  }
  if (!nodes.length && !errors.length) errors.push("Paste the code exactly as the provider supplied it.");
  return { nodes, errors };
}

type ProviderRule = { label: string; placement: SnippetPlacement; check: (nodes: SnippetNode[]) => string | null };

const inlineScripts = (nodes: SnippetNode[]) => nodes.filter((n) => n.tag === "script" && !n.attrs.src).map((n) => n.content ?? "");

export const PROVIDER_RULES: Record<Exclude<SnippetProvider, "custom">, ProviderRule> = {
  "google-search-console": {
    label: "Google Search Console (HTML tag)",
    placement: "head",
    check: (nodes) => {
      const metas = nodes.filter((n) => n.tag === "meta" && n.attrs.name === "google-site-verification");
      if (nodes.length !== 1 || metas.length !== 1) return 'Paste only the single <meta name="google-site-verification" ...> tag.';
      return /^[A-Za-z0-9_-]{10,100}$/.test(String(metas[0].attrs.content ?? "")) ? null : "The verification content value looks invalid.";
    },
  },
  "google-tag-manager-head": {
    label: "Google Tag Manager (head snippet)",
    placement: "head",
    check: (nodes) => {
      const code = inlineScripts(nodes).join("\n");
      if (nodes.some((n) => n.tag !== "script")) return "The GTM head snippet should contain only the <script> block.";
      return /googletagmanager\.com\/gtm\.js/.test(code) && /GTM-[A-Z0-9]{4,12}/.test(code)
        ? null
        : "This does not look like the Google Tag Manager head snippet (gtm.js + GTM-XXXX).";
    },
  },
  "google-tag-manager-body": {
    label: "Google Tag Manager (body <noscript> fallback)",
    placement: "bodyStart",
    check: (nodes) =>
      nodes.length === 1 && nodes[0].tag === "noscript" && /https:\/\/www\.googletagmanager\.com\/ns\.html\?id=GTM-[A-Z0-9]{4,12}/.test(nodes[0].content ?? "")
        ? null
        : "Paste only the GTM <noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id=GTM-...\"> fallback.",
  },
  "google-analytics-4": {
    label: "Google Analytics 4 (gtag.js)",
    placement: "head",
    check: (nodes) => {
      const ext = nodes.find((n) => n.tag === "script" && typeof n.attrs.src === "string");
      if (!ext || !/^https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-[A-Z0-9]{4,15}$/.test(String(ext.attrs.src))) {
        return "Expected the gtag.js loader from https://www.googletagmanager.com/gtag/js?id=G-XXXX.";
      }
      return /gtag\(\s*['"]config['"]\s*,\s*['"]G-[A-Z0-9]{4,15}['"]/.test(inlineScripts(nodes).join("\n")) ? null : "Missing the gtag('config', 'G-XXXX') call.";
    },
  },
  "bing-webmaster": {
    label: "Bing Webmaster Tools (meta tag)",
    placement: "head",
    check: (nodes) =>
      nodes.length === 1 && nodes[0].tag === "meta" && nodes[0].attrs.name === "msvalidate.01" && typeof nodes[0].attrs.content === "string"
        ? null
        : 'Paste only the single <meta name="msvalidate.01" ...> tag.',
  },
  "microsoft-clarity": {
    label: "Microsoft Clarity",
    placement: "head",
    check: (nodes) => (/clarity\.ms\/tag\//.test(inlineScripts(nodes).join("\n")) ? null : "This does not look like the Microsoft Clarity snippet."),
  },
  "meta-pixel": {
    label: "Meta Pixel",
    placement: "head",
    check: (nodes) =>
      /connect\.facebook\.net\/[a-z_A-Z]+\/fbevents\.js/.test(inlineScripts(nodes).join("\n")) ? null : "This does not look like the Meta Pixel base code.",
  },
};

export type SnippetInput = {
  provider: SnippetProvider;
  placement: SnippetPlacement;
  scope: "all" | "pages" | "templates";
  code: string;
};

/** Returns human-readable validation errors; empty array means the snippet can be saved. */
export function validateSnippet(input: SnippetInput): string[] {
  const { nodes, errors } = parseSnippet(input.code);
  if (errors.length) return errors;
  if (input.provider !== "custom") {
    const rule = PROVIDER_RULES[input.provider];
    const err = rule.check(nodes);
    if (err) errors.push(err);
    if (rule.placement !== input.placement) {
      errors.push(`${rule.label} must be placed in ${placementLabel(rule.placement)}.`);
    }
  }
  if (input.placement === "head" && nodes.some((n) => n.tag === "noscript")) {
    errors.push("<noscript> fallbacks belong immediately after the opening <body> tag, not in <head>.");
  }
  if (input.scope !== "all") {
    if (input.placement === "bodyStart") {
      errors.push("Snippets that must sit immediately after <body> can only target all public pages.");
    }
    if (nodes.some((n) => n.tag === "script" && !n.attrs.src)) {
      errors.push(
        "Inline scripts can only target all public pages (they would not run after in-site navigation). Use an async external script, or target all pages.",
      );
    }
  }
  return errors;
}

export function placementLabel(p: SnippetPlacement) {
  return { head: "the <head>", bodyStart: "the start of <body>", bodyEnd: "the end of <body>" }[p];
}
