import type { ReactNode } from "react";

/** Layered decorative background for hero areas: mesh gradient, masked grid and slow-drifting light orbs. */
export function HeroBackdrop({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 ${dark ? "bg-grid-dark" : "bg-grid"}`} />
      <div data-parallax="0.1" className="absolute -left-40 top-16">
        <div className={`orb relative size-[440px] ${dark ? "bg-teal/25" : "bg-teal/20"}`} />
      </div>
      <div data-parallax="0.06" className="absolute -right-32 -top-32">
        <div className={`orb relative size-[540px] [animation-delay:-8s] ${dark ? "bg-sky/20" : "bg-sky/[0.18]"}`} />
      </div>
      <div className="absolute -bottom-40 left-1/3">
        <div className={`orb relative size-[380px] [animation-delay:-14s] ${dark ? "bg-coral/[0.12]" : "bg-coral/10"}`} />
      </div>
      <div
        className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent ${dark ? "via-white/15" : "via-navy/10"} to-transparent`}
      />
    </div>
  );
}

/** Hero section shell that sits underneath the floating header. */
export function HeroShell({
  children,
  tone = "light",
  className = "",
  innerClassName = "pb-20 pt-8 md:pb-28 md:pt-10",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  innerClassName?: string;
}) {
  return (
    <section
      className={`relative -mt-[var(--header-h)] overflow-clip pt-[var(--header-h)] ${
        tone === "dark" ? "surface-deep text-white/80" : "surface-hero"
      } ${className}`}
    >
      <HeroBackdrop tone={tone} />
      <div className={`container-site relative ${innerClassName}`}>{children}</div>
    </section>
  );
}

/** Wraps the part of a heading that should carry the brand gradient. Text content is unchanged. */
export function Highlight({
  text,
  highlight,
  className = "text-gradient",
}: {
  text: string;
  highlight?: string;
  className?: string;
}) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const i = text.indexOf(highlight);
  return (
    <>
      {text.slice(0, i)}
      <span className={className}>{highlight}</span>
      {text.slice(i + highlight.length)}
    </>
  );
}
