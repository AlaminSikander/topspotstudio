import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { IS_PRODUCTION } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/cms-api/", "/preview/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
