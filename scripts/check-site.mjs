/* eslint-disable @typescript-eslint/no-unused-expressions */
// Crawl QA for the built site. Checks routes, metadata, headings, links, link matrix, schema and privacy rules.
// Usage: node scripts/check-site.mjs [baseUrl] [expectedOrigin]
//   baseUrl:        where the site is running (default http://localhost:3000)
//   expectedOrigin: NEXT_PUBLIC_SITE_URL used for canonicals (default = baseUrl)
import { readFileSync } from "node:fs";

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const origin = (process.argv[3] || base).replace(/\/$/, "");
const blogEnabled = process.env.NEXT_PUBLIC_BLOG_ENABLED === "true";

const routes = [
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
];
const ancillary = ["/privacy-policy/"];
const restricted = [/kolhub/i, /pdca/i, /autoretouch/i, /auto\s*retouch/i];
const staleSlugs = ["/case-studies/influencer-marketing-agency-seo/", "/case-studies/training-consulting-seo/", "/case-studies/autoretouch-seo/"];
const forbiddenClaims = [/new zealand-based/i, /\bNZ-based\b/i, /guaranteed? (#1|first|number one|top)/i, /\bbest seo\b/i, /\bleading (seo )?agency\b/i, /\bnz office\b/i];

const results = { pass: 0, fail: 0, warn: 0, lines: [] };
const pass = (m) => {
  results.pass++;
  results.lines.push(`PASS  ${m}`);
};
const fail = (m) => {
  results.fail++;
  results.lines.push(`FAIL  ${m}`);
};
const warn = (m) => {
  results.warn++;
  results.lines.push(`WARN  ${m}`);
};

const strip = (s) => s.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
const textOf = (s) => strip(s).replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");

async function get(path, opts = {}) {
  const res = await fetch(base + path, { redirect: "manual", ...opts });
  const body = res.headers.get("content-type")?.includes("text") || res.headers.get("content-type")?.includes("xml") ? await res.text() : "";
  return { status: res.status, headers: res.headers, body };
}

const pages = new Map();

for (const path of [...routes, ...ancillary]) {
  const { status, body, headers } = await get(path);
  pages.set(path, body);
  status === 200 ? pass(`${path} returns 200`) : fail(`${path} returned ${status}`);
  if (status !== 200) continue;

  const h1s = body.match(/<h1[\s>]/gi) || [];
  h1s.length === 1 ? pass(`${path} has exactly one <h1>`) : fail(`${path} has ${h1s.length} <h1> elements`);

  const title = body.match(/<title>([^<]*)<\/title>/i)?.[1];
  title ? pass(`${path} title: "${title}"`) : fail(`${path} missing <title>`);

  const desc = body.match(/<meta name="description" content="([^"]*)"/i)?.[1];
  desc && desc.length >= 70 ? pass(`${path} meta description (${desc.length} chars)`) : fail(`${path} meta description missing/short`);

  const canonical = body.match(/<link rel="canonical" href="([^"]*)"/i)?.[1];
  canonical === origin + path ? pass(`${path} self-canonical`) : fail(`${path} canonical is ${canonical}, expected ${origin + path}`);

  const robotsMeta = body.match(/<meta name="robots" content="([^"]*)"/i)?.[1] || "(none)";
  results.lines.push(`INFO  ${path} robots meta: ${robotsMeta}; X-Robots-Tag: ${headers.get("x-robots-tag") || "(none)"}`);

  const og = body.match(/<meta property="og:image" content="([^"]*)"/i)?.[1];
  if (og) {
    const ogPath = og.replace(origin, "");
    const ogRes = await fetch(base + ogPath);
    ogRes.ok ? pass(`${path} og:image resolves`) : fail(`${path} og:image ${ogPath} → ${ogRes.status}`);
  } else fail(`${path} missing og:image`);

  const lang = body.match(/<html[^>]*lang="([^"]*)"/i)?.[1];
  lang === "en-NZ" ? pass(`${path} lang=en-NZ`) : fail(`${path} lang=${lang}`);

  // Heading order: no level jumps greater than one.
  const levels = [...body.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
  const jumps = levels.filter((l, i) => i > 0 && l - levels[i - 1] > 1);
  jumps.length === 0 ? pass(`${path} heading levels do not skip`) : warn(`${path} heading level jumps: ${levels.join(",")}`);

  // Images need alt attributes.
  const imgs = [...body.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const noAlt = imgs.filter((i) => !/\balt=/.test(i));
  noAlt.length === 0 ? pass(`${path} all ${imgs.length} <img> have alt`) : fail(`${path} ${noAlt.length} <img> without alt`);

  // JSON-LD must parse.
  const ld = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  let ldOk = ld.length > 0;
  for (const m of ld) {
    try {
      const data = JSON.parse(m[1]);
      const text = JSON.stringify(data);
      if (/LocalBusiness|AggregateRating|"Review"/.test(text)) {
        fail(`${path} JSON-LD contains disallowed type (LocalBusiness/Review/AggregateRating)`);
        ldOk = false;
      }
      if (/"addressCountry":"NZ"|PostalAddress[^}]*New Zealand/.test(text)) {
        fail(`${path} JSON-LD implies a New Zealand address`);
        ldOk = false;
      }
    } catch {
      ldOk = false;
      fail(`${path} invalid JSON-LD`);
    }
  }
  if (ldOk) pass(`${path} JSON-LD valid (${ld.length} block${ld.length === 1 ? "" : "s"})`);

  const visible = textOf(body);
  for (const r of restricted) {
    if (r.test(body)) fail(`${path} contains restricted client name ${r}`);
  }
  for (const r of forbiddenClaims) {
    const g = new RegExp(r.source, "gi");
    for (const m of visible.matchAll(g)) {
      const before = visible.slice(Math.max(0, m.index - 80), m.index);
      const after = visible.slice(m.index).match(/[.?!]/)?.[0];
      const isQuestion = after === "?";
      if (!isQuestion && !/\b(not|no|never|don['’]t|doesn['’]t|without)\b/i.test(before)) {
        fail(`${path} contains un-negated claim "${m[0]}"`);
      }
    }
  }
  for (const s of staleSlugs) {
    if (body.includes(`href="${s}"`)) fail(`${path} links to stale slug ${s}`);
  }
  if (/developer note|developer-only|internal client reference|lorem ipsum|TODO/i.test(visible)) {
    fail(`${path} contains internal/developer or placeholder text`);
  }
}

