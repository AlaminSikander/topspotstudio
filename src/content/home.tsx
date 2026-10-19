import { Gauge, LayoutTemplate, MapPin, MessagesSquare, Search, ShieldOff, Target } from "lucide-react";
import type { CardItem } from "@/components/sections/Blocks";
import type { FaqItem } from "@/components/sections/FaqList";
import { routes } from "@/lib/site";

export const homeMeta = {
  title: "SEO & Web Growth for Service Businesses | Top Spot Studio",
  description:
    "Top Spot Studio helps service businesses grow through SEO, Local SEO and conversion-focused web design. Get a free visibility audit.",
};

export const homeServices: CardItem[] = [
  {
    title: "SEO",
    icon: Search,
    body: (
      <>
        <p>
          Improve how your business is discovered through search with a strategy built around your services,
          customers and commercial goals.
        </p>
        <p className="text-muted">
          Our SEO work can include keyword research, competitor analysis, technical SEO, on-page optimization,
          service-page strategy, internal linking, content planning and performance tracking.
        </p>
      </>
    ),
    cta: { label: "Explore SEO Services", href: routes.nzSeo },
  },
  {
    title: "Local SEO",
    icon: MapPin,
    body: (
      <>
        <p>Strengthen your visibility when customers search for businesses and services in the areas you serve.</p>
        <p className="text-muted">
          We work across Google Business Profile optimization, local keyword targeting, service and location
          relevance, reviews, citations, website optimization and local search tracking.
        </p>
      </>
    ),
    cta: { label: "Explore Local SEO", href: routes.nzLocalSeo },
  },
  {
    title: "Web Design",
    icon: LayoutTemplate,
    body: (
      <>
        <p>Build a website that does more than look professional.</p>
        <p className="text-muted">
          We create conversion-focused websites for service businesses with clear service journeys, mobile
          usability, strong calls to action and an SEO-ready structure from the start.
        </p>
      </>
    ),
    cta: { label: "Explore Web Design", href: routes.webDesign },
  },
];

export const homeWhy: CardItem[] = [
  {
    title: "Strategy before activity",
    icon: Target,
    body: (
      <p>
        We do not start with a generic checklist. We first understand your business, services, market, competition
        and current search visibility. Then we decide what deserves attention.
      </p>
    ),
  },
  {
    title: "SEO and websites work together",
    icon: Gauge,
    body: (
      <p>
        Search visibility matters most when the page gives the visitor a reason to enquire. That is why we consider
        the search journey and the enquiry journey together. SEO and web decisions are coordinated, with the scope
        agreed before work starts.
      </p>
    ),
  },
  {
    title: "Clear communication",
    icon: MessagesSquare,
    body: (
      <p>
        You should understand what is being worked on and why. Our reporting focuses on meaningful progress —
        visibility, traffic, enquiries, completed work and next priorities — rather than overwhelming you with SEO
        jargon.
      </p>
    ),
  },
  {
    title: "No ranking guarantees",
    icon: ShieldOff,
    body: (
      <p>
        SEO involves competition, algorithms and factors no agency fully controls. We do not promise a guaranteed #1
        position. We focus on making strong, measurable improvements based on research, execution and continuous
        refinement.
      </p>
    ),
  },
];

export const homeProcess = [
  { title: "Understand", body: "We learn about your business, services, customers, current marketing and growth priorities." },
  {
    title: "Audit",
    body: "We identify the biggest gaps across search visibility, website performance, competitors and conversion opportunities.",
  },
  {
    title: "Prioritise",
    body: "Instead of trying to fix everything at once, we build a focused plan around the work most likely to move the business forward.",
  },
  {
    title: "Implement",
    body: "We carry out agreed SEO or website work against the prioritised plan, rather than repeating the same general checklist.",
  },
  {
    title: "Measure and improve",
    body: "We monitor performance, identify what is changing and adjust priorities based on real data.",
  },
];

export const homeFaq: FaqItem[] = [
  {
    q: "Where is Top Spot Studio based?",
    a: "Top Spot Studio is based in Bangladesh and works remotely with businesses in international markets. New Zealand is our first primary target market.\nWe are transparent about where we operate and do not present ourselves as a New Zealand-based company.",
  },
  {
    q: "Do you only work with roofing companies?",
    a: "No.\nRoofing is our initial specialist niche because it gives us a focused market for outreach, research and service development.\nTop Spot Studio is ultimately built to work with a wider range of service businesses and tradies.",
  },
  {
    q: "What services does Top Spot Studio provide?",
    a: "Our core services are SEO, Local SEO and conversion-focused web design.\nDepending on the project, this can include keyword research, technical SEO, on-page optimization, Google Business Profile work, service-page strategy, content planning, website improvements, tracking and reporting.",
  },
  {
    q: "Can you guarantee first-page or #1 rankings?",
    a: "No credible SEO provider can guarantee a specific organic ranking.\nWe can control the quality of the research, strategy and implementation. Search results themselves remain outside any agency's full control.",
  },
  {
    q: "Do you offer SEO and website design together?",
    a: "Yes.\nThat is one of the main advantages of our model.\nIf SEO identifies a website problem that is limiting performance or conversions, we can often address both the search and website side instead of splitting the project across multiple providers.",
  },
  {
    q: "How do we get started?",
    a: "The easiest place to start is with a free audit.\nWe will take an initial look at your website and visibility, identify the most important opportunities, and determine whether Top Spot Studio is a good fit for the work.",
  },
];

export const serviceFitLinks = [
  { label: "SEO Services NZ", href: routes.nzSeo },
  { label: "Local SEO NZ", href: routes.nzLocalSeo },
  { label: "SEO for Tradies", href: routes.tradies },
  { label: "Roofing SEO", href: routes.roofing },
  { label: "Web Design for Tradies", href: routes.webDesign },
];