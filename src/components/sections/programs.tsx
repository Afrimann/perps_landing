import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { programs } from "@/content/site";

export function Programs() {
  return (
    <section id="programs" className="bg-white py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={programs.eyebrow}
          intro={programs.intro}
          align="center"
        >
          {programs.heading}
        </SectionHeading>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2">
          {programs.items.map((item, index) => (
            <li
              key={item.title}
              className="group relative rounded-2xl border border-ink-100 bg-cream p-8 transition duration-200 ease-out-soft hover:border-brand-200 hover:shadow-[0_12px_32px_-16px_rgba(22,58,44,0.35)]"
            >
              <span className="font-mono text-sm font-semibold text-gold-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-brand-900">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-600">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
