"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { photos } from "@/content/photos";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { MaskedLines, WordReveal } from "@/components/motion/primitives";
import { EASE } from "@/components/motion/springs";
import { hero } from "@/content/site";

/**
 * Three layers moving at three speeds as the hero leaves: the photograph
 * slowest, the washes in between, the type fastest. That difference is the
 * only thing that reads as depth — a single element sliding at one rate just
 * looks like it is falling off the screen.
 *
 * Scroll-linked values are read straight from `scrollYProgress` with no
 * spring. The hero is pinned to the top of the document, so any lag between
 * the scroll and the layers shows immediately as the photograph detaching
 * from its own frame. Springs are for the rail and for parallax further down
 * the page, where nothing is anchored to a hard edge.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* The photograph barely moves and keeps scaling — it is the far plane. */
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  /* The type leaves fastest and is gone before the section is. */
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  /* The cue is the first thing to go — it stops being an instruction the
     moment the reader has taken it. */
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[92svh] items-center overflow-hidden bg-surface-950"
    >
      {/* Real photograph behind the headline, held well back so the type
          stays the subject.

          preload: it is the LCP element (`priority` is deprecated as of
          Next 16). quality 40: it renders at 45% opacity beneath two
          gradients, where compression artefacts are not perceivable — at the
          default 75 this single image was 114 KB. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={reduced ? undefined : { y: imageY, scale: imageScale }}
      >
        <Image
          src={photos.streetCelebration.src}
          alt=""
          fill
          preload
          quality={40}
          sizes="100vw"
          className="object-cover object-[center_35%] opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-950 via-surface-950/85 to-surface-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-surface-950/70" />
      </motion.div>

      {/* A gold wash and an emerald one, counter-drifting. Decorative, and
          left as CSS: an infinite background loop that nothing reads from and
          nothing orchestrates has no reason to occupy a JS animation frame
          for the life of the page.

          These carried `blur-3xl` before. A 64px Gaussian blur across an
          80vh x 80vw box, re-rasterised every frame of an infinite scale
          animation, was the single most expensive thing on the page — and
          near-invisible, since a radial gradient fading to transparent is
          already soft-edged. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="animate-drift absolute -top-1/3 -left-1/4 h-[80vh] w-[80vw] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-accent-700) 55%, transparent) 0%, transparent 65%)",
          }}
        />
        <div
          className="animate-drift absolute -right-1/4 -bottom-1/3 h-[70vh] w-[70vw] rounded-full opacity-40"
          style={{
            animationDelay: "-11s",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-surface-700) 90%, transparent) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        className="relative w-full"
        style={
          reduced ? undefined : { y: contentY, opacity: contentOpacity }
        }
      >
        <Container className="py-28 lg:py-36">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mb-8 font-mono text-[0.7rem] font-medium tracking-[0.28em] text-accent-500 uppercase"
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="font-display text-[2.6rem] leading-[1.04] tracking-[-0.02em] text-white sm:text-[4rem] lg:text-[5.2rem]">
            <MaskedLines
              immediate
              lines={[
                hero.headingLead,
                <span key="accent" className="text-gradient-accent">
                  {hero.headingAccent}
                </span>,
              ]}
              delay={0.25}
            />
          </h1>

          {/* The one word-by-word reveal on the site. It is the most
              attention-grabbing entrance available, so it belongs to exactly
              one element — using it twice would spend the effect. */}
          <WordReveal
            text={hero.subheading}
            delay={0.7}
            className="mt-9 block max-w-xl text-[1.05rem] leading-relaxed text-pretty text-stone-400 sm:text-lg"
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.15 }}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href={hero.primaryCta.href} variant="accent">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </ButtonLink>
          </motion.div>
        </Container>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={reduced ? undefined : { opacity: cueOpacity }}
      >
        <motion.span
          className="block text-accent-500/70"
          initial={{ opacity: 0 }}
          animate={
            reduced
              ? { opacity: 1 }
              : { opacity: 1, y: [0, 9, 0] }
          }
          transition={{
            opacity: { duration: 0.7, delay: 1.4 },
            y: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
          }}
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
