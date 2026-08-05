import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/primitives";

type Tone = "dark" | "light";

/**
 * The page's structural refrain: eyebrow → serif headline → brass rule.
 * Every band opens this way, which is what gives a long scroll its rhythm.
 * `tone` describes the GROUND the heading sits on.
 */
export function SectionHeading({
  eyebrow,
  children,
  intro,
  align = "center",
  tone = "dark",
  id,
}: {
  eyebrow?: string;
  children: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  id?: string;
}) {
  const centered = align === "center";
  const headingColor = tone === "dark" ? "text-white" : "text-stone-900";
  const introColor = tone === "dark" ? "text-stone-400" : "text-stone-600";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <Reveal>
          <p className="mb-5 font-mono text-[0.7rem] font-medium tracking-[0.28em] text-brass-500 uppercase">
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.08}>
        <h2
          id={id}
          className={`font-display text-[2rem] leading-[1.12] tracking-tight text-balance sm:text-[2.6rem] lg:text-[3rem] ${headingColor}`}
        >
          {children}
        </h2>
      </Reveal>

      <Reveal delay={0.16}>
        <span
          className={`mt-7 block h-px w-24 bg-gradient-to-r from-transparent via-brass-500 to-transparent ${
            centered ? "mx-auto" : ""
          }`}
        />
      </Reveal>

      {intro ? (
        <Reveal delay={0.22}>
          <p
            className={`mt-7 text-[1.05rem] leading-relaxed text-pretty ${introColor}`}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
