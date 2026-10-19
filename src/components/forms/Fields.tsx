import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";

const control =
  "mt-2 block w-full rounded-[12px] border bg-white/90 px-4 py-3 text-base text-navy shadow-[inset_0_1px_2px_rgb(15_39_66/0.04)] placeholder:text-muted/70 transition-[border-color,box-shadow,background-color] duration-300 hover:border-navy/25 focus:border-teal focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal/15 aria-[invalid=true]:border-[#c2412d] aria-[invalid=true]:ring-[#c2412d]/10";

function Label({ id, label, required, hint }: { id: string; label: string; required?: boolean; hint?: string }) {
  return (
    <>
      <label htmlFor={id} className="block font-semibold text-navy">
        {label}
        {required ? (
          <span className="ml-1 text-[#b4432f]" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-2 text-sm font-normal text-muted">(optional)</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-[#b4432f]">
      <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
      {error}
    </p>
  );
}

const describedBy = (id: string, hint?: string, error?: string) =>
  [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

type Common = { id: string; label: string; hint?: string; error?: string; required?: boolean };

export function TextField({ id, label, hint, error, required, className = "", ...rest }: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} hint={hint} />
      <input
        id={id}
        name={id}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${control} border-line`}
        {...rest}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

export function TextAreaField({ id, label, hint, error, required, className = "", ...rest }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} hint={hint} />
      <textarea
        id={id}
        name={id}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        rows={5}
        className={`${control} border-line`}
        {...rest}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  required,
  options,
  placeholder = "Select an option",
  className = "",
  ...rest
}: Common & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[]; placeholder?: string }) {
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} hint={hint} />
      <select
        id={id}
        name={id}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        defaultValue=""
        className={`${control} select-chevron appearance-none border-line pr-10`}
        {...rest}
      >
        <option value="" disabled={required}>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <FieldError id={id} error={error} />
    </div>
  );
}

export function CheckboxGroup({
  id,
  legend,
  options,
  error,
  required,
}: {
  id: string;
  legend: string;
  options: readonly string[];
  error?: string;
  required?: boolean;
}) {
  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined} aria-invalid={error ? true : undefined}>
      <legend className="font-semibold text-navy">
        {legend}
        {required ? (
          <span className="ml-1 text-[#b4432f]" aria-hidden>
            *
          </span>
        ) : null}
      </legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o}
            className="flex min-h-12 cursor-pointer items-center gap-3 rounded-[12px] border border-line bg-white px-4 py-2.5 text-base text-navy transition-[border-color,background-color,box-shadow] duration-300 hover:border-teal/40 has-[:checked]:border-teal has-[:checked]:bg-teal-soft has-[:checked]:shadow-[0_8px_20px_-14px_rgb(20_184_166/0.8)] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-teal/20"
          >
            <input type="checkbox" name={id} value={o} className="size-4 accent-[#0f766e]" />
            {o}
          </label>
        ))}
      </div>
      <FieldError id={id} error={error} />
    </fieldset>
  );
}

export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
      <label htmlFor="company_website">Leave this field empty</label>
      <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FormAlert({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-[12px] border p-4 text-base ${
        tone === "error" ? "border-[#e8b4aa] bg-[#fdf1ee] text-[#8a2f1f]" : "border-teal/30 bg-teal-soft text-navy"
      }`}
    >
      {children}
    </div>
  );
}
