import type { Metadata } from "next";
import { Bodoni_Moda, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/content/site";
import { RevealObserver } from "@/components/motion/reveal-observer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Not preloaded, unlike the other two. The mono is used only for small
 * uppercase labels and figures — never for anything that decides first paint
 * — so its three weights were 30 KB of `<link rel=preload>` competing with
 * the hero image for bandwidth. `display: swap` covers the gap.
 */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

/**
 * Marks the document as able to run the entrance animations, before the
 * first paint rather than after hydration.
 *
 * globals.css scopes every hidden start state to `.reveal-ready`. Setting it
 * here means: with scripting, sections start hidden and the observer reveals
 * them; without scripting, the class is never added, the hidden state never
 * matches, and the page renders in full. The failure mode of getting this
 * wrong is a blank site, so it is deliberately not dependent on React.
 */
const REVEAL_GATE = `document.documentElement.classList.add("reveal-ready")`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      /* REVEAL_GATE below adds `reveal-ready` to this element while the HTML
         is still parsing, so the class is present before React hydrates and
         React reports the extra class as a mismatch. The divergence is
         deliberate and one-way — scoped to this element's own attributes,
         which is exactly what this prop suppresses. */
      suppressHydrationWarning
      className={`${jakarta.variable} ${bodoni.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: REVEAL_GATE }} />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
