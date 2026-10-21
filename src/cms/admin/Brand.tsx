const MARK_T = "0,0 83,0 98.7,27 72,27 161.5,182 147,207 42,27 15.7,27";
const MARK_S = "105,0 269,0 253.3,27 151.3,27 161.8,45 242.8,45 187.2,140.4 159.5,93 184.3,93 198.3,69 145.7,69";

function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size * 1.3} height={size} viewBox="0 0 270 208" aria-hidden>
      <polygon points={MARK_T} fill="#0F2742" />
      <polygon points={MARK_S} fill="#14B8A6" />
    </svg>
  );
}

export function Icon() {
  return <Mark size={22} />;
}

export function Logo() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      <Mark size={40} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
        <strong style={{ fontSize: 22, letterSpacing: -0.3, color: "var(--theme-text)" }}>TOP SPOT</strong>
        <span style={{ fontSize: 11, letterSpacing: 6, color: "#0f766e" }}>STUDIO · CMS</span>
      </span>
    </span>
  );
}
