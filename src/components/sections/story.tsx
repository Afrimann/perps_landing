import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives";
import { photos } from "@/content/photos";
import { story } from "@/content/story";

/**
 * The origin narrative, condensed. Sits directly after About because the
 * abstract claim ("a fair start") lands better once the reader knows the
 * specific thing that prompted it — a teenager walking home past girls who
 * were not in school.
 *
 * The milestone rail is year-only by design: the foundation's account gives
 * years, and a fabricated month would buy nothing but false precision.
 */
export function Story() {
  return (
    <section
      id="story"
      className="grain relative overflow-hidden bg-ink-950 py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass-500/40 to-transparent"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow={story.eyebrow} tone="dark" align="left">
              {story.heading}
            </SectionHeading>

            <div className="mt-9 space-y-6">
              {story.teaser.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.06 * index}>
                  <p className="text-[1.05rem] leading-[1.85] text-pretty text-stone-400">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <figure className="mt-10 border-l-2 border-brass-500 pl-6">
                <blockquote className="font-display text-xl leading-relaxed text-stone-200 italic">
                  &ldquo;Not because they were stubborn. Not because they did not
                  want an education. But because their parents simply could not
                  afford to send them to school.&rdquo;
                </blockquote>
              </figure>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-11">
                <ButtonLink href={story.cta.href} variant="outline">
                  {story.cta.label}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Milestone rail — a single brass line with years hung off it. */}
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/8">
                <Image
                  src={photos.footballTeam.src}
                  alt={photos.footballTeam.alt}
                  width={photos.footballTeam.width}
                  height={photos.footballTeam.height}
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="h-auto w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent"
                />
              </div>

              <StaggerGroup
                as="ul"
                className="relative mt-10 space-y-8 border-l border-white/10 pl-8"
              >
                {story.milestones.map((milestone) => (
                  <StaggerItem key={milestone.year} as="li" className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute top-2 -left-[2.28rem] size-2.5 rounded-full bg-brass-500 ring-4 ring-ink-950"
                    />
                    <p className="font-mono text-[0.72rem] tracking-[0.22em] text-brass-500 tabular">
                      {milestone.year}
                    </p>
                    <h3 className="mt-2 font-display text-lg text-white">
                      {milestone.title}
                    </h3>
                    <p className="mt-1.5 text-[0.93rem] leading-relaxed text-stone-500">
                      {milestone.body}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
