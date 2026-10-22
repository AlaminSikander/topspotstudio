import { SITE_ENV, SITE_URL } from "@/lib/site";

export function SnippetWarning() {
  return (
    <div className="tss-warning" role="note">
      <strong>Security warning.</strong> Scripts added here run on the public website with full access to page content, forms and
      visitor browsers. Only paste code supplied directly by Google or another approved provider. Saving a verification code does not
      mean verification succeeded: confirm it in the provider&rsquo;s dashboard after the change is live. Changes are recorded in the
      audit log.
    </div>
  );
}

export function ConsentHelp() {
  return (
    <p className="tss-muted" style={{ margin: "0 0 16px" }}>
      Consent-gated scripts are output as <code>type=&quot;text/plain&quot;</code> with a <code>data-category</code> attribute, so they do
      not run until a consent manager (e.g. CookieYes, Cookiebot or Klaro) activates that category. Without a consent manager installed
      these scripts never run.
    </p>
  );
}

export function ProofHelp() {
  return (
    <p className="tss-muted" style={{ margin: "8px 0 0" }}>
      The figures and comparison chart in this section come from <strong>Site settings → Shared proof</strong>, so they stay identical on
      every page.
    </p>
  );
}

export function SiteUrlInfo() {
  const url = SITE_ENV === "production" || process.env.NEXT_PUBLIC_SITE_URL ? SITE_URL : `${SITE_URL} (NEXT_PUBLIC_SITE_URL not set — default)`;
  const env = process.env.VERCEL_ENV
    ? `${SITE_ENV} (Vercel ${process.env.VERCEL_ENV} deployment)`
    : process.env.NEXT_PUBLIC_SITE_ENV
      ? SITE_ENV
      : `${SITE_ENV} (NEXT_PUBLIC_SITE_ENV not set — default)`;
  return (
    <div className="tss-panel" style={{ marginBottom: 16 }}>
      <p style={{ margin: 0 }}>
        <strong>Public base URL:</strong> {url}
        <br />
        <strong>Environment:</strong> {env}
      </p>
      <p className="tss-muted" style={{ margin: "6px 0 0" }}>
        Canonicals, the sitemap and structured data use this base URL. Vercel Production always uses https://topspotstudio.com and is
        indexable; Vercel Previews are noindex and use NEXT_PUBLIC_SITE_URL, so a preview can never publish production canonicals by
        accident. Outside Vercel, NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_SITE_ENV apply (a new deployment is needed after changing them).
      </p>
    </div>
  );
}
