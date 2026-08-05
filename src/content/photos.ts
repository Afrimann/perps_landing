/**
 * Photography supplied by the foundation.
 *
 * These are REAL images of the foundation's work — unlike the copy around
 * them, nothing here is a placeholder. Alt text describes only what is
 * visible in each frame; where the programme or date is not confirmed, the
 * description does not assert one.
 *
 * `width`/`height` are the intrinsic pixel dimensions, required by
 * next/image to reserve layout space and avoid shift while loading.
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Which pillar or programme the image evidences. */
  strand: "schools" | "relief" | "elders" | "team";
  /**
   * Composition note. `crowded` frames show recipients pressed together and
   * reaching; they document real demand but do not show people at their
   * most dignified, so they are kept out of lead positions.
   */
  lead?: boolean;
  crowded?: boolean;
};

export const photos = {
  hallGroup: {
    src: "/photos/hall-group-celebration.jpg",
    alt: "Foundation members and a group of elderly women standing together in a hall, smiling with hands raised in celebration.",
    width: 1280,
    height: 854,
    strand: "elders",
    lead: true,
  },
  streetCelebration: {
    src: "/photos/street-celebration.jpg",
    alt: "A foundation volunteer in a branded pink shirt and cap surrounded by smiling women and children on a residential street.",
    width: 1280,
    height: 854,
    strand: "relief",
    lead: true,
  },
  marketHandover: {
    src: "/photos/market-handover.jpg",
    alt: "A volunteer in a Yonwuren Naj Foundation shirt handing a wrapped parcel to a woman in a busy market.",
    width: 1280,
    height: 854,
    strand: "relief",
    lead: true,
  },
  eldersReceiving: {
    src: "/photos/elders-receiving.jpg",
    alt: "A volunteer in a branded shirt handing blue bags of provisions to elderly women seated in rows.",
    width: 1080,
    height: 720,
    strand: "elders",
    lead: true,
  },
  foodPrep: {
    src: "/photos/food-prep.jpg",
    alt: "Individually portioned food packs — rice, pasta, tomato mix and seasoning — laid out in rows across a tiled floor before distribution.",
    width: 960,
    height: 1280,
    strand: "relief",
    lead: true,
  },
  footballTeam: {
    src: "/photos/football-team.jpg",
    alt: "A boys' football team in Yonwuren Naj Foundation jerseys posed on a sand pitch with coaches and a foundation representative.",
    width: 870,
    height: 653,
    strand: "schools",
    lead: true,
  },
  schoolsFlyer: {
    src: "/photos/schools-competition-flyer.jpg",
    alt: "Promotional flyer for the Yonwuren Naj Foundation 6 Secondary Schools Competition, listing football, quiz, beauty pageant and dance categories with prize amounts.",
    width: 1226,
    height: 1123,
    strand: "schools",
  },
  truckBagsA: {
    src: "/photos/truck-bags-a.jpg",
    alt: "A volunteer lifting a red patterned bag of provisions from a stack in the bed of a pickup truck, watched by waiting residents.",
    width: 1280,
    height: 1092,
    strand: "relief",
  },
  truckBagsB: {
    src: "/photos/truck-bags-b.jpg",
    alt: "Bags of provisions stacked in a pickup truck bed during a street distribution.",
    width: 1280,
    height: 1148,
    strand: "relief",
  },
  truckRice: {
    src: "/photos/truck-rice.jpg",
    alt: "Sacks of rice and bagged provisions in a pickup truck as volunteers prepare to distribute them.",
    width: 1280,
    height: 854,
    strand: "relief",
  },
  eldersAddress: {
    src: "/photos/elders-address.jpg",
    alt: "A foundation representative addressing a room of seated elderly women during a community gathering.",
    width: 1280,
    height: 854,
    strand: "elders",
  },
  eldersGathered: {
    src: "/photos/elders-gathered.jpg",
    alt: "A group of elderly women standing together indoors, several clapping.",
    width: 1280,
    height: 854,
    strand: "elders",
  },
  hallBriefing: {
    src: "/photos/hall-briefing.jpg",
    alt: "Foundation members in branded shirts addressing a seated audience in a hall, with sacks of rice beside them.",
    width: 1280,
    height: 1127,
    strand: "relief",
  },
  hallAddress: {
    src: "/photos/hall-address.jpg",
    alt: "A foundation representative speaking to a gathering, with team members in branded shirts behind her.",
    width: 1280,
    height: 854,
    strand: "relief",
  },
  marketRedTee: {
    src: "/photos/market-red-tee.jpg",
    alt: "A foundation representative in a red branded shirt and cap coordinating a distribution in a market street.",
    width: 1280,
    height: 854,
    strand: "relief",
  },
  teamPitch: {
    src: "/photos/team-pitch.jpg",
    alt: "Six women in Yonwuren Naj Foundation shirts and caps standing together on a field with a football.",
    width: 750,
    height: 1000,
    strand: "team",
  },
  indoorDistribution: {
    src: "/photos/indoor-distribution.jpg",
    alt: "A crowded hall during a provisions distribution, with volunteers handing out bags.",
    width: 1280,
    height: 854,
    strand: "relief",
    crowded: true,
  },
  gateCrowdA: {
    src: "/photos/gate-crowd-a.jpg",
    alt: "Residents gathered closely at a gated doorway during a distribution, hands outstretched.",
    width: 1280,
    height: 854,
    strand: "relief",
    crowded: true,
  },
  gateCrowdB: {
    src: "/photos/gate-crowd-b.jpg",
    alt: "A dense crowd reaching towards volunteers during a community distribution.",
    width: 1280,
    height: 854,
    strand: "relief",
    crowded: true,
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export const galleryStrands = [
  { id: "all", label: "All" },
  { id: "schools", label: "Schools & Youth" },
  { id: "relief", label: "Community Relief" },
  { id: "elders", label: "Elderly Support" },
] as const;

export type StrandFilter = (typeof galleryStrands)[number]["id"];

/**
 * Gallery order. Lead images first, crowded frames excluded entirely —
 * they document real demand but read as a scramble, which undercuts the
 * dignity of the people in them.
 */
export const galleryPhotos: Photo[] = (
  Object.values(photos) as unknown as Photo[]
)
  .filter((photo) => !photo.crowded)
  .sort((a, b) => Number(Boolean(b.lead)) - Number(Boolean(a.lead)));

export const gallerySection = {
  eyebrow: "In the field",
  heading: "The Work, As It Happens",
  intro:
    "Photographs from the foundation's outreaches — schools competitions, community distributions, and time spent with the elders of the communities we serve.",
} as const;
