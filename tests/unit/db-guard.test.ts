import { describe, expect, it } from "vitest";
import { assertDatabaseAllowed, isProductionDatabase } from "@/lib/db-guard";

const prodPooled = "postgresql://app:pw@ep-curly-surf-b49furta-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require";
const prodDirect = "postgresql://app:pw@ep-curly-surf-b49furta.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require";
const dev = "postgresql://app:pw@ep-round-waterfall-b467le23-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require";

describe("production database guard", () => {
  it("recognises the production endpoint, pooled or direct", () => {
    expect(isProductionDatabase(prodPooled)).toBe(true);
    expect(isProductionDatabase(prodDirect)).toBe(true);
    expect(isProductionDatabase(dev)).toBe(false);
    expect(isProductionDatabase("postgres://user@localhost:5432/tss_cms_dev")).toBe(false);
    expect(isProductionDatabase("")).toBe(false);
    expect(isProductionDatabase("not a url")).toBe(false);
  });

  it("refuses the production database locally, in QA and on Vercel Previews", () => {
    expect(() => assertDatabaseAllowed(prodPooled, {})).toThrow(/PRODUCTION database/);
    expect(() => assertDatabaseAllowed(prodDirect, { NODE_ENV: "development" })).toThrow();
    expect(() => assertDatabaseAllowed(prodPooled, { VERCEL_ENV: "preview" })).toThrow();
  });

  it("allows Vercel Production and deliberate overrides", () => {
    expect(() => assertDatabaseAllowed(prodPooled, { VERCEL_ENV: "production" })).not.toThrow();
    expect(() => assertDatabaseAllowed(prodDirect, { ALLOW_PRODUCTION_DB: "true" })).not.toThrow();
  });

  it("always allows non-production databases", () => {
    expect(() => assertDatabaseAllowed(dev, {})).not.toThrow();
    expect(() => assertDatabaseAllowed(undefined, {})).not.toThrow();
  });
});
