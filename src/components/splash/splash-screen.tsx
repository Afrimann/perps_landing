"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { splash } from "@/content/site";
import { createWelcomeSound, type WelcomeSound } from "./welcome-sound";

/** Matches the `.splash` exit transition in globals.css. */
const EXIT_MS = 750;

export const SPLASH_KEY = "ynf-splash-seen";

/**
 * The welcome screen, shown once per browser session.
 *
 * The overlay markup is ALWAYS rendered, on the server too, and whether it is
 * visible is decided by the `.splash-open` class an inline script sets on
 * <html> before first paint (see layout.tsx). Rendering it conditionally from
 * client state instead would either flash the site before the splash covered
 * it, or flash the splash at someone who already dismissed it — and would be
 * a hydration mismatch besides.
 *
 * ── On the sound ──
 * Browsers suspend a new AudioContext until the visitor has interacted with
 * the page, so on a first visit the welcome tone usually CANNOT start on its
 * own. Chrome makes an exception once a domain has built up a Media
 * Engagement score, which is why this appears to work on a profile that has
 * been used for testing and not on a fresh one.
 *
 * There is deliberately no attempt to unlock audio from the first stray
 * gesture: on this screen that gesture is the click that dismisses the
 * splash, so it would start a tone and immediately tear it down. The control
 * below is the only path, and it is always present when the browser has an
 * audio engine at all.
 */
