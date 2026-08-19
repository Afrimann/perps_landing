import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives";
import { bankDetails, governance } from "@/content/site";
import { activities } from "@/content/activities";

/**
 * The section a funder actually scrutinises — deliberately the calmest on
 * the page. No tilt, no sheen, no counters. Precision reads as trustworthy;
 * theatrics here would read as compensation.
 *
 * Every card states something a reader can check for themselves on this very
 * page. Nothing here asserts a credential — no registration number, no
 * registered status — because none has been confirmed, and a governance
 * panel is the single worst place on a site to overstate one.
 */
const records = [
  {
    title: "Published Activity Reports",
    value: `${activities.length} programmes documented`,
  },
  {
    title: "Every Report Dated",
    value: "Year and location on each",
  },
  {
    title: "One Named Account",
    value: `${bankDetails.bank}, published in full`,
  },
];

export function Governance() {
  return (
    <section id="governance" className="bg-paper-dim py-28 lg:py-36">
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
                <span className="grid size-11 place-items-center rounded-xl bg-accent-200/40 text-accent-600">
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
                <p className="mt-2 font-mono text-sm text-stone-700">
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
