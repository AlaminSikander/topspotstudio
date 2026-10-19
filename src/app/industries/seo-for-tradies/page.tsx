import Link from "next/link";
import type { Metadata } from "next";
import {
  BarChart3,
  FileText,
  Gauge,
  MapPinned,
  MessagesSquare,
  PenLine,
  Route,
  Search,
  ShieldOff,
  Star,
  Store,
  Wrench,
  Eye,
  Plus,
} from "lucide-react";
import buildersImg from "@/assets/photos/builders-timber-frame.jpg";
import rooferImg from "@/assets/photos/roofer-working-on-roof.jpg";
import plumberImg from "@/assets/photos/plumber-fitting-pipe.jpg";
import electricianImg from "@/assets/photos/electrician-switchboard.jpg";
import landscaperImg from "@/assets/photos/landscaper-trimming-lawn.jpg";
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
} from "@/components/sections/Blocks";
import { FaqSection, type FaqItem } from "@/components/sections/FaqList";
import { ProofSection } from "@/components/sections/ProofSection";
import { CtaLink } from "@/components/ui/CtaLink";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { LocalSignalsDiagram, SiteWireframe, TradeJobMatrix } from "@/components/visuals/Diagrams";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema, type Crumb } from "@/lib/schema";
import { routes } from "@/lib/site";

const meta = {
  title: "SEO for Tradies That Drives Enquiries | Top Spot Studio",
  description:
    "SEO for tradies focused on Google visibility, service pages, local search and qualified enquiries. Get a free visibility audit from Top Spot Studio.",
  path: routes.tradies,
};

export const metadata: Metadata = pageMetadata(meta);

const crumbs: Crumb[] = [{ name: "Home", path: "/" }, { name: "Industries" }, { name: "SEO for Tradies", path: routes.tradies }];

const trades = [
  { name: "Roofers", img: rooferImg, alt: "Roofer in a hard hat working on a pitched roof", position: "50% 35%" },
  { name: "Plumbers", img: plumberImg, alt: "Plumber in work gloves fitting a threaded pipe to a radiator" },
  { name: "Electricians", img: electricianImg, alt: "Electrician working inside an open switchboard" },
  { name: "Builders", img: buildersImg, alt: "Two builders working on a timber house frame" },
  { name: "Landscapers", img: landscaperImg, alt: "Landscaper trimming grass along a park path" },
];

const faq: FaqItem[] = [
  {
    q: "What does SEO for tradies include?",
    a: "It can include keyword research, competitor analysis, service-page optimisation, Local SEO, Google Business Profile support, technical SEO, internal linking, content planning, reviews, citations and conversion tracking. The exact scope depends on the business and its priorities.",
  },
  {
    q: "Do tradies need Local SEO as well as website SEO?",
    a: "Often, yes. Many trade customers use local search, Google Maps and business profiles alongside organic results. For eligible local businesses, the website and local presence should support one another.",
  },
  {
    q: "Do you only work with roofers?",
    a: "No. Roofing is our first specialist niche, but the broader tradie service is designed for plumbers, electricians, builders, landscapers and other service-led trade businesses.",
  },
  {
    q: "Can you help if our website is outdated?",
    a: "Yes. We can identify SEO and conversion issues on the current site, and where a larger rebuild is justified we also offer web design for tradies.",
  },
  {
    q: "Can you guarantee we will rank number one?",
    a: "No. Search rankings depend on competition, algorithms and many factors no agency fully controls. We can control the quality of research, prioritisation and implementation, but we do not guarantee a specific ranking.",
  },
  {
    q: "How long does tradie SEO take to work?",
    a: "There is no fixed timeline that applies to every business. Results depend on your starting position, competition, website quality, local signals, authority and how quickly the priority work can be implemented. SEO should be treated as a medium- to long-term growth channel.",
  },
  {
    q: "Is Top Spot Studio based in New Zealand?",
    a: "No. Top Spot Studio is based in Bangladesh and works remotely with international clients. New Zealand is our first core target market, and we are transparent about where we operate.",
  },
  {
    q: "How do we get started?",
    a: "Start with a free SEO audit. We will review the current website and search presence, identify the strongest initial opportunities, and then decide whether a project or ongoing engagement makes sense.",
  },
];

