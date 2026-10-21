import { crumb, cta, items, md, type SeedPage } from "../helpers";

const AUDIT = "/free-seo-audit/";
const HUB = "/case-studies/";

const glance = (rows: [string, string][]) => rows.map(([term, value]) => ({ term, value }));
const metrics = (rows: [string, string, string?][]) => rows.map(([value, label, context]) => ({ value, label, ...(context ? { context } : {}) }));

export const caseInfluencer: SeedPage = {
  title: "Case study: Influencer marketing agency",
  path: "/case-studies/influencer-marketing-agency-seo-growth/",
  template: "caseStudy",
  breadcrumbs: [crumb("Home", "/"), crumb("Case Studies", HUB), crumb("Malaysian Influencer Marketing Agency", "/case-studies/influencer-marketing-agency-seo-growth/")],
  seo: {
    metaTitle: "SEO Case Study: 99 Leads for an Influencer Marketing Agency | Top Spot Studio",
    metaDescription: "See how an SEO strategy improved search visibility, keyword rankings, engagement and generated 99 leads for a Malaysian influencer marketing agency.",
    ogEyebrow: "Case Study · Influencer Marketing",
    ogHeadline: "99 tracked form leads for a Malaysian influencer marketing agency",
  },
  structuredData: { pageType: "Article", breadcrumbs: true, faq: false },
  caseStudyCard: {
    label: "Malaysian Influencer Marketing Agency",
    title: "Influencer Marketing Agency SEO Growth",
    summary:
      "A long-running SEO engagement covering strategy, technical and on-page improvements, keyword research, content development and coordinated authority building. The work helped transform a very small organic baseline into a meaningful acquisition channel while also generating tracked enquiries.",
    metrics: [
      { value: "99", label: "tracked form leads" },
      { value: "+31.2%", label: "Google Search clicks" },
      { value: "+88.0%", label: "Search impressions" },
    ],
  },
  layout: [
    {
      blockType: "caseStudy",
      eyebrow: "Case study • Influencer marketing • Malaysia",
      title: "How SEO Helped a Malaysian Influencer Marketing Agency Grow Search Visibility and Generate 99 Leads",
      summary:
        "A focused SEO program combined keyword strategy, technical improvements, on-page optimization, content and performance monitoring to strengthen search visibility in a competitive influencer-marketing niche. During the project period, the business generated 99 tracked form leads while improving clicks, impressions, rankings and engagement.",
      heroMetrics: metrics([
        ["99", "Tracked form leads", "Generated during the project period"],
        ["+31.2%", "Google Search clicks", "869 → 1,140 in the comparison period"],
        ["+88.0%", "Search impressions", "32.6K → 61.3K"],
        ["4", "Priority #1 rankings", "December 2024 reporting snapshot"],
      ]),
      glance: glance([
        ["Industry", "Influencer marketing agency"],
        ["Market", "Malaysia"],
        ["Engagement window", "Approximately 7 months for the main comparison period"],
        ["Core scope", "Keyword research, technical SEO, on-page optimization, content, internal linking, performance monitoring and coordinated off-page support"],
      ]),
      challenge: items([
        "Search visibility was limited relative to the opportunity in the Malaysian influencer-marketing market.",
        "Important commercial and niche-relevant keywords had room to improve.",
        "Website content and several technical elements needed stronger optimization.",
        "The project needed to connect visibility growth with measurable business outcomes, not rankings alone.",
      ]),
      goals: items([
        "Increase organic visibility and qualified search traffic.",
        "Improve rankings for priority influencer-marketing terms.",
        "Strengthen on-page relevance and technical health.",
        "Build a content system around user intent and industry topics.",
        "Generate measurable organic enquiries through the website.",
      ]),
      work: [
        {
          title: "Keyword research and page targeting",
          body: "We researched high-intent and topical search terms around influencer marketing, KOL marketing and related Malaysian search behaviour. Priority terms were mapped to existing pages or new content opportunities so each page had a clear search purpose.",
        },
        {
          title: "On-page SEO and content optimization",
          body: "Core pages were improved through title tags, meta descriptions, headings, body copy and clearer keyword alignment. New blog content was planned and published around industry-relevant topics, while internal links helped connect supporting articles with commercial pages.",
        },
        {
          title: "Technical SEO improvements",
          body: "The project included technical cleanup such as broken-link fixes, crawl-error monitoring, mobile and page-experience improvements, and structured data implementation to help search engines better understand the site.",
        },
        {
          title: "Content production",
          body: "Content was produced consistently around the questions and topics the target audience was searching for. This expanded the site’s topical coverage beyond the core service pages and created more entry points from organic search.",
        },
        {
          title: "Monitoring and iteration",
          body: "Google Search Console and Google Analytics were reviewed throughout the campaign to monitor clicks, impressions, rankings and user engagement. Findings were used to refine the keyword and content strategy over time.",
        },
        {
          title: "Coordinated off-page support",
          body: "Off-page work was supported by the wider delivery team through business listings, profile links, Web 2.0 placements, forums and other foundational link-building activities.",
        },
      ],
      resultsIntro:
        "The campaign improved both search visibility and measurable business outcomes. The figures below are taken from the project’s internal Google Search Console, Google Analytics and SEO reporting records.",
      results: [
        { result: "99", metric: "Tracked form leads", context: "Generated during the project period" },
        { result: "1,140", metric: "Google Search clicks", context: "Up from 869 in the comparison period (+31.2%)" },
        { result: "61.3K", metric: "Google Search impressions", context: "Up from 32.6K (+88.0%)" },
        { result: "20.2", metric: "Average Google position", context: "Improved from 22.5" },
        { result: "1m 37s", metric: "Average engagement time", context: "Reported as +220.7% improvement" },
      ],
      visual: { type: "influencerComparison" },
      afterResults: [
        {
          blockType: "keywordTable",
          title: "Priority keyword wins",
          intro: "At the December 2024 reporting snapshot, several high-value terms had reached the top position:",
          rows: ["influencer marketing agency", "influencer marketing agency malaysia", "influencer marketing malaysia", "kol agency malaysia"].map((keyword) => ({ keyword, position: "#1" })),
        },
      ],
      whyItWorked: [
        { lead: "Commercial relevance first:", body: "The work focused on queries and pages connected to the agency’s actual services rather than chasing traffic for its own sake." },
        { lead: "Content supported the money pages:", body: "Supporting articles expanded topical depth and created internal-linking opportunities back to commercially important pages." },
        {
          lead: "Technical and content work moved together:",
          body: "Search performance was not treated as a content-only problem. Technical issues, on-page relevance and crawlability were addressed alongside publishing.",
        },
        { lead: "Performance data shaped the next actions:", body: "Search Console and Analytics data were used to identify what was improving and where further optimization was needed." },
      ],
      takeaway: md(
        "This project shows what can happen when keyword research, technical SEO, on-page optimization, content and measurement are treated as one connected system. The result was not only stronger visibility in search, but also measurable lead generation and better positioning for commercially important terms.",
      ),
      transparency:
        "This work was completed before Top Spot Studio was launched. It reflects SEO work led or managed by the people behind Top Spot Studio, not work delivered under the Top Spot Studio brand. Results vary by market, competition, website condition and starting point.",
      finalTitle: "Want to understand where your own search visibility is being held back?",
      finalBody: "Start with a focused SEO audit and we’ll identify the highest-impact opportunities worth addressing first.",
    },
  ],
};

