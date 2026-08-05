"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PillarIcon } from "@/components/ui/pillar-icon";
import {
  StaggerGroup,
  StaggerItem,
  TiltCard,
} from "@/components/motion/primitives";
import { pillars, pillarsSection } from "@/content/pillars";

export function Pillars() {
  return (
    <section id="pillars" className="relative bg-ink-900 py-28 lg:py-36">
      <Container>
        <SectionHeading
          eyebrow={pillarsSection.eyebrow}
          intro={pillarsSection.intro}
          tone="dark"
        >
          {pillarsSection.heading}
        </SectionHeading>

        <StaggerGroup
          as="ul"
          className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pillars.map((pillar, index) => (
            <StaggerItem key={pillar.title} as="li" className="group">
              <TiltCard className="h-full rounded-2xl border border-white/8 bg-ink-800 p-8 transition-colors duration-500 hover:border-brass-500/40">
                <span className="grid size-12 place-items-center rounded-xl border border-brass-500/30 bg-brass-500/8 text-brass-400">
                  <PillarIcon
                    name={pillar.icon}
                    className="size-6"
                    delay={index * 0.08}
                  />
                </span>

                <h3 className="mt-7 font-display text-xl leading-snug text-white">
                  {pillar.title}
                </h3>

                <p className="mt-4 text-[0.95rem] leading-relaxed text-stone-500">
                  {pillar.body}
                </p>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
