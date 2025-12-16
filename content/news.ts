// content/news.ts

export type NewsType = "press-release" | "company-news" | "partnership" | "award" | "industry-news";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  /** Full content or link to full article */
  content?: string;
  /** External link if news is hosted elsewhere */
  externalUrl?: string;
  /** Publication date as ISO string */
  publishedDate: string;
  /** News type/category */
  type: NewsType;
  /** Optional image */
  image?: string;
}

export const NEWS: NewsItem[] = [
  {
    id: "deep-sight-partnership-expansion",
    title: "ActARion Expands DeepSight Partnership to Nordic Region",
    summary:
      "ActARion announces expansion of its DeepSight AR platform partnership to cover Norway, Sweden, Finland, and Denmark, bringing AR-powered SOPs to more European manufacturers.",
    publishedDate: "2025-11-15",
    type: "partnership",
    image: "/news/deep-sight-nordic.png",
  },
  {
    id: "manufacturing-excellence-award",
    title: "ActARion Wins Manufacturing Excellence Award 2025",
    summary:
      "ActARion has been recognized for its innovative approach to AR-guided work instructions at the European Manufacturing Excellence Awards.",
    publishedDate: "2025-10-28",
    type: "award",
    image: "/news/excellence-award.png",
  },
  {
    id: "series-a-funding",
    title: "ActARion Secures Series A Funding to Accelerate Growth",
    summary:
      "ActARion announces successful Series A funding round to expand its AR SOP platform across Europe and invest in AI-powered knowledge capture capabilities.",
    publishedDate: "2025-09-05",
    type: "company-news",
    image: "/news/funding-announcement.png",
  },
  // Add more news items here as needed
];

export const NEWS_TYPE_LABELS: Record<NewsType, string> = {
  "press-release": "Press Release",
  "company-news": "Company News",
  partnership: "Partnership",
  award: "Award",
  "industry-news": "Industry News",
};











