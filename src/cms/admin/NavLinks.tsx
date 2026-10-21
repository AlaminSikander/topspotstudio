import Link from "next/link";

const links = [
  { href: "/admin/seo-manager", label: "SEO manager" },
  { href: "/admin/link-manager", label: "Internal links & redirects" },
];

export function NavLinks() {
  return (
    <div style={{ marginTop: 16 }}>
      <p className="nav-group__label" style={{ padding: "0 0 6px", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.7 }}>
        SEO tools
      </p>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="nav__link" style={{ display: "block", padding: "4px 0" }}>
          <span className="nav__link-label">{l.label}</span>
        </Link>
      ))}
    </div>
  );
}
