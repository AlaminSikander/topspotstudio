import Link from "next/link";
import type { Metadata } from "next";
import {
  AlertTriangle,
  BarChart3,
  CalendarClock,
  Eye,
  FileText,
  Gauge,
  Hammer,
  Link2,
  MessagesSquare,
  Route,
  Search,
  ShieldOff,
  Star,
  Store,
  Wrench,
} from "lucide-react";
import roofTilesImg from "@/assets/photos/roof-tiles-installation.jpg";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/sections/Section";
import { CheckList, CtaBand, EditorialSplit, NumberedCards, ProcessSteps, SplitFeature } from "@/components/sections/Blocks";
import { FaqSection, type FaqItem } from "@/components/sections/FaqList";
import { ProofSection } from "@/components/sections/ProofSection";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { RoofingPageMap } from "@/components/visuals/Diagrams";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema, type Crumb } from "@/lib/schema";
import { routes } from "@/lib/site";

const meta = {
  title: "Roofing SEO Services | Top Spot Studio",
  description:
    "SEO for roofing companies focused on local visibility, service pages, website performance and qualified enquiries. Start with a free SEO audit.",
  path: routes.roofing,
};

export const metadata: Metadata = pageMetadata(meta);

const crumbs: Crumb[] = [{ name: "Home", path: "/" }, { name: "Industries" }, { name: "Roofing SEO", path: routes.roofing }];

const faq: FaqItem[] = [
  {
    q: "What does roofing SEO include?",
    a: "It can include keyword research, competitor analysis, roofing service-page optimisation, Local SEO, Google Business Profile support, technical SEO, internal linking, content planning, reviews, citations and conversion tracking. The exact scope should depend on the business and market.",
  },
  {
    q: "Do roofing companies need Local SEO?",
    a: "Often, yes. Many roofing searches have local intent, and customers may compare Google Maps, business profiles, reviews and websites before making contact. Eligible local businesses should usually treat the website and local presence as connected.",
  },
  {
    q: "Should every roofing service have its own page?",
    a: "Not automatically. A separate page makes sense when the service is genuinely offered, commercially important and meaningfully different enough to deserve its own content. Thin pages created only to target keywords can create more problems than value.",
  },
  {
    q: "Can SEO help us get more roofing enquiries?",
    a: "SEO can improve the opportunities for relevant customers to discover your business and reach the right pages. Actual enquiry growth also depends on competition, offer strength, trust, website conversion, seasonality and other factors, so we do not guarantee a specific lead volume.",
  },
  {
    q: "Can you guarantee number one rankings for roofing keywords?",
    a: "No. Rankings depend on competition, algorithms and factors no agency fully controls. We can control the quality of research, prioritisation and implementation, but we do not promise a guaranteed position.",
  },
  {
    q: "How long does roofing SEO take?",
    a: "There is no fixed timeline that applies to every roofing company. Progress depends on the starting position, competition, website quality, local signals, authority and how quickly priority work can be implemented.",
  },
  {
    q: "Is Top Spot Studio based in New Zealand?",
    a: "No. Top Spot Studio is based in Bangladesh and works remotely with international clients. New Zealand is our first core target market, and we are transparent about where we operate.",
  },
  {
    q: "How do we get started?",
    a: "Start with a free SEO audit. We will review the current website and search presence, identify the strongest initial opportunities, and then decide whether a focused project or ongoing engagement makes sense.",
  },
];

