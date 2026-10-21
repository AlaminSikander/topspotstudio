import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, Plus, Quote, UserRound } from "lucide-react";
import { Callout, CheckList, FeatureList, MetricGrid, NumberedCards, Pill, ProcessSteps, TierCards, type CardItem } from "@/components/sections/Blocks";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { PostCard } from "@/components/sections/PostCard";
import { Highlight } from "@/components/sections/HeroBackdrop";
import { SectionHeader } from "@/components/sections/Section";
import { CtaLink } from "@/components/ui/CtaLink";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { Page, SectionBlock } from "@/payload-types";
import { resolveHref } from "@/lib/cms/links";
import { postCardData } from "@/lib/cms/posts";
import { RichText, hasRichText } from "./RichText";
import { CmsIcon, iconFor } from "./icons";
import { ctaOf, imageOf, spacing, textList, withLinkedPhrase, type RenderCtx } from "./shared";

export type ContentBlock = NonNullable<SectionBlock["content"]>[number];
type Of<T extends ContentBlock["blockType"]> = Extract<ContentBlock, { blockType: T }>;

const idx = (i: number) => ({ "--i": i }) as CSSProperties;
const dark = (ctx: RenderCtx) => ctx.tone === "navy";
const richTone = (ctx: RenderCtx) => (dark(ctx) ? "dark" : "light");

function cardItems(items: Of<"featureList">["items"], ctx: RenderCtx): CardItem[] {
  return (items ?? []).map((i) => ({
    title: i.title,
    icon: iconFor(i.icon),
    body: <RichText value={i.body} tone={richTone(ctx)} paths={ctx.paths} />,
    cta: ctaOf(i.cta, ctx.paths),
  }));
}

function CheckListContent({ b, ctx }: { b: Of<"checkList">; ctx: RenderCtx }) {
  const linkClass = dark(ctx) ? "font-semibold text-teal underline underline-offset-4 hover:text-white" : "text-link";
  const items = (b.items ?? []).map((i) => withLinkedPhrase(i.text, i.linkText, i.linkText ? resolveHref(i.link, ctx.paths) : null, linkClass));
  const variant = b.variant === "gap" ? "gap" : "check";
  const tone = dark(ctx) ? "navy" : "base";
  switch (b.layout) {
    case "cardGrid":
      return (
        <div className="reveal card p-6 sm:p-10">
          <CheckList variant={variant} className="grid gap-x-10 gap-y-4 space-y-0 text-base md:grid-cols-2" items={items} />
        </div>
      );
    case "card":
      return <CheckList variant={variant} tone={tone} className="card p-6 text-base sm:p-9 md:text-lg" items={items} />;
    case "large":
      return <CheckList variant={variant} tone={tone} className="text-base md:text-lg" items={items} />;
    default:
      return <CheckList variant={variant} tone={tone} className={dark(ctx) ? "text-base text-white/85" : "text-base"} items={items} />;
  }
}

const CARD_SURFACE: Record<string, string> = {
  card: "reveal card p-6 sm:p-8",
  soft: "reveal rounded-[20px] border border-line bg-gradient-to-br from-offwhite to-white p-6 sm:p-8",
  tint: "reveal surface-tint rounded-[24px] border border-teal/20 p-6 sm:p-8",
  panel: "reveal card grid gap-10 p-6 sm:p-10",
  deep: "reveal surface-deep relative overflow-hidden rounded-[28px] p-8 text-white/80 shadow-[0_40px_80px_-40px_rgb(10_26_46/0.75)] sm:p-10",
};
const LIST_CLASS: Record<string, string> = {
  stacked: "space-y-4",
  grid3: "grid gap-4 md:grid-cols-3",
  disc: "list-disc space-y-3 pl-5",
};

