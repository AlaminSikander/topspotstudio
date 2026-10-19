// Local stand-in for the Resend API used in QA: logs each email payload it receives.
// Run: node scripts/mock-resend.mjs  (listens on :4010) and set RESEND_API_URL=http://localhost:4010/emails
import { createServer } from "node:http";
import { appendFileSync } from "node:fs";

const LOG = process.env.MOCK_LOG || ".tmp/mock-resend.log";

createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    appendFileSync(LOG, `${new Date().toISOString()} ${req.method} ${req.url} auth=${Boolean(req.headers.authorization)}\n${body}\n\n`);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ id: "mock-email-id" }));
  });
}).listen(4010, () => console.log("mock resend listening on :4010"));
