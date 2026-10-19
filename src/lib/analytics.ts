export type TrackedEvent =
  | "free_audit_cta_click"
  | "free_audit_form_start"
  | "free_audit_form_submit"
  | "contact_form_start"
  | "contact_form_submit"
  | "case_study_click"
  | "service_cta_click"
  | "outbound_email_click";

type EventParams = { page_path?: string; cta_location?: string; form_id?: string; case_study?: string };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Pushes a GTM event. Never pass names, emails, phone numbers or message text. */
export function track(event: TrackedEvent, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_path: window.location.pathname, ...params });
}
