import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema } from "../../../config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale, locales } from "../../../config/site";
import ManagementPageClient from "./ManagementPageClient";

interface ManagementPageProps {
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
    title: "Management",
    seoTitle: "ActARion Leadership Team",
    subtitle: "ActARion is led by experienced entrepreneurs who bridge technology, operations and people.",
    description: "Meet the ActARion management team. Mark Dercksen and Ortwin Verreck lead ActARion with a shared mission to help organisations work smarter, safer and faster with AI and Augmented Reality.",
    seoDescription: "Meet Mark Dercksen and Ortwin Verreck, the Managing Partners leading ActARion's mission to transform industrial work with AR and AI.",
  },
  nl: {
    title: "Management",
    seoTitle: "ActARion Leiderschapsteam",
    subtitle: "ActARion wordt geleid door ervaren ondernemers die technologie, operations en mensen verbinden.",
    description: "Ontmoet het ActARion managementteam. Mark Dercksen en Ortwin Verreck leiden ActARion met een gedeelde missie om organisaties te helpen slimmer, veiliger en sneller te werken met AI en Augmented Reality.",
    seoDescription: "Maak kennis met Mark Dercksen en Ortwin Verreck, de Managing Partners die ActARion leiden in de transformatie van industrieel werk.",
  },
  de: {
    title: "Management",
    seoTitle: "ActARion Führungsteam",
    subtitle: "ActARion wird von erfahrenen Unternehmern geleitet, die Technologie, Betrieb und Menschen verbinden.",
    description: "Lernen Sie das ActARion Management-Team kennen. Mark Dercksen und Ortwin Verreck führen ActARion mit einer gemeinsamen Mission, Organisationen dabei zu helfen, mit KI und Augmented Reality intelligenter, sicherer und schneller zu arbeiten.",
    seoDescription: "Lernen Sie Mark Dercksen und Ortwin Verreck kennen, die Managing Partners, die ActARion bei der Transformation der Industrie führen.",
  },
};

export async function generateMetadata({ params }: ManagementPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = pageContent[locale as keyof typeof pageContent] || pageContent.en;

  return buildPageMetadata({
    locale,
    title: content.seoTitle,
    description: content.seoDescription,
    segment: "management",
  });
}

export default async function ManagementPage({ params }: ManagementPageProps) {
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
    { name: content.title, url: buildLocalizedPath(typedLocale, "management") },
  ];

  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: content.title,
      description: content.description,
      segment: "management",
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
      <ManagementPageClient locale={locale} />
    </>
  );
}

