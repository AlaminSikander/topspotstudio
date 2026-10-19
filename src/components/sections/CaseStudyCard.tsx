"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import { track } from "@/lib/analytics";
import type { Metric } from "./Blocks";

export function CaseStudyCard({
  href,
  label,
  title,
  metrics,
  summary,
  cta = "Read the Case Study",
}: {
  href: string;
  label: string;
  title: string;
  metrics: Metric[];
  summary: string;
  cta?: string;
}) {
  return (
    <div className="reveal h-full">
      <article className="group card card-hover card-fx relative flex h-full flex-col">
        <div className="surface-navy relative overflow-hidden rounded-t-[19px] px-7 pb-8 pt-6 text-white">
          <div aria-hidden className="bg-grid-dark absolute inset-0" />
          <div
            aria-hidden
            className="absolute -right-12 -top-12 size-40 rounded-full bg-teal/30 blur-2xl transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-125"
          />
          <p className="relative text-xs font-semibold uppercase tracking-[0.14em] text-teal-300">{label}</p>
          <dl className="relative mt-6 grid grid-cols-3 gap-3">
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <dt className="order-2 mt-1.5 text-xs leading-snug text-white/65">{m.label}</dt>
                <dd className="order-1 font-display text-2xl font-bold leading-none tracking-tight sm:text-[1.7rem]">
                  <CountUp value={m.value} className="text-gradient-light" />
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-1 flex-col p-7">
          <h3 className="text-xl">
            <Link
              href={href}
              onClick={() => track("case_study_click", { case_study: href })}
              className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none"
            >
              {title}
            </Link>
          </h3>
          <p className="mt-3 flex-1 text-base leading-relaxed">{summary}</p>
          <span className="mt-6 inline-flex items-center gap-2 font-semibold text-teal-ink group-hover:text-navy">
            {cta}
            <ArrowRight aria-hidden className="btn-arrow size-4" />
          </span>
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[20px] ring-teal ring-offset-2 group-has-[:focus-visible]:ring-[3px]"
        />
      </article>
    </div>
  );
}
