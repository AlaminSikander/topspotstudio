"use client";

import { Button, useDocumentInfo } from "@payloadcms/ui";
import { useEffect, useState } from "react";

type Result = { jsonLd: unknown; issues: string[] };
type State = { version: number; result?: Result; error?: string };

/** Shows the JSON-LD generated from the last saved version, with validation results. */
export function StructuredDataPreview() {
  const { id, collectionSlug } = useDocumentInfo();
  const [version, setVersion] = useState(0);
  const [state, setState] = useState<State>({ version: -1 });

  useEffect(() => {
    if (!id) return;
    let active = true;
    fetch(`/cms-api/${collectionSlug}/${id}/structured-data`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json() as Promise<Result>;
      })
      .then((result) => active && setState({ version, result }))
      .catch((e: Error) => active && setState({ version, error: e.message }));
    return () => {
      active = false;
    };
  }, [id, collectionSlug, version]);

  if (!id) return <p className="tss-muted">Save the document to preview its structured data.</p>;
  const loading = state.version !== version;
  const { result, error } = state;

  return (
    <div className="tss-panel" style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <strong>Generated JSON-LD (last saved version)</strong>
        <Button buttonStyle="secondary" size="small" onClick={() => setVersion((v) => v + 1)} disabled={loading}>
          {loading ? "Checking…" : "Refresh"}
        </Button>
      </div>
      {error ? <p style={{ color: "#b91c1c" }}>{error}</p> : null}
      {result ? (
        <>
          <div style={{ margin: "10px 0" }}>
            {result.issues.length ? (
              result.issues.map((i) => (
                <div key={i} className="tss-check">
                  <span className="tss-dot tss-dot--error" aria-hidden />
                  {i}
                </div>
              ))
            ) : (
              <div className="tss-check">
                <span className="tss-dot tss-dot--ok" aria-hidden />
                Valid JSON-LD with no duplicate or unsupported schema types.
              </div>
            )}
          </div>
          <pre style={{ maxHeight: 360, overflow: "auto", fontSize: 12, background: "var(--theme-elevation-50)", padding: 12, borderRadius: 8 }}>
            {JSON.stringify(result.jsonLd, null, 2)}
          </pre>
          <p className="tss-muted" style={{ margin: 0 }}>
            Schema is built from the page&rsquo;s visible content (headings, FAQs, founders, case studies) and the options below. Free-form JSON is
            intentionally not allowed. Test the live URL in Google&rsquo;s Rich Results Test after publishing.
          </p>
        </>
      ) : null}
    </div>
  );
}
