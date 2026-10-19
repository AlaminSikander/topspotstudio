import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import type { Metadata } from "next";
import { CheckCircle2, ClipboardCheck, Lightbulb, MessagesSquare, ShieldOff, LineChart } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Callout, CheckList, CtaBand, EditorialSplit, NumberedCards, ProcessSteps, SplitFeature } from "@/components/sections/Blocks";
import { RemoteDeliveryVisual, RoleSplitDiagram } from "@/components/visuals/Diagrams";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { breadcrumbSchema, graph, ORG_ID, webPageSchema, type Crumb } from "@/lib/schema";
import { routes } from "@/lib/site";

const meta = {
  title: "About Top Spot Studio | SEO & Web Growth Team",
  description:
    "Meet the founders behind Top Spot Studio, a Bangladesh-based SEO and web growth studio helping service businesses in New Zealand and beyond.",
  path: routes.about,
};

export const metadata: Metadata = pageMetadata(meta);

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: routes.about },
];

type Founder = {
  name: string;
  role: string;
  bio: string;
  strengths: string[];
  responsibilities: string[];
  /** Optional approved headshot; the card layout works with or without it. */
  photo?: StaticImageData;
};

const founders: Founder[] = [
  {
    name: "Asif Iqbal Khan",
    role: "Co-Founder & SEO Growth Lead",
    bio: "Asif has more than four years of hands-on SEO experience across strategy, Local SEO, technical SEO, on-page optimization, content planning and performance analysis. Before starting Top Spot Studio, he progressed into an SEO Team Lead role and managed a team of six SEO executives.",
    strengths: [
      "SEO strategy and campaign planning",
      "Local SEO",
      "Technical and on-page SEO",
      "Keyword and competitor research",
      "Content strategy",
      "Analytics, tracking and reporting",
    ],
    responsibilities: [
      "Leads SEO strategy and priorities",
      "Runs audits and research",
      "Plans Local SEO and content work",
      "Leads client communication and reporting",
      "Reviews performance and decides next actions",
    ],
  },
  {
    name: "Al Amin Sikander",
    role: "Co-Founder & Web Development & QA Lead",
    bio: "Al Amin brings more than four years of experience across quality assurance, SEO, website optimization and digital operations. He has a Computer Science & Engineering background and professional experience testing web and mobile applications, supporting technical teams and working on SEO execution.",
    strengths: [
      "Website implementation and optimization",
      "Website QA and usability testing",
      "Cross-browser and cross-device testing",
      "Technical SEO implementation support",
      "Page speed and performance",
      "WordPress and basic HTML/CSS",
    ],
    responsibilities: [
      "Leads website implementation",
      "Checks forms, buttons and user journeys before launch",
      "Handles responsive and cross-browser QA",
      "Supports technical SEO fixes",
      "Maintains and troubleshoots client websites",
      "Supports SEO execution when needed",
    ],
  },
];

