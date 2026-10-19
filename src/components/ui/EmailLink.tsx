"use client";

import { Mail } from "lucide-react";
import { track } from "@/lib/analytics";

export function EmailLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      onClick={() => track("outbound_email_click")}
      className="inline-flex items-center gap-2 font-semibold text-teal-ink underline decoration-teal/40 underline-offset-4 hover:text-navy"
    >
      <Mail aria-hidden className="size-4" />
      {email}
    </a>
  );
}
