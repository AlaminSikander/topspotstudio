import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Quote, Search } from "lucide-react";
import rooferImg from "@/assets/photos/roofer-working-on-roof.jpg";
import electricianImg from "@/assets/photos/electrician-switchboard.jpg";
import roofTilesImg from "@/assets/photos/roof-tiles-installation.jpg";
import landscaperImg from "@/assets/photos/landscaper-trimming-lawn.jpg";
import { HeroShell } from "@/components/sections/HeroBackdrop";
import { TrustLine } from "@/components/sections/PageHero";
import { Marquee } from "@/components/sections/Marquee";
import { Section, SectionHeader } from "@/components/sections/Section";
import { CheckList, CtaBand, NumberedCards, ProcessSteps, SplitFeature } from "@/components/sections/Blocks";
import { FaqSection } from "@/components/sections/FaqList";
import { ProofSection } from "@/components/sections/ProofSection";
import { CtaLink } from "@/components/ui/CtaLink";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { HeroPathCard, RemoteDeliveryVisual, SearchJourney } from "@/components/visuals/Diagrams";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeFaq, homeMeta, homeProcess, homeServices, homeWhy, serviceFitLinks } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { faqSchema, graph, webPageSchema } from "@/lib/schema";
import { routes } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ ...homeMeta, path: "/" });

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const whoWeHelp = [
  {
    title: "Tradies",
    image: electricianImg,
    alt: "Electrician working inside an open switchboard with a cordless drill",
    body: "Customers often search when they already need a service. We help tradies build stronger search visibility and make it easier for potential customers to take the next step.",
    cta: { label: "SEO for Tradies", href: routes.tradies },
  },
  {
    title: "Roofing Companies",
    image: roofTilesImg,
    alt: "Roof tiles being laid in rows on timber battens",
    tag: "Initial specialist focus",
    body: "Roofing is our initial specialist focus. From roof repairs and reroofing to location-based search demand, we help roofing businesses create stronger visibility around the services customers are actively looking for.",
    cta: { label: "SEO for Roofing Companies", href: routes.roofing },
  },
  {
    title: "Service Businesses",
    image: landscaperImg,
    alt: "Landscaper in safety gear trimming grass along a park path",
    body: "Our wider approach can support other service-led businesses where local search, trust and a strong website directly influence customer acquisition. As Top Spot Studio grows, we will expand into additional industries where our systems and experience can create genuine value.",
  },
];

const marqueeItems = [
  "SEO",
  "Local SEO",
  "Web Design",
  "Technical SEO",
  "On-page SEO",
  "Google Business Profile",
  "Service-page strategy",
  "Content planning",
  "Conversion tracking",
  "Website QA",
];

const seoScope = ["Keyword research", "Technical SEO", "On-page", "Service pages", "Internal linking", "Tracking"];

