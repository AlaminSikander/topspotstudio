import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UserRound } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HeroShell } from "@/components/sections/HeroBackdrop";
import { PostCard } from "@/components/sections/PostCard";
import { CtaLink } from "@/components/ui/CtaLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { authors, commercialLinkFor, getPost, posts } from "@/content/blog";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, graph, type Crumb } from "@/lib/schema";
import { BLOG_ENABLED, routes } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const base = pageMetadata({
    title: post.seoTitle ?? `${post.title} | Top Spot Studio`,
    description: post.description,
    path: `/blog/${post.slug}/`,
    type: "article",
    ogImage: post.image?.src.src ?? "/og/blog.png",
    noindex: !BLOG_ENABLED || post.draft,
  });
  return post.canonical ? { ...base, alternates: { canonical: post.canonical } } : base;
}

export default async function BlogArticle({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Body } = await post.load();
  const author = authors[post.author];
  const path = `/blog/${post.slug}/`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Blog", path: routes.blog },
    { name: post.title, path },
  ];
  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const cta = post.cta ?? {
    title: "Want a second opinion on your own site?",
    body: "We can review your website and show you what we would fix first.",
    label: "Get My Free SEO Audit",
    href: routes.audit,
  };
  const commercial = commercialLinkFor[post.category];

  return (
    <>
      <JsonLd
        data={graph(
          {
            ...articleSchema({
              path,
              headline: post.title,
              description: post.description,
              authorName: author.name,
              datePublished: post.published,
              dateModified: post.updated ?? post.published,
              image: post.image?.src.src,
            }),
            "@type": "BlogPosting",
          },
          breadcrumbSchema(crumbs),
        )}
      />

      <article>
        <HeroShell innerClassName="pb-14 pt-8 md:pb-16 md:pt-10">
            <Breadcrumbs items={crumbs} />
            <header className="mx-auto mt-10 max-w-[760px]">
              <p className="rise-in badge">
                <span aria-hidden className="badge-dot" />
                {post.category}
              </p>
              <h1 className="rise-in mt-6 text-[clamp(2.1rem,1.5rem+2.3vw,3.4rem)] [--d:80ms]">{post.title}</h1>
              <p className="rise-in lead mt-5 [--d:150ms]">{post.excerpt}</p>
              <div className="rise-in mt-8 flex flex-wrap items-center gap-4 border-t border-navy/10 pt-6 text-sm text-muted [--d:220ms]">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-teal to-sky text-white shadow-[0_8px_20px_-10px_rgb(20_184_166/0.8)]">
                  <UserRound aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-navy">{author.name}</p>
                  <p>{author.role}</p>
                </div>
                <p className="sm:ml-auto">
                  Published <time dateTime={post.published}>{formatDate(post.published)}</time>
                  {post.updated ? (
                    <>
                      {" "}
                      · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                    </>
                  ) : null}
                </p>
              </div>
            </header>
        </HeroShell>

        {post.image ? (
          <div className="container-site">
            <div className="img-settle relative mx-auto -mt-6 aspect-[16/9] max-w-[960px] overflow-hidden rounded-[24px] bg-teal-soft shadow-[var(--shadow-lift)]">
              <Image src={post.image.src} alt={post.image.alt} fill priority sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" />
            </div>
          </div>
        ) : null}

        <div className="container-site py-14 md:py-20">
          <div className="prose-tss mx-auto max-w-[760px] text-lg">
            <Body />
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
              <Link href={commercial.href} className="font-semibold text-teal-300 underline underline-offset-4 hover:text-white">
                Learn about our {commercial.label}
              </Link>
            </div>
            </div>
          </aside>

          <section aria-labelledby="author-title" className="reveal card mx-auto mt-10 max-w-[760px] p-6 sm:p-7">
            <h2 id="author-title" className="text-lg">
              About the author
            </h2>
            <p className="mt-2 text-base">
              <strong className="text-navy">{author.name}</strong>, {author.role}. {author.bio}
            </p>
          </section>
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related-title" className="section bg-white">
          <div className="container-site">
            <p className="eyebrow">Keep reading</p>
            <h2 id="related-title" className="mt-4">Related guides</h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
