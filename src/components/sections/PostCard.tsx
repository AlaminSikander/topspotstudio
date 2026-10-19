import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { authors, type BlogPost } from "@/content/blog";
import { formatDate } from "@/lib/format";

export function PostCard({ post }: { post: BlogPost }) {
  const author = authors[post.author];
  return (
    <article className="reveal group card card-hover card-fx relative flex h-full flex-col">
      {post.image ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[19px] bg-teal-soft">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(min-width: 1024px) 380px, 100vw"
            className="img-zoom object-cover"
          />
        </div>
      ) : (
        <div aria-hidden className="surface-tint relative aspect-[16/10] overflow-hidden rounded-t-[19px]">
          <div className="bg-dots absolute inset-0 opacity-70" />
          <div className="orb -right-10 -top-10 size-40 bg-teal/25" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="inline-flex self-start rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-teal-ink">
          {post.category}
        </p>
        <h3 className="mt-4 text-xl">
          <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-base leading-relaxed">{post.excerpt}</p>
        <p className="mt-5 text-sm text-muted">
          {author.name} · <time dateTime={post.updated ?? post.published}>{formatDate(post.updated ?? post.published)}</time>
          {post.updated ? " (updated)" : ""}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 font-semibold text-teal-ink group-hover:text-navy">
          Read Guide <ArrowRight aria-hidden className="btn-arrow size-4" />
        </span>
      </div>
    </article>
  );
}
