// content/videos.ts

export interface ActARionVideo {
  id: string; // internal ID/slug
  title: string;
  description: string;
  youtubeId: string; // e.g. "Asbqj8w4obA"
  category?: string; // optional: e.g. "Use Case", "Intro"
  duration?: string; // optional: e.g. "6:00"
}

export const VIDEOS: ActARionVideo[] = [
  // Intro / Overview videos
  {
    id: "actarion-in-30-seconds",
    title: "ActARion in 30 seconds",
    description:
      "A short introduction to how ActARion uses AI and AR–guided work instructions to help organisations work smarter, safer and faster.",
    youtubeId: "5haLmuol8MU",
    category: "Intro",
    duration: "0:37",
  },

  // Use Case videos
  {
    id: "usecase-1-capturing-corporate-memory",
    title: "Use Case 1 – Capturing Corporate Memory with AI & AR (Leo)",
    description:
      "How do you capture corporate memory before your experts walk out the door? Leo shows how AI and AR turn tacit knowledge into clear, digital SOPs that can be shared across the organisation.",
    youtubeId: "Asbqj8w4obA",
    category: "Use Case",
    duration: "6:00",
  },
  {
    id: "usecase-2-faster-training-linda",
    title: "Use Case 2 – How Linda Trains New Operators Faster & Safer",
    description:
      "Onboarding new operators in manufacturing doesn't have to be slow, expensive and error-prone. See how ActARion and AR-guided work instructions help Linda train new operators faster and safer.",
    youtubeId: "2MRNjdKFTr0",
    category: "Use Case",
    duration: "6:23",
  },
  {
    id: "usecase-3-error-free-assembly-yannik",
    title: "Use Case 3 – Error-Free Assembly with AR Work Instructions (Yannik)",
    description:
      "Every assembly error costs time, money and often a lot of frustration on the shop floor. Follow Yannik as he uses AR SOPs and digital work instructions to assemble products with fewer errors and more consistency.",
    youtubeId: "Iyo4pX30VZA",
    category: "Use Case",
    duration: "5:26",
  },
  {
    id: "usecase-4-streamlining-changeovers-wouter",
    title: "Use Case 4 – Streamlining Changeovers with AR Work Instructions (Wouter)",
    description:
      "Using AR SOPs to standardise complex changeovers, reduce downtime and make results less dependent on hero operators.",
    youtubeId: "", // TODO: Add video ID when available on YouTube channel
    category: "Use Case",
  },
  {
    id: "usecase-5-data-driven-maintenance-elane",
    title: "Use Case 5 – Data-Driven Maintenance with AR Work Instructions (Elane)",
    description:
      "Unplanned downtime is expensive – and often predictable if you look at the right data. Follow Elane, who uses data-driven maintenance and AR work instructions to detect issues earlier and keep equipment running reliably.",
    youtubeId: "ts5sl85xEQg",
    category: "Use Case",
    duration: "6:23",
  },
  {
    id: "usecase-6-fast-fault-recovery-harold",
    title: "Use Case 6 – Fast Fault Recovery with AR Remote Expert Support (Harold)",
    description:
      "When a production line stops, every minute counts. Follow Harold on the shop floor and see how AI and AR-guided troubleshooting and remote expert support help him recover from faults faster and safer.",
    youtubeId: "6OloDntjWjE",
    category: "Use Case",
    duration: "5:22",
  },

  // TODO: Add more videos from the ActARion YouTube channel here
  // Webinars, Events, Tutorials, etc.
];

// Video categories for filtering
export const VIDEO_CATEGORIES = [
  { value: "all", label: "All" },
  { value: "Intro", label: "Introduction" },
  { value: "Use Case", label: "Use Cases" },
  { value: "Webinar", label: "Webinars" },
  { value: "Event", label: "Events" },
  { value: "Tutorial", label: "Tutorials" },
] as const;

export type VideoCategory = (typeof VIDEO_CATEGORIES)[number]["value"];
