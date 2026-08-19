import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives";
import { about } from "@/content/site";

export function About() {
  return (
    <section id="about" className="bg-paper py-28 lg:py-36">
      <Container>
        <SectionHeading eyebrow={about.eyebrow} tone="light" align="center">
          {about.heading}
        </SectionHeading>

        <div className="mx-auto mt-14 max-w-2xl space-y-6 text-center">
          {about.body.map((paragraph, index) => (
            <Reveal key={paragraph} delay={0.05 * index}>
              <p className="text-[1.05rem] leading-relaxed text-pretty text-stone-600">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-3xl border border-accent-500/30 bg-gradient-to-br from-white to-accent-200/20 p-9 lg:p-11">
              <h3 className="font-display text-2xl text-stone-900">
                {about.mission.title}
              </h3>
              <span className="mt-5 block h-px w-16 bg-accent-500/50" />
              <p className="mt-6 text-[1.02rem] leading-relaxed text-stone-600">
                {about.mission.body}
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className="h-full rounded-3xl border border-stone-300/60 bg-white p-9 lg:p-11">
              <h3 className="font-display text-2xl text-stone-900">
                {about.aim.title}
              </h3>
              <span className="mt-5 block h-px w-16 bg-accent-500/50" />

              <StaggerGroup as="ul" className="mt-6 space-y-4">
                {about.aim.points.map((point) => (
                  <StaggerItem
                    key={point}
                    as="li"
                    className="flex gap-3.5 text-[0.98rem] leading-relaxed text-stone-600"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-500"
                    />
                    {point}
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <p className="mt-8 border-t border-stone-300/60 pt-6 text-[0.98rem] leading-relaxed text-stone-500 italic">
                {about.aim.closing}
              </p>
            </article>
          </Reveal>
        </div>

      </Container>
    </section>
  );
}
