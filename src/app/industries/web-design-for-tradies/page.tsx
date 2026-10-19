import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BarChart3, Gauge, LayoutGrid, MessagesSquare, MousePointerClick, ShieldCheck, ShieldOff, Smartphone, Users, Workflow, Search } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/sections/Section";
import {
  Callout,
  CheckList,
  CtaBand,
  EditorialSplit,
  FeatureList,
  NumberedCards,
  Pill,
  ProcessSteps,
  TierCards,
} from "@/components/sections/Blocks";
import { FaqSection, type FaqItem } from "@/components/sections/FaqList";
import { CtaLink } from "@/components/ui/CtaLink";
import { SiteWireframe } from "@/components/visuals/Diagrams";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema, type Crumb } from "@/lib/schema";
import { routes } from "@/lib/site";

const meta = {
  title: "Web Design for Tradies | Top Spot Studio",
  description:
    "Web design for tradies focused on speed, trust, local visibility and enquiries. Build a clearer, SEO-ready website with Top Spot Studio.",
  path: routes.webDesign,
};

export const metadata: Metadata = pageMetadata(meta);

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Industries" },
  { name: "Web Design for Tradies", path: routes.webDesign },
];

const projectCta = { label: "Discuss Your Website Project", href: routes.contact, event: "service_cta_click" as const };
const seoCta = { label: "Explore SEO for Tradies", href: routes.tradies, event: "service_cta_click" as const };

const faq: FaqItem[] = [
  {
    q: "Do you only design websites for tradies?",
    a: "No. Tradies are an important initial focus because their customer journey depends heavily on local search, trust and fast enquiries. Top Spot Studio can also support other service businesses where the same principles apply.",
  },
  {
    q: "Can you redesign an existing tradie website?",
    a: "Yes. If the existing site has useful pages, rankings or backlinks, we first review what should be preserved. A redesign should not unnecessarily throw away existing SEO value, so migration and redirects are planned where required.",
  },
  {
    q: "Do you include SEO with the website?",
    a: "The agreed build includes foundational SEO-ready structure such as crawlable pages, headings, basic metadata fields and purposeful internal links. Keyword research at scale, new monthly content, Google Business Profile management and ongoing SEO are separate services unless the signed proposal includes them.",
  },
  {
    q: "Will the website work on mobile?",
    a: "Yes. Mobile usability is a core requirement because many local service searches happen on phones. Important content, forms and calls to action should remain clear and usable across common screen sizes.",
  },
  {
    q: "Can you write the website content?",
    a: "Copywriting or content refinement can be included when specifically priced in the proposal. The client provides accurate service details, images and approvals. It is not unlimited or automatically included in every package.",
  },
  {
    q: "How many pages does a tradie website need?",
    a: "There is no fixed number. The right structure depends on the services, locations, customer questions and search demand. We would rather build a smaller set of useful pages than create thin pages simply to increase the page count.",
  },
  {
    q: "Can you guarantee the new website will rank on Google?",
    a: "No. A well-structured website gives SEO a stronger foundation, but rankings depend on many factors outside the website alone, including competition, authority, content, local signals and ongoing optimisation.",
  },
  {
    q: "How do we get started?",
    a: "Tell us what you need through the Contact page. We will review the project brief, request the details needed for scoping and discuss whether a redesign, rebuild or selected improvements make sense. This is a project enquiry, not a promised free website audit.",
  },
];

const siteFlow = ["Home", "Services overview", "Priority service detail pages", "Projects / Work examples", "About / Trust", "Contact / Request a Quote"];

