// Logs in to the CMS admin and captures key screens. Credentials come from the environment only.
// Usage: CMS_EMAIL=… CMS_PASSWORD=… node scripts/admin-screens.mjs [baseUrl] [outDir]
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const out = process.argv[3] || ".tmp/admin-shots";
const { CMS_EMAIL, CMS_PASSWORD } = process.env;
if (!CMS_EMAIL || !CMS_PASSWORD) throw new Error("Set CMS_EMAIL and CMS_PASSWORD");

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const problems = [];
page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
page.on("console", (m) => m.type() === "error" && problems.push(`console: ${m.text().slice(0, 200)}`));

await page.goto(`${base}/admin/login/`, { waitUntil: "networkidle" });
await page.fill('input[name="email"]', CMS_EMAIL);
await page.fill('input[name="password"]', CMS_PASSWORD);
await page.click('button[type="submit"]');
await page.waitForURL((u) => !u.pathname.includes("/login"), { timeout: 30000 });
await page.waitForLoadState("networkidle");

const shots = [
  ["dashboard", "/admin/"],
  ["pages-list", "/admin/collections/pages/"],
  ["seo-manager", "/admin/seo-manager/"],
  ["link-manager", "/admin/link-manager/"],
  ["redirects", "/admin/collections/redirects/"],
  ["tracking-codes", "/admin/collections/code-snippets/create/"],
  ["posts", "/admin/collections/posts/"],
  ["navigation", "/admin/globals/navigation/"],
];
for (const [name, path] of process.env.ONLY_EDITOR ? [] : shots) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${out}/${name}.jpg`, type: "jpeg", quality: 70, fullPage: name !== "dashboard" });
  console.log(`captured ${name}`);
}

// Page editor: first page in the list, content and SEO tabs.
await page.goto(`${base}/admin/collections/pages/`, { waitUntil: "networkidle" });
const href = await page.locator('a[href*="/admin/collections/pages/"]').filter({ hasText: "SEO Services NZ" }).first().getAttribute("href");
await page.goto(base + href, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: `${out}/page-editor.jpg`, type: "jpeg", quality: 70 });
const tab = (label) => page.locator("button.tabs-field__tab-button", { hasText: new RegExp(`^${label}$`) }).first().click({ force: true });
await tab("SEO");
await page.waitForTimeout(800);
await page.screenshot({ path: `${out}/page-seo-tab.jpg`, type: "jpeg", quality: 70, fullPage: true });
await tab("Structured data");
await page.waitForTimeout(1500);
await page.screenshot({ path: `${out}/page-structured-data.jpg`, type: "jpeg", quality: 70, fullPage: true });

await browser.close();
console.log(problems.length ? `Problems:\n${[...new Set(problems)].join("\n")}` : "No page errors.");
