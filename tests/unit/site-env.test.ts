import { afterEach, describe, expect, it, vi } from "vitest";

async function loadSite(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const key of ["VERCEL_ENV", "NEXT_PUBLIC_SITE_ENV", "NEXT_PUBLIC_SITE_URL"]) vi.stubEnv(key, env[key] ?? "");
  if (env.NODE_ENV) vi.stubEnv("NODE_ENV", env.NODE_ENV);
  return import("@/lib/site");
}

afterEach(() => vi.unstubAllEnvs());

describe("site environment", () => {
  it("makes Vercel Production indexable even when NEXT_PUBLIC_SITE_ENV says otherwise", async () => {
    const site = await loadSite({ VERCEL_ENV: "production", NEXT_PUBLIC_SITE_ENV: "staging", NEXT_PUBLIC_SITE_URL: "https://preview.example.com" });
    expect(site.SITE_ENV).toBe("production");
    expect(site.IS_PRODUCTION).toBe(true);
    expect(site.SITE_URL).toBe("https://topspotstudio.com");
  });

  it("keeps Vercel Previews noindex even when NEXT_PUBLIC_SITE_ENV is production", async () => {
    const site = await loadSite({ VERCEL_ENV: "preview", NEXT_PUBLIC_SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://preview.example.com/" });
    expect(site.SITE_ENV).toBe("staging");
    expect(site.IS_PRODUCTION).toBe(false);
    expect(site.SITE_URL).toBe("https://preview.example.com");
  });

  it("uses NEXT_PUBLIC_SITE_ENV off Vercel", async () => {
    expect((await loadSite({ NEXT_PUBLIC_SITE_ENV: "production" })).SITE_ENV).toBe("production");
    expect((await loadSite({ NEXT_PUBLIC_SITE_ENV: "development" })).SITE_ENV).toBe("development");
    expect((await loadSite({ NEXT_PUBLIC_SITE_ENV: "qa" })).SITE_ENV).toBe("staging");
  });

  it("defaults to a non-indexable environment when nothing is set", async () => {
    const site = await loadSite({ NODE_ENV: "production" });
    expect(site.IS_PRODUCTION).toBe(false);
  });
});