export default function RoofingPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: meta.path, name: meta.title, description: meta.description }),
          serviceSchema({
            path: meta.path,
            name: "Roofing SEO",
            serviceType: "Search engine optimisation for roofing companies",
            description: meta.description,
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faq),
        )}
      />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Industry · Roofing"
        title="Roofing SEO That Turns Local Searches Into Enquiries"
        highlight="Into Enquiries"
        lead={
          <p>
            When homeowners, property managers or commercial buyers need roofing work, search is often one of the first
            places they look. The challenge is making sure your roofing business is visible for the services and
            locations that matter - and that your website gives people a clear reason to contact you.
          </p>
        }
        body={
          <p>
            Top Spot Studio helps roofing companies improve search visibility through practical SEO, Local SEO and
            website improvements built around real roofing services, local demand and enquiry journeys.
          </p>
        }
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        secondary={{ label: "View Case Studies", href: routes.caseStudies }}
        trust={["Founder-led", "SEO + web capability", "Current market focus: New Zealand service businesses"]}
        media={
          <div className="mx-auto max-w-[500px] lg:ml-auto">
            <ResponsiveImage
              src={roofTilesImg}
              alt="Roof tiles being laid in rows on timber battens"
              ratio="4/5"
              priority
              frame
              sizes="(min-width: 1024px) 500px, 90vw"
            />
          </div>
        }
      />

      <Section id="search" labelledBy="search-title" tone="white">
        <EditorialSplit id="search-title" title="Roofing search is more than one keyword">
          <p>
            A roofing company can offer several high-value services, but one generic “roofing” page rarely gives each
            service enough relevance or clarity.
          </p>
          <p>
            Depending on the business, customers may search for roof repairs, reroofing, roof replacement, leak repairs,
            new roof installation, metal roofing, guttering or other specific services. They may also add a suburb, city
            or service area to the search.
          </p>
          <p>
            A stronger roofing SEO strategy helps search engines understand those differences while making it easier for
            potential customers to find the right information and take the next step.
          </p>
        </EditorialSplit>
      </Section>

      <Section id="gaps" labelledBy="gaps-title">
        <SectionHeader
          id="gaps-title"
          eyebrow="Common gaps"
          title="Common SEO gaps in roofing websites"
          intro={
            <p>
              Many roofing businesses already have a website and a Google Business Profile, but important opportunities
              can still be missed when the website, local presence and service structure are not working together.
            </p>
          }
        />
        <div className="reveal card mt-10 p-6 sm:p-10">
          <CheckList
            variant="gap"
            className="grid gap-x-10 gap-y-4 space-y-0 text-base md:grid-cols-2"
            items={[
              "Several roofing services are grouped into one thin page instead of having clear, useful service pages.",
              "The website targets broad roofing terms but has weak relevance for the actual locations the business serves.",
              "Google Business Profile categories, services, photos, reviews or website connections are under-optimised.",
              "Page titles and headings do not reflect how customers search for specific roofing services.",
              "Project photos and proof exist, but they are not organised in a way that strengthens trust or service relevance.",
              "The mobile experience makes it harder to call, request a quote or understand the next step.",
              "Calls, forms and quote requests are not tracked, so SEO is judged mainly by rankings or traffic.",
              "Blog content is published without supporting priority roofing service pages or customer decisions.",
            ]}
          />
        </div>
      </Section>

      <Section id="services" labelledBy="services-title" tone="white">
        <SectionHeader
          id="services-title"
          eyebrow="Scope"
          title="What our roofing SEO can include"
          intro={
            <p>
              The exact scope depends on your services, market, website and current visibility. We prioritise the work
              most likely to improve search relevance, trust and enquiry opportunities rather than forcing every roofing
              company into the same checklist.
            </p>
          }
        />
        <div className="mt-12">
          <NumberedCards
            columns={4}
            items={[
              {
                title: "Roofing Keyword & Competitor Research",
                icon: Search,
                body: (
                  <p>
                    We research how people search for the roofing services you actually offer, which locations matter,
                    what competitors are doing well, and where there may be realistic opportunities to improve
                    visibility.
                  </p>
                ),
              },
              {
                title: "Service Page Strategy",
                icon: Route,
                body: (
                  <p>
                    We map important roofing services to the right pages, reduce overlap between pages and strengthen
                    commercial content so it better matches customer intent.
                  </p>
                ),
              },
              {
                title: "Local SEO & Google Business Profile Support",
                icon: Store,
                body: (
                  <p>
                    For eligible local roofing businesses, we review profile categories, services, business information,
                    reviews, photos and how the profile connects to the website.
                  </p>
                ),
              },
              {
                title: "On-Page SEO",
                icon: FileText,
                body: (
                  <p>
                    We improve titles, headings, page copy, internal links, media context and page structure across
                    priority roofing pages.
                  </p>
                ),
              },
              {
                title: "Technical SEO",
                icon: Wrench,
                body: (
                  <p>
                    We identify crawl, indexation, redirect, duplicate, mobile, performance and other technical issues
                    that may limit important pages.
                  </p>
                ),
              },
              {
                title: "Reviews, Citations & Local Trust Signals",
                icon: Star,
                body: (
                  <p>
                    Where relevant, we help improve review processes, business information consistency and local
                    citations so the wider local presence supports the website.
                  </p>
                ),
              },
              {
                title: "Content & Internal Linking",
                icon: Link2,
                body: (
                  <p>
                    We plan useful supporting content around real roofing questions and buying decisions, then connect
                    that content to priority service pages through internal links.
                  </p>
                ),
              },
              {
                title: "Conversion Tracking & Reporting",
                icon: BarChart3,
                body: (
                  <p>
                    Where access allows, we track organic visibility, priority pages and meaningful actions such as quote
                    forms, calls or enquiry submissions instead of reporting activity alone.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <Section id="service-pages" labelledBy="service-pages-title">
        <SplitFeature media={<RoofingPageMap />} align="start">
          <SectionHeader
            id="service-pages-title"
            title="Service pages should match real roofing demand"
            intro={
              <>
                <p>
                  Roof repairs, reroofing and roof replacement can involve different customer questions and enquiry
                  types. The correct structure depends on the work a roofing business genuinely performs and whether NZ
                  search results show distinct customer intent.
                </p>
                <p>
                  When the services and search intent are genuinely distinct, dedicated pages may make sense. If
                  reroofing and roof replacement are simply two names for the same offer and share the same search
                  results, one helpful page is usually better than two overlapping pages.
                </p>
                <p>
                  Each page should help a real customer understand the service, who it is for, what the process
                  involves, why your business is credible and how to request a quote or consultation.
                </p>
              </>
            }
          />
        </SplitFeature>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="reveal card p-6 sm:p-8">
            <h3>Illustrative roofing service-to-page map</h3>
            <ul className="mt-5 space-y-4 text-base">
              <li>
                <strong className="text-navy">Roof repairs →</strong> a repair page explaining what issues are handled,
                what customers should provide in an enquiry, where the company works and when a site visit is needed.
              </li>
              <li>
                <strong className="text-navy">Reroofing →</strong> a planned-project page showing materials/options (only
                those actually offered), job stages, project proof and a quote-request route.
              </li>
              <li>
                <strong className="text-navy">Roof replacement →</strong> a separate page only if the business offers a
                substantively different service and Google shows distinct buyer intent; otherwise cover this on the
                reroofing page.
              </li>
            </ul>
            <p className="mt-5 text-sm text-muted">
              These are sample website page roles for a roofer, not URLs or consumer roofing keywords targeted by Top
              Spot Studio. Validate the service list and SERP overlap before publishing.
            </p>
          </div>
          <div className="reveal card p-6 sm:p-8">
            <h3>Two roofing enquiry journeys to design for</h3>
            <div className="mt-5 space-y-5 text-base">
              <div className="flex gap-4">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-coral/15 text-[#b4432f]">
                  <AlertTriangle aria-hidden className="size-5" />
                </span>
                <p>
                  <strong className="text-navy">Urgent leak or damage:</strong> a visitor often needs a quick answer
                  about service availability, area, next steps and how to contact the roofer. Do not promise 24/7
                  response unless the client actually offers it.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-teal-soft text-teal-ink">
                  <CalendarClock aria-hidden className="size-5" />
                </span>
                <p>
                  <strong className="text-navy">Planned reroof or replacement:</strong> a visitor may need project
                  photos, material guidance, qualifications, realistic scope, the quoting process and reassurance before
                  enquiring. Good SEO should connect each search to the appropriate page and action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="local" labelledBy="local-title" tone="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              id="local-title"
              title="Local SEO is often critical for roofers"
              intro={
                <>
                  <p>
                    Roofing searches often have strong local intent. A customer may compare a Google Business Profile,
                    map results, service pages, reviews, project evidence and contact information before choosing who
                    to call.
                  </p>
                  <p>
                    For eligible local businesses, a roofing SEO strategy may therefore include both organic website
                    work and Local SEO: Google Business Profile optimisation, reviews, citations, local relevance,
                    service-area signals and location-aware internal linking.
                  </p>
                  <p>
                    The goal is not to stuff city names across the website. It is to make the business, services and
                    areas served clear and useful for both search engines and customers.
                  </p>
                </>
              }
            />
            <Link href={routes.nzLocalSeo} className="text-link mt-6 inline-block">
              Explore local SEO for roofing businesses
            </Link>
          </div>
          <div>
            <SectionHeader
              title="Trust matters as much as visibility"
              intro={
                <>
                  <p>
                    Roofing is a high-trust service. Customers may be making an expensive decision, dealing with urgent
                    damage or inviting a contractor onto their property.
                  </p>
                  <p>
                    That means the website needs more than keyword relevance. Strong project evidence, clear service
                    information, reviews, accreditations where applicable, real team or business details and
                    straightforward contact options can all support the decision to enquire.
                  </p>
                  <p className="font-semibold text-navy">
                    SEO brings the right people to the page. The website still has to earn the next action.
                  </p>
                </>
              }
            />
            <Link href={routes.webDesign} className="text-link mt-6 inline-block">
              Explore web design for tradies
            </Link>
          </div>
        </div>
      </Section>

      <Section id="process" labelledBy="process-title">
        <SectionHeader
          id="process-title"
          eyebrow="Our roofing SEO process"
          title="Built around actual roofing services, not a generic checklist"
          intro={
            <p>
              A roofing SEO project starts by understanding the roofing business’s actual repair, reroofing and
              installation services, not by applying a generic tradie checklist.
            </p>
          }
        />
        <div className="mt-12">
          <ProcessSteps
            steps={[
              {
                title: "Understand the business",
                body: "We separate priority roofing jobs by urgency, project value and actual service availability, then identify the genuine locations and enquiry steps involved.",
              },
              {
                title: "Audit visibility and the website",
                body: "We review search performance, service pages, local signals, technical setup, competitors and available tracking.",
              },
              {
                title: "Build a priority roadmap",
                body: "We map roofing service pages, local-search visibility and the quote journey, then prioritise clear gaps without building duplicate pages for near-identical services.",
              },
              {
                title: "Implement the agreed work",
                body: "We improve technical, on-page, local, content and website elements according to the approved scope.",
              },
              {
                title: "Measure and refine",
                body: "We review what is changing, where progress is appearing and what deserves attention next.",
              },
            ]}
          />
        </div>
      </Section>

      <Section id="why" labelledBy="why-title" tone="navy">
        <SectionHeader
          id="why-title"
          tone="navy"
          eyebrow="Why Top Spot Studio?"
          title="A practical roofing specialisation, honestly described"
          intro={
            <p>
              Our initial roofing specialisation is built around a practical understanding of roofing service categories,
              search intent and website quote journeys. We do not claim prior New Zealand roofing results that have not
              been documented.
            </p>
          }
        />
        <div className="mt-12">
          <NumberedCards
            tone="navy"
            numbered={false}
            items={[
              {
                title: "Roofing Is Our Initial Specialist Niche",
                icon: Hammer,
                body: (
                  <p>
                    Roofing is the first niche we are building our prospecting, research and service-development system
                    around, which gives us a clearer understanding of common roofing search and website challenges.
                  </p>
                ),
              },
              {
                title: "SEO + Web in One Workflow",
                icon: Gauge,
                body: (
                  <p>
                    If a visibility issue is really a page-structure, mobile, tracking or conversion problem, we can look
                    at both sides instead of treating SEO and the website as unrelated.
                  </p>
                ),
              },
              {
                title: "Direct Communication",
                icon: MessagesSquare,
                body: (
                  <p>
                    You work closely with the people involved in strategy and implementation, not through a chain of
                    disconnected teams.
                  </p>
                ),
              },
              {
                title: "Clear Priorities",
                icon: Eye,
                body: (
                  <p>
                    We explain what we are working on, why it matters and what should happen next without hiding behind
                    technical jargon.
                  </p>
                ),
              },
              {
                title: "No Ranking Guarantees",
                icon: ShieldOff,
                body: (
                  <p>
                    We do not promise a guaranteed #1 position. We focus on white-hat SEO, disciplined execution and
                    measurable improvement.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <Section id="market" labelledBy="market-title" tone="white">
        <EditorialSplit id="market-title" eyebrow="Current market focus" title="New Zealand roofing businesses">
          <p>
            New Zealand is Top Spot Studio&apos;s first core international market, and roofing businesses are our initial
            specialist outreach niche.
          </p>
          <p>
            Our first prospecting focus is Hamilton and the wider Waikato region, while the Roofing SEO page itself
            remains scalable for roofing companies in other New Zealand regions and future international markets.
          </p>
          <p>
            Top Spot Studio is based in Bangladesh and works remotely. We do not claim a New Zealand office or local
            physical presence that does not exist.
          </p>
          <p>
            Market-specific research still matters. Keyword research, SERP analysis, competitor research and page
            decisions should be based on the actual country and region being targeted. For broader context, see our{" "}
            <Link href={routes.nzSeo} className="text-link">
              SEO services for New Zealand businesses
            </Link>{" "}
            and{" "}
            <Link href={routes.tradies} className="text-link">
              SEO for tradies
            </Link>
            .
          </p>
        </EditorialSplit>
      </Section>

      <ProofSection
        title="Experience backed by real SEO results"
        intro={
          <p>
            Top Spot Studio is a new agency, but the people behind it bring hands-on experience across SEO strategy,
            technical fixes, on-page optimisation, Local SEO, content, analytics and client reporting.
          </p>
        }
        note={
          <p>
            These are selected results from SEO work led or managed by the people behind Top Spot Studio before the
            agency was launched. They are not presented as Top Spot Studio client results unless specifically documented
            as such.
          </p>
        }
      />

      <CtaBand
        tone="tint"
        eyebrow="Start with a free roofing SEO audit"
        title="Not sure what is limiting your roofing business in search?"
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        location="audit_section"
      >
        <p>
          We will review your website and search presence, then highlight a small number of high-impact opportunities
          worth looking at first.
        </p>
        <p>
          No oversized automated report. No pressure to buy a package. Just a clearer view of the issues and
          opportunities that may be holding the business back.
        </p>
      </CtaBand>

      <FaqSection items={faq} />

      <CtaBand
        title="Ready to make your roofing search visibility work harder for the business?"
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        secondary={{ label: "Contact Top Spot Studio", href: routes.contact }}
      >
        <p>Start with a focused audit and find out which SEO opportunities deserve attention first.</p>
      </CtaBand>
    </>
  );
}
