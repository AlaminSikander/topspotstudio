"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { iconFor } from "@/components/cms/icons";
import { CtaLink } from "@/components/ui/CtaLink";

export type NavLink = { label: string; href: string; icon?: string | null; note?: string | null };
export type NavItem = NavLink | { label: string; children: NavLink[] };
export type HeaderCta = { label: string; href: string } | null;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

const slug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function NavDropdown({ label, items, pathname }: { label: string; items: NavLink[]; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const active = items.some((i) => isActive(pathname, i.href));
  const menuId = `${slug(label)}-menu`;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        data-active={active || open}
        onClick={() => setOpen((v) => !v)}
        className={`nav-link inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.94rem] font-semibold hover:text-teal-ink ${
          active ? "text-teal-ink" : "text-navy"
        }`}
      >
        {label}
        <ChevronDown aria-hidden className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        id={menuId}
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 duration-300 ease-[var(--ease-out-expo)] ${
          items.length > 1 ? "w-[22rem]" : "w-[20rem]"
        } ${
          open
            ? "visible translate-y-0 opacity-100 transition-[opacity,translate]"
            : "invisible translate-y-2 opacity-0 transition-[opacity,translate,visibility]"
        }`}
      >
        <ul className="glass rounded-[20px] p-2">
          {items.map((item) => {
            const Icon = iconFor(item.icon);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 rounded-[14px] px-3 py-3 transition-colors hover:bg-teal-soft/80 aria-[current=page]:bg-teal-soft/70"
                >
                  {Icon ? (
                    <span className="icon-tile size-10 rounded-[12px]">
                      <Icon aria-hidden className="size-[18px]" strokeWidth={1.75} />
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.95rem] font-semibold text-navy">{item.label}</span>
                    {item.note ? <span className="block text-sm text-muted">{item.note}</span> : null}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-teal-ink opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function MobileGroup({
  label,
  items,
  pathname,
  className,
  style,
}: {
  label: string;
  items: NavLink[];
  pathname: string;
  className: string;
  style: CSSProperties;
}) {
  const [open, setOpen] = useState(() => items.some((i) => isActive(pathname, i.href)));
  const panelId = `mobile-${slug(label)}-menu`;
  return (
    <li className={className} style={style}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between py-4 text-left text-lg font-semibold ${open ? "text-teal-ink" : "text-navy"}`}
      >
        {label}
        <span
          aria-hidden
          className={`inline-flex size-8 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ${
            open ? "rotate-180 border-transparent bg-teal-soft text-teal-ink" : "border-line text-muted"
          }`}
        >
          <ChevronDown className="size-4" />
        </span>
      </button>
      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[var(--ease-out-expo)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className="grid min-h-0 gap-1 overflow-hidden">
          {items.map((child, i) => {
            const Icon = iconFor(child.icon);
            return (
              <li key={child.href} className={i === items.length - 1 ? "pb-3" : ""}>
                <Link
                  href={child.href}
                  aria-current={isActive(pathname, child.href) ? "page" : undefined}
                  className="flex items-center gap-3 rounded-[14px] px-2 py-2.5 text-navy transition-colors hover:bg-teal-soft/60 aria-[current=page]:bg-teal-soft aria-[current=page]:text-teal-ink"
                >
                  {Icon ? (
                    <span className="icon-tile size-10 rounded-[12px]">
                      <Icon aria-hidden className="size-[18px]" strokeWidth={1.75} />
                    </span>
                  ) : null}
                  <span className="min-w-0">
                    <span className="block text-base font-semibold">{child.label}</span>
                    {child.note ? <span className="block text-sm text-muted">{child.note}</span> : null}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export function Header({ items, cta, homeHref = "/" }: { items: NavItem[]; cta: HeaderCta; homeHref?: string }) {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;

  return (
    <header className="sticky top-0 z-50 h-[var(--header-h)] px-3 pt-3 sm:px-5">
      <div
        className={`relative mx-auto flex h-[64px] max-w-[1240px] items-center justify-between gap-6 rounded-[20px] border pl-5 pr-2.5 transition-[background-color,box-shadow,border-color,max-width] duration-500 ease-[var(--ease-out-expo)] sm:pl-6 ${
          solid
            ? "max-w-[1180px] border-white/70 bg-white/85 shadow-[0_18px_40px_-22px_rgb(15_39_66/0.45)] backdrop-blur-xl"
            : "border-white/60 bg-white/65 shadow-[0_8px_30px_-20px_rgb(15_39_66/0.35)] backdrop-blur-lg"
        }`}
      >
        <Link href={homeHref} className="shrink-0 rounded-md" aria-label="Top Spot Studio home">
          <Logo className="scale-90 origin-left sm:scale-100" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {items.map((item) =>
              "children" in item ? (
                <li key={item.label}>
                  <NavDropdown label={item.label} items={item.children} pathname={pathname} />
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="nav-link inline-block rounded-full px-3.5 py-2 text-[0.94rem] font-semibold text-navy hover:text-teal-ink aria-[current=page]:text-teal-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        {cta ? (
          <div className="hidden lg:block">
            <CtaLink href={cta.href} location="header" className="min-h-11 rounded-[14px] px-5 py-2.5 text-[0.94rem]" arrow>
              {cta.label}
            </CtaLink>
          </div>
        ) : null}

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[14px] border border-line bg-white text-navy transition-colors hover:border-teal/50 hover:text-teal-ink lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>

        <span
          aria-hidden
          className="scroll-progress pointer-events-none absolute inset-x-5 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-teal via-sky to-coral"
        />
      </div>

      <div
        id="mobile-menu"
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileOpen(false);
        }}
        className={`fixed inset-x-0 top-0 -z-10 h-dvh overflow-y-auto bg-navy-950/45 px-3 pb-6 pt-[calc(var(--header-h)+0.5rem)] backdrop-blur-md duration-300 sm:px-5 lg:hidden ${
          mobileOpen ? "visible opacity-100 transition-opacity" : "invisible opacity-0 transition-[opacity,visibility]"
        }`}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-[1240px] rounded-[24px] border border-white/70 bg-white/95 p-5 shadow-[var(--shadow-lift)]">
          <ul className="divide-y divide-line/80">
            {items.map((item, i) => {
              const style = { "--d": `${60 + i * 45}ms` } as CSSProperties;
              const animate = mobileOpen ? "rise-in" : "";
              return "children" in item ? (
                <MobileGroup
                  key={`${item.label}-${pathname}`}
                  label={item.label}
                  items={item.children}
                  pathname={pathname}
                  className={animate}
                  style={style}
                />
              ) : (
                <li key={item.href} className={animate} style={style}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex items-center justify-between py-4 text-lg font-semibold text-navy aria-[current=page]:text-teal-ink"
                  >
                    {item.label}
                    <ArrowUpRight aria-hidden className="size-4 text-muted" />
                  </Link>
                </li>
              );
            })}
          </ul>
          {cta ? (
            <CtaLink href={cta.href} location="mobile_menu" className="mt-5 w-full" arrow>
              {cta.label}
            </CtaLink>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