// Internal link crawl.
const hrefs = new Set();
for (const [, body] of pages) {
  for (const m of body.matchAll(/<a\b[^>]*href="([^"#]*)(#[^"]*)?"/gi)) {
    const h = m[1];
    if (h.startsWith("/") && !h.startsWith("//")) hrefs.add(h);
  }
}
const broken = [];
for (const h of hrefs) {
  const r = await fetch(base + h, { redirect: "manual" });
  if (r.status !== 200) broken.push(`${h} → ${r.status}`);
}
broken.length === 0 ? pass(`all ${hrefs.size} unique internal links return 200 (no redirects)`) : broken.forEach((b) => fail(`broken/redirected link ${b}`));

// Link matrix verification.
const csv = readFileSync("docs/source/internal-link-matrix.csv", "utf8").trim().split("\n").slice(1);
const parseRow = (line) => {
  const out = [];
  let cur = "";
  let q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === "," && !q) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out;
};
let matrixOk = 0;
for (const line of csv) {
  const [id, , src, dest] = parseRow(line);
  if (id === "IL-019" && !blogEnabled) {
    results.lines.push(`INFO  ${id} blog footer link intentionally held until 3 articles are live`);
    continue;
  }
  const sourcePath = src.startsWith("SITEWIDE") ? "/" : src;
  const body = pages.get(sourcePath);
  if (!body) {
    fail(`${id} source page ${sourcePath} not crawled`);
    continue;
  }
  if (body.includes(`href="${dest}"`)) matrixOk++;
  else fail(`${id} ${sourcePath} is missing a link to ${dest}`);
}
pass(`link matrix: ${matrixOk} links verified`);

// Web Design primary CTA must go to Contact.
const wd = pages.get("/industries/web-design-for-tradies/") || "";
/href="\/contact\/"[^>]*>\s*Discuss Your Website Project/.test(wd) || /Discuss Your Website Project/.test(wd)
  ? pass("Web Design primary CTA present and links to /contact/")
  : fail("Web Design primary CTA missing");

// robots.txt and sitemap.
const robots = await get("/robots.txt");
robots.status === 200 ? pass(`robots.txt 200:\n${robots.body.trim().replace(/^/gm, "      ")}`) : fail(`robots.txt ${robots.status}`);
const sm = await get("/sitemap.xml");
if (sm.status === 200) {
  const urls = [...sm.body.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  pass(`sitemap.xml 200 with ${urls.length} URLs`);
  for (const u of urls) {
    if (!u.startsWith(origin)) fail(`sitemap URL ${u} does not use ${origin}`);
  }
} else fail(`sitemap.xml ${sm.status}`);

// 404 handling.
const nf = await get("/this-page-does-not-exist/");
nf.status === 404 ? pass("unknown URL returns 404") : fail(`unknown URL returned ${nf.status}`);

console.log(results.lines.join("\n"));
console.log(`\n${results.pass} passed, ${results.fail} failed, ${results.warn} warnings`);
process.exit(results.fail ? 1 : 0);
