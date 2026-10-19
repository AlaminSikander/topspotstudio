import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaLink } from "@/components/ui/CtaLink";
import { Callout, CheckList, CtaBand, MetricGrid, type Metric } from "./Blocks";
import { HeroShell } from "./HeroBackdrop";
import { Section } from "./Section";
import type { Crumb } from "@/lib/schema";
import { routes } from "@/lib/site";

export type ResultRow = { result: string; metric: string; context: string };

export function CaseStudyLayout({
  crumbs,
  eyebrow,
  title,
  summary,
  heroMetrics,
  glance,
  challenge,
  goals,
  work,
  resultsIntro,
  results,
  resultsVisual,
  afterResults,
  whyItWorked,
  takeaway,
  transparency,
  finalTitle,
  finalBody,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  summary: string;
  heroMetrics: Metric[];
  glance: { term: string; value: string }[];
  challenge: string[];
  goals: string[];
  work: { title: string; body: string }[];
  resultsIntro: string;
  results: ResultRow[];
  resultsVisual?: ReactNode;
  afterResults?: ReactNode;
  whyItWorked: { lead: string; body: string }[];
  takeaway: ReactNode;
  transparency: string;
  finalTitle: string;
  finalBody: string;
}) {
  return (
    <>
      <HeroShell tone="dark" innerClassName="pb-16 pt-8 md:pb-24 md:pt-10">
          <Breadcrumbs items={crumbs} tone="dark" />
          <div className="mt-10 max-w-[940px]">
            <p className="rise-in badge badge-dark" style={{ "--d": "40ms" } as CSSProperties}>
              <span aria-hidden className="badge-dot" />
              {eyebrow}
            </p>
            <h1 className="rise-in mt-6 text-white" style={{ "--d": "90ms" } as CSSProperties}>
              {title}
            </h1>
            <p className="rise-in mt-6 max-w-[760px] text-lg leading-relaxed text-white/75 md:text-xl" style={{ "--d": "160ms" } as CSSProperties}>
              {summary}
            </p>
            <div className="rise-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "230ms" } as CSSProperties}>
              <CtaLink href={routes.audit} location="case_hero" arrow>
                Get a Free SEO Audit
              </CtaLink>
              <CtaLink href={routes.caseStudies} variant="light">
                Browse all case studies
              </CtaLink>
            </div>
          </div>
          <div className="mt-14">
            <MetricGrid metrics={heroMetrics} tone="navy" />
          </div>
      </HeroShell>

      <Section tone="white" labelledBy="glance-title">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 id="glance-title">Project at a Glance</h2>
            <dl className="reveal mt-6 divide-y divide-line overflow-hidden rounded-[20px] border border-line bg-gradient-to-br from-offwhite to-white shadow-[var(--shadow-card)]">
              {glance.map((g) => (
                <div key={g.term} className="grid gap-1 px-5 py-4 transition-colors hover:bg-teal-soft/50 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">{g.term}</dt>
                  <dd className="text-base text-navy">{g.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="reveal rounded-[20px] border border-coral/20 bg-gradient-to-br from-coral-soft to-white p-6 sm:p-7">
              <h2 className="text-2xl md:text-[1.75rem]">The Challenge</h2>
              <CheckList variant="gap" className="mt-5 text-base" items={challenge} />
            </div>
            <div className="reveal rounded-[20px] border border-teal/20 bg-gradient-to-br from-teal-soft to-white p-6 sm:p-7" style={{ "--i": 1 } as CSSProperties}>
              <h2 className="text-2xl md:text-[1.75rem]">The Goals</h2>
              <CheckList className="mt-5 text-base" items={goals} />
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy="work-title">
        <div className="reveal">
          <p className="eyebrow">The work</p>
          <h2 id="work-title" className="mt-4">What We Worked On</h2>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {work.map((w, i) => (
            <li key={w.title} className="reveal" style={{ "--i": i % 4 } as CSSProperties}>
              <div className="group card card-hover card-fx flex h-full gap-5 p-7">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal to-sky font-display text-sm font-bold text-white shadow-[0_10px_22px_-10px_rgb(20_184_166/0.8)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl">{w.title}</h3>
                  <p className="mt-3 text-base leading-relaxed">{w.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="white" labelledBy="results-title">
        <div className={`grid gap-12 ${resultsVisual ? "lg:grid-cols-[1.1fr_0.9fr] lg:gap-16" : ""}`}>
          <div>
            <div className="reveal">
              <p className="eyebrow">Outcome</p>
              <h2 id="results-title" className="mt-4">The Results</h2>
              <p className="mt-5 text-lg">{resultsIntro}</p>
            </div>
            <div className="reveal mt-8 overflow-hidden rounded-[20px] border border-line shadow-[var(--shadow-card)]">
              <table className="w-full text-left text-base">
                <thead className="surface-navy text-sm text-white">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Result</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Metric</th>
                    <th scope="col" className="hidden px-5 py-3 font-semibold sm:table-cell">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-white">
                  {results.map((r) => (
                    <tr key={r.metric} className="transition-colors hover:bg-teal-soft/40">
                      <th scope="row" className="text-gradient px-5 py-4 font-display text-xl font-bold">
                        {r.result}
                      </th>
                      <td className="px-5 py-4">
                        <span className="font-medium text-navy">{r.metric}</span>
                        <span className="mt-1 block text-sm text-muted sm:hidden">{r.context}</span>
                      </td>
                      <td className="hidden px-5 py-4 text-sm text-muted sm:table-cell">{r.context}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {resultsVisual ? <div className="reveal lg:pt-16">{resultsVisual}</div> : null}
        </div>
        {afterResults ? <div className="mt-12">{afterResults}</div> : null}
        <div className="mt-10">
          <CtaLink href={routes.audit} location="after_results" arrow>
            See What We’d Fix on Your Site
          </CtaLink>
        </div>
      </Section>

      <Section labelledBy="why-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="why-title" className="reveal">Why the Strategy Worked</h2>
            <ul className="mt-8 space-y-4">
              {whyItWorked.map((w, i) => (
                <li
                  key={w.lead}
                  className="reveal relative rounded-[16px] border border-line bg-white py-4 pl-6 pr-5 text-base leading-relaxed transition-[border-color,transform] duration-500 hover:[transform:translateX(4px)] hover:border-teal/40"
                  style={{ "--i": i } as CSSProperties}
                >
                  <span aria-hidden className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-gradient-to-b from-teal to-sky" />
                  <strong className="text-navy">{w.lead}</strong> {w.body}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="reveal">The Takeaway</h2>
            <div className="reveal mt-8 space-y-4 rounded-[20px] border border-line bg-gradient-to-br from-white to-teal-soft/60 p-7 text-lg shadow-[var(--shadow-card)]">
              {takeaway}
            </div>
            <Callout title="Transparency note" className="mt-8">
              <p>{transparency}</p>
            </Callout>
          </div>
        </div>
      </Section>

      <CtaBand
        title={finalTitle}
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        secondary={{ label: "Contact Top Spot Studio", href: routes.contact }}
        location="case_final"
      >
        <p>{finalBody}</p>
      </CtaBand>

      <nav aria-label="More case studies" className="bg-offwhite pb-20">
        <div className="container-site flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href={routes.caseStudies} className="group inline-flex items-center gap-2 font-semibold text-teal-ink hover:text-navy">
            <ArrowLeft aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-x-1" /> Browse all case studies
          </Link>
          <Link href={routes.nzSeo} className="group inline-flex items-center gap-2 font-semibold text-teal-ink hover:text-navy">
            See our SEO services <ArrowRight aria-hidden className="btn-arrow size-4" />
          </Link>
        </div>
      </nav>
    </>
  );
}
