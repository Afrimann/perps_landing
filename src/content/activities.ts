/**
 * Activity reports — the evidence layer.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  STATUS OF EACH REPORT
 *
 *  `verified: true`  — details confirmed against material the foundation
 *                      supplied (e.g. its own event flyer). Photographs
 *                      throughout are genuine images of the foundation's
 *                      work.
 *
 *  `verified: false` — the photographs and description are real, but the
 *                      DATE and LOCATION are not yet confirmed. These
 *                      surfaces render an honest "date pending" state
 *                      rather than a plausible-looking invention.
 *
 *  No report states a turnout, a beneficiary count or an outcome figure
 *  that the foundation has not confirmed. Where such a figure belongs, the
 *  text says it is pending instead of guessing.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Bodies are STRUCTURED blocks, not markdown strings. The reference site
 * renders an unparsed `## ` onto its own page; a discriminated union makes
 * that class of bug impossible.
 */
import { photos, type Photo } from "./photos";

export type ActivityCategory =
  | "Schools & Youth"
  | "Community Relief"
  | "Elderly Support";

export type Block =
  | { type: "lede"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: { lead: string; rest: string }[] }
  | { type: "stats"; items: { figure: string; rest: string }[] }
  | { type: "quote"; text: string; attribution: string };

export type Activity = {
  slug: string;
  title: string;
  category: ActivityCategory;
  date: string;
  dateISO: string;
  location: string;
  readingMinutes: number;
  summary: string;
  cover: Photo;
  images: Photo[];
  /** False when the date/location still need confirming. */
  verified: boolean;
  body: Block[];
};

export const impactSection = {
  eyebrow: "Measurable change",
  heading: "Our Impact So Far",
  intro:
    "Every programme is written up: what we set out to do, who it reached, and what we learned. Dated, located, and open to scrutiny.",
} as const;

/** Pill colours for a DARK ground — used over a card's image. */
export const categoryTone: Record<ActivityCategory, string> = {
  "Schools & Youth": "bg-sky-400/20 text-sky-200 ring-sky-300/40",
  "Community Relief": "bg-brass-500/20 text-brass-200 ring-brass-400/40",
  "Elderly Support": "bg-emerald-400/20 text-emerald-200 ring-emerald-300/40",
};

/** Pill colours for a LIGHT ground — the story page title block on ivory. */
export const categoryToneLight: Record<ActivityCategory, string> = {
  "Schools & Youth": "bg-sky-100 text-sky-800 ring-sky-700/20",
  "Community Relief": "bg-brass-200/50 text-brass-700 ring-brass-600/25",
  "Elderly Support": "bg-emerald-100 text-emerald-800 ring-emerald-700/20",
};

export const activities: Activity[] = [
  {
    slug: "six-secondary-schools-competition",
    title: "6 Secondary Schools Competition",
    category: "Schools & Youth",
    /* VERIFIED — from the foundation's own event flyer. */
    date: "9 November 2024",
    dateISO: "2024-11-09",
    location: "Yonwuren College Ugbuwangue, Warri, Delta State",
    readingMinutes: 4,
    summary:
      "Six secondary schools brought together for a day of football, quiz, dance and pageantry — with ₦550,000 in prizes, awards and school items.",
    cover: photos.footballTeam,
    images: [photos.footballTeam, photos.schoolsFlyer, photos.teamPitch],
    verified: true,
    body: [
      {
        type: "lede",
        text: "On Saturday 9 November 2024, Yonwuren Naj Foundation brought six secondary schools together at Yonwuren College Ugbuwangue in Warri, Delta State, for a full day of competition across sport, academics and the arts.",
      },
      { type: "heading", text: "Why a Competition" },
      {
        type: "paragraph",
        text: "Prize money and a crowd do something a classroom cannot. A competition gives students a reason to prepare, a stage to be recognised on, and a memory of being taken seriously — and it reaches whole schools at once rather than one child at a time.",
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
      { type: "heading", text: "Results and Turnout" },
      {
        type: "paragraph",
        text: "Final standings, participant numbers and the schools represented are being compiled with the foundation and will be published here.",
      },
    ],
  },
  {
    slug: "community-relief-outreach",
    title: "Community Relief Outreach",
    category: "Community Relief",
    date: "Date pending confirmation",
    dateISO: "2024-01-01",
    location: "Delta State",
    readingMinutes: 3,
    summary:
      "Food and essential provisions portioned, packed and distributed directly to families in market and street communities.",
    cover: photos.marketHandover,
    images: [
      photos.foodPrep,
      photos.marketHandover,
      photos.truckBagsA,
      photos.truckRice,
      photos.streetCelebration,
      photos.hallBriefing,
    ],
    verified: false,
    body: [
      {
        type: "lede",
        text: "The foundation's relief work reaches families where they already are — in markets, on residential streets, and in community halls — with provisions portioned and counted in advance.",
      },
      { type: "heading", text: "How It Works" },
      {
        type: "list",
        items: [
          {
            lead: "Portioning first",
            rest: "rice, pasta, tomato mix and seasoning are divided into individual family packs before anyone travels",
          },
          {
            lead: "Distribution on site",
            rest: "packs are taken by vehicle directly into the communities receiving them",
          },
          {
            lead: "Named recipients",
            rest: "provisions are handed over in person rather than left with an intermediary",
          },
        ],
      },
      { type: "heading", text: "Reach" },
      {
        type: "paragraph",
        text: "The number of households reached and the dates of each outreach are being confirmed with the foundation and will be published here.",
      },
    ],
  },
  {
    slug: "elderly-citizens-outreach",
    title: "Elderly Citizens Outreach",
    category: "Elderly Support",
    date: "Date pending confirmation",
    dateISO: "2024-01-02",
    location: "Delta State",
    readingMinutes: 3,
    summary:
      "Provisions, company and time with the elders of the community — delivered seated, in person, and without a queue at a gate.",
    cover: photos.hallGroup,
    images: [
      photos.hallGroup,
      photos.eldersReceiving,
      photos.eldersAddress,
      photos.eldersGathered,
    ],
    verified: false,
    body: [
      {
        type: "lede",
        text: "Elderly members of the community are among the least reached by relief work and the least able to queue for it. The foundation's elder outreaches are run seated, unhurried, and with time set aside for conversation.",
      },
      { type: "heading", text: "What Happens" },
      {
        type: "paragraph",
        text: "Elders gather in a community hall, are addressed directly about what is being provided, and receive their provisions in their seats. The format is deliberate: it removes the scramble, and it treats people as guests rather than as a crowd to be managed.",
      },
      { type: "heading", text: "Reach" },
      {
        type: "paragraph",
        text: "The number of elders supported and the dates of each gathering are being confirmed with the foundation and will be published here.",
      },
    ],
  },
];

export const activityBySlug = (slug: string) =>
  activities.find((activity) => activity.slug === slug);

export const hasUnverifiedActivities = activities.some((a) => !a.verified);
