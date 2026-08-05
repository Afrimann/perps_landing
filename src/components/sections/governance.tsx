import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives";
import { governance, registration } from "@/content/site";

/**
 * The section a funder actually scrutinises — deliberately the calmest on
 * the page. No tilt, no sheen, no counters. Precision reads as trustworthy;
 * theatrics here would read as compensation.
 *
 * "Pending" states are shown honestly rather than hidden, which is what a
 * diligence reviewer expects to see from an organisation still building out
 * its documentation.
 */
const records = [
  {
    title: "CAC Registration",
    value: registration.cacNumber
      ? `CAC: ${registration.cacNumber}`
      : "Pending publication",
    ready: Boolean(registration.cacNumber),
  },
  { title: "Board of Trustees", value: "Coming soon", ready: false },
  { title: "Annual Reports", value: "Coming soon", ready: false },
];

export function Governance() {
  return (
    <section id="governance" className="bg-ivory py-28 lg:py-36">
      <Container>
        <SectionHeading
          eyebrow={governance.eyebrow}
          intro={governance.body}
          tone="light"
        >
          {governance.heading}
        </SectionHeading>

        <StaggerGroup as="ul" className="mt-16 grid gap-5 sm:grid-cols-3">
          {records.map((record) => (
            <StaggerItem key={record.title} as="li">
              <div className="flex h-full flex-col items-center rounded-2xl border border-stone-300/70 bg-white px-7 py-10 text-center">
                <span
                  className={`grid size-11 place-items-center rounded-xl ${
                    record.ready
                      ? "bg-brass-200/40 text-brass-600"
                      : "bg-stone-100 text-stone-400"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                    aria-hidden="true"
                  >
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                    <path d="M14 3v5h5M9 13h6M9 17h4" />
                  </svg>
                </span>

                <h3 className="mt-6 font-display text-lg text-stone-900">
                  {record.title}
                </h3>
                <p
                  className={`mt-2 text-sm ${
                    record.ready
                      ? "font-mono text-stone-700"
                      : "text-stone-400 italic"
                  }`}
                >
                  {record.value}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
