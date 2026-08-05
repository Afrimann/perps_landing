import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/primitives";

type Variant = "brass" | "outline" | "ghost-dark";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 font-mono text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition-colors duration-300";

const variants: Record<Variant, string> = {
  brass: "bg-brass-500 text-ink-950 hover:bg-brass-400",
  outline:
    "border border-brass-500/60 text-brass-300 hover:border-brass-400 hover:text-brass-200",
  "ghost-dark":
    "border border-ink-900/15 text-ink-900 hover:border-ink-900/40 hover:bg-ink-900/5",
};

export function ButtonLink({
  href,
  variant = "brass",
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
