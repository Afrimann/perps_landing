import type { CSSProperties, ReactNode } from "react";

/**
 * The site's entrance vocabulary.
 *
 * These are all SERVER components. They render markup plus a `data-` hook and
 * nothing else; the transitions live in globals.css and a single shared
 * IntersectionObserver (components/motion/reveal-observer.tsx) releases them.
 * Nothing here ships JavaScript, which is the point — these wrap most of the
 * page, so making them client components pulled an animation library into
 * every route.
 *
 * The pointer-driven pieces genuinely need a client, and live in
 * ./interactive. They are re-exported here so call sites keep one import.
 */
export { Counter, Magnetic, TiltCard } from "./interactive";

/** Inline custom properties, omitted entirely when they match the CSS default. */
function revealVars(delay: number, y?: number): CSSProperties | undefined {
  const vars: Record<string, string> = {};
  if (delay) vars["--reveal-delay"] = `${delay}s`;
  if (y !== undefined && y !== 24) vars["--reveal-y"] = `${y}px`;
  return Object.keys(vars).length ? (vars as CSSProperties) : undefined;
}

/**
 * Fade-and-rise on scroll into view. The workhorse — nearly every block on
 * the site enters through this so the whole page shares one timing feel.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  return (
    <Tag className={className} data-reveal="" style={revealVars(delay, y)}>
      {children}
    </Tag>
  );
}

/**
 * Wrap a list so children enter one after another rather than together.
 * The offsets come from `:nth-child` in CSS, so this never needs to count or
 * clone its children.
 */
export function StaggerGroup({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul";
}) {
  return (
    <Tag className={className} data-reveal-group="">
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  return (
    <Tag className={className} data-reveal="" style={revealVars(0, 28)}>
      {children}
    </Tag>
  );
}

/**
 * Headline that reveals line by line through a clip mask, so the words rise
 * out of an invisible edge rather than simply fading in.
 *
 * Transform only, never opacity: a transparent element is not a Largest
 * Contentful Paint candidate, so fading a headline in defers the page's LCP
 * by the length of the animation. Sliding it at full opacity does not.
 *
 * `immediate` runs the animation on load rather than on scroll — for
 * headlines above the fold, which would otherwise sit clipped until
 * hydration brings the observer up.
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
  return (
    <span className={className}>
      {lines.map((line, index) => {
        const stagger = delay + index * 0.13;
        return (
          <span key={index} className="block overflow-hidden pb-[0.08em]">
            <span
              className={lineClassName}
              style={stagger ? ({ "--reveal-delay": `${stagger}s` } as CSSProperties) : undefined}
              {...(immediate
                ? { "data-reveal-line-immediate": "" }
                : { "data-reveal-line": "" })}
            >
              {line}
            </span>
          </span>
        );
      })}
    </span>
  );
}

/**
 * Line icon that draws itself once in view. Children must be stroked SVG
 * paths carrying `pathLength="1"` — the CSS uses a single dash length for
 * every shape, which only works if their lengths are normalised.
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
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      data-draw=""
      style={revealVars(delay)}
    >
      {children}
    </svg>
  );
}