export function SplashScreen() {
  const [closing, setClosing] = useState(false);
  /** Whether a tone is currently audible — drives the button's icon and state. */
  const [playing, setPlaying] = useState(false);

  const soundRef = useRef<WelcomeSound | null>(null);
  const mutedRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dismissed = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;

    soundRef.current?.stop();
    soundRef.current = null;
    setClosing(true);
    setPlaying(false);

    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {
      /* Private modes can refuse storage. The splash then reappears on the
         next navigation, which is a far smaller problem than throwing here
         and leaving the overlay stuck on screen. */
    }

    window.setTimeout(() => {
      document.documentElement.classList.remove("splash-open");
    }, EXIT_MS);
  }, []);

  useEffect(() => {
    /* The inline gate decides whether this session gets a splash at all. If
       the class is absent the overlay is already display:none, so there is
       nothing to wire up. */
    if (!document.documentElement.classList.contains("splash-open")) return;

    /* Focus the dialog itself, NOT the enter button. Moving focus into the
       overlay is what makes it announce as a modal, but focusing a control
       trips :focus-visible in globals.css and paints a brass ring around the
       continue cue the instant the splash opens. The container carries no
       ring, and Tab still reaches the button for anyone navigating by
       keyboard — where the ring is wanted. */
    dialogRef.current?.focus();

    const sound = createWelcomeSound(splash.audio);
    soundRef.current = sound;

    /* Optimistic attempt. Succeeds for visitors the browser already trusts;
       silently declines for everyone else, who get the button instead. */
    if (sound) {
      void sound.start().then((started) => {
        if (started && !dismissed.current) setPlaying(true);
      });
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      /* Route changes must not leave a tone playing behind the site. */
      soundRef.current?.stop();
      soundRef.current = null;
    };
  }, [dismiss]);

  const toggleSound = async (event: React.MouseEvent) => {
    /* Stop the click reaching the backdrop, which would dismiss the splash
       the moment someone reached for the sound control. */
    event.stopPropagation();

    const sound = soundRef.current;
    if (!sound) return;

    if (playing) {
      mutedRef.current = true;
      sound.setMuted(true);
      setPlaying(false);
      return;
    }

    /* This handler IS the user gesture the autoplay policy was waiting for,
       so starting from here is what actually unblocks a first-time visit. */
    const started = await sound.start();
    if (!started || dismissed.current) return;

    if (mutedRef.current) {
      mutedRef.current = false;
      sound.setMuted(false);
    }
    setPlaying(true);
  };

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      className="splash grain bg-surface-950 outline-none"
      data-closing={closing || undefined}
      role="dialog"
      aria-modal="true"
      aria-label={`${splash.welcome} ${splash.name}`}
      onClick={dismiss}
    >
      {/* The photograph, flattened to a brass duotone. See `.splash-plate` in
          globals.css for why the colour is thrown away. */}
      <div aria-hidden="true" className="splash-plate">
        <Image
          src={splash.image}
          alt={splash.imageAlt}
          fill
          preload
          quality={60}
          sizes="100vw"
          className="splash-image splash-photo object-cover object-center"
        />
        <div className="splash-duotone" />
        {/* Vertical wash keeps depth at the edges; the radial one sinks the
            middle far enough to carry display type at any viewport size. */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/72 to-surface-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-surface-950)_82%)]" />
        <div className="splash-bloom" />
        <div className="splash-sweep" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
        <h1 className="max-w-5xl font-display leading-[1.02] tracking-[-0.025em] text-balance text-white">
          <span
            className="splash-rise block font-sans text-[0.66rem] font-medium tracking-[0.42em] text-stone-500 uppercase sm:text-[0.74rem]"
            style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}
          >
            {splash.welcome}
          </span>
          <span
            className="splash-rise splash-name mt-6 block text-[2.3rem] leading-[1.02] sm:text-[3.8rem] lg:text-[5.1rem]"
            style={{ "--reveal-delay": "0.55s" } as React.CSSProperties}
          >
            {splash.name}
          </span>
        </h1>

        {/* Sans, light and roomy rather than a display italic — the serif
            wordmark above is doing the expressive work, and a second
            decorative face directly under it reads as fussy. */}
        <p
          className="splash-rise mt-10 max-w-lg font-sans text-[0.98rem] leading-[1.75] font-light tracking-[0.01em] text-balance text-stone-400 sm:text-[1.1rem]"
          style={{ "--reveal-delay": "0.95s" } as React.CSSProperties}
        >
          {splash.where}
        </p>

        {/* A real button, so the splash is operable and announced for keyboard
            and screen-reader users. The whole backdrop is clickable too, which
            is what the visible cue describes. No ring, no plate — just the
            words and a mark that drifts. */}
        <button
          type="button"
          onClick={dismiss}
          className="splash-rise group mt-20 inline-flex flex-col items-center gap-5"
          style={{ "--reveal-delay": "1.35s" } as React.CSSProperties}
        >
          <span className="sr-only">{splash.enterLabel}</span>
          <span
            aria-hidden="true"
            className="splash-breathe font-sans text-[0.62rem] font-medium tracking-[0.34em] text-stone-500 uppercase transition-colors duration-500 group-hover:text-accent-300"
          >
            {splash.cue}
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-nudge size-5 text-accent-500/70 transition-colors duration-500 group-hover:text-accent-300"
          >
            <path d="M12 5v13M6 12.5l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Sound control, splash-only.

          Rendered unconditionally rather than behind a capability check.
          AudioContext (with the webkitAudioContext fallback in
          createWelcomeSound) exists in every browser that can run this app,
          so gating it would cost a state update and a second render to guard
          against a branch that cannot be reached.

          Crucially it is NOT gated on a tone already playing: the case that
          most needs this control is precisely the one where nothing is
          playing because the browser blocked it. Unrequested audio also
          needs a way to stop it (WCAG 1.4.2). It exists nowhere else on the
          site. */}
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={playing}
        className="absolute right-5 bottom-5 inline-flex items-center gap-2.5 rounded-full bg-white/5 py-2.5 pr-4 pl-3 text-stone-400 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 hover:text-accent-300 sm:right-8 sm:bottom-8"
      >
        <span className="sr-only">
          {playing ? splash.soundOnLabel : splash.soundOffLabel}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 shrink-0"
          aria-hidden="true"
        >
          <path d="M11 5 6 9H3v6h3l5 4z" />
          {playing ? (
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" />
          ) : (
            <path d="m17 9 4 6M21 9l-4 6" />
          )}
        </svg>
        {/* The invitation only makes sense while silent; once a tone is
            running the icon alone carries the state. */}
        {!playing ? (
          <span
            aria-hidden="true"
            className="font-mono text-[0.6rem] tracking-[0.18em] uppercase"
          >
            {splash.soundHint}
          </span>
        ) : null}
      </button>
    </div>
  );
}
