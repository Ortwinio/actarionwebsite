// content/whitepapers.ts

export interface Whitepaper {
  id: string;
  title: string;
  description: string;
  /** URL to the PDF or landing page */
  downloadUrl: string;
  /** Optional cover image */
  coverImage?: string;
  /** Publication date as ISO string */
  publishedDate: string;
  /** Number of pages (optional) */
  pages?: number;
  /** Topics/tags */
  topics: string[];
}

export const WHITEPAPERS: Whitepaper[] = [
  {
    id: "ar-sop-implementation-guide",
    title: "The Complete Guide to AR-Powered SOPs in Manufacturing",
    description:
      "Learn how to transform your Standard Operating Procedures into interactive AR experiences. This guide covers implementation strategies, hardware selection, and ROI calculation for industrial AR deployments.",
    downloadUrl: "/whitepapers/ar-sop-implementation-guide.pdf",
    coverImage: "/whitepapers/covers/ar-sop-guide-cover.png",
    publishedDate: "2025-09-15",
    pages: 24,
    topics: ["AR SOPs", "Manufacturing", "Implementation"],
  },
  {
    id: "knowledge-capture-aging-workforce",
    title: "Capturing Expert Knowledge Before It Walks Out the Door",
    description:
      "Discover strategies for preserving institutional knowledge as experienced workers retire. This whitepaper explores how AR and AI can help transfer decades of expertise to the next generation of operators.",
    downloadUrl: "/whitepapers/knowledge-capture-guide.pdf",
    coverImage: "/whitepapers/covers/knowledge-capture-cover.png",
    publishedDate: "2025-07-22",
    pages: 18,
    topics: ["Knowledge Transfer", "Workforce", "Training"],
  },
  // Add more whitepapers here as needed
];



