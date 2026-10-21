import { card, crumb, cta, faq, items, link, md, type SeedPage } from "../helpers";

const AUDIT = "/free-seo-audit/";
const formCta = cta("Get My Free SEO Audit", "#audit-form", "free_audit_cta_click");

export const audit: SeedPage = {
  title: "Free SEO Audit",
  path: AUDIT,
  template: "audit",
  breadcrumbs: [crumb("Home", "/"), crumb("Free SEO Audit", AUDIT)],
  seo: {
    metaTitle: "Free SEO Audit for Service Businesses | Top Spot Studio",
    metaDescription: "Get a free SEO and website audit from Top Spot Studio. We’ll highlight key issues, priority fixes and growth opportunities for your business.",
    ogEyebrow: "Free SEO & Website Audit",
    ogHeadline: "5–7 findings. 3 priorities. No access needed.",
  },
  structuredData: { pageType: "WebPage", breadcrumbs: true, faq: true },
  layout: [
    {
      blockType: "pageHero",
      showBreadcrumbs: true,
      eyebrow: "Free SEO & website audit",
      title: "Get a Free SEO & Website Audit",
      highlight: "SEO & Website Audit",
      lead: md("Not sure what is holding your website back? We’ll take a focused look at your search visibility, website and local presence, then show you what we would fix first."),
      primary: formCta,
      trust: items(["No GA4 or Search Console access needed", "No obligation", "No ranking promises"]),
      mediaType: "visual",
      visual: "AuditChecklistVisual",
      location: "audit_hero",
    },
    {
      blockType: "statStrip",
      label: "What to expect",
      items: [
        { value: "5–7", label: "Key findings" },
        { value: "3", label: "Priority actions" },
        { value: "0", label: "Access required" },
      ],
    },
    {
      blockType: "section",
      anchorId: "what-you-get",
      tone: "base",
      layout: "columns",
      header: {
        headingId: "get-title",
        title: "What You’ll Get",
        intro: md("We keep the free audit focused. You should leave with a clear idea of what matters most, not a long list of random warnings."),
      },
      columns: { ratio: "1-1", valign: "start", gap: "default" },
      content: [],
      columnB: [
        {
          blockType: "checkList",
          variant: "check",
          layout: "card",
          items: items([
            "5–7 useful findings from your website and search presence.",
            "3 priority actions we would tackle first.",
            "A simple explanation of why those issues matter.",
            "A quick view of where we see the strongest opportunity.",
            "An optional next-step conversation if you want help implementing the work.",
          ]),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "what-we-check",
      tone: "white",
      layout: "stacked",
      header: { headingId: "check-title", eyebrow: "Review areas", title: "What We Check" },
      content: [
        {
          blockType: "featureList",
          columns: "3",
          items: [
            card("Search visibility", "Search", "How well your main services and pages are positioned for the searches that matter.", cta("About our SEO services", "/markets/new-zealand/seo/")),
            card("Technical basics", "Gauge", "Indexing, obvious crawl issues, redirects, mobile usability, page speed and other visible technical problems."),
            card("On-page SEO", "FileText", "Titles, headings, page targeting, internal links and whether important service pages are clear to search engines and users."),
            card(
              "Local SEO",
              "MapPin",
              "For local businesses, we’ll review visible local signals such as Google Business Profile presence, location targeting and local landing-page basics.",
              cta("About our local SEO", "/markets/new-zealand/local-seo/"),
            ),
            card("Website & UX", "LayoutTemplate", "We’ll look for obvious issues that may make it harder for visitors to trust the site, find the next step or make an enquiry."),
            card("Competitor context", "Globe2", "We may include one or two quick observations from businesses competing for similar searches. This is not a full competitor audit."),
          ],
        },
        {
          blockType: "callout",
          title: "What this is not",
          tone: "neutral",
          spacing: "12",
          body: md("The free audit is not a full technical crawl, full backlink audit, complete keyword strategy, content plan or implementation project. Those require deeper access and more time."),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "who",
      tone: "base",
      layout: "columns",
      header: {
        title: "Who This Audit Is For",
        intro: md(`This audit is a good fit if you run a service business and want a clearer view of what is stopping your website from performing better.

{smallMuted} We work remotely with service businesses in New Zealand and other international markets.`),
      },
      columns: { ratio: "1-1", valign: "start", gap: "default" },
      content: [],
      columnB: [
        {
          blockType: "checkList",
          variant: "check",
          layout: "large",
          items: items([
            "You are getting some traffic, but not enough enquiries.",
            "You are not sure which SEO problems matter most.",
            "Your website looks fine, but search visibility is weak.",
            "You rely on local customers and want stronger local visibility.",
            "You are planning SEO work and want to know where to start.",
          ]),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "how",
      tone: "white",
      layout: "stacked",
      header: { eyebrow: "Process", title: "How It Works" },
      content: [
        {
          blockType: "processSteps",
          steps: [
            { title: "Send us your website", body: "Complete the short form below. We only need public information to start." },
            { title: "We review the important areas", body: "We look at the site, search visibility and local presence where relevant." },
            { title: "We identify the priorities", body: "We focus on the issues and opportunities that appear most useful for your business." },
            { title: "We send the findings", body: "You receive a personalised summary by email with clear next steps." },
            { title: "You decide what happens next", body: "You can use the findings yourself or talk to us about implementation. There is no obligation." },
          ],
        },
        { blockType: "buttons", primary: formCta, location: "how_it_works", spacing: "12" },
      ],
    },
    {
      blockType: "section",
      anchorId: "why",
      tone: "navy",
      layout: "columns",
      header: { title: "Why Top Spot Studio?", intro: md("SEO and website work often get separated. We built Top Spot Studio to keep them connected.") },
      columns: { ratio: "1-1", valign: "start", gap: "wide" },
      content: [
        {
          blockType: "checkList",
          variant: "check",
          layout: "default",
          spacing: "8",
          items: [
            { text: "SEO strategy and website implementation under one small team." },
            { text: "Founder-led work with direct communication.", linkText: "Founder-led work", link: link("/about/") },
            { text: "Clear priorities instead of long reports full of noise." },
            { text: "No unrealistic ranking or traffic guarantees." },
            { text: "Recommendations shaped around the business, not a one-size-fits-all checklist." },
          ],
        },
      ],
      columnB: [
        {
          blockType: "quote",
          variant: "feature",
          title: "Start With the Biggest Opportunities",
          before: items(["A website can have dozens of SEO issues. That does not mean all of them deserve your attention today.", "Our free audit is designed to answer a simpler question:"]),
          quote: "“What should we fix first?”",
          after: "That is the level of clarity we want the audit to give you.",
        },
      ],
    },
    {
      blockType: "formSection",
      form: "audit",
      anchorId: "audit-form",
      eyebrow: "Free audit request",
      title: "Request Your Free SEO Audit",
      intro: "Tell us a little about your business. We’ll use the information to review the right areas and send the findings to you by email.",
      aside: md(`Want to see how we work first? [View SEO case studies](/case-studies/).

Prefer to ask a question instead? [Contact Top Spot Studio](/contact/).`),
    },
    faq([
      { q: "Is the SEO audit really free?", a: "Yes. The initial audit is free and there is no obligation to buy a service. It is a focused review, not a full paid SEO audit." },
      {
        q: "Do I need to give you Google Analytics or Search Console access?",
        a: "No. We can complete the initial review using public information. If we later work together, deeper access may help with a more complete analysis.",
      },
      {
        q: "What will you check?",
        a: "We may review search visibility, technical basics, on-page SEO, local signals, website usability and a small amount of competitor context. We focus on the areas that appear most relevant to your business.",
      },
      {
        q: "Is this a full technical SEO audit?",
        a: "No. A full audit may require a complete crawl, analytics and Search Console data, backlink analysis, keyword research and deeper investigation. The free audit is designed to identify the most useful starting points.",
      },
      {
        q: "Do you only audit New Zealand businesses?",
        a: "No. New Zealand is one of our main target markets, but Top Spot Studio is based in Bangladesh and works remotely with businesses in other markets too.",
      },
      {
        q: "What happens after I receive the audit?",
        a: "You can use the recommendations yourself. If you want help, we can also discuss the work we would prioritise and whether Top Spot Studio is a good fit.",
      },
      {
        q: "Can you guarantee that the recommendations will improve my rankings?",
        a: "No. SEO results depend on competition, website condition, implementation, search behaviour and many other factors. We do not guarantee rankings or traffic.",
      },
    ]),
    {
      blockType: "ctaBand",
      tone: "navy",
      title: "Not Sure Where to Start?",
      primary: formCta,
      secondary: cta("Contact Us", "/contact/"),
      location: "audit_final",
      body: md("Send us your website. We’ll take a look and show you the issues and opportunities we would prioritise first."),
    },
  ],
};

export const about: SeedPage = {
  title: "About",
  path: "/about/",
  template: "about",
  breadcrumbs: [crumb("Home", "/"), crumb("About", "/about/")],
  seo: {
    metaTitle: "About Top Spot Studio | SEO & Web Growth Team",
    metaDescription: "Meet the founders behind Top Spot Studio, a Bangladesh-based SEO and web growth studio helping service businesses in New Zealand and beyond.",
    ogEyebrow: "About",
    ogHeadline: "A founder-led SEO and web growth studio",
  },
  structuredData: { pageType: "AboutPage", breadcrumbs: true, faq: false, people: true },
  layout: [
    {
      blockType: "pageHero",
      showBreadcrumbs: true,
      eyebrow: "About Top Spot Studio",
      title: "About Top Spot Studio",
      highlight: "Top Spot Studio",
      lead: md("We are a small, founder-led team focused on SEO, websites and practical growth."),
      body: md(`We help service businesses get found in search, improve their websites and turn more of that visibility into real enquiries.

Top Spot Studio is based in Bangladesh. We work remotely with businesses in New Zealand and other international markets.`),
      primary: cta("Get a Free SEO Audit", AUDIT),
      secondary: cta("Contact Us", "/contact/"),
      mediaType: "visual",
      visual: "RoleSplitDiagram",
      location: "hero",
    },
    {
      blockType: "section",
      anchorId: "story",
      tone: "white",
      layout: "editorial",
      header: { eyebrow: "Our story", title: "Why we started Top Spot Studio" },
      content: [
        {
          blockType: "richText",
          content: md(`{emphasis} We started Top Spot Studio because we kept seeing the same problem.

Businesses were doing SEO with one team and website work with another. Often, the two sides did not work well together.

A business can rank better and still lose leads because of a weak website. A good-looking website can also struggle if people cannot find it on Google.

We wanted to bring both sides together.

Asif focuses on SEO strategy and growth. Al Amin focuses on website development, technical implementation and quality.

That is how Top Spot Studio started.

We keep the team small so communication stays simple and the work stays focused.

{emphasis} No unnecessary services. No unrealistic promises.

Just practical SEO and website work that helps service businesses get found and generate more enquiries.`),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "founder-led",
      tone: "navy",
      layout: "centered",
      centeredWidth: "medium",
      header: { title: "A Founder-Led Way of Working" },
      content: [
        {
          blockType: "richText",
          style: "leadLight",
          content: md(`When you work with Top Spot Studio, the people planning the work are also involved in delivering it.

There is no long chain between the client, an account manager and the people doing the actual work.

That keeps decisions faster. It also makes it easier to explain what we are doing, why we are doing it and what needs to happen next.

{emphasis} For us, being a small team is not about doing everything. It is about staying focused on the work we can do well.`),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "founders",
      tone: "base",
      layout: "stacked",
      header: { eyebrow: "The team", title: "Meet the Founders" },
      content: [
        {
          blockType: "founderCards",
          founders: [
            {
              name: "Asif Iqbal Khan",
              role: "Co-Founder & SEO Growth Lead",
              bio: "Asif has more than four years of hands-on SEO experience across strategy, Local SEO, technical SEO, on-page optimization, content planning and performance analysis. Before starting Top Spot Studio, he progressed into an SEO Team Lead role and managed a team of six SEO executives.",
              strengths: items(["SEO strategy and campaign planning", "Local SEO", "Technical and on-page SEO", "Keyword and competitor research", "Content strategy", "Analytics, tracking and reporting"]),
              responsibilities: items([
                "Leads SEO strategy and priorities",
                "Runs audits and research",
                "Plans Local SEO and content work",
                "Leads client communication and reporting",
                "Reviews performance and decides next actions",
              ]),
            },
            {
              name: "Al Amin Sikander",
              role: "Co-Founder & Web Development & QA Lead",
              bio: "Al Amin brings more than four years of experience across quality assurance, SEO, website optimization and digital operations. He has a Computer Science & Engineering background and professional experience testing web and mobile applications, supporting technical teams and working on SEO execution.",
              strengths: items([
                "Website implementation and optimization",
                "Website QA and usability testing",
                "Cross-browser and cross-device testing",
                "Technical SEO implementation support",
                "Page speed and performance",
                "WordPress and basic HTML/CSS",
              ]),
              responsibilities: items([
                "Leads website implementation",
                "Checks forms, buttons and user journeys before launch",
                "Handles responsive and cross-browser QA",
                "Supports technical SEO fixes",
                "Maintains and troubleshoots client websites",
                "Supports SEO execution when needed",
              ]),
            },
          ],
        },
        {
          blockType: "callout",
          title: "Team structure",
          tone: "teal",
          spacing: "8",
          body: md("Asif leads SEO growth. Al Amin leads web implementation and technical quality. They work together where SEO and development overlap."),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "focus",
      tone: "white",
      layout: "editorial",
      header: { eyebrow: "Scope", title: "What We Focus On" },
      content: [
        {
          blockType: "richText",
          content: md(`We do not try to be a full-service marketing agency.

Our work stays around the areas where we can connect search visibility with a stronger website experience.

::checklist
- SEO strategy and execution
- Local SEO
- Technical and on-page SEO
- Content and keyword strategy
- Web design and website implementation
- Website QA, performance and maintenance

If a business needs something outside that scope, we would rather be clear about it than sell a service we are not built to deliver.`),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "how",
      tone: "base",
      layout: "stacked",
      header: { eyebrow: "Process", title: "How We Work" },
      content: [
        {
          blockType: "processSteps",
          steps: [
            { title: "Understand the business", body: "We first look at the services, customers, market, website and current search visibility." },
            { title: "Find the biggest opportunities", body: "We prioritize the issues and opportunities that can make the most practical difference." },
            { title: "Build a focused plan", body: "The plan connects SEO work with the website changes needed to support it." },
            { title: "Implement and check", body: "We execute the work, test important website changes and make sure the basics are working properly." },
            { title: "Measure and improve", body: "We review search, website and enquiry data, then adjust the next actions based on what we learn." },
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "values",
      tone: "white",
      layout: "stacked",
      header: { eyebrow: "Values", title: "What Matters to Us" },
      content: [
        {
          blockType: "numberedCards",
          columns: "3",
          numbered: false,
          items: [
            card("Clear communication", "MessagesSquare", "We keep updates simple. Clients should know what is being worked on and why."),
            card("Honest reporting", "LineChart", "We share progress and problems. We do not turn weak numbers into good news."),
            card("Practical strategy", "Lightbulb", "We focus on work that has a clear reason behind it, not a long task list for the sake of activity."),
            card("Quality before launch", "ClipboardCheck", "Website changes should work properly. We test important pages, forms and user journeys before calling the work finished."),
            card("No unrealistic promises", "ShieldOff", "SEO takes time and results vary. We do not promise rankings that no one can control."),
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "experience",
      tone: "base",
      layout: "columns",
      header: {
        eyebrow: "Track record",
        title: "Experience Behind the Studio",
        intro: md(`Top Spot Studio is a new agency, but the people behind it are not new to SEO and website work.

Before the studio launched, we worked on SEO campaigns, website optimization and technical projects for different types of businesses.

Selected past work has included campaigns that generated tracked enquiries, increased organic search visibility and grew monthly organic traffic.`),
      },
      columns: { ratio: "1-1", valign: "center", gap: "default" },
      content: [{ blockType: "textLink", label: "View SEO Case Studies & Results", link: link("/case-studies/"), style: "text", spacing: "6" }],
      columnB: [
        {
          blockType: "callout",
          title: "Transparency note",
          tone: "teal",
          body: md(
            "The case studies on this website show selected work led or managed by the people behind Top Spot Studio before the agency launched. Results are shown with context, and client names are kept private where permission has not been given.",
          ),
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "where",
      tone: "white",
      layout: "split",
      header: {
        eyebrow: "Location",
        title: "Where We Work",
        intro: md(`{emphasis} Top Spot Studio is based in Bangladesh and works remotely.

New Zealand is our first main target market, with an initial focus on service businesses and tradies.

We are not a New Zealand-based agency, and we do not present ourselves as one.

Remote work lets us support businesses in New Zealand and other international markets while keeping the team lean and communication direct.`),
      },
      split: { mediaType: "visual", visual: "RemoteDeliveryVisual", reverse: true, align: "center" },
      content: [{ blockType: "textLink", label: "SEO services for New Zealand businesses", link: link("/markets/new-zealand/seo/"), style: "text", spacing: "6" }],
    },
    {
      blockType: "ctaBand",
      tone: "navy",
      title: "Want to know what we would improve first?",
      primary: cta("Get a Free SEO Audit", AUDIT),
      secondary: cta("Contact Us", "/contact/"),
      location: "final_cta",
      body: md(`If you are not sure where your SEO or website is holding you back, start with a free audit.

We will look for the clearest opportunities and explain what we would prioritize first.`),
    },
  ],
};

export const contact: SeedPage = {
  title: "Contact",
  path: "/contact/",
  template: "contact",
  breadcrumbs: [crumb("Home", "/"), crumb("Contact", "/contact/")],
  seo: {
    metaTitle: "Contact Top Spot Studio | SEO & Web Growth",
    metaDescription: "Contact Top Spot Studio about SEO, Local SEO or website support. Based in Bangladesh, we work remotely with businesses in New Zealand and beyond.",
    ogEyebrow: "Contact",
    ogHeadline: "Let's Talk About Your Business",
  },
  structuredData: { pageType: "ContactPage", breadcrumbs: true, faq: false },
  layout: [
    {
      blockType: "contactHero",
      badge: "Contact",
      title: "Let's Talk About Your Business",
      highlight: "Your Business",
      lead: "Tell us what you are trying to improve. We’ll read your message ourselves and come back with a clear next step.",
      emphasis: "SEO, Local SEO or website support. No hard sell.",
      locationNote: "Based in Bangladesh. Working remotely with businesses in New Zealand and other international markets.",
      showEmail: true,
      calloutTitle: "Not ready for a project conversation?",
      calloutBody: md(`Start with our free SEO and website audit instead. We’ll look at your current search presence and website, then highlight the main issues we can see and what we would fix first.

[Get a Free SEO Audit](/free-seo-audit/)`),
      formTitle: "Tell Us What You Need Help With",
      formIntro: "You do not need to know exactly which service you need. Give us a little context and we’ll point you in the right direction.",
    },
    {
      blockType: "section",
      anchorId: "next",
      tone: "white",
      layout: "stacked",
      header: { eyebrow: "What happens next?", title: "We keep the first step simple" },
      content: [
        {
          blockType: "processSteps",
          steps: [
            { title: "You send context", body: "You send us a little context about your business and what you need help with." },
            { title: "A founder reviews it", body: "One of the founders reviews the enquiry." },
            { title: "We reply", body: "We reply with the most sensible next step based on what you shared." },
            { title: "We discuss fit", body: "If the project looks like a good fit, we can discuss scope, priorities and how we would work together." },
          ],
        },
        { blockType: "richText", spacing: "10", content: md("{emphasis} No long sales process. No pressure to buy a package that does not fit.") },
      ],
    },
    {
      blockType: "section",
      anchorId: "founders",
      tone: "base",
      layout: "columns",
      header: {
        title: "Founder-Reviewed Enquiries",
        intro: md(`{emphasis} Your message is not passed to a separate sales team.

SEO enquiries are usually reviewed by Asif, our Co-Founder & SEO Growth Lead. Website and technical enquiries may also involve Al Amin, our Co-Founder & Web Development & QA Lead.

That means the people discussing the work are also close to the work itself.`),
      },
      columns: { ratio: "1-1", valign: "center", gap: "default" },
      content: [{ blockType: "textLink", label: "About our team", link: link("/about/"), style: "text", spacing: "6" }],
      columnB: [
        {
          blockType: "personCards",
          people: [
            { name: "Asif Iqbal Khan", role: "Co-Founder & SEO Growth Lead", note: "SEO and Local SEO enquiries" },
            { name: "Al Amin Sikander", role: "Co-Founder & Web Development & QA Lead", note: "Website and technical enquiries" },
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "topics",
      tone: "white",
      layout: "stacked",
      header: { title: "What You Can Contact Us About" },
      content: [
        {
          blockType: "iconCards",
          items: [
            { icon: "Search", title: "SEO", body: "Search strategy, keyword targeting, on-page SEO, technical SEO, content direction and performance improvement.", cta: cta("SEO services", "/markets/new-zealand/seo/") },
            { icon: "MapPin", title: "Local SEO", body: "Google Business Profile support, local visibility, local landing pages, citations and location-focused SEO.", cta: cta("Local SEO", "/markets/new-zealand/local-seo/") },
            {
              icon: "LayoutTemplate",
              title: "Website Design & Development",
              body: "New service-business websites, page builds, improvements, technical implementation and website support.",
              cta: cta("Web design for tradies", "/industries/web-design-for-tradies/"),
            },
            { icon: "Gauge", title: "Website QA & Performance", body: "Mobile usability, browser/device testing, page speed, broken functionality and pre-launch checks." },
            { icon: "HelpCircle", title: "Not sure yet", body: "Tell us the problem. We can help identify whether it is mainly an SEO, Local SEO or website issue." },
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "who",
      tone: "base",
      layout: "columns",
      header: { title: "Who We Work With", intro: md("Top Spot Studio is built for service businesses that want a practical partner for search and website growth.") },
      columns: { ratio: "1-1", valign: "center", gap: "default" },
      content: [
        {
          blockType: "checkList",
          variant: "check",
          layout: "default",
          spacing: "6",
          items: items([
            "Local and service-area businesses.",
            "Tradies and home-service businesses.",
            "Small and growing businesses that need clearer SEO direction.",
            "Teams that need SEO and website implementation to work together.",
          ]),
        },
        { blockType: "richText", spacing: "6", content: md("{smallMuted} New Zealand is an initial focus market, but we can work remotely with businesses in other countries as well.") },
      ],
      columnB: [
        {
          blockType: "card",
          variant: "deep",
          title: "A Small Team by Design",
          body: md(`We are a two-person, founder-led studio. That keeps communication direct and makes it easier to connect strategy with implementation.

If we do not think we are the right fit for a project, we would rather say that early than force a service that does not make sense.`),
          link: cta("See selected case studies", "/case-studies/"),
        },
      ],
    },
    faq([
      {
        q: "Do you only work with businesses in New Zealand?",
        a: "No. New Zealand is an initial focus market, but Top Spot Studio is based in Bangladesh and works remotely. We can discuss projects in other English-speaking markets as well.",
      },
      { q: "Do I need to know which service I need before contacting you?", a: "No. Tell us what you are trying to improve and what is not working. We can help identify the most relevant next step." },
      { q: "Can I request a free SEO audit instead?", a: "Yes. If you want feedback before discussing a project, use our Free SEO Audit page. It is a short initial review with key findings and priority actions." },
      {
        q: "Do you need access to my Google Analytics or Search Console before we talk?",
        a: "No. We do not need account access for an initial enquiry. If access would help later, we will explain why before asking for it.",
      },
      {
        q: "Do you guarantee rankings or a specific number of leads?",
        a: "No. We do not promise rankings, traffic or lead volume. SEO results depend on the market, competition, website condition, starting point and the work that can realistically be implemented.",
      },
      { q: "Will I be dealing with a salesperson?", a: "No separate sales team. Enquiries are reviewed by the founders, and we keep the first conversation focused on whether we can genuinely help." },
    ]),
    {
      blockType: "ctaBand",
      tone: "navy",
      title: "Have a project in mind?",
      primary: cta("Send My Enquiry", "#contact-form"),
      secondary: cta("Get a Free SEO Audit", AUDIT),
      location: "contact_final",
      body: md("Tell us what you are working on and where you need help."),
    },
  ],
};

/** Blog goal cards reference categories by slug; ids are resolved by the seed runner. */
export const blogHub: SeedPage = {
  title: "Blog",
  path: "/blog/",
  template: "blogHub",
  breadcrumbs: [crumb("Home", "/"), crumb("Blog", "/blog/")],
  seo: {
    metaTitle: "SEO & Web Growth Blog | Top Spot Studio",
    metaDescription: "Practical SEO, Local SEO and website advice for service businesses. Learn how to improve search visibility, local reach and website performance.",
    ogEyebrow: "Blog",
    ogHeadline: "Practical SEO & Web Growth Advice for Service Businesses",
  },
  structuredData: { pageType: "Blog", breadcrumbs: true, faq: false },
  layout: [
    {
      blockType: "collectionHero",
      badge: "Blog",
      title: "Practical SEO & Web Growth Advice for Service Businesses",
      highlight: "Service Businesses",
      lead: "Clear guides on SEO, Local SEO and websites. Built for service businesses that want more visibility, better websites and more qualified enquiries.",
      body: "No filler. No ranking promises. Just practical advice you can understand and use.",
      bodyEmphasis: true,
    },
    {
      blockType: "section",
      anchorId: "topics",
      tone: "white",
      layout: "stacked",
      header: { eyebrow: "Explore", title: "What You’ll Find" },
      content: [
        {
          blockType: "numberedCards",
          columns: "4",
          numbered: false,
          items: [
            card("SEO", "Search", "Keyword research, on-page SEO, technical basics and practical growth decisions."),
            card("Local SEO", "MapPin", "Google Business Profile, Maps visibility and local search advice for service businesses."),
            card("Tradie Growth", "Hammer", "SEO and website guidance for trades and home-service businesses."),
            card("Websites", "LayoutTemplate", "Website structure, usability, performance and conversion-focused improvements."),
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "goals",
      tone: "base",
      layout: "stacked",
      header: { title: "Start With the Guides That Match Your Goal", intro: md("Not sure where to begin? Pick the area closest to the problem you are trying to solve.") },
      content: [
        {
          blockType: "blogGoals",
          goals: [
            {
              title: "Get Found in Local Search",
              body: "Learn how Google Business Profile, local relevance, service pages and website signals work together to improve local visibility.",
              category: "@category:local-seo",
              emptyLabel: "Local SEO guides",
            },
            {
              title: "Improve Your Website’s SEO",
              body: "Understand the changes that help search engines crawl, understand and rank your website more effectively.",
              category: "@category:seo",
              emptyLabel: "SEO guides",
            },
            {
              title: "Build a Better Tradie Website",
              body: "See what service-business websites need to build trust, explain services clearly and turn more visits into enquiries.",
              category: "@category:websites",
              emptyLabel: "Website guides",
            },
          ],
        },
      ],
    },
    {
      blockType: "section",
      anchorId: "latest",
      tone: "white",
      layout: "stacked",
      header: { title: "Latest Guides", contentSpacing: "10" },
      content: [
        {
          blockType: "latestPosts",
          limit: 12,
          emptyTitle: "Our first guides are on the way",
          emptyBody: "We only publish guides that are genuinely useful. Until they are ready, these pages explain how we approach each area.",
          emptyLinks: [
            { label: "SEO services", link: link("/markets/new-zealand/seo/") },
            { label: "Local SEO support", link: link("/markets/new-zealand/local-seo/") },
            { label: "SEO for tradies", link: link("/industries/seo-for-tradies/") },
            { label: "Roofing SEO services", link: link("/industries/roofing-seo/") },
            { label: "Web design for tradies", link: link("/industries/web-design-for-tradies/") },
          ],
        },
      ],
    },
    {
      blockType: "ctaBand",
      tone: "navy",
      title: "Need Advice Specific to Your Website?",
      primary: cta("Get My Free SEO Audit", AUDIT),
      secondary: cta("Contact Top Spot Studio", "/contact/"),
      location: "blog_hub",
      body: md(`A guide can point you in the right direction. Your website may still have its own technical, local or content issues.

We can review the site and show you what we would fix first.`),
    },
  ],
};

export const privacy: SeedPage = {
  title: "Privacy Policy",
  path: "/privacy-policy/",
  template: "legal",
  breadcrumbs: [crumb("Home", "/"), crumb("Privacy Policy", "/privacy-policy/")],
  seo: {
    metaTitle: "Privacy Policy | Top Spot Studio",
    metaDescription: "How Top Spot Studio collects, uses and protects information submitted through this website.",
    ogEyebrow: "Privacy",
    ogHeadline: "Privacy Policy",
  },
  structuredData: { pageType: "WebPage", breadcrumbs: true, faq: false },
  layout: [
    {
      blockType: "legalHero",
      badge: "Legal",
      title: "Privacy Policy",
      lastUpdated: "19 October 2026",
      showNotice: "untilApproved",
      notice: md("This policy is being finalised and may be updated before the website is formally launched."),
    },
    {
      blockType: "legalBody",
      content: md(`This policy explains how Top Spot Studio (“we”, “us”) handles personal information collected through this website. Top Spot Studio is a founder-led SEO and web growth studio based in Bangladesh, working remotely with businesses in New Zealand and other international markets.

## Information we collect

We only collect the information you choose to give us, plus limited technical data needed to run the website.

- **Free SEO Audit form:** your name, work email, website address, business type, primary service, location or service area, main goal and any extra notes you add.
- **Contact form:** your name, business name, work email, phone number (optional), website address, location or service area, the services you are interested in, your message and how you heard about us.
- **Technical data:** our hosting provider records standard server logs (such as IP address, browser type and pages requested) to keep the website secure and working.

We do not ask for passwords, account logins or access to your Google Analytics, Search Console or website through these forms.

## How we use your information

- To review your website and send you the free audit you requested.
- To reply to your enquiry and discuss whether we can help.
- To keep reasonable records of our conversations with prospective and current clients.
- To protect the website against spam and misuse.

We will not add you to a marketing list without your permission, and we do not sell your personal information.

## Who we share it with

We use a small number of service providers to run this website and deliver form submissions:

- **Vercel** hosts the website.
- **Resend** delivers form submissions to our business inbox by email.

These providers may store or process information outside Bangladesh and New Zealand, including in the United States. We only share what is needed for them to provide their service.

## How long we keep it

We keep enquiry and audit emails for as long as we need them to respond, provide any services you ask for and maintain reasonable business records. You can ask us to delete your information at any time.

## Your choices and rights

You can ask to access the personal information we hold about you, ask us to correct it, or ask us to delete it. If you are in New Zealand, you also have rights under the Privacy Act 2020, including the right to complain to the Office of the Privacy Commissioner.

## Security

The website uses HTTPS, and form submissions are sent over encrypted connections. No method of transmission or storage is completely secure, but we take reasonable steps to protect the information you share with us.

## Contact us about privacy

To make a privacy request or ask a question about this policy, use our [contact form](/contact/).

## Changes to this policy

We may update this policy as our website or services change. The date at the top shows when it was last updated.`),
    },
  ],
};
