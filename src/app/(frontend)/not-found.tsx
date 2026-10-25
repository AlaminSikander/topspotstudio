import type { Metadata } from "next";
import { NotFoundContent } from "@/components/cms/NotFoundContent";

// Next.js injects `<meta name="robots" content="noindex">` on 404s; null drops the layout's robots so it is the only tag.
export const metadata: Metadata = {
  title: "Page not found",
  robots: null,
};

export default function NotFound() {
  return <NotFoundContent />;
}
