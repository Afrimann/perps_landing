/**
 * The structured prose format used by every long-form page on the site —
 * activity reports and the founder's story.
 *
 * Bodies are STRUCTURED blocks, not markdown strings. The reference site
 * stores prose as markdown and leaks an unparsed `## ` onto its own page; a
 * discriminated union makes that class of bug impossible, because a block
 * type nobody has written a renderer for fails to compile.
 *
 * Lives in its own module so `story.ts` does not have to import from
 * `activities.ts` just to borrow a type.
 */
export type Block =
  | { type: "lede"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: { lead: string; rest: string }[] }
  | { type: "stats"; items: { figure: string; rest: string }[] }
  | { type: "quote"; text: string; attribution: string };
