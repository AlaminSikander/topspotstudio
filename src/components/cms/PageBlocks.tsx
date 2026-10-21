import type { CSSProperties, ReactNode } from "react";
import { MapPin, Search } from "lucide-react";
import { AuditForm } from "@/components/forms/AuditForm";
import { ContactForm } from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Callout, CheckList, CtaBand, EditorialSplit, MetricGrid, SplitFeature } from "@/components/sections/Blocks";
import { CaseStudyLayout } from "@/components/sections/CaseStudyLayout";
import { FaqSection } from "@/components/sections/FaqList";
import { Highlight, HeroShell } from "@/components/sections/HeroBackdrop";
import { Marquee } from "@/components/sections/Marquee";
import { PageHero, TrustLine } from "@/components/sections/PageHero";
import { ProofSection } from "@/components/sections/ProofSection";
import { Section, SectionHeader, type Tone } from "@/components/sections/Section";
import { CtaLink } from "@/components/ui/CtaLink";
import { EmailLink } from "@/components/ui/EmailLink";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { ComparisonBars, HeroPathCard } from "@/components/visuals/Diagrams";
import type { Page, SiteSetting } from "@/payload-types";
import { resolveHref } from "@/lib/cms/links";
import { CONTACT_EMAIL, PRIVACY_APPROVED } from "@/lib/site";
import { ContentBlocks, type ContentBlock } from "./ContentBlocks";
import { RichText, hasRichText } from "./RichText";
import { Visual } from "./registry";
import { ctaOf, imageOf, textList, type RenderCtx } from "./shared";

export type PageBlock = NonNullable<Page["layout"]>[number];
type Of<T extends PageBlock["blockType"]> = Extract<PageBlock, { blockType: T }>;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function HomeHero({ b, ctx }: { b: Of<"homeHero">; ctx: RenderCtx }) {
  const primary = ctaOf(b.primary, ctx.paths);
  const secondary = ctaOf(b.secondary, ctx.paths);
  const img = imageOf(b.image);
  const chip = b.founderChip;
  return (
    <HeroShell tone="dark" innerClassName="pt-10 md:pt-16">
      <div className="grid items-center gap-20 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-24">
        <div>
          {b.badge ? (
            <p className="rise-in badge badge-dark" style={d(40)}>
              <span aria-hidden className="badge-dot" />
              {b.badge}
            </p>
          ) : null}
          <h1 className="rise-in mt-7 text-[clamp(2.75rem,1.5rem+4.6vw,5.25rem)] text-white" style={d(100)}>
            <Highlight text={b.title} highlight={b.highlight ?? undefined} className="text-gradient-light" />
          </h1>
          <div className="rise-in mt-7 max-w-[600px] space-y-4" style={d(180)}>
            <p className="text-lg text-white/85 md:text-xl">{b.lead}</p>
            {b.body ? <p className="text-white/60">{b.body}</p> : null}
          </div>
          <div className="rise-in mt-10 flex flex-col gap-3 sm:flex-row" style={d(260)}>
            {primary ? (
              <CtaLink href={primary.href} event={primary.event} location="hero" arrow>
                {primary.label}
              </CtaLink>
            ) : null}
            {secondary ? (
              <CtaLink href={secondary.href} event={secondary.event} variant="light" location="hero_secondary">
                {secondary.label}
              </CtaLink>
            ) : null}
          </div>
          {b.trust?.length ? (
            <div className="rise-in mt-9" style={d(340)}>
              <TrustLine tone="dark" items={textList(b.trust)} />
            </div>
          ) : null}
        </div>
        <div className="rise-in relative mx-auto w-full max-w-[520px] lg:ml-auto lg:mr-4" style={d(220)}>
          <div aria-hidden className="absolute -inset-10 rounded-full bg-gradient-to-tr from-teal/30 via-sky/20 to-coral/20 blur-3xl" />
          <div className="relative" data-parallax="0.05">
            {img ? (
              <ResponsiveImage
                src={img.src}
                alt={img.alt}
                ratio="4/5"
                priority
                rounded="rounded-[32px]"
                className="shadow-[0_40px_90px_-30px_rgb(0_0_0/0.7)] [&>div]:ring-1 [&>div]:ring-white/15"
                sizes="(min-width: 1024px) 520px, 90vw"
                position={img.position ?? "50% 40%"}
              />
            ) : null}
          </div>
          {chip?.title ? (
            <div aria-hidden className="absolute -left-4 top-8 sm:-left-12">
              <div className="scale-in" style={d(650)}>
                <div className="glass animate-float flex items-center gap-3 rounded-[18px] px-4 py-3">
                  <span className="flex -space-x-2">
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-teal to-sky text-xs font-bold text-white ring-2 ring-white">
                      {chip.initialsA}
                    </span>
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-700 text-xs font-bold text-white ring-2 ring-white">
                      {chip.initialsB}
                    </span>
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-navy">{chip.title}</span>
                    <span className="block text-xs text-muted">{chip.subtitle}</span>
                  </span>
                </div>
              </div>
            </div>
          ) : null}
          {b.searchChip ? (
            <div aria-hidden className="absolute -right-3 top-[38%] hidden sm:block lg:-right-10">
              <div className="scale-in" style={d(850)}>
                <div className="glass animate-float-slow flex items-center gap-2.5 rounded-full py-2 pl-3 pr-5 [animation-delay:-3s]">
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-teal-soft text-teal-ink">
                    <Search className="size-3.5" />
                  </span>
                  <span className="text-sm font-semibold text-navy">{b.searchChip}</span>
                  <span className="h-4 w-px animate-pulse bg-teal" />
                </div>
              </div>
            </div>
          ) : null}
          <div className="absolute -bottom-10 left-4 right-4 sm:-left-10 sm:right-auto sm:w-72">
            <div className="scale-in" style={d(500)}>
              <div className="animate-float-slow [animation-delay:-5s]">
                <HeroPathCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      {b.marquee?.length ? (
        <div className="fade-in -mx-5 border-t border-white/10 sm:-mx-8" style={d(600)}>
          <Marquee items={textList(b.marquee)} label={b.marqueeLabel || "Services we work across"} />
        </div>
      ) : null}
    </HeroShell>
  );
}

