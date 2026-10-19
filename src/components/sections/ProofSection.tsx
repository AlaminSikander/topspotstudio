import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Callout, MetricGrid, type Metric } from "./Blocks";
import { SectionHeader } from "./Section";
import { ComparisonBars } from "@/components/visuals/Diagrams";
import { routes } from "@/lib/site";

export const influencerMetrics: Metric[] = [
  {
    value: "99",
    label: "Tracked form leads",
    context: "From an anonymised Malaysian influencer marketing agency’s approximately seven-month SEO project.",
  },
  {
    value: "+31.2%",
    label: "Google Search clicks",
    context: "869 → 1,140 between the documented comparison periods.",
  },
  {
    value: "+88.0%",
    label: "Google Search impressions",
    context: "32.6K → 61.3K between the documented comparison periods.",
  },
];

export function InfluencerComparison() {
  return (
    <ComparisonBars
      title="Documented comparison periods"
      rows={[
        { label: "Google Search clicks", before: 869, after: 1140, beforeLabel: "869", afterLabel: "1,140", change: "+31.2%" },
        { label: "Google Search impressions", before: 32.6, after: 61.3, beforeLabel: "32.6K", afterLabel: "61.3K", change: "+88.0%" },
      ]}
      caption="Google Search Console figures for an anonymised Malaysian influencer marketing agency. One historical project — not a forecast or guarantee."
    />
  );
}

export function ProofSection({
  id = "proof",
  eyebrow = "Experience & proof",
  title,
  intro,
  note,
  noteTitle = "Proof note",
  ctaLabel = "View SEO Case Studies",
  metrics = influencerMetrics,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro: ReactNode;
  note: ReactNode;
  noteTitle?: string;
  ctaLabel?: string;
  metrics?: Metric[];
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section relative overflow-clip bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb -right-40 top-20 size-[460px] bg-sky/10" />
        <div className="orb -left-32 bottom-0 size-[380px] bg-teal/10 [animation-delay:-11s]" />
      </div>
      <div className="container-site relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <SectionHeader id={`${id}-title`} eyebrow={eyebrow} title={title} intro={intro} />
          <div className="reveal" style={{ "--i": 1 } as CSSProperties}>
            <InfluencerComparison />
          </div>
        </div>
        <div className="mt-14">
          <MetricGrid metrics={metrics} />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <Callout title={noteTitle}>{note}</Callout>
          <Link
            href={routes.caseStudies}
            className="btn btn-secondary group min-h-12 lg:mx-4"
          >
            {ctaLabel}
            <ArrowRight aria-hidden className="btn-arrow size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
