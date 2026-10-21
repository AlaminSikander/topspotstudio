import { card, cta, faq, img, items, link, md, type SeedPage } from "../helpers";

export const home: SeedPage = {
  title: "Homepage",
  path: "/",
  template: "home",
  seo: {
    metaTitle: "SEO & Web Growth for Service Businesses | Top Spot Studio",
    metaDescription: "Top Spot Studio helps service businesses grow through SEO, Local SEO and conversion-focused web design. Get a free visibility audit.",
    ogEyebrow: "SEO + Web Growth",
    ogHeadline: "SEO & Web Growth for Service Businesses",
  },
  structuredData: { pageType: "WebPage", breadcrumbs: true, faq: true },
  layout: [
    {
      blockType: "homeHero",
      badge: "SEO + Web Growth for Service Businesses",
      title: "SEO & Web Growth for Service Businesses",
      highlight: "Service Businesses",
      lead: "Top Spot Studio helps service businesses improve their visibility in search, build better-performing websites, and turn more local searches into qualified enquiries.",
      body: "From SEO strategy and Google visibility to websites designed around real customer actions, we focus on the work that helps your business get found, build trust, and create more opportunities to grow.",
      primary: cta("Get a Free SEO Audit", "/free-seo-audit/"),
      secondary: cta("See Our Work", "/case-studies/"),
      trust: items(["Founder-led", "SEO + Web under one roof", "Working remotely with businesses in New Zealand and beyond"]),
      image: img("roofer-working-on-roof", "Roofer in a hard hat working on a pitched roof", "50% 40%"),
      founderChip: { initialsA: "AK", initialsB: "AS", title: "Founder-led", subtitle: "Strategy & build, one team" },
      searchChip: "roofer near me",
      marqueeLabel: "Services we work across",
      marquee: items(["SEO", "Local SEO", "Web Design", "Technical SEO", "On-page SEO", "Google Business Profile", "Service-page strategy", "Content planning", "Conversion tracking", "Website QA"]),
    },
    {
      blockType: "section",
      anchorId: "problem",
      tone: "white",
      layout: "split",
      header: {
        eyebrow: "The real problem",
        title: "Getting found is only the first step",
        highlight: "first step",
        intro: md(`{display} More visibility is useful only when it leads to something meaningful.

Your business may have a website and Google presence, yet still miss enquiries because priority services are hard to find, local relevance is weak, or the next action is unclear.

You may be losing opportunities because your important services are difficult to find in search, your local visibility is weak, your website does not clearly communicate why customers should choose you, or visitors simply do not know what to do next.

We bring SEO, Local SEO and website experience together so the right pages are easier to discover and act on.`),
      },
      split: { mediaType: "visual", visual: "SearchJourney", align: "center" },
      content: [],
    },
    {
      blockType: "section",
      anchorId: "services",
      tone: "base",
      layout: "stacked",
      header: {
        eyebrow: "What we help with",
        title: "Practical SEO and web solutions built around growth",
        intro: md("We keep our services focused. No oversized digital marketing packages filled with work your business does not need."),
        contentSpacing: "14",
      },
      content: [
        {
          blockType: "serviceCards",
          spacing: "14",
          items: [
            card(
              "SEO",
              "Search",
              `Improve how your business is discovered through search with a strategy built around your services, customers and commercial goals.

{muted} Our SEO work can include keyword research, competitor analysis, technical SEO, on-page optimization, service-page strategy, internal linking, content planning and performance tracking.`,
              cta("Explore SEO Services", "/markets/new-zealand/seo/"),
            ),
            card(
              "Local SEO",
              "MapPin",
              `Strengthen your visibility when customers search for businesses and services in the areas you serve.

{muted} We work across Google Business Profile optimization, local keyword targeting, service and location relevance, reviews, citations, website optimization and local search tracking.`,
              cta("Explore Local SEO", "/markets/new-zealand/local-seo/"),
            ),
            card(
              "Web Design",
              "LayoutTemplate",
              `Build a website that does more than look professional.

{muted} We create conversion-focused websites for service businesses with clear service journeys, mobile usability, strong calls to action and an SEO-ready structure from the start.`,
              cta("Explore Web Design", "/industries/web-design-for-tradies/"),
            ),
          ],
          chips: items(["Keyword research", "Technical SEO", "On-page", "Service pages", "Internal linking", "Tracking"]),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "who-we-help",
      tone: "white",
      layout: "stacked",
      header: {
        headingId: "who-title",
        eyebrow: "Who we help",
        title: "Built for businesses that win customers through trust and visibility",
        intro: md("Top Spot Studio is designed around the needs of service businesses — companies where being visible at the right moment can turn a search into a call, quote request or enquiry."),
        contentSpacing: "14",
      },
      content: [
        {
          blockType: "imageCards",
          spacing: "14",
          items: [
            {
              title: "Tradies",
              image: img("electrician-switchboard", "Electrician working inside an open switchboard with a cordless drill"),
              body: "Customers often search when they already need a service. We help tradies build stronger search visibility and make it easier for potential customers to take the next step.",
              cta: cta("SEO for Tradies", "/industries/seo-for-tradies/"),
            },
            {
              title: "Roofing Companies",
              tag: "Initial specialist focus",
              image: img("roof-tiles-installation", "Roof tiles being laid in rows on timber battens"),
              body: "Roofing is our initial specialist focus. From roof repairs and reroofing to location-based search demand, we help roofing businesses create stronger visibility around the services customers are actively looking for.",
              cta: cta("SEO for Roofing Companies", "/industries/roofing-seo/"),
            },
            {
              title: "Service Businesses",
              image: img("landscaper-trimming-lawn", "Landscaper in safety gear trimming grass along a park path"),
              body: "Our wider approach can support other service-led businesses where local search, trust and a strong website directly influence customer acquisition. As Top Spot Studio grows, we will expand into additional industries where our systems and experience can create genuine value.",
            },
          ],
        },
        {
          blockType: "linkPills",
          spacing: "14",
          title: "Start with the service that fits your goal",
          links: [
            { label: "SEO Services NZ", link: link("/markets/new-zealand/seo/") },
            { label: "Local SEO NZ", link: link("/markets/new-zealand/local-seo/") },
            { label: "SEO for Tradies", link: link("/industries/seo-for-tradies/") },
            { label: "Roofing SEO", link: link("/industries/roofing-seo/") },
            { label: "Web Design for Tradies", link: link("/industries/web-design-for-tradies/") },
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "market",
      tone: "base",
      layout: "split",
      header: {
        eyebrow: "Current market focus",
        title: "Helping New Zealand businesses compete in search",
        intro: md(`{emphasis} New Zealand is our first core international market.

We work remotely with businesses across New Zealand, helping them improve organic visibility, strengthen local search performance and build websites that support customer acquisition.

Our location does not change the way we approach the work. Research, strategy, implementation, tracking and communication are handled directly by the people working on your project.`),
      },
      split: { mediaType: "visual", visual: "RemoteDeliveryVisual", reverse: true, align: "center" },
      content: [{ blockType: "textLink", label: "Explore SEO Services for New Zealand Businesses", link: link("/markets/new-zealand/seo/"), style: "arrow", spacing: "7" }],
    },
    {
      blockType: "section",
      anchorId: "why",
      tone: "navy",
      layout: "columns",
      header: {
        eyebrow: "Why Top Spot Studio",
        title: "A smaller team. A more focused way of working.",
        intro: md(`{emphasis} Top Spot Studio is a two-person, founder-led SEO and web studio.

That means you are not passed through layers of salespeople, account managers and disconnected delivery teams. The people discussing your strategy are also closely involved in the work.`),
      },
      columns: { ratio: "0.9-1.1", stickyFirst: true, gap: "wide", valign: "start" },
      content: [
        { blockType: "quote", variant: "compact", quote: "No unnecessary services. No unrealistic promises.", caption: "From the Top Spot Studio founders’ story", spacing: "10" },
        { blockType: "textLink", label: "Meet our founders", link: link("/about/"), style: "arrowLight", spacing: "8" },
      ],
      columnB: [
        {
          blockType: "numberedCards",
          columns: "2",
          numbered: false,
          items: [
            card("Strategy before activity", "Target", "We do not start with a generic checklist. We first understand your business, services, market, competition and current search visibility. Then we decide what deserves attention."),
            card(
              "SEO and websites work together",
              "Gauge",
              "Search visibility matters most when the page gives the visitor a reason to enquire. That is why we consider the search journey and the enquiry journey together. SEO and web decisions are coordinated, with the scope agreed before work starts.",
            ),
            card(
              "Clear communication",
              "MessagesSquare",
              "You should understand what is being worked on and why. Our reporting focuses on meaningful progress — visibility, traffic, enquiries, completed work and next priorities — rather than overwhelming you with SEO jargon.",
            ),
            card(
              "No ranking guarantees",
              "ShieldOff",
              "SEO involves competition, algorithms and factors no agency fully controls. We do not promise a guaranteed #1 position. We focus on making strong, measurable improvements based on research, execution and continuous refinement.",
            ),
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "process",
      tone: "base",
      layout: "stacked",
      header: {
        eyebrow: "How we work",
        title: "A straightforward process from problem to progress",
        action: cta("Start With a Free Audit", "/free-seo-audit/"),
        actionLocation: "process",
        contentSpacing: "16",
      },
      content: [
        {
          blockType: "processSteps",
          spacing: "16",
          steps: [
            { title: "Understand", body: "We learn about your business, services, customers, current marketing and growth priorities." },
            { title: "Audit", body: "We identify the biggest gaps across search visibility, website performance, competitors and conversion opportunities." },
            { title: "Prioritise", body: "Instead of trying to fix everything at once, we build a focused plan around the work most likely to move the business forward." },
            { title: "Implement", body: "We carry out agreed SEO or website work against the prioritised plan, rather than repeating the same general checklist." },
            { title: "Measure and improve", body: "We monitor performance, identify what is changing and adjust priorities based on real data." },
          ],
        },
      ],
    },
    {
      blockType: "proof",
      eyebrow: "Experience & proof",
      title: "Experience backed by real SEO results",
      intro: md(`Top Spot Studio is a new agency. The results below come from SEO engagements undertaken by people behind the studio before its launch, not from Top Spot Studio client engagements.

The figures shown below relate to an anonymised Malaysian influencer marketing agency, not to a New Zealand roofing client. [See the anonymised Malaysian Influencer Marketing Agency SEO case study](/case-studies/influencer-marketing-agency-seo-growth/) for the reporting period and methodology.`),
      noteTitle: "Proof note",
      note: md("Search Console impressions increased by 88.0% in the same documented comparison. These figures describe one historical project; they are not a forecast or an agency performance guarantee."),
      ctaLabel: "View SEO Case Studies",
    },
    {
      blockType: "ctaBand",
      anchorId: "audit",
      tone: "tint",
      eyebrow: "Free SEO Audit",
      title: "Not sure what is holding your visibility back?",
      primary: cta("Get My Free SEO Audit", "/free-seo-audit/"),
      location: "audit_section",
      aside: {
        title: "Your audit may look at:",
        items: items(["Website search visibility", "Local presence", "Important service pages", "Google Business Profile opportunities", "Technical issues", "Competitors and conversion gaps"]),
      },
      body: md(`{emphasis} Start with a focused audit.

We will review your website and search presence and identify a small number of high-impact issues or opportunities worth looking at first.

No 50-page automated report. No pressure to buy a package.

Just a clearer picture of where your business currently stands and what may be worth improving.

{small} Tell us about your business and we’ll review where the strongest opportunities may be.`),
    },
    faq([
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
    ]),
    {
      blockType: "ctaBand",
      tone: "navy",
      title: "Ready to see where your biggest opportunities are?",
      primary: cta("Get a Free SEO Audit", "/free-seo-audit/"),
      secondary: cta("Contact Top Spot Studio", "/contact/"),
      location: "final_cta",
      body: md(`You do not need another generic marketing package.

You need to know what is stopping the right customers from finding your business — and what is worth fixing first.

{emphasis} Start with a Free SEO Audit

We’ll review your current visibility and highlight the opportunities that deserve attention.`),
    },
  ],
};
