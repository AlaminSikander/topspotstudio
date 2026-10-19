import Link from "next/link";
import type { Metadata } from "next";
import {
  BarChart3,
  Briefcase,
  CalendarCheck,
  Gauge,
  Link2,
  ListChecks,
  MapPin,
  MapPinned,
  ShieldOff,
  Star,
  Store,
  Users,
  Wrench,
  Eye,
  FileText,
} from "lucide-react";
import searcherImg from "@/assets/photos/customer-searching-on-phone.jpg";
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
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { LocalSignalsDiagram } from "@/components/visuals/Diagrams";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema, type Crumb } from "@/lib/schema";
import { routes } from "@/lib/site";

const meta = {
  title: "Local SEO NZ for Service Businesses | Top Spot Studio",
  description:
    "Improve Google Maps and local search visibility with Local SEO services for New Zealand service businesses. Start with a free SEO audit.",
  path: routes.nzLocalSeo,
};

export const metadata: Metadata = pageMetadata(meta);

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Local SEO NZ", path: routes.nzLocalSeo },
];

const faq: FaqItem[] = [
  {
    q: "What is Local SEO?",
    a: "Local SEO is the process of improving a business’s visibility for searches connected to a location or service area. It can involve Google Business Profile, website optimisation, local keywords, reviews, citations, links and other trust signals.",
  },
  {
    q: "Is Local SEO different from regular SEO?",
    a: "Yes, although they overlap. Traditional SEO focuses on organic search visibility more broadly. Local SEO gives extra attention to location relevance, Google Business Profile, local results, reviews, citations and service-area signals. A strong local campaign normally needs both the website and local profile working together.",
  },
  {
    q: "Do you manage Google Business Profile?",
    a: "Google Business Profile optimisation can be included where it fits the project. We can review categories, services, business information, website links, profile completeness and other relevant elements. The business owner must still provide accurate real-world information and any verification Google requires.",
  },
  {
    q: "Can you guarantee a Top 3 Google Maps ranking?",
    a: "No. Local results are influenced by relevance, distance, prominence, competition and Google’s own systems. We can improve the signals within our control, but we do not guarantee a specific Map Pack position.",
  },
  {
    q: "Do you only work with New Zealand tradies?",
    a: "No. Tradies are an important initial focus, and roofing is our first niche specialisation. The broader Local SEO service is designed for service businesses where local discovery and enquiries matter.",
  },
  {
    q: "Where is Top Spot Studio based?",
    a: "Top Spot Studio is based in Bangladesh and works remotely with New Zealand businesses. We are transparent about that and do not present ourselves as a New Zealand-based agency.",
  },
  {
    q: "How long does Local SEO take?",
    a: "There is no reliable fixed timeline. Progress depends on your starting position, competition, website quality, profile strength, reviews, authority and the work required. Some improvements can be implemented quickly, while competitive visibility usually needs consistent work over time.",
  },
  {
    q: "How do you report Local SEO performance?",
    a: "Reporting is tailored to the project. We may track local and organic visibility, Google Business Profile performance, Search Console clicks, important landing pages, calls or forms, review activity and the work completed during the period.",
  },
];

