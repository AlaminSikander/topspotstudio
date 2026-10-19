import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowRight, Hammer, LayoutTemplate, MapPin, Search } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HeroShell } from "@/components/sections/HeroBackdrop";
import { Section, SectionHeader } from "@/components/sections/Section";
import { CtaBand, NumberedCards } from "@/components/sections/Blocks";
import { PostCard } from "@/components/sections/PostCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { posts, type BlogCategory } from "@/content/blog";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, ORG_ID, type Crumb } from "@/lib/schema";
import { BLOG_ENABLED, routes } from "@/lib/site";

const meta = {
  title: "SEO & Web Growth Blog | Top Spot Studio",
  description:
    "Practical SEO, Local SEO and website advice for service businesses. Learn how to improve search visibility, local reach and website performance.",
  path: routes.blog,
};

// The hub stays noindex until at least three approved articles are live and the blog flag is enabled.
export const metadata: Metadata = pageMetadata({ ...meta, noindex: !BLOG_ENABLED || posts.length < 3 });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Blog", path: routes.blog },
];

const goals: { title: string; body: string; category: BlogCategory; label: string }[] = [
  {
    title: "Get Found in Local Search",
    body: "Learn how Google Business Profile, local relevance, service pages and website signals work together to improve local visibility.",
    category: "Local SEO",
    label: "Local SEO guides",
  },
  {
    title: "Improve Your Website’s SEO",
    body: "Understand the changes that help search engines crawl, understand and rank your website more effectively.",
    category: "SEO",
    label: "SEO guides",
  },
  {
    title: "Build a Better Tradie Website",
    body: "See what service-business websites need to build trust, explain services clearly and turn more visits into enquiries.",
    category: "Websites",
    label: "Website guides",
  },
];

const commercialLinks = [
  { label: "SEO services", href: routes.nzSeo },
  { label: "Local SEO support", href: routes.nzLocalSeo },
  { label: "SEO for tradies", href: routes.tradies },
  { label: "Roofing SEO services", href: routes.roofing },
  { label: "Web design for tradies", href: routes.webDesign },
];

export default function BlogHub() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "Blog",
            "@id": `${absoluteUrl(meta.path)}#blog`,
            url: absoluteUrl(meta.path),
            name: meta.title,
            description: meta.description,
            publisher: { "@id": ORG_ID },
            inLanguage: "en-NZ",
          },
          breadcrumbSchema(crumbs),
        )}
      />

      <HeroShell innerClassName="pb-16 pt-8 md:pb-24 md:pt-10">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-[880px]">
            <p className="rise-in badge" style={{ "--d": "40ms" } as CSSProperties}>
              <span aria-hidden className="badge-dot" />
              Blog
            </p>
            <h1 className="rise-in mt-6" style={{ "--d": "90ms" } as CSSProperties}>
              Practical SEO &amp; Web Growth Advice for <span className="text-gradient">Service Businesses</span>
            </h1>
            <p className="rise-in lead mt-6" style={{ "--d": "160ms" } as CSSProperties}>
              Clear guides on SEO, Local SEO and websites. Built for service businesses that want more visibility, better
              websites and more qualified enquiries.
            </p>
            <p className="rise-in mt-4 font-semibold text-navy" style={{ "--d": "220ms" } as CSSProperties}>
              No filler. No ranking promises. Just practical advice you can understand and use.
            </p>
          </div>
      </HeroShell>

      <Section id="topics" labelledBy="topics-title" tone="white">
        <SectionHeader id="topics-title" eyebrow="Explore" title="What You’ll Find" />
        <div className="mt-12">
          <NumberedCards
            columns={4}
            numbered={false}
            items={[
              { title: "SEO", icon: Search, body: <p>Keyword research, on-page SEO, technical basics and practical growth decisions.</p> },
              {
                title: "Local SEO",
                icon: MapPin,
                body: <p>Google Business Profile, Maps visibility and local search advice for service businesses.</p>,
              },
              { title: "Tradie Growth", icon: Hammer, body: <p>SEO and website guidance for trades and home-service businesses.</p> },
              {
                title: "Websites",
                icon: LayoutTemplate,
                body: <p>Website structure, usability, performance and conversion-focused improvements.</p>,
              },
            ]}
          />
        </div>
      </Section>

      <Section id="goals" labelledBy="goals-title">
        <SectionHeader
          id="goals-title"
          title="Start With the Guides That Match Your Goal"
          intro={<p>Not sure where to begin? Pick the area closest to the problem you are trying to solve.</p>}
        />
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {goals.map((g) => {
            const matches = posts.filter((p) => p.category === g.category).slice(0, 3);
            return (
              <li key={g.title} className="reveal group card card-hover card-fx flex flex-col p-7">
                <h3 className="text-xl">{g.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed">{g.body}</p>
                {matches.length ? (
                  <ul className="mt-5 space-y-2 border-t border-line pt-4">
                    {matches.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/blog/${p.slug}/`} className="text-link text-base">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 border-t border-line pt-4 text-sm text-muted">{g.label} are being prepared.</p>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="latest" labelledBy="latest-title" tone="white">
        <SectionHeader id="latest-title" title="Latest Guides" />
        {posts.length ? (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="reveal surface-tint mt-10 grid gap-8 rounded-[24px] border border-teal/20 p-6 sm:p-10 lg:grid-cols-2">
            <div>
              <h3>Our first guides are on the way</h3>
              <p className="mt-3 text-base">
                We only publish guides that are genuinely useful. Until they are ready, these pages explain how we approach
                each area.
              </p>
            </div>
            <ul className="space-y-3">
              {commercialLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group flex items-center justify-between gap-3 border-b border-line pb-3 font-semibold text-navy hover:text-teal-ink">
                    {l.label}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <CtaBand
        title="Need Advice Specific to Your Website?"
        primary={{ label: "Get My Free SEO Audit", href: routes.audit }}
        secondary={{ label: "Contact Top Spot Studio", href: routes.contact }}
        location="blog_hub"
      >
        <p>A guide can point you in the right direction. Your website may still have its own technical, local or content issues.</p>
        <p>We can review the site and show you what we would fix first.</p>
      </CtaBand>
    </>
  );
}
