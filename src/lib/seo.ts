import type { Metadata } from "next";
import { IS_PRODUCTION, SITE_NAME, SITE_URL } from "./site";

export const GOOGLEBOT_PREVIEWS = { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } as const;

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Force noindex even in production (e.g. empty blog hub, unapproved policy). */
  noindex?: boolean;
  /** Ask crawlers not to follow links (CMS robots setting). */
  nofollow?: boolean;
  ogImage?: string;
  type?: "website" | "article";
  /** Absolute canonical override; defaults to the self-referencing URL on SITE_URL. */
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
};

export const defaultOgImage = (path: string) => `/og${path === "/" ? "/home" : path.replace(/\/$/, "")}.png`;

export function pageMetadata({
  title,
  description,
  path,
  noindex,
  nofollow,
  ogImage,
  type = "website",
  canonical,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  twitterImage,
}: PageMetaInput): Metadata {
  const indexable = IS_PRODUCTION && !noindex;
  const follow = IS_PRODUCTION && !nofollow;
  const url = absoluteUrl(path);
  const image = ogImage ?? defaultOgImage(path);
  const socialTitle = ogTitle || title;
  const socialDescription = ogDescription || description;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonical || url },
    robots: indexable ? { index: true, follow, googleBot: { index: true, follow, ...GOOGLEBOT_PREVIEWS } } : { index: false, follow },
    openGraph: {
      type,
      url,
      title: socialTitle,
      description: socialDescription,
      siteName: SITE_NAME,
      locale: "en_NZ",
      images: [{ url: image, width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle || socialTitle,
      description: twitterDescription || socialDescription,
      images: [twitterImage || image],
    },
  };
}
