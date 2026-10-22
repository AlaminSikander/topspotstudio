import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteShell } from "./_shell/SiteShell";
import { GOOGLEBOT_PREVIEWS } from "@/lib/seo";
import { IS_PRODUCTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_TAGLINE} | ${SITE_NAME}`, template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
  robots: IS_PRODUCTION
    ? { index: true, follow: true, googleBot: { index: true, follow: true, ...GOOGLEBOT_PREVIEWS } }
    : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0F2742",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <SiteShell>{children}</SiteShell>;
}
