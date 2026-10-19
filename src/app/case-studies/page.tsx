import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HeroShell } from "@/components/sections/HeroBackdrop";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Callout, CheckList, CtaBand } from "@/components/sections/Blocks";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CtaLink } from "@/components/ui/CtaLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { caseCards } from "@/content/case-studies";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/schema";
import { routes } from "@/lib/site";

const meta = {
  title: "SEO Case Studies & Results | Top Spot Studio",
  description:
    "Explore selected SEO case studies from the team behind Top Spot Studio, including organic growth, technical SEO, content and lead-generation results.",
  path: routes.caseStudies,
};

export const metadata: Metadata = pageMetadata(meta);

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Case Studies", path: routes.caseStudies },
];

const presentSteps = [
  { t: "Starting point", d: "What the website or search presence looked like before the work began." },
  { t: "Problem", d: "The most important barriers limiting visibility, relevance or conversions." },
  { t: "Work completed", d: "The SEO actions actually delivered - technical, content, on-page, local or authority work." },
  { t: "Timeframe", d: "How long the measured period lasted." },
  { t: "Outcome", d: "What changed in traffic, visibility, engagement or enquiries, with context around the numbers." },
  {
    t: "Limitations",
    d: "Anything the data does not prove, including external factors, incomplete attribution or areas outside our control.",
  },
];

export default function CaseStudiesHub() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ type: "CollectionPage", path: meta.path, name: meta.title, description: meta.description }),
          {
            "@type": "ItemList",
            itemListElement: caseCards.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(c.href),
              name: c.title,
            })),
          },
          breadcrumbSchema(crumbs),
        )}
      />

      <HeroShell innerClassName="pb-16 pt-8 md:pb-20 md:pt-10">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="rise-in badge" style={{ "--d": "40ms" } as CSSProperties}>
                <span aria-hidden className="badge-dot" />
                Selected SEO work &amp; results
              </p>
              <h1 className="rise-in mt-6" style={{ "--d": "90ms" } as CSSProperties}>
                SEO Case Studies &amp; <span className="text-gradient">Results</span>
              </h1>
              <p className="rise-in lead mt-6 max-w-[680px]" style={{ "--d": "160ms" } as CSSProperties}>
                Real SEO work, presented with context. These case studies show how the people behind Top Spot Studio have
                approached organic growth across different business models, from SaaS and training to influencer
                marketing.
              </p>
              <p className="rise-in mt-4 max-w-[680px]" style={{ "--d": "210ms" } as CSSProperties}>
                We focus on the starting point, the work completed, the timeframe and the measurable outcome - not isolated
                screenshots or inflated claims.
              </p>
            </div>
            <div className="rise-in" style={{ "--d": "260ms" } as CSSProperties}>
              <Callout title="Transparency note">
                <p>
                  Top Spot Studio is a new agency. The case studies below are selected projects led or managed by the
                  founders before Top Spot Studio launched. Where a client has not approved public naming, the business is
                  presented anonymously.
                </p>
              </Callout>
            </div>
          </div>
      </HeroShell>

      <Section id="featured" labelledBy="featured-title" className="!pt-14 md:!pt-20">
        <SectionHeader
          id="featured-title"
          title="Featured Case Studies"
          intro={
            <p>
              Three projects. Three different business models. One common approach: diagnose the real search problem,
              prioritise the highest-impact work, execute consistently, and measure what changed.
            </p>
          }
        />
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseCards.map((c) => (
            <li key={c.href}>
              <CaseStudyCard {...c} />
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={routes.audit} location="after_cards" arrow>
            Get a Free SEO Audit
          </CtaLink>
          <CtaLink href={routes.contact} variant="secondary">
            Talk about your project
          </CtaLink>
        </div>
      </Section>

      <Section id="what-they-show" labelledBy="show-title" tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="eyebrow reveal">Approach</p>
            <h2 id="show-title" className="reveal mt-4">What These Case Studies Show</h2>
            <p className="mt-5 text-lg">
              SEO is rarely one task. The strongest gains usually come from several parts of the search system working
              together.
            </p>
            <p className="mt-6 text-base text-muted">
              The same thinking runs through our{" "}
              <Link href={routes.nzSeo} className="text-link">
                SEO services
              </Link>
              ,{" "}
              <Link href={routes.nzLocalSeo} className="text-link">
                local SEO
              </Link>
              ,{" "}
              <Link href={routes.tradies} className="text-link">
                SEO for tradies
              </Link>{" "}
              and{" "}
              <Link href={routes.roofing} className="text-link">
                roofing SEO
              </Link>{" "}
              work.
            </p>
          </div>
          <CheckList
            className="text-base md:text-lg"
            items={[
              "Strategy built around the business model, not a generic checklist.",
              "Keyword research tied to real services, products and commercial intent.",
              "Technical and on-page improvements that make important pages easier to understand and use.",
              "Content planned to build relevance and capture demand over time.",
              "Internal linking and authority work that support priority pages.",
              "Tracking and reporting that connect visibility with meaningful business outcomes where data is available.",
            ]}
          />
        </div>
      </Section>

      <Section id="how-we-present" labelledBy="present-title">
        <SectionHeader
          id="present-title"
          title="How We Present Results"
          intro={
            <p>
              A case study should help you understand what happened, not just show a winning chart. Every Top Spot Studio
              case study should follow the same evidence-led structure:
            </p>
          }
        />
        <ol className="reveal mt-12 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line shadow-[var(--shadow-card)] sm:grid-cols-2 lg:grid-cols-3">
          {presentSteps.map((s, i) => (
            <li key={s.t} className="group relative bg-white p-7 transition-colors duration-300 hover:bg-teal-soft/40 sm:p-8">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-teal to-sky font-display text-sm font-bold text-white shadow-[0_8px_20px_-10px_rgb(20_184_166/0.8)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl">{s.t}</h3>
              <p className="mt-2 text-base leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="context" labelledBy="context-title" tone="white">
        <div className="mx-auto max-w-[760px]">
          <h2 id="context-title" className="reveal text-center">
            Results Matter, But <span className="text-gradient">Context</span> Matters Too
          </h2>
          <div className="reveal prose-tss mx-auto mt-8 rounded-[24px] border border-line bg-gradient-to-br from-white to-offwhite p-7 text-lg shadow-[var(--shadow-card)] sm:p-10">
            <p>
              No two SEO projects start from the same place. A large percentage increase from a tiny baseline is different
              from incremental growth on an established site. A traffic gain is also not the same as a lead or sale.
            </p>
            <p>
              That is why we show the baseline, timeframe and type of work alongside the result. Where lead or conversion
              data exists, we include it. Where it does not, we do not pretend that traffic alone proves revenue impact.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Want to know what your own biggest SEO opportunities are?"
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        secondary={{ label: "Talk about your project", href: routes.contact }}
      >
        <p>
          Start with a focused audit. We will look at your current search visibility, important pages, competitors and
          obvious technical or local gaps, then highlight the areas that deserve attention first.
        </p>
      </CtaBand>
    </>
  );
}
