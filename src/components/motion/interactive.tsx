"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { EASE, SPRING_POINTER } from "./springs";

/**
 * The pointer-driven and value-driven pieces.
 *
 * All three write through motion values rather than React state, so a pointer
 * move or a counting frame never triggers a re-render — the DOM is updated
 * off the React tree entirely.
 */

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
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const [display, setDisplay] = useState(0);
  const active = immediate || inView;

  useEffect(() => {
    if (!active) return;

    /* Reduced motion lands on the final value a frame after mount rather
       than during render. Deriving it at render time would make the server —
       which cannot know the preference — emit a different number from the
       client, which is a hydration mismatch. */
    if (reduced) {
      const frame = requestAnimationFrame(() => setDisplay(to));
      return () => cancelAnimationFrame(frame);
    }

    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (value) => setDisplay(Math.round(value)),
    });

    return () => controls.stop();
  }, [active, to, duration, reduced]);

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      {display.toLocaleString("en-NG")}
      {suffix}
    </span>
  );
}

/**
 * Button that drifts toward the pointer and springs back on leave.
 * Pointer-driven only — never fires for keyboard or touch users, for whom
 * there is no cursor to be magnetic toward.
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
  const springX = useSpring(x, SPRING_POINTER);
  const springY = useSpring(y, SPRING_POINTER);

  const onMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse" || reduced) return;
    const rect = node.getBoundingClientRect();
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
 * Card that tilts in 3D toward the pointer, with a gold sheen tracking the
 * cursor. Disabled for reduced-motion and for any non-mouse input.
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

  /* 0.5/0.5 is centre, so the card starts flat. */
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springX = useSpring(px, SPRING_POINTER);
  const springY = useSpring(py, SPRING_POINTER);

  const rotateY = useTransform(springX, [0, 1], [-7, 7]);
  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const sheenX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const sheen = useTransform(
    [sheenX, sheenY],
    ([sx, sy]) =>
      `radial-gradient(340px circle at ${sx} ${sy}, color-mix(in srgb, var(--color-accent-300) 12%, transparent), transparent 65%)`
  );

  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse" || reduced) return;
    const rect = node.getBoundingClientRect();
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
      style={
        reduced
          ? style
          : { rotateX, rotateY, transformPerspective: 900, ...style }
      }
      className={`relative ${className ?? ""}`}
    >
      {children}
      <motion.span
        aria-hidden="true"
        style={reduced ? undefined : { background: sheen }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.div>
  );
}
