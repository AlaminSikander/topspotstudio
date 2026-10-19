import type { Metadata } from "next";
import { Callout, MetricGrid } from "@/components/sections/Blocks";
import { CaseStudyLayout } from "@/components/sections/CaseStudyLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, graph, type Crumb } from "@/lib/schema";
import { routes } from "@/lib/site";

const meta = {
  title: "SEO Case Study: +182% Google Clicks for a Training & Consulting Business | Top Spot Studio",
  description:
    "See how SEO increased Google clicks by 182.4%, expanded search visibility to 165K+ impressions and generated 4,379 organic page views for a training and consulting business.",
  path: routes.caseConsulting,
};

const h1 = "How SEO Increased Google Clicks by 182% for a Training & Consulting Business";

export const metadata: Metadata = pageMetadata({ ...meta, type: "article" });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Case Studies", path: routes.caseStudies },
  { name: "Training & Consulting Business", path: meta.path },
];

export default function ConsultingCasePage() {
  return (
    <>
      <JsonLd
        data={graph(
          articleSchema({ path: meta.path, headline: h1, description: meta.description }),
          breadcrumbSchema(crumbs),
        )}
      />
      <CaseStudyLayout
        crumbs={crumbs}
        eyebrow="Case study - Training & consulting - Organic search"
        title={h1}
        summary="A six-month SEO program combined technical cleanup, keyword strategy, on-page optimization, content publishing, internal linking and performance tracking to expand organic visibility for a training and consulting business. From April to September 2025, the site recorded 514 Google Search clicks, 165,113 impressions and 4,379 Google organic page views while technical site health reached 90%."
        heroMetrics={[
          { value: "+182.4%", label: "Google Search clicks", context: "514 clicks, April–September 2025" },
          { value: "165K+", label: "Search impressions", context: "165,113 (+3,258%)" },
          { value: "4,379", label: "Google organic page views", context: "April–September 2025" },
          { value: "90%", label: "Technical site health", context: "Reported at the end of the period" },
        ]}
        glance={[
          { term: "Industry", value: "Training, consulting and professional development" },
          { term: "Engagement window", value: "April to September 2025" },
          {
            term: "Audience focus",
            value: "Professionals and organisations interested in training, consulting, service delivery and industry frameworks",
          },
          {
            term: "Core SEO scope",
            value: "Technical SEO, audit, keyword research, on-page optimization, content, internal linking and performance tracking",
          },
          { term: "Measurement", value: "Google Analytics, Google Search Console and technical site-health reporting" },
        ]}
        challenge={[
          "The website needed a stronger SEO foundation so search engines could crawl, understand and surface more of its training and consulting content.",
          "Target services and thought-leadership topics needed clearer keyword mapping and on-page relevance.",
          "Content had to reach audiences searching for practical guidance around service delivery, frameworks, coaching and organisational improvement.",
          "The project needed a measurable system for tracking search visibility, traffic quality and technical progress over time.",
        ]}
        goals={[
          "Increase qualified visibility across Google Search.",
          "Grow clicks and impressions for relevant non-brand search queries.",
          "Improve technical site health and crawlability.",
          "Create content around high-value training and consulting topics.",
          "Build stronger internal connections between service, framework and educational pages.",
        ]}
        work={[
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
        ]}
        resultsIntro="By the end of the April-to-September reporting period, the site had achieved substantial growth in search visibility and traffic. The figures below come directly from the project's reporting records."
        results={[
          { result: "514", metric: "Google Search clicks", context: "+182.4% versus the comparison period" },
          { result: "165,113", metric: "Google Search impressions", context: "+3,258% versus the comparison period" },
          { result: "4,379", metric: "Google organic page views", context: "Second-largest documented traffic source" },
          { result: "3,071", metric: "Total users", context: "3,048 were new users" },
          { result: "90%", metric: "Technical site health", context: "Reported at the end of the period" },
        ]}
        resultsVisual={
          <figure className="surface-deep relative overflow-hidden rounded-[28px] p-6 text-white shadow-[0_40px_80px_-40px_rgb(10_26_46/0.75)] sm:p-8">
            <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
            <div aria-hidden className="orb -right-16 -top-16 size-56 bg-teal/25" />
            <p className="eyebrow relative !text-teal-300">Growth versus the comparison period</p>
            <div className="relative mt-5">
              <MetricGrid
                tone="navy"
                metrics={[
                  { value: "+182.4%", label: "Google Search clicks", context: "514 clicks" },
                  { value: "+3,258%", label: "Google Search impressions", context: "165,113 impressions" },
                ]}
              />
            </div>
            <figcaption className="relative mt-5 text-sm text-white/65">
              April–September 2025 reporting period. Percentages are reproduced from the source report; baseline figures
              are not shown.
            </figcaption>
          </figure>
        }
        afterResults={
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="reveal rounded-[20px] border border-line bg-gradient-to-br from-offwhite to-white p-6 sm:p-8">
              <h3>Content performance highlights</h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-base">
                <li>The site’s most popular page in the report attracted 838 users.</li>
                <li>
                  An ITIL best-practices article attracted 731 new users, showing strong search demand around the
                  client&apos;s specialist knowledge.
                </li>
                <li>
                  Other ITIL-focused articles and the downloads page also attracted meaningful new-user activity,
                  supporting the decision to keep building topic depth around the client&apos;s expertise.
                </li>
              </ul>
            </div>
            <Callout title="A transparent look at the remaining opportunity" tone="neutral">
              <p>
                Visibility expanded much faster than clicks. The report showed CTR at 0.31% and an average position of
                55.78, even though average position had improved by 21.6%. That means the site was appearing for far
                more searches, but much of that new visibility was still outside the highest-click positions. We would
                present this as strong early-stage visibility growth, not as blanket first-page dominance.
              </p>
            </Callout>
          </div>
        }
        whyItWorked={[
          {
            lead: "The foundation came first:",
            body: "Technical setup, crawlability and measurement were addressed before relying on content alone.",
          },
          {
            lead: "Keyword research was connected to real pages:",
            body: "Target terms were mapped to service and educational content instead of being treated as a disconnected keyword list.",
          },
          {
            lead: "Content matched the client's expertise:",
            body: "Educational topics around service management and ITIL aligned with what the audience was already searching for.",
          },
          {
            lead: "Reporting exposed both wins and weaknesses:",
            body: "The team could see visibility growth, organic engagement and technical progress while also identifying CTR and ranking depth as the next optimisation opportunities.",
          },
        ]}
        takeaway={
          <p>
            This project shows how a structured SEO program can create a much larger search footprint for a specialised
            training and consulting business. In six months, search clicks rose by 182.4%, impressions expanded to more
            than 165,000 and organic Google traffic became a major source of website activity. Just as importantly, the
            data made the next growth constraint clear: converting broader visibility into stronger rankings and a higher
            click-through rate.
          </p>
        }
        transparency="This work was completed before Top Spot Studio was launched. It reflects SEO work led or managed by the people behind Top Spot Studio, not work delivered under the Top Spot Studio brand. Results vary by business, market, website condition, competition and starting point."
        finalTitle="Want to know which SEO issues are limiting your own visibility?"
        finalBody="Start with a focused audit and we will identify the highest-impact opportunities worth addressing first."
      />
    </>
  );
}
