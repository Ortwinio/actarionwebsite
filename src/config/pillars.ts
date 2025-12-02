/**
 * Content pillars configuration for ActARion website.
 *
 * Use these pillars to tag use cases and blog posts.
 * Later, filtered overviews can list all content for a given pillar.
 */

export type PillarId =
  | "use-cases"
  | "roles"
  | "industries"
  | "technology-and-architecture"
  | "change-and-implementation";

export interface ContentPillar {
  id: PillarId;
  title: string;
  description: string;
}

export const CONTENT_PILLARS: ContentPillar[] = [
  {
    id: "use-cases",
    title: "Use cases for AR work instructions and SOPs",
    description:
      "AR SOPs and AR work instructions applied in day-to-day operations, such as assembly, changeovers, maintenance, onboarding and audits.",
  },
  {
    id: "roles",
    title: "Content for key roles",
    description:
      "Articles and guides tailored to specific personas such as maintenance managers, HR and learning teams, HSE leaders and operations managers.",
  },
  {
    id: "industries",
    title: "Industries and environments",
    description:
      "How ActARion and AR work instructions are used in food & beverage, pharma, logistics, energy, aerospace and other industrial environments.",
  },
  {
    id: "technology-and-architecture",
    title: "Technology and architecture",
    description:
      "Deep Sight as an AR-first connected worker platform, system integration patterns and device choices like HoloLens 2, Apple Vision Pro and tablets.",
  },
  {
    id: "change-and-implementation",
    title: "Change and implementation",
    description:
      "How to introduce AR work instructions, run AR SOP pilots, manage adoption and scale implementations across plants and teams.",
  },
];

/**
 * Lookup map for quick access to a pillar by its ID.
 *
 * @example
 * const pillar = CONTENT_PILLARS_BY_ID["use-cases"];
 * console.log(pillar.title); // "Use cases for AR work instructions and SOPs"
 */
export const CONTENT_PILLARS_BY_ID: Record<PillarId, ContentPillar> =
  CONTENT_PILLARS.reduce(
    (map, pillar) => {
      map[pillar.id] = pillar;
      return map;
    },
    {} as Record<PillarId, ContentPillar>,
  );

/**
 * Get all content pillars.
 */
export const getAllPillars = (): ContentPillar[] => CONTENT_PILLARS;

/**
 * Get a content pillar by its ID.
 * Returns undefined if the pillar is not found.
 */
export const getPillarById = (id: PillarId): ContentPillar | undefined =>
  CONTENT_PILLARS_BY_ID[id];

/**
 * Check if a string is a valid pillar ID.
 */
export const isValidPillarId = (value: string): value is PillarId =>
  CONTENT_PILLARS.some((pillar) => pillar.id === value);

