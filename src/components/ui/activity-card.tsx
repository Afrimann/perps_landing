import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { categoryTone, type Activity } from "@/content/activities";

/**
 * The activity's cover photograph. Wrapped in ViewTransition so it morphs
 * into the story page's header image on navigation rather than the pages
 * swapping.
 *
 * Fills its parent absolutely, so the CALLER must supply a positioned box
 * with a resolved height (an aspect ratio or an explicit height). Do not
 * pass positioning via `className`: `absolute` and `relative` both set
 * `position`, Tailwind emits `relative` last, and the winner would collapse
 * the fill image to zero height.
 */
export function ActivityVisual({
  activity,
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw",
  preload = false,
}: {
  activity: Activity;
  className?: string;
  sizes?: string;
  preload?: boolean;
}) {
  return (
    <ViewTransition name={`activity-${activity.slug}`}>
      <div className={`absolute inset-0 overflow-hidden bg-ink-800 ${className}`}>
        <Image
          src={activity.cover.src}
          alt={activity.cover.alt}
          fill
          sizes={sizes}
          quality={60}
          preload={preload}
          className="object-cover"
        />
      </div>
    </ViewTransition>
  );
}

function Meta({ activity }: { activity: Activity }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-stone-500">
      <span className="inline-flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="size-3.5"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
        <time dateTime={activity.dateISO}>{activity.date}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="size-3.5"
          aria-hidden="true"
        >
          <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        {activity.location}
      </span>
    </div>
  );
}

export function ActivityCard({
  activity,
  tone = "dark",
  preload = false,
}: {
  activity: Activity;
  tone?: "dark" | "light";
  preload?: boolean;
}) {
  const shell =
    tone === "dark"
      ? "border-white/8 bg-ink-800 hover:border-brass-500/40"
      : "border-stone-300/70 bg-white hover:border-brass-500/50";
  const title = tone === "dark" ? "text-white" : "text-stone-900";
  const body = tone === "dark" ? "text-stone-500" : "text-stone-600";

  return (
    <Link
      href={`/activities/${activity.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${shell}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <ActivityVisual
          activity={activity}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          preload={preload}
        />
        {/* Scrim so the pill stays legible over any photograph. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-950/70 to-transparent"
        />
        <span
          className={`absolute top-4 left-4 rounded-full px-3 py-1 font-mono text-[0.62rem] font-medium tracking-[0.12em] uppercase ring-1 ring-inset backdrop-blur-sm ${categoryTone[activity.category]}`}
        >
          {activity.category}
        </span>
      </div>

      <div className="flex grow flex-col p-7">
        <h3
          className={`font-display text-xl leading-snug transition-colors group-hover:text-brass-400 ${title}`}
        >
          {activity.title}
        </h3>

        <p className={`mt-3 grow text-[0.93rem] leading-relaxed ${body}`}>
          {activity.summary}
        </p>

        <div className="mt-6 space-y-4">
          <Meta activity={activity} />
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.14em] text-brass-500 uppercase transition-all duration-300 group-hover:gap-3">
            {activity.readingMinutes} min read
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
