"use client";

import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { auditGoals, auditSchema } from "@/lib/forms";
import { routes } from "@/lib/site";
import { FormAlert, Honeypot, SelectField, TextAreaField, TextField } from "./Fields";
import { useFormSubmit } from "./useFormSubmit";

const collect = (fd: FormData) => ({
  name: String(fd.get("name") ?? ""),
  email: String(fd.get("email") ?? ""),
  website: String(fd.get("website") ?? ""),
  businessType: String(fd.get("businessType") ?? ""),
  primaryService: String(fd.get("primaryService") ?? ""),
  location: String(fd.get("location") ?? ""),
  goal: String(fd.get("goal") ?? ""),
  message: String(fd.get("message") ?? ""),
  company_website: String(fd.get("company_website") ?? ""),
});

export function AuditForm() {
  const { status, errors, message, onStart, onSubmit, successRef } = useFormSubmit({
    endpoint: "/api/audit/",
    schema: auditSchema,
    formId: "free_audit",
    startEvent: "free_audit_form_start",
    submitEvent: "free_audit_form_submit",
    collect,
  });

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} className="rounded-[16px] border border-teal/30 bg-teal-soft p-8 focus:outline-none">
        <CheckCircle2 aria-hidden className="size-10 text-teal-ink" />
        <h3 className="mt-4 text-2xl">Audit request received</h3>
        <p className="mt-3 text-lg" role="status">
          Thanks — we’ve received your audit request. We’ll review the website and email you with the findings. If we need
          anything else, we’ll contact you.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onFocus={onStart} className="relative space-y-6" aria-describedby="audit-form-note">
      <Honeypot />
      {status === "error" && message ? <FormAlert tone="error">{message}</FormAlert> : null}
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="name" label="Name" required autoComplete="name" error={errors.name} />
        <TextField id="email" label="Work Email" type="email" required autoComplete="email" inputMode="email" error={errors.email} />
      </div>
      <TextField
        id="website"
        label="Website URL"
        required
        inputMode="url"
        autoComplete="url"
        placeholder="yourbusiness.co.nz"
        error={errors.website}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="businessType"
          label="Business Type"
          required
          placeholder="e.g. Roofing, plumbing, clinic"
          error={errors.businessType}
        />
        <TextField id="primaryService" label="Primary Service" placeholder="e.g. Roof repairs" error={errors.primaryService} />
      </div>
      <TextField
        id="location"
        label="Target Location / Service Area"
        hint="Helpful if you serve customers in specific areas."
        placeholder="e.g. Hamilton, Waikato"
        error={errors.location}
      />
      <SelectField id="goal" label="Main Goal" required options={auditGoals} error={errors.goal} />
      <TextAreaField id="message" label="Anything Else We Should Know?" rows={4} error={errors.message} />

      <div className="space-y-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary w-full disabled:cursor-wait sm:w-auto sm:min-w-64"
        >
          {status === "submitting" ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
          {status === "submitting" ? "Sending…" : "Get My Free SEO Audit"}
        </button>
        <p id="audit-form-note" className="text-sm text-muted">
          By submitting this form, you agree that Top Spot Studio may contact you about your audit request. Read our{" "}
          <Link href={routes.privacy} className="text-link">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
