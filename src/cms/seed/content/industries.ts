import { card, crumb, cta, faq, img, items, link, md, type SeedPage } from "../helpers";

const AUDIT = "/free-seo-audit/";
const proofIntro = (extra: string) => md(`Top Spot Studio is a new agency, but the people behind it bring hands-on experience across ${extra}.`);

export const tradies: SeedPage = {
  title: "SEO for Tradies",
  path: "/industries/seo-for-tradies/",
  template: "industry",
  breadcrumbs: [crumb("Home", "/"), crumb("Industries"), crumb("SEO for Tradies", "/industries/seo-for-tradies/")],
  seo: {
    metaTitle: "SEO for Tradies That Drives Enquiries | Top Spot Studio",
    metaDescription: "SEO for tradies focused on Google visibility, service pages, local search and qualified enquiries. Get a free visibility audit from Top Spot Studio.",
    ogEyebrow: "Industry · Tradies",
    ogHeadline: "SEO for Tradies That Turns Local Searches Into Enquiries",
  },
  structuredData: { pageType: "WebPage", breadcrumbs: true, faq: true, service: { enabled: true, name: "SEO for Tradies", serviceType: "Search engine optimisation for trade businesses" } },
  layout: [
    {
      blockType: "pageHero",
      showBreadcrumbs: true,
      eyebrow: "Industry · Tradies",
      title: "SEO for Tradies That Turns Local Searches Into Enquiries",
      highlight: "Into Enquiries",
      lead: md(
        "When someone needs a roofer, plumber, electrician, builder or other trade service, search is often one of the first places they look. The challenge is making sure your business appears for the right services, in the right areas, with a website that gives people a reason to contact you.",
      ),
      body: md("Top Spot Studio helps tradies improve search visibility through practical SEO, Local SEO and website improvements built around real services and real customer journeys - not vanity rankings."),
      primary: cta("Get a Free SEO Audit", AUDIT),
      secondary: cta("View Case Studies", "/case-studies/"),
      trust: items(["Founder-led", "SEO + web capability", "Built around service businesses and tradies"]),
      mediaType: "image",
      image: img("builders-timber-frame", "Two builders working on the timber frame of a new house", undefined, "4/3"),
      mediaFrame: "default",
      location: "hero",
    },
    {
      blockType: "section",
      anchorId: "why-seo",
      tone: "white",
      layout: "editorial",
      header: { title: "Why SEO matters for tradies" },
      content: [
        {
          blockType: "richText",
          content: md(`{emphasis} Tradies do not need traffic for the sake of traffic. They need the right people finding the right service at the moment they are ready to call, request a quote or make an enquiry.

That means SEO for a trade business has to connect service demand, local relevance, trust and website performance. Ranking a homepage for a broad term is rarely enough if the individual services, service areas and conversion paths are weak.

A stronger strategy helps search engines understand what you do and where you do it, while helping potential customers quickly understand why they should contact you.`),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "gaps",
      tone: "base",
      layout: "split",
      header: {
        eyebrow: "Common gaps",
        title: "Common SEO gaps we see in trade businesses",
        intro: md("Many trade businesses already have a website and a Google Business Profile, but the pieces are not working together as effectively as they could."),
      },
      split: { mediaType: "visual", visual: "TradeJobMatrix", align: "start" },
      content: [
        {
          blockType: "checkList",
          variant: "gap",
          layout: "default",
          spacing: "6",
          items: items([
            "Important services are buried on one generic page instead of having clear, useful service pages.",
            "The website has weak local relevance for the areas the business actually serves.",
            "Google Business Profile categories, services, photos, reviews or website links are under-optimised.",
            "Page titles and headings are generic and do not match how customers search.",
            "The site is difficult to use on mobile, even though many urgent trade searches happen from phones.",
            "Calls, quote requests and form submissions are not tracked, so SEO performance is judged only by rankings or traffic.",
            "Content is published without a clear connection to commercial services or customer questions.",
          ]),
        },
      ],
      below: [
        {
          blockType: "card",
          variant: "card",
          spacing: "12",
          title: "How SEO priorities differ by trade",
          listLayout: "grid3",
          body: md(`{smallMuted} Illustrative examples—not a list of keywords Top Spot Studio is trying to rank for:

- **Plumber / blocked drains:** make an urgent drainage service easy to find; use a clear mobile call option and service-area information.
- **Electrician / switchboard upgrade:** explain the planned work, qualifications and quote requirements on an appropriate service page.
- **Roofer / roof repairs:** separate repair enquiries from larger reroofing projects when customer intent and the company’s real service offering justify it.

{small} Each business needs its own service-to-page map. A single trade-wide template cannot capture every job type, service area or enquiry process.`),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "services",
      tone: "white",
      layout: "stacked",
      header: {
        eyebrow: "Scope",
        title: "What our SEO for tradies can include",
        intro: md("The scope depends on the business, market and website. We focus on the work that supports visibility, trust and enquiries instead of forcing every client into the same checklist."),
      },
      content: [
        {
          blockType: "featureList",
          columns: "2",
          items: [
            card("Local Keyword & Competitor Research", "Search", "We research how customers search for your services, which locations matter, what competitors are doing well, and where the strongest opportunities may be."),
            card("Service Page Strategy", "Route", "We map priority services to the right pages, reduce overlap between pages, and strengthen commercial pages so they better match search intent and customer needs."),
            card("Google Business Profile Support", "Store", "For eligible local businesses, we review profile categories, services, business details, reviews, photos and the connection between the profile and website."),
            card("On-Page SEO", "FileText", "We improve titles, headings, copy, page structure, internal links and topical relevance across priority pages."),
            card("Technical SEO", "Wrench", "We identify crawl, indexation, redirect, duplicate, mobile, performance and other technical issues that may hold back important pages."),
            card("Reviews, Citations & Local Trust Signals", "Star", "Where relevant, we help improve review processes, business information consistency and local citations so the wider local presence supports the website."),
            card("Content & Topical Support", "PenLine", "We plan useful supporting content around real customer questions, service decisions and local demand, then connect that content to commercial pages through internal links."),
            card("Tracking & Reporting", "BarChart3", "Where access allows, we track organic visibility, priority pages and meaningful actions such as forms, calls or quote requests instead of reporting activity alone."),
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "trades",
      tone: "base",
      layout: "stacked",
      header: {
        eyebrow: "Trades we can support",
        title: "Built for service-led trade businesses",
        intro: md("Our approach is designed for service-led trade businesses where customers search by service, location, urgency and trust."),
      },
      content: [
        {
          blockType: "imageTiles",
          tiles: [
            { name: "Roofers", image: img("roofer-working-on-roof", "Roofer in a hard hat working on a pitched roof", "50% 35%") },
            { name: "Plumbers", image: img("plumber-fitting-pipe", "Plumber in work gloves fitting a threaded pipe to a radiator") },
            { name: "Electricians", image: img("electrician-switchboard", "Electrician working inside an open switchboard") },
            { name: "Builders", image: img("builders-timber-frame", "Two builders working on a timber house frame") },
            { name: "Landscapers", image: img("landscaper-trimming-lawn", "Landscaper trimming grass along a park path") },
          ],
          extraLabel: "Other service-led trades",
        },
        {
          blockType: "callout",
          title: "Current specialist focus: Roofing businesses",
          tone: "teal",
          spacing: "8",
          body: md("Roofing is the first niche we are building around. See how we approach [SEO for roofing companies](/industries/roofing-seo/)."),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "local",
      tone: "white",
      layout: "split",
      header: {
        title: "Local SEO is often a big part of the picture",
        intro: md(`For many tradies, visibility in local search matters as much as traditional organic rankings.

A potential customer may see a map result, a Google Business Profile, a service page and reviews before deciding who to contact. Those touchpoints should support one another.

When Local SEO is part of the scope, we look at Google Business Profile, local keywords, reviews, citations, website relevance and the pages that support the areas and services you genuinely offer.`),
      },
      split: { mediaType: "visual", visual: "LocalSignalsDiagram", reverse: true, align: "center" },
      content: [{ blockType: "textLink", label: "Explore local SEO for trade businesses", link: link("/markets/new-zealand/local-seo/"), style: "text", spacing: "6" }],
    },
    {
      blockType: "section",
      anchorId: "website",
      tone: "base",
      layout: "split",
      header: {
        title: "SEO works better when the website can convert",
        intro: md(`Getting found is only half the job. If the website is confusing, slow, thin on trust, or difficult to use on mobile, more visibility may not turn into more enquiries.

Top Spot Studio combines SEO and web capability so we can look beyond rankings. That can include clearer service journeys, stronger calls to action, better mobile usability, trust elements, project proof, review placement and quote-request paths.

If the website needs more than SEO edits, our [web design for tradies](/industries/web-design-for-tradies/) service can address the wider experience.`),
      },
      split: { mediaType: "visual", visual: "SiteWireframe", align: "center" },
      content: [{ blockType: "buttons", secondary: cta("Explore Web Design for Tradies", "/industries/web-design-for-tradies/", "service_cta_click"), location: "website_section", spacing: "8" }],
    },
    {
      blockType: "section",
      anchorId: "process",
      tone: "white",
      layout: "stacked",
      header: {
        eyebrow: "Our SEO process for tradies",
        title: "Starting with the jobs customers actually request",
        intro: md(
          "We start with the work customers actually request and the areas the tradie genuinely serves. A blocked-drain enquiry and an electrical upgrade need different service information, proof and calls to action.",
        ),
      },
      content: [
        {
          blockType: "processSteps",
          steps: [
            { title: "Understand the business", body: "We identify the most valuable job types, the places the business really covers, and whether customers generally call immediately or request a planned quote." },
            { title: "Audit visibility and the website", body: "We review search performance, service pages, technical setup, local signals, competitors and available tracking." },
            {
              title: "Prioritise the biggest gaps",
              body: "We prioritise missing service pages, incorrect business information, weak mobile quote paths and tracking gaps according to each trade’s actual sales process.",
            },
            { title: "Implement the agreed work", body: "We implement the agreed work, distinguishing quick contact-path repairs from service-page, technical and Local SEO improvements." },
            { title: "Measure and refine", body: "We review what is changing, what is creating progress and what deserves attention next." },
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
        eyebrow: "Why Top Spot Studio?",
        title: "Focused delivery, not layers of account management",
        intro: md("Top Spot Studio is a small, founder-led SEO and web studio built around focused delivery rather than layers of account management."),
      },
      content: [
        {
          blockType: "numberedCards",
          columns: "3",
          numbered: false,
          items: [
            card("Direct Communication", "MessagesSquare", "You work closely with the people involved in strategy and implementation, not through a chain of disconnected teams."),
            card("Trade-Specific Buyer Journeys", "MapPinned", "We approach tradie SEO around services, service areas, reviews, calls, quote requests and real customer journeys."),
            card("SEO + Web in One Workflow", "Gauge", "If a ranking issue is really a page-structure, mobile or conversion problem, we can consider both sides instead of treating SEO and the website as unrelated."),
            card("Clear Priorities", "Eye", "We explain what we are doing, why it matters and what comes next without hiding behind technical jargon."),
            card("No Ranking Guarantees", "ShieldOff", "We do not promise a guaranteed #1 position. We focus on white-hat SEO, disciplined execution and measurable improvement."),
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "market",
      tone: "white",
      layout: "editorial",
      header: { eyebrow: "Current market focus", title: "New Zealand" },
      content: [
        {
          blockType: "richText",
          content: md(`New Zealand is Top Spot Studio's first core international market, and our initial outreach focus is tradies - especially roofing businesses.

Top Spot Studio is based in Bangladesh and works remotely. We do not claim a New Zealand office or local physical presence that does not exist.

The strategy is still market-specific: keyword research, SERP analysis, competitor research and content decisions are based on the actual market we are targeting. Learn more about our [SEO services for New Zealand businesses](/markets/new-zealand/seo/).`),
        },
      ],
    },
    {
      blockType: "proof",
      eyebrow: "Experience & proof",
      title: "Experience backed by real SEO results",
      intro: proofIntro("SEO strategy, technical fixes, on-page optimisation, Local SEO, content, analytics and client delivery"),
      noteTitle: "Proof note",
      note: md(
        "These are selected results from SEO work led or managed by the people behind Top Spot Studio before the agency was launched. They are not presented as Top Spot Studio client results. Results vary by business, market, competition and starting point.",
      ),
      ctaLabel: "View SEO Case Studies",
    },
    {
      blockType: "ctaBand",
      tone: "tint",
      eyebrow: "Start with a free SEO audit",
      title: "Not sure what is limiting your visibility?",
      primary: cta("Get a Free SEO Audit", AUDIT),
      location: "audit_section",
      aside: { items: items(["No GA4 or Search Console access needed.", "No obligation.", "No ranking promises."]) },
      body: md(`We will review your website and search presence, then highlight a small number of high-impact opportunities worth looking at first.

No oversized automated report. No pressure to buy a package. Just a clearer view of the gaps that may be holding the business back.`),
    },
    faq([
      {
        q: "What does SEO for tradies include?",
        a: "It can include keyword research, competitor analysis, service-page optimisation, Local SEO, Google Business Profile support, technical SEO, internal linking, content planning, reviews, citations and conversion tracking. The exact scope depends on the business and its priorities.",
      },
      {
        q: "Do tradies need Local SEO as well as website SEO?",
        a: "Often, yes. Many trade customers use local search, Google Maps and business profiles alongside organic results. For eligible local businesses, the website and local presence should support one another.",
      },
      { q: "Do you only work with roofers?", a: "No. Roofing is our first specialist niche, but the broader tradie service is designed for plumbers, electricians, builders, landscapers and other service-led trade businesses." },
      { q: "Can you help if our website is outdated?", a: "Yes. We can identify SEO and conversion issues on the current site, and where a larger rebuild is justified we also offer web design for tradies." },
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
    ]),
    {
      blockType: "ctaBand",
      tone: "navy",
      title: "Ready to make your search visibility work harder for the business?",
      primary: cta("Get a Free SEO Audit", AUDIT),
      secondary: cta("Contact Top Spot Studio", "/contact/"),
      location: "final_cta",
      body: md("Start with a focused audit and find out which SEO opportunities deserve attention first."),
    },
  ],
};

export const roofing: SeedPage = {
  title: "Roofing SEO",
  path: "/industries/roofing-seo/",
  template: "industry",
  breadcrumbs: [crumb("Home", "/"), crumb("Industries"), crumb("Roofing SEO", "/industries/roofing-seo/")],
  seo: {
    metaTitle: "Roofing SEO Services | Top Spot Studio",
    metaDescription: "SEO for roofing companies focused on local visibility, service pages, website performance and qualified enquiries. Start with a free SEO audit.",
    ogEyebrow: "Industry · Roofing",
    ogHeadline: "Roofing SEO That Turns Local Searches Into Enquiries",
  },
  structuredData: { pageType: "WebPage", breadcrumbs: true, faq: true, service: { enabled: true, name: "Roofing SEO", serviceType: "Search engine optimisation for roofing companies" } },
  layout: [
    {
      blockType: "pageHero",
      showBreadcrumbs: true,
      eyebrow: "Industry · Roofing",
      title: "Roofing SEO That Turns Local Searches Into Enquiries",
      highlight: "Into Enquiries",
      lead: md(
        "When homeowners, property managers or commercial buyers need roofing work, search is often one of the first places they look. The challenge is making sure your roofing business is visible for the services and locations that matter - and that your website gives people a clear reason to contact you.",
      ),
      body: md("Top Spot Studio helps roofing companies improve search visibility through practical SEO, Local SEO and website improvements built around real roofing services, local demand and enquiry journeys."),
      primary: cta("Get a Free SEO Audit", AUDIT),
      secondary: cta("View Case Studies", "/case-studies/"),
      trust: items(["Founder-led", "SEO + web capability", "Current market focus: New Zealand service businesses"]),
      mediaType: "image",
      image: img("roof-tiles-installation", "Roof tiles being laid in rows on timber battens", undefined, "4/5"),
      mediaFrame: "narrow",
      location: "hero",
    },
    {
      blockType: "section",
      anchorId: "search",
      tone: "white",
      layout: "editorial",
      header: { title: "Roofing search is more than one keyword" },
      content: [
        {
          blockType: "richText",
          content: md(`A roofing company can offer several high-value services, but one generic “roofing” page rarely gives each service enough relevance or clarity.

Depending on the business, customers may search for roof repairs, reroofing, roof replacement, leak repairs, new roof installation, metal roofing, guttering or other specific services. They may also add a suburb, city or service area to the search.

A stronger roofing SEO strategy helps search engines understand those differences while making it easier for potential customers to find the right information and take the next step.`),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "gaps",
      tone: "base",
      layout: "stacked",
      header: {
        eyebrow: "Common gaps",
        title: "Common SEO gaps in roofing websites",
        intro: md(
          "Many roofing businesses already have a website and a Google Business Profile, but important opportunities can still be missed when the website, local presence and service structure are not working together.",
        ),
        contentSpacing: "10",
      },
      content: [
        {
          blockType: "checkList",
          variant: "gap",
          layout: "cardGrid",
          spacing: "10",
          items: items([
            "Several roofing services are grouped into one thin page instead of having clear, useful service pages.",
            "The website targets broad roofing terms but has weak relevance for the actual locations the business serves.",
            "Google Business Profile categories, services, photos, reviews or website connections are under-optimised.",
            "Page titles and headings do not reflect how customers search for specific roofing services.",
            "Project photos and proof exist, but they are not organised in a way that strengthens trust or service relevance.",
            "The mobile experience makes it harder to call, request a quote or understand the next step.",
            "Calls, forms and quote requests are not tracked, so SEO is judged mainly by rankings or traffic.",
            "Blog content is published without supporting priority roofing service pages or customer decisions.",
          ]),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "services",
      tone: "white",
      layout: "stacked",
      header: {
        eyebrow: "Scope",
        title: "What our roofing SEO can include",
        intro: md(
          "The exact scope depends on your services, market, website and current visibility. We prioritise the work most likely to improve search relevance, trust and enquiry opportunities rather than forcing every roofing company into the same checklist.",
        ),
      },
      content: [
        {
          blockType: "numberedCards",
          columns: "4",
          numbered: true,
          items: [
            card(
              "Roofing Keyword & Competitor Research",
              "Search",
              "We research how people search for the roofing services you actually offer, which locations matter, what competitors are doing well, and where there may be realistic opportunities to improve visibility.",
            ),
            card("Service Page Strategy", "Route", "We map important roofing services to the right pages, reduce overlap between pages and strengthen commercial content so it better matches customer intent."),
            card("Local SEO & Google Business Profile Support", "Store", "For eligible local roofing businesses, we review profile categories, services, business information, reviews, photos and how the profile connects to the website."),
            card("On-Page SEO", "FileText", "We improve titles, headings, page copy, internal links, media context and page structure across priority roofing pages."),
            card("Technical SEO", "Wrench", "We identify crawl, indexation, redirect, duplicate, mobile, performance and other technical issues that may limit important pages."),
            card("Reviews, Citations & Local Trust Signals", "Star", "Where relevant, we help improve review processes, business information consistency and local citations so the wider local presence supports the website."),
            card("Content & Internal Linking", "Link2", "We plan useful supporting content around real roofing questions and buying decisions, then connect that content to priority service pages through internal links."),
            card(
              "Conversion Tracking & Reporting",
              "BarChart3",
              "Where access allows, we track organic visibility, priority pages and meaningful actions such as quote forms, calls or enquiry submissions instead of reporting activity alone.",
            ),
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "service-pages",
      tone: "base",
      layout: "split",
      header: {
        title: "Service pages should match real roofing demand",
        intro: md(`Roof repairs, reroofing and roof replacement can involve different customer questions and enquiry types. The correct structure depends on the work a roofing business genuinely performs and whether NZ search results show distinct customer intent.

When the services and search intent are genuinely distinct, dedicated pages may make sense. If reroofing and roof replacement are simply two names for the same offer and share the same search results, one helpful page is usually better than two overlapping pages.

Each page should help a real customer understand the service, who it is for, what the process involves, why your business is credible and how to request a quote or consultation.`),
      },
      split: { mediaType: "visual", visual: "RoofingPageMap", align: "start" },
      content: [],
      below: [
        {
          blockType: "grid",
          spacing: "12",
          items: [
            {
              blockType: "card",
              variant: "card",
              title: "Illustrative roofing service-to-page map",
              listLayout: "stacked",
              body: md(`- **Roof repairs →** a repair page explaining what issues are handled, what customers should provide in an enquiry, where the company works and when a site visit is needed.
- **Reroofing →** a planned-project page showing materials/options (only those actually offered), job stages, project proof and a quote-request route.
- **Roof replacement →** a separate page only if the business offers a substantively different service and Google shows distinct buyer intent; otherwise cover this on the reroofing page.

{tinyMuted} These are sample website page roles for a roofer, not URLs or consumer roofing keywords targeted by Top Spot Studio. Validate the service list and SERP overlap before publishing.`),
            },
            {
              blockType: "card",
              variant: "card",
              title: "Two roofing enquiry journeys to design for",
              iconRows: [
                {
                  icon: "AlertTriangle",
                  iconTone: "coral",
                  lead: "Urgent leak or damage:",
                  text: "a visitor often needs a quick answer about service availability, area, next steps and how to contact the roofer. Do not promise 24/7 response unless the client actually offers it.",
                },
                {
                  icon: "CalendarClock",
                  iconTone: "teal",
                  lead: "Planned reroof or replacement:",
                  text: "a visitor may need project photos, material guidance, qualifications, realistic scope, the quoting process and reassurance before enquiring. Good SEO should connect each search to the appropriate page and action.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "local",
      tone: "white",
      layout: "columns",
      header: {
        title: "Local SEO is often critical for roofers",
        intro: md(`Roofing searches often have strong local intent. A customer may compare a Google Business Profile, map results, service pages, reviews, project evidence and contact information before choosing who to call.

For eligible local businesses, a roofing SEO strategy may therefore include both organic website work and Local SEO: Google Business Profile optimisation, reviews, citations, local relevance, service-area signals and location-aware internal linking.

The goal is not to stuff city names across the website. It is to make the business, services and areas served clear and useful for both search engines and customers.`),
      },
      columns: { ratio: "1-1", valign: "start", gap: "default" },
      content: [{ blockType: "textLink", label: "Explore local SEO for roofing businesses", link: link("/markets/new-zealand/local-seo/"), style: "text", spacing: "6" }],
      columnB: [
        {
          blockType: "sectionHeader",
          title: "Trust matters as much as visibility",
          intro: md(`Roofing is a high-trust service. Customers may be making an expensive decision, dealing with urgent damage or inviting a contractor onto their property.

That means the website needs more than keyword relevance. Strong project evidence, clear service information, reviews, accreditations where applicable, real team or business details and straightforward contact options can all support the decision to enquire.

{emphasis} SEO brings the right people to the page. The website still has to earn the next action.`),
        },
        { blockType: "textLink", label: "Explore web design for tradies", link: link("/industries/web-design-for-tradies/"), style: "text", spacing: "6" },
      ],
    },
    {
      blockType: "section",
      anchorId: "process",
      tone: "base",
      layout: "stacked",
      header: {
        eyebrow: "Our roofing SEO process",
        title: "Built around actual roofing services, not a generic checklist",
        intro: md("A roofing SEO project starts by understanding the roofing business’s actual repair, reroofing and installation services, not by applying a generic tradie checklist."),
      },
      content: [
        {
          blockType: "processSteps",
          steps: [
            {
              title: "Understand the business",
              body: "We separate priority roofing jobs by urgency, project value and actual service availability, then identify the genuine locations and enquiry steps involved.",
            },
            { title: "Audit visibility and the website", body: "We review search performance, service pages, local signals, technical setup, competitors and available tracking." },
            {
              title: "Build a priority roadmap",
              body: "We map roofing service pages, local-search visibility and the quote journey, then prioritise clear gaps without building duplicate pages for near-identical services.",
            },
            { title: "Implement the agreed work", body: "We improve technical, on-page, local, content and website elements according to the approved scope." },
            { title: "Measure and refine", body: "We review what is changing, where progress is appearing and what deserves attention next." },
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
        eyebrow: "Why Top Spot Studio?",
        title: "A practical roofing specialisation, honestly described",
        intro: md(
          "Our initial roofing specialisation is built around a practical understanding of roofing service categories, search intent and website quote journeys. We do not claim prior New Zealand roofing results that have not been documented.",
        ),
      },
      content: [
        {
          blockType: "numberedCards",
          columns: "3",
          numbered: false,
          items: [
            card(
              "Roofing Is Our Initial Specialist Niche",
              "Hammer",
              "Roofing is the first niche we are building our prospecting, research and service-development system around, which gives us a clearer understanding of common roofing search and website challenges.",
            ),
            card("SEO + Web in One Workflow", "Gauge", "If a visibility issue is really a page-structure, mobile, tracking or conversion problem, we can look at both sides instead of treating SEO and the website as unrelated."),
            card("Direct Communication", "MessagesSquare", "You work closely with the people involved in strategy and implementation, not through a chain of disconnected teams."),
            card("Clear Priorities", "Eye", "We explain what we are working on, why it matters and what should happen next without hiding behind technical jargon."),
            card("No Ranking Guarantees", "ShieldOff", "We do not promise a guaranteed #1 position. We focus on white-hat SEO, disciplined execution and measurable improvement."),
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "market",
      tone: "white",
      layout: "editorial",
      header: { eyebrow: "Current market focus", title: "New Zealand roofing businesses" },
      content: [
        {
          blockType: "richText",
          content: md(`New Zealand is Top Spot Studio's first core international market, and roofing businesses are our initial specialist outreach niche.

Our first prospecting focus is Hamilton and the wider Waikato region, while the Roofing SEO page itself remains scalable for roofing companies in other New Zealand regions and future international markets.

Top Spot Studio is based in Bangladesh and works remotely. We do not claim a New Zealand office or local physical presence that does not exist.

Market-specific research still matters. Keyword research, SERP analysis, competitor research and page decisions should be based on the actual country and region being targeted. For broader context, see our [SEO services for New Zealand businesses](/markets/new-zealand/seo/) and [SEO for tradies](/industries/seo-for-tradies/).`),
        },
      ],
    },
    {
      blockType: "proof",
      eyebrow: "Experience & proof",
      title: "Experience backed by real SEO results",
      intro: proofIntro("SEO strategy, technical fixes, on-page optimisation, Local SEO, content, analytics and client reporting"),
      noteTitle: "Proof note",
      note: md(
        "These are selected results from SEO work led or managed by the people behind Top Spot Studio before the agency was launched. They are not presented as Top Spot Studio client results unless specifically documented as such.",
      ),
      ctaLabel: "View SEO Case Studies",
    },
    {
      blockType: "ctaBand",
      tone: "tint",
      eyebrow: "Start with a free roofing SEO audit",
      title: "Not sure what is limiting your roofing business in search?",
      primary: cta("Get a Free SEO Audit", AUDIT),
      location: "audit_section",
      body: md(`We will review your website and search presence, then highlight a small number of high-impact opportunities worth looking at first.

No oversized automated report. No pressure to buy a package. Just a clearer view of the issues and opportunities that may be holding the business back.`),
    },
    faq([
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
    ]),
    {
      blockType: "ctaBand",
      tone: "navy",
      title: "Ready to make your roofing search visibility work harder for the business?",
      primary: cta("Get a Free SEO Audit", AUDIT),
      secondary: cta("Contact Top Spot Studio", "/contact/"),
      location: "final_cta",
      body: md("Start with a focused audit and find out which SEO opportunities deserve attention first."),
    },
  ],
};

const projectCta = cta("Discuss Your Website Project", "/contact/", "service_cta_click");
const seoCta = cta("Explore SEO for Tradies", "/industries/seo-for-tradies/", "service_cta_click");

export const webDesign: SeedPage = {
  title: "Web Design for Tradies",
  path: "/industries/web-design-for-tradies/",
  template: "industry",
  breadcrumbs: [crumb("Home", "/"), crumb("Industries"), crumb("Web Design for Tradies", "/industries/web-design-for-tradies/")],
  seo: {
    metaTitle: "Web Design for Tradies | Top Spot Studio",
    metaDescription: "Web design for tradies focused on speed, trust, local visibility and enquiries. Build a clearer, SEO-ready website with Top Spot Studio.",
    ogEyebrow: "Industry · Web Design",
    ogHeadline: "Web Design for Tradies",
  },
  structuredData: { pageType: "WebPage", breadcrumbs: true, faq: true, service: { enabled: true, name: "Web Design for Tradies", serviceType: "Website design and development" } },
  layout: [
    {
      blockType: "pageHero",
      showBreadcrumbs: true,
      eyebrow: "Industry · Web design",
      title: "Web Design for Tradies",
      highlight: "Tradies",
      lead: md("A good tradie website should do more than look professional. It should make it easy for the right customers to understand what you do, trust your business and take the next step."),
      body: md(
        "Top Spot Studio builds clear, conversion-focused websites for tradies and service businesses — with strong service structure, mobile usability, local SEO foundations and practical calls to action built in from the start.",
      ),
      primary: projectCta,
      secondary: seoCta,
      mediaType: "visual",
      visual: "SiteWireframe",
      mediaFrame: "inset",
      location: "hero",
    },
    {
      blockType: "section",
      anchorId: "job",
      tone: "white",
      layout: "editorial",
      header: { eyebrow: "Your website has one main job", title: "Turn attention into trust — and trust into enquiries" },
      aside: [{ blockType: "pills", items: items(["Can you do the job?", "Do you work in my area?", "Can I trust you?", "How do I contact you?"]) }],
      content: [
        {
          blockType: "richText",
          content: md(`Most people do not visit a tradie website because they want to browse. They are usually trying to answer a few practical questions quickly: Can you do the job? Do you work in my area? Can I trust you? How do I contact you?

If those answers are hard to find, even strong Google visibility can be wasted. That is why we treat web design as part of the customer journey, not a separate design exercise.

{emphasis} The goal is a website that helps a potential customer move from search to confidence to enquiry with as little friction as possible.`),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "problems",
      tone: "base",
      layout: "stacked",
      header: {
        eyebrow: "Common problems",
        title: "Common website problems for tradies",
        intro: md("Many trade businesses already have a website, but common structural and conversion issues can make it harder for both customers and search engines to understand the business."),
        contentSpacing: "10",
      },
      content: [
        {
          blockType: "checkList",
          variant: "gap",
          layout: "cardGrid",
          spacing: "10",
          items: items([
            "Important services are grouped together on one generic page instead of having clear, useful service pages.",
            "Visitors cannot quickly tell which areas the business serves.",
            "The mobile experience is slow, cluttered or difficult to navigate.",
            "Calls to action are weak, inconsistent or buried too far down the page.",
            "Project photos, reviews, accreditations or other trust signals are missing or hard to find.",
            "Contact forms ask for too much information or do not explain what happens next.",
            "The site structure was built without considering SEO, internal linking or future service growth.",
            "Analytics and enquiry tracking are missing, so the business cannot see which pages actually contribute to leads.",
          ]),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "build",
      tone: "white",
      layout: "stacked",
      header: {
        eyebrow: "What we build",
        title: "What we build into a tradie website",
        intro: md("Every project is different, but the website should be planned around real customer behaviour and the services the business wants to grow."),
      },
      content: [
        {
          blockType: "featureList",
          columns: "2",
          items: [
            card(
              "Clear Service Architecture",
              "LayoutGrid",
              "We organise the site so important services are easy to find, understand and expand over time. When separate service pages make sense, each one can answer specific customer questions and support its own search demand.",
            ),
            card(
              "Mobile-First User Experience",
              "Smartphone",
              "Tradie customers often search from a phone while comparing providers or trying to solve an immediate problem. Pages need clear navigation, readable content, simple forms and obvious contact options on smaller screens.",
            ),
            card(
              "Conversion-Focused Calls to Action",
              "MousePointerClick",
              "The website should make the next step obvious. Depending on the business, that may be a call, quote request, booking, consultation or project enquiry. We place calls to action where they support the page instead of forcing them everywhere.",
            ),
            card(
              "Trust and Proof",
              "ShieldCheck",
              "Reviews, project photos, credentials, service guarantees, team information and case studies can reduce hesitation when they are genuine and placed in the right context. We build space for the proof your business actually has.",
            ),
            card(
              "SEO-Ready Structure",
              "Search",
              "Web design and SEO should not be separated until after launch. We plan headings, URLs, internal links, service hierarchy, crawlability and on-page foundations as part of the build so the site starts with a cleaner search structure.",
            ),
            card(
              "Speed and Technical Foundations",
              "Gauge",
              "We aim for a lean, reliable site that works across common devices and avoids unnecessary visual elements that slow down the experience. Performance work is prioritised around real usability rather than chasing a perfect score for its own sake.",
            ),
            card(
              "Tracking That Connects the Website to Business Activity",
              "BarChart3",
              "Where appropriate, we set up analytics and conversion tracking for important actions such as forms, quote requests, calls or booking clicks. That makes future SEO and website decisions easier to evaluate.",
            ),
          ],
        },
        {
          blockType: "flowSteps",
          spacing: "14",
          title: "Example: A practical tradie website structure",
          steps: items(["Home", "Services overview", "Priority service detail pages", "Projects / Work examples", "About / Trust", "Contact / Request a Quote"]),
          body: "A service page explains one real job type, shows the genuine area covered and puts the next contact step nearby. Project photos and testimonials should only be used when the business owns them and permission has been confirmed.",
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "who",
      tone: "base",
      layout: "editorial",
      header: { eyebrow: "Who this service is for", title: "Websites for trade and service businesses" },
      content: [
        {
          blockType: "richText",
          content: md(`Our tradie web design service is suited to businesses where customers search for a specific service, compare trust signals and then contact a provider.

::pills
- Roofing companies
- Plumbers and drainage businesses
- Electricians
- Builders and renovation businesses
- Landscapers and outdoor service providers
- HVAC, heating and cooling businesses
- Other local service businesses with a clear enquiry or quote journey

Roofing is our initial specialist niche, while the wider Top Spot Studio model is built to support additional service industries over time.

[See our approach to SEO for roofing companies](/industries/roofing-seo/)`),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "seo",
      tone: "navy",
      layout: "columns",
      header: {
        title: "Web design and SEO should support each other",
        intro: md(`A website can look polished and still be difficult to find. It can also rank for useful searches and still fail to generate enquiries.

That is why our approach connects website structure with search visibility. During planning, we consider which services deserve dedicated pages, how users should move between them, where local relevance belongs, how internal links should work and what information customers need before they contact the business.

If SEO is part of the wider project, the website can be built around a clearer keyword and content map instead of being redesigned first and optimised later.`),
      },
      columns: { ratio: "1.1-0.9", valign: "center", gap: "default" },
      content: [{ blockType: "buttons", primary: projectCta, secondary: cta("Explore SEO for Tradies", "/industries/seo-for-tradies/", "service_cta_click"), location: "seo_section", spacing: "8" }],
      columnB: [
        {
          blockType: "linkList",
          label: "Related services",
          links: [
            { label: "SEO for tradies", link: link("/industries/seo-for-tradies/") },
            { label: "SEO services for New Zealand businesses", link: link("/markets/new-zealand/seo/") },
            { label: "Local SEO services in New Zealand", link: link("/markets/new-zealand/local-seo/") },
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "process",
      tone: "white",
      layout: "stacked",
      header: { eyebrow: "Our tradie website process", title: "From brief to a launch-ready site" },
      content: [
        {
          blockType: "processSteps",
          steps: [
            { title: "Understand the business", body: "We start with your services, service areas, ideal customers, current website, sales process and the actions you want visitors to take." },
            { title: "Plan the structure", body: "We map the core pages, navigation, service hierarchy, conversion paths and SEO considerations before design work begins." },
            { title: "Build the page experience", body: "We create the page layouts and content structure around clarity, mobile usability, trust and action — not unnecessary visual complexity." },
            {
              title: "Add tracking and SEO foundations",
              body: "We implement the agreed technical and on-page foundations, connect relevant tracking and check that important pages are accessible to search engines.",
            },
            {
              title: "QA and launch",
              body: "Before launch, we review key pages across devices, test forms and links, check important metadata and make sure the live site is ready for measurement and future improvement.",
            },
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "scope",
      tone: "base",
      layout: "columns",
      header: {
        eyebrow: "Scope",
        title: "What a project can include",
        intro: md("Scope depends on the selected package and agreed proposal. A tradie website project may include the following when specified in the Statement of Work:"),
      },
      columns: { ratio: "0.9-1.1", valign: "start", gap: "wide" },
      content: [
        {
          blockType: "checkList",
          variant: "check",
          layout: "default",
          spacing: "6",
          items: items([
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
          ]),
        },
        { blockType: "richText", spacing: "6", content: md("{smallMuted} We scope the work around what the business actually needs rather than forcing every project into the same template.") },
      ],
      columnB: [
        {
          blockType: "tierCards",
          heading: "Website packages — an initial guide",
          tiers: [
            { name: "Starter Website", price: "NZ$1,400", cadence: "one-time", summary: "Up to 5 pages. A lean responsive build with contact form and basic SEO-ready structure, subject to a clear page and feature list." },
            {
              name: "Lead Generation Website",
              price: "NZ$2,200",
              cadence: "one-time",
              summary: "Up to 10 pages. More room for priority services, trust elements, quote journeys and foundational launch/tracking checks defined in the proposal.",
            },
            { name: "Custom Growth Website", price: "from NZ$3,000", cadence: "one-time", summary: "Final pricing, custom features, milestones and revisions depend on the agreed scope." },
          ],
        },
        {
          blockType: "callout",
          tone: "neutral",
          spacing: "6",
          body: md(
            "The package price is for the agreed website build—not unlimited copywriting, hosting/domain fees, premium plugins, photography, extensive custom integrations or ongoing monthly SEO. Any additional work is confirmed in writing before implementation.",
          ),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "why",
      tone: "white",
      layout: "stacked",
      header: { eyebrow: "Why Top Spot Studio", title: "A founder-led SEO and web team" },
      content: [
        {
          blockType: "numberedCards",
          columns: "4",
          numbered: false,
          items: [
            card(
              "A founder-led SEO and web team",
              "Users",
              "Top Spot Studio is a two-person, founder-led SEO and web growth studio. Website strategy, SEO thinking and technical implementation stay closely connected instead of being handed between disconnected teams.",
            ),
            card(
              "Built around service-business customer journeys",
              "Workflow",
              "We focus on service businesses where a website has to create confidence quickly and make the next action easy. That keeps the project grounded in commercial use, not design trends alone.",
            ),
            card(
              "Clear scope and communication",
              "MessagesSquare",
              "We explain what is being built, why it matters and what information we need from you. If something is outside the agreed scope, we make that clear instead of hiding it behind vague package language.",
            ),
            card(
              "No fake guarantees",
              "ShieldOff",
              "A new website can create a stronger foundation for search and conversion, but it does not guarantee rankings, leads or revenue. Outcomes depend on the market, offer, competition, traffic and how the website is supported after launch.",
            ),
          ],
        },
        { blockType: "textLink", label: "View Our Case Studies", link: link("/case-studies/"), style: "text", spacing: "8" },
      ],
    },
    {
      blockType: "section",
      anchorId: "market",
      tone: "base",
      layout: "editorial",
      header: { eyebrow: "Our current market focus", title: "Working remotely with New Zealand tradies and service businesses" },
      content: [
        {
          blockType: "richText",
          content: md(`New Zealand is Top Spot Studio’s first primary international market. We work remotely from Bangladesh and do not present ourselves as a New Zealand-based agency.

For website projects, remote delivery works well because discovery, planning, design review, development, tracking and feedback can all be handled online with a clear process and agreed milestones.

As the agency expands, this service can support tradies and service businesses in additional English-speaking markets without changing the core approach.`),
        },
      ],
    },
    faq([
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
    ]),
    {
      blockType: "ctaBand",
      tone: "navy",
      title: "Is your website helping customers choose you?",
      primary: projectCta,
      secondary: seoCta,
      location: "final_cta",
      body: md(`If your site is unclear on mobile, hard to navigate or missing an obvious quote path, start with a website project conversation. We can scope the practical improvements needed.

Tell us about your services, website goals, approximate page requirements and preferred launch timing. We will reply with suitable next steps for scoping, rather than promising an unrequested full review.`),
    },
  ],
};
