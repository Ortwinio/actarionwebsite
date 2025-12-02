// content/events.ts

export type EventLocation = "Amsterdam" | "Zurich" | "Frankfurt" | "Webinar" | string;

export interface ActARionEvent {
  id: string;
  date: string; // ISO date string, e.g. "2025-03-15"
  title: string;
  description: string;
  location: EventLocation;
}

export const EVENTS: ActARionEvent[] = [
  {
    id: "2026-01-22-corporate-knowledge-capturing",
    date: "2026-01-22",
    title: "Corporate knowledge capturing: the future of work with SOPs and Augmented Reality",
    description:
      "Discover how AI and AR–guided work instructions help you capture corporate knowledge, keep SOPs up to date and support your teams on the shop floor.",
    location: "Amsterdam",
  },
  {
    id: "2026-02-12-ar-sop-webinar",
    date: "2026-02-12",
    title: "AR-guided SOPs: From pilot to production",
    description:
      "Join this webinar to learn how leading manufacturers are scaling AR-guided work instructions from initial pilots to full production rollouts.",
    location: "Webinar",
  },
  // Add more events here as needed
];

