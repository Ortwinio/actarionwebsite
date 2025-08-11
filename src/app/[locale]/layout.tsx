import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Navigation from '../../components/Navigation';
import CookieBanner from '../../components/CookieBanner';
import ConditionalAnalytics from '../../components/ConditionalAnalytics';
import { getDictionary } from "../../lib/getDictionary";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const locales = ['en', 'de', 'nl'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  if (!locales.includes(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  return {
    title: "ActARion - Action with AR Revolutionize Excellence",
    description: "ActARion - Action with AR Revolutionize Excellence. Delivering next-generation SOP solutions powered by AR technology—transforming how frontline teams work, learn, and stay safe. Serving Benelux, DACH & Nordics.",
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
    metadataBase: new URL('https://actarion.com'),
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'de': '/de',
        'nl': '/nl',
      },
    },
    openGraph: {
      title: "ActARion - Action with AR Revolutionize Excellence",
      description: "ActARion - Action with AR Revolutionize Excellence. Delivering next-generation SOP solutions powered by AR technology—transforming how frontline teams work, learn, and stay safe.",
      url: 'https://actarion.com',
      siteName: 'ActARion',
      images: [
        {
          url: '/Actarionlogo.png',
          width: 1200,
          height: 630,
          alt: 'Actarion - AR-Powered SOP Solutions',
        },
      ],
      locale: locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : 'nl_NL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
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

  if (!locales.includes(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  return (
    <>
      <Navigation locale={locale} dictionary={dictionary} />
      {children}
    </>
  );
} 