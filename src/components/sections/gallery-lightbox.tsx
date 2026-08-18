"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import type { Photo } from "@/content/photos";
import { EASE } from "@/components/motion/springs";

/**
 * Full-screen image viewer.
 *
 * Loaded on demand by the gallery rather than with the page — nobody who does
 * not open an image should pay for it.
 *
 * `layoutId` is the reason this is worth the bytes: the tile the reader
 * clicked and the figure that opens share an id, so Framer measures both and
 * animates the real element between the two positions. The picture appears to
 * fly out of the grid rather than a copy of it fading in on top.
 *
 * The unmount is driven by AnimatePresence in the parent, so the exit plays
 * before the node leaves the tree — previously this was a setTimeout racing
 * the unmount.
 */
export function Lightbox({
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
  }, [onStep, onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="fixed inset-0 z-100 flex flex-col bg-surface-950/95 backdrop-blur-xl"
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
      <motion.div
        className="flex items-center justify-between px-6 py-5"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: EASE, delay: 0.1 }}
      >
        <span className="font-mono text-[0.68rem] tracking-[0.2em] text-stone-500 uppercase tabular">
          {index + 1} / {items.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="grid size-11 place-items-center rounded-full border border-white/12 text-white transition-colors hover:border-accent-400 hover:text-accent-300"
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
      </motion.div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Shares its id with the grid tile, so this is the same element
            travelling rather than a second one appearing. */}
        <motion.div
          layoutId={`photo-${photo.src}`}
          className="relative max-h-full"
          transition={{ duration: 0.45, ease: EASE }}
        >
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="92vw"
            className="max-h-[72svh] w-auto rounded-xl object-contain"
          />
        </motion.div>
      </div>

      <motion.div
        className="flex items-center justify-between gap-6 px-6 pb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.3, ease: EASE, delay: 0.1 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onStep(-1)}
          className="grid size-12 shrink-0 place-items-center rounded-full border border-white/12 text-white transition-colors hover:border-accent-400 hover:text-accent-300"
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

        {/* Keyed on the photo so the caption cross-fades when stepping,
            rather than swapping its text mid-sentence. */}
        <AnimatePresence mode="wait">
          <motion.p
            key={photo.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="max-w-xl text-center text-sm leading-relaxed text-stone-400"
          >
            {photo.alt}
          </motion.p>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => onStep(1)}
          className="grid size-12 shrink-0 place-items-center rounded-full border border-white/12 text-white transition-colors hover:border-accent-400 hover:text-accent-300"
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
      </motion.div>
    </motion.div>
  );
}
