import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary } from "../../../lib/getDictionary";
import FAQPageClient from "./FAQPageClient";
import { buildLocalizedPath, isSupportedLocale } from "../../../config/site";
import { buildPageMetadata, buildWebPageSchema, siteUrl } from "../../../config/seo";

interface FAQPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const fallbackDescription =
  "Clear answers about AR and AI-guided work instructions, key use cases, hardware options, AI authoring, and implementation support for industrial, logistics, and energy companies.";
const defaultMetaTitle = "FAQ – AR and AI-guided work | ActARion";

const schemaQuestions = [
  {
    name: "What does ActARion actually do?",
    text: "ActARion helps industrial, logistics, and energy companies make instructions, training, and troubleshooting digital, visual, and data-driven. Together with DeepSight we deploy an AR-first knowledge platform so experts create no-code procedures that are published to mobile devices and smart glasses, giving teams clear guidance when they need it.",
  },
  {
    name: "Why are organisations choosing AR and AI-guided solutions?",
    text: "Many organisations face complex equipment, talent shortages, and rising safety expectations. AR brings instructions into the real environment with visuals, 3D, and clips while guiding people step-by-step—hands-free if required—and capturing data from every task. AI accelerates translating expert knowledge into multilingual instructions so best practices stay current.",
  },
  {
    name: "How is this different from traditional work instructions or an LMS?",
    text: "Traditional manuals and LMS modules are static, detached from the workplace, and rarely linked to execution. ActARion and DeepSight show instructions in context on the asset, use a web-based no-code authoring tool for fast updates, and capture execution data for audits, improvement, and training insights.",
  },
  {
    name: "Which use cases can ActARion help us with?",
    text: "Typical use cases include onboarding and cross-training, complex or infrequent procedures, remote expert support, troubleshooting and diagnostics, quality checks and inspections, plus safety and compliance procedures. Everything sits in one digital library so there is always a single version of the truth.",
  },
  {
    name: "Do we need smart glasses to start?",
    text: "No. Most organisations begin on smartphones or tablets. DeepSight content runs on mobile phones, tablets, and smart glasses such as HoloLens 2 and Apple Vision Pro. Smart glasses become essential when people need both hands free or work in constrained environments, but they are optional.",
  },
  {
    name: "How does AI help in practice?",
    text: "AI speeds up building new instructions from existing documents, photos, or videos, generates multilingual versions, and suggests structure and steps based on similar procedures, so experts spend less time on documentation while staying in control of the final content.",
  },
  {
    name: "How do we keep control over quality and training?",
    text: "Each person has a profile showing which instructions they followed, training they completed, and certifications they hold. Managers can see where extra coaching is needed, which procedures cause issues, and where successful practices from one site could help another.",
  },
  {
    name: "How quickly can we get value from this?",
    text: "Most customers start with a focused pilot on one or two use cases such as onboarding a critical line, a complex changeover, or a recurring quality issue. Because the authoring tool is no-code and web-based, content iterates quickly while ActARion supports embedding the new way of working.",
  },
  {
    name: "How does ActARion support implementation?",
    text: "We typically run discovery to map current processes and quick wins, pilot to implement DeepSight on high-impact use cases and measure results, then scale up across more lines, sites, or systems while building internal capability.",
  },
  {
    name: "How can we explore whether this makes sense for our organisation?",
    text: "A short discovery call or workshop lets us review current training and instructions, identify a few high-impact use cases, and show how similar organisations use AR and AI-guided workflows today.",
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
        backgroundImage="/headers/header-4.jpg"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FAQPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}