export const caseConsulting: SeedPage = {
  title: "Case study: Training & consulting business",
  path: "/case-studies/training-consulting-seo-growth/",
  template: "caseStudy",
  breadcrumbs: [crumb("Home", "/"), crumb("Case Studies", HUB), crumb("Training & Consulting Business", "/case-studies/training-consulting-seo-growth/")],
  seo: {
    metaTitle: "SEO Case Study: +182% Google Clicks for a Training & Consulting Business | Top Spot Studio",
    metaDescription:
      "See how SEO increased Google clicks by 182.4%, expanded search visibility to 165K+ impressions and generated 4,379 organic page views for a training and consulting business.",
    ogEyebrow: "Case Study · Training & Consulting",
    ogHeadline: "+182.4% Google Search clicks for a training & consulting business",
  },
  structuredData: { pageType: "Article", breadcrumbs: true, faq: false },
  caseStudyCard: {
    label: "Training & Consulting Business",
    title: "SEO Foundation for a Training & Consulting Business",
    summary:
      "An end-to-end SEO build covering strategy, technical cleanup, keyword mapping, on-page optimisation, content publishing and foundational authority work. This case study is designed to show how an SEO system is built from the ground up when the business needs stronger structure, relevance and consistency before growth can compound.",
    metrics: [
      { value: "+182.4%", label: "Google Search clicks (514)" },
      { value: "165K+", label: "Search impressions" },
      { value: "4,379", label: "Google organic page views" },
    ],
  },
  layout: [
    {
      blockType: "caseStudy",
      eyebrow: "Case study - Training & consulting - Organic search",
      title: "How SEO Increased Google Clicks by 182% for a Training & Consulting Business",
      summary:
        "A six-month SEO program combined technical cleanup, keyword strategy, on-page optimization, content publishing, internal linking and performance tracking to expand organic visibility for a training and consulting business. From April to September 2025, the site recorded 514 Google Search clicks, 165,113 impressions and 4,379 Google organic page views while technical site health reached 90%.",
      heroMetrics: metrics([
        ["+182.4%", "Google Search clicks", "514 clicks, April–September 2025"],
        ["165K+", "Search impressions", "165,113 (+3,258%)"],
        ["4,379", "Google organic page views", "April–September 2025"],
        ["90%", "Technical site health", "Reported at the end of the period"],
      ]),
      glance: glance([
        ["Industry", "Training, consulting and professional development"],
        ["Engagement window", "April to September 2025"],
        ["Audience focus", "Professionals and organisations interested in training, consulting, service delivery and industry frameworks"],
        ["Core SEO scope", "Technical SEO, audit, keyword research, on-page optimization, content, internal linking and performance tracking"],
        ["Measurement", "Google Analytics, Google Search Console and technical site-health reporting"],
      ]),
      challenge: items([
        "The website needed a stronger SEO foundation so search engines could crawl, understand and surface more of its training and consulting content.",
        "Target services and thought-leadership topics needed clearer keyword mapping and on-page relevance.",
        "Content had to reach audiences searching for practical guidance around service delivery, frameworks, coaching and organisational improvement.",
        "The project needed a measurable system for tracking search visibility, traffic quality and technical progress over time.",
      ]),
      goals: items([
        "Increase qualified visibility across Google Search.",
        "Grow clicks and impressions for relevant non-brand search queries.",
        "Improve technical site health and crawlability.",
        "Create content around high-value training and consulting topics.",
        "Build stronger internal connections between service, framework and educational pages.",
      ]),
      work: [
        {
          title: "Technical SEO foundation",
          body: "The first phase focused on measurement and crawlability: Google Analytics and Search Console setup, XML sitemap and robots.txt checks, indexability reviews, canonical issues, broken links and redirects. The wider plan also included mobile-friendliness and page-speed improvements.",
        },
        {
          title: "SEO audit, competitor research and keyword mapping",
          body: "The project included a full website audit, competitor keyword and backlink analysis, topic-gap research and a mapped set of 35 target keywords. Keywords were assigned to service pages and blog content so the site could build relevance around training, consulting, efficiency and industry-framework topics.",
        },
        {
          title: "On-page optimization and internal linking",
          body: "Core pages were improved through titles, meta descriptions, URL structure, heading hierarchy, image optimization and internal linking. Existing pages were aligned more closely with the search intent behind target queries, while structured data was included where appropriate.",
        },
        {
          title: "Content publishing around real search demand",
          body: "The content program focused on educational topics connected to the client's expertise. Reporting later showed strong user interest in ITIL-related resources, including an ITIL best-practices article that attracted 731 new users during the measured period.",
        },
        {
          title: "Performance monitoring and iteration",
          body: "Google Search Console, Analytics and site-health data were reviewed to track clicks, impressions, traffic sources, top pages and technical issues. The strategy was then adjusted based on what was gaining visibility and where search performance still had room to improve.",
        },
        {
          title: "Broader authority-building support",
          body: "The documented delivery plan also included off-page promotion and business-listing activity. For this public case study, the emphasis stays on the most defensible and measurable parts of the work: technical SEO, keyword targeting, on-page improvements, content, internal linking and ongoing measurement.",
        },
      ],
      resultsIntro:
        "By the end of the April-to-September reporting period, the site had achieved substantial growth in search visibility and traffic. The figures below come directly from the project's reporting records.",
      results: [
        { result: "514", metric: "Google Search clicks", context: "+182.4% versus the comparison period" },
        { result: "165,113", metric: "Google Search impressions", context: "+3,258% versus the comparison period" },
        { result: "4,379", metric: "Google organic page views", context: "Second-largest documented traffic source" },
        { result: "3,071", metric: "Total users", context: "3,048 were new users" },
        { result: "90%", metric: "Technical site health", context: "Reported at the end of the period" },
      ],
      visual: {
        type: "panel",
        title: "Growth versus the comparison period",
        metrics: metrics([
          ["+182.4%", "Google Search clicks", "514 clicks"],
          ["+3,258%", "Google Search impressions", "165,113 impressions"],
        ]),
        caption: "April–September 2025 reporting period. Percentages are reproduced from the source report; baseline figures are not shown.",
      },
      afterResults: [
        {
          blockType: "grid",
          items: [
            {
              blockType: "card",
              variant: "soft",
              title: "Content performance highlights",
              listLayout: "disc",
              body: md(`- The site’s most popular page in the report attracted 838 users.
- An ITIL best-practices article attracted 731 new users, showing strong search demand around the client's specialist knowledge.
- Other ITIL-focused articles and the downloads page also attracted meaningful new-user activity, supporting the decision to keep building topic depth around the client's expertise.`),
            },
            {
              blockType: "callout",
              title: "A transparent look at the remaining opportunity",
              tone: "neutral",
              body: md(
                "Visibility expanded much faster than clicks. The report showed CTR at 0.31% and an average position of 55.78, even though average position had improved by 21.6%. That means the site was appearing for far more searches, but much of that new visibility was still outside the highest-click positions. We would present this as strong early-stage visibility growth, not as blanket first-page dominance.",
              ),
            },
          ],
        },
      ],
      whyItWorked: [
        { lead: "The foundation came first:", body: "Technical setup, crawlability and measurement were addressed before relying on content alone." },
        { lead: "Keyword research was connected to real pages:", body: "Target terms were mapped to service and educational content instead of being treated as a disconnected keyword list." },
        { lead: "Content matched the client's expertise:", body: "Educational topics around service management and ITIL aligned with what the audience was already searching for." },
        {
          lead: "Reporting exposed both wins and weaknesses:",
          body: "The team could see visibility growth, organic engagement and technical progress while also identifying CTR and ranking depth as the next optimisation opportunities.",
        },
      ],
      takeaway: md(
        "This project shows how a structured SEO program can create a much larger search footprint for a specialised training and consulting business. In six months, search clicks rose by 182.4%, impressions expanded to more than 165,000 and organic Google traffic became a major source of website activity. Just as importantly, the data made the next growth constraint clear: converting broader visibility into stronger rankings and a higher click-through rate.",
      ),
      transparency:
        "This work was completed before Top Spot Studio was launched. It reflects SEO work led or managed by the people behind Top Spot Studio, not work delivered under the Top Spot Studio brand. Results vary by business, market, website condition, competition and starting point.",
      finalTitle: "Want to know which SEO issues are limiting your own visibility?",
      finalBody: "Start with a focused audit and we will identify the highest-impact opportunities worth addressing first.",
    },
  ],
};

