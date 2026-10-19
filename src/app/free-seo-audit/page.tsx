import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { FileText, Gauge, Globe2, LayoutTemplate, MapPin, Search, Quote } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Callout, CheckList, CtaBand, FeatureList, ProcessSteps } from "@/components/sections/Blocks";
import { FaqSection, type FaqItem } from "@/components/sections/FaqList";
import { AuditForm } from "@/components/forms/AuditForm";
import { CtaLink } from "@/components/ui/CtaLink";
import { AuditChecklistVisual } from "@/components/visuals/Diagrams";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, webPageSchema, type Crumb } from "@/lib/schema";
import { routes } from "@/lib/site";

const meta = {
  title: "Free SEO Audit for Service Businesses | Top Spot Studio",
  description:
    "Get a free SEO and website audit from Top Spot Studio. We’ll highlight key issues, priority fixes and growth opportunities for your business.",
  path: routes.audit,
};

export const metadata: Metadata = pageMetadata(meta);

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Free SEO Audit", path: routes.audit },
];

const formCta = { label: "Get My Free SEO Audit", href: "#audit-form", event: "free_audit_cta_click" as const };

const faq: FaqItem[] = [
  {
    q: "Is the SEO audit really free?",
    a: "Yes. The initial audit is free and there is no obligation to buy a service. It is a focused review, not a full paid SEO audit.",
  },
  {
    q: "Do I need to give you Google Analytics or Search Console access?",
    a: "No. We can complete the initial review using public information. If we later work together, deeper access may help with a more complete analysis.",
  },
  {
    q: "What will you check?",
    a: "We may review search visibility, technical basics, on-page SEO, local signals, website usability and a small amount of competitor context. We focus on the areas that appear most relevant to your business.",
  },
  {
    q: "Is this a full technical SEO audit?",
    a: "No. A full audit may require a complete crawl, analytics and Search Console data, backlink analysis, keyword research and deeper investigation. The free audit is designed to identify the most useful starting points.",
  },
  {
    q: "Do you only audit New Zealand businesses?",
    a: "No. New Zealand is one of our main target markets, but Top Spot Studio is based in Bangladesh and works remotely with businesses in other markets too.",
  },
  {
    q: "What happens after I receive the audit?",
    a: "You can use the recommendations yourself. If you want help, we can also discuss the work we would prioritise and whether Top Spot Studio is a good fit.",
  },
  {
    q: "Can you guarantee that the recommendations will improve my rankings?",
    a: "No. SEO results depend on competition, website condition, implementation, search behaviour and many other factors. We do not guarantee rankings or traffic.",
  },
];

