"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

/**
 * The three primitives that genuinely cannot be CSS: two are driven by live
 * pointer coordinates, one counts. Everything else on the site is a server
 * component in ./primitives.
 *
 * None of these use an animation library. They write transforms straight to
 * the node — no React state per frame, so a pointer move never re-renders.
 */

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
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
  const [inView, setInView] = useState(false);
  const [display, setDisplay] = useState(0);
  const active = immediate || inView;

  useEffect(() => {
    if (immediate) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  useEffect(() => {
    if (!active) return;

    /* Reduced motion jumps to the final value on the first frame AFTER
       mount rather than during render. Deriving it at render time would
       make the server (which cannot know the preference) emit a different
       number from the client, which is a hydration mismatch. */
    if (prefersReducedMotion()) {
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
  }, [active, to, duration]);

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

  const onMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse" || prefersReducedMotion()) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`inline-block transition-transform duration-200 ease-out ${className ?? ""}`}
    >
      {children}
    </span>
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

  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse" || prefersReducedMotion()) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    node.style.setProperty("--tilt-x", `${(0.5 - py) * 10}deg`);
    node.style.setProperty("--tilt-y", `${(px - 0.5) * 12}deg`);
    node.style.setProperty("--sheen-x", `${px * 100}%`);
    node.style.setProperty("--sheen-y", `${py * 100}%`);
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.removeProperty("--tilt-x");
    node.style.removeProperty("--tilt-y");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={style}
      className={`tilt-card relative ${className ?? ""}`}
    >
      {children}
      <span aria-hidden="true" className="tilt-sheen" />
    </div>
  );
}
