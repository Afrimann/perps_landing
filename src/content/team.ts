
import { photos, type Photo } from "./photos";

export const teamSection = {
  eyebrow: "The people",
  heading: "The Team Behind the Work",
  intro:
    "The foundation is run by a small team of women who show up in person — packing provisions before a distribution, standing on the touchline at a schools competition, and sitting with the widows they came to feed.",
} as const;

/** Group portrait, taken at the 6 Secondary Schools Competition. */
export const teamPhoto: Photo = photos.teamBillboard;

export const otherMembers = [
  "Mrs Loveth",
  "Mrs Success Udoroh",
  "Mrs Debby Praiz",
  "Miss Royal",
] as const;

export const teamPhotoCaption = `The foundation team at the 6 Secondary Schools Competition — ${otherMembers.join(", ")} — with the founder at the centre.`;
