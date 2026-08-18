"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";

/**
 * The site's motion vocabulary.
 *
 * One shared set of springs and easings, used by everything. That is the
 * difference between a site that feels animated and one that feels like
 * twenty separate animations — the timing is the brand, not the individual
 * effect.
 *
 * Every primitive here degrades to a plain opacity fade under
 * `prefers-reduced-motion`, which Android Chrome forces on under Battery
 * Saver. Nothing is ever left invisible: the reduced path always ends at
 * opacity 1.
 *
 * The pointer-driven pieces (Counter, Magnetic, TiltCard) live in
 * ./interactive and are re-exported here so call sites keep one import.
 */
export { Counter, Magnetic, TiltCard } from "./interactive";
export { EASE, SPRING, SPRING_POINTER, SPRING_SCROLL, VIEWPORT } from "./springs";

import { EASE, SPRING, SPRING_SCROLL, VIEWPORT } from "./springs";

/**
 * Fade-and-rise on scroll into view. The workhorse — most blocks on the site
 * enter through this, which is what gives a long scroll one consistent feel.
 *
 * `blur` adds a short defocus to the entrance. It is genuinely expensive
 * (filter forces a repaint), so it is opt-in and reserved for a handful of
 * hero-adjacent moments rather than every paragraph on the page.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  blur = false,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, y, filter: blur ? "blur(10px)" : undefined }
      }
      whileInView={{ opacity: 1, y: 0, filter: blur ? "blur(0px)" : undefined }}
      viewport={VIEWPORT}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </Tag>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

const itemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

/**
 * Wrap a list so children enter one behind the next rather than together.
 * Orchestration lives on the parent, so the children never need to know
 * their own index.
 */
export function StaggerGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag className={className} variants={reduced ? itemReduced : itemVariants}>
      {children}
    </Tag>
  );
}

const maskedLine: Variants = {
  hidden: { y: "110%" },
  shown: { y: "0%" },
};

const maskedLineReduced: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1 },
};

/**
 * Headline that reveals line by line through a clip mask, so the words rise
 * out of an invisible edge rather than fading in.
 *
 * Transform only, never opacity: an element at opacity 0 is not a Largest
 * Contentful Paint candidate, so fading a headline in defers the page's LCP
 * by the length of the animation. Sliding it at full opacity does not.
 *
 * ── Why the trigger is on the WRAPPER ──
 * The scroll trigger must live on this outer element, never on the inner
 * lines. Each line starts at `y: 110%`, and IntersectionObserver measures an
 * element's TRANSFORMED box — so a trigger attached to a line watches a
 * rectangle a full line-height below where the text actually appears. With
 * VIEWPORT also pulling the detection edge up by 80px, the reveal fired well
 * after the heading was on screen, and the reader arrived at a blank gap
 * where the headline should have been. The wrapper is never transformed, so
 * it measures where the text really is; the lines then animate off its
 * variant state.
 *
 * `immediate` animates on mount instead of on scroll — for headlines already
 * above the fold, which would otherwise wait on a callback that fires
 * instantly anyway.
 */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  immediate = false,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      className={className}
      initial="hidden"
      {...(immediate
        ? { animate: "shown" }
        : { whileInView: "shown", viewport: VIEWPORT })}
    >
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={reduced ? maskedLineReduced : maskedLine}
            transition={{
              duration: 1,
              ease: EASE,
              delay: delay + index * 0.13,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Splits a string and reveals it word by word. Heavier than MaskedLines and
 * used sparingly — it is the single most attention-grabbing entrance on the
 * site, so it belongs to one element per page at most.
 *
 * Splitting on words rather than characters is deliberate: per-character
 * spans break text selection, copy-paste and screen-reader pronunciation.
 * The whole string is exposed to assistive tech via `aria-label`, and the
 * animated spans are hidden from it.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.06em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "108%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: delay + index * stagger,
            }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Scroll-linked vertical drift. The element moves against the scroll while
 * it crosses the viewport, which reads as depth behind the page.
 *
 * `useSpring` smooths the raw scroll value — without it the movement is
 * pinned to the scroll position exactly and feels rigid on a trackpad and
 * jittery on a phone.
 */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  /** Total travel in pixels across the whole crossing. */
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, SPRING_SCROLL);

  const y = useTransform(smooth, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Line icon that draws itself once in view. Children must be stroked SVG
 * paths carrying `pathLength="1"`, so one dash length works for every shape
 * regardless of its real perimeter.
 */
export function DrawIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: {} }}
    >
      <motion.g
        variants={{
          hidden: {
            pathLength: reduced ? 1 : 0,
            opacity: reduced ? 1 : 0.25,
          },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.2, delay, ease: EASE },
          },
        }}
      >
        {children}
      </motion.g>
    </motion.svg>
  );
}

/** Shared transition for the gallery's shared-element morph. */
export const LAYOUT_TRANSITION = { duration: 0.45, ease: EASE };

export type { CSSProperties };