export const caseImageEditing: SeedPage = {
  title: "Case study: AI image editing platform",
  path: "/case-studies/ai-image-editing-seo-growth/",
  template: "caseStudy",
  breadcrumbs: [crumb("Home", "/"), crumb("Case Studies", HUB), crumb("AI-Powered Image Editing Platform SEO Growth", "/case-studies/ai-image-editing-seo-growth/")],
  seo: {
    metaTitle: "SEO Case Study: 29% Organic Traffic Growth in 4 Months | Top Spot Studio",
    metaDescription:
      "See how a content-led SEO strategy helped an AI-powered image-editing platform grow monthly organic visitors from 4,182 to 5,400 in four months while improving visibility for valuable photo-editing keywords.",
    ogEyebrow: "Case Study · AI Image Editing",
    ogHeadline: "4,182 → 5,400 monthly organic visitors in four months",
  },
  structuredData: { pageType: "Article", breadcrumbs: true, faq: false },
  caseStudyCard: {
    label: "AI-Powered Image Editing Platform",
    title: "Organic Growth for an AI Photo Retouching Platform",
    summary:
      "A content-led SEO programme that increased monthly organic visitors from 4,182 to 5,400 over four months. The project combined consistent publishing with supporting SEO and off-page activity, showing how steady execution can move an established content base forward over time.",
    metrics: [
      { value: "4,182 → 5,400", label: "monthly organic visitors" },
      { value: "~29%", label: "organic visitor growth" },
      { value: "4 months", label: "measured period" },
    ],
  },
  layout: [
    {
      blockType: "caseStudy",
      eyebrow: "Case study - AI image editing - Content-led SEO",
      title: "How an AI Image Editing Platform Grew Organic Traffic by 29% in Four Months",
      summary:
        "An AI-powered image-editing platform needed a scalable organic-growth system that could build visibility beyond the most competitive head terms in the photo-editing market. Over a four-month period, a content-led SEO program grew monthly organic visitors from 4,182 to 5,400 while improving visibility for commercially relevant topics such as “ghost mannequin” and “automatic clothes editor.”",
      heroMetrics: metrics([
        ["29.1%", "Organic growth", "About +29.1% over four months"],
        ["4,182 → 5,400", "Monthly organic visitors", "Start and end of the measured period"],
        ["4 months", "Measured period", "Content-led SEO program"],
      ]),
      glance: glance([
        ["Client", "AI-Powered Image Editing Platform"],
        ["Industry", "AI-powered image editing / photo-editing SaaS"],
        ["Measured period", "Four months"],
        ["Headline result", "Monthly organic visitors increased from 4,182 to 5,400 (about +29.1%)"],
        ["Core SEO scope", "Topic selection, keyword research, competitor analysis, content production, on-page optimization, promotion and authority building"],
      ]),
      challenge: items([
        "Photo editing is a competitive category, with established software brands dominating many broad search terms.",
        "The site needed enough topic depth to support consistent publishing without drifting away from the product and audience.",
        "Keyword selection had to balance demand with realistic ranking difficulty rather than chasing only the highest-volume terms.",
        "Organic growth required a repeatable system for research, publishing, distribution and authority building over several months.",
      ]),
      goals: items([
        "Grow qualified organic traffic from search.",
        "Find lower-competition, commercially relevant topics around image editing, apparel photography and retail automation.",
        "Create a consistent publishing engine that could build topical depth over time.",
        "Improve visibility for valuable photo-editing queries instead of relying only on broad, highly competitive keywords.",
        "Build authority through useful content, distribution and earned/editorial links.",
      ]),
      work: [
        {
          title: "Choosing a topic space with room to grow",
          body: "The strategy started by testing whether the broader photo-editing space offered enough searchable subtopics and realistic ranking opportunities. Instead of assuming every valuable keyword was already locked up by major software brands, the research looked for adjacent themes where demand existed but competition was more manageable.",
        },
        {
          title: "Keyword research focused on realistic wins",
          body: "Keyword opportunities were evaluated using search demand and difficulty, then expanded through related-topic research, “also rank for” analysis and competitor intelligence. The campaign deliberately avoided relying on only broad head terms such as “remove background” and instead looked for more attainable opportunities around image editing, clothing photography, AI fashion and related use cases.",
        },
        {
          title: "Competitor and topic-gap research",
          body: "Competitor pages and content categories were reviewed to understand which subjects were already driving traffic in the market. That research helped uncover missing topics and build a broader editorial pipeline rather than treating keyword research as a one-time spreadsheet exercise.",
        },
        {
          title: "Consistent, in-depth content production",
          body: "The source records describe a publishing cadence of roughly four posts per week across the four-month period, except during vacations. Content was created to be more detailed, current, actionable and readable than competing pages, with SERP review used to identify what top-ranking content covered and where additional value could be added.",
        },
        {
          title: "Content distribution and visibility support",
          body: "New content was promoted through channels including LinkedIn and Facebook to increase early visibility. The project records also note growing engagement on LinkedIn during the period, reinforcing the idea that useful content can support both search and broader brand discovery.",
        },
        {
          title: "Authority building and earned links",
          body: "The historical campaign used guest posts and other foundational link activities, but content quality remained the main priority. As rankings improved, the case-study notes reported that other publishers also began citing the site naturally, creating additional earned links without direct outreach.",
        },
      ],
      resultsIntro: "After four months, the campaign had produced measurable organic growth and stronger search visibility in the image-editing niche.",
      results: [
        { result: "4,182 → 5,400", metric: "Monthly organic visitors", context: "About +29.1% over four months" },
        { result: "4 months", metric: "Measured growth period", context: "Content-led SEO program" },
        { result: "High visibility", metric: "Commercially relevant queries", context: "Including “ghost mannequin” and “automatic clothes editor”" },
        { result: "~4 posts/week", metric: "Publishing cadence", context: "Consistent output across the campaign, excluding vacations" },
      ],
      visual: {
        type: "bars",
        title: "Monthly organic visitors",
        bars: [{ label: "Start vs end of the four-month period", before: 4182, after: 5400, beforeLabel: "4,182", afterLabel: "5,400", change: "≈ +29.1%" }],
        caption: "Figures from the platform’s case-study records. Results shown are from a specific historical SEO engagement; past results do not guarantee future performance.",
      },
      afterResults: [
        {
          blockType: "grid",
          items: [
            {
              blockType: "card",
              variant: "soft",
              title: "Keyword visibility gains",
              body: md("The source case study states that the platform ranked highly for valuable photo-editing keywords including “ghost mannequin” and “automatic clothes editor.”"),
            },
            {
              blockType: "card",
              variant: "soft",
              title: "Compounding authority",
              body: md(
                "The project notes report that once content began ranking, other publishers increasingly cited it as a source. That is an important part of the growth story: useful content began supporting its own authority rather than depending entirely on active link outreach.",
              ),
            },
          ],
        },
      ],
      whyItWorked: [
        { lead: "The campaign chose attainable battles:", body: "Instead of targeting only the largest photo-editing keywords, research prioritised topics with a better balance of demand and ranking difficulty." },
        { lead: "Publishing was consistent:", body: "A repeatable content cadence gave the site enough depth to cover multiple related topics and build relevance over time." },
        { lead: "SERP research shaped content quality:", body: "Top-ranking pages were reviewed before writing so new articles could add missing detail, freshness and practical value." },
        { lead: "Content and authority reinforced each other:", body: "Promotion and outreach helped initial discovery, while stronger rankings created opportunities for natural citations and earned links." },
        {
          lead: "The team allowed time for compounding:",
          body: "The case study explicitly emphasises patience: content needed several months to mature before the organic-growth curve became more meaningful.",
        },
      ],
      takeaway: md(`This project shows how a focused content-led SEO strategy can create meaningful growth even in a competitive software category. The result did not come from chasing every large keyword. It came from finding realistic topic opportunities, publishing consistently, improving content quality against the SERP and allowing authority to compound over time.

Across four months, monthly organic visitors grew from 4,182 to 5,400 - an increase of about 29.1% - while the site strengthened visibility around valuable photo-editing terms.`),
      transparency:
        "Results shown are from a specific historical SEO engagement led or managed by the people behind Top Spot Studio before the agency launched. SEO outcomes vary depending on the market, competition, website condition, content quality and level of implementation. Past results do not guarantee future performance.",
      finalTitle: "Could a similar content-led SEO system work for your business?",
      finalBody:
        "The right strategy depends on your market, competition, website and starting point. A focused audit can show whether your biggest opportunity is keyword targeting, content depth, technical SEO, stronger service pages or authority building.",
    },
  ],
};

