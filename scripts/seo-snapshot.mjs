// Raw-HTML SEO snapshot of every route (no browser, no JS): what a crawler sees in the initial response.
// Usage: node scripts/seo-snapshot.mjs <baseUrl> <out.csv> [extraPath ...]
// Writes one CSV row per route, plus <out>.extras.md with robots.txt, sitemap.xml, headers and 404 behaviour.
import { writeFileSync } from "node:fs";

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const out = process.argv[3] || ".tmp/seo-snapshot.csv";
const extra = process.argv.slice(4);

export const ROUTES = [
  "/",
  "/markets/new-zealand/seo/",
  "/markets/new-zealand/local-seo/",
  "/industries/seo-for-tradies/",
  "/industries/roofing-seo/",
  "/industries/web-design-for-tradies/",
  "/case-studies/",
  "/case-studies/influencer-marketing-agency-seo-growth/",
  "/case-studies/training-consulting-seo-growth/",
  "/case-studies/ai-image-editing-seo-growth/",
  "/free-seo-audit/",
  "/about/",
  "/contact/",
  "/blog/",
  "/privacy-policy/",
];

const decode = (s = "") =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x2F;/g, "/");
const meta = (html, attr, name) => {
  const re = new RegExp(`<meta[^>]*${attr}="${name}"[^>]*>`, "gi");
  return [...html.matchAll(re)].map((m) => decode(m[0].match(/content="([^"]*)"/i)?.[1] ?? ""));
};
const csv = (v) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const stripTags = (s) =>
  decode(s.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

function ldTypes(html) {
  const types = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(m[1]);
      const nodes = data["@graph"] ?? [data];
      for (const n of nodes) types.push(n["@type"]);
    } catch {
      types.push("INVALID_JSON");
    }
  }
  return types;
}

async function fetchFollow(url, max = 5) {
  const chain = [];
  let current = url;
  for (let i = 0; i <= max; i++) {
    const res = await fetch(current, { redirect: "manual", headers: { "user-agent": "TSS-SEO-Snapshot/1.0" } });
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      chain.push(`${res.status} ${current}`);
      current = new URL(res.headers.get("location"), current).toString();
      continue;
    }
    const type = res.headers.get("content-type") || "";
    const body = /text|xml|json/.test(type) ? await res.text() : "";
    return { res, body, finalUrl: current, chain };
  }
  throw new Error(`Too many redirects for ${url}`);
}

const header = [
  "url",
  "http_status",
  "redirect_chain",
  "final_url",
  "title",
  "title_count",
  "description",
  "description_count",
  "h1",
  "h1_count",
  "canonical",
  "canonical_count",
  "robots_meta",
  "x_robots_tag",
  "og_title",
  "og_description",
  "og_url",
  "og_image",
  "twitter_card",
  "twitter_title",
  "twitter_description",
  "twitter_image",
  "jsonld_types",
  "internal_link_count",
  "internal_links_sample",
  "img_count",
  "img_missing_alt",
  "img_alts_sample",
  "content_excerpt",
];
const rows = [header.join(",")];

for (const path of [...ROUTES, ...extra]) {
  const url = base + path;
  try {
    const { res, body, finalUrl, chain } = await fetchFollow(url);
    const titles = [...body.matchAll(/<title>([^<]*)<\/title>/gi)].map((m) => decode(m[1]));
    const descs = meta(body, "name", "description");
    const h1s = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1]));
    const canon = [...body.matchAll(/<link[^>]*rel="canonical"[^>]*>/gi)].map((m) => m[0].match(/href="([^"]*)"/)?.[1] ?? "");
    const links = [
      ...new Set(
        [...body.matchAll(/<a\b[^>]*href="([^"]*)"/gi)].map((m) => decode(m[1])).filter((h) => h.startsWith("/") && !h.startsWith("//")),
      ),
    ];
    const imgs = [...body.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
    const alts = imgs.map((i) => i.match(/alt="([^"]*)"/)?.[1]).filter((a) => a !== undefined);
    const mainHtml = body.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? body;
    const row = [
      url,
      res.status,
      chain.join(" > "),
      finalUrl,
      titles[0],
      titles.length,
      descs[0],
      descs.length,
      h1s[0],
      h1s.length,
      canon[0],
      canon.length,
      meta(body, "name", "robots")[0] ?? "(none)",
      res.headers.get("x-robots-tag") ?? "(none)",
      meta(body, "property", "og:title")[0],
      meta(body, "property", "og:description")[0],
      meta(body, "property", "og:url")[0],
      meta(body, "property", "og:image")[0],
      meta(body, "name", "twitter:card")[0],
      meta(body, "name", "twitter:title")[0],
      meta(body, "name", "twitter:description")[0],
      meta(body, "name", "twitter:image")[0],
      ldTypes(body).join("|"),
      links.length,
      links.slice(0, 40).join(" "),
      imgs.length,
      imgs.length - alts.length,
      alts.slice(0, 10).map(decode).join(" | "),
      stripTags(mainHtml).slice(0, 300),
    ];
    rows.push(row.map(csv).join(","));
    console.log(`${res.status} ${path}`);
  } catch (err) {
    rows.push([url, "ERROR", "", "", String(err.message)].map(csv).join(","));
    console.log(`ERROR ${path} ${err.message}`);
  }
}
writeFileSync(out, `${rows.join("\n")}\n`);

// Site-wide extras: robots, sitemap, headers, 404, trailing-slash and host redirects.
const extras = [`# Site-wide snapshot for ${base}`, "", `Captured: ${new Date().toISOString()}`, ""];
for (const p of ["/robots.txt", "/sitemap.xml"]) {
  const { res, body, chain } = await fetchFollow(base + p);
  extras.push(`## ${p}`, "", `Status: ${res.status}${chain.length ? ` (via ${chain.join(" > ")})` : ""}`, "", "```", body.trim().slice(0, 6000), "```", "");
}
const home = await fetch(base + "/", { redirect: "manual" });
extras.push("## Response headers for /", "", "```");
for (const [k, v] of home.headers) if (!/^set-cookie$/i.test(k)) extras.push(`${k}: ${v}`);
extras.push("```", "");
const nf = await fetch(base + "/this-page-does-not-exist-tss/", { redirect: "manual" });
extras.push("## 404 behaviour", "", `/this-page-does-not-exist-tss/ → ${nf.status}; x-robots-tag: ${nf.headers.get("x-robots-tag") ?? "(none)"}`, "");
const noSlash = await fetch(base + "/about", { redirect: "manual" });
extras.push("## Trailing slash", "", `/about → ${noSlash.status} ${noSlash.headers.get("location") ?? ""}`, "");
writeFileSync(out.replace(/\.csv$/, ".extras.md"), `${extras.join("\n")}\n`);
console.log(`Wrote ${out}`);
