import { getDictionary } from "../../../lib/getDictionary";
import ContactPageClient from "./ContactPageClient";
import { Metadata } from "next";

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Contact ActARion — Get Demo, PoC, or Support",
    description: "Contact ActARion for AR SOP solutions. Get a demo, start a PoC, or get support. We'll reply within 1-2 business days with the right next step.",
    keywords: [
      "Contact ActARion",
      "AR SOP demo",
      "proof of concept",
      "AR platform support",
      "ActARion contact form",
      "AR solutions inquiry"
    ],
    openGraph: {
      title: "Contact ActARion — Get Demo, PoC, or Support",
      description: "Let's turn SOPs into real-world performance. Contact us for demos, PoCs, or support.",
      url: `https://www.actarion.com/${locale}/contact`,
      type: "website",
      images: [
        {
          url: "/Actarionlogo.png",
          width: 1200,
          height: 630,
          alt: "Contact ActARion - AR SOP Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact ActARion — Get Demo, PoC, or Support",
      description: "Let's turn SOPs into real-world performance. Contact us for demos, PoCs, or support.",
      images: ["/Actarionlogo.png"],
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  // Structured data for contact page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ActARion",
    "description": "Contact ActARion for AR SOP solutions, demos, and support",
    "url": `https://www.actarion.com/${locale}/contact`,
    "mainEntity": {
      "@type": "Organization",
      "name": "ActARion",
      "description": "AR platform for industrial companies to deliver on-the-job training and real-time guidance",
      "url": "https://www.actarion.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["English", "German", "Dutch"]
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ContactPageClient locale={locale} dictionary={dictionary} />
    </>
  );
} 