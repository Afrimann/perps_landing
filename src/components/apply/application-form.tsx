"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/motion/primitives";
import { applyPage, fields, type Field, type FieldName } from "@/content/apply";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "sent";

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-stone-900 transition-colors placeholder:text-stone-400 focus:outline-none";
const inputIdle = "border-stone-300 focus:border-accent-500";
const inputError = "border-red-400 focus:border-red-500";

function FieldControl({
  field,
  invalid,
  describedBy,
}: {
  field: Field;
  invalid: boolean;
  describedBy?: string;
}) {
  const className = `${inputBase} ${invalid ? inputError : inputIdle}`;
  const shared = {
    id: field.name,
    name: field.name,
    required: field.required,
    "aria-invalid": invalid || undefined,
    "aria-describedby": describedBy,
    className,
  };

  if (field.control === "select") {
    return (
      /* Defaults to an empty option so the browser's own required-field
         check fires — a pre-selected first option would let someone submit
         a choice they never made. */
      <select {...shared} defaultValue="">
        <option value="" disabled>
          Select an option
        </option>
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (field.control === "textarea") {
    return (
      <textarea
        {...shared}
        rows={field.rows}
        maxLength={field.maxLength}
        placeholder={field.placeholder}
        className={`${className} resize-y`}
      />
    );
  }

  return (
    <input
      {...shared}
      type={field.type}
      placeholder={field.placeholder}
      autoComplete={field.autoComplete}
      min={field.min}
      max={field.max}
    />
  );
}

export function ApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrors({});
    setFormError(null);

    const data = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(data.entries());
    payload.consent = data.get("consent") === "on";

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("sent");
        formRef.current?.reset();
        return;
      }

      if (response.status === 422 && result.errors) {
        setErrors(result.errors as Errors);
        setFormError("Please check the highlighted fields and try again.");
      } else {
        setFormError(result.error ?? applyPage.errorFallback);
      }
    } catch {
      /* Network failure or the user went offline mid-submit. Their answers
         are still in the form — reset() only runs on success. */
      setFormError(applyPage.errorFallback);
    }

    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <Reveal>
        <div
          role="status"
          className="rounded-3xl border border-accent-500/40 bg-gradient-to-br from-white to-accent-200/25 p-9 text-center lg:p-12"
        >
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent-500/15 text-accent-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-7"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
          <h3 className="mt-7 font-display text-2xl text-stone-900">
            {applyPage.successHeading}
          </h3>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-stone-600">
            {applyPage.successBody}
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 rounded-full border border-stone-400 px-6 py-3 font-mono text-[0.7rem] font-semibold tracking-[0.16em] text-stone-700 uppercase transition-colors hover:border-stone-900 hover:text-stone-900"
          >
            {applyPage.successAgainLabel}
          </button>
        </div>
      </Reveal>
    );
  }

  const sending = status === "sending";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-stone-300/70 bg-white p-7 sm:p-9 lg:p-11"
    >
      <h3 className="font-display text-2xl text-stone-900">
        {applyPage.formHeading}
      </h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-stone-600">
        {applyPage.formIntro}
      </p>
      <span className="mt-7 block h-px w-full bg-stone-300/70" />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {fields.map((field) => {
          const error = errors[field.name as FieldName];
          const hintId = field.hint ? `${field.name}-hint` : undefined;
          const errorId = error ? `${field.name}-error` : undefined;
          const describedBy =
            [errorId, hintId].filter(Boolean).join(" ") || undefined;

          return (
            <div
              key={field.name}
              className={field.wide ? "sm:col-span-2" : undefined}
            >
              <label
                htmlFor={field.name}
                className="block text-[0.85rem] font-medium text-stone-700"
              >
                {field.label}
                {field.required ? (
                  <span className="ml-1 text-accent-600" aria-hidden="true">
                    *
                  </span>
                ) : null}
              </label>

              <div className="mt-2">
                <FieldControl
                  field={field}
                  invalid={Boolean(error)}
                  describedBy={describedBy}
                />
              </div>

              {error ? (
                <p id={errorId} className="mt-1.5 text-[0.8rem] text-red-600">
                  {error}
                </p>
              ) : null}
              {field.hint ? (
                <p id={hintId} className="mt-1.5 text-[0.8rem] text-stone-500">
                  {field.hint}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Honeypot. Hidden from sight AND from assistive tech, so only a bot
          that fills every field will trip it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="mt-8 rounded-xl border border-stone-300/70 bg-paper px-5 py-4 text-[0.85rem] leading-relaxed text-stone-600">
        {applyPage.documentsNote}
      </p>

      <div className="mt-7">
        <label className="flex gap-3.5 text-[0.88rem] leading-relaxed text-stone-600">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={Boolean(errors.consent) || undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 size-4 shrink-0 accent-accent-500"
          />
          <span>{applyPage.consentLabel}</span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="mt-1.5 text-[0.8rem] text-red-600">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {formError ? (
        <p
          role="alert"
          className="mt-7 rounded-xl border border-red-300 bg-red-50 px-5 py-4 text-[0.88rem] leading-relaxed text-red-700"
        >
          <strong className="font-semibold">{applyPage.errorHeading}.</strong>{" "}
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-accent-500 px-8 py-4 font-mono text-[0.72rem] font-semibold tracking-[0.16em] text-surface-950 uppercase transition-colors hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {sending ? applyPage.submittingLabel : applyPage.submitLabel}
      </button>
    </form>
  );
}
