import Link from "next/link";
import type { Metadata } from "next";
import {
  BarChart3,
  Building2,
  FileSearch,
  FileText,
  Gauge,
  Link2,
  MapPin,
  MessagesSquare,
  PenLine,
  Search,
  ShieldOff,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/sections/Section";
import {
  Callout,
  CheckList,
  CtaBand,
  EditorialSplit,
  FeatureList,
  NumberedCards,
  ProcessSteps,
  SplitFeature,
  TierCards,
} from "@/components/sections/Blocks";
import { FaqSection, type FaqItem } from "@/components/sections/FaqList";
import { ProofSection } from "@/components/sections/ProofSection";
import { RemoteDeliveryVisual, SeoScopeDiagram } from "@/components/visuals/Diagrams";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema, type Crumb } from "@/lib/schema";
import { routes } from "@/lib/site";

const meta = {
  title: "SEO Services NZ for Service Businesses | Top Spot Studio",
  description:
    "Grow your New Zealand service business with practical SEO focused on visibility, stronger website performance and qualified enquiries. Get a free audit.",
  path: routes.nzSeo,
};

export const metadata: Metadata = pageMetadata(meta);

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "SEO Services NZ", path: routes.nzSeo },
];

const faq: FaqItem[] = [
  {
    q: "Is Top Spot Studio a New Zealand-based SEO company?",
    a: "No. Top Spot Studio is based in Bangladesh and works remotely with businesses in New Zealand and other international markets. We are transparent about where we operate and do not use a fake New Zealand office or address.",
  },
  {
    q: "What types of New Zealand businesses do you work with?",
    a: "Our current focus is service businesses, especially tradies and roofing companies. We can also work with other service-led businesses where organic search, local visibility and website performance influence enquiries.",
  },
  {
    q: "What is included in your SEO services?",
    a: "Services may include keyword research, technical and on-page SEO, service-page planning, internal linking, Local SEO, content and reporting. The exact items and quantities depend on the signed package; for example, Essentials does not include new monthly content or ongoing Google Business Profile management.",
  },
  {
    q: "How much do SEO services cost?",
    a: "Our standard monthly SEO plans are SEO Essentials NZ$450, Local Growth NZ$700 and SEO Growth Pro NZ$950. Each has different outputs and levels of Local SEO support. Month 1 is research/setup-heavy; full recurring page and content deliverables begin in Month 2. We recommend a package based on your services, market and scope rather than assuming the most expensive option is necessary.",
  },
  {
    q: "How long does SEO take to work?",
    a: "SEO is usually a medium- to long-term growth channel rather than an instant fix. Timing varies based on the starting position, competition, technical health, content, authority and how quickly recommended work can be implemented. We do not guarantee a fixed ranking timeline.",
  },
  {
    q: "Can you guarantee first-page rankings?",
    a: "No. Search rankings depend on factors no agency fully controls. We can control the quality of the research, strategy and implementation, but we will not promise a specific ranking position.",
  },
  {
    q: "Do you also provide Local SEO?",
    a: "Yes. For businesses that depend on customers in specific areas, we offer a dedicated Local SEO service covering website relevance, Google Business Profile, local keywords, reviews, citations and related local-search work.",
  },
  {
    q: "Can you make website changes as part of SEO?",
    a: "Yes, where the agreed scope includes implementation. Top Spot Studio combines SEO and web capability, so we can address many content, technical and conversion-related website issues without treating SEO and web development as completely separate projects.",
  },
  {
    q: "How do we get started?",
    a: "Start with a free SEO audit. We will review the current website and search presence, identify the strongest initial opportunities, and then decide whether a project or ongoing SEO engagement makes sense.",
  },
];

