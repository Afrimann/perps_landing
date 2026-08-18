"use client";

import { useEffect } from "react";

/** Matches the old motion viewport margin: in view once 40px clear of the bottom edge. */
const MARGIN = 40;

const SELECTOR = "[data-reveal],[data-reveal-line],[data-draw]";

/**
 * The whole site's entrance animation runtime.
 *
 * One pass over a shrinking set of pending elements, rather than one
 * animation instance per element. Mounted once in the root layout; the
 * elements themselves stay server components and ship no JavaScript — they
 * only carry a `data-` attribute for this to find.
 *
 * Deliberately NOT an IntersectionObserver. IO only invokes its callback
 * when an element's intersection state *changes*, so an element that moves
 * from below the fold to above it between two frames — a hash-link jump, a
 * fast flick scroll, or images above it loading and pushing it past — is
 * never-intersecting at both samples, fires nothing, and stays invisible
 * forever. Every nav link on this site is a hash jump, so that case is the
 * common one, not an edge case.
 *
 * Reveals are one-way: an element that has entered is dropped from the set
 * and keeps its final state, matching the previous `once: true` behaviour.
 */
export function RevealObserver() {
  useEffect(() => {
    /* Tells the inline gate in layout.tsx that the runtime came up, so its
       failsafe timeout leaves `.reveal-ready` in place. Set first: if
       anything below throws, the page is better off unhidden. */
    document.documentElement.setAttribute("data-reveal-active", "");

    let pending: Element[] = [];
    let frame = 0;

    const collect = () => {
      pending = [];
      for (const el of document.querySelectorAll(SELECTOR)) {
        if (!el.classList.contains("is-revealed")) pending.push(el);
      }
    };

    /* Reads every rect before writing any class, so the loop cannot thrash
       layout by interleaving measurement with style invalidation. */
    const flush = () => {
      frame = 0;
      if (!pending.length) return;

      const limit = window.innerHeight - MARGIN;
      const entered: Element[] = [];
      const rest: Element[] = [];

      for (const el of pending) {
        // `top < limit` is true both for elements now in view and for any
        // already scrolled past, which is what makes a skip impossible.
        (el.getBoundingClientRect().top < limit ? entered : rest).push(el);
      }

      for (const el of entered) el.classList.add("is-revealed");
      pending = rest;

      if (!pending.length) detach();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const detach = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("load", schedule, true);
    };

    const attach = () => {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      /* Capture phase, because `load` on an <img> does not bubble. A lazy
         image finishing can push later content into view without any scroll
         happening, and if the reader has stopped scrolling nothing else
         would re-run the check. */
      document.addEventListener("load", schedule, true);
    };

    collect();
    attach();
    flush();

    /* The gallery pages in more tiles as you go, and route changes swap the
       tree wholesale. Re-collect so nodes that appear later are not left in
       their hidden start state. */
    const mutations = new MutationObserver(() => {
      collect();
      attach();
      schedule();
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      detach();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
