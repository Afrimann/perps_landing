import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getInvolved } from "@/content/site";

export function GetInvolved() {
  return (
    <section id="get-involved" className="py-24 lg:py-28">
      <Container>
        <SectionHeading eyebrow={getInvolved.eyebrow} align="center">
          {getInvolved.heading}
        </SectionHeading>

        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {getInvolved.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col rounded-2xl border border-ink-100 bg-white p-8"
            >
              <h3 className="font-display text-xl font-semibold text-brand-900">
                {item.title}
              </h3>
              <p className="mt-3 grow leading-relaxed text-ink-600">
                {item.body}
              </p>
              <Link
                href={item.cta.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition hover:gap-2.5 hover:text-brand-800"
              >
                {item.cta.label}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
