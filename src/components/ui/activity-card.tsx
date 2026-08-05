import Link from "next/link";
import { ViewTransition } from "react";
import { categoryTone, type Activity } from "@/content/activities";

/**
 * Visual panel for an activity. No photography has been supplied, so this
 * renders a generated brass/ink field keyed to the slug rather than stock
 * imagery — borrowed photos would misrepresent the foundation's work.
 *
 * Wrapped in ViewTransition so the panel morphs into the story page header
 * on navigation instead of the pages simply swapping.
 */
export function ActivityVisual({
  activity,
  className = "",
}: {
  activity: Activity;
  className?: string;
}) {
  const seed = activity.slug.length * 37;

  return (
    <ViewTransition name={`activity-${activity.slug}`}>
      <div
        className={`relative overflow-hidden bg-ink-900 ${className}`}
        style={{
          backgroundImage: `radial-gradient(120% 90% at ${20 + (seed % 50)}% 0%, rgba(201,150,47,0.32) 0%, transparent 60%), radial-gradient(90% 80% at ${70 - (seed % 40)}% 100%, rgba(27,36,32,0.95) 0%, transparent 65%)`,
        }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, #E8C46A 0 1px, transparent 1px 14px)",
          }}
        />
        {activity.image ? null : (
          <span className="absolute right-3 bottom-3 rounded-full bg-ink-950/60 px-2.5 py-1 font-mono text-[0.6rem] tracking-wider text-stone-500 uppercase">
            Photo pending
          </span>
        )}
      </div>
    </ViewTransition>
  );
}

function Meta({ activity, tone }: { activity: Activity; tone: Tone }) {
  const color = tone === "dark" ? "text-stone-500" : "text-stone-500";
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs ${color}`}>
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

type Tone = "dark" | "light";

export function ActivityCard({
  activity,
  tone = "dark",
}: {
  activity: Activity;
  tone?: Tone;
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
      <div className="relative">
        <ActivityVisual activity={activity} className="aspect-[16/10] w-full" />
        <span
          className={`absolute top-4 left-4 rounded-full px-3 py-1 font-mono text-[0.62rem] font-medium tracking-[0.12em] uppercase ring-1 ring-inset ${categoryTone[activity.category]}`}
        >
          {activity.category}
        </span>
      </div>

      <div className="flex grow flex-col p-7">
        <h3
          className={`font-display text-xl leading-snug transition-colors group-hover:text-brass-300 ${title}`}
        >
          {activity.title}
        </h3>

        <p className={`mt-3 grow text-[0.93rem] leading-relaxed ${body}`}>
          {activity.summary}
        </p>

        <div className="mt-6 space-y-4">
          <Meta activity={activity} tone={tone} />
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.14em] text-brass-400 uppercase transition-all duration-300 group-hover:gap-3">
            {activity.readingMinutes} min read
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
