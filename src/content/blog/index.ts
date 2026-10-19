import type { ComponentType } from "react";
import type { StaticImageData } from "next/image";
import { routes } from "@/lib/site";

export const blogCategories = ["SEO", "Local SEO", "Tradie Growth", "Websites"] as const;
export type BlogCategory = (typeof blogCategories)[number];

export const authors = {
  asif: {
    name: "Asif Iqbal Khan",
    role: "Co-Founder & SEO Growth Lead",
    bio: "Asif leads SEO strategy, audits, Local SEO and reporting at Top Spot Studio.",
  },
  alamin: {
    name: "Al Amin Sikander",
    role: "Co-Founder & Web Development & QA Lead",
    bio: "Al Amin leads website implementation, QA, performance and technical SEO support at Top Spot Studio.",
  },
} as const;
export type AuthorKey = keyof typeof authors;

export type BlogPost = {
  slug: string;
  title: string;
  /** Optional SEO title; defaults to "<title> | Top Spot Studio". */
  seoTitle?: string;
  description: string;
  excerpt: string;
  category: BlogCategory;
  author: AuthorKey;
  published: string;
  updated?: string;
  image?: { src: StaticImageData; alt: string };
  /** Optional canonical override (absolute URL) for syndicated content. */
  canonical?: string;
  /** One contextual commercial CTA per article. */
  cta?: { title: string; body: string; label: string; href: string };
  /** Drafts never render in production builds unless NEXT_PUBLIC_SHOW_DRAFTS=true. */
  draft?: boolean;
  load: () => Promise<{ default: ComponentType }>;
};

const SHOW_DRAFTS = process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true";

const allPosts: BlogPost[] = [
  {
    slug: "article-template-preview",
    title: "Article template preview",
    description: "Internal preview of the blog article template. Not for publication.",
    excerpt: "Internal preview used to QA the article layout. Replace with an approved article.",
    category: "SEO",
    author: "asif",
    published: "2026-10-19",
    draft: true,
    cta: {
      title: "Need advice specific to your website?",
      body: "A guide can point you in the right direction. Your website may still have its own technical, local or content issues.",
      label: "Get My Free SEO Audit",
      href: routes.audit,
    },
    load: () => import("./article-template-preview.mdx"),
  },
];

export const posts = allPosts
  .filter((p) => SHOW_DRAFTS || !p.draft)
  .sort((a, b) => (a.published < b.published ? 1 : -1));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const commercialLinkFor: Record<BlogCategory, { label: string; href: string }> = {
  SEO: { label: "SEO services", href: routes.nzSeo },
  "Local SEO": { label: "local SEO support", href: routes.nzLocalSeo },
  "Tradie Growth": { label: "SEO for tradies", href: routes.tradies },
  Websites: { label: "web design for tradies", href: routes.webDesign },
};
