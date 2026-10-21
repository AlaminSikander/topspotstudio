import type { PostCardData } from "@/components/sections/PostCard";
import type { Post } from "@/payload-types";

const day = (iso?: string | null) => (iso ? iso.slice(0, 10) : undefined);

export function postCardData(p: Post): PostCardData {
  const image = typeof p.heroImage === "object" && p.heroImage?.url ? { src: p.heroImage.url, alt: p.heroImage.alt } : undefined;
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: typeof p.category === "object" ? p.category.name : "",
    authorName: typeof p.author === "object" ? p.author.name : "",
    published: day(p.publishedAt) ?? day(p.createdAt) ?? "",
    updated: day(p.displayUpdatedAt),
    image,
  };
}

export const categoryId = (p: Post) => (typeof p.category === "object" ? p.category.id : p.category);