function HomeHeroVisual() {
  return (
    <div className="rise-in relative mx-auto w-full max-w-[520px] lg:ml-auto lg:mr-4" style={d(220)}>
      <div aria-hidden className="absolute -inset-10 rounded-full bg-gradient-to-tr from-teal/30 via-sky/20 to-coral/20 blur-3xl" />
      <div className="relative" data-parallax="0.05">
        <ResponsiveImage
          src={rooferImg}
          alt="Roofer in a hard hat working on a pitched roof"
          ratio="4/5"
          priority
          rounded="rounded-[32px]"
          className="shadow-[0_40px_90px_-30px_rgb(0_0_0/0.7)] [&>div]:ring-1 [&>div]:ring-white/15"
          sizes="(min-width: 1024px) 520px, 90vw"
          position="50% 40%"
        />
      </div>

      <div aria-hidden className="absolute -left-4 top-8 sm:-left-12">
        <div className="scale-in" style={d(650)}>
          <div className="glass animate-float flex items-center gap-3 rounded-[18px] px-4 py-3">
            <span className="flex -space-x-2">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-teal to-sky text-xs font-bold text-white ring-2 ring-white">
                AK
              </span>
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-700 text-xs font-bold text-white ring-2 ring-white">
                AS
              </span>
            </span>
            <span>
              <span className="block text-sm font-bold text-navy">Founder-led</span>
              <span className="block text-xs text-muted">Strategy &amp; build, one team</span>
            </span>
          </div>
        </div>
      </div>

      <div aria-hidden className="absolute -right-3 top-[38%] hidden sm:block lg:-right-10">
        <div className="scale-in" style={d(850)}>
          <div className="glass animate-float-slow flex items-center gap-2.5 rounded-full py-2 pl-3 pr-5 [animation-delay:-3s]">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-teal-soft text-teal-ink">
              <Search className="size-3.5" />
            </span>
            <span className="text-sm font-semibold text-navy">roofer near me</span>
            <span className="h-4 w-px animate-pulse bg-teal" />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 left-4 right-4 sm:-left-10 sm:right-auto sm:w-72">
        <div className="scale-in" style={d(500)}>
          <div className="animate-float-slow [animation-delay:-5s]">
            <HeroPathCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [seo, ...otherServices] = homeServices;
  const SeoIcon = seo.icon!;
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/", name: homeMeta.title, description: homeMeta.description }),
          faqSchema(homeFaq),
        )}
      />

      <HeroShell tone="dark" innerClassName="pt-10 md:pt-16">
        <div className="grid items-center gap-20 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-24">
          <div>
            <p className="rise-in badge badge-dark" style={d(40)}>
              <span aria-hidden className="badge-dot" />
              SEO + Web Growth for Service Businesses
            </p>
            <h1 className="rise-in mt-7 text-[clamp(2.75rem,1.5rem+4.6vw,5.25rem)] text-white" style={d(100)}>
              SEO &amp; Web Growth for <span className="text-gradient-light">Service Businesses</span>
            </h1>
            <div className="rise-in mt-7 max-w-[600px] space-y-4" style={d(180)}>
              <p className="text-lg text-white/85 md:text-xl">
                Top Spot Studio helps service businesses improve their visibility in search, build better-performing
                websites, and turn more local searches into qualified enquiries.
              </p>
              <p className="text-white/60">
                From SEO strategy and Google visibility to websites designed around real customer actions, we focus on
                the work that helps your business get found, build trust, and create more opportunities to grow.
              </p>
            </div>
            <div className="rise-in mt-10 flex flex-col gap-3 sm:flex-row" style={d(260)}>
              <CtaLink href={routes.audit} location="hero" arrow>
                Get a Free SEO Audit
              </CtaLink>
              <CtaLink href={routes.caseStudies} variant="light" location="hero_secondary">
                See Our Work
              </CtaLink>
            </div>
            <div className="rise-in mt-9" style={d(340)}>
              <TrustLine
                tone="dark"
                items={["Founder-led", "SEO + Web under one roof", "Working remotely with businesses in New Zealand and beyond"]}
              />
            </div>
          </div>
          <HomeHeroVisual />
        </div>
        <div className="fade-in -mx-5 border-t border-white/10 sm:-mx-8" style={d(600)}>
          <Marquee items={marqueeItems} label="Services we work across" />
        </div>
      </HeroShell>

      <Section id="problem" labelledBy="problem-title" tone="white">
        <SplitFeature media={<SearchJourney />}>
          <SectionHeader
            id="problem-title"
            eyebrow="The real problem"
            title={
              <>
                Getting found is only the <span className="text-gradient">first step</span>
              </>
            }
            intro={
              <>
                <p className="font-display text-xl font-semibold text-navy md:text-2xl">
                  More visibility is useful only when it leads to something meaningful.
                </p>
                <p>
                  Your business may have a website and Google presence, yet still miss enquiries because priority
                  services are hard to find, local relevance is weak, or the next action is unclear.
                </p>
                <p>
                  You may be losing opportunities because your important services are difficult to find in search,
                  your local visibility is weak, your website does not clearly communicate why customers should choose
                  you, or visitors simply do not know what to do next.
                </p>
                <p>
                  We bring SEO, Local SEO and website experience together so the right pages are easier to discover and
                  act on.
                </p>
              </>
            }
          />
        </SplitFeature>
      </Section>

      <Section id="services" labelledBy="services-title">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="services-title"
            eyebrow="What we help with"
            title="Practical SEO and web solutions built around growth"
            intro={
              <p>
                We keep our services focused. No oversized digital marketing packages filled with work your business
                does not need.
              </p>
            }
          />
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <article className="reveal group card-dark card-hover card-fx surface-navy relative flex flex-col overflow-hidden p-8 text-white/75 sm:p-10 lg:row-span-2">
            <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
            <SeoIcon
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -right-8 size-64 text-white/[0.04] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110"
              strokeWidth={1}
            />
            <div className="relative flex items-start justify-between">
              <span className="icon-tile icon-tile-dark size-14">
                <SeoIcon aria-hidden className="size-6" strokeWidth={1.75} />
              </span>
              <span aria-hidden className="font-display text-sm font-semibold tracking-[0.2em] text-white/40">
                01
              </span>
            </div>
            <h3 className="relative mt-8 text-3xl text-white md:text-4xl">{seo.title}</h3>
            <div className="relative mt-4 max-w-md flex-1 space-y-3 text-base leading-relaxed [&_.text-muted]:text-white/60">
              {seo.body}
            </div>
            <ul className="relative mt-8 flex flex-wrap gap-2">
              {seoScope.map((s) => (
                <li key={s} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-white/80">
                  {s}
                </li>
              ))}
            </ul>
            {seo.cta ? (
              <Link href={seo.cta.href} className="btn btn-light relative mt-9 min-h-12 self-start">
                {seo.cta.label}
                <ArrowRight aria-hidden className="btn-arrow size-4" />
              </Link>
            ) : null}
          </article>
          {otherServices.map((s, i) => {
            const Icon = s.icon!;
            return (
              <article
                key={s.title}
                className="reveal group card card-hover card-fx flex flex-col p-8 sm:p-9"
                style={{ "--i": i + 1 } as CSSProperties}
              >
                <div className="flex items-start justify-between">
                  <span className="icon-tile">
                    <Icon aria-hidden className="size-[22px]" strokeWidth={1.75} />
                  </span>
                  <span aria-hidden className="font-display text-sm font-semibold tracking-[0.2em] text-muted/60">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl">{s.title}</h3>
                <div className="mt-3 flex-1 space-y-3 text-base leading-relaxed">{s.body}</div>
                {s.cta ? (
                  <Link href={s.cta.href} className="mt-6 inline-flex items-center gap-2 self-start font-semibold text-teal-ink hover:text-navy">
                    {s.cta.label}
                    <ArrowRight aria-hidden className="btn-arrow size-4" />
                  </Link>
                ) : null}
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="who-we-help" labelledBy="who-title" tone="white">
        <SectionHeader
          id="who-title"
          eyebrow="Who we help"
          title="Built for businesses that win customers through trust and visibility"
          intro={
            <p>
              Top Spot Studio is designed around the needs of service businesses — companies where being visible at the
              right moment can turn a search into a call, quote request or enquiry.
            </p>
          }
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {whoWeHelp.map((w, i) => (
            <li key={w.title} className="reveal" style={{ "--i": i } as CSSProperties}>
              <div className="group card card-hover card-fx flex h-full flex-col p-3">
                <div className="relative">
                  <ResponsiveImage
                    src={w.image}
                    alt={w.alt}
                    ratio="4/3"
                    rounded="rounded-[14px]"
                    sizes="(min-width: 768px) 380px, 100vw"
                  />
                  {w.tag ? (
                    <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-teal-ink">
                      {w.tag}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                  <h3>{w.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed">{w.body}</p>
                  {w.cta ? (
                    <Link href={w.cta.href} className="mt-5 inline-flex items-center gap-2 self-start text-base font-semibold text-teal-ink hover:text-navy">
                      {w.cta.label}
                      <ArrowRight aria-hidden className="btn-arrow size-4" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="reveal surface-tint relative mt-14 overflow-hidden rounded-[24px] border border-teal/20 p-6 sm:p-9">
          <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 [mask-image:linear-gradient(90deg,transparent,#000)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h3 className="text-xl md:text-2xl">Start with the service that fits your goal</h3>
            <ul className="flex flex-wrap gap-2.5">
              {serviceFitLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2.5 text-[0.95rem] font-semibold text-navy shadow-[0_4px_14px_-10px_rgb(15_39_66/0.4)] transition-[border-color,color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-teal hover:text-teal-ink hover:shadow-[0_10px_24px_-12px_rgb(20_184_166/0.6)]"
                  >
                    {l.label}
                    <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="market" labelledBy="market-title">
        <SplitFeature media={<RemoteDeliveryVisual />} reverse>
          <SectionHeader
            id="market-title"
            eyebrow="Current market focus"
            title="Helping New Zealand businesses compete in search"
            intro={
              <>
                <p className="font-semibold text-navy">New Zealand is our first core international market.</p>
                <p>
                  We work remotely with businesses across New Zealand, helping them improve organic visibility,
                  strengthen local search performance and build websites that support customer acquisition.
                </p>
                <p>
                  Our location does not change the way we approach the work. Research, strategy, implementation,
                  tracking and communication are handled directly by the people working on your project.
                </p>
              </>
            }
          />
          <Link href={routes.nzSeo} className="group mt-7 inline-flex items-center gap-2 font-semibold text-teal-ink hover:text-navy">
            Explore SEO Services for New Zealand Businesses
            <ArrowRight aria-hidden className="btn-arrow size-4" />
          </Link>
        </SplitFeature>
      </Section>

      <Section id="why" labelledBy="why-title" tone="navy">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader
              id="why-title"
              tone="navy"
              eyebrow="Why Top Spot Studio"
              title="A smaller team. A more focused way of working."
              intro={
                <>
                  <p className="font-semibold text-white">Top Spot Studio is a two-person, founder-led SEO and web studio.</p>
                  <p>
                    That means you are not passed through layers of salespeople, account managers and disconnected
                    delivery teams. The people discussing your strategy are also closely involved in the work.
                  </p>
                </>
              }
            />
            <figure className="reveal glass-dark relative mt-10 rounded-[22px] p-7" style={{ "--i": 1 } as CSSProperties}>
              <Quote aria-hidden className="size-8 text-teal-300" />
              <blockquote className="mt-4 font-display text-2xl font-semibold leading-snug text-white">
                No unnecessary services. No unrealistic promises.
              </blockquote>
              <figcaption className="mt-4 text-sm text-white/60">From the Top Spot Studio founders’ story</figcaption>
            </figure>
            <Link href={routes.about} className="group mt-8 inline-flex items-center gap-2 font-semibold text-teal-300 hover:text-white">
              Meet our founders
              <ArrowRight aria-hidden className="btn-arrow size-4" />
            </Link>
          </div>
          <NumberedCards items={homeWhy} columns={2} tone="navy" numbered={false} />
        </div>
      </Section>

      <Section id="process" labelledBy="process-title">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="process-title"
            eyebrow="How we work"
            title="A straightforward process from problem to progress"
          />
          <div className="reveal shrink-0">
            <CtaLink href={routes.audit} location="process" arrow>
              Start With a Free Audit
            </CtaLink>
          </div>
        </div>
        <div className="mt-16">
          <ProcessSteps steps={homeProcess} />
        </div>
      </Section>

      <ProofSection
        title="Experience backed by real SEO results"
        intro={
          <>
            <p>
              Top Spot Studio is a new agency. The results below come from SEO engagements undertaken by people behind
              the studio before its launch, not from Top Spot Studio client engagements.
            </p>
            <p>
              The figures shown below relate to an anonymised Malaysian influencer marketing agency, not to a New
              Zealand roofing client.{" "}
              <Link href={routes.caseInfluencer} className="text-link">
                See the anonymised Malaysian Influencer Marketing Agency SEO case study
              </Link>{" "}
              for the reporting period and methodology.
            </p>
          </>
        }
        note={
          <p>
            Search Console impressions increased by 88.0% in the same documented comparison. These figures describe one
            historical project; they are not a forecast or an agency performance guarantee.
          </p>
        }
      />

      <CtaBand
        id="audit"
        tone="tint"
        eyebrow="Free SEO Audit"
        title="Not sure what is holding your visibility back?"
        primary={{ label: "Get My Free SEO Audit", href: routes.audit }}
        location="audit_section"
        aside={
          <div className="glass rounded-[22px] p-7">
            <p className="font-display text-lg font-semibold text-navy">Your audit may look at:</p>
            <CheckList
              className="mt-5 text-base"
              items={[
                "Website search visibility",
                "Local presence",
                "Important service pages",
                "Google Business Profile opportunities",
                "Technical issues",
                "Competitors and conversion gaps",
              ]}
            />
          </div>
        }
      >
        <p className="font-semibold text-navy">Start with a focused audit.</p>
        <p>
          We will review your website and search presence and identify a small number of high-impact issues or
          opportunities worth looking at first.
        </p>
        <p>No 50-page automated report. No pressure to buy a package.</p>
        <p>Just a clearer picture of where your business currently stands and what may be worth improving.</p>
        <p className="text-base">Tell us about your business and we’ll review where the strongest opportunities may be.</p>
      </CtaBand>

      <FaqSection items={homeFaq} />

      <CtaBand
        title="Ready to see where your biggest opportunities are?"
        primary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        secondary={{ label: "Contact Top Spot Studio", href: routes.contact }}
      >
        <p>You do not need another generic marketing package.</p>
        <p>
          You need to know what is stopping the right customers from finding your business — and what is worth fixing
          first.
        </p>
        <p className="font-semibold text-white">Start with a Free SEO Audit</p>
        <p>We’ll review your current visibility and highlight the opportunities that deserve attention.</p>
      </CtaBand>
    </>
  );
}
