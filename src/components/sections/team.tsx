import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/primitives";
import { founder } from "@/content/story";
import { teamPhoto, teamPhotoCaption, teamSection } from "@/content/team";

/**
 * The founder's is the only individual photograph the foundation has
 * confirmed, so she is the only one with a profile card — the rest of the
 * team is named in the caption under the group photo below rather than
 * given matching cards with no picture to put in them.
 */
export function Team() {
  return (
    <section id="team" className="bg-paper py-28 lg:py-36">
      <Container>
        <SectionHeading
          eyebrow={teamSection.eyebrow}
          intro={teamSection.intro}
          tone="light"
        >
          {teamSection.heading}
        </SectionHeading>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-8 rounded-3xl border border-accent-500/30 bg-gradient-to-br from-white to-accent-200/20 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
            {founder.photo ? (
              <Image
                src={founder.photo.src}
                alt={founder.photo.alt}
                width={founder.photo.width}
                height={founder.photo.height}
                sizes="(min-width: 640px) 240px, 60vw"
                quality={75}
                className="h-56 w-56 shrink-0 rounded-2xl object-cover object-top sm:h-64 sm:w-64"
              />
            ) : (
              <span
                aria-hidden="true"
                className="grid h-56 w-56 shrink-0 place-items-center rounded-2xl border border-accent-500/40 font-display text-2xl text-accent-600 sm:h-64 sm:w-64"
              >
                NY
              </span>
            )}
            <div>
              <h3 className="font-display text-2xl text-stone-900">
                {founder.name}
              </h3>
              <p className="mt-1.5 font-mono text-[0.68rem] tracking-[0.2em] text-accent-600 uppercase">
                {founder.role}
              </p>
              <p className="mt-6 leading-[1.85] text-stone-600">
                {founder.bio}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <figure className="mx-auto mt-14 max-w-md">
            <div className="max-h-[440px] overflow-hidden rounded-3xl border border-stone-300/70 bg-white">
              <Image
                src={teamPhoto.src}
                alt={teamPhoto.alt}
                width={teamPhoto.width}
                height={teamPhoto.height}
                sizes="(min-width: 1024px) 28rem, 80vw"
                quality={75}
                className="h-auto max-h-[440px] w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm leading-relaxed text-stone-500">
              {teamPhotoCaption}
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
