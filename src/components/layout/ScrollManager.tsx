"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

const keyOf = () => window.location.pathname + window.location.search;

/**
 * New pages always open at the top; browser back/forward returns to where the visitor left that page.
 * Links with a #hash are left to the router so they still land on their target.
 */
export function ScrollManager() {
  const pathname = usePathname();
  const positions = useRef(new Map<string, number>());
  const currentKey = useRef<string | null>(null);
  const fromHistory = useRef(false);

  useEffect(() => {
    currentKey.current = keyOf();
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (currentKey.current) positions.current.set(currentKey.current, window.scrollY);
      });
    };
    const onPop = () => {
      fromHistory.current = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useLayoutEffect(() => {
    const key = keyOf();
    if (currentKey.current === null || currentKey.current === key) return;
    currentKey.current = key;

    const restoring = fromHistory.current;
    fromHistory.current = false;
    if (!restoring && window.location.hash) return;

    const top = restoring ? (positions.current.get(key) ?? 0) : 0;
    const apply = () => window.scrollTo({ top, left: 0, behavior: "instant" });
    apply();
    // Re-apply after the router's own focus/scroll handling and late layout (fonts, images) settle.
    const raf = requestAnimationFrame(apply);
    const timer = window.setTimeout(apply, 120);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
