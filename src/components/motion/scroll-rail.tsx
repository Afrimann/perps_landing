"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin gold rail down the right edge that fills as the page is read.
 * Decorative — hidden from assistive tech, and from narrow viewports where
 * it would crowd the content.
 *
 * The spring is the whole point. Bound straight to `scrollYProgress` the rail
 * tracks the wheel exactly, which reads as mechanical on a trackpad and
 * jittery on a phone. Damped, it chases the scroll and settles — a physical
 * indicator rather than a value readout.
 *
 * Deliberately NOT gated on reduced motion: the rail's only job is to report
 * scroll position, and freezing it at zero would be a broken control rather
 * than a calmer one.
 */
export function ScrollRail() {
  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
    /* Snaps the last hair to 1 rather than easing toward it forever. */
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 z-40 hidden h-full w-px bg-white/8 lg:block"
    >
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="h-full w-px bg-gradient-to-b from-accent-300 via-accent-500 to-accent-600"
      />
    </div>
  );
}
