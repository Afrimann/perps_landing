/**
 * The six pillars. DRAFT — descriptions written by us, pending the
 * foundation's confirmation that each is genuinely part of their remit.
 *
 * `icon` names map to the inline SVG set in components/ui/pillar-icon.tsx.
 * Icons are drawn with stroke-dashoffset on reveal, so every path must be
 * a stroked outline — no filled shapes.
 */

export type PillarIcon =
  | "compass"
  | "book"
  | "heart"
  | "people"
  | "globe"
  | "hands";

export type Pillar = {
  title: string;
  body: string;
  icon: PillarIcon;
};

export const pillarsSection = {
  eyebrow: "What we stand for",
  heading: "Our Core Pillars of Impact",
  intro:
    "Six areas of work, each addressing a different reason a child or an elder is left without support. Together they cover the whole arc of a life in a community.",
} as const;

export const pillars: Pillar[] = [
  {
    title: "Leadership & Mentorship",
    body: "Nurturing future leaders through structured mentorship that builds character, confidence and a sense of responsibility in young people.",
    icon: "compass",
  },
  {
    title: "Education Advancement",
    body: "Investing in learning resources, school fees and scholarships that unlock opportunity for children and lift entire communities with them.",
    icon: "book",
  },
  {
    title: "Health & Wellness Outreach",
    body: "Delivering targeted health interventions, wellness education and access to essential care for children in underserved communities.",
    icon: "heart",
  },
  {
    title: "Community Support Initiatives",
    body: "Building durable support systems for families — meeting immediate need while creating the structures that make communities resilient.",
    icon: "people",
  },
  {
    title: "Social Responsibility Programs",
    body: "Championing ethical partnerships that generate measurable, accountable impact for children's welfare and education across society.",
    icon: "globe",
  },
  {
    title: "Elderly Citizens Support",
    body: "Providing care, resources and companionship that honour the elders of our communities and strengthen the bonds between generations.",
    icon: "hands",
  },
];