export default function WebDesignPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: meta.path, name: meta.title, description: meta.description }),
          serviceSchema({
            path: meta.path,
            name: "Web Design for Tradies",
            serviceType: "Website design and development",
            description: meta.description,
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faq),
        )}
      />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Industry · Web design"
        title="Web Design for Tradies"
        highlight="Tradies"
        lead={
          <p>
            A good tradie website should do more than look professional. It should make it easy for the right customers
            to understand what you do, trust your business and take the next step.
          </p>
        }
        body={
          <p>
            Top Spot Studio builds clear, conversion-focused websites for tradies and service businesses — with strong
            service structure, mobile usability, local SEO foundations and practical calls to action built in from the
            start.
          </p>
        }
        primary={projectCta}
        secondary={seoCta}
        media={
          <div className="pb-8 pr-2 sm:pr-6">
            <SiteWireframe />
          </div>
        }
      />

      <Section id="job" labelledBy="job-title" tone="white">
        <EditorialSplit
          id="job-title"
          eyebrow="Your website has one main job"
          title="Turn attention into trust — and trust into enquiries"
          aside={
            <ul className="flex flex-wrap gap-2">
              {["Can you do the job?", "Do you work in my area?", "Can I trust you?", "How do I contact you?"].map((q) => (
                <li key={q}>
                  <Pill>{q}</Pill>
                </li>
              ))}
            </ul>
          }
        >
          <p>
            Most people do not visit a tradie website because they want to browse. They are usually trying to answer a
            few practical questions quickly: Can you do the job? Do you work in my area? Can I trust you? How do I
            contact you?
          </p>
          <p>
            If those answers are hard to find, even strong Google visibility can be wasted. That is why we treat web
            design as part of the customer journey, not a separate design exercise.
          </p>
          <p className="font-semibold text-navy">
            The goal is a website that helps a potential customer move from search to confidence to enquiry with as
            little friction as possible.
          </p>
        </EditorialSplit>
      </Section>

      <Section id="problems" labelledBy="problems-title">
        <SectionHeader
          id="problems-title"
          eyebrow="Common problems"
          title="Common website problems for tradies"
          intro={
            <p>
              Many trade businesses already have a website, but common structural and conversion issues can make it
              harder for both customers and search engines to understand the business.
            </p>
          }
        />
        <div className="reveal card mt-10 p-6 sm:p-10">
          <CheckList
            variant="gap"
            className="grid gap-x-10 gap-y-4 space-y-0 text-base md:grid-cols-2"
            items={[
              "Important services are grouped together on one generic page instead of having clear, useful service pages.",
              "Visitors cannot quickly tell which areas the business serves.",
              "The mobile experience is slow, cluttered or difficult to navigate.",
              "Calls to action are weak, inconsistent or buried too far down the page.",
              "Project photos, reviews, accreditations or other trust signals are missing or hard to find.",
              "Contact forms ask for too much information or do not explain what happens next.",
              "The site structure was built without considering SEO, internal linking or future service growth.",
              "Analytics and enquiry tracking are missing, so the business cannot see which pages actually contribute to leads.",
            ]}
          />
        </div>
      </Section>

      <Section id="build" labelledBy="build-title" tone="white">
        <SectionHeader
          id="build-title"
          eyebrow="What we build"
          title="What we build into a tradie website"
          intro={
            <p>
              Every project is different, but the website should be planned around real customer behaviour and the
              services the business wants to grow.
            </p>
          }
        />
        <div className="mt-12">
          <FeatureList
            items={[
              {
                title: "Clear Service Architecture",
                icon: LayoutGrid,
                body: (
                  <p>
                    We organise the site so important services are easy to find, understand and expand over time. When
                    separate service pages make sense, each one can answer specific customer questions and support its
                    own search demand.
                  </p>
                ),
              },
              {
                title: "Mobile-First User Experience",
                icon: Smartphone,
                body: (
                  <p>
                    Tradie customers often search from a phone while comparing providers or trying to solve an immediate
                    problem. Pages need clear navigation, readable content, simple forms and obvious contact options on
                    smaller screens.
                  </p>
                ),
              },
              {
                title: "Conversion-Focused Calls to Action",
                icon: MousePointerClick,
                body: (
                  <p>
                    The website should make the next step obvious. Depending on the business, that may be a call, quote
                    request, booking, consultation or project enquiry. We place calls to action where they support the
                    page instead of forcing them everywhere.
                  </p>
                ),
              },
              {
                title: "Trust and Proof",
                icon: ShieldCheck,
                body: (
                  <p>
                    Reviews, project photos, credentials, service guarantees, team information and case studies can
                    reduce hesitation when they are genuine and placed in the right context. We build space for the
                    proof your business actually has.
                  </p>
                ),
              },
              {
                title: "SEO-Ready Structure",
                icon: Search,
                body: (
                  <p>
                    Web design and SEO should not be separated until after launch. We plan headings, URLs, internal
                    links, service hierarchy, crawlability and on-page foundations as part of the build so the site
                    starts with a cleaner search structure.
                  </p>
                ),
              },
              {
                title: "Speed and Technical Foundations",
                icon: Gauge,
                body: (
                  <p>
                    We aim for a lean, reliable site that works across common devices and avoids unnecessary visual
                    elements that slow down the experience. Performance work is prioritised around real usability rather
                    than chasing a perfect score for its own sake.
                  </p>
                ),
              },
              {
                title: "Tracking That Connects the Website to Business Activity",
                icon: BarChart3,
                body: (
                  <p>
                    Where appropriate, we set up analytics and conversion tracking for important actions such as forms,
                    quote requests, calls or booking clicks. That makes future SEO and website decisions easier to
                    evaluate.
                  </p>
                ),
              },
            ]}
          />
        </div>
        <div className="reveal surface-tint mt-14 rounded-[24px] border border-teal/20 p-6 sm:p-8">
          <h3>Example: A practical tradie website structure</h3>
          <ol className="mt-5 flex flex-wrap items-center gap-2">
            {siteFlow.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className="rounded-[10px] border border-line bg-white px-3 py-2 text-sm font-semibold text-navy">{s}</span>
                {i < siteFlow.length - 1 ? <ArrowRight aria-hidden className="size-4 text-teal" /> : null}
              </li>
            ))}
          </ol>
          <p className="mt-5 text-base">
            A service page explains one real job type, shows the genuine area covered and puts the next contact step
            nearby. Project photos and testimonials should only be used when the business owns them and permission has
            been confirmed.
          </p>
        </div>
      </Section>

      <Section id="who" labelledBy="who-title">
        <EditorialSplit id="who-title" eyebrow="Who this service is for" title="Websites for trade and service businesses">
          <p>
            Our tradie web design service is suited to businesses where customers search for a specific service, compare
            trust signals and then contact a provider.
          </p>
          <ul className="flex flex-wrap gap-2 !list-none !pl-0">
            {[
              "Roofing companies",
              "Plumbers and drainage businesses",
              "Electricians",
              "Builders and renovation businesses",
              "Landscapers and outdoor service providers",
              "HVAC, heating and cooling businesses",
              "Other local service businesses with a clear enquiry or quote journey",
            ].map((b) => (
              <li key={b}>
                <Pill>{b}</Pill>
              </li>
            ))}
          </ul>
          <p>
            Roofing is our initial specialist niche, while the wider Top Spot Studio model is built to support additional
            service industries over time.
          </p>
          <p>
            <Link href={routes.roofing} className="text-link">
              See our approach to SEO for roofing companies
            </Link>
          </p>
        </EditorialSplit>
      </Section>

      <Section id="seo" labelledBy="seo-title" tone="navy">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeader
              id="seo-title"
              tone="navy"
              title="Web design and SEO should support each other"
              intro={
                <>
                  <p>
                    A website can look polished and still be difficult to find. It can also rank for useful searches and
                    still fail to generate enquiries.
                  </p>
                  <p>
                    That is why our approach connects website structure with search visibility. During planning, we
                    consider which services deserve dedicated pages, how users should move between them, where local
                    relevance belongs, how internal links should work and what information customers need before they
                    contact the business.
                  </p>
                  <p>
                    If SEO is part of the wider project, the website can be built around a clearer keyword and content
                    map instead of being redesigned first and optimised later.
                  </p>
                </>
              }
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href={projectCta.href} event="service_cta_click" location="seo_section" arrow>
                {projectCta.label}
              </CtaLink>
              <CtaLink href={routes.tradies} variant="light" event="service_cta_click" location="seo_section_secondary">
                Explore SEO for Tradies
              </CtaLink>
            </div>
          </div>
          <div className="reveal glass-dark rounded-[24px] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal">Related services</p>
            <ul className="mt-4 space-y-3">
              {[
                { label: "SEO for tradies", href: routes.tradies },
                { label: "SEO services for New Zealand businesses", href: routes.nzSeo },
                { label: "Local SEO services in New Zealand", href: routes.nzLocalSeo },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group flex items-center justify-between gap-3 border-b border-white/10 pb-3 font-semibold text-white hover:text-teal">
                    {l.label}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="process" labelledBy="process-title" tone="white">
        <SectionHeader id="process-title" eyebrow="Our tradie website process" title="From brief to a launch-ready site" />
        <div className="mt-12">
          <ProcessSteps
            steps={[
              {
                title: "Understand the business",
                body: "We start with your services, service areas, ideal customers, current website, sales process and the actions you want visitors to take.",
              },
              {
                title: "Plan the structure",
                body: "We map the core pages, navigation, service hierarchy, conversion paths and SEO considerations before design work begins.",
              },
              {
                title: "Build the page experience",
                body: "We create the page layouts and content structure around clarity, mobile usability, trust and action — not unnecessary visual complexity.",
              },
              {
                title: "Add tracking and SEO foundations",
                body: "We implement the agreed technical and on-page foundations, connect relevant tracking and check that important pages are accessible to search engines.",
              },
              {
                title: "QA and launch",
                body: "Before launch, we review key pages across devices, test forms and links, check important metadata and make sure the live site is ready for measurement and future improvement.",
              },
            ]}
          />
        </div>
      </Section>

      <Section id="scope" labelledBy="scope-title">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeader
              id="scope-title"
              eyebrow="Scope"
              title="What a project can include"
              intro={
                <p>
                  Scope depends on the selected package and agreed proposal. A tradie website project may include the
                  following when specified in the Statement of Work:
                </p>
              }
            />
            <CheckList
              className="mt-6 text-base"
              items={[
                "Website strategy and page planning",
                "Responsive page design and development",
                "Service-page architecture",
                "Conversion-focused page structure and calls to action",
                "On-page SEO foundations",
                "Internal linking and navigation planning",
                "Review, project and trust-signal sections",
                "Contact or quote forms",
                "Analytics and key conversion tracking",
                "Basic technical QA before launch",
                "Migration and redirect planning when replacing an existing site, where required",
              ]}
            />
            <p className="mt-6 text-base text-muted">
              We scope the work around what the business actually needs rather than forcing every project into the same
              template.
            </p>
          </div>
          <div>
            <h3>Website packages — an initial guide</h3>
            <div className="mt-6">
              <TierCards
                tiers={[
                  {
                    name: "Starter Website",
                    price: "NZ$1,400",
                    cadence: "one-time",
                    summary: (
                      <p>
                        Up to 5 pages. A lean responsive build with contact form and basic SEO-ready structure, subject
                        to a clear page and feature list.
                      </p>
                    ),
                  },
                  {
                    name: "Lead Generation Website",
                    price: "NZ$2,200",
                    cadence: "one-time",
                    summary: (
                      <p>
                        Up to 10 pages. More room for priority services, trust elements, quote journeys and foundational
                        launch/tracking checks defined in the proposal.
                      </p>
                    ),
                  },
                  {
                    name: "Custom Growth Website",
                    price: "from NZ$3,000",
                    cadence: "one-time",
                    summary: <p>Final pricing, custom features, milestones and revisions depend on the agreed scope.</p>,
                  },
                ]}
              />
            </div>
            <Callout tone="neutral" className="mt-6">
              <p>
                The package price is for the agreed website build—not unlimited copywriting, hosting/domain fees, premium
                plugins, photography, extensive custom integrations or ongoing monthly SEO. Any additional work is
                confirmed in writing before implementation.
              </p>
            </Callout>
          </div>
        </div>
      </Section>

      <Section id="why" labelledBy="why-title" tone="white">
        <SectionHeader id="why-title" eyebrow="Why Top Spot Studio" title="A founder-led SEO and web team" />
        <div className="mt-12">
          <NumberedCards
            columns={4}
            numbered={false}
            items={[
              {
                title: "A founder-led SEO and web team",
                icon: Users,
                body: (
                  <p>
                    Top Spot Studio is a two-person, founder-led SEO and web growth studio. Website strategy, SEO thinking
                    and technical implementation stay closely connected instead of being handed between disconnected
                    teams.
                  </p>
                ),
              },
              {
                title: "Built around service-business customer journeys",
                icon: Workflow,
                body: (
                  <p>
                    We focus on service businesses where a website has to create confidence quickly and make the next
                    action easy. That keeps the project grounded in commercial use, not design trends alone.
                  </p>
                ),
              },
              {
                title: "Clear scope and communication",
                icon: MessagesSquare,
                body: (
                  <p>
                    We explain what is being built, why it matters and what information we need from you. If something
                    is outside the agreed scope, we make that clear instead of hiding it behind vague package language.
                  </p>
                ),
              },
              {
                title: "No fake guarantees",
                icon: ShieldOff,
                body: (
                  <p>
                    A new website can create a stronger foundation for search and conversion, but it does not guarantee
                    rankings, leads or revenue. Outcomes depend on the market, offer, competition, traffic and how the
                    website is supported after launch.
                  </p>
                ),
              },
            ]}
          />
        </div>
        <Link href={routes.caseStudies} className="text-link mt-8 inline-block">
          View Our Case Studies
        </Link>
      </Section>

      <Section id="market" labelledBy="market-title">
        <EditorialSplit
          id="market-title"
          eyebrow="Our current market focus"
          title="Working remotely with New Zealand tradies and service businesses"
        >
          <p>
            New Zealand is Top Spot Studio’s first primary international market. We work remotely from Bangladesh and do
            not present ourselves as a New Zealand-based agency.
          </p>
          <p>
            For website projects, remote delivery works well because discovery, planning, design review, development,
            tracking and feedback can all be handled online with a clear process and agreed milestones.
          </p>
          <p>
            As the agency expands, this service can support tradies and service businesses in additional English-speaking
            markets without changing the core approach.
          </p>
        </EditorialSplit>
      </Section>

      <FaqSection items={faq} />

      <CtaBand title="Is your website helping customers choose you?" primary={projectCta} secondary={seoCta}>
        <p>
          If your site is unclear on mobile, hard to navigate or missing an obvious quote path, start with a website
          project conversation. We can scope the practical improvements needed.
        </p>
        <p>
          Tell us about your services, website goals, approximate page requirements and preferred launch timing. We will
          reply with suitable next steps for scoping, rather than promising an unrequested full review.
        </p>
      </CtaBand>
    </>
  );
}
