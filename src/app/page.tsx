import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Programs } from "@/components/sections/programs";
import { Impact } from "@/components/sections/impact";
import { GetInvolved } from "@/components/sections/get-involved";
import { Donate } from "@/components/sections/donate";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-brand-800 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <About />
        <Programs />
        <Impact />
        <GetInvolved />
        <Donate />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}
