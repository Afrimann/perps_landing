import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      {/* Ambient colour wash. Decorative only — replaced by a real photograph
          once the foundation supplies imagery. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 0%, #1d5940 0%, transparent 55%), radial-gradient(90% 80% at 95% 100%, #83411b 0%, transparent 60%)",
        }}
      />

      <Container className="relative py-24 lg:py-32">
        <div className="max-w-3xl">
          <p className="mb-6 text-xs font-semibold tracking-[0.18em] text-gold-300 uppercase">
            {hero.eyebrow}
          </p>

          <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            {hero.heading}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-brand-100 sm:text-xl">
            {hero.subheading}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href={hero.primaryCta.href} variant="secondary">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="ghost"
              className="border-brand-300/50 text-white hover:border-gold-300 hover:bg-white/10"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
