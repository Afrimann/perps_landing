import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives";
import { about, registration } from "@/content/site";

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

        {/* Registration badge. Renders only once a real CAC number exists —
            an unverifiable credential is worse than none. */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            {registration.cacNumber ? (
              <p className="inline-flex items-center gap-3 rounded-full border border-accent-500/40 bg-accent-200/25 px-6 py-3 text-sm text-stone-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-4 text-accent-600"
                  aria-hidden="true"
                >
                  <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" />
                  <path d="M9.5 12l1.8 1.8L15 10" />
                </svg>
                Registered with the Corporate Affairs Commission —{" "}
                <span className="font-mono font-semibold text-stone-900">
                  CAC: {registration.cacNumber}
                </span>
              </p>
            ) : (
              <p className="inline-flex items-center gap-3 rounded-full border border-dashed border-stone-300 px-6 py-3 text-sm text-stone-500">
                Registration details to be published once confirmed
              </p>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
