import Link from "next/link";
import { HeroShell } from "@/components/sections/HeroBackdrop";
import { CtaLink } from "@/components/ui/CtaLink";
import { resolveHref } from "@/lib/cms/links";
import { getPathMap, getSiteData } from "@/lib/cms/queries";
import { routes } from "@/lib/site";

/** 404 body shared by the in-layout not-found page and app/global-not-found.tsx. */
export async function NotFoundContent() {
  const [{ settings }, paths] = await Promise.all([getSiteData(), getPathMap()]);
  const helpful = (settings.notFoundLinks ?? [])
    .map((l) => ({ label: l.label, href: resolveHref(l, paths) }))
    .filter((l): l is { label: string; href: string } => Boolean(l.href));
  return (
    <HeroShell innerClassName="py-24 md:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <p aria-hidden className="rise-in text-gradient font-display text-[clamp(6rem,4rem+10vw,12rem)] font-bold leading-none tracking-[-0.06em]">
          404
        </p>
        <p className="rise-in eyebrow mt-4 [--d:60ms]">Error 404</p>
        <h1 className="rise-in mt-4 [--d:100ms]">{settings.notFoundTitle || "This page isn't here"}</h1>
        <p className="lead mx-auto mt-5 max-w-xl">
          {settings.notFoundLead || "The link may be out of date or the address may have a typo. These pages are a good place to pick up from."}
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
