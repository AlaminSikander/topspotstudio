// End-to-end form QA: validation errors, success state and dataLayer events.
// Usage: node scripts/form-qa.mjs [baseUrl]
import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3000";
const browser = await chromium.launch();
const results = [];
const check = (name, ok, detail = "") => results.push(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);

async function run(viewport) {
  const page = await browser.newPage({ viewport });
  const tag = `[${viewport.width}px]`;

  // Free SEO Audit
  await page.goto(`${base}/free-seo-audit/`, { waitUntil: "networkidle" });
  await page.click('a[href="#audit-form"] >> nth=0');
  await page.waitForTimeout(600);
  const formVisible = await page.locator("#audit-form").isVisible();
  check(`${tag} audit hero CTA scrolls to form`, formVisible);

  await page.click('button[type="submit"]:has-text("Get My Free SEO Audit")');
  const errorCount = await page.locator('#audit-form [id$="-error"]').count();
  check(`${tag} audit empty submit shows inline errors`, errorCount >= 4, `${errorCount} field errors`);
  const focused = await page.evaluate(() => document.activeElement?.getAttribute("name"));
  check(`${tag} focus moves to first invalid field`, focused === "name", `focused: ${focused}`);
  const invalid = await page.getAttribute("#email", "aria-invalid");
  check(`${tag} invalid fields expose aria-invalid`, invalid === "true");

  await page.fill("#name", "QA Tester");
  await page.fill("#email", "qa@example.co.nz");
  await page.fill("#website", "example.co.nz");
  await page.fill("#businessType", "Roofing");
  await page.selectOption("#goal", "More leads");
  await page.fill("#message", "Automated QA submission — please ignore.");
  await page.waitForTimeout(2800);
  await page.click('button[type="submit"]:has-text("Get My Free SEO Audit")');
  await page.waitForSelector("text=Audit request received", { timeout: 10000 }).catch(() => {});
  const success = await page.locator("text=Thanks — we’ve received your audit request").isVisible();
  check(`${tag} audit success state shown`, success);
  const events = await page.evaluate(() => (window.dataLayer || []).map((e) => e.event));
  check(
    `${tag} audit dataLayer events`,
    events.includes("free_audit_cta_click") && events.includes("free_audit_form_start") && events.filter((e) => e === "free_audit_form_submit").length === 1,
    events.join(", "),
  );
  const pii = await page.evaluate(() => JSON.stringify(window.dataLayer || []).includes("qa@example.co.nz"));
  check(`${tag} no PII in dataLayer`, !pii);

  // Contact
  await page.goto(`${base}/contact/`, { waitUntil: "networkidle" });
  await page.click('button[type="submit"]:has-text("Send My Enquiry")');
  const cErrors = await page.locator('#contact-form [id$="-error"]').count();
  check(`${tag} contact empty submit shows inline errors`, cErrors >= 3, `${cErrors} field errors`);
  await page.fill("#name", "QA Tester");
  await page.fill("#email", "qa@example.co.nz");
  await page.check('input[name="services"][value="Local SEO"]');
  await page.fill("#message", "Automated QA enquiry — please ignore this test message.");
  const preserved = await page.inputValue("#name");
  check(`${tag} entered data preserved after validation error`, preserved === "QA Tester");
  await page.waitForTimeout(2800);
  await page.click('button[type="submit"]:has-text("Send My Enquiry")');
  await page.waitForSelector("text=Enquiry received", { timeout: 10000 }).catch(() => {});
  const cSuccess = await page.locator("text=Thanks — we’ve received your enquiry").isVisible();
  check(`${tag} contact success state shown`, cSuccess);
  const cEvents = await page.evaluate(() => (window.dataLayer || []).map((e) => e.event));
  check(
    `${tag} contact dataLayer events`,
    cEvents.includes("contact_form_start") && cEvents.filter((e) => e === "contact_form_submit").length === 1,
    cEvents.join(", "),
  );
  await page.close();
}

await run({ width: 1440, height: 900 });
await run({ width: 375, height: 812 });
await browser.close();
console.log(results.join("\n"));
process.exit(results.some((r) => r.startsWith("FAIL")) ? 1 : 0);
