export function PreviewBanner({ path, status }: { path: string; status: string }) {
  return (
    <div
      role="status"
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto flex max-w-[720px] flex-wrap items-center justify-between gap-3 rounded-[16px] border border-coral/40 bg-navy px-5 py-3 text-sm text-white shadow-[var(--shadow-lift)]"
    >
      <span>
        <strong>Preview</strong> — showing the latest {status === "published" ? "saved version" : "draft"}. Only signed-in editors can see this, and
        it is not indexed.
      </span>
      <span className="flex gap-4">
        <a href={`/admin`} className="font-semibold text-teal-300 underline underline-offset-4">
          Back to CMS
        </a>
        <a href={`/exit-preview/?path=${encodeURIComponent(path)}`} className="font-semibold text-teal-300 underline underline-offset-4">
          Exit preview
        </a>
      </span>
    </div>
  );
}
