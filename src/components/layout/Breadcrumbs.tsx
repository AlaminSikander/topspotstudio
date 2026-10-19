import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/schema";

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const link = dark ? "text-white/70 hover:text-white" : "text-muted hover:text-navy";
  const plain = dark ? "text-white/70" : "text-muted";
  const current = dark ? "text-white" : "text-navy";
  return (
    <nav aria-label="Breadcrumb" className="rise-in text-sm">
      <ol
        className={`inline-flex flex-wrap items-center gap-1.5 rounded-full border px-4 py-1.5 backdrop-blur ${
          dark ? "border-white/10 bg-white/[0.05]" : "border-white/80 bg-white/60 shadow-[0_4px_14px_-10px_rgb(15_39_66/0.3)]"
        }`}
      >
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.name}-${i}`} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={`font-semibold ${current}`}>
                  {c.name}
                </span>
              ) : (
                <>
                  {c.path ? (
                    <Link href={c.path} className={`${link} underline-offset-4 hover:underline`}>
                      {c.name}
                    </Link>
                  ) : (
                    <span className={plain}>{c.name}</span>
                  )}
                  <ChevronRight aria-hidden className={`size-3.5 ${dark ? "text-white/40" : "text-muted/60"}`} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
