import type { ReactNode } from "react";

export function Eyebrow({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: "brand" | "light";
}) {
  const toneClass =
    tone === "light" ? "text-gold-300" : "text-brand-600";

  return (
    <p
      className={`mb-4 text-xs font-semibold tracking-[0.18em] uppercase ${toneClass}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  children,
  intro,
  align = "left",
  tone = "brand",
}: {
  eyebrow?: ReactNode;
  children: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "brand" | "light";
}) {
  const alignClass =
    align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl";
  const headingClass = tone === "light" ? "text-white" : "text-brand-900";
  const introClass = tone === "light" ? "text-brand-100" : "text-ink-600";

  return (
    <div className={alignClass}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`font-display text-3xl leading-tight tracking-tight text-balance sm:text-4xl ${headingClass}`}
      >
        {children}
      </h2>
      {intro ? (
        <p className={`mt-5 text-lg leading-relaxed text-pretty ${introClass}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
