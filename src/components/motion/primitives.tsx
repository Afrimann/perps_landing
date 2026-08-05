"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fade-and-rise on scroll into view. The workhorse — nearly every block on
 * the site enters through this so the whole page shares one timing feel.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: "-40px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Wrap a list so children enter one after another rather than together. */
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
      viewport={{ once: true, amount: 0, margin: "-40px" }}
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
    <Tag
      className={className}
      variants={
        reduced
          ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
          : itemVariants
      }
    >
      {children}
    </Tag>
  );
}

/**
 * Headline that reveals line by line through a clip mask, so the words
 * rise out of an invisible edge rather than simply fading in.
 */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: "110%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{
              duration: 1,
              delay: delay + index * 0.13,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Counts up to a number once scrolled into view. Only ever used for figures
 * the foundation has actually confirmed — see content/activities.ts.
 */
export function Counter({
  to,
  suffix = "",
  duration = 1.8,
  className,
  immediate = false,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
  /**
   * Skip the scroll gate and animate whenever `to` changes. Required for
   * values derived from user input — a scroll-gated counter below the fold
   * never starts, and renders a misleading 0.
   */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const active = immediate || inView;

  useEffect(() => {
    if (!active) return;

    /* Reduced motion jumps to the final value on the first frame AFTER
       mount rather than during render. Deriving it at render time would
       make the server (which cannot know the preference) emit a different
       number from the client, which is a hydration mismatch. */
    if (reduced) {
      const jump = requestAnimationFrame(() => setDisplay(to));
      return () => cancelAnimationFrame(jump);
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      // easeOutExpo — fast start, long settle, reads as "counting up"
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, to, duration, reduced]);

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      {display.toLocaleString("en-NG")}
      {suffix}
    </span>
  );
}

/**
 * Button that drifts a few pixels toward the pointer and springs back.
 * Pointer-driven only — never fires for keyboard or touch users.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  const onMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.span>
  );
}

/**
 * Card that tilts in 3D toward the pointer, with a brass sheen tracking the
 * cursor position. Disabled for reduced-motion and non-mouse input.
 */
export function TiltCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springX = useSpring(px, { stiffness: 200, damping: 22 });
  const springY = useSpring(py, { stiffness: 200, damping: 22 });

  const rotateY = useTransform(springX, [0, 1], [-6, 6]);
  const rotateX = useTransform(springY, [0, 1], [5, -5]);
  const sheenX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900, ...style }}
      className={`relative ${className ?? ""}`}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [sheenX, sheenY],
            ([sx, sy]) =>
              `radial-gradient(340px circle at ${sx} ${sy}, rgba(232,196,106,0.10), transparent 65%)`
          ),
        }}
      />
    </motion.div>
  );
}

/**
 * Line icon that draws itself once in view. Children must be stroked SVG
 * paths — there is nothing to trace on a filled shape.
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
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      <motion.g
        variants={{
          hidden: { pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0.2 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.1, delay, ease: EASE },
          },
        }}
      >
        {children}
      </motion.g>
    </motion.svg>
  );
}