export default function LocalSeoPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: meta.path, name: meta.title, description: meta.description }),
          serviceSchema({
            path: meta.path,
            name: "Local SEO Services for New Zealand Businesses",
            serviceType: "Local search engine optimisation",
            description: meta.description,
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faq),
        )}
      />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Local SEO · New Zealand"
        title="Local SEO Services for New Zealand Businesses"
        highlight="New Zealand Businesses"
        lead={
          <p>
            Be easier to find when nearby customers search for the services you provide — and make it easier for those
            searches to turn into calls, quote requests and enquiries.
          </p>
        }
        body={
          <p>
            Top Spot Studio helps New Zealand service businesses strengthen their local search presence across Google
            Business Profile, local service pages, reviews, citations, on-page SEO and performance tracking.
          </p>
        }
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        secondary={{ label: "View Case Studies", href: routes.caseStudies }}
        trust={["Founder-led", "Local SEO + website expertise", "Remote service for New Zealand businesses"]}
        media={
          <ResponsiveImage
            src={searcherImg}
            alt="Person on a sofa searching on a smartphone"
            ratio="4/3"
            priority
            frame
            sizes="(min-width: 1024px) 540px, 100vw"
            position="60% 50%"
          />
        }
      />

      <Section id="intent" labelledBy="intent-title" tone="white">
        <EditorialSplit id="intent-title" title="Local search is where high-intent customers often start">
          <p>
            When someone searches for a roofer, plumber, electrician, clinic, consultant or another service nearby, they
            are often much closer to taking action than someone casually browsing a general topic.
          </p>
          <p>
            But local visibility is not controlled by one setting or one keyword. Google looks at how relevant a
            business is to the search, how close it is to the searcher, and how prominent or trusted it appears across
            the web. Your Google Business Profile matters, but so do your website, reviews, service pages, business
            information and local authority.
          </p>
          <p>
            Our role is to connect those pieces into one practical Local SEO strategy so your business has a stronger
            chance of appearing when the right customers are looking. Where broader organic visibility matters too, see
            our{" "}
            <Link href={routes.nzSeo} className="text-link">
              SEO services for New Zealand businesses
            </Link>
            .
          </p>
        </EditorialSplit>
      </Section>

      <Section id="services" labelledBy="services-title">
        <SectionHeader
          id="services-title"
          eyebrow="Scope"
          title="What our Local SEO services can include"
          intro={
            <p>
              Every Local SEO project is scoped around the business, its service areas and its current visibility. We
              prioritise the work that matters instead of forcing every client through the same checklist.
            </p>
          }
        />
        <div className="mt-12">
          <FeatureList
            items={[
              {
                title: "Google Business Profile Optimisation",
                icon: Store,
                body: (
                  <p>
                    We review your profile structure, primary and secondary categories, services, business information,
                    photos, website links and other relevant fields. The goal is a complete, accurate profile that
                    clearly reflects what the business actually offers.
                  </p>
                ),
              },
              {
                title: "Local Keyword & Service Mapping",
                icon: MapPinned,
                body: (
                  <p>
                    We research how customers search for your services in the areas you serve, then map those searches to
                    the right pages. This helps prevent one generic page from trying to rank for every service and every
                    location.
                  </p>
                ),
              },
              {
                title: "Service & Location Page Optimisation",
                icon: FileText,
                body: (
                  <p>
                    We improve the pages that support local discovery with clearer titles, headings, copy, internal
                    links, service relevance, trust signals and conversion paths. New location pages are only
                    recommended where there is genuine business value and enough unique information to justify them.
                  </p>
                ),
              },
              {
                title: "Reviews & Reputation Support",
                icon: Star,
                body: (
                  <p>
                    Reviews influence trust and local prominence. We help you create a practical review-request process,
                    improve how reviews are responded to, and use genuine customer feedback as a stronger trust signal
                    across your local presence.
                  </p>
                ),
              },
              {
                title: "NAP & Citation Consistency",
                icon: ListChecks,
                body: (
                  <p>
                    Your business name, address and phone information should be accurate and consistent across important
                    directories and platforms. We identify priority listings, correct meaningful inconsistencies and
                    avoid low-value directory spam.
                  </p>
                ),
              },
              {
                title: "Local On-Page & Technical SEO",
                icon: Wrench,
                body: (
                  <p>
                    Local rankings still depend on a website Google can crawl, understand and trust. We review
                    indexation, redirects, page structure, mobile usability, internal linking, duplicate issues and other
                    technical factors that may hold important local pages back.
                  </p>
                ),
              },
              {
                title: "Local Authority & Link Opportunities",
                icon: Link2,
                body: (
                  <p>
                    Where appropriate, we identify relevant local, industry and relationship-based link opportunities
                    that can strengthen prominence. We focus on relevance and legitimacy rather than bulk link building.
                  </p>
                ),
              },
              {
                title: "Tracking & Reporting",
                icon: BarChart3,
                body: (
                  <p>
                    We connect Local SEO activity to measurable outcomes. Depending on the project, this can include
                    Google Search Console, GA4, key form or call actions, keyword visibility and Google Business Profile
                    performance.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <Section id="how" labelledBy="how-title" tone="white">
        <SplitFeature media={<LocalSignalsDiagram />} align="start">
          <SectionHeader
            id="how-title"
            eyebrow="How Local SEO works"
            title="Relevance, distance and prominence"
            intro={
              <>
                <p>
                  Google describes local results around three broad factors: relevance, distance and prominence. You
                  cannot control every part of that equation, but you can improve the signals that tell Google what your
                  business does, where it operates and why it should be trusted.
                </p>
                <dl className="space-y-3 text-base">
                  <div>
                    <dt className="inline font-semibold text-navy">Relevance — </dt>
                    <dd className="inline">How closely your business profile and website match what the customer is searching for.</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-navy">Distance — </dt>
                    <dd className="inline">
                      How close the business is to the location used in the search. This is largely outside an agency’s
                      control.
                    </dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-navy">Prominence — </dt>
                    <dd className="inline">
                      How established and trusted the business appears through reviews, links, mentions, website quality
                      and broader reputation.
                    </dd>
                  </div>
                </dl>
                <p>
                  This is why Local SEO is more than changing a few Google Business Profile fields. Strong local
                  visibility usually comes from the profile, website, reputation and authority working together.
                </p>
              </>
            }
          />
          <Callout title="Example: Connecting a real trade service to a real service area" className="mt-8">
            <p>
              <em>Illustrative example only:</em> A roofing company that genuinely serves Hamilton and parts of Waikato
              could explain its roof-repair service on a useful service page, show the actual areas it serves, and
              connect the website to its eligible Google Business Profile. The profile categories and
              address/service-area details must reflect the real business—not an invented location.
            </p>
            <p>
              A separate area page should only be created where the company has genuinely relevant, distinctive
              information for that place. Repeating the same text across dozens of towns is not a Local SEO strategy.
            </p>
          </Callout>
        </SplitFeature>
      </Section>

      <Section id="who" labelledBy="who-title">
        <SectionHeader
          id="who-title"
          eyebrow="Who we help"
          title="For businesses where location shapes who becomes a customer"
          intro={
            <p>
              Our Local SEO service is designed for businesses where location and service area influence who becomes a
              customer.
            </p>
          }
        />
        <div className="mt-12">
          <NumberedCards
            items={[
              {
                title: "Tradies & Home Service Businesses",
                icon: Wrench,
                body: (
                  <p>
                    Roofers, plumbers, electricians, builders, landscapers and other trade businesses that rely on local
                    calls, quote requests and service-area searches.
                  </p>
                ),
              },
              {
                title: "Clinics & Appointment-Based Businesses",
                icon: CalendarCheck,
                body: (
                  <p>
                    Businesses that need customers to find a nearby location, understand the service and feel confident
                    enough to book or enquire.
                  </p>
                ),
              },
              {
                title: "Professional & Local Service Providers",
                icon: Briefcase,
                body: (
                  <p>
                    Consultants and other service businesses competing for location-relevant searches where trust and
                    website quality matter.
                  </p>
                ),
              },
            ]}
          />
        </div>
        <Callout title="Current specialist focus" className="mt-8">
          <p>
            Top Spot Studio is initially building deeper systems and outreach around New Zealand tradies, with roofing
            as the first niche focus. Read more about{" "}
            <Link href={routes.tradies} className="text-link">
              SEO for tradies
            </Link>{" "}
            and our{" "}
            <Link href={routes.roofing} className="text-link">
              roofing SEO
            </Link>{" "}
            approach.
          </p>
        </Callout>
      </Section>

      <Section id="process" labelledBy="process-title" tone="white">
        <SectionHeader id="process-title" eyebrow="Our Local SEO process" title="From local visibility audit to measured progress" />
        <div className="mt-12">
          <ProcessSteps
            steps={[
              {
                title: "Understand the Business",
                body: "We learn which services matter most, which areas you actually serve, how enquiries are generated today and what success should look like.",
              },
              {
                title: "Audit Local Visibility",
                body: "We review Google Business Profile, search visibility, website structure, service pages, reviews, citations, competitors and technical issues.",
              },
              {
                title: "Build the Priority Plan",
                body: "We separate high-impact fixes from lower-priority tasks and create a roadmap based on the business, not on a generic monthly activity list.",
              },
              {
                title: "Implement the Work",
                body: "We optimise the profile and website, strengthen local relevance, improve important pages and work through reputation, citation and authority opportunities where appropriate.",
              },
              {
                title: "Measure, Learn and Refine",
                body: "We track how visibility and enquiries change, review what is working and update priorities as the data becomes clearer.",
              },
            ]}
          />
        </div>
      </Section>

      <Section id="measure" labelledBy="measure-title">
        <EditorialSplit id="measure-title" eyebrow="What we measure" title="Reporting built around business progress">
          <p>
            Local SEO reporting should help you understand business progress, not bury you in screenshots and ranking
            grids.
          </p>
          <CheckList
            className="text-base"
            items={[
              "Local and organic search visibility for commercially important services",
              "Google Business Profile performance where relevant",
              "Organic clicks and landing-page performance",
              "Calls, forms, quote requests or other tracked enquiry actions",
              "Review growth and reputation activity",
              "Completed work, current priorities and next actions",
            ]}
          />
          <p className="text-base text-muted">
            Rankings are useful context, but we do not treat a single keyword position as the only measure of success.
          </p>
        </EditorialSplit>
      </Section>

      <Section id="why" labelledBy="why-title" tone="navy">
        <SectionHeader id="why-title" tone="navy" eyebrow="Why work with Top Spot Studio" title="A practical, transparent Local SEO partner" />
        <div className="mt-12">
          <NumberedCards
            tone="navy"
            numbered={false}
            items={[
              {
                title: "Founder-Led Delivery",
                icon: Users,
                body: (
                  <p>
                    Top Spot Studio is a two-person agency. You work directly with the people involved in the strategy
                    and implementation rather than being passed through layers of account management.
                  </p>
                ),
              },
              {
                title: "SEO and Website Thinking Together",
                icon: Gauge,
                body: (
                  <p>
                    Local search performance and website performance are connected. If the problem is a weak service
                    page, poor conversion path or technical issue, we can address the website side rather than treating
                    Local SEO as a separate checklist. See{" "}
                    <Link href={routes.webDesign} className="font-semibold text-teal underline underline-offset-4 hover:text-white">
                      web design for tradies
                    </Link>
                    .
                  </p>
                ),
              },
              {
                title: "Clear Priorities",
                icon: Eye,
                body: (
                  <p>
                    Not every issue deserves the same attention. We focus first on the work most likely to improve
                    relevance, trust, visibility or conversion.
                  </p>
                ),
              },
              {
                title: "Transparent Positioning",
                icon: MapPin,
                body: (
                  <p>
                    Top Spot Studio is based in Bangladesh and works remotely with New Zealand businesses. We do not
                    claim a New Zealand office or local presence that does not exist.
                  </p>
                ),
              },
              {
                title: "No Ranking Guarantees",
                icon: ShieldOff,
                body: (
                  <p>
                    No agency controls Google’s results. We do not guarantee a Map Pack position, a #1 ranking or a fixed
                    timeline. We focus on controllable improvements and measurable progress.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <ProofSection
        eyebrow="Selected results"
        title="Experience & proof"
        intro={
          <p>
            Top Spot Studio is a new agency, but the people behind it bring hands-on experience across SEO strategy,
            Local SEO, technical fixes, service-page optimisation, tracking and organic growth.
          </p>
        }
        note={
          <p>
            These are selected results from SEO work led or managed by the people behind Top Spot Studio before the
            agency was launched. They are not presented as Local SEO guarantees, and results vary by market,
            competition, starting point and implementation.
          </p>
        }
        ctaLabel="SEO case studies"
      />

      <CtaBand
        tone="tint"
        eyebrow="Start with a free SEO audit"
        title="See what may be limiting your local search visibility"
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        location="audit_section"
      >
        <p>
          Not sure whether your biggest local-search issue is Google Business Profile setup, service-page relevance,
          reviews, citations or competitors? Start with our short Free SEO Audit, which can include local-search
          observations when relevant and publicly assessable.
        </p>
        <p>
          We provide a focused initial review rather than a full Local SEO audit: typically 5–7 findings and three
          suggested priorities, based on available evidence. A complete listing-by-listing or full technical audit
          requires a separate engagement.
        </p>
        <p className="text-base">
          Depending on the information available, the review may consider a public Google Business Profile,
          service-page relevance, local search appearance and contact paths. It does not require Google account access
          at the enquiry stage.
        </p>
      </CtaBand>

      <FaqSection items={faq} />

      <CtaBand
        title="Want a clearer view of your local search opportunities?"
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        secondary={{ label: "Contact Top Spot Studio", href: routes.contact }}
      >
        <p>
          Start with a short Free SEO Audit. We will identify selected public website and local-visibility issues,
          explain three practical priorities where possible, and make the limits of this first review clear.
        </p>
      </CtaBand>
    </>
  );
}
