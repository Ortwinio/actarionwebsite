import type { RouteKey } from '@/lib/routes';

export type Section =
  | { kind: 'text'; id?: string; h2: string; body: string[] }
  | { kind: 'steps'; id?: string; h2: string; intro?: string; steps: { title: string; text: string }[] }
  | { kind: 'features'; id?: string; h2: string; intro?: string; items: { title: string; text: string }[] }
  | { kind: 'table'; id?: string; h2: string; intro?: string; head: string[]; rows: string[][] }
  | { kind: 'checklist'; id?: string; h2: string; intro?: string; items: string[] }
  | { kind: 'kpis'; id?: string; h2: string; rows: { k: string; before: string; after: string }[]; note?: string };

export interface FaqItem {
  q: string;
  a: string;
}

export interface PageContent {
  metaTitle: string;
  metaDescription: string;
  /** Short label for breadcrumbs, nav and cards. */
  label: string;
  eyebrow?: string;
  h1: string;
  lead: string;
  /** 40–60 word self-contained answer at the top of the page (GEO). */
  answer?: string;
  /** Text used on cards in hubs. */
  cardText?: string;
  /** Short KPI badge on cards. */
  kpi?: string;
  sections?: Section[];
  faq?: FaqItem[];
  /** ISO date of the last substantive update. */
  updated: string;
  /** Glossary: short definition. */
  definition?: string;
  /** Related routes shown at the bottom. */
  related?: RouteKey[];
}

export interface UiStrings {
  langName: string;
  skip: string;
  menu: string;
  close: string;
  nav: { platform: string; useCases: string; industries: string; resources: string; customers: string; roi: string; blog: string };
  ctaPilot: string;
  ctaRoi: string;
  ctaDemo: string;
  breadcrumbHome: string;
  updated: string;
  answerLabel: string;
  onThisPage: string;
  faqTitle: string;
  relatedTitle: string;
  readMore: string;
  download: string;
  downloadNote: string;
  emailLabel: string;
  emailPlaceholder: string;
  nameLabel: string;
  companyLabel: string;
  messageLabel: string;
  submit: string;
  formNote: string;
  before: string;
  after: string;
  definition: string;
  footer: {
    tagline: string;
    company: string;
    about: string;
    contact: string;
    career: string;
    partners: string;
    privacy: string;
    terms: string;
    rights: string;
    language: string;
  };
  roi: {
    title: string;
    operators: string;
    changeovers: string;
    minutes: string;
    reduction: string;
    rate: string;
    result: string;
    hours: string;
    perYear: string;
    full: string;
    disclaimer: string;
  };
  stats: { n: string; l: string }[];
  checks: string[];
  worksWith: string;
}
