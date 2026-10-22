// QA-only: adds two hidden broken footer links, checks Link Manager + dashboard, then restores the footer.
import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3100";
const out = process.argv[3] || ".tmp";
const { CMS_ADMIN_EMAIL, CMS_ADMIN_PASSWORD } = process.env;
if (!base.includes("localhost")) throw new Error("QA server only");

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
const api = (method, path, data) =>
  ctx.request.fetch(`${base}/cms-api${path}`, { method, headers: { Origin: base, "Content-Type": "application/json" }, data });

await page.goto(`${base}/admin/login/`, { waitUntil: "networkidle" });
await page.fill('input[name="email"]', CMS_ADMIN_EMAIL);
await page.fill('input[name="password"]', CMS_ADMIN_PASSWORD);
await page.click('button[type="submit"]');
await page.waitForURL((u) => !u.pathname.includes("/login"), { timeout: 30000 });

const original = await (await api("GET", "/globals/footer/?depth=0")).json();
const strip = ({ id, createdAt, updatedAt, globalType, ...rest }) => rest;
const footerHtmlBefore = (await (await ctx.request.get(`${base}/about/`)).text()).match(/<footer[\s\S]*<\/footer>/)?.[0];

const broken = [
  { label: "QA missing page", linkType: "custom", url: "/qa-missing-page/", visibility: "hidden" },
  { label: "QA missing anchor", linkType: "custom", url: "/about/#qa-no-such-anchor", visibility: "hidden" },
];
const res = await api("POST", "/globals/footer/", { ...strip(original), bottomLinks: [...(original.bottomLinks ?? []), ...broken] });
console.log("add test links:", res.status());

const results = [];
try {
  await page.goto(`${base}/admin/link-manager/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const lm = await page.locator("body").innerText();
  const row = (href) => lm.split("\n").find((l) => l.includes(href)) ?? "";
  results.push(["Link Manager lists /qa-missing-page/ as Broken", /broken/i.test(lm.slice(lm.indexOf("/qa-missing-page/") - 300, lm.indexOf("/qa-missing-page/") + 300))]);
  results.push(["Link Manager lists /about/#qa-no-such-anchor as missing anchor", /anchor/i.test(lm.slice(lm.indexOf("#qa-no-such-anchor") - 300, lm.indexOf("#qa-no-such-anchor") + 300))]);
  console.log("rows:", JSON.stringify(row("/qa-missing-page/")), JSON.stringify(row("#qa-no-such-anchor")));
  await page.screenshot({ path: `${out}/link-manager-broken-links.jpg`, type: "jpeg", quality: 70, fullPage: true });

  await page.goto(`${base}/admin/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const dash = await page.locator("body").innerText();
  const m = dash.match(/(\d+)\s*\n\s*Broken internal links/);
  results.push([`Dashboard broken-link count shows 2 (got ${m?.[1]})`, m?.[1] === "2"]);
  await page.screenshot({ path: `${out}/dashboard-broken-links.jpg`, type: "jpeg", quality: 70 });
} finally {
  const r = await api("POST", "/globals/footer/", strip(original));
  console.log("restore footer:", r.status());
}

const restored = await (await api("GET", "/globals/footer/?depth=0")).json();
results.push(["Footer restored to original content", JSON.stringify(strip(restored).bottomLinks) === JSON.stringify(strip(original).bottomLinks) && JSON.stringify(restored.columns) === JSON.stringify(original.columns)]);
await page.goto(`${base}/admin/`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const m2 = (await page.locator("body").innerText()).match(/(\d+)\s*\n\s*Broken internal links/);
results.push([`Dashboard broken-link count back to 0 (got ${m2?.[1]})`, m2?.[1] === "0"]);
await new Promise((r) => setTimeout(r, 1500));
const footerHtmlAfter = (await (await ctx.request.get(`${base}/about/`)).text()).match(/<footer[\s\S]*<\/footer>/)?.[0];
results.push(["Public footer HTML identical before/after", footerHtmlBefore === footerHtmlAfter]);
results.push(["Hidden test links never rendered publicly", !footerHtmlAfter?.includes("qa-missing")]);

for (const [name, ok] of results) console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
await browser.close();
process.exit(results.every(([, ok]) => ok) ? 0 : 1);
