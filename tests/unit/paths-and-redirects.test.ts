import { describe, expect, it } from "vitest";
import { isReservedPath, isSafeHref, normalizePath, slugify } from "@/cms/lib/paths";
import { checkRedirect, type RedirectContext } from "@/cms/lib/redirect-rules";

describe("paths", () => {
  it("normalises to lower-case paths with a trailing slash", () => {
    expect(normalizePath("About")).toBe("/about/");
    expect(normalizePath("//case-studies//x?utm=1#top")).toBe("/case-studies/x/");
    expect(normalizePath("https://topspotstudio.com/Contact")).toBe("/contact/");
    expect(normalizePath("/robots.txt")).toBe("/robots.txt");
  });

  it("reserves admin, API, preview and system files", () => {
    for (const p of ["/admin/", "/cms-api/pages/", "/api/contact/", "/preview/", "/sitemap.xml"]) expect(isReservedPath(p)).toBe(true);
    expect(isReservedPath("/administrator-tips/")).toBe(false);
  });

  it("only accepts safe link targets", () => {
    for (const h of ["/about/", "#faq", "https://example.com", "mailto:a@b.co", "tel:+6421"]) expect(isSafeHref(h)).toBe(true);
    for (const h of ["javascript:alert(1)", "//evil.com", "data:text/html,x", "", "/a b"]) expect(isSafeHref(h)).toBe(false);
  });

  it("slugifies titles", () => {
    expect(slugify("Roofing & Gutters: Café SEO!")).toBe("roofing-and-gutters-cafe-seo");
  });
});

describe("redirect rules", () => {
  const ctx = (over: Partial<RedirectContext> = {}): RedirectContext => ({
    livePaths: new Set(["/", "/about/", "/contact/"]),
    redirects: new Map(),
    siteHosts: ["topspotstudio.com", "www.topspotstudio.com"],
    allowExternal: false,
    ...over,
  });

  it("accepts a redirect from a retired path to a live page", () => {
    expect(checkRedirect({ from: "/old-about/", to: "/about/", external: false }, ctx())).toEqual([]);
  });

  it("blocks shadowing a live page, the homepage and reserved paths", () => {
    expect(checkRedirect({ from: "/contact/", to: "/about/", external: false }, ctx()).join(" ")).toMatch(/live page/);
    expect(checkRedirect({ from: "/", to: "/about/", external: false }, ctx()).join(" ")).toMatch(/homepage/);
    expect(checkRedirect({ from: "/admin/", to: "/about/", external: false }, ctx()).join(" ")).toMatch(/reserved/);
  });

  it("blocks chains and loops", () => {
    const chained = ctx({ redirects: new Map([["/older/", "/about/"]]) });
    expect(checkRedirect({ from: "/new-old/", to: "/older/", external: false }, chained).join(" ")).toMatch(/redirect chain/);
    const pointing = ctx({ redirects: new Map([["/a/", "/b/"]]) });
    expect(checkRedirect({ from: "/b/", to: "/about/", external: false }, pointing).join(" ")).toMatch(/already redirects/);
  });

  it("restricts external destinations", () => {
    expect(checkRedirect({ from: "/x/", to: "https://example.com/", external: true }, ctx()).join(" ")).toMatch(/Only admins/);
    expect(checkRedirect({ from: "/x/", to: "http://example.com/", external: true }, ctx({ allowExternal: true })).join(" ")).toMatch(/https/);
    expect(checkRedirect({ from: "/x/", to: "https://example.com/", external: true }, ctx({ allowExternal: true }))).toEqual([]);
    expect(checkRedirect({ from: "/x/", to: "https://topspotstudio.com/about/", external: true }, ctx())).toEqual([]);
    expect(checkRedirect({ from: "/x/", to: "//evil.com/", external: false }, ctx()).join(" ")).toMatch(/protocol-relative/);
  });
});
