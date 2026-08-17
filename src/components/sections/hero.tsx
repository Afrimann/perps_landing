import Image from "next/image";
import { photos } from "@/content/photos";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { MaskedLines } from "@/components/motion/primitives";
import { hero } from "@/content/site";

/**
 * A server component. The parallax, the drifting washes and the entrance are
 * all CSS — there is no reason for the first thing a visitor sees to wait on
 * a hydration pass before it can move.
 */
export function Hero() {
  return (
    <section className="grain relative flex min-h-[92svh] items-center overflow-hidden bg-ink-950">
      {/* Real photograph behind the headline, held well back so the type
          stays the subject.

          preload: it is the LCP element (`priority` is deprecated as of
          Next 16). quality 40: it renders at 45% opacity beneath two
          gradients, where compression artefacts are not perceivable — at the
          default 75 this single image was 114 KB. */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={photos.streetCelebration.src}
          alt=""
          fill
          preload
          quality={40}
          sizes="100vw"
          className="scale-105 object-cover object-[center_35%] opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/70" />
      </div>

      {/* Two slow brass washes, counter-drifting. Decorative.

          These carried `blur-3xl` before. A 64px Gaussian blur across an
          80vh x 80vw box, re-rasterised every frame of an infinite scale
          animation, was the single most expensive thing on the page — and
          near-invisible, since a radial gradient fading to transparent is
          already soft-edged. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="animate-drift absolute -top-1/3 -left-1/4 h-[80vh] w-[80vw] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(126,90,25,0.55) 0%, transparent 65%)",
          }}
        />
        <div
          className="animate-drift absolute -right-1/4 -bottom-1/3 h-[70vh] w-[70vw] rounded-full opacity-40"
          style={{
            animationDelay: "-11s",
            background:
              "radial-gradient(circle, rgba(27,36,32,0.9) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="hero-parallax relative w-full">
        <Container className="py-28 lg:py-36">
          <p
            className="animate-fade-rise mb-8 font-mono text-[0.7rem] font-medium tracking-[0.28em] text-brass-500 uppercase"
            style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
          >
            {hero.eyebrow}
          </p>

          <h1 className="font-display text-[2.6rem] leading-[1.04] tracking-[-0.02em] text-white sm:text-[4rem] lg:text-[5.2rem]">
            <MaskedLines
              immediate
              lines={[
                hero.headingLead,
                <span key="accent" className="text-gradient-brass">
                  {hero.headingAccent}
                </span>,
              ]}
              delay={0.25}
            />
          </h1>

          <p
            className="animate-fade-rise mt-9 max-w-xl text-[1.05rem] leading-relaxed text-pretty text-stone-400 sm:text-lg"
            style={{ "--reveal-delay": "0.65s" } as React.CSSProperties}
          >
            {hero.subheading}
          </p>

          <div
            className="animate-fade-rise mt-11 flex flex-wrap items-center gap-4"
            style={{ "--reveal-delay": "0.8s" } as React.CSSProperties}
          >
            <ButtonLink href={hero.primaryCta.href} variant="brass">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </Container>
      </div>

      {/* Scroll cue. Three nested elements because three transforms are in
          play — the centring offset, the entrance, and the nudge — and a
          single element can only carry one `transform` at a time. */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div
          className="animate-fade-rise"
          style={{ "--reveal-delay": "1.4s" } as React.CSSProperties}
        >
          <span className="animate-nudge block text-brass-500/70">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              className="size-6"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
