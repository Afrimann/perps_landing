import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/primitives";

/**
 * Named for the GROUND the button sits on, matching SectionHeading's `tone`.
 * Getting this wrong is silent and invisible in a diff — `outline` on a paper
 * band renders pale gold on cream, which technically works and is unreadable.
 */
type Variant = "accent" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 font-mono text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition-colors duration-300";

const variants: Record<Variant, string> = {
  /* Gold fill with emerald text. Clears 4.5:1 on both grounds, so it carries
     the primary call to action everywhere. */
  accent: "bg-accent-500 text-surface-950 hover:bg-accent-400",
  /* Secondary, on an EMERALD ground. */
  outline:
    "border border-accent-500/60 text-accent-300 hover:border-accent-400 hover:text-accent-200",
  /* Secondary, on a PAPER ground. Emerald rather than gold: gold on cream is
     roughly 2:1 and fails outright at this size. */
  ghost:
    "border border-surface-800/30 text-surface-800 hover:border-surface-800/60 hover:bg-surface-800/5",
};

export function ButtonLink({
  href,
  variant = "accent",
  children,
  className = "",
  magnetic = true,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  magnetic?: boolean;
}) {
  const button = (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {/* Sheen that sweeps across on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
    </Link>
  );

  return magnetic ? <Magnetic>{button}</Magnetic> : button;
}
