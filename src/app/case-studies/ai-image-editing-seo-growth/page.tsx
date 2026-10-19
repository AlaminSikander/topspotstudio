import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/sections/CaseStudyLayout";
import { ComparisonBars } from "@/components/visuals/Diagrams";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, graph, type Crumb } from "@/lib/schema";
import { routes } from "@/lib/site";

const meta = {
  title: "SEO Case Study: 29% Organic Traffic Growth in 4 Months | Top Spot Studio",
  description:
    "See how a content-led SEO strategy helped an AI-powered image-editing platform grow monthly organic visitors from 4,182 to 5,400 in four months while improving visibility for valuable photo-editing keywords.",
  path: routes.caseImageEditing,
};

const h1 = "How an AI Image Editing Platform Grew Organic Traffic by 29% in Four Months";

export const metadata: Metadata = pageMetadata({ ...meta, type: "article" });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Case Studies", path: routes.caseStudies },
  { name: "AI-Powered Image Editing Platform SEO Growth", path: meta.path },
];

export default function ImageEditingCasePage() {
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
        eyebrow="Case study - AI image editing - Content-led SEO"
        title={h1}
        summary="An AI-powered image-editing platform needed a scalable organic-growth system that could build visibility beyond the most competitive head terms in the photo-editing market. Over a four-month period, a content-led SEO program grew monthly organic visitors from 4,182 to 5,400 while improving visibility for commercially relevant topics such as “ghost mannequin” and “automatic clothes editor.”"
        heroMetrics={[
          { value: "29.1%", label: "Organic growth", context: "About +29.1% over four months" },
          { value: "4,182 → 5,400", label: "Monthly organic visitors", context: "Start and end of the measured period" },
          { value: "4 months", label: "Measured period", context: "Content-led SEO program" },
        ]}
        glance={[
          { term: "Client", value: "AI-Powered Image Editing Platform" },
          { term: "Industry", value: "AI-powered image editing / photo-editing SaaS" },
          { term: "Measured period", value: "Four months" },
          { term: "Headline result", value: "Monthly organic visitors increased from 4,182 to 5,400 (about +29.1%)" },
          {
            term: "Core SEO scope",
            value:
              "Topic selection, keyword research, competitor analysis, content production, on-page optimization, promotion and authority building",
          },
        ]}
        challenge={[
          "Photo editing is a competitive category, with established software brands dominating many broad search terms.",
          "The site needed enough topic depth to support consistent publishing without drifting away from the product and audience.",
          "Keyword selection had to balance demand with realistic ranking difficulty rather than chasing only the highest-volume terms.",
          "Organic growth required a repeatable system for research, publishing, distribution and authority building over several months.",
        ]}
        goals={[
          "Grow qualified organic traffic from search.",
          "Find lower-competition, commercially relevant topics around image editing, apparel photography and retail automation.",
          "Create a consistent publishing engine that could build topical depth over time.",
          "Improve visibility for valuable photo-editing queries instead of relying only on broad, highly competitive keywords.",
          "Build authority through useful content, distribution and earned/editorial links.",
        ]}
        work={[
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
        ]}
        resultsIntro="After four months, the campaign had produced measurable organic growth and stronger search visibility in the image-editing niche."
        results={[
          { result: "4,182 → 5,400", metric: "Monthly organic visitors", context: "About +29.1% over four months" },
          { result: "4 months", metric: "Measured growth period", context: "Content-led SEO program" },
          {
            result: "High visibility",
            metric: "Commercially relevant queries",
            context: "Including “ghost mannequin” and “automatic clothes editor”",
          },
          { result: "~4 posts/week", metric: "Publishing cadence", context: "Consistent output across the campaign, excluding vacations" },
        ]}
        resultsVisual={
          <ComparisonBars
            title="Monthly organic visitors"
            rows={[
              {
                label: "Start vs end of the four-month period",
                before: 4182,
                after: 5400,
                beforeLabel: "4,182",
                afterLabel: "5,400",
                change: "≈ +29.1%",
              },
            ]}
            caption="Figures from the platform’s case-study records. Results shown are from a specific historical SEO engagement; past results do not guarantee future performance."
          />
        }
        afterResults={
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="reveal rounded-[20px] border border-line bg-gradient-to-br from-offwhite to-white p-6 sm:p-8">
              <h3>Keyword visibility gains</h3>
              <p className="mt-3 text-base">
                The source case study states that the platform ranked highly for valuable photo-editing keywords including
                “ghost mannequin” and “automatic clothes editor.”
              </p>
            </div>
            <div className="reveal rounded-[20px] border border-line bg-gradient-to-br from-offwhite to-white p-6 sm:p-8">
              <h3>Compounding authority</h3>
              <p className="mt-3 text-base">
                The project notes report that once content began ranking, other publishers increasingly cited it as a
                source. That is an important part of the growth story: useful content began supporting its own authority
                rather than depending entirely on active link outreach.
              </p>
            </div>
          </div>
        }
        whyItWorked={[
          {
            lead: "The campaign chose attainable battles:",
            body: "Instead of targeting only the largest photo-editing keywords, research prioritised topics with a better balance of demand and ranking difficulty.",
          },
          {
            lead: "Publishing was consistent:",
            body: "A repeatable content cadence gave the site enough depth to cover multiple related topics and build relevance over time.",
          },
          {
            lead: "SERP research shaped content quality:",
            body: "Top-ranking pages were reviewed before writing so new articles could add missing detail, freshness and practical value.",
          },
          {
            lead: "Content and authority reinforced each other:",
            body: "Promotion and outreach helped initial discovery, while stronger rankings created opportunities for natural citations and earned links.",
          },
          {
            lead: "The team allowed time for compounding:",
            body: "The case study explicitly emphasises patience: content needed several months to mature before the organic-growth curve became more meaningful.",
          },
        ]}
        takeaway={
          <>
            <p>
              This project shows how a focused content-led SEO strategy can create meaningful growth even in a competitive
              software category. The result did not come from chasing every large keyword. It came from finding realistic
              topic opportunities, publishing consistently, improving content quality against the SERP and allowing
              authority to compound over time.
            </p>
            <p>
              Across four months, monthly organic visitors grew from 4,182 to 5,400 - an increase of about 29.1% - while
              the site strengthened visibility around valuable photo-editing terms.
            </p>
          </>
        }
        transparency="Results shown are from a specific historical SEO engagement led or managed by the people behind Top Spot Studio before the agency launched. SEO outcomes vary depending on the market, competition, website condition, content quality and level of implementation. Past results do not guarantee future performance."
        finalTitle="Could a similar content-led SEO system work for your business?"
        finalBody="The right strategy depends on your market, competition, website and starting point. A focused audit can show whether your biggest opportunity is keyword targeting, content depth, technical SEO, stronger service pages or authority building."
      />
    </>
  );
}