function PageHeroRenderer({ b, ctx }: { b: Of<"pageHero">; ctx: RenderCtx }) {
  let media: ReactNode = undefined;
  if (b.mediaType === "image") {
    const img = imageOf(b.image);
    const narrow = b.mediaFrame === "narrow";
    if (img) {
      const image = (
        <ResponsiveImage
          src={img.src}
          alt={img.alt}
          ratio={(b.image?.ratio as "4/3") ?? "4/3"}
          priority
          frame
          sizes={narrow ? "(min-width: 1024px) 500px, 90vw" : "(min-width: 1024px) 540px, 100vw"}
          position={img.position}
        />
      );
      media = narrow ? <div className="mx-auto max-w-[500px] lg:ml-auto">{image}</div> : image;
    }
  } else if (b.mediaType === "visual") {
    media = b.mediaFrame === "inset" ? <div className="pb-8 pr-2 sm:pr-6"><Visual name={b.visual} /></div> : <Visual name={b.visual} />;
  }
  return (
    <PageHero
      breadcrumbs={b.showBreadcrumbs !== false && ctx.crumbs.length ? ctx.crumbs : undefined}
      eyebrow={b.eyebrow ?? undefined}
      title={b.title}
      highlight={b.highlight ?? undefined}
      lead={<RichText value={b.lead} paths={ctx.paths} />}
      body={hasRichText(b.body) ? <RichText value={b.body} paths={ctx.paths} /> : undefined}
      primary={ctaOf(b.primary, ctx.paths)}
      secondary={ctaOf(b.secondary, ctx.paths)}
      trust={b.trust?.length ? textList(b.trust) : undefined}
      media={media}
      location={b.location || "hero"}
    />
  );
}

