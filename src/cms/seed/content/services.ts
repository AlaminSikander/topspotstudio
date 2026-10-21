import { card, crumb, cta, faq, img, items, link, md, type SeedPage } from "../helpers";

const AUDIT = "/free-seo-audit/";

export const nzSeo: SeedPage = {
  title: "SEO Services NZ",
  path: "/markets/new-zealand/seo/",
  template: "service",
  breadcrumbs: [crumb("Home", "/"), crumb("SEO Services NZ", "/markets/new-zealand/seo/")],
  seo: {
    metaTitle: "SEO Services NZ for Service Businesses | Top Spot Studio",
    metaDescription: "Grow your New Zealand service business with practical SEO focused on visibility, stronger website performance and qualified enquiries. Get a free audit.",
    ogEyebrow: "SEO Services · New Zealand",
    ogHeadline: "SEO Services for New Zealand Service Businesses",
  },
  structuredData: {
    pageType: "WebPage",
    breadcrumbs: true,
    faq: true,
    service: { enabled: true, name: "SEO Services for New Zealand Service Businesses", serviceType: "Search engine optimisation" },
  },
  layout: [
    {
      blockType: "pageHero",
      showBreadcrumbs: true,
      eyebrow: "SEO services · New Zealand",
      title: "SEO Services for New Zealand Service Businesses",
      highlight: "Service Businesses",
      lead: md("Build stronger search visibility, improve the pages that matter most to your customers, and turn more of that visibility into qualified enquiries."),
      body: md(
        "Top Spot Studio provides practical SEO for New Zealand service businesses that want a clearer path from search to enquiry. We combine research, technical improvements, on-page optimisation, content strategy and website thinking so your SEO work supports the wider business—not just a list of rankings.",
      ),
      primary: cta("Get a Free SEO Audit", AUDIT),
      secondary: cta("View Case Studies", "/case-studies/"),
      trust: items(["Founder-led", "Strategy + implementation", "Remote support for New Zealand businesses"]),
      mediaType: "visual",
      visual: "SeoScopeDiagram",
      location: "hero",
    },
    {
      blockType: "section",
      anchorId: "approach",
      tone: "white",
      layout: "editorial",
      header: { title: "SEO should support the business, not just the report" },
      content: [
        {
          blockType: "richText",
          content: md(`{emphasis} Search visibility matters, but rankings alone do not pay the bills.

A useful SEO strategy connects what people search for with the services you actually want to sell, the locations you serve, the pages on your website and the actions you want visitors to take.

If your website is difficult to crawl, your service pages are weak, your content does not match search intent, or your best opportunities are hidden behind the wrong priorities, more activity will not necessarily create better results.

Our job is to identify where the real gaps are, prioritise them, and improve the parts of your search presence that can make the biggest difference.`),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "services",
      tone: "base",
      layout: "stacked",
      header: {
        eyebrow: "Scope",
        title: "What our SEO services can include",
        intro: md(
          "SEO services are scoped around the business and selected package. Work falls into three connected areas: research and planning; website and content implementation; measurement and refinement. Specific monthly deliverables depend on the agreed plan.",
        ),
      },
      content: [
        {
          blockType: "featureList",
          columns: "2",
          items: [
            card("SEO Strategy & Keyword Research", "Search", "We research the terms your potential customers use, compare them against your services and competitors, and build a keyword-to-page plan around commercial value rather than search volume alone."),
            card("Technical SEO", "Wrench", "We review crawlability, indexation, site structure, redirects, duplicate issues, mobile performance, Core Web Vitals and other technical barriers that can limit search performance."),
            card("On-Page SEO", "FileText", "We improve titles, headings, page structure, copy, internal links and topical relevance so important pages better match what searchers and search engines expect."),
            card("Service Page Strategy", "Target", "For service businesses, the right service pages often matter more than publishing another generic blog. We map services to the right pages and strengthen the pages closest to revenue."),
            card(
              "Local SEO Support",
              "MapPin",
              "Where local search matters, we connect website SEO with Google Business Profile, reviews, location relevance, citations and local visibility. See our dedicated [local SEO for New Zealand businesses](/markets/new-zealand/local-seo/) for the full service.",
            ),
            card("Content Strategy", "PenLine", "We identify useful supporting topics that can build topical relevance, answer customer questions and strengthen commercial pages through internal linking."),
            card("Internal Linking", "Link2", "We improve how authority and context flow through the website, helping users and search engines reach the pages that matter most."),
            card("Measurement & Reporting", "BarChart3", "We use tools such as Google Analytics and Search Console to track visibility, organic performance and meaningful conversions where tracking is available."),
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "who",
      tone: "white",
      layout: "stacked",
      header: {
        eyebrow: "Who we work best with",
        title: "Built around service-led businesses",
        intro: md("Top Spot Studio is built around service-led businesses where search visibility, trust and a strong website can directly influence customer acquisition."),
      },
      content: [
        {
          blockType: "numberedCards",
          columns: "3",
          numbered: true,
          items: [
            card(
              "Tradies & Trade Businesses",
              "Wrench",
              "Roofers, builders, plumbers, electricians and other trade businesses often compete in high-intent local searches. We help connect SEO with service pages, local visibility and enquiry-focused websites. Explore [SEO for tradies](/industries/seo-for-tradies/) or our approach to [SEO for roofing companies](/industries/roofing-seo/).",
            ),
            card("Local Service Businesses", "MapPin", "Businesses that depend on calls, bookings, quote requests or local enquiries can benefit from an SEO strategy built around real service demand and local search behaviour."),
            card(
              "Growing Small & Medium Businesses",
              "Building2",
              "If your business already has a functioning offer and wants to turn search into a more dependable acquisition channel, we can help identify the next SEO priorities without forcing you into unnecessary work.",
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
        eyebrow: "Our SEO process",
        title: "A clear order for strategy, implementation and measurement",
        intro: md("SEO is easier to manage when the work follows a clear order. Our process is designed to keep strategy, implementation and measurement connected."),
      },
      content: [
        {
          blockType: "processSteps",
          steps: [
            { title: "Understand the Business", body: "We start with your services, target customers, locations, current marketing, commercial priorities and what success should mean for the business." },
            { title: "Audit the Current Position", body: "We review the website, search visibility, competitors, important pages, technical setup and available analytics to identify the biggest gaps." },
            {
              title: "Prioritise the Work",
              body: "Not every issue deserves equal attention. We organise recommendations by likely business impact, effort and dependency so the highest-value work happens first.",
            },
            { title: "Implement & Improve", body: "We carry out or coordinate agreed SEO improvements across technical, on-page, content and local-search areas." },
            { title: "Measure & Refine", body: "We review performance, identify what is changing and update priorities based on real data rather than assumptions." },
          ],
        },
        {
          blockType: "card",
          variant: "panel",
          spacing: "16",
          title: "What your SEO engagement looks like",
          bodyColumns: true,
          body: md(`Month 1 focuses on audit, technical and keyword baselines, competitor and page research, tracking checks, and a prioritised 90-day roadmap. Priority implementation can begin during setup; the standard recurring page/content production cadence starts in Month 2.

From Month 2, agreed page optimisation and new content outputs are delivered alongside priority-driven technical, Local SEO and measurement work within the selected package. The monthly report identifies what was completed and what comes next.`),
          extra: [
            {
              blockType: "tierCards",
              tiers: [
                { name: "SEO Essentials", price: "NZ$450", cadence: "/month", summary: "Up to 2 existing pages optimised; no new content." },
                { name: "Local Growth", price: "NZ$700", cadence: "/month", summary: "Up to 4 existing pages optimised and 2 new standard SEO content pieces." },
                { name: "SEO Growth Pro", price: "NZ$950", cadence: "/month", summary: "Up to 6 existing pages optimised and 4 new standard SEO content pieces." },
              ],
              note: "These are Month 2+ monthly caps, not universal inclusions across all tiers.",
            },
            {
              blockType: "callout",
              tone: "neutral",
              body: md(
                "One existing-page optimisation is not necessarily a full rewrite. Standard new content can be an agreed article or service/location page; custom development, premium media and extensive original research require separate scope. For a full quote, we confirm priorities, access and boundaries in the proposal.",
              ),
            },
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "why",
      tone: "navy",
      layout: "stacked",
      header: {
        eyebrow: "Why work with Top Spot Studio?",
        title: "Small, founder-led and close to the work",
        intro: md("Top Spot Studio is a small, founder-led SEO and web studio. That keeps the work close to the people responsible for the strategy and implementation."),
      },
      content: [
        {
          blockType: "numberedCards",
          columns: "3",
          numbered: false,
          items: [
            card("Direct Access to the People Doing the Work", "Users", "You are not passed through multiple layers of account management before reaching someone who understands the project."),
            card("Strategy Before Activity", "FileSearch", "We do not measure value by how many tasks we can add to a monthly report. The work starts with the problem, the opportunity and the likely business impact."),
            card(
              "SEO + Web Thinking",
              "Gauge",
              "SEO and web performance are connected, but a larger redesign, custom feature or substantial development project is quoted separately where it falls outside the SEO retainer. See [web design for tradies](/industries/web-design-for-tradies/).",
            ),
            card("Transparent Communication", "MessagesSquare", "We explain what is being worked on, why it matters, what has changed and what should happen next—in language a business owner can actually use."),
            card(
              "No Guaranteed Rankings",
              "ShieldOff",
              "No agency controls Google. We will not promise a guaranteed #1 position or pretend there is a shortcut. We focus on disciplined research, white-hat implementation and measurable improvement.",
            ),
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "remote",
      tone: "base",
      layout: "split",
      header: {
        title: "SEO for New Zealand businesses, delivered remotely",
        intro: md(`{emphasis} New Zealand is Top Spot Studio’s first core international market.

We are based in Bangladesh and work remotely with New Zealand businesses. That means our positioning is transparent: we do not claim a New Zealand office, local address or physical presence that does not exist.

The SEO work itself is built around the New Zealand market—local search language, competitors, service demand, SERP behaviour and the commercial context of the businesses we serve.

Communication, reporting, research and implementation are handled directly by the people working on your project.`),
      },
      split: { mediaType: "visual", visual: "RemoteDeliveryVisual", align: "center" },
      content: [],
    },
    {
      blockType: "proof",
      eyebrow: "Experience & proof",
      title: "Experience backed by real SEO results",
      intro: md("Top Spot Studio is a new agency, but the people behind it have hands-on experience across SEO strategy, technical fixes, content, on-page optimisation, Local SEO, analytics and client delivery."),
      noteTitle: "Proof note",
      note: md("These are selected results from SEO work led or managed by the people behind Top Spot Studio before the agency was launched. Results vary by business, market, competition and starting point."),
      ctaLabel: "View SEO Case Studies",
    },
    {
      blockType: "section",
      anchorId: "measure",
      tone: "base",
      layout: "editorial",
      header: { eyebrow: "What we measure", title: "Reporting that answers whether the work is helping" },
      content: [
        {
          blockType: "richText",
          content: md(`Good SEO reporting should help answer whether the work is improving visibility and creating better opportunities for the business.

{emphasis} Recommended reporting focus

::checklist
- Organic clicks and search visibility from Google Search Console
- Performance of priority service and landing pages
- Qualified form submissions, calls or other tracked enquiries where measurement is available
- Local visibility and Google Business Profile performance when Local SEO is part of the scope
- Technical health and indexation issues that affect priority pages
- Work completed, what changed, and the next priorities`),
        },
      ],
    },
    {
      blockType: "ctaBand",
      tone: "tint",
      eyebrow: "Free SEO Audit",
      title: "Not sure where to start?",
      primary: cta("Get a Free SEO Audit", AUDIT),
      location: "audit_section",
      body: md(`We will review your current search presence and website, then highlight a small number of issues or opportunities that deserve attention first.

No oversized automated report. No pressure to buy a package. Just a clearer view of where your SEO stands and what may be worth improving.`),
    },
    faq([
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
    ]),
    {
      blockType: "ctaBand",
      tone: "navy",
      title: "Ready to find out what is limiting your search visibility?",
      primary: cta("Get a Free SEO Audit", AUDIT),
      secondary: cta("Contact Top Spot Studio", "/contact/"),
      location: "final_cta",
      body: md("Start with a focused audit and get a clearer view of the SEO opportunities worth prioritising first."),
    },
  ],
};

export const nzLocalSeo: SeedPage = {
  title: "Local SEO NZ",
  path: "/markets/new-zealand/local-seo/",
  template: "service",
  breadcrumbs: [crumb("Home", "/"), crumb("Local SEO NZ", "/markets/new-zealand/local-seo/")],
  seo: {
    metaTitle: "Local SEO NZ for Service Businesses | Top Spot Studio",
    metaDescription: "Improve Google Maps and local search visibility with Local SEO services for New Zealand service businesses. Start with a free SEO audit.",
    ogEyebrow: "Local SEO · New Zealand",
    ogHeadline: "Local SEO Services for New Zealand Businesses",
  },
  structuredData: {
    pageType: "WebPage",
    breadcrumbs: true,
    faq: true,
    service: { enabled: true, name: "Local SEO Services for New Zealand Businesses", serviceType: "Local search engine optimisation" },
  },
  layout: [
    {
      blockType: "pageHero",
      showBreadcrumbs: true,
      eyebrow: "Local SEO · New Zealand",
      title: "Local SEO Services for New Zealand Businesses",
      highlight: "New Zealand Businesses",
      lead: md("Be easier to find when nearby customers search for the services you provide — and make it easier for those searches to turn into calls, quote requests and enquiries."),
      body: md(
        "Top Spot Studio helps New Zealand service businesses strengthen their local search presence across Google Business Profile, local service pages, reviews, citations, on-page SEO and performance tracking.",
      ),
      primary: cta("Get a Free SEO Audit", AUDIT),
      secondary: cta("View Case Studies", "/case-studies/"),
      trust: items(["Founder-led", "Local SEO + website expertise", "Remote service for New Zealand businesses"]),
      mediaType: "image",
      image: img("customer-searching-on-phone", "Person on a sofa searching on a smartphone", "60% 50%", "4/3"),
      mediaFrame: "default",
      location: "hero",
    },
    {
      blockType: "section",
      anchorId: "intent",
      tone: "white",
      layout: "editorial",
      header: { title: "Local search is where high-intent customers often start" },
      content: [
        {
          blockType: "richText",
          content: md(`When someone searches for a roofer, plumber, electrician, clinic, consultant or another service nearby, they are often much closer to taking action than someone casually browsing a general topic.

But local visibility is not controlled by one setting or one keyword. Google looks at how relevant a business is to the search, how close it is to the searcher, and how prominent or trusted it appears across the web. Your Google Business Profile matters, but so do your website, reviews, service pages, business information and local authority.

Our role is to connect those pieces into one practical Local SEO strategy so your business has a stronger chance of appearing when the right customers are looking. Where broader organic visibility matters too, see our [SEO services for New Zealand businesses](/markets/new-zealand/seo/).`),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "services",
      tone: "base",
      layout: "stacked",
      header: {
        eyebrow: "Scope",
        title: "What our Local SEO services can include",
        intro: md(
          "Every Local SEO project is scoped around the business, its service areas and its current visibility. We prioritise the work that matters instead of forcing every client through the same checklist.",
        ),
      },
      content: [
        {
          blockType: "featureList",
          columns: "2",
          items: [
            card(
              "Google Business Profile Optimisation",
              "Store",
              "We review your profile structure, primary and secondary categories, services, business information, photos, website links and other relevant fields. The goal is a complete, accurate profile that clearly reflects what the business actually offers.",
            ),
            card(
              "Local Keyword & Service Mapping",
              "MapPinned",
              "We research how customers search for your services in the areas you serve, then map those searches to the right pages. This helps prevent one generic page from trying to rank for every service and every location.",
            ),
            card(
              "Service & Location Page Optimisation",
              "FileText",
              "We improve the pages that support local discovery with clearer titles, headings, copy, internal links, service relevance, trust signals and conversion paths. New location pages are only recommended where there is genuine business value and enough unique information to justify them.",
            ),
            card(
              "Reviews & Reputation Support",
              "Star",
              "Reviews influence trust and local prominence. We help you create a practical review-request process, improve how reviews are responded to, and use genuine customer feedback as a stronger trust signal across your local presence.",
            ),
            card(
              "NAP & Citation Consistency",
              "ListChecks",
              "Your business name, address and phone information should be accurate and consistent across important directories and platforms. We identify priority listings, correct meaningful inconsistencies and avoid low-value directory spam.",
            ),
            card(
              "Local On-Page & Technical SEO",
              "Wrench",
              "Local rankings still depend on a website Google can crawl, understand and trust. We review indexation, redirects, page structure, mobile usability, internal linking, duplicate issues and other technical factors that may hold important local pages back.",
            ),
            card(
              "Local Authority & Link Opportunities",
              "Link2",
              "Where appropriate, we identify relevant local, industry and relationship-based link opportunities that can strengthen prominence. We focus on relevance and legitimacy rather than bulk link building.",
            ),
            card(
              "Tracking & Reporting",
              "BarChart3",
              "We connect Local SEO activity to measurable outcomes. Depending on the project, this can include Google Search Console, GA4, key form or call actions, keyword visibility and Google Business Profile performance.",
            ),
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "how",
      tone: "white",
      layout: "split",
      header: {
        eyebrow: "How Local SEO works",
        title: "Relevance, distance and prominence",
        intro: md(`Google describes local results around three broad factors: relevance, distance and prominence. You cannot control every part of that equation, but you can improve the signals that tell Google what your business does, where it operates and why it should be trusted.

::dl
- Relevance — How closely your business profile and website match what the customer is searching for.
- Distance — How close the business is to the location used in the search. This is largely outside an agency’s control.
- Prominence — How established and trusted the business appears through reviews, links, mentions, website quality and broader reputation.

This is why Local SEO is more than changing a few Google Business Profile fields. Strong local visibility usually comes from the profile, website, reputation and authority working together.`),
      },
      split: { mediaType: "visual", visual: "LocalSignalsDiagram", align: "start" },
      content: [
        {
          blockType: "callout",
          title: "Example: Connecting a real trade service to a real service area",
          tone: "teal",
          spacing: "8",
          body: md(`*Illustrative example only:* A roofing company that genuinely serves Hamilton and parts of Waikato could explain its roof-repair service on a useful service page, show the actual areas it serves, and connect the website to its eligible Google Business Profile. The profile categories and address/service-area details must reflect the real business—not an invented location.

A separate area page should only be created where the company has genuinely relevant, distinctive information for that place. Repeating the same text across dozens of towns is not a Local SEO strategy.`),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "who",
      tone: "base",
      layout: "stacked",
      header: {
        eyebrow: "Who we help",
        title: "For businesses where location shapes who becomes a customer",
        intro: md("Our Local SEO service is designed for businesses where location and service area influence who becomes a customer."),
      },
      content: [
        {
          blockType: "numberedCards",
          columns: "3",
          numbered: true,
          items: [
            card("Tradies & Home Service Businesses", "Wrench", "Roofers, plumbers, electricians, builders, landscapers and other trade businesses that rely on local calls, quote requests and service-area searches."),
            card("Clinics & Appointment-Based Businesses", "CalendarCheck", "Businesses that need customers to find a nearby location, understand the service and feel confident enough to book or enquire."),
            card("Professional & Local Service Providers", "Briefcase", "Consultants and other service businesses competing for location-relevant searches where trust and website quality matter."),
          ],
        },
        {
          blockType: "callout",
          title: "Current specialist focus",
          tone: "teal",
          spacing: "8",
          body: md(
            "Top Spot Studio is initially building deeper systems and outreach around New Zealand tradies, with roofing as the first niche focus. Read more about [SEO for tradies](/industries/seo-for-tradies/) and our [roofing SEO](/industries/roofing-seo/) approach.",
          ),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "process",
      tone: "white",
      layout: "stacked",
      header: { eyebrow: "Our Local SEO process", title: "From local visibility audit to measured progress" },
      content: [
        {
          blockType: "processSteps",
          steps: [
            { title: "Understand the Business", body: "We learn which services matter most, which areas you actually serve, how enquiries are generated today and what success should look like." },
            { title: "Audit Local Visibility", body: "We review Google Business Profile, search visibility, website structure, service pages, reviews, citations, competitors and technical issues." },
            { title: "Build the Priority Plan", body: "We separate high-impact fixes from lower-priority tasks and create a roadmap based on the business, not on a generic monthly activity list." },
            {
              title: "Implement the Work",
              body: "We optimise the profile and website, strengthen local relevance, improve important pages and work through reputation, citation and authority opportunities where appropriate.",
            },
            { title: "Measure, Learn and Refine", body: "We track how visibility and enquiries change, review what is working and update priorities as the data becomes clearer." },
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "measure",
      tone: "base",
      layout: "editorial",
      header: { eyebrow: "What we measure", title: "Reporting built around business progress" },
      content: [
        {
          blockType: "richText",
          content: md(`Local SEO reporting should help you understand business progress, not bury you in screenshots and ranking grids.

::checklist
- Local and organic search visibility for commercially important services
- Google Business Profile performance where relevant
- Organic clicks and landing-page performance
- Calls, forms, quote requests or other tracked enquiry actions
- Review growth and reputation activity
- Completed work, current priorities and next actions

{smallMuted} Rankings are useful context, but we do not treat a single keyword position as the only measure of success.`),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "why",
      tone: "navy",
      layout: "stacked",
      header: { eyebrow: "Why work with Top Spot Studio", title: "A practical, transparent Local SEO partner" },
      content: [
        {
          blockType: "numberedCards",
          columns: "3",
          numbered: false,
          items: [
            card(
              "Founder-Led Delivery",
              "Users",
              "Top Spot Studio is a two-person agency. You work directly with the people involved in the strategy and implementation rather than being passed through layers of account management.",
            ),
            card(
              "SEO and Website Thinking Together",
              "Gauge",
              "Local search performance and website performance are connected. If the problem is a weak service page, poor conversion path or technical issue, we can address the website side rather than treating Local SEO as a separate checklist. See [web design for tradies](/industries/web-design-for-tradies/).",
            ),
            card("Clear Priorities", "Eye", "Not every issue deserves the same attention. We focus first on the work most likely to improve relevance, trust, visibility or conversion."),
            card(
              "Transparent Positioning",
              "MapPin",
              "Top Spot Studio is based in Bangladesh and works remotely with New Zealand businesses. We do not claim a New Zealand office or local presence that does not exist.",
            ),
            card(
              "No Ranking Guarantees",
              "ShieldOff",
              "No agency controls Google’s results. We do not guarantee a Map Pack position, a #1 ranking or a fixed timeline. We focus on controllable improvements and measurable progress.",
            ),
          ],
        },
      ],
    },
    {
      blockType: "proof",
      eyebrow: "Selected results",
      title: "Experience & proof",
      intro: md("Top Spot Studio is a new agency, but the people behind it bring hands-on experience across SEO strategy, Local SEO, technical fixes, service-page optimisation, tracking and organic growth."),
      noteTitle: "Proof note",
      note: md(
        "These are selected results from SEO work led or managed by the people behind Top Spot Studio before the agency was launched. They are not presented as Local SEO guarantees, and results vary by market, competition, starting point and implementation.",
      ),
      ctaLabel: "SEO case studies",
    },
    {
      blockType: "ctaBand",
      tone: "tint",
      eyebrow: "Start with a free SEO audit",
      title: "See what may be limiting your local search visibility",
      primary: cta("Get a Free SEO Audit", AUDIT),
      location: "audit_section",
      body: md(`Not sure whether your biggest local-search issue is Google Business Profile setup, service-page relevance, reviews, citations or competitors? Start with our short Free SEO Audit, which can include local-search observations when relevant and publicly assessable.

We provide a focused initial review rather than a full Local SEO audit: typically 5–7 findings and three suggested priorities, based on available evidence. A complete listing-by-listing or full technical audit requires a separate engagement.

{small} Depending on the information available, the review may consider a public Google Business Profile, service-page relevance, local search appearance and contact paths. It does not require Google account access at the enquiry stage.`),
    },
    faq([
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
    ]),
    {
      blockType: "ctaBand",
      tone: "navy",
      title: "Want a clearer view of your local search opportunities?",
      primary: cta("Get a Free SEO Audit", AUDIT),
      secondary: cta("Contact Top Spot Studio", "/contact/"),
      location: "final_cta",
      body: md(
        "Start with a short Free SEO Audit. We will identify selected public website and local-visibility issues, explain three practical priorities where possible, and make the limits of this first review clear.",
      ),
    },
  ],
};

export { link };
