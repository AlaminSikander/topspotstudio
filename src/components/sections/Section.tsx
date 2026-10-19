import type { ReactNode } from "react";

export type Tone = "base" | "white" | "tint" | "navy";

const toneClass: Record<Tone, string> = {
  base: "bg-offwhite",
  white: "bg-white",
  tint: "surface-tint",
  navy: "surface-navy text-white/85 [&_h2]:text-white [&_h3]:text-white",
};

function ToneDecor({ tone }: { tone: Tone }) {
  if (tone === "navy") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="orb -right-40 -top-40 size-[520px] bg-teal/[0.14]" />
        <div className="orb -bottom-48 -left-40 size-[460px] bg-sky/10 [animation-delay:-10s]" />
      </div>
    );
  }
  if (tone === "tint") {
    return (
      <div
        aria-hidden
        className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_100%_0%,#000,transparent_70%)]"
      />
    );
  }
  if (tone === "white") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent"
      />
    );
  }
  return null;
}

export function Section({
  id,
  tone = "base",
  className = "",
  containerClassName = "",
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`section relative overflow-clip ${toneClass[tone]} ${className}`}
    >
      <ToneDecor tone={tone} />
      <div className={`container-site relative ${containerClassName}`}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "base",
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  className?: string;
}) {
  const centered = align === "center";
  const dark = tone === "navy";
  return (
    <div className={`reveal ${centered ? "mx-auto text-center" : ""} max-w-[780px] ${className}`}>
      {eyebrow ? <p className={`eyebrow ${dark ? "!text-teal-300" : ""}`}>{eyebrow}</p> : null}
      <h2 id={id} className={eyebrow ? "mt-4" : ""}>
        {title}
      </h2>
      {intro ? (
        <div className={`mt-5 space-y-4 text-lg ${dark ? "text-white/75" : "text-slate"}`}>{intro}</div>
      ) : null}
    </div>
  );
}
