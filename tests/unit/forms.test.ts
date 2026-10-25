import { describe, expect, it } from "vitest";
import { auditSchema, contactSchema, flattenErrors } from "@/lib/forms";

const startedAt = Date.now() - 10_000;

describe("contact form schema", () => {
  const valid = { name: "Jane Doe", email: "jane@example.co.nz", services: ["SEO"], message: "We want more local leads.", startedAt };

  it("accepts a minimal valid enquiry and fills optional defaults", () => {
    const r = contactSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data).toMatchObject({ businessName: "", phone: "", website: "", source: "" });
  });

  it("normalises a bare website to https", () => {
    const r = contactSchema.safeParse({ ...valid, website: "example.co.nz" });
    expect(r.success && r.data.website).toBe("https://example.co.nz");
  });

  it("returns one message per invalid field", () => {
    const r = contactSchema.safeParse({ ...valid, name: "J", email: "nope", services: [], message: "short" });
    expect(r.success).toBe(false);
    if (!r.success) expect(Object.keys(flattenErrors(r.error)).sort()).toEqual(["email", "message", "name", "services"]);
  });
});

describe("audit form schema", () => {
  const valid = { name: "Sam", email: "sam@example.com", website: "https://roofer.co.nz", businessType: "Roofing", goal: "More leads", startedAt };

  it("accepts a valid audit request", () => {
    expect(auditSchema.safeParse(valid).success).toBe(true);
  });

  it("requires a website and a known goal", () => {
    const r = auditSchema.safeParse({ ...valid, website: "", goal: "World domination" });
    expect(r.success).toBe(false);
    if (!r.success) expect(Object.keys(flattenErrors(r.error)).sort()).toEqual(["goal", "website"]);
  });

  it("rejects websites without a real domain", () => {
    expect(auditSchema.safeParse({ ...valid, website: "localhost" }).success).toBe(false);
  });
});
