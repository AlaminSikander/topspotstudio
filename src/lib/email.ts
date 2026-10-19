import "server-only";

type Row = [label: string, value: string];

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_INBOX && process.env.FORM_FROM_EMAIL);
}

/** Sends a readable notification to the business inbox via the Resend REST API. */
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

  const res = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.FORM_FROM_EMAIL,
      to: process.env.CONTACT_INBOX!.split(",").map((s) => s.trim()),
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
  });
  if (!res.ok) {
    return { ok: false, error: `Resend responded ${res.status}` };
  }
  return { ok: true };
}
