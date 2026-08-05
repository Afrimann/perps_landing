"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { photos } from "@/content/photos";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { MaskedLines } from "@/components/motion/primitives";
import { hero } from "@/content/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  /* Content drifts up and fades slightly slower than the scroll, so the
     hero feels like it has depth rather than simply leaving. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[92svh] items-center overflow-hidden bg-ink-950"
    >
      {/* Real photograph behind the headline, held well back so the type
          stays the subject. Priority: it is the LCP element. */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={photos.streetCelebration.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover object-[center_35%] opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/70" />
      </div>

      {/* Two slow brass washes, counter-drifting. Decorative. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="animate-drift absolute -top-1/3 -left-1/4 h-[80vh] w-[80vw] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(126,90,25,0.55) 0%, transparent 65%)",
          }}
        />
        <div
          className="animate-drift absolute -right-1/4 -bottom-1/3 h-[70vh] w-[70vw] rounded-full opacity-40 blur-3xl"
          style={{
            animationDelay: "-11s",
            background:
              "radial-gradient(circle, rgba(27,36,32,0.9) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="relative w-full"
      >
        <Container className="py-28 lg:py-36">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mb-8 font-mono text-[0.7rem] font-medium tracking-[0.28em] text-brass-500 uppercase"
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="font-display text-[2.6rem] leading-[1.04] tracking-[-0.02em] text-white sm:text-[4rem] lg:text-[5.2rem]">
            <MaskedLines
              lines={[
                hero.headingLead,
                <span key="accent" className="text-gradient-brass">
                  {hero.headingAccent}
                </span>,
              ]}
              delay={0.25}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="mt-9 max-w-xl text-[1.05rem] leading-relaxed text-pretty text-stone-400 sm:text-lg"
          >
            {hero.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href={hero.primaryCta.href} variant="brass">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </ButtonLink>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block text-brass-500/70"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="size-6"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.span>
      </motion.div>
    </section>
  );
}
