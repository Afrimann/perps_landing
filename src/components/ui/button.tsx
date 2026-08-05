import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 ease-out-soft";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white shadow-sm hover:bg-brand-800 hover:shadow-md active:translate-y-px",
  secondary:
    "bg-gold-400 text-brand-950 shadow-sm hover:bg-gold-300 hover:shadow-md active:translate-y-px",
  ghost:
    "border border-brand-200 bg-transparent text-brand-800 hover:border-brand-400 hover:bg-brand-50",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  ...props
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
