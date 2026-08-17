import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* AVIF first, WebP as the fallback. Order matters: the first entry that
       matches the request's Accept header wins. AVIF runs 25–35% smaller than
       WebP on these photographs. */
    formats: ["image/avif", "image/webp"],

    /**
     * Required from Next 16 — any `quality` prop must appear here or it is
     * rejected. 75 is the default for photography that is read directly;
     * 60 is for gallery thumbnails, which are never seen above ~33vw; 40 is
     * for the hero, which renders at 45% opacity beneath two gradients and
     * cannot show the artefacts.
     */
    qualities: [40, 60, 75],

    /* The photographs are static and never change under the same filename,
       so there is nothing to invalidate by expiring them sooner. */
    minimumCacheTTL: 2678400, // 31 days
  },
};

export default nextConfig;
