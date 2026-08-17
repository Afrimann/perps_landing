/**
 * The founder's story.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  VERIFIED — supplied by the foundation in the founder's own words and
 *  edited only for register, not for substance. The facts below (the return
 *  home after secondary school, the 2013 pageant, its themes, the town's
 *  reaction) are the foundation's own account.
 *
 *  Nothing here invents a date, a figure or a quote. Where the original
 *  account gives a year, the year is used; no month or day is asserted,
 *  because none was supplied.
 * ─────────────────────────────────────────────────────────────────────────
 */
import type { Block } from "./blocks";

/** The full account — rendered on /story. */
export const storyBlocks: Block[] = [
  {
    type: "lede",
    text: "Some of the most durable ideas begin in the least likely places. This one began with a teenager walking home through her own neighbourhood and noticing who was missing from school.",
  },
  {
    type: "paragraph",
    text: "Before the name Naj was known to anyone as the founder of the Yonwuren Naj Foundation, she was simply a young girl who had just finished her secondary school education and returned home to the same ghetto that raised her.",
  },
  {
    type: "paragraph",
    text: "What she saw when she got there broke her heart. Everywhere around her were little girls walking the streets during school hours. Not because they were stubborn. Not because they did not want an education. But because their parents simply could not afford to send them to school.",
  },
  {
    type: "paragraph",
    text: "Some wore old uniforms already faded with time. Some had no books. Some had lost their confidence. And some had already accepted that the classroom was no longer part of their future.",
  },
  {
    type: "quote",
    text: "To many people it would have been another ordinary sight in the ghetto. To her it felt like a wound.",
    attribution: "The founding of the Yonwuren Naj Foundation",
  },
  {
    type: "heading",
    text: "A compassion that did not begin that day",
  },
  {
    type: "paragraph",
    text: "Naj is known for putting other people before herself. The desire to lift young girls up runs naturally in her — and it never left her, even in the years when she had very little of her own to give.",
  },
  {
    type: "heading",
    text: "2013: a pageant, and what it was really for",
  },
  {
    type: "paragraph",
    text: "In 2013, with almost nothing to her name, she decided to do something bold for the young girls around her. Something that would restore their confidence. Something that would give them hope again. She organised a beauty pageant for the young women of the ghetto.",
  },
  {
    type: "paragraph",
    text: "Not for fame. Not for applause. It was there to remind girls who had been made to feel small — or forgotten entirely — that they mattered.",
  },
  {
    type: "paragraph",
    text: "And it was never really a pageant. Every part of it was built around three ideas:",
  },
  {
    type: "list",
    items: [
      {
        lead: "Education matters for a girl child",
        rest: "— and a girl who is in school changes what is possible for everyone around her.",
      },
      {
        lead: "A ghetto child can make a difference in the world",
        rest: "— where you are from sets your starting point, not your ceiling.",
      },
      {
        lead: "Girls from the ghetto are intelligent too",
        rest: "— and given a stage, they will prove it in front of anyone.",
      },
    ],
  },
  {
    type: "heading",
    text: "What the town saw",
  },
  {
    type: "paragraph",
    text: "The town was taken aback. Girls it had quietly written off were answering quiz questions perfectly, and saying out loud — without flinching — exactly what they intended to become.",
  },
  {
    type: "paragraph",
    text: "It became the talk of the town, because it was graceful. And it settled the question that had started the whole thing: these girls had never lacked ability. They had lacked a door.",
  },
  {
    type: "heading",
    text: "From one pageant to a foundation",
  },
  {
    type: "paragraph",
    text: "Everything the foundation does now grows out of that first evening. The scholarships, the school competitions, the food that reaches widows and single mothers, the time spent with the elders of the community — all of it rests on the same conviction that a young woman formed walking home through her own neighbourhood: that ability is spread evenly across every community, and opportunity is not.",
  },
];

export const story = {
  eyebrow: "Our story",
  heading: "It began with the girls who were not in school",

  /** Condensed version — the home page section. */
  teaser: [
    "Before the name Naj was known to anyone as the founder of this foundation, she was a young girl who had just finished secondary school and come home to the same ghetto that raised her.",
    "What she found there did not leave her. Girls her own age and younger were on the streets during school hours — not because they were stubborn, and not because they did not want to learn, but because their families could not afford to send them.",
  ],

  /**
   * Pull-out beats for the home page. Years only — the founder's account
   * gives years, and asserting a month or a day would be an invention.
   */
  milestones: [
    {
      year: "2013",
      title: "The first pageant",
      body: "A pageant for the young women of the ghetto, built around girl-child education — organised at a point when the founder had almost nothing of her own.",
    },
    {
      year: "2023",
      title: "Cash gifts to street hawkers",
      body: "Direct cash support placed into the hands of young people hawking on the roadside, at the point of need.",
    },
    {
      year: "2024",
      title: "Feeding 1,000 widows",
      body: "Operation Feeding brought a thousand widows together to be fed and provisioned in one gathering.",
    },
    {
      year: "2025",
      title: "3,000 widows and single mothers",
      body: "Foodstuffs shared with three thousand widows and single mothers across a number of different communities.",
    },
  ],

  cta: {
    label: "Read the full story",
    href: "/story",
  },
} as const;

/**
 * The founder. `photo` is intentionally null — no portrait has been supplied
 * that is confirmed to be of the founder, and captioning an unidentified
 * face as the founder would be a fabrication. Supply one and the profile
 * renders it.
 */
export const founder = {
  name: "Naj Yonwuren",
  role: "Founder & Chief Executive",
  photo: null as { src: string; alt: string; width: number; height: number } | null,
  bio: "Founder of the Yonwuren Naj Foundation. She began this work as a teenager, with a pageant for girls in her own neighbourhood who had been shut out of school, and has built it since into a foundation working across education, relief and elder care in Delta State.",
} as const;
