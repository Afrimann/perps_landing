/**
 * Thin brass rail down the right edge that fills as the page is read.
 * Decorative — hidden from assistive tech and on narrow viewports where
 * it would crowd the content.
 *
 * Driven entirely by a CSS scroll-timeline, so it costs no JavaScript and
 * never runs on the main thread. Browsers without scroll-driven animation
 * show the empty track; there is nothing to fall back to and nothing lost.
 */
export function ScrollRail() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 z-40 hidden h-full w-px bg-white/8 lg:block"
    >
      <div className="scroll-rail-fill h-full w-px bg-gradient-to-b from-accent-300 via-accent-500 to-accent-600" />
    </div>
  );
}
