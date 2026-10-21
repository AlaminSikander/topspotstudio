import type { ReactNode } from "react";
import { ViewTransition } from "react";
import { Bricolage_Grotesque, Inter, Poppins } from "next/font/google";
import Script from "next/script";
import { CodeInjection, selectSnippets } from "@/components/cms/CodeInjection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollManager } from "@/components/layout/ScrollManager";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { BackToTop } from "@/components/ui/BackToTop";
import { footerData, headerData } from "@/lib/cms/chrome";
import { getPreviewContext } from "@/lib/cms/payload";
import { getCodeSnippets, getPathMap, getSiteData } from "@/lib/cms/queries";
import { siteJsonLd } from "@/lib/cms/structured-data";
import { GTM_ID } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  preload: false,
});

// Scroll reveals only hide content once JS is confirmed; if the observer never boots, everything is shown.
const motionFlag = `(function(d){d.classList.add('js');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.add('reveal-all')},3000)})(document.documentElement);`;

/** The public website's document: <html>, header, footer, site-wide schema and tracking codes. */
export async function SiteShell({ children }: { children: ReactNode }) {
  const [site, paths, { draft }] = await Promise.all([getSiteData(), getPathMap(), getPreviewContext()]);
  // Tracking and verification codes are never added to previews.
  const snippets = draft ? [] : await getCodeSnippets();
  const header = headerData(site, paths);
  return (
    <html
      lang="en-NZ"
      className={`${inter.variable} ${bricolage.variable} ${poppins.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
        <CodeInjection snippets={selectSnippets(snippets, "head", "all")} />
        {GTM_ID && !draft ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        ) : null}
      </head>
      <body className="flex min-h-screen flex-col">
        <CodeInjection snippets={selectSnippets(snippets, "bodyStart", "all")} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[10px] focus:bg-navy focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>
        <JsonLd data={siteJsonLd(site.settings)} />
        <ViewTransition name="site-header">
          <Header items={header.items} cta={header.cta} />
        </ViewTransition>
        <main id="main" className="flex-1">
          <ViewTransition default="page">{children}</ViewTransition>
        </main>
        <Footer data={footerData(site, paths)} />
        <BackToTop />
        <MotionProvider />
        <ScrollManager />
        <CodeInjection snippets={selectSnippets(snippets, "bodyEnd", "all")} />
      </body>
    </html>
  );
}
