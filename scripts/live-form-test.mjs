// Sends ONE real Contact enquiry and ONE real Free SEO Audit request through the live forms (owner approval required).
// Usage: CONFIRM_REAL_EMAIL=true node scripts/live-form-test.mjs [origin] [screenshotDir]
import { chromium } from "playwright";

if (process.env.CONFIRM_REAL_EMAIL !== "true") throw new Error("This sends real email. Set CONFIRM_REAL_EMAIL=true after owner approval.");
const origin = (process.argv[2] || "https://topspotstudio.com").replace(/\/$/, "");
const shots = process.argv[3] || ".tmp";
const id = `PT-${new Date().toISOString().slice(0, 16).replace(/[-:T]/g, "")}`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
let failed = 0;
const record = (name, ok, detail = "") => {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

// Contact
await page.goto(`${origin}/contact/`, { waitUntil: "networkidle" });
await page.fill("#name", `Production test ${id}`);
await page.fill("#email", "production-test@example.com");
await page.check('input[name="services"][value="SEO"]');
await page.fill("#message", `[${id}] Production email delivery test of the Contact form by the QA team. Please ignore; no reply needed.`);
await page.waitForTimeout(3000);
let response = page.waitForResponse((r) => r.url().includes("/api/contact/") && r.request().method() === "POST");
await page.click('button[type="submit"]:has-text("Send My Enquiry")');
let res = await response;
let body = await res.json().catch(() => ({}));
await page.waitForSelector("text=Enquiry received", { timeout: 15000 }).catch(() => {});
record("Contact form: API accepted and SMTP delivered", res.status() === 200 && body.ok === true, `HTTP ${res.status()} ${JSON.stringify(body)}`);
record("Contact form: success message shown", await page.locator("text=Enquiry received").first().isVisible());
await page.screenshot({ path: `${shots}/live-contact-success.jpg`, quality: 80 });

// Free SEO audit
await page.goto(`${origin}/free-seo-audit/`, { waitUntil: "networkidle" });
await page.fill("#name", `Production test ${id}`);
await page.fill("#email", "production-test@example.com");
await page.fill("#website", "example.com");
await page.fill("#businessType", "QA test");
await page.selectOption("#goal", "Not sure yet");
await page.fill("#message", `[${id}] Production email delivery test of the Free SEO Audit form by the QA team. Please ignore.`);
await page.waitForTimeout(3000);
response = page.waitForResponse((r) => r.url().includes("/api/audit/") && r.request().method() === "POST");
await page.click('button[type="submit"]:has-text("Get My Free SEO Audit")');
res = await response;
body = await res.json().catch(() => ({}));
await page.waitForSelector("text=Audit request received", { timeout: 15000 }).catch(() => {});
record("Audit form: API accepted and SMTP delivered", res.status() === 200 && body.ok === true, `HTTP ${res.status()} ${JSON.stringify(body)}`);
record("Audit form: success message shown", await page.locator("text=Audit request received").first().isVisible());
await page.locator("text=Audit request received").first().scrollIntoViewIfNeeded().catch(() => {});
await page.screenshot({ path: `${shots}/live-audit-success.jpg`, quality: 80 });

console.log(`\nTest ID: ${id} (search the inbox for this ID)`);
await browser.close();
process.exitCode = failed ? 1 : 0;