function CollectionHero({ b, ctx }: { b: Of<"collectionHero">; ctx: RenderCtx }) {
  const title = (
    <h1 className="rise-in mt-6" style={d(90)}>
      <Highlight text={b.title} highlight={b.highlight ?? undefined} />
    </h1>
  );
  const badge = b.badge ? (
    <p className="rise-in badge" style={d(40)}>
      <span aria-hidden className="badge-dot" />
      {b.badge}
    </p>
  ) : null;
  if (b.calloutTitle) {
    return (
      <HeroShell innerClassName="pb-16 pt-8 md:pb-20 md:pt-10">
        {ctx.crumbs.length ? <Breadcrumbs items={ctx.crumbs} /> : null}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            {badge}
            {title}
            <p className="rise-in lead mt-6 max-w-[680px]" style={d(160)}>
              {b.lead}
            </p>
            {b.body ? (
              <p className="rise-in mt-4 max-w-[680px]" style={d(210)}>
                {b.body}
              </p>
            ) : null}
          </div>
          <div className="rise-in" style={d(260)}>
            <Callout title={b.calloutTitle}>
              <RichText value={b.calloutBody} paths={ctx.paths} />
            </Callout>
          </div>
        </div>
      </HeroShell>
    );
  }
  return (
    <HeroShell innerClassName="pb-16 pt-8 md:pb-24 md:pt-10">
      {ctx.crumbs.length ? <Breadcrumbs items={ctx.crumbs} /> : null}
      <div className="mt-10 max-w-[880px]">
        {badge}
        {title}
        <p className="rise-in lead mt-6" style={d(160)}>
          {b.lead}
        </p>
        {b.body ? (
          <p className={`rise-in mt-4 ${b.bodyEmphasis ? "font-semibold text-navy" : ""}`} style={d(220)}>
            {b.body}
          </p>
        ) : null}
      </div>
    </HeroShell>
  );
}

function ContactHero({ b, ctx }: { b: Of<"contactHero">; ctx: RenderCtx }) {
  const email = ctx.settings.contactEmail || CONTACT_EMAIL;
  return (
    <HeroShell>
      {ctx.crumbs.length ? <Breadcrumbs items={ctx.crumbs} /> : null}
      <div className="mt-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          {b.badge ? (
            <p className="rise-in badge" style={d(40)}>
              <span aria-hidden className="badge-dot" />
              {b.badge}
            </p>
          ) : null}
          <h1 className="rise-in mt-6" style={d(90)}>
            <Highlight text={b.title} highlight={b.highlight ?? undefined} />
          </h1>
          <p className="rise-in lead mt-6" style={d(160)}>
            {b.lead}
          </p>
          {b.emphasis ? (
            <p className="rise-in mt-4 font-semibold text-navy" style={d(200)}>
              {b.emphasis}
            </p>
          ) : null}
          {b.locationNote ? (
            <p className="rise-in mt-8 flex gap-3 rounded-[16px] border border-white/80 bg-white/60 p-4 text-base text-slate backdrop-blur" style={d(240)}>
              <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-teal-ink" />
              <span>{b.locationNote}</span>
            </p>
          ) : null}
          {b.showEmail !== false && email ? (
            <p className="mt-4">
              <EmailLink email={email} />
            </p>
          ) : null}
          {b.calloutTitle ? (
            <Callout title={b.calloutTitle} className="mt-10">
              <RichText value={b.calloutBody} paths={ctx.paths} />
            </Callout>
          ) : null}
        </div>
        <div id="contact-form" className="rise-in relative scroll-mt-28" style={d(220)}>
          <div aria-hidden className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-teal/25 via-sky/15 to-coral/15 blur-2xl" />
          <div className="relative rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-[var(--shadow-lift)] ring-1 ring-navy/5 backdrop-blur-xl sm:p-10">
            <span aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
            <h2 className="text-2xl md:text-3xl">{b.formTitle}</h2>
            {b.formIntro ? <p className="mt-3 text-base text-slate">{b.formIntro}</p> : null}
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </HeroShell>
  );
}

