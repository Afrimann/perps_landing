import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { bankDetails, contact, donate } from "@/content/site";

const rows = [
  { label: "Account name", value: bankDetails.accountName },
  { label: "Bank", value: bankDetails.bank },
  { label: "Account number", value: bankDetails.accountNumber, mono: true },
];

export function Donate() {
  return (
    <section id="donate" className="bg-white py-24 lg:py-28">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow={donate.eyebrow} intro={donate.body}>
              {donate.heading}
            </SectionHeading>
            <p className="mt-6 leading-relaxed text-ink-600">
              {donate.followUp}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <a
                href={contact.phoneHref}
                className="font-semibold text-brand-700 transition hover:text-brand-800"
              >
                {contact.phone}
              </a>
              <a
                href={contact.emailHref}
                className="font-semibold text-brand-700 transition [overflow-wrap:anywhere] hover:text-brand-800"
              >
                {contact.email}
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-brand-100 bg-brand-50 p-8 lg:p-10">
            <h3 className="text-xs font-semibold tracking-[0.18em] text-brand-600 uppercase">
              Bank transfer
            </h3>
            <dl className="mt-7 divide-y divide-brand-100">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 first:pt-0 last:pb-0"
                >
                  <dt className="text-sm text-ink-500">{row.label}</dt>
                  <dd
                    className={`text-right font-semibold text-brand-900 ${
                      row.mono ? "font-mono text-lg tracking-[0.12em]" : ""
                    }`}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
