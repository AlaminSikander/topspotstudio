import type { CSSProperties, ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaLink } from "@/components/ui/CtaLink";
import { HeroShell, Highlight } from "./HeroBackdrop";
import type { Crumb } from "@/lib/schema";
import type { TrackedEvent } from "@/lib/analytics";

export type Cta = { label: string; href: string; event?: TrackedEvent };

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function TrustLine({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium backdrop-blur ${
            dark ? "border-white/10 bg-white/[0.05] text-white/80" : "border-line/80 bg-white/70 text-slate"
          }`}
        >
          <CheckCircle2 aria-hidden className={`size-4 ${dark ? "text-teal-300" : "text-teal"}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Media slot with a soft gradient halo and gentle parallax. */
export function HeroMedia({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rise-in relative ${className}`} style={delay(240)}>
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-teal/25 via-sky/15 to-coral/20 blur-2xl sm:-inset-8"
      />
      <div className="relative" data-parallax="0.035">
        {children}
      </div>
    </div>
  );
}

export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  highlight,
  lead,
  body,
  primary,
  secondary,
  trust,
  media,
  location = "hero",
}: {
  breadcrumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  /** Part of the title to render with the brand gradient. */
  highlight?: string;
  lead: ReactNode;
  body?: ReactNode;
  primary?: Cta;
  secondary?: Cta;
  trust?: string[];
  media?: ReactNode;
  location?: string;
}) {
  return (
    <HeroShell>
      {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
      <div
        className={`grid items-center gap-14 ${breadcrumbs ? "mt-10 md:mt-14" : "mt-8 md:mt-14"} ${
          media ? "lg:grid-cols-[1.05fr_0.95fr] lg:gap-16" : ""
        }`}
      >
        <div className={media ? "" : "max-w-[880px]"}>
          {eyebrow ? (
            <p className="rise-in badge" style={delay(40)}>
              <span aria-hidden className="badge-dot" />
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={`rise-in ${eyebrow ? "mt-6" : ""} ${media ? "text-[clamp(2.4rem,1.55rem+3vw,3.75rem)]" : ""}`}
            style={delay(90)}
          >
            <Highlight text={title} highlight={highlight} />
          </h1>
          <div className="rise-in lead mt-6 max-w-[640px]" style={delay(160)}>
            {lead}
          </div>
          {body ? (
            <div className="rise-in mt-4 max-w-[640px] space-y-4 text-slate" style={delay(210)}>
              {body}
            </div>
          ) : null}
          {primary || secondary ? (
            <div className="rise-in mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={delay(260)}>
              {primary ? (
                <CtaLink href={primary.href} location={location} event={primary.event} arrow>
                  {primary.label}
                </CtaLink>
              ) : null}
              {secondary ? (
                <CtaLink href={secondary.href} variant="secondary" location={`${location}_secondary`} event={secondary.event}>
                  {secondary.label}
                </CtaLink>
              ) : null}
            </div>
          ) : null}
          {trust ? (
            <div className="rise-in mt-8" style={delay(320)}>
              <TrustLine items={trust} />
            </div>
          ) : null}
        </div>
        {media ? <HeroMedia>{media}</HeroMedia> : null}
      </div>
    </HeroShell>
  );
}