/** Case-study cards reference the three case-study pages; ids are resolved by the seed runner. */
export const caseStudiesHub: SeedPage = {
  title: "Case Studies",
  path: HUB,
  template: "caseStudyHub",
  breadcrumbs: [crumb("Home", "/"), crumb("Case Studies", HUB)],
  seo: {
    metaTitle: "SEO Case Studies & Results | Top Spot Studio",
    metaDescription: "Explore selected SEO case studies from the team behind Top Spot Studio, including organic growth, technical SEO, content and lead-generation results.",
    ogEyebrow: "Selected SEO Work",
    ogHeadline: "SEO Case Studies & Results",
  },
  structuredData: { pageType: "CollectionPage", breadcrumbs: true, faq: false, itemList: true },
  layout: [
    {
      blockType: "collectionHero",
      badge: "Selected SEO work & results",
      title: "SEO Case Studies & Results",
      highlight: "Results",
      lead: "Real SEO work, presented with context. These case studies show how the people behind Top Spot Studio have approached organic growth across different business models, from SaaS and training to influencer marketing.",
      body: "We focus on the starting point, the work completed, the timeframe and the measurable outcome - not isolated screenshots or inflated claims.",
      calloutTitle: "Transparency note",
      calloutBody: md(
        "Top Spot Studio is a new agency. The case studies below are selected projects led or managed by the founders before Top Spot Studio launched. Where a client has not approved public naming, the business is presented anonymously.",
      ),
    },
    {
      blockType: "section",
      anchorId: "featured",
      tone: "base",
      layout: "stacked",
      topSpacing: "reduced",
      header: {
        title: "Featured Case Studies",
        intro: md(
          "Three projects. Three different business models. One common approach: diagnose the real search problem, prioritise the highest-impact work, execute consistently, and measure what changed.",
        ),
      },
      content: [
        { blockType: "caseStudyCards", caseStudies: ["@case:/case-studies/influencer-marketing-agency-seo-growth/", "@case:/case-studies/training-consulting-seo-growth/", "@case:/case-studies/ai-image-editing-seo-growth/"], ctaLabel: "Read the Case Study" },
        { blockType: "buttons", primary: cta("Get a Free SEO Audit", AUDIT), secondary: cta("Talk about your project", "/contact/"), location: "after_cards", spacing: "12" },
      ],
    },
    {
      blockType: "section",
      anchorId: "what-they-show",
      tone: "white",
      layout: "columns",
      header: {
        headingId: "show-title",
        eyebrow: "Approach",
        title: "What These Case Studies Show",
        intro: md(`SEO is rarely one task. The strongest gains usually come from several parts of the search system working together.

{smallMuted} The same thinking runs through our [SEO services](/markets/new-zealand/seo/), [local SEO](/markets/new-zealand/local-seo/), [SEO for tradies](/industries/seo-for-tradies/) and [roofing SEO](/industries/roofing-seo/) work.`),
      },
      columns: { ratio: "0.85-1.15", valign: "start", gap: "default" },
      content: [],
      columnB: [
        {
          blockType: "checkList",
          variant: "check",
          layout: "large",
          items: items([
            "Strategy built around the business model, not a generic checklist.",
            "Keyword research tied to real services, products and commercial intent.",
            "Technical and on-page improvements that make important pages easier to understand and use.",
            "Content planned to build relevance and capture demand over time.",
            "Internal linking and authority work that support priority pages.",
            "Tracking and reporting that connect visibility with meaningful business outcomes where data is available.",
          ]),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "how-we-present",
      tone: "base",
      layout: "stacked",
      header: {
        headingId: "present-title",
        title: "How We Present Results",
        intro: md("A case study should help you understand what happened, not just show a winning chart. Every Top Spot Studio case study should follow the same evidence-led structure:"),
      },
      content: [
        {
          blockType: "numberedGrid",
          items: [
            { title: "Starting point", body: "What the website or search presence looked like before the work began." },
            { title: "Problem", body: "The most important barriers limiting visibility, relevance or conversions." },
            { title: "Work completed", body: "The SEO actions actually delivered - technical, content, on-page, local or authority work." },
            { title: "Timeframe", body: "How long the measured period lasted." },
            { title: "Outcome", body: "What changed in traffic, visibility, engagement or enquiries, with context around the numbers." },
            { title: "Limitations", body: "Anything the data does not prove, including external factors, incomplete attribution or areas outside our control." },
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "context",
      tone: "white",
      layout: "centered",
      centeredWidth: "narrow",
      header: { title: "Results Matter, But Context Matters Too", highlight: "Context" },
      content: [
        {
          blockType: "richText",
          style: "proseCard",
          content: md(`No two SEO projects start from the same place. A large percentage increase from a tiny baseline is different from incremental growth on an established site. A traffic gain is also not the same as a lead or sale.

That is why we show the baseline, timeframe and type of work alongside the result. Where lead or conversion data exists, we include it. Where it does not, we do not pretend that traffic alone proves revenue impact.`),
        },
      ],
    },
    {
      blockType: "ctaBand",
      tone: "navy",
      title: "Want to know what your own biggest SEO opportunities are?",
      primary: cta("Get a Free SEO Audit", AUDIT),
      secondary: cta("Talk about your project", "/contact/"),
      location: "final_cta",
      body: md(
        "Start with a focused audit. We will look at your current search visibility, important pages, competitors and obvious technical or local gaps, then highlight the areas that deserve attention first.",
      ),
    },
  ],
};