function LegalHero({ b, ctx }: { b: Of<"legalHero">; ctx: RenderCtx }) {
  const showNotice = b.showNotice === "always" || (b.showNotice !== "never" && !PRIVACY_APPROVED);
  return (
    <HeroShell innerClassName="pb-14 pt-8 md:pb-16 md:pt-10">
      {ctx.crumbs.length ? <Breadcrumbs items={ctx.crumbs} /> : null}
      <div className="mx-auto mt-10 max-w-[760px]">
        {b.badge ? (
          <p className="rise-in badge">
            <span aria-hidden className="badge-dot" />
            {b.badge}
          </p>
        ) : null}
        <h1 className="rise-in mt-6 [--d:80ms]">{b.title}</h1>
        {b.lastUpdated ? <p className="rise-in mt-4 text-muted [--d:140ms]">Last updated: {b.lastUpdated}</p> : null}
        {showNotice && hasRichText(b.notice) ? (
          <Callout className="mt-6" tone="neutral">
            <RichText value={b.notice} paths={ctx.paths} />
          </Callout>
        ) : null}
      </div>
    </HeroShell>
  );
}

const GRID_RATIO: Record<string, string> = {
  "1-1": "lg:grid-cols-2",
  "0.9-1.1": "lg:grid-cols-[0.9fr_1.1fr]",
  "0.85-1.15": "lg:grid-cols-[0.85fr_1.15fr]",
  "0.8-1.2": "lg:grid-cols-[0.8fr_1.2fr]",
  "1.1-0.9": "lg:grid-cols-[1.1fr_0.9fr]",
};

