// Compares the server-rendered HTML of two running builds route by route (e.g. pre-CMS baseline vs CMS build).
// Usage: node scripts/parity-diff.mjs <baselineUrl> <candidateUrl> [out.json]
// Reports: visible text, headings, links, image alts, JSON-LD (deep), <head> SEO tags and element/class structure.
import { writeFileSync } from "node:fs";

const [a, b, out = ".tmp/parity.json"] = process.argv.slice(2);
const ROUTES = [
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
  "/this-page-does-not-exist-tss/",
];

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, " ");
const stripScripts = (s) => s.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<template[\s\S]*?<\/template>/gi, "");
const text = (s) => decode(stripScripts(s).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const body = (html) => html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;

function sortKeys(v) {
  if (Array.isArray(v)) return v.map(sortKeys);
  if (v && typeof v === "object") return Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])]));
  return v;
}

function extract(html) {
  const b = body(html);
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((m) => /name="|property="/.test(m))
    .map((m) => `${m.match(/(?:name|property)="([^"]*)"/)[1]}=${decode(m.match(/content="([^"]*)"/)?.[1] ?? "")}`)
    .sort();
  const links = [...head.matchAll(/<link\b[^>]*rel="(canonical|alternate)"[^>]*>/gi)].map((m) => m[0].match(/href="([^"]*)"/)?.[1]).sort();
  const title = head.match(/<title>([^<]*)<\/title>/)?.[1];
  const jsonld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((m) => {
    try {
      return JSON.stringify(sortKeys(JSON.parse(m[1])));
    } catch {
      return "INVALID";
    }
  });
  const headings = [...b.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => `h${m[1]}: ${text(m[2])}`);
  const anchors = [...b.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((m) => `${decode(m[1].match(/href="([^"]*)"/)?.[1] ?? "")} | ${text(m[2])}`);
  const imgs = [...b.matchAll(/<img\b[^>]*>/gi)].map((m) => decode(m[0].match(/alt="([^"]*)"/)?.[1] ?? "(no alt)"));
  const structure = [...stripScripts(b).matchAll(/<([a-z][a-z0-9]*)\b([^>]*)>/gi)]
    .map((m) => {
      const cls = (m[2].match(/class="([^"]*)"/)?.[1] ?? "").split(/\s+/).filter(Boolean).sort().join(".");
      return `${m[1].toLowerCase()}${cls ? `.${cls}` : ""}`;
    })
    .filter((t) => !/^(path|polygon|rect|circle|line|g|defs|stop|lineargradient|radialgradient|svg|ellipse|polyline)/.test(t));
  return { title, metas, links, jsonld, headings, anchors, imgs, text: text(b), structure };
}

function seqDiff(x, y) {
  // Longest-common-subsequence size → similarity ratio, plus first differing positions.
  const n = x.length;
  const m = y.length;
  const prev = new Array(m + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    let diag = 0;
    for (let j = 1; j <= m; j++) {
      const tmp = prev[j];
      prev[j] = x[i - 1] === y[j - 1] ? diag + 1 : Math.max(prev[j], prev[j - 1]);
      diag = tmp;
    }
  }
  const lcs = prev[m];
  const removed = x.filter((t) => !y.includes(t));
  const added = y.filter((t) => !x.includes(t));
  return { similarity: n + m ? (2 * lcs) / (n + m) : 1, removed: [...new Set(removed)].slice(0, 15), added: [...new Set(added)].slice(0, 15), before: n, after: m };
}

const listDiff = (x, y) => ({ missing: x.filter((v) => !y.includes(v)), extra: y.filter((v) => !x.includes(v)) });

const report = [];
for (const path of ROUTES) {
  const [ra, rb] = await Promise.all([fetch(a + path), fetch(b + path)]);
  const [ha, hb] = await Promise.all([ra.text(), rb.text()]);
  const ea = extract(ha);
  const eb = extract(hb);
  const swap = (s) => s.replaceAll(a, "").replaceAll(b, "");
  const r = {
    path,
    status: [ra.status, rb.status],
    title: ea.title === eb.title,
    metas: listDiff(ea.metas, eb.metas),
    canonical: listDiff(ea.links, eb.links),
    jsonld: ea.jsonld.length === eb.jsonld.length && ea.jsonld.every((j, i) => j === eb.jsonld[i]) ? "identical" : { before: ea.jsonld.map(swap), after: eb.jsonld.map(swap) },
    headings: listDiff(ea.headings, eb.headings),
    anchors: listDiff(ea.anchors, eb.anchors),
    imgs: listDiff(ea.imgs, eb.imgs),
    textIdentical: ea.text === eb.text,
    textDiff: ea.text === eb.text ? null : firstDiff(ea.text, eb.text),
    structure: seqDiff(ea.structure, eb.structure),
  };
  report.push(r);
  const flags = [
    r.status[0] === r.status[1] ? "" : `status ${r.status}`,
    r.title ? "" : "title",
    r.metas.missing.length + r.metas.extra.length ? "meta" : "",
    r.canonical.missing.length + r.canonical.extra.length ? "canonical" : "",
    r.jsonld === "identical" ? "" : "jsonld",
    r.headings.missing.length + r.headings.extra.length ? "headings" : "",
    r.anchors.missing.length + r.anchors.extra.length ? "links" : "",
    r.imgs.missing.length + r.imgs.extra.length ? "images" : "",
    r.textIdentical ? "" : "text",
  ].filter(Boolean);
  console.log(`${path.padEnd(56)} ${flags.length ? `DIFF: ${flags.join(", ")}` : "identical content/SEO"}  structure ${(r.structure.similarity * 100).toFixed(1)}%`);
}

function firstDiff(x, y) {
  let i = 0;
  while (i < x.length && x[i] === y[i]) i++;
  return { at: i, before: x.slice(Math.max(0, i - 80), i + 160), after: y.slice(Math.max(0, i - 80), i + 160) };
}

writeFileSync(out, JSON.stringify(report, null, 2));
console.log(`Wrote ${out}`);
