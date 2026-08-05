/**
 * Organisation-level content and copy.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  CONTENT STATUS
 *
 *  VERIFIED — supplied by the foundation. Do not change without asking.
 *  DRAFT    — written by us. Every claim is invented and must be confirmed
 *             before launch. Search this file for `DRAFT` to find it all.
 *
 *  Nothing here may state a number, a date, a place or a credential that
 *  the foundation has not confirmed. Placeholders are visibly provisional
 *  on purpose — an unverified statistic on a fundraising page is worse
 *  than an obvious gap.
 * ─────────────────────────────────────────────────────────────────────────
 */

/* VERIFIED */
export const site = {
  name: "Yonwuren Naj Foundation",
  shortName: "YNF",
  /* DRAFT */
  tagline: "Empowering Children. Strengthening Communities.",
  /* DRAFT */
  description:
    "A Nigerian foundation working across education, health and community welfare — so that a child's circumstances never decide the limit of their future.",
  url: "https://yonwurennajfoundation.org",
} as const;

/* VERIFIED — supplied directly by the foundation */
export const contact = {
  phone: "0902 656 4700",
  phoneHref: "tel:+2349026564700",
  email: "yonwurennajfoundation@gmail.com",
  emailHref: "mailto:yonwurennajfoundation@gmail.com",
} as const;

/* VERIFIED — supplied directly by the foundation */
export const bankDetails = {
  accountName: "Princess Naj Yonwuren Foundation",
  accountNumber: "5610169951",
  bank: "Fidelity Bank",
} as const;

/**
 * Registration and governance evidence.
 *
 * `cacNumber` is intentionally null. The reference site shows another
 * foundation's CAC number; using it here would be a false credential.
 * Supply Yonwuren Naj's own number and the badge renders itself — until
 * then the governance section shows an honest "registration pending"
 * state rather than a fabricated one.
 */
export const registration = {
  cacNumber: null as string | null,
  registeredName: "Princess Naj Yonwuren Foundation",
} as const;

/* Offices — DRAFT: no address supplied yet. Empty renders nothing. */
export const offices: { city: string; address: string }[] = [];

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Our Pillars", href: "/#pillars" },
  { label: "Impact", href: "/#impact" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Purpose", href: "/#purpose" },
  { label: "Governance", href: "/#governance" },
] as const;

/* DRAFT: hero */
export const hero = {
  eyebrow: "Education · Health · Community · Nigeria",
  headingLead: "Empowering Children.",
  headingAccent: "Transforming Futures.",
  subheading:
    "Yonwuren Naj Foundation exists so that a child's circumstances never decide the limit of their future — through education, care, and the steady presence of a community that shows up.",
  primaryCta: { label: "Support our work", href: "/#give" },
  secondaryCta: { label: "See what we do", href: "/#pillars" },
} as const;

/* DRAFT: about */
export const about = {
  eyebrow: "Who we are",
  heading: "A foundation built around one belief",
  body: [
    "Yonwuren Naj Foundation was established to give young people a fair start. We work in communities where a missing school fee, an untreated illness or the absence of a mentor is enough to close a door permanently.",
    "We keep our work close to the ground. We partner with the schools, families and community leaders who already know which children are about to fall through — and we stay with those children rather than moving on to the next photograph.",
  ],
  mission: {
    title: "Our Mission",
    body: "To ensure that every child — regardless of background — has the support, protection and education they need to thrive.",
  },
  aim: {
    title: "Our Aim",
    points: [
      "Promote the overall wellbeing and protection of children",
      "Support access to quality education and learning materials",
      "Provide scholarships and educational assistance",
      "Organise community outreach that reaches the least served",
      "Extend care and companionship to elderly members of our communities",
      "Partner with schools, families and communities for lasting impact",
    ],
    closing:
      "When a child is educated, protected and empowered, the future becomes stronger for everyone.",
  },
} as const;

/* DRAFT: purpose statement */
export const purpose = {
  eyebrow: "Our purpose",
  heading: "Building a legacy that outlasts us",
  body: [
    "At the heart of this foundation is a single conviction: that potential is distributed evenly across every community, and opportunity is not. The distance between those two facts is the work.",
    "Our legacy will not be measured in events held or photographs taken, but in children who finished school, families who stayed standing, and communities that no longer need us in the same way.",
  ],
} as const;

/* DRAFT section copy; VERIFIED account details */
export const give = {
  eyebrow: "Give",
  headingLead: "Give Every Child the Future",
  headingAccent: "They Deserve.",
  body: "Every contribution is received into the foundation's account below. Share your transfer reference with us and we will confirm exactly where your gift went.",
} as const;

/* DRAFT */
export const governance = {
  eyebrow: "Transparency",
  heading: "Governance & Accountability",
  body: "Yonwuren Naj Foundation is committed to transparency, accountability and responsible stewardship of every contribution. Governance documentation is being published in stages, and this page will be updated as each becomes available.",
} as const;

export const contactSection = {
  eyebrow: "Contact",
  heading: "Start a conversation",
  body: "Whether you want to support a child, volunteer your time, or partner with the foundation — we would like to hear from you.",
} as const;
