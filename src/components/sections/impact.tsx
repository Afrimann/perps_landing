"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/primitives";
import { ActivityCard } from "@/components/ui/activity-card";
import {
  activities,
  hasUnverifiedActivities,
  impactSection,
} from "@/content/activities";

export function Impact() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const step = card ? card.clientWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section id="impact" className="bg-ivory-dim py-28 lg:py-36">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={impactSection.eyebrow}
            intro={impactSection.intro}
            tone="light"
            align="left"
          >
            {impactSection.heading}
          </SectionHeading>

          <Reveal delay={0.2}>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={atStart}
                aria-label="Previous activity"
                className="grid size-12 place-items-center rounded-full border border-stone-300 text-stone-700 transition-all duration-300 hover:border-brass-500 hover:text-brass-600 disabled:pointer-events-none disabled:opacity-30"
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
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={atEnd}
                aria-label="Next activity"
                className="grid size-12 place-items-center rounded-full border border-stone-300 text-stone-700 transition-all duration-300 hover:border-brass-500 hover:text-brass-600 disabled:pointer-events-none disabled:opacity-30"
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
          </Reveal>
        </div>

        <ul
          ref={trackRef}
          className="mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {activities.map((activity) => (
            <li
              key={activity.slug}
              className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[31.5%]"
            >
              <ActivityCard activity={activity} tone="light" />
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-center gap-6">
          <ButtonLink href="/activities" variant="brass">
            View all activities
          </ButtonLink>

          {/* Visible while any report is still a placeholder. Delete the
              notice by verifying the entries in content/activities.ts. */}
          {hasUnverifiedActivities ? (
            <p className="max-w-lg text-center text-xs leading-relaxed text-stone-500">
              Photographs and programme descriptions are the foundation&rsquo;s
              own. Where a report is marked date pending, its exact date,
              location and reach are still being confirmed.
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