function SectionRenderer({ b, ctx: parent }: { b: Of<"section">; ctx: RenderCtx }) {
  const tone = (b.tone ?? "base") as Tone;
  const ctx = { ...parent, tone };
  const h = b.header;
  const headingId = h?.headingId || `${b.anchorId}-title`;
  const hasHeader = Boolean(h?.title);
  const richTone = tone === "navy" ? "dark" : "light";
  const header = hasHeader ? (
    <SectionHeader
      id={headingId}
      eyebrow={h?.eyebrow ?? undefined}
      tone={tone}
      align={h?.align === "center" ? "center" : "left"}
      title={<Highlight text={h!.title!} highlight={h?.highlight ?? undefined} />}
      intro={hasRichText(h?.intro) ? <RichText value={h!.intro} tone={richTone} paths={ctx.paths} /> : undefined}
    />
  ) : null;
  const content = (b.content ?? []) as ContentBlock[];
  let body: ReactNode;

  switch (b.layout) {
    case "editorial":
      body = (
        <EditorialSplit
          id={headingId}
          eyebrow={h?.eyebrow ?? undefined}
          title={h?.title ?? ""}
          aside={b.aside?.length ? <ContentBlocks blocks={b.aside as ContentBlock[]} ctx={ctx} /> : undefined}
        >
          <ContentBlocks blocks={content} ctx={ctx} editorial />
        </EditorialSplit>
      );
      break;
    case "split": {
      const s = b.split;
      let media: ReactNode = <Visual name={s?.visual} />;
      if (s?.mediaType === "image") {
        const img = imageOf(s.image);
        media = img ? <ResponsiveImage src={img.src} alt={img.alt} ratio={(s.image?.ratio as "4/3") ?? "4/3"} frame position={img.position} /> : null;
      }
      body = (
        <>
          <SplitFeature media={media} reverse={Boolean(s?.reverse)} align={s?.align === "start" ? "start" : "center"}>
            {header}
            <ContentBlocks blocks={content} ctx={ctx} firstSpacing={hasHeader ? "6" : "0"} />
          </SplitFeature>
          <ContentBlocks blocks={b.below as ContentBlock[]} ctx={ctx} firstSpacing="12" />
        </>
      );
      break;
    }
    case "columns": {
      const c = b.columns;
      body = (
        <div
          className={`grid ${c?.gap === "wide" ? "gap-12" : "gap-10"} ${GRID_RATIO[c?.ratio ?? "1-1"]} ${c?.valign === "center" ? "lg:items-center" : ""} lg:gap-16`}
        >
          <div className={c?.stickyFirst ? "lg:sticky lg:top-32 lg:self-start" : undefined}>
            {header}
            <ContentBlocks blocks={content} ctx={ctx} firstSpacing={hasHeader ? "6" : "0"} />
          </div>
          <div>
            <ContentBlocks blocks={b.columnB as ContentBlock[]} ctx={ctx} />
          </div>
        </div>
      );
      break;
    }
    case "centered":
      body =
        b.centeredWidth === "narrow" ? (
          <div className="mx-auto max-w-[760px]">
            {hasHeader ? (
              <h2 id={headingId} className="reveal text-center">
                <Highlight text={h!.title!} highlight={h?.highlight ?? undefined} />
              </h2>
            ) : null}
            <ContentBlocks blocks={content} ctx={ctx} firstSpacing="8" />
          </div>
        ) : (
          <div className="mx-auto max-w-[820px] text-center">
            {hasHeader ? (
              <h2 id={headingId}>
                <Highlight text={h!.title!} highlight={h?.highlight ?? undefined} />
              </h2>
            ) : null}
            <ContentBlocks blocks={content} ctx={ctx} firstSpacing="6" />
          </div>
        );
      break;
    default: {
      const action = ctaOf(h?.action, ctx.paths);
      body = (
        <>
          {action ? (
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              {header}
              <div className="reveal shrink-0">
                <CtaLink href={action.href} event={action.event} location={h?.actionLocation ?? undefined} arrow>
                  {action.label}
                </CtaLink>
              </div>
            </div>
          ) : (
            header
          )}
          <ContentBlocks blocks={content} ctx={ctx} firstSpacing={hasHeader ? (h?.contentSpacing ?? "12") : "0"} />
        </>
      );
    }
  }

  return (
    <Section id={b.anchorId} tone={tone} labelledBy={hasHeader ? headingId : undefined} className={b.topSpacing === "reduced" ? "!pt-14 md:!pt-20" : ""}>
      {body}
    </Section>
  );
}

function comparisonFromSettings(s: SiteSetting) {
  const rows = (s.proofComparison ?? []).map((r) => ({ label: r.label, before: r.before, after: r.after, beforeLabel: r.beforeLabel, afterLabel: r.afterLabel, change: r.change }));
  if (!rows.length) return null;
  return <ComparisonBars title={s.proofComparisonTitle ?? ""} rows={rows} caption={s.proofComparisonCaption ?? ""} />;
}

function Proof({ b, ctx }: { b: Of<"proof">; ctx: RenderCtx }) {
  const metrics = (ctx.settings.proofMetrics ?? []).map((m) => ({ value: m.value, label: m.label, context: m.context ?? undefined }));
  const comparison = comparisonFromSettings(ctx.settings);
  return (
    <ProofSection
      eyebrow={b.eyebrow ?? undefined}
      title={b.title}
      intro={<RichText value={b.intro} paths={ctx.paths} />}
      noteTitle={b.noteTitle ?? undefined}
      note={<RichText value={b.note} paths={ctx.paths} />}
      ctaLabel={b.ctaLabel ?? undefined}
      {...(metrics.length ? { metrics } : {})}
      {...(comparison ? { comparison } : {})}
    />
  );
}

