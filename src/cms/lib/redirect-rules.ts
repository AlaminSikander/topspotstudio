import { isReservedPath, isValidPagePath, normalizePath } from "./paths";

export type RedirectCheckInput = {
  from: string;
  /** Resolved destination: a site path (/x/) or an absolute URL. */
  to: string;
  external: boolean;
};

export type RedirectContext = {
  /** Paths that currently render a live page (built-in routes, published CMS pages, published posts). */
  livePaths: Set<string>;
  /** Other enabled redirects: source path → destination. */
  redirects: Map<string, string>;
  /** Hosts considered "this website" (an external URL to these is treated as internal). */
  siteHosts: string[];
  /** Whether the current user may create external redirects. */
  allowExternal: boolean;
};

export function checkRedirect(input: RedirectCheckInput, ctx: RedirectContext): string[] {
  const errors: string[] = [];
  const from = normalizePath(input.from);

  if (!input.from.startsWith("/")) errors.push("Source must be a path on this website starting with /, e.g. /old-page/.");
  if (!isValidPagePath(from)) errors.push(`Source "${from}" contains characters that are not allowed. Use lower-case words and hyphens.`);
  if (from === "/") errors.push("The homepage cannot be redirected.");
  if (isReservedPath(from)) errors.push(`"${from}" is reserved by the website (admin, API, assets or preview) and cannot be redirected.`);
  if (ctx.livePaths.has(from)) {
    errors.push(`"${from}" is a live page. Redirecting it would hide that page; unpublish or move it first (owner approval required).`);
  }

  let to = input.to.trim();
  if (input.external) {
    let url: URL | null = null;
    try {
      url = new URL(to);
    } catch {
      errors.push("Destination URL is not valid.");
    }
    if (url) {
      if (url.protocol !== "https:") errors.push("External destinations must use https://.");
      if (ctx.siteHosts.includes(url.hostname)) {
        to = normalizePath(url.pathname);
      } else if (!ctx.allowExternal) {
        errors.push("Only admins can redirect to another website.");
      }
    }
  } else {
    if (!to.startsWith("/") || to.startsWith("//")) errors.push("Internal destinations must start with a single / (protocol-relative // URLs are not allowed).");
    to = normalizePath(to);
  }

  const internalTo = !/^https?:\/\//i.test(to);
  if (internalTo) {
    if (to === from) errors.push("Source and destination are the same.");
    if (ctx.redirects.has(to)) {
      errors.push(`Destination "${to}" is itself redirected to ${ctx.redirects.get(to)}. Point directly at the final URL to avoid a redirect chain.`);
    } else if (!ctx.livePaths.has(to) && !isReservedPath(to)) {
      errors.push(`Destination "${to}" is not a live page on this website.`);
    }
    // Loop detection across the whole redirect graph.
    const seen = new Set([from]);
    let cursor: string | undefined = to;
    while (cursor && ctx.redirects.has(cursor)) {
      if (seen.has(cursor)) break;
      seen.add(cursor);
      cursor = ctx.redirects.get(cursor);
      if (cursor === from) {
        errors.push("This redirect would create a loop.");
        break;
      }
    }
  }
  // Another redirect that points at this source would become a chain.
  for (const [src, dest] of ctx.redirects) {
    if (dest === from && src !== from) errors.push(`"${src}" already redirects to "${from}". Update it to point at the new destination instead of chaining.`);
  }
  return [...new Set(errors)];
}
