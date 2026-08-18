/**
 * The site's shared motion vocabulary.
 *
 * One set of springs and easings used by every animated component. That is
 * the difference between a site that feels animated and one that feels like
 * twenty unrelated animations — the timing is the brand, not the effect.
 *
 * Lives in its own module because `primitives` re-exports from `interactive`
 * and `interactive` needs these constants; importing them back out of
 * `primitives` would be a cycle.
 *
 * No "use client" directive: these are plain values, so the file can be
 * pulled into a server component's graph without forcing a client boundary.
 */

/** Long, soft deceleration — the house easing. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Entrances. Slightly underdamped, so blocks settle rather than stop dead. */
export const SPRING = {
  type: "spring" as const,
  stiffness: 130,
  damping: 20,
  mass: 0.9,
};

/** Pointer tracking. Stiffer and lighter — follows without lag or wobble. */
export const SPRING_POINTER = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
  mass: 0.6,
};

/** Scroll-linked values. Heavily damped, or parallax reads as jitter. */
export const SPRING_SCROLL = {
  stiffness: 90,
  damping: 24,
  mass: 0.4,
};

/**
 * Once per element, and only once it is properly on screen. `amount: 0.15`
 * rather than 0 stops tall sections from firing while still a sliver below
 * the fold, which made their stagger finish before the reader arrived.
 */
export const VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -80px 0px",
} as const;
