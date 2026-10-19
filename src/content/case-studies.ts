import type { Metric } from "@/components/sections/Blocks";
import { routes } from "@/lib/site";

export type CaseCard = {
  href: string;
  label: string;
  title: string;
  metrics: Metric[];
  summary: string;
};

// Hub metrics are limited to figures verified in the source records; see docs/ROADMAP.md (content decisions).
export const caseCards: CaseCard[] = [
  {
    href: routes.caseInfluencer,
    label: "Malaysian Influencer Marketing Agency",
    title: "Influencer Marketing Agency SEO Growth",
    metrics: [
      { value: "99", label: "tracked form leads" },
      { value: "+31.2%", label: "Google Search clicks" },
      { value: "+88.0%", label: "Search impressions" },
    ],
    summary:
      "A long-running SEO engagement covering strategy, technical and on-page improvements, keyword research, content development and coordinated authority building. The work helped transform a very small organic baseline into a meaningful acquisition channel while also generating tracked enquiries.",
  },
  {
    href: routes.caseConsulting,
    label: "Training & Consulting Business",
    title: "SEO Foundation for a Training & Consulting Business",
    metrics: [
      { value: "+182.4%", label: "Google Search clicks (514)" },
      { value: "165K+", label: "Search impressions" },
      { value: "4,379", label: "Google organic page views" },
    ],
    summary:
      "An end-to-end SEO build covering strategy, technical cleanup, keyword mapping, on-page optimisation, content publishing and foundational authority work. This case study is designed to show how an SEO system is built from the ground up when the business needs stronger structure, relevance and consistency before growth can compound.",
  },
  {
    href: routes.caseImageEditing,
    label: "AI-Powered Image Editing Platform",
    title: "Organic Growth for an AI Photo Retouching Platform",
    metrics: [
      { value: "4,182 → 5,400", label: "monthly organic visitors" },
      { value: "~29%", label: "organic visitor growth" },
      { value: "4 months", label: "measured period" },
    ],
    summary:
      "A content-led SEO programme that increased monthly organic visitors from 4,182 to 5,400 over four months. The project combined consistent publishing with supporting SEO and off-page activity, showing how steady execution can move an established content base forward over time.",
  },
];
