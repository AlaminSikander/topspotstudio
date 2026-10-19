import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    const headers = [...securityHeaders];
    if (!isProduction) {
      headers.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
    }
    return [{ source: "/:path*", headers }];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
