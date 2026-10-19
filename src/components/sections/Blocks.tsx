import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check, Info, Minus } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { CountUp } from "@/components/motion/CountUp";
import { CtaLink } from "@/components/ui/CtaLink";
import type { Cta } from "./PageHero";
import type { Tone } from "./Section";

const idx = (i: number) => ({ "--i": i }) as CSSProperties;

export function SplitFeature({
  media,
  children,
  reverse = false,
  align = "center",
  className = "",
}: {
  media: ReactNode;
  children: ReactNode;
  reverse?: boolean;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={`grid gap-12 lg:grid-cols-2 lg:gap-20 ${align === "center" ? "items-center" : "items-start"} ${className}`}
    >
      <div className={reverse ? "lg:order-2" : ""}>{children}</div>
      <div className={`reveal relative ${reverse ? "lg:order-1" : ""}`} style={idx(1)}>
        <div
          aria-hidden
          className="absolute -inset-6 -z-0 rounded-[40px] bg-gradient-to-br from-teal/15 via-sky/10 to-transparent blur-2xl"
        />
        <div className="relative">{media}</div>
      </div>
    </div>
  );
}

export type CardItem = {
  title: string;
  body: ReactNode;
  icon?: LucideIcon;
  cta?: Cta;
  extra?: ReactNode;
};