export function CardContent({ b, ctx }: { b: Of<"card">; ctx: RenderCtx }) {
  const variant = b.variant ?? "card";
  const isDeep = variant === "deep";
  const tone = isDeep ? "dark" : "light";
  const link = ctaOf(b.link, ctx.paths);
  const body = hasRichText(b.body) ? (
    <div
      className={
        b.bodyColumns
          ? "mt-4 grid gap-4 text-base leading-relaxed lg:grid-cols-2 lg:gap-10"
          : isDeep
            ? "mt-4 space-y-4 text-lg"
            : "mt-3 space-y-5 text-base"
      }
    >
      <RichText value={b.body} tone={tone} paths={ctx.paths} listClass={LIST_CLASS[b.listLayout ?? "stacked"]} />
    </div>
  ) : null;
  const rows = b.iconRows?.length ? (
    <div className="mt-5 space-y-5 text-base">
      {b.iconRows.map((r, i) => {
        return (
          <div key={i} className="flex gap-4">
            <span
              className={`inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] ${
                r.iconTone === "coral" ? "bg-coral/15 text-[#b4432f]" : "bg-teal-soft text-teal-ink"
              }`}
            >
              <CmsIcon icon={r.icon} aria-hidden className="size-5" />
            </span>
            <p>
              {r.lead ? <strong className="text-navy">{r.lead}</strong> : null} {r.text}
            </p>
          </div>
        );
      })}
    </div>
  ) : null;
  const extra = b.extra?.length ? (
    <>
      {b.extra.map((x, i) =>
        x.blockType === "tierCards" ? (
          <TierContent key={i} b={x} />
        ) : (
          <Callout key={i} title={x.title ?? undefined} tone={x.tone ?? "teal"}>
            <RichText value={x.body} paths={ctx.paths} />
          </Callout>
        ),
      )}
    </>
  ) : null;

  if (variant === "panel") {
    return (
      <div className={CARD_SURFACE.panel}>
        <div>
          {b.title ? <h3>{b.title}</h3> : null}
          {body}
        </div>
        {extra}
      </div>
    );
  }
  const inner = (
    <>
      {b.title ? <h3 className={isDeep ? "text-white" : undefined}>{b.title}</h3> : null}
      {body}
      {rows}
      {link ? (
        isDeep ? (
          <Link href={link.href} className="group mt-6 inline-flex items-center gap-2 font-semibold text-teal-300 hover:text-white">
            {link.label}
            <ArrowRight aria-hidden className="btn-arrow size-4" />
          </Link>
        ) : (
          <Link href={link.href} className="text-link mt-6 inline-block">
            {link.label}
          </Link>
        )
      ) : null}
      {extra}
    </>
  );
  if (isDeep) {
    return (
      <div className={CARD_SURFACE.deep}>
        <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
        <div aria-hidden className="orb -right-20 -top-20 size-64 bg-teal/25" />
        <div className="relative">{inner}</div>
      </div>
    );
  }
  return <div className={CARD_SURFACE[variant] ?? CARD_SURFACE.card}>{inner}</div>;
}

function TierContent({ b }: { b: Of<"tierCards"> }) {
  const tiers = (b.tiers ?? []).map((t) => ({ name: t.name, price: t.price, cadence: t.cadence ?? "", summary: <p>{t.summary}</p>, featured: t.featured ?? false }));
  return (
    <div>
      {b.heading ? <h3>{b.heading}</h3> : null}
      <div className={b.heading ? "mt-6" : undefined}>
        <TierCards tiers={tiers} />
      </div>
      {b.note ? <p className="mt-4 text-sm text-muted">{b.note}</p> : null}
    </div>
  );
}

