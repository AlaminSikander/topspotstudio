// Local stand-in SMTP server used in QA: logs each message it receives.
// Run: node scripts/mock-smtp.mjs  (listens on :2525) and set SMTP_HOST=localhost, SMTP_PORT=2525
import { createServer } from "node:net";
import { appendFileSync } from "node:fs";

const LOG = process.env.MOCK_LOG || ".tmp/mock-smtp.log";

createServer((socket) => {
  let buffer = "";
  let inData = false;
  let envelope = { from: "", to: [] };
  let data = "";
  const reply = (line) => socket.write(`${line}\r\n`);

  reply("220 mock-smtp ready");
  socket.on("data", (chunk) => {
    buffer += chunk.toString("utf8");
    let idx;
    while ((idx = buffer.indexOf("\r\n")) !== -1) {
      const line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      if (inData) {
        if (line === ".") {
          inData = false;
          appendFileSync(LOG, `${new Date().toISOString()} from=${envelope.from} to=${envelope.to.join(",")}\n${data}\n\n`);
          envelope = { from: "", to: [] };
          data = "";
          reply("250 OK: queued");
        } else {
          data += `${line.startsWith("..") ? line.slice(1) : line}\n`;
        }
        continue;
      }
      const cmd = line.slice(0, 4).toUpperCase();
      if (cmd === "EHLO" || cmd === "HELO") {
        socket.write("250-mock-smtp\r\n250-AUTH PLAIN\r\n250 8BITMIME\r\n");
      } else if (cmd === "AUTH") {
        reply("235 Authentication successful");
      } else if (cmd === "MAIL") {
        envelope.from = line.slice(10).trim();
        reply("250 OK");
      } else if (cmd === "RCPT") {
        envelope.to.push(line.slice(8).trim());
        reply("250 OK");
      } else if (cmd === "DATA") {
        inData = true;
        reply("354 End data with <CR><LF>.<CR><LF>");
      } else if (cmd === "QUIT") {
        reply("221 Bye");
        socket.end();
      } else {
        reply("250 OK");
      }
    }
  });
  socket.on("error", () => {});
}).listen(2525, () => console.log("mock smtp listening on :2525"));
