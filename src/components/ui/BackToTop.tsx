"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUp } from "lucide-react";

const RADIUS = 25;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SHOW_AFTER = 480;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      ringRef.current?.style.setProperty("stroke-dashoffset", String(CIRCUMFERENCE * (1 - progress)));
      setVisible(window.scrollY > SHOW_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    // Keyboard users get focus moved to the top of the page along with the view.
    if (e.detail === 0) document.querySelector<HTMLElement>('header a[href="/"]')?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 size-[52px] rounded-full transition-[opacity,translate,scale] duration-500 ease-[var(--ease-out-expo)] focus-visible:outline-offset-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 ${
        visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-90 opacity-0"
      }`}
    >
      <span
        className="surface-navy relative flex size-full items-center justify-center rounded-full text-white shadow-[0_14px_30px_-12px_rgb(10_26_46/0.65)] ring-1 ring-white/15 transition-[translate,box-shadow] duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:shadow-[0_20px_36px_-14px_rgb(20_184_166/0.75)] group-active:translate-y-0"
      >
        <svg aria-hidden viewBox="0 0 56 56" className="absolute inset-0 size-full -rotate-90">
          <defs>
            <linearGradient id="back-to-top-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5eead4" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>
          </defs>
          <circle cx="28" cy="28" r={RADIUS} fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="2" />
          <circle
            ref={ringRef}
            cx="28"
            cy="28"
            r={RADIUS}
            fill="none"
            stroke="url(#back-to-top-ring)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
          />
        </svg>
        <ArrowUp
          aria-hidden
          className="relative size-5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5"
          strokeWidth={2.25}
        />
      </span>
    </button>
  );
}
