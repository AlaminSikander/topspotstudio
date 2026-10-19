"use client";

import { useEffect, useRef, useState } from "react";

const PATTERN = /^([^\d]*?)(\d{1,3}(?:,\d{3})+|\d+)(\.\d+)?([^\d]*)$/;

function parse(value: string) {
  const m = value.trim().match(PATTERN);
  if (!m) return null;
  const [, prefix, int, frac = "", suffix] = m;
  return {
    prefix,
    suffix,
    target: Number(int.replace(/,/g, "") + frac),
    decimals: frac ? frac.length - 1 : 0,
    grouped: int.includes(","),
  };
}

/**
 * Counts up to a verified figure when it scrolls into view. The server renders the real value,
 * screen readers always get the final text, and anything that isn't a single number stays static.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!parsed || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { prefix, suffix, target, decimals, grouped } = parsed;
    const format = (n: number) =>
      prefix +
      n.toLocaleString("en-NZ", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: grouped,
      }) +
      suffix;

    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (!started) setDisplay(format(0));
          return;
        }
        started = true;
        io.disconnect();
        const t0 = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          setDisplay(p < 1 ? format(target * eased) : value);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!parsed) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      <span className="invisible">{value}</span>
      <span aria-hidden className={`absolute inset-0 whitespace-nowrap ${className}`}>
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