function CtaBandRenderer({ b, ctx }: { b: Of<"ctaBand">; ctx: RenderCtx }) {
  const primary = ctaOf(b.primary, ctx.paths);
  if (!primary) return null;
  const items = textList(b.aside?.items);
  const tone = b.tone === "tint" ? "tint" : "navy";
  return (
    <CtaBand
      id={b.anchorId || undefined}
      tone={tone}
      eyebrow={b.eyebrow ?? undefined}
      title={b.title}
      primary={primary}
      secondary={ctaOf(b.secondary, ctx.paths)}
      location={b.location || "final_cta"}
      aside={
        items.length ? (
          <div className="glass rounded-[22px] p-7">
            {b.aside?.title ? <p className="font-display text-lg font-semibold text-navy">{b.aside.title}</p> : null}
            <CheckList className={b.aside?.title ? "mt-5 text-base" : "text-base"} items={items} />
          </div>
        ) : undefined
      }
    >
      {hasRichText(b.body) ? <RichText value={b.body} tone={tone === "navy" ? "dark" : "light"} paths={ctx.paths} /> : null}
    </CtaBand>
  );
}

function CaseStudy({ b, ctx }: { b: Of<"caseStudy">; ctx: RenderCtx }) {
  const v = b.visual;
  let resultsVisual: ReactNode = undefined;
  if (v?.type === "influencerComparison") resultsVisual = comparisonFromSettings(ctx.settings);
  if (v?.type === "bars" && v.bars?.length) {
    resultsVisual = (
      <ComparisonBars
        title={v.title ?? ""}
        rows={v.bars.map((r) => ({ label: r.label, before: r.before, after: r.after, beforeLabel: r.beforeLabel, afterLabel: r.afterLabel, change: r.change }))}
        caption={v.caption ?? ""}
      />
    );
  }
  if (v?.type === "panel" && v.metrics?.length) {
    resultsVisual = (
      <figure className="surface-deep relative overflow-hidden rounded-[28px] p-6 text-white shadow-[0_40px_80px_-40px_rgb(10_26_46/0.75)] sm:p-8">
        <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
        <div aria-hidden className="orb -right-16 -top-16 size-56 bg-teal/25" />
        {v.title ? <p className="eyebrow relative !text-teal-300">{v.title}</p> : null}
        <div className="relative mt-5">
          <MetricGrid tone="navy" metrics={v.metrics.map((m) => ({ value: m.value, label: m.label, context: m.context ?? undefined }))} />
        </div>
        {v.caption ? <figcaption className="relative mt-5 text-sm text-white/65">{v.caption}</figcaption> : null}
      </figure>
    );
  }
  return (
    <CaseStudyLayout
      crumbs={ctx.crumbs}
      eyebrow={b.eyebrow ?? ""}
      title={b.title}
      summary={b.summary}
      heroMetrics={(b.heroMetrics ?? []).map((m) => ({ value: m.value, label: m.label, context: m.context ?? undefined }))}
      glance={(b.glance ?? []).map((g) => ({ term: g.term, value: g.value }))}
      challenge={textList(b.challenge)}
      goals={textList(b.goals)}
      work={(b.work ?? []).map((w) => ({ title: w.title, body: w.body }))}
      resultsIntro={b.resultsIntro}
      results={(b.results ?? []).map((r) => ({ result: r.result, metric: r.metric, context: r.context ?? "" }))}
      resultsVisual={resultsVisual}
      afterResults={b.afterResults?.length ? <ContentBlocks blocks={b.afterResults as ContentBlock[]} ctx={{ ...ctx, tone: "white" }} /> : undefined}
      whyItWorked={(b.whyItWorked ?? []).map((w) => ({ lead: w.lead, body: w.body }))}
      takeaway={<RichText value={b.takeaway} paths={ctx.paths} />}
      transparency={b.transparency}
      finalTitle={b.finalTitle}
      finalBody={b.finalBody}
    />
  );
}

