import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollRail } from "@/components/motion/scroll-rail";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/primitives";
import { ActivityCard, ActivityVisual } from "@/components/ui/activity-card";
import {
  activities,
  activityBySlug,
  categoryToneLight,
  type Block,
} from "@/content/activities";

export function generateStaticParams() {
  return activities.map((activity) => ({ slug: activity.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/activities/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const activity = activityBySlug(slug);
  if (!activity) return {};

  return {
    title: activity.title,
    description: activity.summary,
    openGraph: { title: activity.title, description: activity.summary },
  };
}

/**
 * Renders typed content blocks. The reference site stores prose as markdown
 * and leaks an unparsed `## ` onto the page; a discriminated union makes
 * that impossible — an unhandled block would fail to compile.
 */
function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "lede":
      return (
        <p className="text-lg leading-[1.8] text-pretty text-stone-700">
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2 className="mt-14 font-display text-[1.75rem] leading-snug text-stone-900">
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p className="mt-5 leading-[1.85] text-pretty text-stone-600">
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul className="mt-6 space-y-4">
          {block.items.map((item) => (
            <li key={item.lead} className="flex gap-4 leading-relaxed">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brass-500"
              />
              <span className="text-stone-600">
                <strong className="font-semibold text-stone-900">
                  {item.lead}
                </strong>{" "}
                {item.rest}
              </span>
            </li>
          ))}
        </ul>
      );

    case "stats":
      return (
        <ul className="mt-6 space-y-4">
          {block.items.map((item) => (
            <li key={item.figure} className="flex gap-4 leading-relaxed">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brass-500"
              />
              <span className="text-stone-600">
                <strong className="font-mono font-semibold text-stone-900 tabular">
                  {item.figure}
                </strong>{" "}
                {item.rest}
              </span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <figure className="mt-10 border-l-2 border-brass-500 pl-6">
          <blockquote className="font-display text-xl leading-relaxed text-stone-800 italic">
            &ldquo;{block.text}&rdquo;
          </blockquote>
          <figcaption className="mt-3 text-sm text-stone-500">
            — {block.attribution}
          </figcaption>
        </figure>
      );
  }
}

export default async function ActivityPage({
  params,
}: PageProps<"/activities/[slug]">) {
  const { slug } = await params;
  const activity = activityBySlug(slug);
  if (!activity) notFound();

  const related = activities
    .filter((item) => item.slug !== activity.slug)
    .slice(0, 3);

  return (
    <>
      <ScrollRail />
      <SiteHeader />

      <main id="main">
        {/* Header image morphs from the card that was clicked. */}
        <div className="relative h-[46vh] min-h-[300px] lg:h-[58vh]">
          <ActivityVisual activity={activity} sizes="100vw" priority />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ivory to-transparent"
          />
        </div>

        <article className="bg-ivory pb-24">
          <Container>
            <div className="mx-auto max-w-[68ch]">
              <ViewTransition name={`activity-title-${activity.slug}`}>
                <div className="relative -mt-24">
                  <span
                    className={`inline-block rounded-full px-3 py-1 font-mono text-[0.62rem] font-medium tracking-[0.12em] uppercase ring-1 ring-inset ${categoryToneLight[activity.category]}`}
                  >
                    {activity.category}
                  </span>

                  <h1 className="mt-5 font-display text-[2.2rem] leading-[1.1] tracking-tight text-balance text-stone-900 sm:text-[3rem]">
                    {activity.title}
                  </h1>
                </div>
              </ViewTransition>

              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-stone-500">
                <time dateTime={activity.dateISO}>{activity.date}</time>
                <span>{activity.location}</span>
                <span>{activity.readingMinutes} min read</span>
              </div>

              <span className="mt-8 block h-px w-24 bg-gradient-to-r from-brass-500 to-transparent" />

              {!activity.verified ? (
                <p className="mt-10 rounded-xl border border-dashed border-stone-300 bg-white/60 px-5 py-4 text-sm leading-relaxed text-stone-500">
                  The photographs and description on this page are the
                  foundation&rsquo;s own. The exact date, location and number of
                  people reached are still being confirmed and will be
                  published here once they are.
                </p>
              ) : null}

              <div className="mt-10">
                {activity.body.map((block, index) => (
                  <Reveal key={index} delay={0.02 * index}>
                    <BlockView block={block} />
                  </Reveal>
                ))}
              </div>

              {activity.images.length > 1 ? (
                <section className="mt-16">
                  <h2 className="font-display text-[1.5rem] text-stone-900">
                    From the day
                  </h2>
                  <span className="mt-4 block h-px w-20 bg-gradient-to-r from-brass-500 to-transparent" />
                  <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {activity.images.map((photo) => (
                      <li
                        key={photo.src}
                        className="overflow-hidden rounded-xl border border-stone-300/60 bg-white"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          width={photo.width}
                          height={photo.height}
                          sizes="(min-width: 640px) 34vw, 90vw"
                          className="h-auto w-full object-cover"
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-stone-300/70 pt-8">
                <Link
                  href="/activities"
                  className="group inline-flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-stone-900"
                >
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                  Back to all activities
                </Link>
                <Link
                  href="/#give"
                  className="font-mono text-[0.7rem] tracking-[0.14em] text-brass-600 uppercase transition-colors hover:text-brass-500"
                >
                  Support this work
                </Link>
              </div>
            </div>
          </Container>
        </article>

        {related.length > 0 ? (
          <section className="bg-ivory-dim py-20 lg:py-24">
            <Container>
              <h2 className="font-display text-[1.75rem] text-stone-900">
                Related activities
              </h2>
              <span className="mt-5 block h-px w-24 bg-gradient-to-r from-brass-500 to-transparent" />

              <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <ActivityCard activity={item} tone="light" />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </>
  );
}
