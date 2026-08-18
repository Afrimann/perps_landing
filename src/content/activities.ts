/**
 * Activity reports — the evidence layer.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  STATUS OF EACH REPORT
 *
 *  Every report below carries a YEAR supplied by the foundation. Dates are
 *  deliberately year-only: the foundation gave years, and inventing a month
 *  or a day to make a date look precise would be a fabrication.
 *
 *  `dateISO` is the year alone (e.g. "2025"), which is a valid value for a
 *  <time datetime> attribute and does not assert a day the foundation has
 *  not confirmed.
 *
 *  Headline figures (3,000 widows and single mothers; 1,000 widows) are the
 *  foundation's own, as supplied. No report states a turnout, a beneficiary
 *  count or an outcome figure that did not come from the foundation.
 *
 *  ⚠️  PHOTOGRAPH ASSIGNMENT — the images are genuine foundation photographs,
 *      but WHICH programme each belongs to was inferred from its content, not
 *      confirmed. If a photo is attached to the wrong year, correct the
 *      `cover`/`images` references here; nothing else needs to change.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Bodies are STRUCTURED blocks, not markdown strings. The reference site
 * renders an unparsed `## ` onto its own page; a discriminated union makes
 * that class of bug impossible.
 */
import { photos, type Photo } from "./photos";
import type { Block } from "./blocks";

export type { Block };

export type ActivityCategory =
  | "Schools & Youth"
  | "Community Relief"
  | "Widows & Single Mothers";

export type Activity = {
  slug: string;
  title: string;
  category: ActivityCategory;
  /** Year only — see the note at the top of this file. */
  date: string;
  dateISO: string;
  location: string;
  readingMinutes: number;
  summary: string;
  cover: Photo;
  images: Photo[];
  body: Block[];
};

export const impactSection = {
  eyebrow: "Measurable change",
  heading: "Our Impact So Far",
  intro:
    "Every programme is written up: what we set out to do, who it reached, and what we learned. Dated, located, and open to scrutiny.",
} as const;

/**
 * Category pills need three hues that stay apart from each other AND from
 * the emerald ground. Emerald is no longer available to them — it is the
 * brand surface, so an emerald pill on a card reads as a hole rather than a
 * label. Rose takes that slot: warm, clearly distinct from both sky and
 * gold, and legible on either ground.
 */

/** Pill colours for a DARK ground — used over a card's image. */
export const categoryTone: Record<ActivityCategory, string> = {
  "Schools & Youth": "bg-sky-400/20 text-sky-200 ring-sky-300/40",
  "Community Relief": "bg-accent-500/20 text-accent-200 ring-accent-400/40",
  "Widows & Single Mothers":
    "bg-rose-400/20 text-rose-200 ring-rose-300/40",
};

/** Pill colours for a LIGHT ground — the story page title block on paper. */
export const categoryToneLight: Record<ActivityCategory, string> = {
  "Schools & Youth": "bg-sky-100 text-sky-800 ring-sky-700/20",
  "Community Relief": "bg-accent-200/50 text-accent-700 ring-accent-600/25",
  "Widows & Single Mothers":
    "bg-rose-100 text-rose-800 ring-rose-700/20",
};

