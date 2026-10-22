import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { IS_PRODUCTION, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      {
        userAgent: "*",
        // Uploaded images are public and referenced by pages and og:image tags.
        allow: ["/", "/cms-api/media/file/"],
        disallow: ["/api/", "/admin/", "/cms-api/", "/preview/", "/exit-preview/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
