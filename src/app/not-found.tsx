import Link from "next/link";
import type { Metadata } from "next";
import { HeroShell } from "@/components/sections/HeroBackdrop";
import { CtaLink } from "@/components/ui/CtaLink";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const helpful = [
  { label: "SEO Services NZ", href: routes.nzSeo },
  { label: "Local SEO NZ", href: routes.nzLocalSeo },
  { label: "SEO for Tradies", href: routes.tradies },
  { label: "Case Studies", href: routes.caseStudies },
];

export default function NotFound() {
  return (
    <HeroShell innerClassName="py-24 md:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <p aria-hidden className="rise-in text-gradient font-display text-[clamp(6rem,4rem+10vw,12rem)] font-bold leading-none tracking-[-0.06em]">
          404
        </p>
        <p className="rise-in eyebrow mt-4 [--d:60ms]">Error 404</p>
        <h1 className="rise-in mt-4 [--d:100ms]">This page isn&apos;t here</h1>
        <p className="lead mx-auto mt-5 max-w-xl">
          The link may be out of date or the address may have a typo. These pages are a good place to pick up from.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {helpful.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-link">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CtaLink href={routes.audit} location="404">
            Get a Free SEO Audit
          </CtaLink>
          <CtaLink href={routes.home} variant="secondary">
            Back to the homepage
          </CtaLink>
        </div>
      </div>
    </HeroShell>
  );
}
