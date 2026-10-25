// Read-only check that published CMS content is what the public server-rendered HTML serves.
// Compares, per published page: <title>, meta description, canonical, robots and block headings.
// Usage: node scripts/cms-render-parity.mjs [origin] [out.json]
import { writeFileSync } from "node:fs";

const origin = (process.argv[2] || "https://topspotstudio.com").replace(/\/$/, "");
const out = process.argv[3];
const SITE_NAME = "Top Spot Studio";
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const norm = (s) => decode(String(s ?? "")).replace(/\s+/g, " ").trim();

const api = await (await fetch(`${origin}/cms-api/pages/?depth=0&limit=200&where%5B_status%5D%5Bequals%5D=published`)).json();
const results = [];
let failed = 0;

function headings(layout) {
  const found = [];
  for (const block of layout ?? []) for (const key of ["heading", "title", "headline"]) if (typeof block?.[key] === "string" && block[key].trim()) found.push(block[key]);
  return found;
}

for (const page of api.docs) {
  const seo = page.seo ?? {};
  const res = await fetch(`${origin}${page.path}?_cb=${Date.now()}`, { headers: { "cache-control": "no-cache" } });
  const html = await res.text();
  const title = norm(html.match(/<title>([^<]*)<\/title>/)?.[1]);
  const description = norm(html.match(/<meta name="description" content="([^"]*)"/)?.[1]);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
  const text = norm(html.replace(/<[^>]+>/g, " "));

  const base = seo.metaTitle?.trim() || page.title;
  const expectedTitle = norm(seo.appendBrand ? `${base} | ${SITE_NAME}` : base);
  const expectedCanonical = seo.canonicalUrl || `${origin}${page.path}`;
  const missingHeadings = headings(page.layout).filter((h) => !text.includes(norm(h)));
  const checks = {
    status: res.status === 200,
    title: title === expectedTitle,
    description: !seo.metaDescription?.trim() || description === norm(seo.metaDescription),
    canonical: canonical === expectedCanonical,
    robots: seo.robotsIndex === "noindex" ? robots.startsWith("noindex") : true,
    headings: missingHeadings.length === 0,
  };
  const ok = Object.values(checks).every(Boolean);
  if (!ok) failed++;
  const detail = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
  results.push({ path: page.path, updatedAt: page.updatedAt, ok, failedChecks: detail, title, expectedTitle, canonical, robots, headingsChecked: headings(page.layout).length, missingHeadings });
  console.log(`${ok ? "PASS" : "FAIL"}  ${page.path}  (title, description, canonical, robots, ${headings(page.layout).length} headings)${detail.length ? ` — mismatch: ${detail.join(", ")}` : ""}`);
}

console.log(`\n${api.docs.length - failed}/${api.docs.length} published pages match the server-rendered HTML`);
if (out) writeFileSync(out, JSON.stringify({ origin, checkedAt: new Date().toISOString(), results }, null, 2));
process.exitCode = failed ? 1 : 0;
