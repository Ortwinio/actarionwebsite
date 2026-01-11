import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema } from "../../../config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "../../../config/site";
import VisionPageClient from "./VisionPageClient";

interface VisionPageProps {
  params: Promise<{
    locale: string;
  }>;
}

/**
 * Force static generation for all locales.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

const pageContent = {
  en: {
    title: "Vision",
    seoTitle: "Our Vision – Smarter, Safer, Faster Industrial Work",
    subtitle: "Giving people simpler, smarter ways to do complex work with AI and Augmented Reality.",
    description: "ActARion's vision is a world where every operator can perform critical tasks first-time-right, knowledge is captured and shared, and training is embedded in the work itself.",
    seoDescription: "ActARion's vision: every operator performs critical tasks first-time-right, knowledge is shared, and training is embedded in the work.",
  },
  nl: {
    title: "Visie",
    seoTitle: "Onze Visie – Slimmer, Veiliger, Sneller Industrieel Werk",
    subtitle: "Mensen eenvoudigere, slimmere manieren geven om complex werk te doen met AI en Augmented Reality.",
    description: "De visie van ActARion is een wereld waarin elke operator kritieke taken in één keer goed kan uitvoeren, kennis wordt vastgelegd en gedeeld, en training is ingebed in het werk zelf.",
    seoDescription: "De visie van ActARion: elke operator voert kritieke taken in één keer goed uit, kennis wordt gedeeld en training is ingebed in het werk.",
  },
  de: {
    title: "Vision",
    seoTitle: "Unsere Vision – Intelligentere, Sicherere, Schnellere Arbeit",
    subtitle: "Menschen einfachere, intelligentere Wege zu geben, um komplexe Arbeit mit KI und Augmented Reality zu erledigen.",
    description: "Die Vision von ActARion ist eine Welt, in der jeder Operator kritische Aufgaben beim ersten Mal richtig ausführen kann, Wissen erfasst und geteilt wird und Training in die Arbeit selbst eingebettet ist.",
    seoDescription: "ActARions Vision: Jeder Operator führt kritische Aufgaben beim ersten Mal richtig aus, Wissen wird geteilt und Training ist in die Arbeit eingebettet.",
  },
};

export async function generateMetadata({ params }: VisionPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = pageContent[locale as keyof typeof pageContent] || pageContent.en;

  return buildPageMetadata({
    locale,
    title: content.seoTitle,
    description: content.seoDescription,
    segment: "vision",
  });
}

export default async function VisionPage({ params }: VisionPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const typedLocale = locale as Locale;
  const content = pageContent[locale as keyof typeof pageContent] || pageContent.en;

  // Build breadcrumb navigation
  const aboutLabel = dictionary?.navigation?.about || "About Us";
  const breadcrumbs = [
    { name: "Home", url: buildLocalizedPath(typedLocale) },
    { name: aboutLabel, url: buildLocalizedPath(typedLocale, "about") },
    { name: content.title, url: buildLocalizedPath(typedLocale, "vision") },
  ];

  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: content.title,
      description: content.description,
      segment: "vision",
    }),
    buildBreadcrumbListSchema(breadcrumbs),
  ];

  return (
    <>
      <PageHeader
        title={content.title}
        subtitle={content.subtitle}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <VisionPageClient locale={locale} />
    </>
  );
}

