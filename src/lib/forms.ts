import { z } from "zod";

export const MIN_FILL_MS = 2500;

const trimmed = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);

/** Accepts "example.co.nz" or "https://example.co.nz" and normalises to an absolute URL. */
const websiteUrl = trimmed(300)
  .transform((v) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v))
  .refine((v) => {
    if (!v) return true;
    try {
      const u = new URL(v);
      return /\.[a-z]{2,}$/i.test(u.hostname);
    } catch {
      return false;
    }
  }, "Enter a valid website address, for example yourbusiness.co.nz.");

const email = trimmed(200).pipe(z.email("Enter a valid email address, for example name@yourbusiness.co.nz."));

const spamGuards = {
  company_website: z.string().max(500).optional(),
  startedAt: z.number().int().positive(),
};

export const auditGoals = [
  "More leads",
  "Better Google rankings",
  "Better local visibility",
  "Fix website SEO issues",
  "Improve website performance",
  "Not sure yet",
] as const;

export const auditSchema = z.object({
  name: trimmed(120).min(2, "Please enter your name."),
  email,
  website: websiteUrl.refine((v) => v.length > 0, "Please enter your website address."),
  businessType: trimmed(120).min(2, "Tell us what type of business you run, for example roofing or plumbing."),
  primaryService: trimmed(160).optional().default(""),
  location: trimmed(160).optional().default(""),
  goal: z.enum(auditGoals, { message: "Choose the goal that fits best." }),
  message: trimmed(2000).optional().default(""),
  ...spamGuards,
});

export const contactServices = ["SEO", "Local SEO", "Website Design / Development", "Not Sure Yet", "Other"] as const;
export const contactSources = ["Google", "Referral", "LinkedIn", "Email", "Other"] as const;

export const contactSchema = z.object({
  name: trimmed(120).min(2, "Please enter your full name."),
  businessName: trimmed(160).optional().default(""),
  email,
  phone: trimmed(40).optional().default(""),
  website: websiteUrl.optional().default(""),
  location: trimmed(160).optional().default(""),
  services: z.array(z.enum(contactServices)).min(1, "Choose at least one option, or “Not Sure Yet”."),
  message: trimmed(3000).min(10, "Tell us a little about what you want to improve."),
  source: z.union([z.enum(contactSources), z.literal("")]).optional().default(""),
  ...spamGuards,
});

export type AuditInput = z.infer<typeof auditSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

export type FormResult =
  | { ok: true }
  | { ok: false; fieldErrors?: Record<string, string>; message?: string };

export function flattenErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
