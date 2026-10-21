import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { CodeInjection, selectSnippets } from "@/components/cms/CodeInjection";
import { PreviewBanner } from "@/components/cms/PreviewBanner";
import { RichText } from "@/components/cms/RichText";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HeroShell } from "@/components/sections/HeroBackdrop";
import { PostCard } from "@/components/sections/PostCard";
import { CtaLink } from "@/components/ui/CtaLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { postPath } from "@/cms/lib/paths";
import { resolveHref } from "@/lib/cms/links";
import { cmsPostMetadata } from "@/lib/cms/metadata";
import { getPreviewContext } from "@/lib/cms/payload";
import { categoryId, postCardData } from "@/lib/cms/posts";
import { getCodeSnippets, getPathMap, getPost, getPublishedPosts } from "@/lib/cms/queries";
import { redirectOrNotFound } from "@/lib/cms/redirects";
import { buildPostJsonLd } from "@/lib/cms/structured-data";
import { formatDate } from "@/lib/format";
import type { Crumb } from "@/lib/schema";
import { routes } from "@/lib/site";

// Published posts are prerendered; posts published later render on first request and are then cached.
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getPublishedPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { robots: { index: false, follow: true } };
  const { draft } = await getPreviewContext();
  return cmsPostMetadata(post, { draft });
}

const day = (iso?: string | null) => iso?.slice(0, 10);

export default async function BlogArticle({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return redirectOrNotFound(postPath(slug));

  const [{ draft }, paths, published] = await Promise.all([getPreviewContext(), getPathMap(), getPublishedPosts()]);
  const author = typeof post.author === "object" ? post.author : null;
  const category = typeof post.category === "object" ? post.category : null;
  const path = postPath(post.slug);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Blog", path: routes.blog },
    { name: post.title, path },
  ];
  const chosen = (post.relatedPosts ?? []).filter((p): p is Exclude<typeof p, number> => typeof p === "object" && p._status === "published");
  const related = chosen.length ? chosen : published.filter((p) => p.slug !== post.slug && categoryId(p) === categoryId(post)).slice(0, 3);
  const ctaHref = resolveHref(post.cta?.button, paths) ?? routes.audit;
  const cta = {
    title: post.cta?.title || "Want a second opinion on your own site?",
    body: post.cta?.body || "We can review your website and show you what we would fix first.",
    label: post.cta?.button?.label || "Get My Free SEO Audit",
    href: ctaHref,
  };
  const commercialHref = category?.commercialLink ? resolveHref(category.commercialLink, paths) : null;
  const hero = typeof post.heroImage === "object" && post.heroImage?.url ? post.heroImage : null;
  const publishedAt = day(post.publishedAt) ?? day(post.createdAt)!;
  const updatedAt = day(post.displayUpdatedAt);
  const { jsonLd } = await buildPostJsonLd(post);
  const snippets = draft ? [] : await getCodeSnippets();
  const target = { pageId: post.id, collection: "posts" as const, template: "post" };

  return (
    <>
      <JsonLd data={jsonLd} />
      <CodeInjection snippets={selectSnippets(snippets, "head", target)} />
      {draft ? <PreviewBanner path={path} status={post._status ?? "draft"} /> : null}
      <article>
        <HeroShell innerClassName="pb-14 pt-8 md:pb-16 md:pt-10">
          <Breadcrumbs items={crumbs} />
          <header className="mx-auto mt-10 max-w-[760px]">
            {category ? (
              <p className="rise-in badge">
                <span aria-hidden className="badge-dot" />
                {category.name}
              </p>
            ) : null}
            <h1 className="rise-in mt-6 text-[clamp(2.1rem,1.5rem+2.3vw,3.4rem)] [--d:80ms]">{post.seo?.h1 || post.title}</h1>
            <p className="rise-in lead mt-5 [--d:150ms]">{post.excerpt}</p>
            <div className="rise-in mt-8 flex flex-wrap items-center gap-4 border-t border-navy/10 pt-6 text-sm text-muted [--d:220ms]">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-teal to-sky text-white shadow-[0_8px_20px_-10px_rgb(20_184_166/0.8)]">
                <UserRound aria-hidden className="size-5" />
              </span>
              {author ? (
                <div>
                  <p className="font-semibold text-navy">{author.name}</p>
                  <p>{author.role}</p>
                </div>
              ) : null}
              <p className="sm:ml-auto">
                Published <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                {updatedAt ? (
                  <>
                    {" "}
                    · Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
                  </>
                ) : null}
              </p>
            </div>
          </header>
        </HeroShell>

        {hero ? (
          <div className="container-site">
            <figure className="mx-auto -mt-6 max-w-[960px]">
              <div className="img-settle relative aspect-[16/9] overflow-hidden rounded-[24px] bg-teal-soft shadow-[var(--shadow-lift)]">
                <Image src={hero.url!} alt={hero.alt} fill priority sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" />
              </div>
              {hero.caption ? <figcaption className="mt-3 text-center text-sm text-muted">{hero.caption}</figcaption> : null}
            </figure>
          </div>
        ) : null}

        <div className="container-site py-14 md:py-20">
          <div className="prose-tss mx-auto max-w-[760px] text-lg">
            <RichText value={post.content} paths={paths} linkClass="" />
          </div>

          <aside className="reveal surface-deep relative mx-auto mt-14 max-w-[760px] overflow-hidden rounded-[28px] p-8 text-white/80 shadow-[0_40px_80px_-40px_rgb(10_26_46/0.75)] sm:p-10">
            <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
            <div aria-hidden className="orb -right-16 -top-16 size-56 bg-teal/25" />
            <div className="relative">
              <h2 className="text-2xl text-white">{cta.title}</h2>
              <p className="mt-3 text-lg">{cta.body}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaLink href={cta.href} location="blog_article">
                  {cta.label}
                </CtaLink>
                {commercialHref && category?.commercialLink?.label ? (
                  <Link href={commercialHref} className="font-semibold text-teal-300 underline underline-offset-4 hover:text-white">
                    Learn about our {category.commercialLink.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </aside>

          {author ? (
            <section aria-labelledby="author-title" className="reveal card mx-auto mt-10 max-w-[760px] p-6 sm:p-7">
              <h2 id="author-title" className="text-lg">
                About the author
              </h2>
              <p className="mt-2 text-base">
                <strong className="text-navy">{author.name}</strong>, {author.role}. {author.bio}
              </p>
            </section>
          ) : null}
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related-title" className="section bg-white">
          <div className="container-site">
            <p className="eyebrow">Keep reading</p>
            <h2 id="related-title" className="mt-4">
              Related guides
            </h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={postCardData(p)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <CodeInjection snippets={selectSnippets(snippets, "bodyEnd", target)} />
    </>
  );
}
