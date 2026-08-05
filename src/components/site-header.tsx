"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { navLinks, site } from "@/content/site";

/* TODO: replace the initials mark with the foundation's real logo once supplied. */
function Wordmark() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label={`${site.name} — home`}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-700 font-display text-sm font-semibold text-gold-200 transition group-hover:bg-brand-800">
        {site.shortName}
      </span>
      <span className="font-display text-lg leading-none font-semibold tracking-tight text-brand-900">
        {site.name}
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  /* Lock background scrolling while the mobile sheet is open. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Escape closes the sheet — expected of any modal-ish surface. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100/80 bg-cream/85 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Wordmark />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-700 transition hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="#donate"
              className="inline-flex items-center rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              Donate
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full text-brand-900 transition hover:bg-brand-50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              className="size-6"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-ink-100 bg-cream lg:hidden"
        >
          <Container className="py-6">
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink-800 transition hover:bg-brand-50 hover:text-brand-800"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#donate"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                Donate
              </Link>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
