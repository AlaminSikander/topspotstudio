import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, MessagesSquare, Plus } from "lucide-react";
import { SectionHeader } from "./Section";
import { routes } from "@/lib/site";

export function FaqSection({ items, title = "Frequently Asked Questions" }: { items: FaqItem[]; title?: string }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section relative overflow-clip bg-white">
      <div
        aria-hidden
        className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_45%_55%_at_0%_30%,#000,transparent_70%)]"
      />
      <div className="container-site relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader id="faq-title" eyebrow="FAQ" title={title} />
          <div className="reveal mt-8 hidden max-w-sm rounded-[20px] border border-line bg-gradient-to-br from-teal-soft to-white p-6 lg:block" style={{ "--i": 1 } as CSSProperties}>
            <span className="icon-tile size-10 rounded-[12px]">
              <MessagesSquare aria-hidden className="size-[18px]" strokeWidth={1.75} />
            </span>
            <p className="mt-4 font-semibold text-navy">Have a question that isn’t covered here?</p>
            <Link href={routes.contact} className="group mt-3 inline-flex items-center gap-1.5 text-base font-semibold text-teal-ink hover:text-navy">
              Ask the founders directly
              <ArrowRight aria-hidden className="btn-arrow size-4" />
            </Link>
          </div>
        </div>
        <FaqList items={items} />
      </div>
    </section>
  );
}

export type FaqItem = { q: string; a: string };

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={item.q}
          className="faq-item reveal group rounded-[18px] border border-line bg-white px-6 shadow-[0_1px_2px_rgb(15_39_66/0.04)] transition-[border-color,box-shadow] duration-300 hover:border-teal/35 open:border-teal/40 open:shadow-[var(--shadow-card)] md:px-7 [&_summary::-webkit-details-marker]:hidden"
          style={{ "--i": Math.min(i, 6) } as CSSProperties}
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left md:py-6">
            <span className="font-display text-lg font-semibold leading-snug text-navy md:text-xl">{item.q}</span>
            <span
              aria-hidden
              className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-teal-ink transition-[transform,background-color,color,border-color] duration-500 ease-[var(--ease-spring)] group-hover:border-teal/50 group-open:rotate-45 group-open:border-transparent group-open:bg-gradient-to-br group-open:from-teal group-open:to-sky group-open:text-white"
            >
              <Plus className="size-4" />
            </span>
          </summary>
          <div className="space-y-3 pb-6 pr-12 text-base leading-relaxed">
            {item.a.split("\n").map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
