import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowRight, Gauge, HelpCircle, LayoutTemplate, MapPin, Search, UserRound } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HeroShell } from "@/components/sections/HeroBackdrop";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Callout, CheckList, CtaBand, ProcessSteps } from "@/components/sections/Blocks";
import { FaqSection, type FaqItem } from "@/components/sections/FaqList";
import { ContactForm } from "@/components/forms/ContactForm";
import { EmailLink } from "@/components/ui/EmailLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/schema";
import { CONTACT_EMAIL, routes } from "@/lib/site";

const meta = {
  title: "Contact Top Spot Studio | SEO & Web Growth",
  description:
    "Contact Top Spot Studio about SEO, Local SEO or website support. Based in Bangladesh, we work remotely with businesses in New Zealand and beyond.",
  path: routes.contact,
};

export const metadata: Metadata = pageMetadata(meta);

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: routes.contact },
];

const areas = [
  {
    icon: Search,
    title: "SEO",
    body: "Search strategy, keyword targeting, on-page SEO, technical SEO, content direction and performance improvement.",
    link: { label: "SEO services", href: routes.nzSeo },
  },
  {
    icon: MapPin,
    title: "Local SEO",
    body: "Google Business Profile support, local visibility, local landing pages, citations and location-focused SEO.",
    link: { label: "Local SEO", href: routes.nzLocalSeo },
  },
  {
    icon: LayoutTemplate,
    title: "Website Design & Development",
    body: "New service-business websites, page builds, improvements, technical implementation and website support.",
    link: { label: "Web design for tradies", href: routes.webDesign },
  },
  {
    icon: Gauge,
    title: "Website QA & Performance",
    body: "Mobile usability, browser/device testing, page speed, broken functionality and pre-launch checks.",
  },
  {
    icon: HelpCircle,
    title: "Not sure yet",
    body: "Tell us the problem. We can help identify whether it is mainly an SEO, Local SEO or website issue.",
  },
];

