import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollRail } from "@/components/motion/scroll-rail";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives";
import { ActivityCard } from "@/components/ui/activity-card";
import { activities, hasUnverifiedActivities } from "@/content/activities";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "Reports from the foundation's programmes — what we set out to do, what changed, and what we learned.",
};

export default function ActivitiesPage() {
  return (
    <>
      <ScrollRail />
      <SiteHeader />

      <main id="main">
        <section className="bg-ink-950 pt-24 pb-20 lg:pt-32 lg:pb-24">
          <Container>
            <SectionHeading
              eyebrow="Our work, documented"
              intro="Each programme is written up in full: the need, the approach, the results, and what we would do differently. Dated, located, and open to scrutiny."
              tone="dark"
              align="left"
            >
              All Activities
            </SectionHeading>
          </Container>
        </section>

        <section className="bg-ivory-dim py-20 lg:py-24">
          <Container>
            <StaggerGroup
              as="ul"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {activities.map((activity) => (
                <StaggerItem key={activity.slug} as="li">
                  <ActivityCard activity={activity} tone="light" />
                </StaggerItem>
              ))}
            </StaggerGroup>

            {hasUnverifiedActivities ? (
              <p className="mx-auto mt-14 max-w-md text-center text-xs leading-relaxed text-stone-500">
                These reports are structural placeholders. Dates, locations,
                figures and photographs are pending confirmation from the
                foundation.
              </p>
            ) : null}
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
