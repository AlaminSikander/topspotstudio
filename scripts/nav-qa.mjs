// Navigation & keyboard QA: mobile menu, Industries disclosure, skip link, focus visibility.
// Usage: node scripts/nav-qa.mjs [baseUrl]
import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3000";
const browser = await chromium.launch();
const out = [];
const check = (name, ok, detail = "") => out.push(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);

// Desktop keyboard flow.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => document.activeElement?.textContent?.trim());
  check("first Tab reaches skip link", skip === "Skip to main content", skip);
  await page.keyboard.press("Enter");
  const hash = await page.evaluate(() => location.hash);
  check("skip link moves to #main", hash === "#main");

  await page.goto(base + "/", { waitUntil: "networkidle" });
  const btn = page.locator('header button[aria-controls="industries-menu"]');
  await btn.focus();
  const outline = await btn.evaluate((el) => getComputedStyle(el).outlineStyle);
  check("Industries button shows a visible focus outline", outline !== "none", outline);
  await page.keyboard.press("Enter");
  check("Enter opens Industries menu", (await btn.getAttribute("aria-expanded")) === "true");
  await page.keyboard.press("Tab");
  const firstItem = await page.evaluate(() => document.activeElement?.getAttribute("href"));
  check("Tab moves into the Industries links", firstItem === "/industries/seo-for-tradies/", firstItem);
  await page.keyboard.press("Escape");
  check("Escape closes Industries menu", (await btn.getAttribute("aria-expanded")) === "false");

  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(400);
  const sticky = await page.evaluate(() => {
    const h = document.querySelector("header");
    return h ? getComputedStyle(h).position + ":" + Math.round(h.getBoundingClientRect().top) : "none";
  });
  check("header is sticky after scrolling", sticky === "sticky:0", sticky);

  const ctaCount = await page.locator('header a[href="/free-seo-audit/"]').count();
  check("header includes Free SEO Audit CTA", ctaCount >= 1);
  await page.close();
}

// Mobile menu.
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const toggle = page.locator('button[aria-controls="mobile-menu"]');
  check("mobile menu toggle visible", await toggle.isVisible());
  await toggle.click();
  check("mobile menu opens", (await toggle.getAttribute("aria-expanded")) === "true");
  const links = await page.locator("#mobile-menu a").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
  const expected = ["/markets/new-zealand/seo/", "/markets/new-zealand/local-seo/", "/industries/seo-for-tradies/", "/industries/roofing-seo/", "/industries/web-design-for-tradies/", "/case-studies/", "/about/", "/contact/", "/free-seo-audit/"];
  check("mobile menu has all nav links + audit CTA", expected.every((e) => links.includes(e)), links.join(" "));
  const ctaBox = await page.locator('#mobile-menu a[href="/free-seo-audit/"]').boundingBox();
  check("mobile audit CTA is full-width and ≥44px tall", ctaBox && ctaBox.width > 300 && ctaBox.height >= 44, ctaBox ? `${Math.round(ctaBox.width)}×${Math.round(ctaBox.height)}` : "");
  await page.keyboard.press("Escape");
  check("Escape closes mobile menu", (await toggle.getAttribute("aria-expanded")) === "false");
  await toggle.click();
  await page.click('#mobile-menu a[href="/about/"]');
  await page.waitForURL("**/about/");
  check("menu closes after navigating", (await toggle.getAttribute("aria-expanded")) === "false");

  // Tap targets for primary buttons.
  await page.goto(base + "/free-seo-audit/", { waitUntil: "networkidle" });
  const small = await page.evaluate(() =>
    [...document.querySelectorAll("main a.min-h-12, main button[type=submit]")]
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.height > 0 && r.height < 44).length,
  );
  check("primary buttons meet 44px tap target", small === 0, `${small} too small`);
  await page.close();
}

await browser.close();
console.log(out.join("\n"));
process.exit(out.some((l) => l.startsWith("FAIL")) ? 1 : 0);
