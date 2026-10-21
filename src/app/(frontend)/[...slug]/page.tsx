import type { Metadata } from "next";
import { CmsPage } from "@/components/cms/CmsPage";
import { cmsPageMetadata } from "@/lib/cms/metadata";
import { getPreviewContext } from "@/lib/cms/payload";
import { getPage } from "@/lib/cms/queries";
import { redirectOrNotFound } from "@/lib/cms/redirects";

// Unknown URLs must be checked against the live redirect table on every request rather than cached as 404s.
export const dynamic = "force-dynamic";

const toPath = (slug: string[]) => `/${slug.map((s) => decodeURIComponent(s).toLowerCase()).join("/")}/`;

export async function generateMetadata({ params }: PageProps<"/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(toPath(slug));
  if (!page || page.routeType !== "cms") return { title: "Page not found", robots: { index: false, follow: true } };
  const { draft } = await getPreviewContext();
  return cmsPageMetadata(page, { draft });
}

/** Serves pages created in the CMS, applies CMS redirects, and otherwise returns a real 404. */
export default async function CatchAllPage({ params }: PageProps<"/[...slug]">) {
  const { slug } = await params;
  const path = toPath(slug);
  const page = await getPage(path);
  if (page?.routeType === "cms") return <CmsPage path={path} required={false} />;
  return redirectOrNotFound(path);
}
