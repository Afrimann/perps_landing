"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/photos";

/**
 * Full-screen image viewer.
 *
 * Loaded on demand by the gallery rather than with the page — nobody who
 * does not open an image should pay for it. The transitions are CSS; the
 * shared-element morph this used to do came from a layout-projection engine
 * that had to measure and track all nineteen tiles from mount to provide it.
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
  const [closing, setClosing] = useState(false);

  /* Play the fade out before unmounting, which is what AnimatePresence was
     doing for us. Stable, because the gallery memoises `onClose` — so the
     effect below can depend on it without re-running its focus setup. */
  const requestClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  /* Move focus into the dialog on open and restore it on close, so keyboard
     users are not dropped back at the top of the document. */
  useEffect(() => {
    const restoreTo = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      restoreTo?.focus?.();
    };
  }, [onStep, requestClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      data-closing={closing || undefined}
      className="lightbox fixed inset-0 z-100 flex flex-col bg-surface-950/95 backdrop-blur-xl"
      onClick={requestClose}
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
          onClick={requestClose}
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
      </div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="lightbox-figure relative max-h-full">
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="92vw"
            className="max-h-[72svh] w-auto rounded-xl object-contain"
          />
        </div>
      </div>

      <div
        className="flex items-center justify-between gap-6 px-6 pb-8"
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

        <p className="max-w-xl text-center text-sm leading-relaxed text-stone-400">
          {photo.alt}
        </p>

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
      </div>
    </div>
  );
}