function renderPageBlock(b: PageBlock, ctx: RenderCtx): ReactNode {
  switch (b.blockType) {
    case "homeHero":
      return <HomeHero b={b} ctx={ctx} />;
    case "pageHero":
      return <PageHeroRenderer b={b} ctx={ctx} />;
    case "collectionHero":
      return <CollectionHero b={b} ctx={ctx} />;
    case "contactHero":
      return <ContactHero b={b} ctx={ctx} />;
    case "legalHero":
      return <LegalHero b={b} ctx={ctx} />;
    case "section":
      return <SectionRenderer b={b} ctx={ctx} />;
    case "statStrip":
      return (
        <section aria-label={b.label || "What to expect"} className="relative z-10 -mt-10 md:-mt-14">
          <dl className="container-site grid grid-cols-3 gap-3 sm:gap-5">
            {(b.items ?? []).map((s, i) => (
              <div key={s.label} className="reveal group card card-hover card-fx flex flex-col items-center px-2 py-6 text-center sm:py-8" style={{ "--i": i } as CSSProperties}>
                <dt className="order-2 mt-2 text-sm font-semibold text-muted sm:text-base">{s.label}</dt>
                <dd className="text-gradient order-1 font-display text-4xl font-bold leading-none tracking-tight sm:text-6xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    case "proof":
      return <Proof b={b} ctx={ctx} />;
    case "ctaBand":
      return <CtaBandRenderer b={b} ctx={ctx} />;
    case "faq": {
      const asideHref = resolveHref(b.asideLink, ctx.paths);
      return (
        <FaqSection
          title={b.title ?? undefined}
          items={(b.items ?? []).map((i) => ({ q: i.question, a: i.answer }))}
          asideTitle={b.asideTitle ?? undefined}
          asideLinkLabel={b.asideLinkLabel ?? undefined}
          asideHref={asideHref ?? undefined}
        />
      );
    }
    case "formSection":
      return (
        <section id={b.anchorId} aria-labelledby={`${b.anchorId}-title`} className="section surface-tint relative scroll-mt-24 overflow-clip">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_0%_0%,#000,transparent_70%)]" />
            <div className="orb -right-40 top-1/3 size-[480px] bg-sky/15" />
          </div>
          <div className="container-site relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="reveal lg:sticky lg:top-32 lg:self-start">
              {b.eyebrow ? <p className="eyebrow">{b.eyebrow}</p> : null}
              <h2 id={`${b.anchorId}-title`} className="mt-3">
                {b.title}
              </h2>
              {b.intro ? <p className="mt-5 text-lg">{b.intro}</p> : null}
              {hasRichText(b.aside) ? (
                <div className="glass mt-8 space-y-4 rounded-[20px] p-6 text-base">
                  <RichText value={b.aside} paths={ctx.paths} />
                </div>
              ) : null}
            </div>
            <div className="reveal relative" style={{ "--i": 1 } as CSSProperties}>
              <div aria-hidden className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-teal/25 via-sky/15 to-coral/15 blur-2xl" />
              <div className="relative rounded-[28px] border border-white/80 bg-white/95 p-6 shadow-[var(--shadow-lift)] ring-1 ring-navy/5 sm:p-10">
                <span aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
                <AuditForm />
              </div>
            </div>
          </div>
        </section>
      );
    case "caseStudy":
      return <CaseStudy b={b} ctx={ctx} />;
    case "legalBody":
      return (
        <section className="bg-offwhite pb-20 pt-12 md:pb-28 md:pt-16">
          <div className="container-site">
            <div className="prose-tss mx-auto rounded-[28px] border border-line bg-white p-7 text-lg shadow-[var(--shadow-card)] sm:p-12 [&_h2]:text-[1.6rem] md:[&_h2]:text-[1.85rem]">
              <RichText value={b.content} paths={ctx.paths} linkClass="" />
            </div>
          </div>
        </section>
      );
    default:
      return null;
  }
}

export function PageBlocks({ blocks, ctx }: { blocks: PageBlock[] | null | undefined; ctx: RenderCtx }) {
  return <>{(blocks ?? []).map((b, i) => <PageBlockKey key={b.id ?? i}>{renderPageBlock(b, ctx)}</PageBlockKey>)}</>;
}

function PageBlockKey({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

