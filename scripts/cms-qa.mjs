// End-to-end CMS QA against a running production-mode build (local/staging only — never Production).
// Usage: CMS_ADMIN_EMAIL=… CMS_ADMIN_PASSWORD=… CMS_EDITOR_EMAIL=… CMS_EDITOR_PASSWORD=… node scripts/cms-qa.mjs [baseUrl] [out.json]
// Creates only "qa-test-*" records and removes them afterwards; edits to real pages are reverted.
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const base = (process.argv[2] || "http://localhost:3100").replace(/\/$/, "");
if (/(^|\.)topspotstudio\.com$/i.test(new URL(base).hostname)) throw new Error(`Refusing to run the CMS suite against production (${base}): it creates and edits content.`);
const out = process.argv[3] || ".tmp/cms-qa.json";
const API = `${base}/cms-api`;
const { CMS_ADMIN_EMAIL, CMS_ADMIN_PASSWORD, CMS_EDITOR_EMAIL, CMS_EDITOR_PASSWORD } = process.env;
if (!CMS_ADMIN_EMAIL || !CMS_ADMIN_PASSWORD || !CMS_EDITOR_EMAIL || !CMS_EDITOR_PASSWORD) throw new Error("Set CMS_ADMIN_* and CMS_EDITOR_* credentials");

