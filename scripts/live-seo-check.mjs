// Read-only SEO and redirect audit of a deployed site (GET requests only).
// Usage: node scripts/live-seo-check.mjs [origin] [out.json]
import { writeFileSync } from "node:fs";

const origin = (process.argv[2] || "https://topspotstudio.com").replace(/\/$/, "");
const out = process.argv[3];
const host = new URL(origin).host;
const bust = () => `_cb=${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const results = [];
let failed = 0;
const record = (area, name, ok, detail = "") => {
  results.push({ area, name, status: ok ? "PASS" : "FAIL", detail });
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  [${area}] ${name}${detail ? ` — ${detail}` : ""}`);
};

async function get(url, { redirect = "manual" } = {}) {
  const res = await fetch(url, { redirect, headers: { "user-agent": "TSS-live-seo-check/1.0", "cache-control": "no-cache" } });
  const body = redirect === "manual" && res.status >= 300 && res.status < 400 ? "" : await res.text();
  return { status: res.status, headers: res.headers, body, location: res.headers.get("location") };
}

function head(html) {
  const metaRobots = [...html.matchAll(/<meta name="robots" content="([^"]*)"/g)].map((m) => m[1]);
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => m[1]);
  const titles = [...html.matchAll(/<title>([^<]*)<\/title>/g)].map((m) => m[1]);
  const descriptions = [...html.matchAll(/<meta name="description" content="([^"]*)"/g)].map((m) => m[1]);
  return { metaRobots, canonicals, titles, descriptions };
}

async function chain(url, max = 6) {
  const hops = [];
  let current = url;
  for (let i = 0; i < max; i++) {
    const r = await get(current);
    if (r.status < 300 || r.status >= 400 || !r.location) return { hops, final: current, status: r.status };
    const next = new URL(r.location, current).toString();
    hops.push(`${r.status} ${next}`);
    current = next;
  }
  return { hops, final: current, status: "too many redirects" };
}

// robots.txt
const robots = await get(`${origin}/robots.txt?${bust()}`);
record("robots", "robots.txt 200", robots.status === 200, String(robots.status));
record("robots", "Allows crawling of the site", /^Allow: \/$/m.test(robots.body) && !/^Disallow: \/$/m.test(robots.body));
for (const p of ["/api/", "/admin/", "/cms-api/", "/preview/", "/exit-preview/"]) record("robots", `Disallows ${p}`, robots.body.includes(`Disallow: ${p}`));
record("robots", "Absolute sitemap URL", robots.body.includes(`Sitemap: ${origin}/sitemap.xml`));
record("robots", "No non-standard Host line", !/^Host:/m.test(robots.body), /^Host:/m.test(robots.body) ? "Host line present (ignored by Google; removed in the new build)" : "");
record("robots", "No X-Robots-Tag on robots.txt", !robots.headers.get("x-robots-tag"), robots.headers.get("x-robots-tag") || "");

// sitemap.xml
const sm = await get(`${origin}/sitemap.xml?${bust()}`);
const urls = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
record("sitemap", "sitemap.xml 200 with URLs", sm.status === 200 && urls.length > 0, `${sm.status}, ${urls.length} URLs`);
record("sitemap", "All sitemap URLs are canonical-origin https with trailing slash", urls.every((u) => u.startsWith(`${origin}/`) && u.endsWith("/")));
record("sitemap", "Blog and privacy policy excluded while gated", !urls.some((u) => /\/blog\/|\/privacy-policy\//.test(u)));

// Indexable public pages
const pages = [];
for (const u of urls) {
  const r = await get(`${u}?${bust()}`);
  const h = head(r.body);
  const xrt = r.headers.get("x-robots-tag");
  const ok =
    r.status === 200 && !xrt && h.metaRobots.length >= 1 && h.metaRobots.every((m) => /^index, follow/.test(m)) &&
    h.canonicals.length === 1 && h.canonicals[0] === u && h.titles.length === 1 && h.descriptions.length === 1;
  pages.push({ url: u, status: r.status, xRobotsTag: xrt, metaRobots: h.metaRobots, canonical: h.canonicals, title: h.titles[0] });
  record("indexable", new URL(u).pathname, ok, `${r.status} | X-Robots-Tag: ${xrt ?? "none"} | robots: ${h.metaRobots.join(" + ")} | canonical: ${h.canonicals.join(", ")}`);
}

// Intentionally gated (noindex) pages
for (const p of ["/blog/", "/privacy-policy/"]) {
  const r = await get(`${origin}${p}?${bust()}`);
  const h = head(r.body);
  record("gated", p, r.status === 200 && h.metaRobots.some((m) => m.startsWith("noindex")), `${r.status} | robots: ${h.metaRobots.join(" + ")} | canonical: ${h.canonicals.join(", ")}`);
}

// Private routes
for (const [p, expect] of [
  ["/admin/", (r) => /noindex/.test(r.headers.get("x-robots-tag") || "")],
  ["/cms-api/users/", (r) => r.status === 403 && /noindex/.test(r.headers.get("x-robots-tag") || "")],
  ["/cms-api/audit-logs/", (r) => r.status === 403 && /noindex/.test(r.headers.get("x-robots-tag") || "")],
  ["/preview/?path=/", (r) => r.status >= 300 && /noindex/.test(r.headers.get("x-robots-tag") || "")],
  ["/api/contact/", (r) => r.status === 405],
  ["/api/audit/", (r) => r.status === 405],
]) {
  const r = await get(`${origin}${p}`);
  record("private", p, expect(r), `${r.status} | X-Robots-Tag: ${r.headers.get("x-robots-tag") ?? "none"}${r.location ? ` | → ${r.location}` : ""}`);
}

// 404
const nf = await get(`${origin}/qa-no-such-page-${Date.now()}/`);
const nfh = head(nf.body);
record("404", "Unknown URL returns 404 with noindex", nf.status === 404 && nfh.metaRobots.some((m) => m.startsWith("noindex")), `robots tags: ${nfh.metaRobots.length} (${nfh.metaRobots.join(" + ")})`);
record("404", "Single robots meta tag on 404", nfh.metaRobots.length === 1, nfh.metaRobots.length === 1 ? "" : "duplicate tags (fixed in the new build)");

// Redirect chains
const www = `https://www.${host}`;
const httpApex = `http://${host}`;
const httpWww = `http://www.${host}`;
for (const [from, to] of [
  [`${www}/`, `${origin}/`],
  [`${www}/about/`, `${origin}/about/`],
  [`${www}/about`, `${origin}/about/`],
  [`${www}/about/?x=1`, `${origin}/about/?x=1`],
  [`${www}/robots.txt`, `${origin}/robots.txt`],
  [`${httpApex}/`, `${origin}/`],
  [`${httpApex}/about/`, `${origin}/about/`],
  [`${httpWww}/`, `${origin}/`],
  [`${httpWww}/about/`, `${origin}/about/`],
  [`${origin}/about`, `${origin}/about/`],
  [`${origin}/contact`, `${origin}/contact/`],
]) {
  const c = await chain(from);
  const reaches = c.final === to && c.status === 200;
  record("redirects", `${from} → ${to}`, reaches && c.hops.length <= 2, `${c.hops.length} hop(s): ${c.hops.join(" ⇒ ") || "none"}${reaches ? "" : ` | ended at ${c.final} (${c.status})`}`);
}

console.log(`\n${results.length - failed} passed, ${failed} failed`);
if (out) writeFileSync(out, JSON.stringify({ origin, checkedAt: new Date().toISOString(), results, pages }, null, 2));
process.exitCode = failed ? 1 : 0;
