import type { FooterData, FooterLink } from "@/components/layout/Footer";
import type { HeaderCta, NavItem, NavLink } from "@/components/layout/Header";
import { BLOG_ENABLED } from "@/lib/site";
import { resolveHref, type LinkValue, type PathMap } from "./links";
import type { SiteData } from "./queries";

type Visible = { visibility?: "always" | "blogEnabled" | "hidden" | null };
const isVisible = (v: Visible) => v.visibility !== "hidden" && (v.visibility !== "blogEnabled" || BLOG_ENABLED);

function linkOf(item: Visible & { label: string; newTab?: boolean | null } & NonNullable<LinkValue>, paths: PathMap): FooterLink | null {
  if (!isVisible(item)) return null;
  const href = resolveHref(item, paths);
  return href ? { label: item.label, href, newTab: Boolean(item.newTab) } : null;
}

export function headerData({ navigation }: SiteData, paths: PathMap): { items: NavItem[]; cta: HeaderCta } {
  const items: NavItem[] = [];
  for (const item of navigation.items ?? []) {
    if (!isVisible(item)) continue;
    if (item.type === "dropdown") {
      const children = (item.children ?? [])
        .map((c) => {
          const l = linkOf(c, paths);
          return l ? ({ label: l.label, href: l.href, icon: c.icon, note: c.note } satisfies NavLink) : null;
        })
        .filter((c): c is NonNullable<typeof c> => Boolean(c));
      if (children.length) items.push({ label: item.label, children });
    } else {
      const href = resolveHref(item.link, paths);
      if (href) items.push({ label: item.label, href });
    }
  }
  const ctaHref = navigation.cta?.label ? resolveHref(navigation.cta, paths) : null;
  return { items, cta: ctaHref && navigation.cta?.label ? { label: navigation.cta.label, href: ctaHref } : null };
}

export function footerData({ footer, settings }: SiteData, paths: PathMap): FooterData {
  const cta = (c: typeof footer.primaryCta) => {
    const href = c?.label ? resolveHref(c, paths) : null;
    return href && c?.label ? { label: c.label, href } : undefined;
  };
  const links = (arr: Parameters<typeof linkOf>[0][] | null | undefined) =>
    (arr ?? []).map((l) => linkOf(l, paths)).filter((l): l is FooterLink => Boolean(l));
  return {
    headline: footer.headline,
    headlineHighlight: footer.headlineHighlight ?? undefined,
    primaryCta: cta(footer.primaryCta),
    secondaryCta: cta(footer.secondaryCta),
    description: footer.description,
    locationStatement: footer.showLocation !== false ? settings.locationStatement : undefined,
    columns: (footer.columns ?? []).map((c) => ({ title: c.title, links: links(c.links) })).filter((c) => c.links.length),
    siteName: settings.siteName,
    copyright: footer.copyright ?? undefined,
    bottomLinks: links(footer.bottomLinks),
    socialLinks: (footer.socialLinks ?? []).map((s) => ({ label: s.label, href: s.url })),
    watermark: footer.watermark ?? undefined,
  };
}
