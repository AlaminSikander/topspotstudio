import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Page } from "@/payload-types";
import { cmsPageMetadata } from "@/lib/cms/metadata";
import { getPreviewContext } from "@/lib/cms/payload";
import { getCodeSnippets, getPage, getPathMap, getPublishedPosts, getSiteData, pageRecordExists } from "@/lib/cms/queries";
import { buildPageJsonLd, crumbsFor } from "@/lib/cms/structured-data";
import { CodeInjection, selectSnippets } from "./CodeInjection";
import { PageBlocks } from "./PageBlocks";
import { PreviewBanner } from "./PreviewBanner";
import type { RenderCtx } from "./shared";

/** Loads the CMS record for a route. Unpublished → 404; never migrated → build/runtime error so a page cannot silently disappear. */
export async function loadPage(path: string, { required = true }: { required?: boolean } = {}): Promise<Page> {
  const page = await getPage(path);
  if (page) return page;
  if (!required || (await pageRecordExists(path))) notFound();
  throw new Error(`No CMS page exists for ${path}. Run "npm run cms:seed" (or restore the page in /admin) before building.`);
}

export async function cmsMetadata(path: string, opts?: { required?: boolean }): Promise<Metadata> {
  const page = await loadPage(path, opts);
  const [{ draft }, posts] = await Promise.all([getPreviewContext(), getPublishedPosts()]);
  return cmsPageMetadata(page, { draft, publishedPostCount: posts.length });
}

export async function CmsPage({ path, required = true }: { path: string; required?: boolean }) {
  const page = await loadPage(path, { required });
  const [{ draft }, paths, { settings }, posts] = await Promise.all([getPreviewContext(), getPathMap(), getSiteData(), getPublishedPosts()]);
  const ctx: RenderCtx = { paths, page, crumbs: crumbsFor(page, paths), settings, posts, tone: "base" };
  const { jsonLd } = await buildPageJsonLd(page, { paths });
  const snippets = draft ? [] : await getCodeSnippets();
  const target = { pageId: page.id, collection: "pages" as const, template: page.template };
  return (
    <>
      <JsonLd data={jsonLd} />
      <CodeInjection snippets={selectSnippets(snippets, "head", target)} />
      {draft ? <PreviewBanner path={page.path} status={page._status ?? "draft"} /> : null}
      <PageBlocks blocks={page.layout} ctx={ctx} />
      <CodeInjection snippets={selectSnippets(snippets, "bodyEnd", target)} />
    </>
  );
}