export function NumberedCards({
  items,
  columns = 3,
  numbered = true,
  tone = "base",
}: {
  items: CardItem[];
  columns?: 2 | 3 | 4;
  numbered?: boolean;
  tone?: Tone;
}) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  const dark = tone === "navy";
  return (
    <ul className={`grid gap-5 ${cols}`}>
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <li key={item.title} className="reveal" style={idx(i)}>
            <div
              className={`group card-hover card-fx flex h-full flex-col p-7 sm:p-8 ${dark ? "card-dark" : "card"}`}
            >
              <div className="flex items-start justify-between gap-4">
                {Icon ? (
                  <span className={`icon-tile ${dark ? "icon-tile-dark" : ""}`}>
                    <Icon aria-hidden className="size-[22px]" strokeWidth={1.75} />
                  </span>
                ) : null}
                {numbered ? (
                  <span
                    aria-hidden
                    className={`font-display text-[2.75rem] font-bold leading-none tracking-tight text-transparent transition-[-webkit-text-stroke-color] duration-500 [-webkit-text-stroke:1.25px_var(--stroke)] ${
                      dark
                        ? "[--stroke:rgb(255_255_255/0.22)] group-hover:[--stroke:rgb(94_234_212/0.8)]"
                        : "[--stroke:rgb(15_39_66/0.16)] group-hover:[--stroke:rgb(20_184_166/0.7)]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ) : null}
              </div>
              <h3 className={Icon || numbered ? "mt-7" : ""}>{item.title}</h3>
              <div className={`mt-3 flex-1 space-y-3 text-base leading-relaxed ${dark ? "text-white/70" : ""}`}>
                {item.body}
              </div>
              {item.extra}
              {item.cta ? (
                <Link
                  href={item.cta.href}
                  className={`mt-7 inline-flex items-center gap-2 self-start font-semibold ${
                    dark ? "text-teal-300 hover:text-white" : "text-teal-ink hover:text-navy"
                  }`}
                >
                  {item.cta.label}
                  <ArrowRight aria-hidden className="btn-arrow size-4" />
                </Link>
              ) : null}
              <span
                aria-hidden
                className="absolute inset-x-8 bottom-0 h-[3px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-teal to-sky transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function FeatureList({ items, columns = 2 }: { items: CardItem[]; columns?: 2 | 3 }) {
  return (
    <ul className={`grid gap-4 ${columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <li key={item.title} className="reveal" style={idx(i % 4)}>
            <div className="group card card-hover card-fx flex h-full gap-5 bg-gradient-to-br from-white to-offwhite p-6 shadow-none hover:shadow-[var(--shadow-lift)] sm:p-7">
              {Icon ? (
                <span className="icon-tile mt-0.5">
                  <Icon aria-hidden className="size-[22px]" strokeWidth={1.75} />
                </span>
              ) : null}
              <div className="min-w-0">
                <h3 className="text-xl">{item.title}</h3>
                <div className="mt-2 space-y-3 text-base leading-relaxed">{item.body}</div>
                {item.cta ? (
                  <Link href={item.cta.href} className="mt-4 inline-flex items-center gap-1.5 text-base font-semibold text-teal-ink hover:text-navy">
                    {item.cta.label}
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
}

export function CheckList({
  items,
  variant = "check",
  tone = "base",
  className = "",
}: {
  items: ReactNode[];
  variant?: "check" | "gap";
  tone?: Tone;
  className?: string;
}) {
  return (
    <ul className={`space-y-3.5 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="reveal flex gap-3.5" style={idx(Math.min(i, 6))}>
          <span
            aria-hidden
            className={`mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full ${
              variant === "gap"
                ? "bg-coral-soft text-coral-hover ring-1 ring-coral/25"
                : tone === "navy"
                  ? "bg-gradient-to-br from-teal-300 to-sky-300 text-navy"
                  : "bg-gradient-to-br from-teal to-sky text-white shadow-[0_6px_14px_-6px_rgb(20_184_166/0.8)]"
            }`}
          >
            {variant === "gap" ? <Minus className="size-3.5" strokeWidth={3} /> : <Check className="size-3.5" strokeWidth={3} />}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Callout({
  title,
  children,
  tone = "teal",
  className = "",
}: {
  title?: string;
  children: ReactNode;
  tone?: "teal" | "neutral" | "navy";
  className?: string;
}) {
  const styles = {
    teal: "border-teal/25 bg-gradient-to-br from-teal-soft via-white to-white",
    neutral: "border-line bg-white",
    navy: "border-white/10 bg-white/[0.05] text-white/80",
  }[tone];
  return (
    <aside className={`reveal relative flex gap-4 overflow-hidden rounded-[18px] border p-6 pl-7 ${styles} ${className}`}>
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-teal to-sky" />
      <span
        aria-hidden
        className={`inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] ${
          tone === "navy" ? "bg-white/10 text-teal-300" : "bg-white text-teal-ink shadow-[0_4px_12px_-6px_rgb(15_39_66/0.3)]"
        }`}
      >
        <Info className="size-[18px]" />
      </span>
      <div className="space-y-2 text-base leading-relaxed">
        {title ? <p className={`font-semibold ${tone === "navy" ? "text-white" : "text-navy"}`}>{title}</p> : null}
        {children}
      </div>
    </aside>
  );
}

export function ProcessSteps({ steps, tone = "base" }: { steps: { title: string; body: ReactNode }[]; tone?: Tone }) {
  const dark = tone === "navy";
  const cols = steps.length >= 5 ? "lg:grid-cols-5" : steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <ol data-observe className={`relative grid gap-9 md:gap-8 lg:gap-6 ${cols}`}>
      <span
        aria-hidden
        className={`absolute bottom-6 left-[23px] top-6 w-px lg:hidden ${dark ? "bg-white/15" : "bg-line"}`}
      />
      <span
        aria-hidden
        className="draw-y absolute bottom-6 left-[23px] top-6 w-px bg-gradient-to-b from-teal via-sky to-coral lg:hidden"
      />
      <span
        aria-hidden
        className={`absolute left-6 right-6 top-6 hidden h-px lg:block ${dark ? "bg-white/15" : "bg-line"}`}
      />
      <span
        aria-hidden
        className="draw-x absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-teal via-sky to-coral lg:block"
      />
      {steps.map((step, i) => (
        <li key={step.title} className="reveal group relative flex gap-5 lg:block" style={idx(i)}>
          <span
            className={`relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full font-display text-base font-bold ring-1 transition-[transform,background-color,color] duration-500 ease-[var(--ease-spring)] group-hover:scale-110 ${
              dark
                ? "bg-navy-900 text-teal-300 ring-teal/40 group-hover:bg-teal group-hover:text-navy"
                : "bg-white text-teal-ink ring-teal/30 shadow-[0_10px_24px_-12px_rgb(20_184_166/0.7)] group-hover:bg-teal group-hover:text-white"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="lg:mt-7 lg:pr-4">
            <h3 className="text-xl">{step.title}</h3>
            <div className={`mt-2 text-base leading-relaxed ${dark ? "text-white/70" : ""}`}>{step.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export type Metric = { value: string; label: string; context?: ReactNode };

export function MetricGrid({ metrics, tone = "base" }: { metrics: Metric[]; tone?: Tone }) {
  const dark = tone === "navy";
  return (
    <dl className={`grid gap-4 sm:grid-cols-2 ${metrics.length >= 3 ? "lg:grid-cols-3" : ""} ${metrics.length === 4 ? "xl:grid-cols-4" : ""}`}>
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className={`reveal group card-hover card-fx flex flex-col p-7 ${dark ? "card-dark backdrop-blur" : "card"}`}
          style={idx(i)}
        >
          <dt className={`order-2 mt-3 font-semibold ${dark ? "text-white" : "text-navy"}`}>{m.label}</dt>
          <dd className="order-1 font-display text-5xl font-bold leading-none tracking-tight md:text-[3.25rem]">
            <CountUp value={m.value} className={dark ? "text-gradient-light" : "text-gradient"} />
          </dd>
          {m.context ? (
            <dd className={`order-3 mt-2 text-sm leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>{m.context}</dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

export function CtaBand({
  id,
  eyebrow,
  title,
  children,
  primary,
  secondary,
  tone = "navy",
  location = "final_cta",
  aside,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  primary: Cta;
  secondary?: Cta;
  tone?: "navy" | "tint";
  location?: string;
  aside?: ReactNode;
}) {
  const dark = tone === "navy";
  return (
    <section id={id} className="relative bg-offwhite py-14 md:py-20">
      <div className="container-site">
        <div
          className={`reveal relative isolate overflow-hidden rounded-[32px] px-6 py-14 sm:px-12 md:py-20 lg:px-16 ${
            dark
              ? "surface-deep text-white/80 shadow-[0_40px_80px_-40px_rgb(10_26_46/0.75)]"
              : "surface-tint border border-teal/20"
          }`}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            {dark ? (
              <>
                <div className="bg-grid-dark absolute inset-0" />
                <div className="orb -right-24 -top-32 size-[420px] bg-teal/25" />
                <div className="orb -bottom-40 left-10 size-[360px] bg-sky/15 [animation-delay:-9s]" />
                <LogoMark className="absolute -bottom-10 -right-6 h-64 w-auto text-white/[0.04] sm:h-80" />
                <div className="absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/10" />
              </>
            ) : (
              <>
                <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_100%_100%,#000,transparent_70%)]" />
                <div className="orb -left-24 -top-24 size-[340px] bg-teal/15" />
              </>
            )}
          </div>
          <div className={`relative grid gap-12 ${aside ? "lg:grid-cols-[1.2fr_1fr] lg:items-center" : ""}`}>
            <div className="max-w-[760px]">
              {eyebrow ? <p className={`eyebrow ${dark ? "!text-teal-300" : ""}`}>{eyebrow}</p> : null}
              <h2 className={`${eyebrow ? "mt-4" : ""} ${dark ? "text-white" : ""} ${aside ? "" : "md:text-[3.4rem]"}`}>{title}</h2>
              {children ? <div className={`mt-6 space-y-4 text-lg ${dark ? "text-white/75" : ""}`}>{children}</div> : null}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CtaLink href={primary.href} location={location} event={primary.event} arrow>
                  {primary.label}
                </CtaLink>
                {secondary ? (
                  <CtaLink href={secondary.href} variant={dark ? "light" : "secondary"} location={`${location}_secondary`} event={secondary.event}>
                    {secondary.label}
                  </CtaLink>
                ) : null}
              </div>
            </div>
            {aside ? <div className="relative">{aside}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EditorialSplit({
  id,
  eyebrow,
  title,
  children,
  aside,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <div className="reveal lg:sticky lg:top-32 lg:self-start">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 id={id} className={eyebrow ? "mt-4" : ""}>
          {title}
        </h2>
        <span aria-hidden className="mt-8 block h-1 w-16 rounded-full bg-gradient-to-r from-teal to-sky" />
        {aside ? <div className="mt-8">{aside}</div> : null}
      </div>
      <div
        className="reveal prose-tss text-lg lg:border-l lg:border-line lg:pl-12 [&>p:first-child]:font-display [&>p:first-child]:text-[1.35rem] [&>p:first-child]:font-medium [&>p:first-child]:leading-snug [&>p:first-child]:text-navy md:[&>p:first-child]:text-[1.6rem]"
        style={idx(1)}
      >
        {children}
      </div>
    </div>
  );
}

export type Tier = { name: string; price: string; cadence: string; summary: ReactNode; featured?: boolean };

export function TierCards({ tiers }: { tiers: Tier[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {tiers.map((t, i) => (
        <li key={t.name} className="reveal" style={idx(i)}>
          <div className={`group card card-hover card-fx flex h-full flex-col p-7 pt-8 ${t.featured ? "border-teal shadow-[var(--shadow-lift)]" : ""}`}>
            <span
              aria-hidden
              className="absolute inset-x-6 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-teal via-sky to-coral opacity-50 transition-opacity duration-300 group-hover:opacity-100"
            />
            <h3 className="text-xl">{t.name}</h3>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold tracking-tight text-navy">{t.price}</span>
              <span className="text-sm text-muted">{t.cadence}</span>
            </p>
            <div className="mt-5 border-t border-line pt-5 text-base leading-relaxed">{t.summary}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-white px-4 py-2 text-[0.95rem] font-semibold text-navy shadow-[0_4px_12px_-8px_rgb(15_39_66/0.3)] transition-colors hover:border-teal/50">
      {children}
    </span>
  );
}
