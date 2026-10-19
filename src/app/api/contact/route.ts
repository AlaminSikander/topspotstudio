import { contactSchema } from "@/lib/forms";
import { handleFormPost } from "@/lib/form-handler";

export async function POST(request: Request) {
  return handleFormPost(request, contactSchema, (d) => ({
    subject: `New enquiry — ${d.name}${d.businessName ? ` (${d.businessName})` : ""}`,
    heading: "New website enquiry",
    rows: [
      ["Full name", d.name],
      ["Business name", d.businessName],
      ["Work email", d.email],
      ["Phone", d.phone],
      ["Website", d.website],
      ["Location / service area", d.location],
      ["Help needed with", d.services.join(", ")],
      ["What they want to improve", d.message],
      ["How they heard about us", d.source],
    ],
  }));
}