export const activities: Activity[] = [
  {
    slug: "foodstuffs-3000-widows-single-mothers",
    title: "Foodstuffs for 3,000 Widows and Single Mothers",
    category: "Widows & Single Mothers",
    date: "2025",
    dateISO: "2025",
    location: "Communities across Delta State",
    readingMinutes: 3,
    summary:
      "The foundation's largest distribution to date — foodstuffs shared with three thousand widows and single mothers across a number of different communities.",
    cover: photos.foodPrep,
    images: [
      photos.foodPrep,
      photos.truckRice,
      photos.truckBagsA,
      photos.truckBagsB,
      photos.indoorDistribution,
    ],
    body: [
      {
        type: "lede",
        text: "In 2025 the foundation shared foodstuffs with 3,000 widows and single mothers across a number of different communities — the largest single undertaking in its history.",
      },
      { type: "heading", text: "Why Widows and Single Mothers" },
      {
        type: "paragraph",
        text: "A household run by one woman absorbs every shock alone. When food prices move, there is no second income to move with them — and the first thing that gives way is usually a child's schooling. Reaching the mother is the most direct way to keep the child in the classroom.",
      },
      { type: "heading", text: "How It Was Done" },
      {
        type: "list",
        items: [
          {
            lead: "Portioning first",
            rest: "rice, pasta, tomato mix and seasoning are divided into individual family packs before anyone travels",
          },
          {
            lead: "Taken to the communities",
            rest: "packs are moved by vehicle directly into the neighbourhoods receiving them, rather than asking people to travel to a central point",
          },
          {
            lead: "Handed over in person",
            rest: "provisions go directly to the named recipient, never left with an intermediary to pass on",
          },
        ],
      },
      { type: "heading", text: "Scale" },
      {
        type: "stats",
        items: [
          { figure: "3,000", rest: "widows and single mothers reached" },
          { figure: "2025", rest: "delivered across the year" },
        ],
      },
      {
        type: "paragraph",
        text: "Distribution on this scale is only possible because the packing happens before the travelling. Counting at the point of handover would turn an orderly outreach into a crowd.",
      },
    ],
  },
  {
    slug: "operation-feeding-1000-widows",
    title: "Operation Feeding: 1,000 Widows",
    category: "Widows & Single Mothers",
    date: "2024",
    dateISO: "2024",
    location: "Delta State",
    readingMinutes: 3,
    summary:
      "One thousand widows brought together in a single gathering to be fed, provisioned and — for an afternoon — treated as guests rather than as a queue.",
    cover: photos.hallGroup,
    images: [
      photos.hallGroup,
      photos.eldersReceiving,
      photos.eldersAddress,
      photos.eldersGathered,
      photos.hallBriefing,
      photos.hallAddress,
    ],
    body: [
      {
        type: "lede",
        text: "In 2024 the foundation ran Operation Feeding, bringing 1,000 widows together to be fed and provisioned in one gathering.",
      },
      { type: "heading", text: "Seated, Not Queuing" },
      {
        type: "paragraph",
        text: "The format is deliberate. Widows gather in a community hall, are addressed directly about what is being provided, and receive their provisions in their seats. It removes the scramble at the gate, and it treats a thousand women as guests rather than as a crowd to be managed.",
      },
      {
        type: "paragraph",
        text: "Many of those who come are elderly, and are among the least able to stand in a queue for an hour — which is exactly why they are so often missed by relief work that is organised around one.",
      },
      { type: "heading", text: "Scale" },
      {
        type: "stats",
        items: [
          { figure: "1,000", rest: "widows fed and provisioned" },
          { figure: "2024", rest: "Operation Feeding" },
        ],
      },
      { type: "heading", text: "What It Is Really For" },
      {
        type: "paragraph",
        text: "A meal and a bag of provisions solve one week. Being addressed by name, seated, and sent home with something solves rather less — but it is the part people describe afterwards. The foundation runs these gatherings because company is a form of provision too.",
      },
    ],
  },
  {
    slug: "six-secondary-schools-competition",
    title: "6 Secondary Schools Competition",
    category: "Schools & Youth",
    /* VERIFIED — from the foundation's own event flyer. */
    date: "2024",
    dateISO: "2024",
    location: "Yonwuren College Ugbuwangue, Warri, Delta State",
    readingMinutes: 4,
    summary:
      "Six secondary schools brought together for a day of football, quiz, dance and pageantry — with ₦550,000 in prizes, awards and school items.",
    cover: photos.footballTeam,
    images: [photos.footballTeam, photos.schoolsFlyer, photos.teamPitch],
    body: [
      {
        type: "lede",
        text: "In 2024, Yonwuren Naj Foundation brought six secondary schools together at Yonwuren College Ugbuwangue in Warri, Delta State, for a full day of competition across sport, academics and the arts.",
      },
      { type: "heading", text: "Why a Competition" },
      {
        type: "paragraph",
        text: "Prize money and a crowd do something a classroom cannot. A competition gives students a reason to prepare, a stage to be recognised on, and a memory of being taken seriously — and it reaches whole schools at once rather than one child at a time.",
      },
      {
        type: "paragraph",
        text: "It is also the oldest idea the foundation has. The first thing its founder ever organised, back in 2013, was a pageant built around the same conviction: put young people on a stage and a town will revise its opinion of them in an evening.",
      },
      { type: "heading", text: "The Categories" },
      {
        type: "stats",
        items: [
          { figure: "₦250,000", rest: "Football competition" },
          { figure: "₦150,000", rest: "Quiz competition" },
          { figure: "₦100,000", rest: "Beauty pageant" },
          { figure: "₦50,000", rest: "Dance competition" },
        ],
      },
      {
        type: "paragraph",
        text: "Alongside the prize categories, the day carried awards and a distribution of gifts and school items to participating students.",
      },
    ],
  },
  {
    slug: "cash-gifts-street-hawkers",
    title: "Cash Gifts to Street Hawkers",
    category: "Community Relief",
    date: "2023",
    dateISO: "2023",
    location: "Delta State",
    readingMinutes: 2,
    summary:
      "Cash placed directly into the hands of young people hawking on the roadside — no forms, no ceremony, at the exact point of need.",
    cover: photos.marketRedTee,
    images: [
      photos.marketRedTee,
      photos.marketHandover,
      photos.streetCelebration,
    ],
    body: [
      {
        type: "lede",
        text: "In 2023 the foundation went out to the roadsides and markets and gave cash gifts directly to the young people hawking there.",
      },
      { type: "heading", text: "Why Cash, and Why There" },
      {
        type: "paragraph",
        text: "A child balancing a tray on their head during school hours is the same sight that started this foundation. They are working because a household needs the money today, and no amount of encouragement changes that arithmetic.",
      },
      {
        type: "paragraph",
        text: "Cash respects what people already know about their own situation. A bag of provisions is a decision made on someone's behalf; money is not. And giving it where they stand means no one has to abandon a day's earnings to travel and collect it.",
      },
      { type: "heading", text: "The Point" },
      {
        type: "paragraph",
        text: "This outreach was never presented as a solution. It buys a day, sometimes a week. What it does reliably is put the foundation in front of the exact young people its education work exists for — and several conversations that began at a car window have carried on since.",
      },
    ],
  },
];

export const activityBySlug = (slug: string) =>
  activities.find((activity) => activity.slug === slug);
