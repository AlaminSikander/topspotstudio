import { Sparkle } from "lucide-react";

/** Infinitely scrolling strip; the duplicate row is hidden from assistive tech and the motion pauses on hover. */
export function Marquee({ items, label, tone = "dark" }: { items: string[]; label: string; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-center gap-8 whitespace-nowrap font-display text-lg font-semibold tracking-tight md:gap-12 md:text-xl ${
            dark ? "text-white/55" : "text-navy/50"
          }`}
        >
          {item}
          <Sparkle aria-hidden className={`size-4 ${dark ? "text-teal-300/70" : "text-teal/70"}`} />
        </li>
      ))}
    </ul>
  );
  return (
    <div role="region" aria-label={label} className="marquee overflow-hidden py-6">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
