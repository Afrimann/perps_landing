/**
 * Activity reports — the evidence layer.
 *
 * ⚠️  EVERY ENTRY BELOW IS A STRUCTURAL PLACEHOLDER (`verified: false`).
 *     The dates, places, figures and quotes are invented to demonstrate the
 *     template. They must be replaced with real reports before launch.
 *     While any entry is unverified the UI shows a provisional notice —
 *     see components/sections/impact.tsx and the story page.
 *
 * Bodies are STRUCTURED, not markdown strings. The reference site renders
 * raw `## ` into its page because it stores prose as markdown and misses a
 * parse; typed blocks make that class of bug impossible.
 *
 * `image` is null throughout: no photography has been supplied. Cards fall
 * back to a generated brass/ink panel rather than borrowing stock imagery,
 * which would misrepresent the foundation's work.
 */

export type ActivityCategory =
  | "Outreach"
  | "Youth Program"
  | "Health"
  | "Governance";

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
  image: string | null;
  verified: boolean;
  body: Block[];
};

export const impactSection = {
  eyebrow: "Measurable change",
  heading: "Our Impact So Far",
  intro:
    "Every programme we run is written up: what we set out to do, what it cost, what changed, and what we learned. Dated, located, and open to scrutiny.",
} as const;

/** Pill colours for a DARK ground — used over the card's image panel. */
export const categoryTone: Record<ActivityCategory, string> = {
  Outreach: "bg-brass-500/15 text-brass-300 ring-brass-500/30",
  "Youth Program": "bg-sky-400/15 text-sky-300 ring-sky-400/30",
  Health: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/30",
  Governance: "bg-violet-400/15 text-violet-300 ring-violet-400/30",
};

/**
 * Pill colours for a LIGHT ground — the story page sets its title block on
 * ivory, where the dark-ground values above fall well below contrast.
 */
export const categoryToneLight: Record<ActivityCategory, string> = {
  Outreach: "bg-brass-200/50 text-brass-700 ring-brass-600/25",
  "Youth Program": "bg-sky-100 text-sky-800 ring-sky-700/20",
  Health: "bg-emerald-100 text-emerald-800 ring-emerald-700/20",
  Governance: "bg-violet-100 text-violet-800 ring-violet-700/20",
};

export const activities: Activity[] = [
  {
    slug: "school-outreach",
    title: "School Outreach Programme",
    category: "Outreach",
    date: "Placeholder date",
    dateISO: "2024-01-01",
    location: "Location pending",
    readingMinutes: 5,
    summary:
      "Visiting schools to mentor students, provide learning materials, and show children a wider set of futures than the one in front of them.",
    image: null,
    verified: false,
    body: [
      {
        type: "lede",
        text: "This is a structural placeholder demonstrating the activity report template. Replace with a real outreach write-up.",
      },
      { type: "heading", text: "The Need" },
      {
        type: "paragraph",
        text: "Education remains the most reliable route out of poverty, yet many schools in low-income communities lack the basics — textbooks, stationery, and adequate learning environments. Beyond materials, students need people who can show them what is possible.",
      },
      { type: "heading", text: "Our Approach" },
      {
        type: "list",
        items: [
          {
            lead: "Motivational assemblies",
            rest: "where members share their own routes into work and study",
          },
          {
            lead: "Career conversations",
            rest: "exposing students to paths in technology, medicine, law and enterprise",
          },
          {
            lead: "Learning materials",
            rest: "notebooks, pens, mathematical sets and reading books",
          },
          {
            lead: "Study-skills workshops",
            rest: "on revision technique, time management and goal setting",
          },
        ],
      },
      { type: "heading", text: "Impact and Results" },
      {
        type: "paragraph",
        text: "Figures pending confirmation from the foundation. Real reach, distribution and follow-up numbers belong here — each one traceable to this programme.",
      },
      { type: "heading", text: "Looking Ahead" },
      {
        type: "paragraph",
        text: "Where this programme goes next, and what the foundation learned that will change how it runs the next one.",
      },
    ],
  },
  {
    slug: "orphanage-visits",
    title: "Orphanage Visits",
    category: "Youth Program",
    date: "Placeholder date",
    dateISO: "2024-01-02",
    location: "Location pending",
    readingMinutes: 4,
    summary:
      "Spending time with children in residential care — games, gifts, and the sustained attention that short visits rarely provide.",
    image: null,
    verified: false,
    body: [
      {
        type: "lede",
        text: "This is a structural placeholder demonstrating the activity report template. Replace with a real visit write-up.",
      },
      { type: "heading", text: "The Need" },
      {
        type: "paragraph",
        text: "Children in residential care receive a great deal of one-off attention around holidays and very little in between. Consistency, not generosity, is the scarce resource.",
      },
      { type: "heading", text: "Looking Ahead" },
      {
        type: "paragraph",
        text: "How the foundation intends to turn visits into an ongoing relationship with each home.",
      },
    ],
  },
  {
    slug: "health-outreach",
    title: "Community Health Outreach",
    category: "Health",
    date: "Placeholder date",
    dateISO: "2024-01-03",
    location: "Location pending",
    readingMinutes: 4,
    summary:
      "Screenings, wellness education and referrals for children and elders in communities without a nearby clinic.",
    image: null,
    verified: false,
    body: [
      {
        type: "lede",
        text: "This is a structural placeholder demonstrating the activity report template. Replace with a real outreach write-up.",
      },
      { type: "heading", text: "The Need" },
      {
        type: "paragraph",
        text: "Distance to the nearest clinic decides whether a treatable condition is treated. Outreach closes that distance for a day and identifies who needs following up.",
      },
    ],
  },
  {
    slug: "annual-review",
    title: "Annual General Meeting",
    category: "Governance",
    date: "Placeholder date",
    dateISO: "2024-01-04",
    location: "Location pending",
    readingMinutes: 6,
    summary:
      "The foundation's yearly governance gathering — reviewing the year's work, its finances, and setting the priorities that follow.",
    image: null,
    verified: false,
    body: [
      {
        type: "lede",
        text: "This is a structural placeholder demonstrating the activity report template. Replace with a real meeting record.",
      },
      { type: "heading", text: "Purpose of the Meeting" },
      {
        type: "paragraph",
        text: "A structured platform for reviewing the year's achievements, assessing financial stewardship, addressing challenges and setting priorities for the year ahead.",
      },
      { type: "heading", text: "Why This Matters" },
      {
        type: "paragraph",
        text: "Published governance records are what separate an organisation that can be funded from one that cannot. This page exists to be read by people deciding whether to trust the foundation with money.",
      },
    ],
  },
];

export const activityBySlug = (slug: string) =>
  activities.find((activity) => activity.slug === slug);

export const hasUnverifiedActivities = activities.some((a) => !a.verified);
