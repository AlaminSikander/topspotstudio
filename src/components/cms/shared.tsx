import type { StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Cta } from "@/components/sections/PageHero";
import type { Tone } from "@/components/sections/Section";
import type { Media, Page, Post, SiteSetting } from "@/payload-types";
import type { TrackedEvent } from "@/lib/analytics";
import type { Crumb } from "@/lib/schema";
import { resolveHref, type LinkValue, type PathMap } from "@/lib/cms/links";
import { SITE_IMAGE_MAP } from "./registry";

export type RenderCtx = {
  paths: PathMap;
  page?: Page;
  crumbs: Crumb[];
  settings: SiteSetting;
  posts: Post[];
  tone: Tone;
};

/** Literal class names so Tailwind generates them. */
export const MT: Record<string, string> = {
  "0": "",
  "4": "mt-4",
  "5": "mt-5",
  "6": "mt-6",
  "7": "mt-7",
  "8": "mt-8",
  "10": "mt-10",
  "12": "mt-12",
  "14": "mt-14",
  "16": "mt-16",
};

export const spacing = (value: string | null | undefined, fallback: string) => MT[value && value !== "auto" ? value : fallback] ?? "";

type CtaField = ({ label?: string | null; event?: string | null } & NonNullable<LinkValue>) | null | undefined;

export function ctaOf(field: CtaField, paths: PathMap): Cta | undefined {
  if (!field?.label) return undefined;
  const href = resolveHref(field, paths);
  if (!href) return undefined;
  return { label: field.label, href, event: (field.event as TrackedEvent | null) ?? undefined };
}

export type ImageField = {
  source?: "site" | "library" | null;
  siteImage?: string | null;
  media?: number | Media | null;
  alt?: string | null;
  position?: string | null;
  ratio?: string | null;
} | null | undefined;

export function imageOf(field: ImageField): { src: StaticImageData | string; alt: string; position?: string } | null {
  if (!field) return null;
  if (field.source === "library") {
    const m = typeof field.media === "object" ? field.media : null;
    if (!m?.url) return null;
    return { src: m.url, alt: field.alt || m.alt || "", position: field.position || undefined };
  }
  const src = field.siteImage ? SITE_IMAGE_MAP[field.siteImage as keyof typeof SITE_IMAGE_MAP] : undefined;
  if (!src) return null;
  return { src, alt: field.alt || "", position: field.position || undefined };
}

export const textList = (items?: { text: string }[] | null) => (items ?? []).map((i) => i.text);

/** Renders text with one phrase turned into a link (used by checklist items). */
export function withLinkedPhrase(text: string, phrase: string | null | undefined, href: string | null, className: string): ReactNode {
  if (!phrase || !href || !text.includes(phrase)) return text;
  const i = text.indexOf(phrase);
  return (
    <>
      {text.slice(0, i)}
      <Link href={href} className={className}>
        {phrase}
      </Link>
      {text.slice(i + phrase.length)}
    </>
  );
}
