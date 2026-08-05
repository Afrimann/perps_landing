import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollRail } from "@/components/motion/scroll-rail";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Pillars } from "@/components/sections/pillars";
import { Impact } from "@/components/sections/impact";
import { Gallery } from "@/components/sections/gallery";
import { Purpose } from "@/components/sections/purpose";
import { Governance } from "@/components/sections/governance";
import { Give } from "@/components/sections/give";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-brass-500 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <ScrollRail />
      <SiteHeader />

      <main id="main">
        <Hero />
        <About />
        <Pillars />
        <Impact />
        <Gallery />
        <Purpose />
        <Governance />
        <Give />
      </main>

      <SiteFooter />
    </>
  );
}