function FounderCard({ f }: { f: Founder }) {
  return (
    <article className="reveal group card card-hover card-fx flex h-full flex-col p-7 sm:p-9">
      <header className="flex items-center gap-5">
        {f.photo ? (
          <Image
            src={f.photo}
            alt={`${f.name}, ${f.role}`}
            className="size-20 rounded-[14px] object-cover"
            sizes="80px"
          />
        ) : (
          <span
            aria-hidden
            className="inline-flex size-16 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-teal to-sky font-display text-xl font-bold text-white shadow-[0_14px_30px_-14px_rgb(20_184_166/0.9)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-105"
          >
            {f.name.split(" ")[0][0]}
            {f.name.split(" ").at(-1)?.[0]}
          </span>
        )}
        <div>
          <h3 className="text-2xl">{f.name}</h3>
          <p className="mt-1 font-semibold text-teal-ink">{f.role}</p>
        </div>
      </header>
      <p className="mt-6 text-base leading-relaxed">{f.bio}</p>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Core strengths</h4>
          <CheckList className="mt-4 text-base" items={f.strengths} />
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">At Top Spot Studio</h4>
          <ul className="mt-4 space-y-3 text-base">
            {f.responsibilities.map((r) => (
              <li key={r} className="flex gap-3">
                <CheckCircle2 aria-hidden className="mt-1 size-4 shrink-0 text-teal-ink" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ type: "AboutPage", path: meta.path, name: meta.title, description: meta.description }),
          ...founders.map((f) => ({
            "@type": "Person",
            "@id": `${absoluteUrl(meta.path)}#${f.name.toLowerCase().replace(/\s+/g, "-")}`,
            name: f.name,
            jobTitle: f.role,
            worksFor: { "@id": ORG_ID },
          })),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="About Top Spot Studio"
        title="About Top Spot Studio"
        highlight="Top Spot Studio"
        lead={<p>We are a small, founder-led team focused on SEO, websites and practical growth.</p>}
        body={
          <>
            <p>
              We help service businesses get found in search, improve their websites and turn more of that visibility
              into real enquiries.
            </p>
            <p>
              Top Spot Studio is based in Bangladesh. We work remotely with businesses in New Zealand and other
              international markets.
            </p>
          </>
        }
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        secondary={{ label: "Contact Us", href: routes.contact }}
        media={<RoleSplitDiagram />}
      />

      <Section id="story" labelledBy="story-title" tone="white">
        <EditorialSplit id="story-title" eyebrow="Our story" title="Why we started Top Spot Studio">
          <p className="font-semibold text-navy">We started Top Spot Studio because we kept seeing the same problem.</p>
          <p>Businesses were doing SEO with one team and website work with another. Often, the two sides did not work well together.</p>
          <p>
            A business can rank better and still lose leads because of a weak website. A good-looking website can also
            struggle if people cannot find it on Google.
          </p>
          <p>We wanted to bring both sides together.</p>
          <p>
            Asif focuses on SEO strategy and growth. Al Amin focuses on website development, technical implementation
            and quality.
          </p>
          <p>That is how Top Spot Studio started.</p>
          <p>We keep the team small so communication stays simple and the work stays focused.</p>
          <p className="font-semibold text-navy">No unnecessary services. No unrealistic promises.</p>
          <p>Just practical SEO and website work that helps service businesses get found and generate more enquiries.</p>
        </EditorialSplit>
      </Section>

      <Section id="founder-led" labelledBy="founder-led-title" tone="navy">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 id="founder-led-title">A Founder-Led Way of Working</h2>
          <div className="mt-6 space-y-4 text-lg text-white/80">
            <p>When you work with Top Spot Studio, the people planning the work are also involved in delivering it.</p>
            <p>There is no long chain between the client, an account manager and the people doing the actual work.</p>
            <p>
              That keeps decisions faster. It also makes it easier to explain what we are doing, why we are doing it and
              what needs to happen next.
            </p>
            <p className="font-semibold text-white">
              For us, being a small team is not about doing everything. It is about staying focused on the work we can do
              well.
            </p>
          </div>
        </div>
      </Section>

      <Section id="founders" labelledBy="founders-title">
        <SectionHeader id="founders-title" eyebrow="The team" title="Meet the Founders" />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {founders.map((f) => (
            <FounderCard key={f.name} f={f} />
          ))}
        </div>
        <Callout title="Team structure" className="mt-8">
          <p>
            Asif leads SEO growth. Al Amin leads web implementation and technical quality. They work together where SEO
            and development overlap.
          </p>
        </Callout>
      </Section>

      <Section id="focus" labelledBy="focus-title" tone="white">
        <EditorialSplit id="focus-title" eyebrow="Scope" title="What We Focus On">
          <p>We do not try to be a full-service marketing agency.</p>
          <p>Our work stays around the areas where we can connect search visibility with a stronger website experience.</p>
          <CheckList
            className="text-base"
            items={[
              "SEO strategy and execution",
              "Local SEO",
              "Technical and on-page SEO",
              "Content and keyword strategy",
              "Web design and website implementation",
              "Website QA, performance and maintenance",
            ]}
          />
          <p>
            If a business needs something outside that scope, we would rather be clear about it than sell a service we
            are not built to deliver.
          </p>
        </EditorialSplit>
      </Section>

      <Section id="how" labelledBy="how-title">
        <SectionHeader id="how-title" eyebrow="Process" title="How We Work" />
        <div className="mt-12">
          <ProcessSteps
            steps={[
              { title: "Understand the business", body: "We first look at the services, customers, market, website and current search visibility." },
              {
                title: "Find the biggest opportunities",
                body: "We prioritize the issues and opportunities that can make the most practical difference.",
              },
              { title: "Build a focused plan", body: "The plan connects SEO work with the website changes needed to support it." },
              {
                title: "Implement and check",
                body: "We execute the work, test important website changes and make sure the basics are working properly.",
              },
              {
                title: "Measure and improve",
                body: "We review search, website and enquiry data, then adjust the next actions based on what we learn.",
              },
            ]}
          />
        </div>
      </Section>

      <Section id="values" labelledBy="values-title" tone="white">
        <SectionHeader id="values-title" eyebrow="Values" title="What Matters to Us" />
        <div className="mt-12">
          <NumberedCards
            numbered={false}
            items={[
              {
                title: "Clear communication",
                icon: MessagesSquare,
                body: <p>We keep updates simple. Clients should know what is being worked on and why.</p>,
              },
              {
                title: "Honest reporting",
                icon: LineChart,
                body: <p>We share progress and problems. We do not turn weak numbers into good news.</p>,
              },
              {
                title: "Practical strategy",
                icon: Lightbulb,
                body: <p>We focus on work that has a clear reason behind it, not a long task list for the sake of activity.</p>,
              },
              {
                title: "Quality before launch",
                icon: ClipboardCheck,
                body: (
                  <p>
                    Website changes should work properly. We test important pages, forms and user journeys before calling
                    the work finished.
                  </p>
                ),
              },
              {
                title: "No unrealistic promises",
                icon: ShieldOff,
                body: <p>SEO takes time and results vary. We do not promise rankings that no one can control.</p>,
              },
            ]}
          />
        </div>
      </Section>

      <Section id="experience" labelledBy="experience-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              id="experience-title"
              eyebrow="Track record"
              title="Experience Behind the Studio"
              intro={
                <>
                  <p>Top Spot Studio is a new agency, but the people behind it are not new to SEO and website work.</p>
                  <p>
                    Before the studio launched, we worked on SEO campaigns, website optimization and technical projects for
                    different types of businesses.
                  </p>
                  <p>
                    Selected past work has included campaigns that generated tracked enquiries, increased organic search
                    visibility and grew monthly organic traffic.
                  </p>
                </>
              }
            />
            <Link href={routes.caseStudies} className="text-link mt-6 inline-block">
              View SEO Case Studies &amp; Results
            </Link>
          </div>
          <Callout title="Transparency note" className="self-center">
            <p>
              The case studies on this website show selected work led or managed by the people behind Top Spot Studio
              before the agency launched. Results are shown with context, and client names are kept private where
              permission has not been given.
            </p>
          </Callout>
        </div>
      </Section>

      <Section id="where" labelledBy="where-title" tone="white">
        <SplitFeature media={<RemoteDeliveryVisual />} reverse>
          <SectionHeader
            id="where-title"
            eyebrow="Location"
            title="Where We Work"
            intro={
              <>
                <p className="font-semibold text-navy">Top Spot Studio is based in Bangladesh and works remotely.</p>
                <p>New Zealand is our first main target market, with an initial focus on service businesses and tradies.</p>
                <p>We are not a New Zealand-based agency, and we do not present ourselves as one.</p>
                <p>
                  Remote work lets us support businesses in New Zealand and other international markets while keeping
                  the team lean and communication direct.
                </p>
              </>
            }
          />
          <Link href={routes.nzSeo} className="text-link mt-6 inline-block">
            SEO services for New Zealand businesses
          </Link>
        </SplitFeature>
      </Section>

      <CtaBand
        title="Want to know what we would improve first?"
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        secondary={{ label: "Contact Us", href: routes.contact }}
      >
        <p>If you are not sure where your SEO or website is holding you back, start with a free audit.</p>
        <p>We will look for the clearest opportunities and explain what we would prioritize first.</p>
      </CtaBand>
    </>
  );
}
