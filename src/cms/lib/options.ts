/** Option lists shared by CMS fields and frontend renderers. Keep this file free of image/React imports. */

export const SITE_IMAGES = {
  "roofer-working-on-roof": "Roofer working on a roof",
  "electrician-switchboard": "Electrician at a switchboard",
  "roof-tiles-installation": "Roof tiles installation",
  "landscaper-trimming-lawn": "Landscaper trimming a lawn",
  "builders-timber-frame": "Builders on a timber frame",
  "plumber-fitting-pipe": "Plumber fitting a pipe",
  "customer-searching-on-phone": "Customer searching on a phone",
} as const;
export type SiteImageKey = keyof typeof SITE_IMAGES;

export const VISUALS = {
  SearchJourney: "Search journey diagram",
  HeroPathCard: "Search-to-enquiry path card",
  SeoScopeDiagram: "SEO scope diagram",
  LocalSignalsDiagram: "Local signals diagram",
  TradeJobMatrix: "Trade job matrix",
  RoofingPageMap: "Roofing page map",
  SiteWireframe: "Website wireframe",
  AuditChecklistVisual: "Audit checklist visual",
  RoleSplitDiagram: "Founder role split diagram",
  RemoteDeliveryVisual: "Remote delivery visual",
  InfluencerComparison: "Influencer case comparison bars",
} as const;
export type VisualKey = keyof typeof VISUALS;

/** Lucide icons available to editors. */
export const ICONS = [
  "AlertTriangle",
  "BarChart3",
  "Briefcase",
  "Building2",
  "CalendarCheck",
  "CalendarClock",
  "CheckCircle2",
  "ClipboardCheck",
  "Eye",
  "FileSearch",
  "FileText",
  "Gauge",
  "Globe2",
  "Hammer",
  "HelpCircle",
  "LayoutGrid",
  "LayoutTemplate",
  "Lightbulb",
  "LineChart",
  "Link2",
  "ListChecks",
  "MapPin",
  "MapPinned",
  "MessagesSquare",
  "MousePointerClick",
  "PenLine",
  "Route",
  "Search",
  "ShieldCheck",
  "ShieldOff",
  "Smartphone",
  "Star",
  "Store",
  "Target",
  "UserRound",
  "Users",
  "Workflow",
  "Wrench",
] as const;
export type IconName = (typeof ICONS)[number];

export const TRACKED_EVENTS = [
  "free_audit_cta_click",
  "service_cta_click",
  "case_study_click",
  "outbound_email_click",
] as const;

export const TONES = [
  { label: "Off-white (default)", value: "base" },
  { label: "White", value: "white" },
  { label: "Soft teal tint", value: "tint" },
  { label: "Navy (dark)", value: "navy" },
] as const;

export const PAGE_TEMPLATES = [
  { label: "Homepage", value: "home" },
  { label: "Service / market page", value: "service" },
  { label: "Industry page", value: "industry" },
  { label: "Case study hub", value: "caseStudyHub" },
  { label: "Case study", value: "caseStudy" },
  { label: "Free SEO audit (form)", value: "audit" },
  { label: "About", value: "about" },
  { label: "Contact (form)", value: "contact" },
  { label: "Blog hub", value: "blogHub" },
  { label: "Legal / policy", value: "legal" },
  { label: "Standard page", value: "standard" },
] as const;
export type PageTemplate = (typeof PAGE_TEMPLATES)[number]["value"];

/** Text styles available in the rich-text toolbar. Mapped to existing utility classes on the site. */
export const TEXT_STYLES = {
  emphasis: { label: "Emphasis (semibold)", css: { "font-weight": "600", color: "#0F2742" } },
  muted: { label: "Muted", css: { color: "#64748B" } },
  small: { label: "Small", css: { "font-size": "0.9em" } },
  smallMuted: { label: "Small + muted", css: { "font-size": "0.9em", color: "#64748B" } },
  tinyMuted: { label: "Footnote", css: { "font-size": "0.8em", color: "#64748B" } },
  display: { label: "Display lead", css: { "font-size": "1.2em", "font-weight": "600", color: "#0F2742" } },
} as const;
export type TextStyleKey = keyof typeof TEXT_STYLES;
