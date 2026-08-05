/**
 * Single source of truth for every piece of copy on the site.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  CONTENT STATUS
 *
 *  VERIFIED   — supplied by the foundation. Do not change without asking.
 *               (organisation name, phone, email, bank account details)
 *
 *  DRAFT      — written by us as a starting point. Every claim here is
 *               invented and must be confirmed by the foundation before
 *               this site goes live. Search this file for `DRAFT:` to find
 *               everything still awaiting sign-off.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  /* VERIFIED */
  name: "Yonwuren Naj Foundation",
  shortName: "YNF",

  /* DRAFT: tagline — needs the foundation's own words */
  tagline: "Every child deserves a classroom",

  /* DRAFT: one-line description used in metadata and the footer */
  description:
    "A Nigerian foundation working to keep children in school — through scholarships, learning materials and mentorship for young people whose education is at risk.",

  url: "https://yonwurennajfoundation.org",
} as const;

/* VERIFIED — supplied directly by the foundation */
export const contact = {
  phone: "09026564700",
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

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "What We Do", href: "#programs" },
  { label: "Impact", href: "#impact" },
  { label: "Get Involved", href: "#get-involved" },
  { label: "Contact", href: "#contact" },
] as const;

/* DRAFT: hero copy */
export const hero = {
  eyebrow: "Education & youth development · Nigeria",
  heading: "Every child deserves a classroom",
  subheading:
    "Yonwuren Naj Foundation works alongside families and schools to remove the barriers that push children out of education — school fees, missing materials, and the absence of someone in their corner.",
  primaryCta: { label: "Support a child", href: "#donate" },
  secondaryCta: { label: "See our work", href: "#programs" },
} as const;

/* DRAFT: about section */
export const about = {
  eyebrow: "Who we are",
  heading: "A foundation built around one belief",
  body: [
    "Yonwuren Naj Foundation was established to give young people a fair start. We work in communities where a missing school fee, a lost uniform or an absent mentor is enough to end a child's education for good.",
    "We keep our work deliberately close to the ground: we partner with local schools and families, we follow the same children year after year, and we measure success by how many of them are still in a classroom the following term.",
  ],
  pillars: [
    {
      title: "Direct support",
      body: "Fees, uniforms, books and exam registration paid straight to the school, so help reaches the child rather than stopping somewhere along the way.",
    },
    {
      title: "Long-term relationships",
      body: "We stay with the young people we support through the length of their schooling, not for a single term or a single photograph.",
    },
    {
      title: "Community first",
      body: "Programmes are designed with the parents, teachers and community leaders who know exactly which children are about to fall through the cracks.",
    },
  ],
} as const;

/* DRAFT: programme descriptions */
export const programs = {
  eyebrow: "What we do",
  heading: "Four ways we keep children learning",
  intro:
    "Each programme addresses a specific reason children leave school early. Together they cover the full path from primary enrolment to a first job.",
  items: [
    {
      title: "Scholarships & school fees",
      body: "Termly fees, exam registration and levies paid directly to schools for children at risk of dropping out.",
    },
    {
      title: "Learning materials",
      body: "Books, uniforms, bags and stationery — the small costs that quietly keep children away from the classroom.",
    },
    {
      title: "Mentorship & tutoring",
      body: "Regular contact with mentors and after-school tutoring, so support continues well beyond the school gate.",
    },
    {
      title: "Skills & vocational training",
      body: "Practical training and starter tools for older youths, opening a route to earning for those past school age.",
    },
  ],
} as const;

/**
 * DRAFT: impact figures.
 *
 * ⚠️  These numbers are ILLUSTRATIVE PLACEHOLDERS. They are not real and
 *     must be replaced with the foundation's actual figures — or this whole
 *     section removed — before the site is published. Publishing invented
 *     impact numbers on a fundraising page would be a serious problem.
 */
export const impact = {
  eyebrow: "Our impact",
  heading: "The work, in numbers",
  note: "Figures pending confirmation from the foundation.",
  stats: [
    { value: "000", label: "Children supported in school" },
    { value: "00", label: "Partner schools and communities" },
    { value: "000", label: "Learning kits distributed" },
    { value: "00", label: "Youths in vocational training" },
  ],
} as const;

/* DRAFT: get-involved options */
export const getInvolved = {
  eyebrow: "Get involved",
  heading: "There is more than one way to help",
  items: [
    {
      title: "Give",
      body: "A one-off gift or a standing order. Every naira goes towards fees, materials and training for a named child.",
      cta: { label: "See donation details", href: "#donate" },
    },
    {
      title: "Volunteer",
      body: "Mentor a student, tutor a subject, or lend professional skills — legal, medical, accounting — to the foundation's work.",
      cta: { label: "Talk to us", href: "#contact" },
    },
    {
      title: "Partner",
      body: "Schools, businesses and organisations that want to sponsor a cohort or fund a programme outright.",
      cta: { label: "Start a conversation", href: "#contact" },
    },
  ],
} as const;

/* Section copy is DRAFT; the account details inside it are VERIFIED. */
export const donate = {
  eyebrow: "Donate",
  heading: "Send a gift directly",
  body: "Donations are received into the foundation's bank account below. If you would like your gift directed to a specific programme, send us a note after transferring and we will confirm receipt.",
  followUp: "Please share your transfer reference with us so we can thank you properly and confirm where your gift went.",
} as const;

/* DRAFT: contact section copy — the details themselves are VERIFIED */
export const contactSection = {
  eyebrow: "Contact",
  heading: "Get in touch",
  body: "Whether you want to support a child, volunteer your time, or ask how the foundation works — we would like to hear from you.",
} as const;
