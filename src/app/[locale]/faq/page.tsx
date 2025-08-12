import { getDictionary } from "../../../lib/getDictionary";
import FAQPageClient from "./FAQPageClient";
import { Metadata } from "next";

interface FAQPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: "ActARion FAQ — AR SOP, Hardware, Integrations, ROI",
    description: "Answers to common questions about ActARion's AR platform for SOPs: compatible hardware, integrations (SAP, Dynamics 365, MES, LMS), PoC, rollout, support, ROI, and modules.",
    keywords: [
      "ActARion FAQ",
      "AR SOP questions",
      "hardware compatibility",
      "system integrations",
      "proof of concept",
      "ROI calculation",
      "implementation process",
      "support services"
    ],
    openGraph: {
      title: "ActARion FAQ — AR SOP, Hardware, Integrations, ROI",
      description: "Everything about ActARion's AR SOP platform: devices, integrations, PoC, rollout, support, ROI, and modules.",
      url: `https://www.actarion.com/${locale}/faq`,
      type: "website",
      images: [
        {
          url: "/Actarionlogo.png",
          width: 1200,
          height: 630,
          alt: "ActARion FAQ - AR SOP Platform Questions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "ActARion FAQ — AR SOP, Hardware, Integrations, ROI",
      description: "Learn how ActARion transforms SOPs with AR: hardware, integrations, PoC, rollout, support, ROI, modules.",
      images: ["/Actarionlogo.png"],
    },
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as 'en' | 'de' | 'nl');

  // Enhanced structured data for FAQ page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "ActARion FAQ - AR SOP Platform Questions",
    "description": "Frequently asked questions about ActARion's AR platform for SOPs, including hardware compatibility, system integrations, proof of concept, implementation, ROI, and modules.",
    "url": `https://www.actarion.com/${locale}/faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why does ActARion exist?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We believe frontline (blue-collar workers) deserve the same level of innovation as the white-collar workers in the office. By empowering them with the right tools, we can boost their productivity, ensure safety, and maintain quality—turning procedures into real-world performance."
        }
      },
      {
        "@type": "Question",
        "name": "How do we work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We do this by transforming traditional, text-heavy Standard Operating Procedures into visual, interactive workflows. Our platform makes it easy to create no-code 3D and AR work instructions, deploy them across devices, integrate live remote support, capture feedback, and manage knowledge centrally—keeping teams aligned across shifts and locations."
        }
      },
      {
        "@type": "Question",
        "name": "What do we deliver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ActARion is an Augmented Reality (AR) platform for industrial companies—manufacturers, field service providers, logistics firms, and utilities—that want to deliver on-the-job training, real-time guidance, and knowledge captured at scale, accessible via mobile devices, tablets, and smart glasses."
        }
      },
      {
        "@type": "Question",
        "name": "Compatible Hardware",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ActARion works seamlessly with: Smart Glasses: Microsoft HoloLens 2, Apple Vision Pro; Smartphones & Tablets: iOS and Android; Rugged Industrial Devices for demanding environments"
        }
      },
      {
        "@type": "Question",
        "name": "Hardware Supply",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We don't resell hardware directly. Instead, we partner with certified suppliers to recommend and bundle the right devices for your operational needs. Purchase and lease arrangements can be part of our offering."
        }
      },
      {
        "@type": "Question",
        "name": "Can ActARion integrate with our existing systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We work with diverse clients and connect to primary data flows within your organization. To ensure data is properly identified, collected, and applied, every engagement begins with a Proof of Concept (PoC). We offer API support and custom integration services for ERP (e.g., SAP, Microsoft Dynamics 365), MES systems, Learning Management Systems (LMS), and HR and quality systems."
        }
      },
      {
        "@type": "Question",
        "name": "What data can be collected and analyzed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ActARion can capture and analyze: Time-on-task and step duration, Multiple-choice responses, User-generated photos and videos, Digital checklists and numeric entries"
        }
      },
      {
        "@type": "Question",
        "name": "What's included in a Proof of Concept (PoC)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Identify targeted processes and workforce; Record current performance and waste; Estimate potential improvement and required measures; Define people, technology, departments, and contextual factors involved; Set the scope of the project. The PoC concludes with an evaluation, determining whether to continue to full implementation, start a new iteration, or end the project if results are insufficient."
        }
      },
      {
        "@type": "Question",
        "name": "Implementation (your guidance, your control)",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We teach clients to own their digital guidance. During implementation, we scale up usage and ensure your team can independently operate the application. ActARion works with implementation partners who have deep industry-specific knowledge and experience. A typical rollout takes 2–6 months, depending on your goals. Each client receives a dedicated account manager to oversee onboarding and deployment."
        }
      },
      {
        "@type": "Question",
        "name": "What value can ActARion bring?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At ActARion, we believe co-working only makes sense if we can add measurable value to your business. ActARion helps organizations: Accelerate onboarding by 50–75%, Reduce operational errors by over 80%, Capture expert knowledge visually, Enable self-guided execution on the floor, Improve compliance and certification tracking"
        }
      },
      {
        "@type": "Question",
        "name": "Building the Business Case",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When evaluating a fit, we analyze improvement potential in: Onboarding time: 4–6 weeks → 1–2 weeks, SOP error rate: 10–15% → <2%, Downtime per team: 8–10 hrs/month → <2 hrs/month, Training cost per employee: €1,000–€2,000 → up to 50% savings, Expert dependency: High → Reduced. We build this business case in the Prospecting stage and evaluate it at the end of the Proof of Concept."
        }
      },
      {
        "@type": "Question",
        "name": "Expected ROI",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most clients see ROI in 6–12 months, driven by: Higher productivity, Fewer support escalations, Shorter time-to-competence, Improved quality and safety metrics"
        }
      },
      {
        "@type": "Question",
        "name": "Tackling Workforce Turnover & Aging",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We help you retain critical expertise digitally and make it instantly accessible to new hires—closing the experience gap and reducing operational risk."
        }
      },
      {
        "@type": "Question",
        "name": "What modules do ActARion offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ActARion offers five core modules designed to transform your operations: Capture (Expert knowledge preservation), Studio (Code-free web authoring tool for 3D instructions), Holo Guidance (Hands-free viewing and data capture), Connect & Assistance (Real-time remote assistance), and Management Dashboard (Dashboard for skills management)"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FAQPageClient locale={locale} dictionary={dictionary} />
    </>
  );
}
