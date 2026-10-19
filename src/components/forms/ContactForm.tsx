"use client";

import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema, contactServices, contactSources } from "@/lib/forms";
import { routes } from "@/lib/site";
import { CheckboxGroup, FormAlert, Honeypot, SelectField, TextAreaField, TextField } from "./Fields";
import { useFormSubmit } from "./useFormSubmit";

const collect = (fd: FormData) => ({
  name: String(fd.get("name") ?? ""),
  businessName: String(fd.get("businessName") ?? ""),
  email: String(fd.get("email") ?? ""),
  phone: String(fd.get("phone") ?? ""),
  website: String(fd.get("website") ?? ""),
  location: String(fd.get("location") ?? ""),
  services: fd.getAll("services").map(String),
  message: String(fd.get("message") ?? ""),
  source: String(fd.get("source") ?? ""),
  company_website: String(fd.get("company_website") ?? ""),
});

export function ContactForm() {
  const { status, errors, message, onStart, onSubmit, successRef } = useFormSubmit({
    endpoint: "/api/contact/",
    schema: contactSchema,
    formId: "contact",
    startEvent: "contact_form_start",
    submitEvent: "contact_form_submit",
    collect,
  });

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} className="rounded-[16px] border border-teal/30 bg-teal-soft p-8 focus:outline-none">
        <CheckCircle2 aria-hidden className="size-10 text-teal-ink" />
        <h3 className="mt-4 text-2xl">Enquiry received</h3>
        <p className="mt-3 text-lg" role="status">
          Thanks — we’ve received your enquiry. One of the founders will review it and reply with the most sensible next
          step based on what you shared.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onFocus={onStart} className="relative space-y-6" aria-describedby="contact-form-note">
      <Honeypot />
      {status === "error" && message ? <FormAlert tone="error">{message}</FormAlert> : null}
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="name" label="Full Name" required autoComplete="name" error={errors.name} />
        <TextField id="businessName" label="Business Name" autoComplete="organization" error={errors.businessName} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="email" label="Work Email" type="email" required autoComplete="email" inputMode="email" error={errors.email} />
        <TextField id="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="website"
          label="Website URL"
          inputMode="url"
          autoComplete="url"
          placeholder="yourbusiness.co.nz"
          hint="Helpful for SEO or website enquiries."
          error={errors.website}
        />
        <TextField
          id="location"
          label="Business Location / Service Area"
          placeholder="e.g. Hamilton, Waikato or Auckland"
          error={errors.location}
        />
      </div>
      <CheckboxGroup id="services" legend="What do you need help with?" options={contactServices} required error={errors.services} />
      <TextAreaField
        id="message"
        label="What are you trying to improve?"
        required
        placeholder="Tell us what you are working on, what is not working, or what you want to improve."
        error={errors.message}
      />
      <SelectField id="source" label="How did you hear about us?" options={contactSources} placeholder="Choose one" error={errors.source} />

      <div className="space-y-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary w-full disabled:cursor-wait sm:w-auto sm:min-w-64"
        >
          {status === "submitting" ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
          {status === "submitting" ? "Sending…" : "Send My Enquiry"}
        </button>
        <p id="contact-form-note" className="text-sm text-muted">
          By submitting this form, you agree that Top Spot Studio may use the information you provide to respond to your
          enquiry. We will not add you to a marketing list without your permission. Read our{" "}
          <Link href={routes.privacy} className="text-link">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
