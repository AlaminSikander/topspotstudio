"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { track, type TrackedEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "ghost" | "light";

export const buttonStyles: Record<Variant, string> = {
  primary: "btn btn-primary min-h-12",
  secondary: "btn btn-secondary min-h-12",
  ghost: "btn btn-ghost",
  light: "btn btn-light min-h-12",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  event?: TrackedEvent;
  location?: string;
  arrow?: boolean;
};

export function CtaLink({ href, children, variant = "primary", className = "", event, location, arrow }: Props) {
  const resolvedEvent =
    event ?? (href === "/free-seo-audit/" || href.startsWith("/free-seo-audit/#") ? "free_audit_cta_click" : undefined);
  return (
    <Link
      href={href}
      className={`${buttonStyles[variant]} ${className}`}
      onClick={resolvedEvent ? () => track(resolvedEvent, { cta_location: location }) : undefined}
    >
      {children}
      {arrow ? <ArrowRight aria-hidden className="btn-arrow size-4" /> : null}
    </Link>
  );
}
