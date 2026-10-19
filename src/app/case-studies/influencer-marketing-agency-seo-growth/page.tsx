import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/sections/CaseStudyLayout";
import { InfluencerComparison } from "@/components/sections/ProofSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, graph, type Crumb } from "@/lib/schema";
import { routes } from "@/lib/site";

const meta = {
  title: "SEO Case Study: 99 Leads for an Influencer Marketing Agency | Top Spot Studio",
  description:
    "See how an SEO strategy improved search visibility, keyword rankings, engagement and generated 99 leads for a Malaysian influencer marketing agency.",
  path: routes.caseInfluencer,
};

const h1 = "How SEO Helped a Malaysian Influencer Marketing Agency Grow Search Visibility and Generate 99 Leads";

export const metadata: Metadata = pageMetadata({ ...meta, type: "article" });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Case Studies", path: routes.caseStudies },
  { name: "Malaysian Influencer Marketing Agency", path: meta.path },
];

const rankings = [
  "influencer marketing agency",
  "influencer marketing agency malaysia",
  "influencer marketing malaysia",
  "kol agency malaysia",
];

export default function InfluencerCasePage() {
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
        eyebrow="Case study • Influencer marketing • Malaysia"
        title={h1}
        summary="A focused SEO program combined keyword strategy, technical improvements, on-page optimization, content and performance monitoring to strengthen search visibility in a competitive influencer-marketing niche. During the project period, the business generated 99 tracked form leads while improving clicks, impressions, rankings and engagement."
        heroMetrics={[
          { value: "99", label: "Tracked form leads", context: "Generated during the project period" },
          { value: "+31.2%", label: "Google Search clicks", context: "869 → 1,140 in the comparison period" },
          { value: "+88.0%", label: "Search impressions", context: "32.6K → 61.3K" },
          { value: "4", label: "Priority #1 rankings", context: "December 2024 reporting snapshot" },
        ]}
        glance={[
          { term: "Industry", value: "Influencer marketing agency" },
          { term: "Market", value: "Malaysia" },
          { term: "Engagement window", value: "Approximately 7 months for the main comparison period" },
          {
            term: "Core scope",
            value:
              "Keyword research, technical SEO, on-page optimization, content, internal linking, performance monitoring and coordinated off-page support",
          },
        ]}
        challenge={[
          "Search visibility was limited relative to the opportunity in the Malaysian influencer-marketing market.",
          "Important commercial and niche-relevant keywords had room to improve.",
          "Website content and several technical elements needed stronger optimization.",
          "The project needed to connect visibility growth with measurable business outcomes, not rankings alone.",
        ]}
        goals={[
          "Increase organic visibility and qualified search traffic.",
          "Improve rankings for priority influencer-marketing terms.",
          "Strengthen on-page relevance and technical health.",
          "Build a content system around user intent and industry topics.",
          "Generate measurable organic enquiries through the website.",
        ]}
        work={[
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
        ]}
        resultsIntro="The campaign improved both search visibility and measurable business outcomes. The figures below are taken from the project’s internal Google Search Console, Google Analytics and SEO reporting records."
        results={[
          { result: "99", metric: "Tracked form leads", context: "Generated during the project period" },
          { result: "1,140", metric: "Google Search clicks", context: "Up from 869 in the comparison period (+31.2%)" },
          { result: "61.3K", metric: "Google Search impressions", context: "Up from 32.6K (+88.0%)" },
          { result: "20.2", metric: "Average Google position", context: "Improved from 22.5" },
          { result: "1m 37s", metric: "Average engagement time", context: "Reported as +220.7% improvement" },
        ]}
        resultsVisual={<InfluencerComparison />}
        afterResults={
          <div className="reveal rounded-[20px] border border-line bg-gradient-to-br from-offwhite to-white p-6 sm:p-8">
            <h3>Priority keyword wins</h3>
            <p className="mt-2 text-base">
              At the December 2024 reporting snapshot, several high-value terms had reached the top position:
            </p>
            <table className="mt-5 w-full max-w-xl text-left text-base">
              <thead>
                <tr className="border-b border-line text-sm text-muted">
                  <th scope="col" className="py-2 font-semibold">Keyword</th>
                  <th scope="col" className="py-2 text-right font-semibold">Position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rankings.map((k) => (
                  <tr key={k}>
                    <td className="py-3 text-navy">{k}</td>
                    <td className="py-3 text-right font-brand font-semibold text-teal-ink">#1</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
        whyItWorked={[
          {
            lead: "Commercial relevance first:",
            body: "The work focused on queries and pages connected to the agency’s actual services rather than chasing traffic for its own sake.",
          },
          {
            lead: "Content supported the money pages:",
            body: "Supporting articles expanded topical depth and created internal-linking opportunities back to commercially important pages.",
          },
          {
            lead: "Technical and content work moved together:",
            body: "Search performance was not treated as a content-only problem. Technical issues, on-page relevance and crawlability were addressed alongside publishing.",
          },
          {
            lead: "Performance data shaped the next actions:",
            body: "Search Console and Analytics data were used to identify what was improving and where further optimization was needed.",
          },
        ]}
        takeaway={
          <p>
            This project shows what can happen when keyword research, technical SEO, on-page optimization, content and
            measurement are treated as one connected system. The result was not only stronger visibility in search, but
            also measurable lead generation and better positioning for commercially important terms.
          </p>
        }
        transparency="This work was completed before Top Spot Studio was launched. It reflects SEO work led or managed by the people behind Top Spot Studio, not work delivered under the Top Spot Studio brand. Results vary by market, competition, website condition and starting point."
        finalTitle="Want to understand where your own search visibility is being held back?"
        finalBody="Start with a focused SEO audit and we’ll identify the highest-impact opportunities worth addressing first."
      />
    </>
  );
}