export default function FreeAuditPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: meta.path, name: meta.title, description: meta.description }),
          breadcrumbSchema(crumbs),
          faqSchema(faq),
        )}
      />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Free SEO & website audit"
        title="Get a Free SEO & Website Audit"
        highlight="SEO & Website Audit"
        lead={
          <p>
            Not sure what is holding your website back? We’ll take a focused look at your search visibility, website and
            local presence, then show you what we would fix first.
          </p>
        }
        primary={formCta}
        trust={["No GA4 or Search Console access needed", "No obligation", "No ranking promises"]}
        location="audit_hero"
        media={<AuditChecklistVisual />}
      />

      <section aria-label="What to expect" className="relative z-10 -mt-10 md:-mt-14">
        <dl className="container-site grid grid-cols-3 gap-3 sm:gap-5">
          {[
            ["5–7", "Key findings"],
            ["3", "Priority actions"],
            ["0", "Access required"],
          ].map(([v, l], i) => (
            <div
              key={l}
              className="reveal group card card-hover card-fx flex flex-col items-center px-2 py-6 text-center sm:py-8"
              style={{ "--i": i } as CSSProperties}
            >
              <dt className="order-2 mt-2 text-sm font-semibold text-muted sm:text-base">{l}</dt>
              <dd className="text-gradient order-1 font-display text-4xl font-bold leading-none tracking-tight sm:text-6xl">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Section id="what-you-get" labelledBy="get-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            id="get-title"
            title="What You’ll Get"
            intro={
              <p>
                We keep the free audit focused. You should leave with a clear idea of what matters most, not a long list
                of random warnings.
              </p>
            }
          />
          <CheckList
            className="card p-6 text-base sm:p-9 md:text-lg"
            items={[
              "5–7 useful findings from your website and search presence.",
              "3 priority actions we would tackle first.",
              "A simple explanation of why those issues matter.",
              "A quick view of where we see the strongest opportunity.",
              "An optional next-step conversation if you want help implementing the work.",
            ]}
          />
        </div>
      </Section>

      <Section id="what-we-check" labelledBy="check-title" tone="white">
        <SectionHeader id="check-title" eyebrow="Review areas" title="What We Check" />
        <div className="mt-12">
          <FeatureList
            columns={3}
            items={[
              {
                title: "Search visibility",
                icon: Search,
                body: <p>How well your main services and pages are positioned for the searches that matter.</p>,
                cta: { label: "About our SEO services", href: routes.nzSeo },
              },
              {
                title: "Technical basics",
                icon: Gauge,
                body: (
                  <p>Indexing, obvious crawl issues, redirects, mobile usability, page speed and other visible technical problems.</p>
                ),
              },
              {
                title: "On-page SEO",
                icon: FileText,
                body: (
                  <p>
                    Titles, headings, page targeting, internal links and whether important service pages are clear to
                    search engines and users.
                  </p>
                ),
              },
              {
                title: "Local SEO",
                icon: MapPin,
                body: (
                  <p>
                    For local businesses, we’ll review visible local signals such as Google Business Profile presence,
                    location targeting and local landing-page basics.
                  </p>
                ),
                cta: { label: "About our local SEO", href: routes.nzLocalSeo },
              },
              {
                title: "Website & UX",
                icon: LayoutTemplate,
                body: (
                  <p>
                    We’ll look for obvious issues that may make it harder for visitors to trust the site, find the next
                    step or make an enquiry.
                  </p>
                ),
              },
              {
                title: "Competitor context",
                icon: Globe2,
                body: (
                  <p>
                    We may include one or two quick observations from businesses competing for similar searches. This is
                    not a full competitor audit.
                  </p>
                ),
              },
            ]}
          />
        </div>
        <Callout title="What this is not" tone="neutral" className="mt-12">
          <p>
            The free audit is not a full technical crawl, full backlink audit, complete keyword strategy, content plan or
            implementation project. Those require deeper access and more time.
          </p>
        </Callout>
      </Section>

      <Section id="who" labelledBy="who-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            id="who-title"
            title="Who This Audit Is For"
            intro={
              <>
                <p>
                  This audit is a good fit if you run a service business and want a clearer view of what is stopping your
                  website from performing better.
                </p>
                <p className="text-base text-muted">
                  We work remotely with service businesses in New Zealand and other international markets.
                </p>
              </>
            }
          />
          <CheckList
            className="text-base md:text-lg"
            items={[
              "You are getting some traffic, but not enough enquiries.",
              "You are not sure which SEO problems matter most.",
              "Your website looks fine, but search visibility is weak.",
              "You rely on local customers and want stronger local visibility.",
              "You are planning SEO work and want to know where to start.",
            ]}
          />
        </div>
      </Section>

      <Section id="how" labelledBy="how-title" tone="white">
        <SectionHeader id="how-title" eyebrow="Process" title="How It Works" />
        <div className="mt-12">
          <ProcessSteps
            steps={[
              { title: "Send us your website", body: "Complete the short form below. We only need public information to start." },
              { title: "We review the important areas", body: "We look at the site, search visibility and local presence where relevant." },
              {
                title: "We identify the priorities",
                body: "We focus on the issues and opportunities that appear most useful for your business.",
              },
              { title: "We send the findings", body: "You receive a personalised summary by email with clear next steps." },
              {
                title: "You decide what happens next",
                body: "You can use the findings yourself or talk to us about implementation. There is no obligation.",
              },
            ]}
          />
        </div>
        <div className="mt-12">
          <CtaLink href={formCta.href} event={formCta.event} location="how_it_works" arrow>
            {formCta.label}
          </CtaLink>
        </div>
      </Section>

      <Section id="why" labelledBy="why-title" tone="navy">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              id="why-title"
              tone="navy"
              title="Why Top Spot Studio?"
              intro={<p>SEO and website work often get separated. We built Top Spot Studio to keep them connected.</p>}
            />
            <CheckList
              tone="navy"
              className="mt-8 text-base text-white/85"
              items={[
                "SEO strategy and website implementation under one small team.",
                <>
                  <Link href={routes.about} className="font-semibold text-teal underline underline-offset-4 hover:text-white">
                    Founder-led work
                  </Link>{" "}
                  with direct communication.
                </>,
                "Clear priorities instead of long reports full of noise.",
                "No unrealistic ranking or traffic guarantees.",
                "Recommendations shaped around the business, not a one-size-fits-all checklist.",
              ]}
            />
          </div>
          <figure className="reveal glass-dark relative flex flex-col justify-center overflow-hidden rounded-[28px] p-8 sm:p-10">
            <div aria-hidden className="orb -right-16 -top-16 size-56 bg-teal/20" />
            <Quote aria-hidden className="relative size-10 text-teal-300" />
            <h3 className="mt-4 text-2xl">Start With the Biggest Opportunities</h3>
            <p className="mt-4 text-lg text-white/80">
              A website can have dozens of SEO issues. That does not mean all of them deserve your attention today.
            </p>
            <p className="mt-4 text-lg text-white/80">Our free audit is designed to answer a simpler question:</p>
            <blockquote className="text-gradient-light mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              “What should we fix first?”
            </blockquote>
            <p className="mt-4 text-white/70">That is the level of clarity we want the audit to give you.</p>
          </figure>
        </div>
      </Section>

      <section id="audit-form" aria-labelledby="form-title" className="section surface-tint relative scroll-mt-24 overflow-clip">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_0%_0%,#000,transparent_70%)]" />
          <div className="orb -right-40 top-1/3 size-[480px] bg-sky/15" />
        </div>
        <div className="container-site relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="reveal lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">Free audit request</p>
            <h2 id="form-title" className="mt-3">
              Request Your Free SEO Audit
            </h2>
            <p className="mt-5 text-lg">
              Tell us a little about your business. We’ll use the information to review the right areas and send the
              findings to you by email.
            </p>
            <div className="glass mt-8 space-y-4 rounded-[20px] p-6 text-base">
              <p>
                Want to see how we work first?{" "}
                <Link href={routes.caseStudies} className="text-link">
                  View SEO case studies
                </Link>
                .
              </p>
              <p>
                Prefer to ask a question instead?{" "}
                <Link href={routes.contact} className="text-link">
                  Contact Top Spot Studio
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="reveal relative" style={{ "--i": 1 } as CSSProperties}>
            <div aria-hidden className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-teal/25 via-sky/15 to-coral/15 blur-2xl" />
            <div className="relative rounded-[28px] border border-white/80 bg-white/95 p-6 shadow-[var(--shadow-lift)] ring-1 ring-navy/5 sm:p-10">
              <span aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
              <AuditForm />
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={faq} />

      <CtaBand title="Not Sure Where to Start?" primary={formCta} secondary={{ label: "Contact Us", href: routes.contact }} location="audit_final">
        <p>Send us your website. We’ll take a look and show you the issues and opportunities we would prioritise first.</p>
      </CtaBand>
    </>
  );
}
