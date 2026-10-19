// Full-page screenshots + console/network error capture across breakpoints.
// Usage: node scripts/screenshots.mjs [baseUrl] [path ...]
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.argv[2] || "http://localhost:3000";
const paths = process.argv.slice(3).length
  ? process.argv.slice(3)
  : [
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
const viewports = (process.env.VIEWPORTS || "375,768,1440").split(",").map(Number);
const outDir = process.env.OUT || ".tmp/shots";

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const problems = [];

for (const vw of viewports) {
  // Reduced motion disables the scroll-driven reveal so below-the-fold content appears in static captures.
  const context = await browser.newContext({
    viewport: { width: vw, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  for (const p of paths) {
    const page = await context.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error" || msg.type() === "warning") problems.push(`[${vw}] ${p} console.${msg.type()}: ${msg.text()}`);
    });
    page.on("pageerror", (err) => problems.push(`[${vw}] ${p} pageerror: ${err.message}`));
    page.on("response", (res) => {
      if (res.status() >= 400) problems.push(`[${vw}] ${p} HTTP ${res.status()} ${res.url()}`);
    });
    await page.goto(base + p, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(250);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) problems.push(`[${vw}] ${p} horizontal overflow ${overflow}px`);
    const name = p === "/" ? "home" : p.replace(/^\/|\/$/g, "").replace(/\//g, "_");
    await page.screenshot({ path: `${outDir}/${name}-${vw}.jpg`, fullPage: true, type: "jpeg", quality: 60 });
    await page.close();
  }
  await context.close();
}
await browser.close();
console.log(problems.length ? problems.join("\n") : "No console errors, failed requests or overflow detected.");
