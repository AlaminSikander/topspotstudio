const MARK_T = "0,0 83,0 98.7,27 72,27 161.5,182 147,207 42,27 15.7,27";
const MARK_S =
  "105,0 269,0 253.3,27 151.3,27 161.8,45 242.8,45 187.2,140.4 159.5,93 184.3,93 198.3,69 145.7,69";

export function LogoMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 270 208"
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <polygon points={MARK_T} />
      <polygon points={MARK_S} />
    </svg>
  );
}

export function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  const ink = variant === "dark" ? "text-navy" : "text-white";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className={`h-8 w-auto ${ink}`} />
      <span aria-hidden className="h-9 w-px bg-teal" />
      <svg aria-hidden viewBox="0 0 104 36" className={`h-9 w-auto ${ink}`} style={{ fontFamily: "var(--font-brand)" }}>
        <text x="0" y="17" fontSize="19" fontWeight="600" fill="currentColor" textLength="102" lengthAdjust="spacingAndGlyphs">
          TOP SPOT
        </text>
        <text x="1" y="32" fontSize="8.4" fontWeight="500" fill="#14B8A6" letterSpacing="3.4">
          STUDIO
        </text>
      </svg>
      <span className="sr-only">Top Spot Studio</span>
    </span>
  );
}
