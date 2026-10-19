import type { CSSProperties, ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Gauge,
  Globe2,
  Hammer,
  LayoutTemplate,
  MapPin,
  MessageSquareText,
  MousePointerClick,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";

function Frame({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <figure
      role="group"
      aria-label={label}
      className={`relative overflow-hidden rounded-[24px] border border-white/80 bg-white/90 p-6 shadow-[var(--shadow-lift)] ring-1 ring-navy/5 backdrop-blur-xl sm:p-8 ${className}`}
    >
      <span aria-hidden className="absolute -right-20 -top-20 size-56 rounded-full bg-gradient-to-br from-teal/25 to-sky/10 blur-2xl" />
      <span aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-teal/50 to-transparent" />
      <div className="relative">{children}</div>
    </figure>
  );
}

function Tag({ children, tone = "teal" }: { children: ReactNode; tone?: "teal" | "coral" | "navy" }) {
  const styles = {
    teal: "bg-teal-soft text-teal-ink ring-1 ring-teal/20",
    coral: "bg-coral-soft text-[#b4432f] ring-1 ring-coral/25",
    navy: "bg-navy text-white",
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}>{children}</span>;
}

/** Home problem section: where enquiries leak between search and contact. */
export function SearchJourney() {
  const steps = [
    { icon: Search, title: "Customer searches", note: "Priority services hard to find", leak: true },
    { icon: FileText, title: "Lands on a page", note: "Weak local relevance", leak: true },
    { icon: ShieldCheck, title: "Decides who to trust", note: "Unclear reasons to choose you", leak: true },
    { icon: Phone, title: "Calls or enquires", note: "Clear next step", leak: false },
  ];
  return (
    <Frame label="Diagram: the path from a search to an enquiry, and where it commonly breaks down">
      <p className="eyebrow">Search to enquiry</p>
      <ol className="mt-5 space-y-3">
        {steps.map((s, i) => (
          <li key={s.title}>
            <div className="flex items-center gap-4 diagram-item rounded-[14px] border border-line bg-offwhite/80 p-4">
              <span
                className={`inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] ${
                  s.leak ? "bg-white text-navy" : "bg-navy text-white"
                }`}
              >
                <s.icon aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-navy">{s.title}</p>
                <p className="text-sm text-muted">{s.note}</p>
              </div>
              {s.leak ? <Tag tone="coral">Leak point</Tag> : <Tag>Goal</Tag>}
            </div>
            {i < steps.length - 1 ? (
              <ArrowDown aria-hidden className="mx-auto my-1 size-4 text-teal" />
            ) : null}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/** Small overlay card used on the homepage hero photo. */
export function HeroPathCard() {
  const items = [
    { icon: Search, label: "Found in search" },
    { icon: LayoutTemplate, label: "Clear service page" },
    { icon: MousePointerClick, label: "Qualified enquiry" },
  ];
  return (
    <div className="glass rounded-[20px] p-5">
      <div className="flex items-center gap-2">
        <LogoMark className="h-4 w-auto text-navy" />
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">SEO + web, together</p>
      </div>
      <ol className="relative mt-4 space-y-2.5">
        <span aria-hidden className="absolute bottom-4 left-4 top-4 w-px bg-gradient-to-b from-teal/60 to-sky/60" />
        {items.map((it, i) => (
          <li
            key={it.label}
            className="rise-in relative flex items-center gap-3"
            style={{ "--d": `${700 + i * 220}ms` } as CSSProperties}
          >
            <span
              className={`relative inline-flex size-8 items-center justify-center rounded-lg ${
                i === items.length - 1 ? "bg-gradient-to-br from-teal to-sky text-white" : "bg-teal-soft text-teal-ink"
              }`}
            >
              <it.icon aria-hidden className="size-4" />
            </span>
            <span className="text-sm font-semibold text-navy">{it.label}</span>
            {i === items.length - 1 ? <CheckCircle2 aria-hidden className="ml-auto size-4 text-teal" /> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** NZ SEO scope: three connected areas of work. */
export function SeoScopeDiagram() {
  const areas = [
    {
      icon: Search,
      title: "Research & planning",
      items: ["Keyword-to-page plan", "Competitor review", "Priority roadmap"],
    },
    {
      icon: Wrench,
      title: "Website & content",
      items: ["Technical fixes", "On-page & service pages", "Content & internal links"],
    },
    {
      icon: BarChart3,
      title: "Measure & refine",
      items: ["Search Console & GA4", "Enquiry tracking", "Next priorities"],
    },
  ];
  return (
    <Frame label="Diagram: SEO work in three connected areas — research and planning, website and content, and measurement">
      <p className="eyebrow">How the work connects</p>
      <ol className="mt-5 grid gap-3">
        {areas.map((a, i) => (
          <li key={a.title} className="relative diagram-item rounded-[14px] border border-line bg-offwhite/80 p-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-navy to-navy-700 text-white shadow-[0_6px_14px_-8px_rgb(15_39_66/0.7)]">
                <a.icon aria-hidden className="size-4" />
              </span>
              <p className="font-semibold text-navy">
                <span className="mr-2 font-brand text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                {a.title}
              </p>
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {a.items.map((it) => (
                <li key={it}>
                  <Tag>{it}</Tag>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="mt-4 flex items-center gap-2 text-sm text-muted">
        <ArrowRight aria-hidden className="size-4 text-teal" /> Each cycle feeds the next set of priorities.
      </p>
    </Frame>
  );
}

/** Local SEO: relevance, distance and prominence. */
export function LocalSignalsDiagram() {
  const signals = [
    {
      title: "Relevance",
      body: "Profile and website match the search",
      control: "Improvable",
      icon: FileText,
    },
    {
      title: "Distance",
      body: "How close the business is to the searcher",
      control: "Largely fixed",
      icon: MapPin,
    },
    {
      title: "Prominence",
      body: "Reviews, links, mentions and reputation",
      control: "Improvable",
      icon: Star,
    },
  ];
  return (
    <Frame label="Diagram: the three local search factors — relevance, distance and prominence">
      <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-[12px] bg-teal-soft">
        <svg aria-hidden viewBox="0 0 320 180" className="absolute inset-0 size-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="#D9E2E8" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="320" height="180" fill="url(#grid)" />
          <path d="M0 120 C60 100 90 140 150 118 S250 70 320 92" fill="none" stroke="#fff" strokeWidth="10" />
          <path d="M110 0 C120 60 100 110 130 180" fill="none" stroke="#fff" strokeWidth="8" />
          <circle cx="160" cy="90" r="62" fill="#14B8A6" fillOpacity="0.08" stroke="#14B8A6" strokeDasharray="4 5" />
          <circle cx="160" cy="90" r="30" fill="#14B8A6" fillOpacity="0.12" />
          <circle cx="160" cy="90" r="6" fill="#0F2742" />
        </svg>
        <span className="absolute left-1/2 top-[58%] -translate-x-1/2 rounded-md bg-white px-2 py-1 text-xs font-semibold text-navy shadow-sm">
          Searcher
        </span>
      </div>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {signals.map((s) => (
          <li key={s.title} className="diagram-item rounded-[14px] border border-line bg-offwhite/80 p-4">
            <s.icon aria-hidden className="size-5 text-teal-ink" strokeWidth={1.75} />
            <p className="mt-2 font-semibold text-navy">{s.title}</p>
            <p className="mt-1 text-sm leading-snug text-muted">{s.body}</p>
            <p className="mt-2">
              <Tag tone={s.control === "Improvable" ? "teal" : "navy"}>{s.control}</Tag>
            </p>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/** Tradies: example trade × job type → page role. */
export function TradeJobMatrix() {
  const rows = [
    { trade: "Plumber", job: "Blocked drains", icon: Wrench, page: "Urgent service page", cta: "Tap-to-call + service area" },
    { trade: "Electrician", job: "Switchboard upgrade", icon: Zap, page: "Planned-work page", cta: "Quote request + credentials" },
    { trade: "Roofer", job: "Roof repairs", icon: Hammer, page: "Repair page, separate from reroofing", cta: "Enquiry form + photos" },
  ];
  return (
    <Frame label="Illustrative example: different trade jobs need different pages and calls to action">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">Illustrative service-to-page map</p>
      </div>
      <div className="mt-5 hidden grid-cols-[1fr_1.1fr_1.1fr] gap-3 px-4 text-xs font-semibold uppercase tracking-[0.1em] text-muted sm:grid">
        <span>Trade &amp; job</span>
        <span>Page role</span>
        <span>Next step</span>
      </div>
      <ul className="mt-2 space-y-3">
        {rows.map((r) => (
          <li
            key={r.trade}
            className="grid gap-3 diagram-item rounded-[14px] border border-line bg-offwhite/80 p-4 sm:grid-cols-[1fr_1.1fr_1.1fr] sm:items-center"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-navy to-navy-700 text-white shadow-[0_6px_14px_-8px_rgb(15_39_66/0.7)]">
                <r.icon aria-hidden className="size-4" />
              </span>
              <div>
                <p className="font-semibold leading-tight text-navy">{r.trade}</p>
                <p className="text-sm text-muted">{r.job}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-navy">{r.page}</p>
            <p className="text-sm text-slate">{r.cta}</p>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/** Roofing: service-to-page map with urgent vs planned journeys. */
export function RoofingPageMap() {
  return (
    <Frame label="Illustrative roofing service-to-page map with urgent and planned enquiry journeys">
      <p className="eyebrow">Illustrative roofing page map</p>
      <div className="mt-5 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-[10px] bg-navy px-4 py-2.5 text-sm font-semibold text-white">
          <Hammer aria-hidden className="size-4 text-teal" /> Roofing business
        </span>
      </div>
      <div aria-hidden className="mx-auto h-5 w-px bg-line" />
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { t: "Roof repairs", d: "Issues handled, areas served, when a site visit is needed", tag: "Urgent journey", tone: "coral" as const },
          { t: "Reroofing", d: "Materials actually offered, job stages, project proof", tag: "Planned journey", tone: "teal" as const },
          { t: "Roof replacement", d: "Only if genuinely distinct in offer and search intent", tag: "Validate first", tone: "navy" as const },
        ].map((c) => (
          <div key={c.t} className="diagram-item rounded-[14px] border border-line bg-offwhite/80 p-4">
            <p className="font-semibold text-navy">{c.t}</p>
            <p className="mt-1 text-sm leading-snug text-muted">{c.d}</p>
            <p className="mt-3">
              <Tag tone={c.tone}>{c.tag}</Tag>
            </p>
          </div>
        ))}
      </div>
      <div aria-hidden className="mx-auto h-5 w-px bg-line" />
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-[10px] border-2 border-coral bg-white px-4 py-2.5 text-sm font-semibold text-navy">
          <MessageSquareText aria-hidden className="size-4 text-coral-hover" /> Quote request or call
        </span>
      </div>
      <p className="mt-4 text-center text-xs text-muted">Sample page roles for a roofer — not URLs or keywords we target.</p>
    </Frame>
  );
}

/** Web design: desktop + mobile wireframe of a sample tradie site. */
export function SiteWireframe() {
  const nav = ["Services", "Projects", "About", "Contact"];
  return (
    <figure
      role="group"
      aria-label="Wireframe of a sample tradie website on desktop and mobile, showing services, proof and a quote button"
      className="relative"
    >
      <div className="rounded-[16px] border border-line bg-white shadow-[var(--shadow-lift)]">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="ml-3 h-5 flex-1 rounded-md bg-offwhite" />
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="h-4 w-24 rounded bg-navy" />
            <span className="hidden gap-3 sm:flex">
              {nav.map((n) => (
                <span key={n} className="text-[0.7rem] font-semibold text-muted">
                  {n}
                </span>
              ))}
            </span>
            <span className="rounded-md bg-coral px-2.5 py-1 text-[0.7rem] font-bold text-navy">Get a quote</span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="block h-3 w-3/4 rounded bg-navy/80" />
              <span className="mt-2 block h-3 w-1/2 rounded bg-navy/80" />
              <span className="mt-4 block h-2 w-full rounded bg-line" />
              <span className="mt-2 block h-2 w-5/6 rounded bg-line" />
              <div className="mt-4 flex gap-2">
                <span className="h-6 w-20 rounded-md bg-coral" />
                <span className="h-6 w-20 rounded-md border border-navy" />
              </div>
            </div>
            <div className="aspect-[4/3] rounded-[10px] bg-teal-soft" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {["Roof repairs", "Reroofing", "Guttering"].map((s) => (
              <div key={s} className="rounded-[10px] border border-line p-3">
                <span className="block size-5 rounded bg-teal/30" />
                <p className="mt-2 text-[0.7rem] font-semibold text-navy">{s}</p>
                <span className="mt-1 block h-1.5 w-full rounded bg-line" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-[10px] bg-offwhite p-3">
            <Star aria-hidden className="size-3.5 text-teal-ink" />
            <span className="text-[0.7rem] font-semibold text-navy">Reviews &amp; project proof</span>
            <span className="ml-auto h-1.5 w-1/3 rounded bg-line" />
          </div>
        </div>
      </div>
      <div className="absolute -bottom-8 -right-2 w-[34%] min-w-[120px] rounded-[18px] border-4 border-navy bg-white p-2.5 shadow-[var(--shadow-lift)] sm:-right-6">
        <span className="mx-auto block h-1 w-8 rounded bg-line" />
        <span className="mt-3 block h-2 w-3/4 rounded bg-navy/80" />
        <span className="mt-1.5 block h-2 w-1/2 rounded bg-navy/80" />
        <span className="mt-3 block aspect-[4/3] rounded-md bg-teal-soft" />
        <span className="mt-3 flex items-center justify-center gap-1 rounded-md bg-coral py-1.5 text-[0.6rem] font-bold text-navy">
          <Phone aria-hidden className="size-2.5" /> Call now
        </span>
        <span className="mt-1.5 block rounded-md border border-navy py-1 text-center text-[0.6rem] font-semibold text-navy">
          Request a quote
        </span>
      </div>
    </figure>
  );
}

/** Free audit: what the reviewer looks at. */
export function AuditChecklistVisual() {
  const areas = [
    { icon: Search, t: "Search visibility" },
    { icon: Gauge, t: "Technical basics" },
    { icon: FileText, t: "On-page SEO" },
    { icon: MapPin, t: "Local SEO" },
    { icon: LayoutTemplate, t: "Website & UX" },
    { icon: Globe2, t: "Competitor context" },
  ];
  return (
    <Frame label="Summary of the areas reviewed in the free SEO audit">
      <p className="eyebrow">Your free audit</p>
      <ul className="mt-5 grid grid-cols-2 gap-3">
        {areas.map((a) => (
          <li key={a.t} className="flex items-center gap-3 diagram-item rounded-[14px] border border-line bg-offwhite/80 p-3">
            <a.icon aria-hidden className="size-5 shrink-0 text-teal-ink" strokeWidth={1.75} />
            <span className="text-sm font-semibold text-navy">{a.t}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 grid grid-cols-3 divide-x divide-line rounded-[12px] bg-navy py-4 text-center text-white">
        {[
          ["5–7", "Findings"],
          ["3", "Priorities"],
          ["0", "Access needed"],
        ].map(([v, l]) => (
          <div key={l}>
            <p className="font-brand text-2xl font-semibold text-teal">{v}</p>
            <p className="text-xs text-white/75">{l}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/** About: who leads what, and where the work overlaps. */
export function RoleSplitDiagram() {
  return (
    <Frame label="Diagram: Asif leads SEO growth, Al Amin leads web implementation and QA, and they work together where SEO and development overlap">
      <p className="eyebrow">Who leads what</p>
      <div className="relative mt-5 grid items-stretch gap-3 sm:grid-cols-2">
        <div className="diagram-item rounded-[16px] border border-line bg-offwhite/80 p-5">
          <span className="icon-tile size-10 rounded-[12px]">
            <Search aria-hidden className="size-[18px]" />
          </span>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.1em] text-muted">Asif</p>
          <p className="mt-1 font-display text-xl font-bold text-navy">SEO growth</p>
          <p className="mt-2 text-sm text-muted">Strategy, audits, Local SEO, content, reporting</p>
        </div>
        <div className="diagram-item rounded-[16px] border border-line bg-offwhite/80 p-5">
          <span className="icon-tile size-10 rounded-[12px]">
            <LayoutTemplate aria-hidden className="size-[18px]" />
          </span>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.1em] text-muted">Al Amin</p>
          <p className="mt-1 font-display text-xl font-bold text-navy">Web &amp; QA</p>
          <p className="mt-2 text-sm text-muted">Implementation, testing, performance, maintenance</p>
        </div>
      </div>
      <div aria-hidden className="mx-auto hidden h-5 w-[calc(50%+2px)] rounded-b-[14px] border-x-2 border-b-2 border-dashed border-teal/40 sm:block" />
      <div className="mt-3 flex items-center justify-center sm:mt-0">
        <span className="surface-navy rounded-[14px] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgb(15_39_66/0.8)]">
          Shared
          <span className="block text-xs font-normal text-white/70">technical SEO &amp; site changes</span>
        </span>
      </div>
    </Frame>
  );
}

/** Market focus: Bangladesh base, remote delivery to New Zealand. */
export function RemoteDeliveryVisual() {
  return (
    <Frame label="Top Spot Studio is based in Bangladesh and works remotely with businesses in New Zealand and other markets">
      <div className="relative aspect-[16/10]">
        <svg aria-hidden viewBox="0 0 320 200" className="absolute inset-0 size-full">
          <defs>
            <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#D9E2E8" />
            </pattern>
          </defs>
          <rect width="320" height="200" rx="12" fill="url(#dots)" />
          <path d="M70 70 Q 180 -10 250 140" fill="none" stroke="#14B8A6" strokeWidth="2.5" strokeDasharray="6 6" />
          <circle cx="70" cy="70" r="9" fill="#0F2742" />
          <circle cx="70" cy="70" r="18" fill="#0F2742" fillOpacity="0.1" />
          <circle cx="250" cy="140" r="9" fill="#14B8A6" />
          <circle cx="250" cy="140" r="18" fill="#14B8A6" fillOpacity="0.15" />
        </svg>
        <div className="absolute left-[6%] top-[52%] rounded-[10px] border border-line bg-white px-3 py-2 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Based in</p>
          <p className="text-sm font-bold text-navy">Bangladesh</p>
        </div>
        <div className="absolute right-[4%] top-[8%] rounded-[10px] border border-line bg-white px-3 py-2 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">First market</p>
          <p className="text-sm font-bold text-navy">New Zealand</p>
        </div>
      </div>
      <p className="mt-2 text-center text-sm text-muted">Remote delivery · no New Zealand office</p>
    </Frame>
  );
}

/** Before/after comparison bars, using only verified figures. */
export function ComparisonBars({
  title,
  rows,
  caption,
}: {
  title: string;
  rows: { label: string; before: number; after: number; beforeLabel: string; afterLabel: string; change?: string }[];
  caption: string;
}) {
  return (
    <figure
      data-observe
      className="relative overflow-hidden rounded-[24px] border border-line bg-white p-6 shadow-[var(--shadow-lift)] sm:p-8"
    >
      <span aria-hidden className="absolute -right-16 -top-16 size-48 rounded-full bg-gradient-to-br from-teal/20 to-sky/10 blur-2xl" />
      <p className="eyebrow relative">{title}</p>
      <div className="relative mt-7 space-y-8">
        {rows.map((r) => {
          const max = Math.max(r.before, r.after);
          return (
            <div key={r.label}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-semibold text-navy">{r.label}</p>
                {r.change ? <Tag>{r.change}</Tag> : null}
              </div>
              <dl className="mt-3 space-y-2.5">
                <div className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
                  <dt className="text-xs font-medium text-muted">Before</dt>
                  <dd className="flex items-center gap-3">
                    <span className="draw-x h-3.5 rounded-full bg-gradient-to-r from-line to-[#c7d3de]" style={{ width: `${(r.before / max) * 100}%` }} />
                    <span className="shrink-0 text-sm font-semibold text-slate">{r.beforeLabel}</span>
                  </dd>
                </div>
                <div className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
                  <dt className="text-xs font-medium text-muted">After</dt>
                  <dd className="flex items-center gap-3">
                    <span
                      className="draw-x h-3.5 rounded-full bg-gradient-to-r from-teal to-sky shadow-[0_6px_16px_-6px_rgb(20_184_166/0.7)]"
                      style={{ width: `${(r.after / max) * 100}%` }}
                    />
                    <span className="shrink-0 text-sm font-semibold text-navy">{r.afterLabel}</span>
                  </dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>
      <figcaption className="relative mt-7 border-t border-line pt-4 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}
