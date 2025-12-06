import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import FAQPageClient from "./FAQPageClient";
import { buildLocalizedPath, isSupportedLocale, locales } from "../../../config/site";
import { buildPageMetadata, buildWebPageSchema, siteUrl } from "../../../config/seo";

interface FAQPageProps {
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

const fallbackDescription =
  "Clear answers about AI and AR–guided work instructions, AR SOPs, digital work instructions, key use cases, hardware options, AI authoring, and implementation support for industrial, logistics, and energy companies.";
// Don't add "| ActARion" - the root layout template will add it
const defaultMetaTitle = "FAQ – AI and AR–guided work instructions";

const schemaQuestions = [
  {
    name: "What does ActARion do?",
    text: "ActARion helps industrial, logistics, and energy companies work smarter, safer and faster with AI and AR–guided work instructions. We transform SOPs and manuals into digital work instructions and AR SOPs that operators can follow step-by-step on tablets and smart glasses. As the European partner of Deep Sight, we bring an AR-first connected worker platform to the shop floor.",
  },
  {
    name: "How does ActARion work with Deep Sight?",
    text: "ActARion is the European partner of Deep Sight, the AR-first connected worker platform. We help you implement Deep Sight in your plants, design and maintain AR SOPs, and support your teams in adopting AI and AR–guided work instructions in daily operations.",
  },
  {
    name: "Why are organisations choosing AI and AR–guided work instructions?",
    text: "Many organisations face complex equipment, talent shortages, and rising safety expectations. AI and AR–guided work instructions bring AR SOPs into the real environment with visuals, 3D, and clips while guiding people step-by-step—hands-free if required—and capturing data from every task. AI accelerates translating expert knowledge into multilingual digital work instructions so best practices stay current.",
  },
  {
    name: "How are AR SOPs different from traditional work instructions or an LMS?",
    text: "Traditional manuals and LMS modules are static, detached from the workplace, and rarely linked to execution. ActARion and Deep Sight show AR SOPs and digital work instructions in context on the asset, use a web-based no-code authoring tool for fast updates, and capture execution data for audits, improvement, and training insights.",
  },
  {
    name: "Which use cases can AI and AR–guided work instructions help us with?",
    text: "Typical use cases for AR SOPs and digital work instructions include onboarding and cross-training, complex or infrequent procedures, remote expert support, troubleshooting and diagnostics, quality checks and inspections, plus safety and compliance procedures. Everything sits in one digital library so there is always a single version of the truth.",
  },
  {
    name: "Do we need smart glasses to start with AR SOPs?",
    text: "No. Most organisations begin on smartphones or tablets. Deep Sight content runs on mobile phones, tablets, and smart glasses such as HoloLens 2 and Apple Vision Pro. Smart glasses become essential when people need both hands free or work in constrained environments, but they are optional for digital work instructions.",
  },
  {
    name: "How does AI help in creating digital work instructions?",
    text: "AI speeds up building new AR SOPs and digital work instructions from existing documents, photos, or videos, generates multilingual versions, and suggests structure and steps based on similar procedures, so experts spend less time on documentation while staying in control of the final content.",
  },
  {
    name: "How do we keep control over quality and training with AR SOPs?",
    text: "Each person has a profile showing which digital work instructions they followed, training they completed, and certifications they hold. Managers can see where extra coaching is needed, which AR SOPs cause issues, and where successful practices from one site could help another.",
  },
  {
    name: "How quickly can we get value from AI and AR–guided work instructions?",
    text: "Most customers start with a focused pilot on one or two use cases such as onboarding a critical line, a complex changeover, or a recurring quality issue. Because the authoring tool is no-code and web-based, AR SOPs iterate quickly while ActARion supports embedding the new way of working.",
  },
  {
    name: "How does ActARion support implementation of digital work instructions?",
    text: "We typically run discovery to map current processes and quick wins, pilot to implement Deep Sight AR SOPs on high-impact use cases and measure results, then scale up across more lines, sites, or systems while building internal capability for AI and AR–guided work instructions.",
  },
  {
    name: "How can we explore whether AI and AR–guided work instructions make sense for our organisation?",
    text: "A short discovery call or workshop lets us review current training and instructions, identify a few high-impact use cases, and show how similar organisations use AI and AR–guided work instructions and AR SOPs today.",
  },
];

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const faqCopy = dictionary.pages?.faq;
  const description =
    faqCopy?.subtitle?.replace(/\s+/g, " ").trim() || fallbackDescription;
  const metaTitle = defaultMetaTitle;

  return buildPageMetadata({
    locale,
    title: metaTitle,
    description,
    segment: "faq",
  });
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const faqCopy = dictionary.pages?.faq;
  const description =
    faqCopy?.subtitle?.replace(/\s+/g, " ").trim() || fallbackDescription;
  const metaTitle = defaultMetaTitle;
  const canonicalPath = buildLocalizedPath(locale, "faq");
  const absoluteUrl = `${siteUrl}${canonicalPath}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": metaTitle,
    "description": description,
    "url": absoluteUrl,
    "mainEntity": schemaQuestions.map(question => ({
      "@type": "Question",
      "name": question.name,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": question.text,
      },
    })),
  };

  const structuredData = [
    buildWebPageSchema({
      locale,
      title: metaTitle,
      description,
      segment: "faq",
    }),
    faqSchema,
  ];
  const title = dictionary?.pages?.faq?.title || "FAQ about AR and AI-guided work";
  const subtitle = dictionary?.pages?.faq?.subtitle || description;

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FAQPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}
