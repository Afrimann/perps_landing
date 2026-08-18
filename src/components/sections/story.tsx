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
      className="relative overflow-hidden bg-paper-dim py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow={story.eyebrow} tone="light" align="left">
              {story.heading}
            </SectionHeading>

            <div className="mt-9 space-y-6">
              {story.teaser.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.06 * index}>
                  <p className="text-[1.05rem] leading-[1.85] text-pretty text-stone-600">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <figure className="mt-10 border-l-2 border-accent-500 pl-6">
                <blockquote className="font-display text-xl leading-relaxed text-stone-900 italic">
                  &ldquo;Not because they were stubborn. Not because they did not
                  want an education. But because their parents simply could not
                  afford to send them to school.&rdquo;
                </blockquote>
              </figure>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-11">
                <ButtonLink href={story.cta.href} variant="ghost">
                  {story.cta.label}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Milestone rail — a single gold line with years hung off it. */}
          <Reveal delay={0.15}>
            <div className="relative">
              {/* Capped height, no border: the photo reads as part of the
                  paper ground rather than a framed panel, and its lower edge
                  dissolves into the section rather than ending at a hard
                  line.

                  Width is capped at the source file's own resolution
                  (485px) rather than stretched to fill the column. The
                  source is a compressed forward, not a camera original —
                  rendering it any wider forces the browser to upscale past
                  its real pixels, which is what reads as blur. Capping the
                  box is the only fix code can make; more detail than the
                  file has is not recoverable. */}
              <Image
                src={photos.pageant.src}
                alt={photos.pageant.alt}
                width={photos.pageant.width}
                height={photos.pageant.height}
                sizes="(min-width: 460px) 420px, 92vw"
                quality={75}
                className="fade-bottom h-auto max-h-[420px] w-full max-w-[420px] rounded-t-3xl object-cover object-top"
              />

              <StaggerGroup
                as="ul"
                className="relative mt-10 space-y-8 border-l border-stone-300 pl-8"
              >
                {story.milestones.map((milestone) => (
                  <StaggerItem key={milestone.year} as="li" className="relative">
                    {/* The ring punches the rail line out behind each dot, so
                        it must match this section's ground exactly. */}
                    <span
                      aria-hidden="true"
                      className="absolute top-2 -left-[2.28rem] size-2.5 rounded-full bg-accent-500 ring-4 ring-paper-dim"
                    />
                    <p className="font-mono text-[0.72rem] tracking-[0.22em] text-accent-600 tabular">
                      {milestone.year}
                    </p>
                    <h3 className="mt-2 font-display text-lg text-stone-900">
                      {milestone.title}
                    </h3>
                    <p className="mt-1.5 text-[0.93rem] leading-relaxed text-stone-600">
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
