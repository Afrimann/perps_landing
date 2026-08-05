import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { impact } from "@/content/site";

export function Impact() {
  return (
    <section id="impact" className="bg-brand-900 py-24 lg:py-28">
      <Container>
        <SectionHeading eyebrow={impact.eyebrow} align="center" tone="light">
          {impact.heading}
        </SectionHeading>

        <dl className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {impact.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-5xl leading-none font-semibold text-gold-300">
                  {stat.value}
                </span>
                <span className="mt-4 block text-sm leading-relaxed text-brand-200">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Visible reminder that these are placeholders. Delete this line
            together with the real figures — see `impact` in content/site.ts. */}
        <p className="mt-14 text-center text-xs tracking-wide text-brand-400 italic">
          {impact.note}
        </p>
      </Container>
    </section>
  );
}
