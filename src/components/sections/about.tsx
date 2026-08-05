import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/content/site";

export function About() {
  return (
    <section id="about" className="py-24 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow={about.eyebrow}>
              {about.heading}
            </SectionHeading>

            <div className="mt-7 space-y-5">
              {about.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-relaxed text-pretty text-ink-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <ul className="space-y-5">
            {about.pillars.map((pillar) => (
              <li
                key={pillar.title}
                className="rounded-2xl border border-ink-100 bg-white p-7 shadow-[0_1px_2px_rgba(33,30,27,0.04)]"
              >
                <h3 className="font-display text-xl font-semibold text-brand-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-600">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
