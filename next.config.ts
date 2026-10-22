import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { withPayload } from "@payloadcms/next/withPayload";
import { CANONICAL_ORIGIN, IS_PRODUCTION as isProduction, WWW_HOST } from "./src/lib/site";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/** The CMS, its API and draft previews are never indexable, whatever the environment. */
const privateHeaders = [
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  { key: "Cache-Control", value: "private, no-store" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      // Only the site stylesheet uses Tailwind; Payload's admin CSS must pass through untouched.
      "*.css": {
        condition: { all: [{ not: "foreign" }, { content: /@import\s+["']tailwindcss["']/ }] },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // `/:path*` captures without the trailing slash, so it is restored for pages (but not files) to land in one hop.
    const fromWww = [{ type: "host" as const, value: WWW_HOST.replace(/\./g, "\\.") }];
    return [
      { source: "/", has: fromWww, destination: `${CANONICAL_ORIGIN}/`, permanent: true },
      { source: "/:file((?:[^/]+/)*[^/]+\\.\\w+)", has: fromWww, destination: `${CANONICAL_ORIGIN}/:file`, permanent: true },
      { source: "/:path*", has: fromWww, destination: `${CANONICAL_ORIGIN}/:path*/`, permanent: true },
    ];
  },
  async headers() {
    const headers = [...securityHeaders];
    if (!isProduction) {
      headers.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
    }
    return [
      { source: "/:path*", headers },
      { source: "/admin/:path*", headers: privateHeaders },
      { source: "/admin", headers: privateHeaders },
      { source: "/cms-api/:path((?!media/file/).*)", headers: [privateHeaders[0]] },
      { source: "/preview/:path*", headers: privateHeaders },
    ];
  },
};

const withMDX = createMDX({});

export default withPayload(withMDX(nextConfig), { devBundleServerPackages: false });
