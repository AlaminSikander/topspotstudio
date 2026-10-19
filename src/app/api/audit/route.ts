import { auditSchema } from "@/lib/forms";
import { handleFormPost } from "@/lib/form-handler";

export async function POST(request: Request) {
  return handleFormPost(request, auditSchema, (d) => ({
    subject: `Free SEO audit request — ${d.website}`,
    heading: "New free SEO audit request",
    rows: [
      ["Name", d.name],
      ["Work email", d.email],
      ["Website", d.website],
      ["Business type", d.businessType],
      ["Primary service", d.primaryService],
      ["Location / service area", d.location],
      ["Main goal", d.goal],
      ["Anything else", d.message],
    ],
  }));
}
