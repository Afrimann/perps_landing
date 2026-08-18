import { Reveal } from "@/components/motion/primitives";
import type { Block } from "@/content/blocks";

/**
 * Renders typed content blocks on an paper ground.
 *
 * The reference site stores prose as markdown strings and leaks an unparsed
 * `## ` onto the page; a discriminated union makes that impossible — an
 * unhandled block type fails to compile rather than rendering as raw text.
 *
 * Shared by the activity story pages and the founder's story page so the two
 * cannot drift into different typographic scales.
 */
export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "lede":
      return (
        <p className="text-lg leading-[1.8] text-pretty text-stone-700">
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2 className="mt-14 font-display text-[1.75rem] leading-snug text-stone-900">
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p className="mt-5 leading-[1.85] text-pretty text-stone-600">
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul className="mt-6 space-y-4">
          {block.items.map((item) => (
            <li key={item.lead} className="flex gap-4 leading-relaxed">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-500"
              />
              <span className="text-stone-600">
                <strong className="font-semibold text-stone-900">
                  {item.lead}
                </strong>{" "}
                {item.rest}
              </span>
            </li>
          ))}
        </ul>
      );

    case "stats":
      return (
        <ul className="mt-6 space-y-4">
          {block.items.map((item) => (
            <li key={item.figure} className="flex gap-4 leading-relaxed">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-500"
              />
              <span className="text-stone-600">
                <strong className="font-mono font-semibold text-stone-900 tabular">
                  {item.figure}
                </strong>{" "}
                {item.rest}
              </span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <figure className="mt-10 border-l-2 border-accent-500 pl-6">
          <blockquote className="font-display text-xl leading-relaxed text-stone-800 italic">
            &ldquo;{block.text}&rdquo;
          </blockquote>
          <figcaption className="mt-3 text-sm text-stone-500">
            — {block.attribution}
          </figcaption>
        </figure>
      );
  }
}

/** The whole sequence, each block revealing just behind the one above it. */
export function ProseBlocks({
  blocks,
  className = "",
}: {
  blocks: readonly Block[];
  className?: string;
}) {
  return (
    <div className={className}>
      {blocks.map((block, index) => (
        <Reveal key={index} delay={0.02 * index}>
          <BlockView block={block} />
        </Reveal>
      ))}
    </div>
  );
}
