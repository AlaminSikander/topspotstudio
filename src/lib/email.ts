import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

type Row = [label: string, value: string];

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const fromAddress = () => process.env.FORM_FROM_EMAIL || process.env.SMTP_USER;

export function isEmailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.CONTACT_INBOX && fromAddress());
}

let transporter: Transporter | undefined;

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 587;
    // Port 465 uses implicit TLS; other ports upgrade with STARTTLS when the server offers it.
    const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
      // Keep a slow or unreachable SMTP server from hanging the form request.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }
  return transporter;
}

/** Sends a readable notification to the business inbox over SMTP. */
export async function sendNotification({
  subject,
  heading,
  rows,
  replyTo,
}: {
  subject: string;
  heading: string;
  rows: Row[];
  replyTo: string;
}): Promise<{ ok: boolean; error?: string }> {
  const filled = rows.map(([k, v]) => [k, v?.trim() ? v : "—"] as Row);
  const text = `${heading}\n\n${filled.map(([k, v]) => `${k}: ${v}`).join("\n")}\n`;
  const html = `<div style="font-family:Arial,sans-serif;color:#0F2742;max-width:640px">
<h2 style="margin:0 0 16px">${escapeHtml(heading)}</h2>
<table cellpadding="8" style="border-collapse:collapse;width:100%">${filled
    .map(
      ([k, v]) =>
        `<tr><td style="border-bottom:1px solid #D9E2E8;font-weight:bold;vertical-align:top;width:180px">${escapeHtml(k)}</td><td style="border-bottom:1px solid #D9E2E8;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table></div>`;

  try {
    await getTransporter().sendMail({
      from: fromAddress(),
      to: process.env.CONTACT_INBOX!.split(",").map((s) => s.trim()),
      replyTo,
      subject,
      text,
      html,
    });
  } catch (err) {
    const e = err as { code?: string; message?: string };
    return { ok: false, error: [e.code, e.message].filter(Boolean).join(" ") || String(err) };
  }
  return { ok: true };
}
