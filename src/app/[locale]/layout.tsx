import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Navigation from "../../components/Navigation";
import { Footer } from "../../components/Footer";
import { getDictionary } from "../../lib/getDictionary";
import { isSupportedLocale, locales, Locale } from "../../config/site";
import { buildPageMetadata, buildWebsiteSchema, localBusinessSchema, organizationSchema } from "../../config/seo";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const homeTitle = "ActARion - Action with AR Revolutionize Excellence";
const homeDescription =
  "ActARion delivers next-generation SOP solutions powered by AR technology—transforming how frontline teams work, learn, and stay safe across Benelux, DACH, and the Nordics.";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const baseMetadata = buildPageMetadata({
    locale: typedLocale,
    title: homeTitle,
    description: homeDescription,
  });

  return {
    ...baseMetadata,
    keywords: [
      "ActARion",
      "Action with AR",
      "Revolutionize Excellence",
      "Augmented Reality",
      "AR",
      "SOP",
      "Standard Operating Procedures",
      "Frontline Operations",
      "Industrial Manufacturing",
      "Smart Factories",
      "Energy & Utilities",
      "Aerospace",
      "Pharma & Biotech",
      "Field Services",
      "Maintenance Operations",
      "Digital Transformation",
      "Workforce Training",
      "Process Optimization"
    ],
    authors: [{ name: "ActARion Team" }],
    creator: "ActARion",
    publisher: "ActARion",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const siteSchemas = JSON.stringify([
    organizationSchema,
    localBusinessSchema,
    buildWebsiteSchema(typedLocale),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteSchemas }}
      />
      <div className="relative flex min-h-screen flex-col bg-[var(--color-page-bg)] text-[var(--color-text)] pt-[var(--header-height)]">
        <Navigation locale={typedLocale} dictionary={dictionary} />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer locale={typedLocale} dictionary={dictionary} />
      </div>
    </>
  );
} 