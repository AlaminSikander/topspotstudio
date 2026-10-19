import type { Metadata } from "next";
import { IS_PRODUCTION, SITE_NAME, SITE_URL } from "./site";

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Force noindex even in production (e.g. empty blog hub, unapproved policy). */
  noindex?: boolean;
  ogImage?: string;
  type?: "website" | "article";
};

export function pageMetadata({ title, description, path, noindex, ogImage, type = "website" }: PageMetaInput): Metadata {
  const indexable = IS_PRODUCTION && !noindex;
  const url = absoluteUrl(path);
  const image = ogImage ?? `/og${path === "/" ? "/home" : path.replace(/\/$/, "")}.png`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: IS_PRODUCTION },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: "en_NZ",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
