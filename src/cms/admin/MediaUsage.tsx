"use client";

import Link from "next/link";
import { useDocumentInfo } from "@payloadcms/ui";
import { useEffect, useState } from "react";
import type { MediaUse } from "../lib/media-usage";

export function MediaUsage() {
  const { id } = useDocumentInfo();
  const [uses, setUses] = useState<MediaUse[] | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/cms-api/media/${id}/usage`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : []))
      .then(setUses)
      .catch(() => setUses([]));
  }, [id]);

  if (!id) return null;
  return (
    <div className="tss-panel" style={{ margin: "12px 0 20px" }}>
      <strong>Where this image is used</strong>
      {uses === null ? <p className="tss-muted">Checking…</p> : null}
      {uses?.length === 0 ? <p className="tss-muted">Not used on any page, post or setting. Uploading a replacement file keeps every reference.</p> : null}
      {uses?.length ? (
        <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
          {uses.map((u) => (
            <li key={`${u.collection}-${u.id}`}>
              {u.collection === "globals" ? (
                <Link href="/admin/globals/site-settings">{u.title}</Link>
              ) : (
                <Link href={`/admin/collections/${u.collection}/${u.id}`}>{u.title}</Link>
              )}{" "}
              <span className="tss-muted">({u.path})</span>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="tss-muted" style={{ margin: "8px 0 0" }}>
        To replace the image everywhere, upload a new file on this record instead of creating a new one.
      </p>
    </div>
  );
}