export default function TradiesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: meta.path, name: meta.title, description: meta.description }),
          serviceSchema({
            path: meta.path,
            name: "SEO for Tradies",
            serviceType: "Search engine optimisation for trade businesses",
            description: meta.description,
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faq),
        )}
      />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Industry · Tradies"
        title="SEO for Tradies That Turns Local Searches Into Enquiries"
        highlight="Into Enquiries"
        lead={
          <p>
            When someone needs a roofer, plumber, electrician, builder or other trade service, search is often one of
            the first places they look. The challenge is making sure your business appears for the right services, in
            the right areas, with a website that gives people a reason to contact you.
          </p>
        }
        body={
          <p>
            Top Spot Studio helps tradies improve search visibility through practical SEO, Local SEO and website
            improvements built around real services and real customer journeys - not vanity rankings.
          </p>
        }
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        secondary={{ label: "View Case Studies", href: routes.caseStudies }}
        trust={["Founder-led", "SEO + web capability", "Built around service businesses and tradies"]}
        media={
          <ResponsiveImage
            src={buildersImg}
            alt="Two builders working on the timber frame of a new house"
            ratio="4/3"
            priority
            frame
            sizes="(min-width: 1024px) 540px, 100vw"
          />
        }
      />

      <Section id="why-seo" labelledBy="why-seo-title" tone="white">
        <EditorialSplit id="why-seo-title" title="Why SEO matters for tradies">
          <p className="font-semibold text-navy">
            Tradies do not need traffic for the sake of traffic. They need the right people finding the right service at
            the moment they are ready to call, request a quote or make an enquiry.
          </p>
          <p>
            That means SEO for a trade business has to connect service demand, local relevance, trust and website
            performance. Ranking a homepage for a broad term is rarely enough if the individual services, service areas
            and conversion paths are weak.
          </p>
          <p>
            A stronger strategy helps search engines understand what you do and where you do it, while helping potential
            customers quickly understand why they should contact you.
          </p>
        </EditorialSplit>
      </Section>

      <Section id="gaps" labelledBy="gaps-title">
        <SplitFeature media={<TradeJobMatrix />} align="start">
          <SectionHeader
            id="gaps-title"
            eyebrow="Common gaps"
            title="Common SEO gaps we see in trade businesses"
            intro={
              <p>
                Many trade businesses already have a website and a Google Business Profile, but the pieces are not
                working together as effectively as they could.
              </p>
            }
          />
          <CheckList
            variant="gap"
            className="mt-6 text-base"
            items={[
              "Important services are buried on one generic page instead of having clear, useful service pages.",
              "The website has weak local relevance for the areas the business actually serves.",
              "Google Business Profile categories, services, photos, reviews or website links are under-optimised.",
              "Page titles and headings are generic and do not match how customers search.",
              "The site is difficult to use on mobile, even though many urgent trade searches happen from phones.",
              "Calls, quote requests and form submissions are not tracked, so SEO performance is judged only by rankings or traffic.",
              "Content is published without a clear connection to commercial services or customer questions.",
            ]}
          />
        </SplitFeature>
        <div className="reveal card mt-12 p-6 sm:p-8">
          <h3>How SEO priorities differ by trade</h3>
          <p className="mt-2 text-base text-muted">
            Illustrative examples—not a list of keywords Top Spot Studio is trying to rank for:
          </p>
          <ul className="mt-5 grid gap-4 text-base md:grid-cols-3">
            <li>
              <strong className="text-navy">Plumber / blocked drains:</strong> make an urgent drainage service easy to
              find; use a clear mobile call option and service-area information.
            </li>
            <li>
              <strong className="text-navy">Electrician / switchboard upgrade:</strong> explain the planned work,
              qualifications and quote requirements on an appropriate service page.
            </li>
            <li>
              <strong className="text-navy">Roofer / roof repairs:</strong> separate repair enquiries from larger
              reroofing projects when customer intent and the company’s real service offering justify it.
            </li>
          </ul>
          <p className="mt-5 text-base">
            Each business needs its own service-to-page map. A single trade-wide template cannot capture every job type,
            service area or enquiry process.
          </p>
        </div>
      </Section>

      <Section id="services" labelledBy="services-title" tone="white">
        <SectionHeader
          id="services-title"
          eyebrow="Scope"
          title="What our SEO for tradies can include"
          intro={
            <p>
              The scope depends on the business, market and website. We focus on the work that supports visibility,
              trust and enquiries instead of forcing every client into the same checklist.
            </p>
          }
        />
        <div className="mt-12">
          <FeatureList
            items={[
              {
                title: "Local Keyword & Competitor Research",
                icon: Search,
                body: (
                  <p>
                    We research how customers search for your services, which locations matter, what competitors are
                    doing well, and where the strongest opportunities may be.
                  </p>
                ),
              },
              {
                title: "Service Page Strategy",
                icon: Route,
                body: (
                  <p>
                    We map priority services to the right pages, reduce overlap between pages, and strengthen commercial
                    pages so they better match search intent and customer needs.
                  </p>
                ),
              },
              {
                title: "Google Business Profile Support",
                icon: Store,
                body: (
                  <p>
                    For eligible local businesses, we review profile categories, services, business details, reviews,
                    photos and the connection between the profile and website.
                  </p>
                ),
              },
              {
                title: "On-Page SEO",
                icon: FileText,
                body: (
                  <p>
                    We improve titles, headings, copy, page structure, internal links and topical relevance across
                    priority pages.
                  </p>
                ),
              },
              {
                title: "Technical SEO",
                icon: Wrench,
                body: (
                  <p>
                    We identify crawl, indexation, redirect, duplicate, mobile, performance and other technical issues
                    that may hold back important pages.
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
                title: "Content & Topical Support",
                icon: PenLine,
                body: (
                  <p>
                    We plan useful supporting content around real customer questions, service decisions and local demand,
                    then connect that content to commercial pages through internal links.
                  </p>
                ),
              },
              {
                title: "Tracking & Reporting",
                icon: BarChart3,
                body: (
                  <p>
                    Where access allows, we track organic visibility, priority pages and meaningful actions such as
                    forms, calls or quote requests instead of reporting activity alone.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <Section id="trades" labelledBy="trades-title">
        <SectionHeader
          id="trades-title"
          eyebrow="Trades we can support"
          title="Built for service-led trade businesses"
          intro={
            <p>
              Our approach is designed for service-led trade businesses where customers search by service, location,
              urgency and trust.
            </p>
          }
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {trades.map((t) => (
            <li key={t.name} className="reveal group relative overflow-hidden rounded-[20px] shadow-[var(--shadow-card)]">
              <ResponsiveImage src={t.img} alt={t.alt} ratio="4/3" sizes="(min-width: 768px) 380px, 50vw" position={t.position} />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent px-4 pb-3 pt-10 font-semibold text-white">
                {t.name}
              </span>
            </li>
          ))}
          <li className="reveal flex aspect-[4/3] flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-teal/30 bg-gradient-to-br from-teal-soft to-white p-4 text-center">
            <Plus aria-hidden className="size-6 text-teal-ink" />
            <span className="mt-2 font-semibold text-navy">Other service-led trades</span>
          </li>
        </ul>
        <Callout title="Current specialist focus: Roofing businesses" className="mt-8">
          <p>
            Roofing is the first niche we are building around. See how we approach{" "}
            <Link href={routes.roofing} className="text-link">
              SEO for roofing companies
            </Link>
            .
          </p>
        </Callout>
      </Section>

      <Section id="local" labelledBy="local-title" tone="white">
        <SplitFeature media={<LocalSignalsDiagram />} reverse>
          <SectionHeader
            id="local-title"
            title="Local SEO is often a big part of the picture"
            intro={
              <>
                <p>For many tradies, visibility in local search matters as much as traditional organic rankings.</p>
                <p>
                  A potential customer may see a map result, a Google Business Profile, a service page and reviews before
                  deciding who to contact. Those touchpoints should support one another.
                </p>
                <p>
                  When Local SEO is part of the scope, we look at Google Business Profile, local keywords, reviews,
                  citations, website relevance and the pages that support the areas and services you genuinely offer.
                </p>
              </>
            }
          />
          <Link href={routes.nzLocalSeo} className="text-link mt-6 inline-block">
            Explore local SEO for trade businesses
          </Link>
        </SplitFeature>
      </Section>

      <Section id="website" labelledBy="website-title">
        <SplitFeature media={<SiteWireframe />}>
          <SectionHeader
            id="website-title"
            title="SEO works better when the website can convert"
            intro={
              <>
                <p>
                  Getting found is only half the job. If the website is confusing, slow, thin on trust, or difficult to
                  use on mobile, more visibility may not turn into more enquiries.
                </p>
                <p>
                  Top Spot Studio combines SEO and web capability so we can look beyond rankings. That can include
                  clearer service journeys, stronger calls to action, better mobile usability, trust elements, project
                  proof, review placement and quote-request paths.
                </p>
                <p>
                  If the website needs more than SEO edits, our{" "}
                  <Link href={routes.webDesign} className="text-link">
                    web design for tradies
                  </Link>{" "}
                  service can address the wider experience.
                </p>
              </>
            }
          />
          <div className="mt-8">
            <CtaLink href={routes.webDesign} variant="secondary" event="service_cta_click" location="website_section">
              Explore Web Design for Tradies
            </CtaLink>
          </div>
        </SplitFeature>
      </Section>

      <Section id="process" labelledBy="process-title" tone="white">
        <SectionHeader
          id="process-title"
          eyebrow="Our SEO process for tradies"
          title="Starting with the jobs customers actually request"
          intro={
            <p>
              We start with the work customers actually request and the areas the tradie genuinely serves. A
              blocked-drain enquiry and an electrical upgrade need different service information, proof and calls to
              action.
            </p>
          }
        />
        <div className="mt-12">
          <ProcessSteps
            steps={[
              {
                title: "Understand the business",
                body: "We identify the most valuable job types, the places the business really covers, and whether customers generally call immediately or request a planned quote.",
              },
              {
                title: "Audit visibility and the website",
                body: "We review search performance, service pages, technical setup, local signals, competitors and available tracking.",
              },
              {
                title: "Prioritise the biggest gaps",
                body: "We prioritise missing service pages, incorrect business information, weak mobile quote paths and tracking gaps according to each trade’s actual sales process.",
              },
              {
                title: "Implement the agreed work",
                body: "We implement the agreed work, distinguishing quick contact-path repairs from service-page, technical and Local SEO improvements.",
              },
              {
                title: "Measure and refine",
                body: "We review what is changing, what is creating progress and what deserves attention next.",
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
          title="Focused delivery, not layers of account management"
          intro={
            <p>
              Top Spot Studio is a small, founder-led SEO and web studio built around focused delivery rather than layers
              of account management.
            </p>
          }
        />
        <div className="mt-12">
          <NumberedCards
            tone="navy"
            numbered={false}
            items={[
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
                title: "Trade-Specific Buyer Journeys",
                icon: MapPinned,
                body: (
                  <p>
                    We approach tradie SEO around services, service areas, reviews, calls, quote requests and real
                    customer journeys.
                  </p>
                ),
              },
              {
                title: "SEO + Web in One Workflow",
                icon: Gauge,
                body: (
                  <p>
                    If a ranking issue is really a page-structure, mobile or conversion problem, we can consider both
                    sides instead of treating SEO and the website as unrelated.
                  </p>
                ),
              },
              {
                title: "Clear Priorities",
                icon: Eye,
                body: <p>We explain what we are doing, why it matters and what comes next without hiding behind technical jargon.</p>,
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
        <EditorialSplit id="market-title" eyebrow="Current market focus" title="New Zealand">
          <p>
            New Zealand is Top Spot Studio&apos;s first core international market, and our initial outreach focus is
            tradies - especially roofing businesses.
          </p>
          <p>
            Top Spot Studio is based in Bangladesh and works remotely. We do not claim a New Zealand office or local
            physical presence that does not exist.
          </p>
          <p>
            The strategy is still market-specific: keyword research, SERP analysis, competitor research and content
            decisions are based on the actual market we are targeting. Learn more about our{" "}
            <Link href={routes.nzSeo} className="text-link">
              SEO services for New Zealand businesses
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
            technical fixes, on-page optimisation, Local SEO, content, analytics and client delivery.
          </p>
        }
        note={
          <p>
            These are selected results from SEO work led or managed by the people behind Top Spot Studio before the
            agency was launched. They are not presented as Top Spot Studio client results. Results vary by business,
            market, competition and starting point.
          </p>
        }
      />

      <CtaBand
        tone="tint"
        eyebrow="Start with a free SEO audit"
        title="Not sure what is limiting your visibility?"
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        location="audit_section"
        aside={
          <div className="glass rounded-[22px] p-7">
            <CheckList
              className="text-base"
              items={["No GA4 or Search Console access needed.", "No obligation.", "No ranking promises."]}
            />
          </div>
        }
      >
        <p>
          We will review your website and search presence, then highlight a small number of high-impact opportunities
          worth looking at first.
        </p>
        <p>
          No oversized automated report. No pressure to buy a package. Just a clearer view of the gaps that may be
          holding the business back.
        </p>
      </CtaBand>

      <FaqSection items={faq} />

      <CtaBand
        title="Ready to make your search visibility work harder for the business?"
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        secondary={{ label: "Contact Top Spot Studio", href: routes.contact }}
      >
        <p>Start with a focused audit and find out which SEO opportunities deserve attention first.</p>
      </CtaBand>
    </>
  );
}
