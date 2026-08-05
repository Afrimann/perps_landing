"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin brass rail down the right edge that fills as the page is read.
 * Decorative — hidden from assistive tech and on narrow viewports where
 * it would crowd the content.
 */
export function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 z-40 hidden h-full w-px bg-white/8 lg:block"
    >
      <motion.div
        className="w-px origin-top bg-gradient-to-b from-brass-300 via-brass-500 to-brass-600"
        style={{ scaleY: progress, height: "100%" }}
      />
    </div>
  );
}