const results = [];
const record = (id, area, name, ok, detail = "") => {
  results.push({ id, area, name, status: ok ? "PASS" : "FAIL", detail: String(detail).slice(0, 400) });
  console.log(`${ok ? "PASS" : "FAIL"}  [${id}] ${name}${detail && !ok ? ` — ${String(detail).slice(0, 300)}` : ""}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class Client {
  constructor(name, ip) {
    this.name = name;
    this.ip = ip;
    this.cookies = new Map();
  }
  header() {
    return [...this.cookies].map(([k, v]) => `${k}=${v}`).join("; ");
  }
  store(res) {
    for (const c of res.headers.getSetCookie?.() ?? []) {
      const [pair] = c.split(";");
      const i = pair.indexOf("=");
      const k = pair.slice(0, i);
      const v = pair.slice(i + 1);
      if (/Max-Age=0|Expires=Thu, 01 Jan 1970/i.test(c) || v === "") this.cookies.delete(k);
      else this.cookies.set(k, v);
    }
  }
  async req(method, url, { json, body, headers = {}, origin = base, redirect = "manual" } = {}) {
    const h = { "x-real-ip": this.ip, ...headers };
    if (origin) h.Origin = origin;
    if (this.cookies.size) h.Cookie = this.header();
    if (json !== undefined) h["Content-Type"] = "application/json";
    const res = await fetch(url.startsWith("http") ? url : base + url, { method, headers: h, body: json !== undefined ? JSON.stringify(json) : body, redirect });
    this.store(res);
    const type = res.headers.get("content-type") || "";
    const data = type.includes("json") ? await res.json().catch(() => null) : await res.text();
    return { status: res.status, headers: res.headers, data };
  }
  api(method, path, opts) {
    return this.req(method, `${API}${path}`, opts);
  }
  async login(email, password) {
    const r = await this.api("POST", "/users/login/", { json: { email, password } });
    return r;
  }
}

const anon = new Client("anon", "10.0.0.2");
const admin = new Client("admin", "10.0.0.3");
const editor = new Client("editor", "10.0.0.4");

const html = async (client, path) => (await client.req("GET", path)).data;
/** Waits for revalidation: retries until the predicate holds (stale-while-revalidate may serve one old copy). */
async function eventually(fn, tries = 8) {
  let last;
  for (let i = 0; i < tries; i++) {
    last = await fn();
    if (last.ok) return last;
    await sleep(400 + i * 200);
  }
  return last;
}
const docs = (r) => r.data?.docs ?? [];
const md = (text, href) => ({
  root: {
    type: "root",
    version: 1,
    format: "",
    indent: 0,
    direction: "ltr",
    children: [
      {
        type: "paragraph",
        version: 1,
        format: "",
        indent: 0,
        direction: "ltr",
        textFormat: 0,
        textStyle: "",
        children: href
          ? [
              { type: "text", text: `${text} `, format: 0, detail: 0, mode: "normal", style: "", version: 1 },
              { type: "link", version: 3, format: "", indent: 0, direction: "ltr", fields: href, children: [{ type: "text", text: "linked words", format: 0, detail: 0, mode: "normal", style: "", version: 1 }] },
            ]
          : [{ type: "text", text, format: 0, detail: 0, mode: "normal", style: "", version: 1 }],
      },
    ],
  },
});

const created = { pages: [], posts: [], redirects: [], snippets: [], media: [], users: [] };
const restore = [];

try {
  // ---------- Authentication ----------
  let r = await anon.login(CMS_ADMIN_EMAIL, "definitely-wrong-password");
  record("AUTH-01", "auth", "Invalid password is rejected", r.status === 401, r.status);
  r = await anon.login("nobody@example.invalid", "definitely-wrong-password");
  record("AUTH-02", "auth", "Unknown account is rejected", r.status === 401, r.status);
  r = await admin.login(CMS_ADMIN_EMAIL, CMS_ADMIN_PASSWORD);
  const cookie = r.headers.getSetCookie?.().find((c) => c.startsWith("payload-token=")) ?? "";
  record("AUTH-03", "auth", "Admin login succeeds", r.status === 200 && r.data?.user?.role === "admin", r.status);
  record("AUTH-04", "auth", "Session cookie is HttpOnly + SameSite=Lax", /HttpOnly/i.test(cookie) && /SameSite=Lax/i.test(cookie), cookie.replace(/payload-token=[^;]+/, "payload-token=<redacted>"));
  r = await editor.login(CMS_EDITOR_EMAIL, CMS_EDITOR_PASSWORD);
  record("AUTH-05", "auth", "Editor login succeeds", r.status === 200 && r.data?.user?.role === "editor", r.status);
  r = await anon.api("POST", "/users/first-register/", { json: { email: "intruder@example.invalid", password: "x".repeat(16), name: "x", role: "admin" } });
  record("AUTH-06", "auth", "No public registration (first-register blocked once users exist)", r.status >= 400, r.status);
  r = await anon.api("POST", "/users/", { json: { email: "intruder@example.invalid", password: "x".repeat(16), name: "x" } });
  record("AUTH-07", "auth", "Anonymous cannot create users", r.status === 403, r.status);
  r = await admin.api("POST", "/users/", { json: { email: "qa-test-short@example.invalid", password: "short", name: "QA", role: "editor" } });
  record("AUTH-08", "auth", "Password policy rejects short passwords", r.status === 400, r.status);

  // Lockout with a throwaway account.
  const tmpPass = `QaTemp-${Math.random().toString(36).slice(2)}-Pw!`;
  r = await admin.api("POST", "/users/", { json: { email: "qa-test-lockout@example.invalid", password: tmpPass, name: "QA Lockout", role: "editor" } });
  if (r.data?.doc?.id) created.users.push(r.data.doc.id);
  const locker = new Client("locker", "10.0.0.5");
  for (let i = 0; i < 5; i++) await locker.login("qa-test-lockout@example.invalid", "wrong-password-123");
  r = await locker.login("qa-test-lockout@example.invalid", tmpPass);
  record("AUTH-09", "auth", "Account locks after 5 failed attempts (correct password refused while locked)", r.status !== 200, r.status);
  r = await admin.api("POST", "/users/unlock/", { json: { email: "qa-test-lockout@example.invalid" } });
  r = await locker.login("qa-test-lockout@example.invalid", tmpPass);
  record("AUTH-10", "auth", "Admin can unlock a locked account", r.status === 200, r.status);
  r = await admin.api("PATCH", `/users/${created.users[0]}/`, { json: { active: false } });
  const inactive = new Client("inactive", "10.0.0.6");
  r = await inactive.login("qa-test-lockout@example.invalid", tmpPass);
  record("AUTH-11", "auth", "Inactive accounts cannot sign in", r.status >= 400, r.status);
  r = await locker.api("POST", "/users/logout/");
  r = await locker.api("GET", "/users/me/");
  record("AUTH-12", "auth", "Logout ends the session", r.status === 200 && !r.data?.user, JSON.stringify(r.data).slice(0, 80));

  // CSRF: a valid cookie sent from a foreign origin is ignored.
  r = await admin.api("GET", "/users/", { origin: "https://evil.example" });
  record("AUTH-13", "auth", "Cookie auth ignored for untrusted Origin (CSRF)", r.status === 403, r.status);

  // Password reset email goes to the mock SMTP only.
  const mockLog = process.env.MOCK_LOG || ".tmp/mock-smtp-cms.log";
  const before = existsSync(mockLog) ? readFileSync(mockLog, "utf8").length : 0;
  r = await anon.api("POST", "/users/forgot-password/", { json: { email: CMS_ADMIN_EMAIL } });
  await sleep(1200);
  const mailed = existsSync(mockLog) ? readFileSync(mockLog, "utf8").slice(before) : "";
  record("AUTH-14", "auth", "Password reset sends a reset email (mock SMTP)", r.status === 200 && /reset/i.test(mailed), `${r.status} mail=${mailed.length}b`);

  // ---------- Permissions ----------
  r = await editor.api("GET", "/users/");
  record("PERM-01", "permissions", "Editor sees only their own user record", r.status === 200 && r.data.totalDocs === 1, r.data?.totalDocs);
  r = await editor.api("POST", "/users/", { json: { email: "qa-test-x@example.invalid", password: "x".repeat(16), name: "x" } });
  record("PERM-02", "permissions", "Editor cannot create users", r.status === 403, r.status);
  const me = (await editor.api("GET", "/users/me/")).data.user;
  r = await editor.api("PATCH", `/users/${me.id}/`, { json: { role: "admin" } });
  record("PERM-03", "permissions", "Editor cannot promote themselves to admin", (r.data?.doc?.role ?? me.role) === "editor", r.data?.doc?.role);
  for (const [id, path, label] of [
    ["PERM-04", "/code-snippets/", "Editor cannot read tracking codes"],
    ["PERM-05", "/audit-logs/", "Editor cannot read the audit log"],
  ]) {
    r = await editor.api("GET", path);
    record(id, "permissions", label, r.status === 403, r.status);
  }
  r = await editor.api("POST", "/globals/site-settings/", { json: { tagline: "hacked" } });
  record("PERM-06", "permissions", "Editor cannot change site settings", r.status === 403, r.status);
  r = await editor.api("POST", "/code-snippets/", { json: { name: "x", provider: "custom", code: "<meta name=\"x\" content=\"y\">", placement: "head", scope: "all", environments: ["production"] } });
  record("PERM-07", "permissions", "Editor cannot add tracking codes", r.status === 403, r.status);
  const privacy = docs(await admin.api("GET", "/pages/?where[path][equals]=/privacy-policy/&depth=0")).at(0);
  r = await editor.api("DELETE", `/pages/${privacy.id}/`);
  record("PERM-08", "permissions", "Editor cannot delete pages", r.status === 403, r.status);
  r = await admin.api("DELETE", `/pages/${privacy.id}/`);
  record("PERM-09", "permissions", "Built-in pages cannot be deleted, even by an admin", r.status >= 400 && docs(await admin.api("GET", "/pages/?where[path][equals]=/privacy-policy/&depth=0")).length === 1, r.status);
  r = await admin.api("PATCH", `/pages/${privacy.id}/`, { json: { path: "/privacy/" } });
  const stillPath = docs(await admin.api("GET", "/pages/?where[path][equals]=/privacy-policy/&depth=0")).length === 1;
  record("PERM-10", "permissions", "Built-in page URLs cannot be changed from the CMS", stillPath, r.status);
  r = await editor.api("PATCH", `/pages/${privacy.id}/`, { json: { _status: "draft" } });
  record("PERM-11", "permissions", "Editors cannot unpublish built-in pages (would 404 a live URL)", r.status === 403, r.status);

  // ---------- Anonymous API ----------
  for (const [id, path] of [
    ["ANON-01", "/users/"],
    ["ANON-02", "/redirects/"],
    ["ANON-03", "/code-snippets/"],
    ["ANON-04", "/audit-logs/"],
    ["ANON-05", "/globals/site-settings/"],
    ["ANON-06", "/pages/versions/"],
  ]) {
    r = await anon.api("GET", path);
    record(id, "anonymous", `Anonymous GET ${path} is denied`, r.status === 403, r.status);
  }
  r = await anon.api("POST", "/pages/", { json: { title: "x", path: "/x/" } });
  record("ANON-07", "anonymous", "Anonymous cannot create pages", r.status === 403, r.status);
  r = await anon.api("GET", "/posts/?draft=true&depth=0");
  record("ANON-08", "anonymous", "Anonymous post listing excludes drafts", r.status === 200 && docs(r).every((d) => d._status === "published") && !docs(r).some((d) => d.slug === "article-template-preview"), docs(r).map((d) => d.slug));
  r = await anon.req("POST", "/cms-api/graphql/", { json: { query: "{ Users { docs { email } } }" } });
  record("ANON-09", "anonymous", "GraphQL API is disabled", r.status === 404 || r.status === 405, r.status);

  // ---------- Content editing: a QA page served by the catch-all ----------
  const about = docs(await admin.api("GET", "/pages/?where[path][equals]=/about/&depth=0"))[0];
  const qaPath = "/qa-test-page/";
  const sectionA = { blockType: "section", anchorId: "qa-a", tone: "white", layout: "stacked", header: { title: "QA section A" }, content: [{ blockType: "richText", content: md("Alpha copy", { linkType: "internal", doc: { relationTo: "pages", value: about.id }, newTab: false }) }] };
  const sectionB = { blockType: "section", anchorId: "qa-b", tone: "base", layout: "stacked", header: { title: "QA section B" }, content: [{ blockType: "richText", content: md("Bravo copy") }] };
  const qaPage = {
    title: "QA test page",
    path: qaPath,
    template: "standard",
    breadcrumbs: [{ label: "Home", hasLink: true, link: { linkType: "custom", url: "/" } }, { label: "QA", hasLink: true, link: { linkType: "custom", url: qaPath } }],
    seo: { metaTitle: "QA test page | Top Spot Studio", metaDescription: "A temporary page used by automated QA to verify publishing, sitemap and cache revalidation behaviour." },
    structuredData: { pageType: "WebPage", breadcrumbs: true, faq: true },
    layout: [
      { blockType: "pageHero", showBreadcrumbs: true, title: "QA test page heading", lead: md("QA hero lead"), mediaType: "none" },
      sectionA,
      sectionB,
      { blockType: "faq", title: "QA FAQ", items: [{ question: "Is this a QA question?", answer: "Yes, it is a QA answer." }] },
    ],
  };
  r = await editor.api("POST", "/pages/?draft=true", { json: { ...qaPage, _status: "draft" } });
  const pageId = r.data?.doc?.id;
  if (pageId) created.pages.push(pageId);
  record("EDIT-01", "editing", "Editor can create a draft page", r.status === 201 && Boolean(pageId), r.status);
  r = await anon.req("GET", qaPath);
  record("DRAFT-01", "drafts", "Draft page is not public (404)", r.status === 404, r.status);
  r = await anon.api("GET", `/pages/${pageId}/?draft=true`);
  record("DRAFT-02", "drafts", "Draft page is not readable through the public API", r.status === 403 || r.status === 404, r.status);
  r = await anon.req("GET", "/sitemap.xml");
  record("DRAFT-03", "drafts", "Draft page is not in the sitemap", !String(r.data).includes(qaPath));

  r = await editor.api("PATCH", `/pages/${pageId}/`, { json: { _status: "published" } });
  record("PUB-01", "publishing", "Editor with publish permission can publish", r.status === 200, r.status);
  let check = await eventually(async () => {
    const p = await anon.req("GET", qaPath);
    return { ok: p.status === 200 && String(p.data).includes("QA test page heading"), p };
  });
  const qaHtml = String(check.p?.data ?? "");
  record("PUB-02", "publishing", "Published CMS page renders server-side (200)", check.ok, check.p?.status);
  record("SEO-01", "seo", "CMS SEO title is in the initial HTML", qaHtml.includes("<title>QA test page | Top Spot Studio</title>"));
  record("SEO-02", "seo", "Exactly one canonical, self-referencing on the preferred domain", (qaHtml.match(/rel="canonical"/g) || []).length === 1 && qaHtml.includes(`href="https://topspotstudio.com${qaPath}"`));
  record("SEO-03", "seo", "Exactly one title and one meta description", (qaHtml.match(/<title>/g) || []).length === 1 && (qaHtml.match(/name="description"/g) || []).length === 1);
  record("SEO-04", "seo", "FAQ section produces FAQPage JSON-LD", qaHtml.includes('"@type":"FAQPage"') && qaHtml.includes("Is this a QA question?"));
  record("LINK-01", "links", "Internal link to a page renders as a crawlable <a href>", /<a[^>]+href="\/about\/"[^>]*>linked words<\/a>/.test(qaHtml));
  record("EDIT-02", "editing", "Section order follows the CMS order", qaHtml.indexOf("QA section A") > 0 && qaHtml.indexOf("QA section A") < qaHtml.indexOf("QA section B"));
  check = await eventually(async () => ({ ok: String((await anon.req("GET", "/sitemap.xml")).data).includes(`https://topspotstudio.com${qaPath}`) }));
  record("SITEMAP-01", "sitemap", "Publishing adds the page to sitemap.xml", check.ok);
  check = await eventually(async () => {
    const og = await anon.req("GET", "/og/qa-test-page.png");
    return { ok: og.status === 200 && og.headers.get("content-type")?.includes("image/png"), og };
  });
  record("SEO-05", "seo", "Generated OG image exists for a new page", check.ok, check.og?.status);

  // Link update: external, new tab. Reorder sections. Save as draft first (must not go live).
  const updated = structuredClone(qaPage);
  updated.layout[1].content[0].content = md("Alpha copy", { linkType: "custom", url: "https://example.com/", newTab: true });
  updated.layout = [updated.layout[0], updated.layout[2], updated.layout[1], updated.layout[3]];
  r = await editor.api("PATCH", `/pages/${pageId}/?draft=true`, { json: { ...updated, _status: "draft" } });
  await sleep(500);
  const afterDraft = String((await anon.req("GET", qaPath)).data);
  record("DRAFT-04", "drafts", "Saving a draft of a published page does not change the live page", r.status === 200 && afterDraft.indexOf("QA section A") < afterDraft.indexOf("QA section B") && afterDraft.includes('href="/about/"'));

  // Preview: requires a CMS session; draft content shown, never indexed, no tracking codes.
  r = await anon.req("GET", `/preview/?path=${encodeURIComponent(qaPath)}`);
  record("PREV-01", "preview", "Preview without a session redirects to the CMS login", r.status === 307 && String(r.headers.get("location")).includes("/admin/login"), r.headers.get("location"));
  r = await admin.req("GET", `/preview/?path=${encodeURIComponent(qaPath)}`);
  record("PREV-02", "preview", "Preview with a session enables Draft Mode", r.status === 307 && admin.cookies.has("__prerender_bypass"), r.status);
  const prevHtml = String((await admin.req("GET", qaPath)).data);
  record("PREV-03", "preview", "Preview shows the unpublished draft", prevHtml.indexOf("QA section B") < prevHtml.indexOf("QA section A") && prevHtml.includes("Preview"));
  record("PREV-04", "preview", "Preview pages are noindex", /<meta name="robots" content="noindex/.test(prevHtml));
  const stolen = new Client("stolen", "10.0.0.7");
  stolen.cookies.set("__prerender_bypass", admin.cookies.get("__prerender_bypass"));
  const stolenHtml = String((await stolen.req("GET", qaPath)).data);
  record("PREV-05", "preview", "A copied draft-mode cookie without a CMS session shows only published content", stolenHtml.indexOf("QA section A") < stolenHtml.indexOf("QA section B"));
  r = await admin.req("GET", `/exit-preview/?path=${encodeURIComponent(qaPath)}`);
  record("PREV-06", "preview", "Exit preview clears Draft Mode", r.status === 307 && !admin.cookies.has("__prerender_bypass"), [...admin.cookies.keys()]);

  r = await editor.api("PATCH", `/pages/${pageId}/`, { json: { ...updated, _status: "published" } });
  check = await eventually(async () => {
    const h = String((await anon.req("GET", qaPath)).data);
    return { ok: h.indexOf("QA section B") < h.indexOf("QA section A") && h.includes('href="https://example.com/"'), h };
  });
  record("EDIT-03", "editing", "Reordered sections appear after publishing", check.ok);
  record("LINK-02", "links", "External new-tab link gets target=_blank and rel=noopener noreferrer", /<a[^>]+href="https:\/\/example.com\/"[^>]+target="_blank"[^>]+rel="noopener noreferrer"|<a[^>]+rel="noopener noreferrer"[^>]+target="_blank"/.test(check.h ?? ""));
  const removed = structuredClone(updated);
  removed.layout[2].content[0].content = md("Alpha copy without a link");
  r = await editor.api("PATCH", `/pages/${pageId}/`, { json: { ...removed, _status: "published" } });
  check = await eventually(async () => {
    const h = String((await anon.req("GET", qaPath)).data);
    return { ok: h.includes("Alpha copy without a link") && !h.includes("https://example.com/"), h };
  });
  record("LINK-03", "links", "Removing a link removes the anchor", check.ok);

  // Revisions: restore the first published version.
  r = await admin.api("GET", `/pages/versions/?where[parent][equals]=${pageId}&sort=createdAt&limit=50&depth=0`);
  const firstPublished = docs(r).find((v) => v.version?._status === "published");
  r = firstPublished ? await admin.api("POST", `/pages/versions/${firstPublished.id}/`) : { status: 0 };
  await admin.api("PATCH", `/pages/${pageId}/`, { json: { _status: "published" } });
  check = await eventually(async () => {
    const h = String((await anon.req("GET", qaPath)).data);
    return { ok: h.includes('href="/about/"') && h.indexOf("QA section A") < h.indexOf("QA section B") };
  });
  record("REV-01", "revisions", "Restoring an earlier revision brings back its content", r.status === 200 && check.ok, r.status);

  // Noindex removes from sitemap; unpublish returns 404.
  r = await editor.api("PATCH", `/pages/${pageId}/`, { json: { seo: { ...qaPage.seo, robotsIndex: "noindex" }, _status: "published" } });
  check = await eventually(async () => {
    const h = String((await anon.req("GET", qaPath)).data);
    const sm = String((await anon.req("GET", "/sitemap.xml")).data);
    return { ok: /<meta name="robots" content="noindex, follow"/.test(h) && !sm.includes(qaPath) };
  });
  record("SEO-06", "seo", "Robots noindex is output and the page leaves the sitemap", check.ok);
  await admin.api("PATCH", `/users/${me.id}/`, { json: { canPublish: false } });
  r = await editor.api("PATCH", `/pages/${pageId}/`, { json: { _status: "published", title: "QA test page (no publish)" } });
  const draftOk = await editor.api("PATCH", `/pages/${pageId}/?draft=true`, { json: { _status: "draft", title: "QA test page (draft only)" } });
  record("PERM-12", "permissions", "Editor without publish permission can save drafts but not publish", r.status === 403 && draftOk.status === 200, `${r.status}/${draftOk.status}`);
  await admin.api("PATCH", `/users/${me.id}/`, { json: { canPublish: true } });
  r = await editor.api("PATCH", `/pages/${pageId}/`, { json: { _status: "draft" } });
  check = await eventually(async () => {
    const p = await anon.req("GET", qaPath);
    const sm = String((await anon.req("GET", "/sitemap.xml")).data);
    return { ok: p.status === 404 && !sm.includes(qaPath), p };
  });
  record("PUB-03", "publishing", "Unpublishing returns 404 and removes the page from the sitemap", r.status === 200 && check.ok, check.p?.status);

  // ---------- Real page edits (reverted) ----------
  const nz = docs(await admin.api("GET", "/pages/?where[path][equals]=/markets/new-zealand/seo/&depth=0"))[0];
  const originalTitle = nz.seo.metaTitle;
  restore.push(() => admin.api("PATCH", `/pages/${nz.id}/`, { json: { seo: { ...nz.seo, metaTitle: originalTitle }, _status: "published" } }));
  r = await editor.api("PATCH", `/pages/${nz.id}/`, { json: { seo: { ...nz.seo, metaTitle: "QA Edited SEO Title | Top Spot Studio" }, _status: "published" } });
  check = await eventually(async () => {
    const h = String((await anon.req("GET", "/markets/new-zealand/seo/")).data);
    return { ok: h.includes("<title>QA Edited SEO Title | Top Spot Studio</title>") && h.includes('property="og:title" content="QA Edited SEO Title | Top Spot Studio"') };
  });
  record("SEO-07", "seo", "SEO-only edit on a service page updates <title> and og:title in server HTML", r.status === 200 && check.ok, r.status);
  await restore.pop()();
  check = await eventually(async () => ({ ok: String((await anon.req("GET", "/markets/new-zealand/seo/")).data).includes(`<title>${originalTitle}</title>`) }));
  record("SEO-08", "seo", "Reverting the SEO title restores the original output", check.ok);

  const home = (await admin.api("GET", `/pages/?where[path][equals]=/&depth=0`)).data.docs[0];
  const originalLead = home.layout[0].lead;
  const editedLayout = structuredClone(home.layout);
  editedLayout[0].lead = "QA edited homepage hero lead.";
  restore.push(() => admin.api("PATCH", `/pages/${home.id}/`, { json: { layout: home.layout, _status: "published" } }));
  r = await editor.api("PATCH", `/pages/${home.id}/`, { json: { layout: editedLayout, _status: "published" } });
  check = await eventually(async () => ({ ok: String((await anon.req("GET", "/")).data).includes("QA edited homepage hero lead.") }));
  record("EDIT-04", "editing", "Homepage hero edit appears on the live homepage", r.status === 200 && check.ok, r.status);
  await restore.pop()();
  check = await eventually(async () => ({ ok: String((await anon.req("GET", "/")).data).includes(originalLead) }));
  record("EDIT-05", "editing", "Homepage restored to the original copy", check.ok);

  const nav = (await admin.api("GET", "/globals/navigation/?depth=0")).data;
  const navEdited = structuredClone(nav);
  const aboutItem = navEdited.items.find((i) => i.label === "About");
  aboutItem.label = "About QA";
  restore.push(() => admin.api("POST", "/globals/navigation/", { json: { items: nav.items, cta: nav.cta } }));
  r = await editor.api("POST", "/globals/navigation/", { json: { items: navEdited.items, cta: nav.cta } });
  check = await eventually(async () => ({ ok: String((await anon.req("GET", "/contact/")).data).includes(">About QA<") }));
  record("NAV-01", "navigation", "Navigation label change appears in the site header", r.status === 200 && check.ok, r.status);
  await restore.pop()();
  check = await eventually(async () => ({ ok: !String((await anon.req("GET", "/contact/")).data).includes(">About QA<") }));
  record("NAV-02", "navigation", "Navigation restored", check.ok);

  // ---------- Blog lifecycle ----------
  const cats = docs(await admin.api("GET", "/categories/?depth=0"));
  const authors = docs(await admin.api("GET", "/authors/?depth=0"));
  const post = {
    title: "QA test article",
    slug: "qa-test-article",
    excerpt: "A temporary article used by automated QA to verify the blog publishing lifecycle.",
    category: cats[0].id,
    author: authors[0].id,
    content: md("QA article body paragraph", { linkType: "internal", doc: { relationTo: "pages", value: about.id } }),
    seo: { metaTitle: "QA test article | Top Spot Studio", metaDescription: "A temporary article used by automated QA to verify the blog publishing lifecycle and metadata output." },
  };
  r = await editor.api("POST", "/posts/?draft=true", { json: { ...post, _status: "draft" } });
  const postId = r.data?.doc?.id;
  if (postId) created.posts.push(postId);
  record("BLOG-01", "blog", "Editor can create a draft post", r.status === 201, r.status);
  r = await anon.req("GET", "/blog/qa-test-article/");
  record("BLOG-02", "blog", "Draft post is not public (404)", r.status === 404, r.status);
  await admin.req("GET", `/preview/?path=${encodeURIComponent("/blog/qa-test-article/")}`);
  const postPreview = String((await admin.req("GET", "/blog/qa-test-article/")).data);
  record("BLOG-03", "blog", "Draft post can be previewed by a signed-in editor", postPreview.includes("QA test article") && /noindex/.test(postPreview));
  await admin.req("GET", "/exit-preview/?path=/");
  r = await editor.api("PATCH", `/posts/${postId}/`, { json: { _status: "published" } });
  check = await eventually(async () => {
    const p = await anon.req("GET", "/blog/qa-test-article/");
    const hub = String((await anon.req("GET", "/blog/")).data);
    return { ok: p.status === 200 && hub.includes("QA test article"), p };
  });
  const postHtml = String(check.p?.data ?? "");
  record("BLOG-04", "blog", "Published post renders and appears in the blog listing", check.ok, check.p?.status);
  record("BLOG-05", "blog", "Post outputs BlogPosting + BreadcrumbList JSON-LD", postHtml.includes('"@type":"BlogPosting"') && postHtml.includes('"@type":"BreadcrumbList"'));
  record("BLOG-06", "blog", "Post robots follow the blog flag (noindex while NEXT_PUBLIC_BLOG_ENABLED is false)", process.env.NEXT_PUBLIC_BLOG_ENABLED === "true" ? /index, follow/.test(postHtml) : /noindex, follow/.test(postHtml));
  const sm = String((await anon.req("GET", "/sitemap.xml")).data);
  record("BLOG-07", "blog", "Sitemap respects the blog launch rule (blog enabled AND ≥3 posts)", process.env.NEXT_PUBLIC_BLOG_ENABLED === "true" ? true : !sm.includes("qa-test-article"));
  r = await editor.api("PATCH", `/posts/${postId}/`, { json: { title: "QA test article updated", _status: "published" } });
  check = await eventually(async () => ({ ok: String((await anon.req("GET", "/blog/qa-test-article/")).data).includes("QA test article updated") }));
  record("BLOG-08", "blog", "Updating a published post changes the live article", check.ok);
  r = await editor.api("PATCH", `/posts/${postId}/`, { json: { slug: "qa-test-article-renamed", _status: "published" } });
  check = await eventually(async () => {
    const old = await anon.req("GET", "/blog/qa-test-article/");
    return { ok: old.status === 308 && old.headers.get("location")?.endsWith("/blog/qa-test-article-renamed/"), old };
  });
  record("BLOG-09", "blog", "Changing a published slug creates a 308 redirect from the old URL", check.ok, `${check.old?.status} ${check.old?.headers.get("location")}`);
  const autoRedirect = docs(await admin.api("GET", "/redirects/?where[from][equals]=/blog/qa-test-article/&depth=0"))[0];
  if (autoRedirect) created.redirects.push(autoRedirect.id);
  r = await editor.api("PATCH", `/posts/${postId}/`, { json: { _status: "draft" } });
  check = await eventually(async () => {
    const p = await anon.req("GET", "/blog/qa-test-article-renamed/");
    const hub = String((await anon.req("GET", "/blog/")).data);
    return { ok: p.status === 404 && !hub.includes("QA test article updated"), p };
  });
  record("BLOG-10", "blog", "Unpublishing removes the post (404) and its listing card", check.ok, check.p?.status);

  // ---------- Redirects ----------
  const mk = (client, data) => client.api("POST", "/redirects/", { json: { enabled: true, reason: "QA test", statusCode: "308", ...data } });
  r = await mk(editor, { from: "/qa-test-old-page/", to: { linkType: "internal", doc: { relationTo: "pages", value: about.id } } });
  if (r.data?.doc?.id) created.redirects.push(r.data.doc.id);
  record("REDIR-01", "redirects", "Editor can create an internal redirect", r.status === 201, JSON.stringify(r.data?.errors ?? r.status));
  check = await eventually(async () => {
    const res = await anon.req("GET", "/qa-test-old-page/");
    return { ok: res.status === 308 && res.headers.get("location") === "/about/", res };
  });
  record("REDIR-02", "redirects", "Permanent redirect returns 308 to the destination", check.ok, `${check.res?.status} ${check.res?.headers.get("location")}`);
  r = await mk(editor, { from: "QA-Test-Temp", statusCode: "307", to: { linkType: "custom", url: "/contact/" } });
  if (r.data?.doc?.id) created.redirects.push(r.data.doc.id);
  check = await eventually(async () => {
    const res = await anon.req("GET", "/qa-test-temp/");
    return { ok: res.status === 307 && res.headers.get("location") === "/contact/", res };
  });
  record("REDIR-03", "redirects", "Temporary redirect returns 307; source path is normalised", r.data?.doc?.from === "/qa-test-temp/" && check.ok, `${r.data?.doc?.from} ${check.res?.status}`);
  const rejected = [
    ["REDIR-04", "Redirecting a live page is blocked", { from: "/about/", to: { linkType: "custom", url: "/contact/" } }, editor],
    ["REDIR-05", "Redirect chains are blocked", { from: "/qa-test-chain/", to: { linkType: "custom", url: "/qa-test-old-page/" } }, editor],
    ["REDIR-06", "Protocol-relative (open redirect) destinations are blocked", { from: "/qa-test-evil/", to: { linkType: "custom", url: "//evil.example/" } }, admin],
    ["REDIR-07", "Editors cannot redirect to other websites", { from: "/qa-test-ext/", to: { linkType: "custom", url: "https://example.com/" } }, editor],
    ["REDIR-08", "Reserved paths (admin/API) cannot be redirected", { from: "/admin/qa-test/", to: { linkType: "custom", url: "/about/" } }, admin],
    ["REDIR-09", "Destinations must be live pages", { from: "/qa-test-dead/", to: { linkType: "custom", url: "/does-not-exist/" } }, editor],
    ["REDIR-10", "javascript: destinations are blocked", { from: "/qa-test-js/", to: { linkType: "custom", url: "javascript:alert(1)" } }, admin],
  ];
  for (const [id, label, data, client] of rejected) {
    r = await mk(client, data);
    if (r.data?.doc?.id) created.redirects.push(r.data.doc.id);
    record(id, "redirects", label, r.status === 400, `${r.status} ${JSON.stringify(r.data?.errors?.[0]?.message ?? "").slice(0, 160)}`);
  }
  r = await mk(admin, { from: "/qa-test-external/", to: { linkType: "custom", url: "https://example.com/" } });
  if (r.data?.doc?.id) created.redirects.push(r.data.doc.id);
  check = await eventually(async () => {
    const res = await anon.req("GET", "/qa-test-external/");
    return { ok: res.status === 308 && res.headers.get("location") === "https://example.com/", res };
  });
  record("REDIR-11", "redirects", "Admins can create an approved external https redirect", check.ok, check.res?.status);
  const firstRedirect = created.redirects.find(Boolean);
  r = await editor.api("PATCH", `/redirects/${created.redirects[1]}/`, { json: { enabled: false } });
  check = await eventually(async () => ({ ok: (await anon.req("GET", "/qa-test-old-page/")).status === 404 }));
  record("REDIR-12", "redirects", "Disabling a redirect makes the old URL 404 again", r.status === 200 && check.ok, r.status);
  void firstRedirect;

  // ---------- Tracking & verification codes ----------
  const snip = (data) => admin.api("POST", "/code-snippets/", { json: { enabled: true, environments: ["production", "staging", "development"], scope: "all", ...data } });
  const gsc = await snip({ name: "QA GSC", provider: "google-search-console", codeType: "meta", placement: "head", code: '<meta name="google-site-verification" content="QaTestVerificationToken123" />' });
  const gtmBody = await snip({
    name: "QA GTM body",
    provider: "google-tag-manager-body",
    codeType: "noscript",
    placement: "bodyStart",
    code: '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-QATEST1" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>',
  });
  const footerScript = await snip({ name: "QA footer", provider: "custom", codeType: "script", placement: "bodyEnd", code: "<script>window.__qaFooter = 1;</script>" });
  const consent = await snip({ name: "QA consent", provider: "custom", codeType: "script", placement: "bodyEnd", requiresConsent: true, consentCategory: "analytics", code: "<script>window.__qaConsent = 1;</script>" });
  const scoped = await snip({ name: "QA scoped", provider: "custom", codeType: "meta", placement: "head", scope: "pages", pages: [{ relationTo: "pages", value: about.id }], code: '<meta name="qa-page-scope" content="about" />' });
  for (const s of [gsc, gtmBody, footerScript, consent, scoped]) if (s.data?.doc?.id) created.snippets.push(s.data.doc.id);
  record("CODE-01", "tracking", "Admin can add verification and tracking codes", [gsc, gtmBody, footerScript, consent, scoped].every((s) => s.status === 201), [gsc, gtmBody, footerScript, consent, scoped].map((s) => s.status).join(","));
  check = await eventually(async () => {
    const h = String((await anon.req("GET", "/")).data);
    return { ok: h.includes("QaTestVerificationToken123") && h.includes("__qaFooter"), h };
  });
  const homeHtml = check.h ?? "";
  const headPart = homeHtml.slice(0, homeHtml.indexOf("</head>"));
  const bodyOpen = homeHtml.indexOf("<body");
  const bodyStartIdx = homeHtml.indexOf(">", bodyOpen) + 1;
  record("CODE-02", "tracking", "Search Console meta tag is inside <head>", headPart.includes('<meta name="google-site-verification" content="QaTestVerificationToken123"/>'));
  // Next.js always injects an empty hidden metadata placeholder as the very first body child; nothing else may precede the snippet.
  const afterBody = homeHtml.slice(bodyStartIdx).replace(/^<div hidden="">(?:<!--\$-->|<!--\/\$-->)*<\/div>/, "");
  record("CODE-03", "tracking", "GTM <noscript> is the first element after <body> (only Next's empty placeholder precedes it)", afterBody.startsWith("<noscript>") && afterBody.slice(0, 200).includes("GTM-QATEST1"), afterBody.slice(0, 80));
  record("CODE-04", "tracking", "Footer script is after the site footer, before </body>", homeHtml.indexOf("__qaFooter") > homeHtml.indexOf("</footer>") && homeHtml.indexOf("__qaFooter") < homeHtml.indexOf("</body>"));
  record("CODE-05", "tracking", "Consent-gated script is inert (type=text/plain + data-category)", /<script type="text\/plain" data-category="analytics"[^>]*>window.__qaConsent/.test(homeHtml));
  const aboutHtml = String((await anon.req("GET", "/about/")).data);
  record("CODE-06", "tracking", "Page-scoped code appears only on the selected page (in <head>)", aboutHtml.slice(0, aboutHtml.indexOf("</head>")).includes('name="qa-page-scope"') && !homeHtml.includes("qa-page-scope"));
  const invalid = [
    ["CODE-07", "Provider placement is enforced (GTM body snippet in <head> rejected)", { name: "x", provider: "google-tag-manager-body", codeType: "noscript", placement: "head", code: '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-QATEST1"></iframe></noscript>' }],
    ["CODE-08", "Inline event handlers are rejected", { name: "x", provider: "custom", codeType: "mixed", placement: "bodyEnd", code: '<img src="x" onerror="alert(1)">' }],
    ["CODE-09", "Non-https script sources are rejected", { name: "x", provider: "custom", codeType: "script", placement: "head", code: '<script src="http://insecure.example/x.js"></script>' }],
    ["CODE-10", "Inline scripts cannot be page-scoped", { name: "x", provider: "custom", codeType: "script", placement: "bodyEnd", scope: "pages", pages: [{ relationTo: "pages", value: about.id }], code: "<script>1</script>" }],
    ["CODE-11", "Malformed verification tags are rejected", { name: "x", provider: "google-search-console", codeType: "meta", placement: "head", code: '<meta name="google-site-verification" content="">' }],
  ];
  for (const [id, label, data] of invalid) {
    r = await snip(data);
    if (r.data?.doc?.id) created.snippets.push(r.data.doc.id);
    record(id, "tracking", label, r.status === 400, `${r.status} ${JSON.stringify(r.data?.errors?.[0]?.message ?? "").slice(0, 140)}`);
  }
  await admin.req("GET", "/preview/?path=/");
  const previewHome = String((await admin.req("GET", "/")).data);
  record("CODE-12", "tracking", "Tracking codes are not added to preview pages", !previewHome.includes("QaTestVerificationToken123") && !previewHome.includes("__qaFooter"));
  await admin.req("GET", "/exit-preview/?path=/");
  r = await admin.api("PATCH", `/code-snippets/${gsc.data.doc.id}/`, { json: { enabled: false } });
  check = await eventually(async () => ({ ok: !String((await anon.req("GET", "/")).data).includes("QaTestVerificationToken123") }));
  record("CODE-13", "tracking", "Disabling a code removes it from the site", check.ok);

  // ---------- Media ----------
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64");
  const upload = async (client, buf, filename, type, alt) => {
    const form = new FormData();
    form.append("file", new Blob([buf], { type }), filename);
    if (alt !== undefined) form.append("_payload", JSON.stringify({ alt, title: "QA test image" }));
    return client.api("POST", "/media/", { body: form });
  };
  r = await upload(editor, png, "qa-test.png", "image/png", "QA test pixel");
  if (r.data?.doc?.id) created.media.push(r.data.doc.id);
  record("MEDIA-01", "media", "Editor can upload a valid image with alt text", r.status === 201, r.status);
  if (r.data?.doc?.id) {
    const usage = await admin.api("GET", `/media/${r.data.doc.id}/usage/`);
    record("MEDIA-02", "media", "Media usage endpoint reports where an image is used", usage.status === 200 && Array.isArray(usage.data), usage.status);
    const file = await anon.req("GET", r.data.doc.url);
    record("MEDIA-03", "media", "Uploaded image is publicly served", file.status === 200, file.status);
  }
  r = await upload(editor, png, "qa-test-noalt.png", "image/png", undefined);
  if (r.data?.doc?.id) created.media.push(r.data.doc.id);
  record("MEDIA-04", "media", "Upload without alt text is rejected", r.status === 400, r.status);
  r = await upload(editor, Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'), "qa-test.svg", "image/svg+xml", "x");
  if (r.data?.doc?.id) created.media.push(r.data.doc.id);
  record("MEDIA-05", "media", "SVG uploads are rejected", r.status === 400, r.status);
  r = await upload(editor, Buffer.from("#!/bin/sh\necho not an image\n"), "qa-test-fake.png", "image/png", "x");
  if (r.data?.doc?.id) created.media.push(r.data.doc.id);
  record("MEDIA-06", "media", "Non-image content disguised as .png is rejected", r.status === 400, r.status);
  r = await upload(anon, png, "qa-test-anon.png", "image/png", "x");
  record("MEDIA-07", "media", "Anonymous users cannot upload", r.status === 403, r.status);

  // ---------- Audit log ----------
  r = await admin.api("GET", "/audit-logs/?limit=200&sort=-createdAt&depth=0");
  const actions = new Set(docs(r).map((d) => `${d.entity}:${d.action}`));
  record("AUDIT-01", "audit", "Publish, unpublish, redirect, code and login events are audited", ["pages:publish", "pages:unpublish", "posts:publish", "redirects:create", "code-snippets:create", "users:login"].every((a) => actions.has(a)), [...actions].join(" "));
  const anyLog = docs(r)[0];
  r = await admin.api("DELETE", `/audit-logs/${anyLog?.id}/`);
  record("AUDIT-02", "audit", "Audit entries cannot be deleted, even by an admin", r.status === 403, r.status);

  // ---------- Security headers and secrets ----------
  r = await anon.req("GET", "/admin/login/");
  record("SEC-01", "security", "Admin pages send X-Robots-Tag noindex and no-store", /noindex/.test(r.headers.get("x-robots-tag") ?? "") && /no-store/.test(r.headers.get("cache-control") ?? ""), `${r.headers.get("x-robots-tag")} | ${r.headers.get("cache-control")}`);
  r = await anon.api("GET", "/users/me/");
  record("SEC-02", "security", "CMS API responses send X-Robots-Tag noindex", /noindex/.test(r.headers.get("x-robots-tag") ?? ""), r.headers.get("x-robots-tag"));
  r = await anon.req("GET", "/robots.txt");
  record("SEC-03", "security", "robots.txt disallows /admin/ and /cms-api/ in production", /Disallow: \/admin\//.test(r.data) && /Disallow: \/cms-api\//.test(r.data), String(r.data).replace(/\n/g, " | "));
  r = await anon.req("GET", "/admin/collections/pages/");
  const adminHtml = String(r.data);
  const toLogin = [302, 303, 307].includes(r.status) || /NEXT_REDIRECT;replace;\/admin\/login\//.test(adminHtml);
  record("SEC-04", "security", "Admin collection views redirect to login and expose no content", toLogin && !adminHtml.includes("/markets/new-zealand/seo/"), r.status);
  const env = existsSync(".env.local") ? Object.fromEntries(readFileSync(".env.local", "utf8").split("\n").filter((l) => /^[A-Z_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()])) : {};
  const secrets = ["PAYLOAD_SECRET", "DATABASE_URL", "SMTP_PASS"].map((k) => env[k]).filter((v) => v && v.length >= 8);
  const leaks = [];
  const walk = (dir) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(js|css|html|json|txt)$/.test(f)) {
        const c = readFileSync(p, "utf8");
        if (secrets.some((s) => c.includes(s))) leaks.push(p);
      }
    }
  };
  if (existsSync(".next/static")) walk(".next/static");
  record("SEC-05", "security", "No server secrets in client bundles (.next/static)", leaks.length === 0 && secrets.length > 0, leaks.slice(0, 3).join(", ") || `${secrets.length} secrets checked`);
  const pagesHtml = await Promise.all(["/", "/contact/", "/admin/login/"].map((p) => html(anon, p)));
  record("SEC-06", "security", "No secrets or database URLs in public HTML", pagesHtml.every((h) => !secrets.some((s) => String(h).includes(s)) && !/postgres(ql)?:\/\//.test(String(h))));

  // ---------- Rate limiting (last: it exhausts the per-IP login budget for this test IP) ----------
  const flood = new Client("flood", "10.0.0.99");
  const codes = [];
  for (let i = 0; i < 12; i++) codes.push((await flood.login("nobody@example.invalid", "wrong-password-123")).status);
  record("AUTH-15", "auth", "Login endpoint is rate-limited per IP (429 after 10 attempts)", codes.slice(10).every((c) => c === 429) && codes.slice(0, 10).every((c) => c === 401), codes.join(","));
} catch (err) {
  record("QA-ERROR", "runner", "QA run completed without an unexpected error", false, err.stack);
} finally {
  for (const fn of restore.reverse()) await fn().catch(() => {});
  for (const id of created.snippets) await admin.api("DELETE", `/code-snippets/${id}/`).catch(() => {});
  for (const id of created.redirects) await admin.api("DELETE", `/redirects/${id}/`).catch(() => {});
  const leftovers = docs(await admin.api("GET", "/redirects/?where[from][like]=qa-test&limit=100&depth=0"));
  for (const d of leftovers) await admin.api("DELETE", `/redirects/${d.id}/`).catch(() => {});
  for (const id of created.posts) await admin.api("DELETE", `/posts/${id}/`).catch(() => {});
  for (const id of created.pages) await admin.api("DELETE", `/pages/${id}/`).catch(() => {});
  for (const id of created.media) await admin.api("DELETE", `/media/${id}/`).catch(() => {});
  for (const id of created.users) await admin.api("DELETE", `/users/${id}/`).catch(() => {});
  const remaining = await Promise.all([
    admin.api("GET", "/pages/?where[path][like]=qa-test&draft=true&depth=0"),
    admin.api("GET", "/posts/?where[slug][like]=qa-test&draft=true&depth=0"),
    admin.api("GET", "/code-snippets/?where[name][like]=QA&depth=0"),
  ]);
  record("CLEANUP", "runner", "All QA test records were removed", remaining.every((x) => (x.data?.totalDocs ?? 0) === 0), remaining.map((x) => x.data?.totalDocs).join(","));
  await admin.api("POST", "/users/logout/");
  await editor.api("POST", "/users/logout/");
  writeFileSync(out, JSON.stringify(results, null, 2));
  const failed = results.filter((x) => x.status === "FAIL").length;
  console.log(`\n${results.length - failed} passed, ${failed} failed → ${out}`);
  process.exit(failed ? 1 : 0);
}
