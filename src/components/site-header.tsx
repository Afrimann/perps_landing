"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { navLinks, site } from "@/content/site";

/* TODO: swap the initials mark for the foundation's logo once supplied. */
function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex items-center gap-3.5"
      aria-label={`${site.name} — home`}
    >
      <span className="relative grid size-11 shrink-0 place-items-center rounded-full border border-brass-500/40 font-display text-[0.8rem] font-semibold text-brass-300 transition-colors duration-300 group-hover:border-brass-400">
        {site.shortName}
      </span>
      <span className="font-display text-[1.05rem] leading-none font-medium tracking-tight text-white">
        {site.name}
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/8 bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Wordmark onClick={() => setOpen(false)} />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-1 text-[0.9rem] text-stone-300 transition-colors duration-300 hover:text-white"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-brass-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/#give"
              className="rounded-full bg-brass-500 px-6 py-2.5 font-mono text-[0.7rem] font-semibold tracking-[0.16em] text-ink-950 uppercase transition-colors duration-300 hover:bg-brass-400"
            >
              Donate
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="relative grid size-10 place-items-center rounded-full text-white transition-colors hover:bg-white/8 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="size-6"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/8 bg-ink-950 lg:hidden"
          >
            <Container className="py-7">
              <nav aria-label="Mobile" className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-white/6 py-4 font-display text-xl text-white transition-colors hover:text-brass-300"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <Link
                  href="/#give"
                  onClick={() => setOpen(false)}
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-brass-500 px-6 py-3.5 font-mono text-[0.72rem] font-semibold tracking-[0.16em] text-ink-950 uppercase"
                >
                  Donate
                </Link>
              </nav>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
