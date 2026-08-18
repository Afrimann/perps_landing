import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/content/site";
import { SplashScreen } from "@/components/splash/splash-screen";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The display face. Fraunces rather than a Didone: this sits over
 * photographs of widows, market traders and schoolchildren, and a high-
 * fashion serif reads as a perfume advertisement above them.
 *
 * `opsz` is the reason to pick a variable font here. Fraunces reshapes
 * itself across optical sizes — tighter spacing and sturdier joins for small
 * text, more open and expressive for display — so one family covers a 0.9rem
 * card title and a 5rem hero line without either looking stretched.
 *
 * `SOFT` softens the terminals a little; `WONK` is left at 0, since its
 * swapped-in quirky glyphs are charming in isolation and distracting across
 * a page of headings.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
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

/**
 * Tints the mobile browser chrome to match the header. Every page on the site
 * opens on an emerald band, so without this the address bar renders white
 * against it and reads as a seam above the design.
 */
export const viewport: Viewport = {
  themeColor: "#06251b",
};

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
 * Decides — before the first paint — whether this session gets the welcome
 * splash. globals.css hides `.splash` unless this class is present, so the
 * overlay can live in the server HTML on every request without a returning
 * visitor ever seeing it flash.
 *
 * Wrapped in try/catch: sessionStorage throws outright in some privacy modes
 * and inside sandboxed iframes, and an uncaught exception here would leave
 * the class unset and the splash silently skipped.
 */
const SPLASH_GATE = `try{if(!sessionStorage.getItem("ynf-splash-seen"))
document.documentElement.classList.add("splash-open")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      /* SPLASH_GATE below adds `splash-open` to this element while the HTML is
         still parsing, so the class is present before React hydrates and React
         reports the extra class as a mismatch. The divergence is deliberate
         and one-way — scoped to this element's own attributes, which is
         exactly what this prop suppresses. */
      suppressHydrationWarning
      className={`${jakarta.variable} ${fraunces.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: SPLASH_GATE }} />
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
