"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import type { z } from "zod";
import { track, type TrackedEvent } from "@/lib/analytics";
import { flattenErrors, type FormResult } from "@/lib/forms";

type Status = "idle" | "submitting" | "success" | "error";

export function useFormSubmit<S extends z.ZodType>({
  endpoint,
  schema,
  formId,
  startEvent,
  submitEvent,
  collect,
}: {
  endpoint: string;
  schema: S;
  formId: string;
  startEvent: TrackedEvent;
  submitEvent: TrackedEvent;
  collect: (fd: FormData) => Record<string, unknown>;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string>("");
  const startedAt = useRef<number>(0);
  const started = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onStart = useCallback(() => {
    if (started.current) return;
    started.current = true;
    track(startEvent, { form_id: formId });
  }, [formId, startEvent]);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const payload = { ...collect(new FormData(form)), startedAt: startedAt.current };

      const parsed = schema.safeParse(payload);
      if (!parsed.success) {
        const fieldErrors = flattenErrors(parsed.error);
        setErrors(fieldErrors);
        setStatus("error");
        setMessage("Please check the highlighted fields.");
        const first = Object.keys(fieldErrors)[0];
        form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        return;
      }

      setStatus("submitting");
      setErrors({});
      setMessage("");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await res.json().catch(() => ({ ok: false }))) as FormResult;
        if (res.ok && data.ok) {
          setStatus("success");
          track(submitEvent, { form_id: formId });
          return;
        }
        setStatus("error");
        if (!data.ok) {
          setErrors(data.fieldErrors || {});
          setMessage(data.message || "Something went wrong. Please try again.");
        }
      } catch {
        setStatus("error");
        setMessage("We couldn’t reach the server. Check your connection and try again.");
      }
    },
    [collect, endpoint, formId, schema, submitEvent],
  );

  return { status, errors, message, onStart, onSubmit, successRef };
}
