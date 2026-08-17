import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollRail } from "@/components/motion/scroll-rail";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ProseBlocks } from "@/components/ui/prose-blocks";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives";
import { photos } from "@/content/photos";
import { founder, story, storyBlocks } from "@/content/story";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How the Yonwuren Naj Foundation began — with a teenager who came home from secondary school and noticed which girls were missing from the classroom.",
};

export default function StoryPage() {
  return (
    <>
      <ScrollRail />
      <SiteHeader />

      <main id="main">
        {/* Title over a real photograph, held well back so the type leads. */}
        <section className="grain relative flex min-h-[62svh] items-end overflow-hidden bg-ink-950 pt-24 pb-16 lg:min-h-[70svh]">
          <div aria-hidden="true" className="absolute inset-0">
            <Image
              src={photos.streetCelebration.src}
              alt=""
              fill
              preload
              quality={40}
              sizes="100vw"
              className="object-cover object-[center_35%] opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/50" />
          </div>

          <Container className="relative">
            <Reveal>
              <p className="font-mono text-[0.7rem] font-medium tracking-[0.28em] text-brass-500 uppercase">
                {story.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-3xl font-display text-[2.4rem] leading-[1.06] tracking-tight text-balance text-white sm:text-[3.4rem] lg:text-[4rem]">
                {story.heading}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <span className="mt-8 block h-px w-28 bg-gradient-to-r from-brass-500 to-transparent" />
            </Reveal>
          </Container>
        </section>

        <article className="bg-ivory py-20 lg:py-28">
          <Container>
            <div className="mx-auto max-w-[68ch]">
              <ProseBlocks blocks={storyBlocks} />

              {/* Founder profile. The portrait renders only if one has been
                  supplied — captioning an unidentified face as the founder
                  would be a fabrication. */}
              <aside className="mt-16 rounded-3xl border border-brass-500/30 bg-gradient-to-br from-white to-brass-200/20 p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-6">
                  {founder.photo ? (
                    <Image
                      src={founder.photo.src}
                      alt={founder.photo.alt}
                      width={founder.photo.width}
                      height={founder.photo.height}
                      sizes="96px"
                      className="size-24 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid size-24 shrink-0 place-items-center rounded-full border border-brass-500/40 font-display text-xl text-brass-600"
                    >
                      NY
                    </span>
                  )}
                  <div>
                    <p className="font-display text-2xl text-stone-900">
                      {founder.name}
                    </p>
                    <p className="mt-1 font-mono text-[0.68rem] tracking-[0.2em] text-brass-600 uppercase">
                      {founder.role}
                    </p>
                  </div>
                </div>
                <p className="mt-7 leading-[1.85] text-stone-600">
                  {founder.bio}
                </p>
              </aside>

              {/* Milestone rail, repeated here as the closing summary. */}
              <section className="mt-16">
                <h2 className="font-display text-[1.75rem] text-stone-900">
                  The years since
                </h2>
                <span className="mt-5 block h-px w-24 bg-gradient-to-r from-brass-500 to-transparent" />

                <StaggerGroup
                  as="ul"
                  className="mt-10 space-y-8 border-l border-stone-300 pl-8"
                >
                  {story.milestones.map((milestone) => (
                    <StaggerItem
                      key={milestone.year}
                      as="li"
                      className="relative"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute top-2 -left-[2.28rem] size-2.5 rounded-full bg-brass-500 ring-4 ring-ivory"
                      />
                      <p className="font-mono text-[0.72rem] tracking-[0.22em] text-brass-600 tabular">
                        {milestone.year}
                      </p>
                      <h3 className="mt-2 font-display text-lg text-stone-900">
                        {milestone.title}
                      </h3>
                      <p className="mt-1.5 leading-relaxed text-stone-600">
                        {milestone.body}
                      </p>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </section>

              <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-stone-300/70 pt-8">
                <Link
                  href="/activities"
                  className="text-sm text-stone-600 transition-colors hover:text-stone-900"
                >
                  See what the foundation does now →
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

        <section className="bg-ivory-dim py-20 lg:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-[1.9rem] leading-snug text-balance text-stone-900 sm:text-[2.3rem]">
                The girls in that story are why the programmes exist.
              </h2>
              <p className="mx-auto mt-6 max-w-lg leading-relaxed text-stone-600">
                If you need support — school fees, learning materials,
                mentorship, or relief for your household — the foundation
                receives applications through one form.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <ButtonLink href="/apply" variant="brass">
                  Apply for a programme
                </ButtonLink>
                <ButtonLink href="/#give" variant="ghost-dark">
                  Support the work
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
