import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { CtaLink } from "@/components/ui/CtaLink";
import { footerColumns, LOCATION_STATEMENT, routes, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="surface-deep relative overflow-hidden text-white/75">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="orb -right-32 -top-40 size-[480px] bg-teal/20" />
        <div className="orb -bottom-40 -left-32 size-[420px] bg-sky/10 [animation-delay:-12s]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
      </div>

      <div className="container-site relative">
        <div className="flex flex-col gap-8 border-b border-white/10 py-14 md:flex-row md:items-end md:justify-between md:py-20">
          <p className="max-w-[640px] font-display text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
            {SITE_TAGLINE.split(" for ")[0]} for{" "}
            <span className="text-gradient-light">{SITE_TAGLINE.split(" for ")[1]}</span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href={routes.audit} location="footer" arrow>
              Get a Free SEO Audit
            </CtaLink>
            <CtaLink href={routes.contact} variant="light" location="footer_secondary">
              Contact Us
            </CtaLink>
          </div>
        </div>

        <div className="grid gap-12 py-14 md:py-16 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Link href={routes.home} className="inline-block rounded-md" aria-label="Top Spot Studio home">
              <Logo variant="light" />
            </Link>
            <p className="mt-6 text-base leading-relaxed">
              Helping service businesses improve search visibility, strengthen their websites and create more
              opportunities for qualified enquiries.
            </p>
            <p className="mt-6 flex gap-3 rounded-[16px] border border-white/10 bg-white/[0.04] p-4 text-sm leading-relaxed text-white/70">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-teal-300" />
              <span>{LOCATION_STATEMENT}</span>
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">{col.title}</h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1 text-[0.95rem] text-white/75 transition-colors hover:text-white"
                      >
                        <span className="bg-gradient-to-r from-teal-300 to-sky-300 bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                          {l.label}
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-3.5 -translate-x-1 opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. Founder-led SEO and web growth studio.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href={routes.privacy} className="hover:text-white hover:underline underline-offset-4">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href={routes.contact} className="hover:text-white hover:underline underline-offset-4">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none relative -mb-[0.18em] select-none whitespace-nowrap text-center font-display text-[clamp(3rem,9.5vw,10.5rem)] font-bold leading-none tracking-[-0.05em] text-white/[0.035]"
      >
        TOP SPOT STUDIO
      </p>
    </footer>
  );
}
