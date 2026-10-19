import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { routes } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

const pages: Record<string, { eyebrow: string; title: string }> = {
  home: { eyebrow: "SEO + Web Growth", title: "SEO & Web Growth for Service Businesses" },
  [routes.nzSeo]: { eyebrow: "SEO Services · New Zealand", title: "SEO Services for New Zealand Service Businesses" },
  [routes.nzLocalSeo]: { eyebrow: "Local SEO · New Zealand", title: "Local SEO Services for New Zealand Businesses" },
  [routes.tradies]: { eyebrow: "Industry · Tradies", title: "SEO for Tradies That Turns Local Searches Into Enquiries" },
  [routes.roofing]: { eyebrow: "Industry · Roofing", title: "Roofing SEO That Turns Local Searches Into Enquiries" },
  [routes.webDesign]: { eyebrow: "Industry · Web Design", title: "Web Design for Tradies" },
  [routes.caseStudies]: { eyebrow: "Selected SEO Work", title: "SEO Case Studies & Results" },
  [routes.caseInfluencer]: { eyebrow: "Case Study · Influencer Marketing", title: "99 tracked form leads for a Malaysian influencer marketing agency" },
  [routes.caseConsulting]: { eyebrow: "Case Study · Training & Consulting", title: "+182.4% Google Search clicks for a training & consulting business" },
  [routes.caseImageEditing]: { eyebrow: "Case Study · AI Image Editing", title: "4,182 → 5,400 monthly organic visitors in four months" },
  [routes.audit]: { eyebrow: "Free SEO & Website Audit", title: "5–7 findings. 3 priorities. No access needed." },
  [routes.about]: { eyebrow: "About", title: "A founder-led SEO and web growth studio" },
  [routes.contact]: { eyebrow: "Contact", title: "Let's Talk About Your Business" },
  [routes.blog]: { eyebrow: "Blog", title: "Practical SEO & Web Growth Advice for Service Businesses" },
  [routes.privacy]: { eyebrow: "Privacy", title: "Privacy Policy" },
};

const keyToSlug = (key: string) => (key === "home" ? ["home.png"] : `${key.replace(/^\/|\/$/g, "")}.png`.split("/"));
const slugToKey = (slug: string[]) => {
  const joined = slug.join("/").replace(/\.png$/, "");
  return joined === "home" ? "home" : `/${joined}/`;
};

export function generateStaticParams() {
  return Object.keys(pages).map((key) => ({ slug: keyToSlug(key) }));
}

const MARK_T = "0,0 83,0 98.7,27 72,27 161.5,182 147,207 42,27 15.7,27";
const MARK_S = "105,0 269,0 253.3,27 151.3,27 161.8,45 242.8,45 187.2,140.4 159.5,93 184.3,93 198.3,69 145.7,69";

export async function GET(_req: Request, { params }: RouteContext<"/og/[...slug]">) {
  const { slug } = await params;
  const page = pages[slugToKey(slug)] ?? pages.home;
  const fontDir = join(process.cwd(), "src/assets/fonts");
  const [regular, semibold] = await Promise.all([
    readFile(join(fontDir, "Poppins-400.ttf")),
    readFile(join(fontDir, "Poppins-600.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0F2742",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "Poppins",
        }}
      >
        <svg
          width="520"
          height="450"
          viewBox="0 0 100 86.6"
          style={{ position: "absolute", right: -80, top: -60, opacity: 0.06 }}
        >
          <polygon points="0,0 100,0 50,86.6" fill="#FFFFFF" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="78" height="60" viewBox="0 0 270 208">
            <polygon points={MARK_T} fill="#FFFFFF" />
            <polygon points={MARK_S} fill="#FFFFFF" />
          </svg>
          <div style={{ width: 2, height: 56, background: "#14B8A6" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#FFFFFF", fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>TOP SPOT</div>
            <div style={{ color: "#14B8A6", fontSize: 16, letterSpacing: 8, marginTop: 2 }}>STUDIO</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
          <div style={{ color: "#14B8A6", fontSize: 24, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>
            {page.eyebrow}
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 62, fontWeight: 600, lineHeight: 1.12, marginTop: 20, letterSpacing: -1 }}>
            {page.title}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "rgba(255,255,255,0.7)", fontSize: 22 }}>
          <div>Founder-led · Bangladesh-based · Working remotely with NZ businesses</div>
          <div style={{ display: "flex", background: "#F9735B", color: "#0F2742", fontWeight: 600, padding: "12px 24px", borderRadius: 10 }}>
            Free SEO Audit
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Poppins", data: regular, weight: 400, style: "normal" },
        { name: "Poppins", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
