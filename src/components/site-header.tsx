"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
      <span className="relative grid size-11 shrink-0 place-items-center rounded-full border border-accent-500/40 font-display text-[0.8rem] font-semibold text-accent-300 transition-colors duration-300 group-hover:border-accent-400">
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
  const sentinel = useRef<HTMLDivElement>(null);

  /* Whether the page has been scrolled is answered by watching a marker at
     the top of the document leave the viewport, not by subscribing to scroll
     position. The browser reports the crossing once; the previous version
     ran a callback on every scroll frame to compare a number. */
  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
    <>
      {/* Sits at the document origin and is scrolled past immediately; the
          observer above uses it as the "page has moved" signal. Absolute with
          no positioned ancestor, so it takes up no layout. */}
      <div
        ref={sentinel}
        aria-hidden="true"
        className="absolute top-0 h-6 w-px"
      />

      {/* The bar is ALWAYS emerald, never transparent.

          This is `sticky`, not `fixed`, so at scroll-top it is not floating
          over the hero — it occupies its own 80px band in flow, and whatever
          sits behind it is the BODY background. That background is paper, so
          a transparent bar rendered white wordmark and white nav links on
          cream: present in the DOM, invisible on screen, and only appearing
          once scrolling swapped in the emerald.

          Scrolling now changes only the treatment — translucent with a blur
          and a hairline, so content passing underneath is felt rather than
          hidden — never whether the bar is there at all. */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          scrolled || open
            ? "border-white/8 bg-surface-950/85 backdrop-blur-xl"
            : "border-transparent bg-surface-950"
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
                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/#give"
              className="rounded-full bg-accent-500 px-6 py-2.5 font-mono text-[0.7rem] font-semibold tracking-[0.16em] text-surface-950 uppercase transition-colors duration-300 hover:bg-accent-400"
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

        {/* Stays mounted and collapses to zero rows, which is how an
            auto-height transition is done in CSS. `inert` takes the links
            out of the tab order and the accessibility tree while closed, so
            keeping them in the DOM costs nothing. */}
        <div
          id="mobile-menu"
          data-open={open}
          inert={!open}
          className="menu-collapse border-t border-white/8 bg-surface-950 lg:hidden"
        >
          <div className="overflow-hidden">
            <Container className="py-7">
              <nav aria-label="Mobile" className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/6 py-4 font-display text-xl text-white transition-colors hover:text-accent-300"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/#give"
                  onClick={() => setOpen(false)}
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-accent-500 px-6 py-3.5 font-mono text-[0.72rem] font-semibold tracking-[0.16em] text-surface-950 uppercase"
                >
                  Donate
                </Link>
              </nav>
            </Container>
          </div>
        </div>
      </header>
    </>
  );
}
