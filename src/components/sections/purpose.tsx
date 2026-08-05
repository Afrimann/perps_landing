import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/primitives";
import { purpose } from "@/content/site";

/** Quiet text-only breather between the two heaviest bands. */
export function Purpose() {
  return (
    <section id="purpose" className="relative overflow-hidden bg-ink-950 py-28 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass-500/40 to-transparent"
      />

      <Container>
        <SectionHeading eyebrow={purpose.eyebrow} tone="dark">
          {purpose.heading}
        </SectionHeading>

        <div className="mx-auto mt-12 max-w-2xl space-y-7 text-center">
          {purpose.body.map((paragraph, index) => (
            <Reveal key={paragraph} delay={0.06 * index}>
              <p className="text-[1.08rem] leading-[1.85] text-pretty text-stone-400">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