const faq: FaqItem[] = [
  {
    q: "Do you only work with businesses in New Zealand?",
    a: "No. New Zealand is an initial focus market, but Top Spot Studio is based in Bangladesh and works remotely. We can discuss projects in other English-speaking markets as well.",
  },
  {
    q: "Do I need to know which service I need before contacting you?",
    a: "No. Tell us what you are trying to improve and what is not working. We can help identify the most relevant next step.",
  },
  {
    q: "Can I request a free SEO audit instead?",
    a: "Yes. If you want feedback before discussing a project, use our Free SEO Audit page. It is a short initial review with key findings and priority actions.",
  },
  {
    q: "Do you need access to my Google Analytics or Search Console before we talk?",
    a: "No. We do not need account access for an initial enquiry. If access would help later, we will explain why before asking for it.",
  },
  {
    q: "Do you guarantee rankings or a specific number of leads?",
    a: "No. We do not promise rankings, traffic or lead volume. SEO results depend on the market, competition, website condition, starting point and the work that can realistically be implemented.",
  },
  {
    q: "Will I be dealing with a salesperson?",
    a: "No separate sales team. Enquiries are reviewed by the founders, and we keep the first conversation focused on whether we can genuinely help.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ type: "ContactPage", path: meta.path, name: meta.title, description: meta.description }),
          breadcrumbSchema(crumbs),
        )}
      />

      <HeroShell>
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="rise-in badge" style={{ "--d": "40ms" } as CSSProperties}>
                <span aria-hidden className="badge-dot" />
                Contact
              </p>
              <h1 className="rise-in mt-6" style={{ "--d": "90ms" } as CSSProperties}>
                Let&apos;s Talk About <span className="text-gradient">Your Business</span>
              </h1>
              <p className="rise-in lead mt-6" style={{ "--d": "160ms" } as CSSProperties}>
                Tell us what you are trying to improve. We’ll read your message ourselves and come back with a clear next
                step.
              </p>
              <p className="rise-in mt-4 font-semibold text-navy" style={{ "--d": "200ms" } as CSSProperties}>
                SEO, Local SEO or website support. No hard sell.
              </p>
              <p className="rise-in mt-8 flex gap-3 rounded-[16px] border border-white/80 bg-white/60 p-4 text-base text-slate backdrop-blur" style={{ "--d": "240ms" } as CSSProperties}>
                <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-teal-ink" />
                <span>Based in Bangladesh. Working remotely with businesses in New Zealand and other international markets.</span>
              </p>
              {CONTACT_EMAIL ? (
                <p className="mt-4">
                  <EmailLink email={CONTACT_EMAIL} />
                </p>
              ) : null}
              <Callout title="Not ready for a project conversation?" className="mt-10">
                <p>
                  Start with our free SEO and website audit instead. We’ll look at your current search presence and
                  website, then highlight the main issues we can see and what we would fix first.
                </p>
                <p>
                  <Link href={routes.audit} className="text-link">
                    Get a Free SEO Audit
                  </Link>
                </p>
              </Callout>
            </div>
            <div id="contact-form" className="rise-in relative scroll-mt-28" style={{ "--d": "220ms" } as CSSProperties}>
              <div aria-hidden className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-teal/25 via-sky/15 to-coral/15 blur-2xl" />
              <div className="relative rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-[var(--shadow-lift)] ring-1 ring-navy/5 backdrop-blur-xl sm:p-10">
              <span aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
              <h2 className="text-2xl md:text-3xl">Tell Us What You Need Help With</h2>
              <p className="mt-3 text-base text-slate">
                You do not need to know exactly which service you need. Give us a little context and we’ll point you in the
                right direction.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
              </div>
            </div>
          </div>
      </HeroShell>

      <Section id="next" labelledBy="next-title" tone="white">
        <SectionHeader
          id="next-title"
          eyebrow="What happens next?"
          title="We keep the first step simple"
        />
        <div className="mt-12">
          <ProcessSteps
            steps={[
              { title: "You send context", body: "You send us a little context about your business and what you need help with." },
              { title: "A founder reviews it", body: "One of the founders reviews the enquiry." },
              { title: "We reply", body: "We reply with the most sensible next step based on what you shared." },
              {
                title: "We discuss fit",
                body: "If the project looks like a good fit, we can discuss scope, priorities and how we would work together.",
              },
            ]}
          />
        </div>
        <p className="mt-10 font-semibold text-navy">No long sales process. No pressure to buy a package that does not fit.</p>
      </Section>

      <Section id="founders" labelledBy="founders-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              id="founders-title"
              title="Founder-Reviewed Enquiries"
              intro={
                <>
                  <p className="font-semibold text-navy">Your message is not passed to a separate sales team.</p>
                  <p>
                    SEO enquiries are usually reviewed by Asif, our Co-Founder &amp; SEO Growth Lead. Website and technical
                    enquiries may also involve Al Amin, our Co-Founder &amp; Web Development &amp; QA Lead.
                  </p>
                  <p>That means the people discussing the work are also close to the work itself.</p>
                </>
              }
            />
            <Link href={routes.about} className="text-link mt-6 inline-block">
              About our team
            </Link>
          </div>
          <ul className="grid gap-4 self-center">
            {[
              { name: "Asif Iqbal Khan", role: "Co-Founder & SEO Growth Lead", note: "SEO and Local SEO enquiries" },
              { name: "Al Amin Sikander", role: "Co-Founder & Web Development & QA Lead", note: "Website and technical enquiries" },
            ].map((p) => (
              <li key={p.name} className="reveal group card card-hover card-fx flex items-start gap-4 p-6">
                <span className="icon-tile">
                  <UserRound aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="font-bold text-navy">{p.name}</p>
                  <p className="text-sm font-semibold text-teal-ink">{p.role}</p>
                  <p className="mt-1 text-sm text-muted">{p.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="topics" labelledBy="topics-title" tone="white">
        <SectionHeader id="topics-title" title="What You Can Contact Us About" />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((a, i) => (
            <li key={a.title} className="reveal" style={{ "--i": i } as CSSProperties}>
              <div className="group card card-hover card-fx flex h-full flex-col bg-gradient-to-br from-white to-offwhite p-7">
                <span className="icon-tile">
                  <a.icon aria-hidden className="size-[22px]" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-xl">{a.title}</h3>
                <p className="mt-2 flex-1 text-base leading-relaxed">{a.body}</p>
                {a.link ? (
                  <Link href={a.link.href} className="mt-5 inline-flex items-center gap-1.5 self-start text-base font-semibold text-teal-ink hover:text-navy">
                    {a.link.label} <ArrowRight aria-hidden className="btn-arrow size-4" />
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="who" labelledBy="who-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              id="who-title"
              title="Who We Work With"
              intro={<p>Top Spot Studio is built for service businesses that want a practical partner for search and website growth.</p>}
            />
            <CheckList
              className="mt-6 text-base"
              items={[
                "Local and service-area businesses.",
                "Tradies and home-service businesses.",
                "Small and growing businesses that need clearer SEO direction.",
                "Teams that need SEO and website implementation to work together.",
              ]}
            />
            <p className="mt-6 text-base text-muted">
              New Zealand is an initial focus market, but we can work remotely with businesses in other countries as well.
            </p>
          </div>
          <div className="reveal surface-deep relative self-center overflow-hidden rounded-[28px] p-8 text-white/80 shadow-[0_40px_80px_-40px_rgb(10_26_46/0.75)] sm:p-10">
            <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
            <div aria-hidden className="orb -right-20 -top-20 size-64 bg-teal/25" />
            <div className="relative">
            <h3 className="text-white">A Small Team by Design</h3>
            <p className="mt-4 text-lg">
              We are a two-person, founder-led studio. That keeps communication direct and makes it easier to connect
              strategy with implementation.
            </p>
            <p className="mt-4 text-lg">
              If we do not think we are the right fit for a project, we would rather say that early than force a service
              that does not make sense.
            </p>
            <Link href={routes.caseStudies} className="group mt-6 inline-flex items-center gap-2 font-semibold text-teal-300 hover:text-white">
              See selected case studies
              <ArrowRight aria-hidden className="btn-arrow size-4" />
            </Link>
            </div>
          </div>
        </div>
      </Section>

      <FaqSection items={faq} />

      <CtaBand
        title="Have a project in mind?"
        primary={{ label: "Send My Enquiry", href: "#contact-form" }}
        secondary={{ label: "Get a Free SEO Audit", href: routes.audit }}
        location="contact_final"
      >
        <p>Tell us what you are working on and where you need help.</p>
      </CtaBand>
    </>
  );
}
