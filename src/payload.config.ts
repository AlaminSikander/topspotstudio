import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { AuditLogs } from "./cms/collections/AuditLogs";
import { CodeSnippets } from "./cms/collections/CodeSnippets";
import { MAX_UPLOAD_BYTES, Media } from "./cms/collections/Media";
import { Pages } from "./cms/collections/Pages";
import { Posts } from "./cms/collections/Posts";
import { Redirects } from "./cms/collections/Redirects";
import { Authors, Categories } from "./cms/collections/Taxonomy";
import { Users } from "./cms/collections/Users";
import { basicEditor } from "./cms/fields/richText";
import { Footer, Navigation, SiteSettings } from "./cms/globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const secret = process.env.PAYLOAD_SECRET;
if (!secret && process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build") {
  throw new Error("PAYLOAD_SECRET is required.");
}

/** Origins allowed to use cookie-authenticated requests (CSRF) and cross-origin API calls (CORS). */
const trustedOrigins = [process.env.CMS_SERVER_URL, process.env.NEXT_PUBLIC_SITE_URL, process.env.NODE_ENV !== "production" ? "http://localhost:3000" : undefined]
  .filter((v): v is string => Boolean(v))
  .map((v) => v.replace(/\/$/, ""));

const smtpConfigured = Boolean(process.env.SMTP_HOST);

export default buildConfig({
  secret: secret || "build-time-placeholder-not-used-for-auth",
  telemetry: false,
  routes: { admin: "/admin", api: "/cms-api" },
  graphQL: { disable: true },
  cors: trustedOrigins,
  csrf: trustedOrigins,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " — Top Spot Studio CMS",
      robots: "noindex, nofollow",
      icons: [{ rel: "icon", type: "image/png", url: "/icon.png" }],
    },
    dateFormat: "d MMM yyyy, HH:mm",
    components: {
      graphics: { Logo: "@/cms/admin/Brand#Logo", Icon: "@/cms/admin/Brand#Icon" },
      beforeDashboard: ["@/cms/admin/Dashboard#Dashboard"],
      afterNavLinks: ["@/cms/admin/NavLinks#NavLinks"],
      views: {
        seoManager: { Component: "@/cms/admin/views/SeoManager#SeoManager", path: "/seo-manager" },
        linkManager: { Component: "@/cms/admin/views/LinkManager#LinkManager", path: "/link-manager" },
      },
    },
  },
  collections: [Pages, Posts, Media, Authors, Categories, Redirects, CodeSnippets, Users, AuditLogs],
  globals: [Navigation, Footer, SiteSettings],
  editor: basicEditor,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
      max: Number(process.env.DATABASE_POOL_MAX || 5),
    },
    push: false,
    blocksAsJSON: true,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  upload: { limits: { fileSize: MAX_UPLOAD_BYTES } },
  sharp,
  email: smtpConfigured
    ? nodemailerAdapter({
        defaultFromAddress: process.env.CMS_EMAIL_FROM || process.env.SMTP_USER || "cms@localhost",
        defaultFromName: "Top Spot Studio CMS",
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : Number(process.env.SMTP_PORT) === 465,
          auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
        },
      })
    : undefined,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
