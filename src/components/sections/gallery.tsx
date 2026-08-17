"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  galleryPhotos,
  galleryStrands,
  gallerySection,
  type Photo,
  type StrandFilter,
} from "@/content/photos";

/**
 * The viewer is only fetched once someone opens an image. Most visitors
 * never do, and it is the only part of the page that needs a dialog.
 */
const Lightbox = dynamic(
  () => import("./gallery-lightbox").then((m) => m.Lightbox),
  { ssr: false }
);

/** Tiles rendered before the "show more" control appears. */
const PAGE = 9;

function Tile({
  photo,
  index,
  onOpen,
}: {
  photo: Photo;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      data-reveal=""
      style={{ "--reveal-delay": `${(index % 3) * 0.08}s` } as React.CSSProperties}
      className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/8 bg-ink-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-400"
      aria-label={`Open image: ${photo.alt}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        quality={60}
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
    </button>
  );
}

export function Gallery() {
  const [strand, setStrand] = useState<StrandFilter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const [shown, setShown] = useState(PAGE);

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
  const visible = items.slice(0, shown);

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
                /* A narrower filter would otherwise leave the page count
                   past the end of the shorter list. */
                setShown(PAGE);
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

        {/* Only the first page is in the document. Rendering all nineteen
            queued well over a megabyte of thumbnails for a section most
            visitors scroll straight past. */}
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {visible.map((photo, index) => (
            <Tile key={photo.src} photo={photo} index={index} onOpen={setOpen} />
          ))}
        </div>

        {shown < items.length ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((current) => current + PAGE)}
              className="rounded-full border border-brass-500/60 px-7 py-3.5 font-mono text-[0.72rem] font-semibold tracking-[0.16em] text-brass-300 uppercase transition-colors duration-300 hover:border-brass-400 hover:text-brass-200"
            >
              Show more ({items.length - shown})
            </button>
          </div>
        ) : null}
      </Container>

      {open !== null && items[open] ? (
        <Lightbox items={items} index={open} onClose={close} onStep={step} />
      ) : null}
    </section>
  );
}
