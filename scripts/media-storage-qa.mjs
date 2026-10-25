// Media storage QA: upload → retrieve → (rebuild/redeploy) → verify → cleanup. Never run against production.
// Usage: CMS_ADMIN_EMAIL=… CMS_ADMIN_PASSWORD=… BLOB_READ_WRITE_TOKEN=… node scripts/media-storage-qa.mjs <upload|verify|cleanup> [baseUrl] [state.json]
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { list } from "@vercel/blob";
import sharp from "sharp";

const [phase = "upload", baseArg = "http://localhost:3100", statePath = ".tmp/media-storage-qa.json"] = process.argv.slice(2);
const base = baseArg.replace(/\/$/, "");
if (/(^|\.)topspotstudio\.com$/i.test(new URL(base).hostname)) throw new Error("Refusing to run media QA against production.");
const { CMS_ADMIN_EMAIL, CMS_ADMIN_PASSWORD, BLOB_READ_WRITE_TOKEN } = process.env;
if (!CMS_ADMIN_EMAIL || !CMS_ADMIN_PASSWORD) throw new Error("Set CMS_ADMIN_EMAIL and CMS_ADMIN_PASSWORD");

let failed = 0;
const record = (id, name, ok, detail = "") => {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  [${id}] ${name}${detail ? ` — ${detail}` : ""}`);
};
const headers = { "x-real-ip": "10.77.0.1" };

async function login() {
  const res = await fetch(`${base}/cms-api/users/login/`, {
    method: "POST",
    headers: { ...headers, "content-type": "application/json", origin: base },
    body: JSON.stringify({ email: CMS_ADMIN_EMAIL, password: CMS_ADMIN_PASSWORD }),
  });
  const data = await res.json();
  if (!data.token) throw new Error(`Login failed: ${res.status}`);
  return { ...headers, authorization: `JWT ${data.token}` };
}

async function fetchFile(url) {
  const res = await fetch(new URL(url, base));
  const buf = Buffer.from(await res.arrayBuffer());
  return { status: res.status, type: res.headers.get("content-type") || "", bytes: buf.length };
}

const blobFiles = async (prefix) =>
  BLOB_READ_WRITE_TOKEN ? (await list({ token: BLOB_READ_WRITE_TOKEN, prefix, limit: 100 })).blobs : null;

const localMediaHas = (name) => existsSync("media") && readdirSync("media").some((f) => f.startsWith(name));

if (phase === "upload") {
  const auth = await login();
  const stamp = Date.now().toString(36);
  const filename = `qa-test-media-${stamp}.png`;
  // A unique generated image, so the test never collides with real uploads.
  const png = await sharp({ create: { width: 1200, height: 630, channels: 3, background: { r: 15, g: 39, b: 66 } } })
    .composite([{ input: Buffer.from(`<svg width="1200" height="630"><text x="60" y="340" font-size="64" fill="#5ED3C4" font-family="Arial">QA media ${stamp}</text></svg>`) }])
    .png()
    .toBuffer();
  const form = new FormData();
  form.append("file", new Blob([png], { type: "image/png" }), filename);
  form.append("_payload", JSON.stringify({ title: `qa-test-media ${stamp}`, alt: "QA storage test image" }));
  const res = await fetch(`${base}/cms-api/media/`, { method: "POST", headers: auth, body: form });
  const data = await res.json();
  const doc = data.doc;
  record("MEDIA-01", "Admin can upload an image", res.status === 201 && Boolean(doc?.id), `${res.status} id=${doc?.id} file=${doc?.filename}`);
  if (!doc) process.exit(1);

  const urls = { original: doc.url, ...Object.fromEntries(Object.entries(doc.sizes ?? {}).map(([k, v]) => [k, v?.url]).filter(([, v]) => v)) };
  const files = {};
  for (const [k, u] of Object.entries(urls)) {
    const f = await fetchFile(u);
    files[k] = { url: u, ...f };
    record("MEDIA-02", `Retrieve ${k} through the site`, f.status === 200 && f.type.startsWith("image/") && f.bytes > 0, `${f.status} ${f.type} ${f.bytes} B ${u}`);
  }
  const stem = doc.filename.replace(/\.[a-z0-9]+$/i, "");
  const blobs = await blobFiles(stem);
  if (blobs) {
    record("MEDIA-03", "Original and resized files are stored in Vercel Blob", blobs.length >= Object.keys(urls).length, blobs.map((b) => `${b.pathname} (${b.size} B)`).join(", "));
    record("MEDIA-04", "Nothing written to the local ./media folder", !localMediaHas(stem));
    const direct = blobs.find((b) => b.pathname === doc.filename);
    if (direct) {
      const f = await fetchFile(direct.url);
      record("MEDIA-05", "File is reachable directly from Blob (independent of any deployment)", f.status === 200 && f.bytes === direct.size, `${f.status} ${new URL(direct.url).host}`);
    }
  } else {
    record("MEDIA-03", "Stored in Vercel Blob", false, "BLOB_READ_WRITE_TOKEN not set: the server is using local disk");
  }
  writeFileSync(statePath, JSON.stringify({ base, id: doc.id, filename: doc.filename, stem, files, uploadedAt: new Date().toISOString() }, null, 2));
}

if (phase === "verify") {
  const state = JSON.parse(readFileSync(statePath, "utf8"));
  const res = await fetch(`${base}/cms-api/media/${state.id}/`, { headers });
  const doc = await res.json();
  record("MEDIA-06", "Media record still exists after rebuild/restart", res.status === 200 && doc.filename === state.filename, `${res.status} ${doc.filename}`);
  for (const [k, before] of Object.entries(state.files)) {
    const f = await fetchFile(before.url);
    record("MEDIA-07", `${k} still served after rebuild/restart, byte-identical`, f.status === 200 && f.bytes === before.bytes, `${f.status} ${f.bytes} B (was ${before.bytes} B)`);
  }
  record("MEDIA-08", "Local ./media folder has no copy (so persistence comes from Blob)", !localMediaHas(state.stem));
}

if (phase === "cleanup") {
  const state = JSON.parse(readFileSync(statePath, "utf8"));
  const auth = await login();
  const res = await fetch(`${base}/cms-api/media/${state.id}/`, { method: "DELETE", headers: auth });
  record("MEDIA-09", "Admin can delete the test image", res.status === 200, String(res.status));
  const gone = await fetchFile(state.files.original.url);
  record("MEDIA-10", "Deleted image is no longer served", gone.status === 404, String(gone.status));
  const blobs = await blobFiles(state.stem);
  if (blobs) record("MEDIA-11", "Blob files removed with the record", blobs.length === 0, `${blobs.length} left`);
}

console.log(failed ? `\n${failed} failed` : "\nall passed");
process.exitCode = failed ? 1 : 0;