function KeywordTable({ b }: { b: Extract<ContentBlock, { blockType: "keywordTable" }> }) {
  return (
    <div className="reveal rounded-[20px] border border-line bg-gradient-to-br from-offwhite to-white p-6 sm:p-8">
      <h3>{b.title}</h3>
      {b.intro ? <p className="mt-2 text-base">{b.intro}</p> : null}
      <table className="mt-5 w-full max-w-xl text-left text-base">
        <thead>
          <tr className="border-b border-line text-sm text-muted">
            <th scope="col" className="py-2 font-semibold">
              Keyword
            </th>
            <th scope="col" className="py-2 text-right font-semibold">
              Position
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {(b.rows ?? []).map((r) => (
            <tr key={r.keyword}>
              <td className="py-3 text-navy">{r.keyword}</td>
              <td className="py-3 text-right font-brand font-semibold text-teal-ink">{r.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderBlock(b: ContentBlock, ctx: RenderCtx, opts: { editorial?: boolean }): ReactNode {
  switch (b.blockType) {
    case "richText": {
      const tone = richTone(ctx);
      if (opts.editorial) return <RichText value={b.content} tone={tone} paths={ctx.paths} />;
      const wrap: Record<string, string> = {
        default: "space-y-4",
        lead: "space-y-4 text-lg",
        leadLight: "space-y-4 text-lg text-white/80",
        proseCard: "reveal prose-tss mx-auto rounded-[24px] border border-line bg-gradient-to-br from-white to-offwhite p-7 text-lg shadow-[var(--shadow-card)] sm:p-10",
        glassBox: "glass space-y-4 rounded-[20px] p-6 text-base",
      };
      return (
        <div className={wrap[b.style ?? "default"]}>
          <RichText value={b.content} tone={tone} paths={ctx.paths} linkClass={b.style === "proseCard" ? "" : undefined} />
        </div>
      );
    }
    case "sectionHeader":
      return (
        <SectionHeader
          id={b.anchorId || undefined}
          eyebrow={b.eyebrow ?? undefined}
          tone={ctx.tone}
          title={<Highlight text={b.title} highlight={b.highlight ?? undefined} />}
          intro={hasRichText(b.intro) ? <RichText value={b.intro} tone={richTone(ctx)} paths={ctx.paths} /> : undefined}
        />
      );
    case "featureList":
      return <FeatureList columns={b.columns === "3" ? 3 : 2} items={cardItems(b.items, ctx)} />;
    case "numberedCards":
      return (
        <NumberedCards
          columns={Number(b.columns ?? 3) as 2 | 3 | 4}
          numbered={b.numbered !== false}
          tone={ctx.tone}
          items={cardItems(b.items as Of<"featureList">["items"], ctx)}
        />
      );
    case "iconCards":
      return (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(b.items ?? []).map((a, i) => {
            const link = ctaOf(a.cta, ctx.paths);
            return (
              <li key={a.title} className="reveal" style={idx(i)}>
                <div className="group card card-hover card-fx flex h-full flex-col bg-gradient-to-br from-white to-offwhite p-7">
                  <span className="icon-tile">
                    <CmsIcon icon={a.icon} aria-hidden className="size-[22px]" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 text-xl">{a.title}</h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed">{a.body}</p>
                  {link ? (
                    <Link href={link.href} className="mt-5 inline-flex items-center gap-1.5 self-start text-base font-semibold text-teal-ink hover:text-navy">
                      {link.label} <ArrowRight aria-hidden className="btn-arrow size-4" />
                    </Link>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      );
    case "processSteps":
      return <ProcessSteps tone={ctx.tone} steps={(b.steps ?? []).map((s) => ({ title: s.title, body: s.body }))} />;
    case "tierCards":
      return <TierContent b={b} />;
    case "checkList":
      return <CheckListContent b={b} ctx={ctx} />;
    case "callout":
      return (
        <Callout title={b.title ?? undefined} tone={b.tone ?? "teal"} className={b.alignSelf ? "self-center" : ""}>
          <RichText value={b.body} tone={b.tone === "navy" ? "dark" : "light"} paths={ctx.paths} />
        </Callout>
      );
    case "card":
      return <CardContent b={b} ctx={ctx} />;
    case "grid":
      return (
        <div className="grid gap-6 lg:grid-cols-2">
          {(b.items ?? []).map((x, i) => (
            <GridItem key={i} b={x} ctx={ctx} />
          ))}
        </div>
      );
    case "keywordTable":
      return <KeywordTable b={b} />;
    case "metricGrid":
      return <MetricGrid tone={ctx.tone} metrics={(b.metrics ?? []).map((m) => ({ value: m.value, label: m.label, context: m.context ?? undefined }))} />;
    case "imageCards":
      return (
        <ul className="grid gap-6 md:grid-cols-3">
          {(b.items ?? []).map((w, i) => {
            const img = imageOf(w.image);
            const cta = ctaOf(w.cta, ctx.paths);
            return (
              <li key={w.title} className="reveal" style={idx(i)}>
                <div className="group card card-hover card-fx flex h-full flex-col p-3">
                  <div className="relative">
                    {img ? <ResponsiveImage src={img.src} alt={img.alt} ratio="4/3" rounded="rounded-[14px]" sizes="(min-width: 768px) 380px, 100vw" position={img.position} /> : null}
                    {w.tag ? <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-teal-ink">{w.tag}</span> : null}
                  </div>
                  <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                    <h3>{w.title}</h3>
                    <p className="mt-3 flex-1 text-base leading-relaxed">{w.body}</p>
                    {cta ? (
                      <Link href={cta.href} className="mt-5 inline-flex items-center gap-2 self-start text-base font-semibold text-teal-ink hover:text-navy">
                        {cta.label}
                        <ArrowRight aria-hidden className="btn-arrow size-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    case "serviceCards":
      return <ServiceCards b={b} ctx={ctx} />;
    case "imageTiles":
      return (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {(b.tiles ?? []).map((t) => {
            const img = imageOf(t.image);
            return (
              <li key={t.name} className="reveal group relative overflow-hidden rounded-[20px] shadow-[var(--shadow-card)]">
                {img ? <ResponsiveImage src={img.src} alt={img.alt} ratio="4/3" sizes="(min-width: 768px) 380px, 50vw" position={img.position} /> : null}
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent px-4 pb-3 pt-10 font-semibold text-white">{t.name}</span>
              </li>
            );
          })}
          {b.extraLabel ? (
            <li className="reveal flex aspect-[4/3] flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-teal/30 bg-gradient-to-br from-teal-soft to-white p-4 text-center">
              <Plus aria-hidden className="size-6 text-teal-ink" />
              <span className="mt-2 font-semibold text-navy">{b.extraLabel}</span>
            </li>
          ) : null}
        </ul>
      );
    case "linkPills":
      return (
        <div className="reveal surface-tint relative overflow-hidden rounded-[24px] border border-teal/20 p-6 sm:p-9">
          <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 [mask-image:linear-gradient(90deg,transparent,#000)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {b.title ? <h3 className="text-xl md:text-2xl">{b.title}</h3> : null}
            <ul className="flex flex-wrap gap-2.5">
              {(b.links ?? []).map((l) => {
                const href = resolveHref(l.link, ctx.paths);
                return href ? (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2.5 text-[0.95rem] font-semibold text-navy shadow-[0_4px_14px_-10px_rgb(15_39_66/0.4)] transition-[border-color,color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-teal hover:text-teal-ink hover:shadow-[0_10px_24px_-12px_rgb(20_184_166/0.6)]"
                    >
                      {l.label}
                      <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
      );
    case "pills":
      return (
        <ul className="flex flex-wrap gap-2">
          {textList(b.items).map((q) => (
            <li key={q}>
              <Pill>{q}</Pill>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return b.variant === "feature" ? (
        <figure className="reveal glass-dark relative flex flex-col justify-center overflow-hidden rounded-[28px] p-8 sm:p-10">
          <div aria-hidden className="orb -right-16 -top-16 size-56 bg-teal/20" />
          <Quote aria-hidden className="relative size-10 text-teal-300" />
          {b.title ? <h3 className="mt-4 text-2xl">{b.title}</h3> : null}
          {textList(b.before).map((p) => (
            <p key={p} className="mt-4 text-lg text-white/80">
              {p}
            </p>
          ))}
          <blockquote className="text-gradient-light mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">{b.quote}</blockquote>
          {b.after ? <p className="mt-4 text-white/70">{b.after}</p> : null}
        </figure>
      ) : (
        <figure className="reveal glass-dark relative rounded-[22px] p-7" style={idx(1)}>
          <Quote aria-hidden className="size-8 text-teal-300" />
          <blockquote className="mt-4 font-display text-2xl font-semibold leading-snug text-white">{b.quote}</blockquote>
          {b.caption ? <figcaption className="mt-4 text-sm text-white/60">{b.caption}</figcaption> : null}
        </figure>
      );
    case "buttons": {
      const primary = ctaOf(b.primary, ctx.paths);
      const secondary = ctaOf(b.secondary, ctx.paths);
      const location = b.location ?? undefined;
      if (!primary && secondary) {
        return (
          <div>
            <CtaLink href={secondary.href} variant={dark(ctx) ? "light" : "secondary"} event={secondary.event} location={location}>
              {secondary.label}
            </CtaLink>
          </div>
        );
      }
      if (primary && !secondary) {
        return (
          <div>
            <CtaLink href={primary.href} event={primary.event} location={location} arrow>
              {primary.label}
            </CtaLink>
          </div>
        );
      }
      return (
        <div className="flex flex-col gap-3 sm:flex-row">
          {primary ? (
            <CtaLink href={primary.href} event={primary.event} location={location} arrow>
              {primary.label}
            </CtaLink>
          ) : null}
          {secondary ? (
            <CtaLink href={secondary.href} variant={dark(ctx) ? "light" : "secondary"} event={secondary.event} location={location ? `${location}_secondary` : undefined}>
              {secondary.label}
            </CtaLink>
          ) : null}
        </div>
      );
    }
    case "textLink": {
      const href = resolveHref(b.link, ctx.paths);
      if (!href) return null;
      if (b.style === "arrow" || b.style === "arrowLight") {
        return (
          <Link
            href={href}
            className={`group inline-flex items-center gap-2 font-semibold ${b.style === "arrowLight" ? "text-teal-300 hover:text-white" : "text-teal-ink hover:text-navy"}`}
          >
            {b.label}
            <ArrowRight aria-hidden className="btn-arrow size-4" />
          </Link>
        );
      }
      return (
        <Link href={href} className="text-link inline-block">
          {b.label}
        </Link>
      );
    }
    case "flowSteps": {
      const steps = textList(b.steps);
      return (
        <div className="reveal surface-tint rounded-[24px] border border-teal/20 p-6 sm:p-8">
          <h3>{b.title}</h3>
          <ol className="mt-5 flex flex-wrap items-center gap-2">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className="rounded-[10px] border border-line bg-white px-3 py-2 text-sm font-semibold text-navy">{s}</span>
                {i < steps.length - 1 ? <ArrowRight aria-hidden className="size-4 text-teal" /> : null}
              </li>
            ))}
          </ol>
          {b.body ? <p className="mt-5 text-base">{b.body}</p> : null}
        </div>
      );
    }
    case "linkList":
      return (
        <div className="reveal glass-dark rounded-[24px] p-6 sm:p-8">
          {b.label ? <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal">{b.label}</p> : null}
          <ul className="mt-4 space-y-3">
            {(b.links ?? []).map((l) => {
              const href = resolveHref(l.link, ctx.paths);
              return href ? (
                <li key={href}>
                  <Link href={href} className="group flex items-center justify-between gap-3 border-b border-white/10 pb-3 font-semibold text-white hover:text-teal">
                    {l.label}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      );
    case "founderCards":
      return (
        <div className="grid gap-6 lg:grid-cols-2">
          {(b.founders ?? []).map((f) => (
            <FounderCard key={f.name} f={f} />
          ))}
        </div>
      );
    case "personCards":
      return (
        <ul className="grid gap-4 self-center">
          {(b.people ?? []).map((p) => (
            <li key={p.name} className="reveal group card card-hover card-fx flex items-start gap-4 p-6">
              <span className="icon-tile">
                <UserRound aria-hidden className="size-5" />
              </span>
              <div>
                <p className="font-bold text-navy">{p.name}</p>
                <p className="text-sm font-semibold text-teal-ink">{p.role}</p>
                {p.note ? <p className="mt-1 text-sm text-muted">{p.note}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      );
    case "numberedGrid":
      return (
        <ol className="reveal grid gap-px overflow-hidden rounded-[24px] border border-line bg-line shadow-[var(--shadow-card)] sm:grid-cols-2 lg:grid-cols-3">
          {(b.items ?? []).map((s, i) => (
            <li key={s.title} className="group relative bg-white p-7 transition-colors duration-300 hover:bg-teal-soft/40 sm:p-8">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-teal to-sky font-display text-sm font-bold text-white shadow-[0_8px_20px_-10px_rgb(20_184_166/0.8)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 text-base leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      );
    case "caseStudyCards":
      return (
        <ul className="grid gap-6 lg:grid-cols-3">
          {(b.caseStudies ?? [])
            .filter((c): c is Page => typeof c === "object" && c !== null)
            .map((c) => (
              <li key={c.id}>
                <CaseStudyCard
                  href={c.path}
                  label={c.caseStudyCard?.label ?? ""}
                  title={c.caseStudyCard?.title || c.title}
                  summary={c.caseStudyCard?.summary ?? ""}
                  metrics={(c.caseStudyCard?.metrics ?? []).map((m) => ({ value: m.value, label: m.label }))}
                  cta={b.ctaLabel ?? undefined}
                />
              </li>
            ))}
        </ul>
      );
    case "blogGoals":
      return (
        <ul className="grid gap-5 lg:grid-cols-3">
          {(b.goals ?? []).map((g) => {
            const categoryId = typeof g.category === "object" ? g.category.id : g.category;
            const matches = ctx.posts.filter((p) => (typeof p.category === "object" ? p.category.id : p.category) === categoryId).slice(0, 3);
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
                  <p className="mt-5 border-t border-line pt-4 text-sm text-muted">{g.emptyLabel} are being prepared.</p>
                )}
              </li>
            );
          })}
        </ul>
      );
    case "latestPosts": {
      const posts = ctx.posts.slice(0, b.limit ?? 12);
      return posts.length ? (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <PostCard post={postCardData(p)} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="reveal surface-tint grid gap-8 rounded-[24px] border border-teal/20 p-6 sm:p-10 lg:grid-cols-2">
          <div>
            {b.emptyTitle ? <h3>{b.emptyTitle}</h3> : null}
            {b.emptyBody ? <p className="mt-3 text-base">{b.emptyBody}</p> : null}
          </div>
          <ul className="space-y-3">
            {(b.emptyLinks ?? []).map((l) => {
              const href = resolveHref(l.link, ctx.paths);
              return href ? (
                <li key={href}>
                  <Link href={href} className="group flex items-center justify-between gap-3 border-b border-line pb-3 font-semibold text-navy hover:text-teal-ink">
                    {l.label}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      );
    }
    default:
      return null;
  }
}

function GridItem({ b, ctx }: { b: NonNullable<Of<"grid">["items"]>[number]; ctx: RenderCtx }) {
  if (b.blockType === "card") return <CardContent b={b as Of<"card">} ctx={ctx} />;
  if (b.blockType === "keywordTable") return <KeywordTable b={b} />;
  return (
    <Callout title={b.title ?? undefined} tone={b.tone ?? "teal"}>
      <RichText value={b.body} paths={ctx.paths} />
    </Callout>
  );
}

function ServiceCards({ b, ctx }: { b: Of<"serviceCards">; ctx: RenderCtx }) {
  const [seo, ...others] = b.items ?? [];
  if (!seo) return null;
  const seoCta = ctaOf(seo.cta, ctx.paths);
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <article className="reveal group card-dark card-hover card-fx surface-navy relative flex flex-col overflow-hidden p-8 text-white/75 sm:p-10 lg:row-span-2">
        <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
        <CmsIcon
          icon={seo.icon}
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-8 size-64 text-white/[0.04] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110"
          strokeWidth={1}
        />
        <div className="relative flex items-start justify-between">
          <span className="icon-tile icon-tile-dark size-14">
            <CmsIcon icon={seo.icon} aria-hidden className="size-6" strokeWidth={1.75} />
          </span>
          <span aria-hidden className="font-display text-sm font-semibold tracking-[0.2em] text-white/40">
            01
          </span>
        </div>
        <h3 className="relative mt-8 text-3xl text-white md:text-4xl">{seo.title}</h3>
        <div className="relative mt-4 max-w-md flex-1 space-y-3 text-base leading-relaxed [&_.text-muted]:text-white/60">
          <RichText value={seo.body} paths={ctx.paths} />
        </div>
        <ul className="relative mt-8 flex flex-wrap gap-2">
          {textList(b.chips).map((s) => (
            <li key={s} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-white/80">
              {s}
            </li>
          ))}
        </ul>
        {seoCta ? (
          <Link href={seoCta.href} className="btn btn-light relative mt-9 min-h-12 self-start">
            {seoCta.label}
            <ArrowRight aria-hidden className="btn-arrow size-4" />
          </Link>
        ) : null}
      </article>
      {others.map((s, i) => {
        const cta = ctaOf(s.cta, ctx.paths);
        return (
          <article key={s.title} className="reveal group card card-hover card-fx flex flex-col p-8 sm:p-9" style={idx(i + 1)}>
            <div className="flex items-start justify-between">
              <span className="icon-tile">
                <CmsIcon icon={s.icon} aria-hidden className="size-[22px]" strokeWidth={1.75} />
              </span>
              <span aria-hidden className="font-display text-sm font-semibold tracking-[0.2em] text-muted/60">
                {String(i + 2).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-6 text-2xl">{s.title}</h3>
            <div className="mt-3 flex-1 space-y-3 text-base leading-relaxed">
              <RichText value={s.body} paths={ctx.paths} />
            </div>
            {cta ? (
              <Link href={cta.href} className="mt-6 inline-flex items-center gap-2 self-start font-semibold text-teal-ink hover:text-navy">
                {cta.label}
                <ArrowRight aria-hidden className="btn-arrow size-4" />
              </Link>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

type Founder = NonNullable<Of<"founderCards">["founders"]>[number];

function FounderCard({ f }: { f: Founder }) {
  const photo = typeof f.photo === "object" && f.photo?.url ? f.photo : null;
  const parts = f.name.split(" ");
  return (
    <article className="reveal group card card-hover card-fx flex h-full flex-col p-7 sm:p-9">
      <header className="flex items-center gap-5">
        {photo ? (
          <Image src={photo.url!} alt={`${f.name}, ${f.role}`} width={80} height={80} sizes="80px" className="size-20 rounded-[14px] object-cover" />
        ) : (
          <span
            aria-hidden
            className="inline-flex size-16 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-teal to-sky font-display text-xl font-bold text-white shadow-[0_14px_30px_-14px_rgb(20_184_166/0.9)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-105"
          >
            {parts[0]?.[0]}
            {parts.at(-1)?.[0]}
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
          <CheckList className="mt-4 text-base" items={textList(f.strengths)} />
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">At Top Spot Studio</h4>
          <ul className="mt-4 space-y-3 text-base">
            {textList(f.responsibilities).map((r) => (
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

/** Renders a list of content blocks, applying each block's "Space above" setting. */
export function ContentBlocks({
  blocks,
  ctx,
  firstSpacing = "0",
  editorial = false,
}: {
  blocks: ContentBlock[] | null | undefined;
  ctx: RenderCtx;
  firstSpacing?: string;
  editorial?: boolean;
}) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((b, i) => {
        const node = renderBlock(b, ctx, { editorial });
        if (editorial) return <FragmentKey key={b.id ?? i}>{node}</FragmentKey>;
        const cls = spacing((b as { spacing?: string | null }).spacing, i === 0 ? firstSpacing : "8");
        return cls ? (
          <div key={b.id ?? i} className={cls}>
            {node}
          </div>
        ) : (
          <FragmentKey key={b.id ?? i}>{node}</FragmentKey>
        );
      })}
    </>
  );
}

function FragmentKey({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
