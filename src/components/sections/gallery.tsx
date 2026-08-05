"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  galleryPhotos,
  galleryStrands,
  gallerySection,
  type Photo,
  type StrandFilter,
} from "@/content/photos";

const EASE = [0.22, 1, 0.36, 1] as const;

function Tile({
  photo,
  index,
  onOpen,
}: {
  photo: Photo;
  index: number;
  onOpen: (index: number) => void;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      layoutId={`photo-${photo.src}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: "-40px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: EASE }}
      className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/8 bg-ink-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-400"
      aria-label={`Open image: ${photo.alt}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
        className="h-auto w-full scale-[1.02] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
      />

      {/* Brass wash on hover — the only colour the gallery adds. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <span className="font-mono text-[0.62rem] tracking-[0.16em] text-brass-300 uppercase">
          View
        </span>
      </span>
    </motion.button>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: Photo[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const photo = items[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);

  /* Move focus into the dialog on open and restore it on close, so keyboard
     users are not dropped back at the top of the document. */
  useEffect(() => {
    const restoreTo = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      restoreTo?.focus?.();
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col bg-ink-950/95 backdrop-blur-xl"
      onClick={onClose}
      onTouchStart={(event) => {
        touchStart.current = event.changedTouches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 60) onStep(delta < 0 ? 1 : -1);
        touchStart.current = null;
      }}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-mono text-[0.68rem] tracking-[0.2em] text-stone-500 uppercase tabular">
          {index + 1} / {items.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="grid size-11 place-items-center rounded-full border border-white/12 text-white transition-colors hover:border-brass-400 hover:text-brass-300"
          aria-label="Close image viewer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="size-5"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4"
        onClick={(event) => event.stopPropagation()}
      >
        <motion.div
          layoutId={`photo-${photo.src}`}
          className="relative max-h-full"
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="92vw"
            className="max-h-[72svh] w-auto rounded-xl object-contain"
          />
        </motion.div>
      </div>

      <div
        className="flex items-center justify-between gap-6 px-6 pb-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onStep(-1)}
          className="grid size-12 shrink-0 place-items-center rounded-full border border-white/12 text-white transition-colors hover:border-brass-400 hover:text-brass-300"
          aria-label="Previous image"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="size-5"
            aria-hidden="true"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <p className="max-w-xl text-center text-sm leading-relaxed text-stone-400">
          {photo.alt}
        </p>

        <button
          type="button"
          onClick={() => onStep(1)}
          className="grid size-12 shrink-0 place-items-center rounded-full border border-white/12 text-white transition-colors hover:border-brass-400 hover:text-brass-300"
          aria-label="Next image"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="size-5"
            aria-hidden="true"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const [strand, setStrand] = useState<StrandFilter>("all");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(
    () =>
      strand === "all"
        ? galleryPhotos
        : galleryPhotos.filter((photo) => photo.strand === strand),
    [strand]
  );

  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null
          ? current
          : (current + delta + items.length) % items.length
      ),
    [items.length]
  );

  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="gallery" className="relative bg-ink-950 py-28 lg:py-36">
      <Container>
        <SectionHeading
          eyebrow={gallerySection.eyebrow}
          intro={gallerySection.intro}
          tone="dark"
        >
          {gallerySection.heading}
        </SectionHeading>

        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {galleryStrands.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setStrand(option.id);
                setOpen(null);
              }}
              aria-pressed={strand === option.id}
              className={`rounded-full border px-5 py-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase transition-colors duration-300 ${
                strand === option.id
                  ? "border-brass-500 bg-brass-500/15 text-brass-300"
                  : "border-white/12 text-stone-500 hover:border-white/25 hover:text-stone-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((photo, index) => (
            <Tile
              key={photo.src}
              photo={photo}
              index={index}
              onOpen={setOpen}
            />
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {open !== null && items[open] ? (
          <Lightbox
            items={items}
            index={open}
            onClose={close}
            onStep={step}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