export default function NzSeoPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: meta.path, name: meta.title, description: meta.description }),
          serviceSchema({
            path: meta.path,
            name: "SEO Services for New Zealand Service Businesses",
            serviceType: "Search engine optimisation",
            description: meta.description,
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faq),
        )}
      />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="SEO services · New Zealand"
        title="SEO Services for New Zealand Service Businesses"
        highlight="Service Businesses"
        lead={
          <p>
            Build stronger search visibility, improve the pages that matter most to your customers, and turn more of
            that visibility into qualified enquiries.
          </p>
        }
        body={
          <p>
            Top Spot Studio provides practical SEO for New Zealand service businesses that want a clearer path from
            search to enquiry. We combine research, technical improvements, on-page optimisation, content strategy and
            website thinking so your SEO work supports the wider business—not just a list of rankings.
          </p>
        }
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        secondary={{ label: "View Case Studies", href: routes.caseStudies }}
        trust={["Founder-led", "Strategy + implementation", "Remote support for New Zealand businesses"]}
        media={<SeoScopeDiagram />}
      />

      <Section id="approach" labelledBy="approach-title" tone="white">
        <EditorialSplit id="approach-title" title="SEO should support the business, not just the report">
          <p className="font-semibold text-navy">Search visibility matters, but rankings alone do not pay the bills.</p>
          <p>
            A useful SEO strategy connects what people search for with the services you actually want to sell, the
            locations you serve, the pages on your website and the actions you want visitors to take.
          </p>
          <p>
            If your website is difficult to crawl, your service pages are weak, your content does not match search
            intent, or your best opportunities are hidden behind the wrong priorities, more activity will not
            necessarily create better results.
          </p>
          <p>
            Our job is to identify where the real gaps are, prioritise them, and improve the parts of your search
            presence that can make the biggest difference.
          </p>
        </EditorialSplit>
      </Section>

      <Section id="services" labelledBy="services-title">
        <SectionHeader
          id="services-title"
          eyebrow="Scope"
          title="What our SEO services can include"
          intro={
            <p>
              SEO services are scoped around the business and selected package. Work falls into three connected areas:
              research and planning; website and content implementation; measurement and refinement. Specific monthly
              deliverables depend on the agreed plan.
            </p>
          }
        />
        <div className="mt-12">
          <FeatureList
            items={[
              {
                title: "SEO Strategy & Keyword Research",
                icon: Search,
                body: (
                  <p>
                    We research the terms your potential customers use, compare them against your services and
                    competitors, and build a keyword-to-page plan around commercial value rather than search volume
                    alone.
                  </p>
                ),
              },
              {
                title: "Technical SEO",
                icon: Wrench,
                body: (
                  <p>
                    We review crawlability, indexation, site structure, redirects, duplicate issues, mobile performance,
                    Core Web Vitals and other technical barriers that can limit search performance.
                  </p>
                ),
              },
              {
                title: "On-Page SEO",
                icon: FileText,
                body: (
                  <p>
                    We improve titles, headings, page structure, copy, internal links and topical relevance so important
                    pages better match what searchers and search engines expect.
                  </p>
                ),
              },
              {
                title: "Service Page Strategy",
                icon: Target,
                body: (
                  <p>
                    For service businesses, the right service pages often matter more than publishing another generic
                    blog. We map services to the right pages and strengthen the pages closest to revenue.
                  </p>
                ),
              },
              {
                title: "Local SEO Support",
                icon: MapPin,
                body: (
                  <p>
                    Where local search matters, we connect website SEO with Google Business Profile, reviews, location
                    relevance, citations and local visibility. See our dedicated{" "}
                    <Link href={routes.nzLocalSeo} className="text-link">
                      local SEO for New Zealand businesses
                    </Link>{" "}
                    for the full service.
                  </p>
                ),
              },
              {
                title: "Content Strategy",
                icon: PenLine,
                body: (
                  <p>
                    We identify useful supporting topics that can build topical relevance, answer customer questions and
                    strengthen commercial pages through internal linking.
                  </p>
                ),
              },
              {
                title: "Internal Linking",
                icon: Link2,
                body: (
                  <p>
                    We improve how authority and context flow through the website, helping users and search engines
                    reach the pages that matter most.
                  </p>
                ),
              },
              {
                title: "Measurement & Reporting",
                icon: BarChart3,
                body: (
                  <p>
                    We use tools such as Google Analytics and Search Console to track visibility, organic performance
                    and meaningful conversions where tracking is available.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <Section id="who" labelledBy="who-title" tone="white">
        <SectionHeader
          id="who-title"
          eyebrow="Who we work best with"
          title="Built around service-led businesses"
          intro={
            <p>
              Top Spot Studio is built around service-led businesses where search visibility, trust and a strong website
              can directly influence customer acquisition.
            </p>
          }
        />
        <div className="mt-12">
          <NumberedCards
            items={[
              {
                title: "Tradies & Trade Businesses",
                icon: Wrench,
                body: (
                  <p>
                    Roofers, builders, plumbers, electricians and other trade businesses often compete in high-intent
                    local searches. We help connect SEO with service pages, local visibility and enquiry-focused
                    websites. Explore{" "}
                    <Link href={routes.tradies} className="text-link">
                      SEO for tradies
                    </Link>{" "}
                    or our approach to{" "}
                    <Link href={routes.roofing} className="text-link">
                      SEO for roofing companies
                    </Link>
                    .
                  </p>
                ),
              },
              {
                title: "Local Service Businesses",
                icon: MapPin,
                body: (
                  <p>
                    Businesses that depend on calls, bookings, quote requests or local enquiries can benefit from an SEO
                    strategy built around real service demand and local search behaviour.
                  </p>
                ),
              },
              {
                title: "Growing Small & Medium Businesses",
                icon: Building2,
                body: (
                  <p>
                    If your business already has a functioning offer and wants to turn search into a more dependable
                    acquisition channel, we can help identify the next SEO priorities without forcing you into
                    unnecessary work.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <Section id="process" labelledBy="process-title">
        <SectionHeader
          id="process-title"
          eyebrow="Our SEO process"
          title="A clear order for strategy, implementation and measurement"
          intro={
            <p>
              SEO is easier to manage when the work follows a clear order. Our process is designed to keep strategy,
              implementation and measurement connected.
            </p>
          }
        />
        <div className="mt-12">
          <ProcessSteps
            steps={[
              {
                title: "Understand the Business",
                body: "We start with your services, target customers, locations, current marketing, commercial priorities and what success should mean for the business.",
              },
              {
                title: "Audit the Current Position",
                body: "We review the website, search visibility, competitors, important pages, technical setup and available analytics to identify the biggest gaps.",
              },
              {
                title: "Prioritise the Work",
                body: "Not every issue deserves equal attention. We organise recommendations by likely business impact, effort and dependency so the highest-value work happens first.",
              },
              {
                title: "Implement & Improve",
                body: "We carry out or coordinate agreed SEO improvements across technical, on-page, content and local-search areas.",
              },
              {
                title: "Measure & Refine",
                body: "We review performance, identify what is changing and update priorities based on real data rather than assumptions.",
              },
            ]}
          />
        </div>

        <div className="reveal card mt-16 grid gap-10 p-6 sm:p-10">
          <div>
            <h3>What your SEO engagement looks like</h3>
            <div className="mt-4 grid gap-4 text-base leading-relaxed lg:grid-cols-2 lg:gap-10">
              <p>
                Month 1 focuses on audit, technical and keyword baselines, competitor and page research, tracking checks,
                and a prioritised 90-day roadmap. Priority implementation can begin during setup; the standard recurring
                page/content production cadence starts in Month 2.
              </p>
              <p>
                From Month 2, agreed page optimisation and new content outputs are delivered alongside priority-driven
                technical, Local SEO and measurement work within the selected package. The monthly report identifies what
                was completed and what comes next.
              </p>
            </div>
          </div>
          <div>
            <TierCards
              tiers={[
                {
                  name: "SEO Essentials",
                  price: "NZ$450",
                  cadence: "/month",
                  summary: <p>Up to 2 existing pages optimised; no new content.</p>,
                },
                {
                  name: "Local Growth",
                  price: "NZ$700",
                  cadence: "/month",
                  summary: <p>Up to 4 existing pages optimised and 2 new standard SEO content pieces.</p>,
                },
                {
                  name: "SEO Growth Pro",
                  price: "NZ$950",
                  cadence: "/month",
                  summary: <p>Up to 6 existing pages optimised and 4 new standard SEO content pieces.</p>,
                },
              ]}
            />
            <p className="mt-4 text-sm text-muted">
              These are Month 2+ monthly caps, not universal inclusions across all tiers.
            </p>
          </div>
          <Callout tone="neutral">
            <p>
              One existing-page optimisation is not necessarily a full rewrite. Standard new content can be an agreed
              article or service/location page; custom development, premium media and extensive original research
              require separate scope. For a full quote, we confirm priorities, access and boundaries in the proposal.
            </p>
          </Callout>
        </div>
      </Section>

      <Section id="why" labelledBy="why-title" tone="navy">
        <SectionHeader
          id="why-title"
          tone="navy"
          eyebrow="Why work with Top Spot Studio?"
          title="Small, founder-led and close to the work"
          intro={
            <p>
              Top Spot Studio is a small, founder-led SEO and web studio. That keeps the work close to the people
              responsible for the strategy and implementation.
            </p>
          }
        />
        <div className="mt-12">
          <NumberedCards
            tone="navy"
            numbered={false}
            items={[
              {
                title: "Direct Access to the People Doing the Work",
                icon: Users,
                body: (
                  <p>
                    You are not passed through multiple layers of account management before reaching someone who
                    understands the project.
                  </p>
                ),
              },
              {
                title: "Strategy Before Activity",
                icon: FileSearch,
                body: (
                  <p>
                    We do not measure value by how many tasks we can add to a monthly report. The work starts with the
                    problem, the opportunity and the likely business impact.
                  </p>
                ),
              },
              {
                title: "SEO + Web Thinking",
                icon: Gauge,
                body: (
                  <p>
                    SEO and web performance are connected, but a larger redesign, custom feature or substantial
                    development project is quoted separately where it falls outside the SEO retainer. See{" "}
                    <Link href={routes.webDesign} className="font-semibold text-teal underline underline-offset-4 hover:text-white">
                      web design for tradies
                    </Link>
                    .
                  </p>
                ),
              },
              {
                title: "Transparent Communication",
                icon: MessagesSquare,
                body: (
                  <p>
                    We explain what is being worked on, why it matters, what has changed and what should happen next—in
                    language a business owner can actually use.
                  </p>
                ),
              },
              {
                title: "No Guaranteed Rankings",
                icon: ShieldOff,
                body: (
                  <p>
                    No agency controls Google. We will not promise a guaranteed #1 position or pretend there is a
                    shortcut. We focus on disciplined research, white-hat implementation and measurable improvement.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <Section id="remote" labelledBy="remote-title">
        <SplitFeature media={<RemoteDeliveryVisual />}>
          <SectionHeader
            id="remote-title"
            title="SEO for New Zealand businesses, delivered remotely"
            intro={
              <>
                <p className="font-semibold text-navy">New Zealand is Top Spot Studio’s first core international market.</p>
                <p>
                  We are based in Bangladesh and work remotely with New Zealand businesses. That means our positioning
                  is transparent: we do not claim a New Zealand office, local address or physical presence that does not
                  exist.
                </p>
                <p>
                  The SEO work itself is built around the New Zealand market—local search language, competitors,
                  service demand, SERP behaviour and the commercial context of the businesses we serve.
                </p>
                <p>
                  Communication, reporting, research and implementation are handled directly by the people working on
                  your project.
                </p>
              </>
            }
          />
        </SplitFeature>
      </Section>

      <ProofSection
        title="Experience backed by real SEO results"
        intro={
          <p>
            Top Spot Studio is a new agency, but the people behind it have hands-on experience across SEO strategy,
            technical fixes, content, on-page optimisation, Local SEO, analytics and client delivery.
          </p>
        }
        note={
          <p>
            These are selected results from SEO work led or managed by the people behind Top Spot Studio before the
            agency was launched. Results vary by business, market, competition and starting point.
          </p>
        }
      />

      <Section id="measure" labelledBy="measure-title">
        <EditorialSplit
          id="measure-title"
          eyebrow="What we measure"
          title="Reporting that answers whether the work is helping"
        >
          <p>
            Good SEO reporting should help answer whether the work is improving visibility and creating better
            opportunities for the business.
          </p>
          <p className="font-semibold text-navy">Recommended reporting focus</p>
          <CheckList
            className="text-base"
            items={[
              "Organic clicks and search visibility from Google Search Console",
              "Performance of priority service and landing pages",
              "Qualified form submissions, calls or other tracked enquiries where measurement is available",
              "Local visibility and Google Business Profile performance when Local SEO is part of the scope",
              "Technical health and indexation issues that affect priority pages",
              "Work completed, what changed, and the next priorities",
            ]}
          />
        </EditorialSplit>
      </Section>

      <CtaBand
        tone="tint"
        eyebrow="Free SEO Audit"
        title="Not sure where to start?"
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        location="audit_section"
      >
        <p>
          We will review your current search presence and website, then highlight a small number of issues or
          opportunities that deserve attention first.
        </p>
        <p>
          No oversized automated report. No pressure to buy a package. Just a clearer view of where your SEO stands and
          what may be worth improving.
        </p>
      </CtaBand>

      <FaqSection items={faq} />

      <CtaBand
        title="Ready to find out what is limiting your search visibility?"
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        secondary={{ label: "Contact Top Spot Studio", href: routes.contact }}
      >
        <p>Start with a focused audit and get a clearer view of the SEO opportunities worth prioritising first.</p>
      </CtaBand>
    </>
  );
}
