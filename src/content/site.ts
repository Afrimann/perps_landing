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
  /**
   * WhatsApp uses the same line as the phone number above, in wa.me's
   * required format: international digits only, no `+`, no spaces.
   * If the foundation moves WhatsApp to a different line, change ONLY
   * `whatsappNumber` — every link and label is derived from it.
   */
  whatsappNumber: "2349026564700",
  whatsappDisplay: "+234 902 656 4700",
} as const;

/** Pre-fills the first message so an enquiry does not start with a blank box. */
export const whatsappHref = (message = "Hello Yonwuren Naj Foundation, I would like to make an enquiry.") =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

/* VERIFIED — supplied directly by the foundation */
export const bankDetails = {
  accountName: "Princess Naj Yonwuren Foundation",
  accountNumber: "5610169951",
  bank: "Fidelity Bank",
} as const;

/**
 * Registration and governance evidence.
 *
 * ⚠️  PROVISIONAL — the foundation supplied `1468890` and has stated it will
 *     be corrected once the confirmed CAC number is to hand. This renders a
 *     live credential in three places (About, Governance, footer). To pull it
 *     back to the honest "pending" state, set `cacNumber` to `null` — nothing
 *     else needs changing.
 */
export const registration = {
  cacNumber: "1468890" as string | null,
  registeredName: "Princess Naj Yonwuren Foundation",
} as const;

/* Offices — DRAFT: no address supplied yet. Empty renders nothing. */
export const offices: { city: string; address: string }[] = [];

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Our Story", href: "/story" },
  { label: "Our Pillars", href: "/#pillars" },
  { label: "Impact", href: "/#impact" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Apply", href: "/apply" },
] as const;

/* DRAFT: hero */
export const hero = {
  eyebrow: "Education · Health · Community · Nigeria",
  headingLead: "Empowering Children.",
  headingAccent: "Transforming Futures.",
  subheading:
    "Yonwuren Naj Foundation exists so that a child's circumstances never decide the limit of their future — through education, care, and the steady presence of a community that shows up.",
  primaryCta: { label: "Apply for a programme", href: "/apply" },
  secondaryCta: { label: "Support our work", href: "/#give" },
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
  body: "Yonwuren Naj Foundation is a registered Nigerian foundation. Every programme it runs is written up and published on this site with the year it ran, where it ran and who it reached — so that its record can be checked rather than taken on trust.",
} as const;

export const contactSection = {
  eyebrow: "Get in touch",
  heading: "Two ways to reach us",
  body: "Applications for our programmes go through the registration form, so that nothing is lost in a message thread. For questions, follow-ups and anything else, WhatsApp and email are open.",
} as const;
