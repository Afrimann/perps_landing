import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollRail } from "@/components/motion/scroll-rail";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/primitives";
import { ApplicationForm } from "@/components/apply/application-form";
import { ContactChannels } from "@/components/sections/contact";
import { applyPage } from "@/content/apply";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply for a Yonwuren Naj Foundation programme — education support, scholarships, mentorship, skills training, relief and elder care.",
};

const steps = [
  {
    title: "You apply",
    body: "Fill in the form below. It takes a few minutes, and there is no cost to apply.",
  },
  {
    title: "We review",
    body: "Applications are read in the order they arrive. Where a programme needs supporting documents, we ask for them at this stage.",
  },
  {
    title: "We contact you",
    body: "We reach you on the phone number or email you gave us — so please use ones that work.",
  },
];

export default function ApplyPage() {
  return (
    <>
      <ScrollRail />
      <SiteHeader />

      <main id="main">
        <section className="bg-ink-950 pt-24 pb-20 lg:pt-32 lg:pb-24">
          <Container>
            <SectionHeading
              eyebrow={applyPage.eyebrow}
              intro={applyPage.intro}
              tone="dark"
              align="left"
            >
              {applyPage.heading}
            </SectionHeading>

            <ol className="mt-16 grid gap-5 sm:grid-cols-3">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={0.08 * index} as="li">
                  <div className="h-full rounded-2xl border border-white/10 bg-ink-900/60 p-7">
                    <span className="font-mono text-[0.68rem] tracking-[0.22em] text-brass-500 tabular">
                      0{index + 1}
                    </span>
                    <h2 className="mt-4 font-display text-lg text-white">
                      {step.title}
                    </h2>
                    <p className="mt-2.5 text-[0.9rem] leading-relaxed text-stone-500">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>

        <section className="bg-ivory py-20 lg:py-24">
          <Container>
            <div className="mx-auto max-w-3xl">
              <ApplicationForm />
            </div>
          </Container>
        </section>

        <section className="bg-ivory-dim py-20 lg:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-[1.8rem] leading-snug text-balance text-stone-900 sm:text-[2.2rem]">
                {applyPage.enquiriesHeading}
              </h2>
              <span className="mx-auto mt-7 block h-px w-24 bg-gradient-to-r from-transparent via-brass-500 to-transparent" />
              <p className="mx-auto mt-7 leading-relaxed text-pretty text-stone-600">
                {applyPage.enquiriesBody}
              </p>
            </div>

            <div className="mx-auto mt-14 max-w-3xl">
              <ContactChannels tone="light" includeForm={false} />
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
