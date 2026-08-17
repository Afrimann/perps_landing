import { DrawIn } from "@/components/motion/primitives";
import type { PillarIcon as IconName } from "@/content/pillars";

/* Stroked outlines only — DrawIn traces path length, so a filled shape
   would have nothing to draw.

   Every shape carries pathLength="1", which normalises its perimeter so the
   one `stroke-dasharray: 1` in globals.css draws all of them evenly. Without
   it each icon would trace at a speed set by its own real length. */
const paths: Record<IconName, React.ReactNode> = {
  compass: (
    <>
      <circle cx="12" cy="12" r="9" pathLength={1} />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" pathLength={1} />
    </>
  ),
  book: (
    <>
      <path
        d="M12 6.5C10.5 5.2 8.6 4.6 6 4.6c-.9 0-1.6.1-2 .2v13c.4-.1 1.1-.2 2-.2 2.6 0 4.5.6 6 1.9"
        pathLength={1}
      />
      <path
        d="M12 6.5c1.5-1.3 3.4-1.9 6-1.9.9 0 1.6.1 2 .2v13c-.4-.1-1.1-.2-2-.2-2.6 0-4.5.6-6 1.9z"
        pathLength={1}
      />
    </>
  ),
  heart: (
    <path
      d="M12 20s-7-4.4-7-9.2A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7 2.8C19 15.6 12 20 12 20z"
      pathLength={1}
    />
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" pathLength={1} />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" pathLength={1} />
      <path d="M16 5.5a3 3 0 0 1 0 5.8" pathLength={1} />
      <path d="M17.5 14.4a5.5 5.5 0 0 1 3 5.1" pathLength={1} />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" pathLength={1} />
      <path d="M3 12h18" pathLength={1} />
      <path
        d="M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3z"
        pathLength={1}
      />
    </>
  ),
  hands: (
    <>
      <path
        d="M3 13.5l3-2.2a2 2 0 0 1 2.4 0L12 14l3.6-2.7a2 2 0 0 1 2.4 0l3 2.2"
        pathLength={1}
      />
      <path d="M12 14v6" pathLength={1} />
      <path
        d="M9.5 7.8A2.2 2.2 0 0 1 12 5a2.2 2.2 0 0 1 2.5 2.8c-.3 1.4-2.5 2.7-2.5 2.7s-2.2-1.3-2.5-2.7z"
        pathLength={1}
      />
    </>
  ),
};

export function PillarIcon({
  name,
  className,
  delay = 0,
}: {
  name: IconName;
  className?: string;
  delay?: number;
}) {
  return (
    <DrawIn className={className} delay={delay}>
      {paths[name]}
    </DrawIn>
  );
}
