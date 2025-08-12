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
      description: "Everything about ActARion's AR SOP platform: devices, integrations, PoC, rollout, support lines (1st/2nd/3rd), ROI, and modules.",
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
          "text": "We believe frontline (blue-collar) workers deserve the same level of innovation as office-based teams. By equipping them with the right tools, we boost productivity, improve safety, and turn procedures into real-world performance."
        }
      },
      {
        "@type": "Question",
        "name": "How does ActARion work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We transform text-heavy SOPs into visual, interactive workflows. Create no-code 3D/AR instructions, deploy to mobile, tablet and smart glasses, integrate live remote support, capture feedback and performance data, and centrally manage knowledge across locations."
        }
      },
      {
        "@type": "Question",
        "name": "What does ActARion deliver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An AR platform for industrial companies (manufacturing, field service, logistics, utilities) enabling on-the-job training, real-time guidance, and scalable knowledge capture."
        }
      },
      {
        "@type": "Question",
        "name": "Which hardware is compatible with ActARion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Microsoft HoloLens 2, Apple Vision Pro, iOS and Android smartphones/tablets, and rugged industrial devices."
        }
      },
      {
        "@type": "Question",
        "name": "Do you supply hardware?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We partner with certified suppliers to recommend and bundle the right devices. Purchase and leasing arrangements can be included."
        }
      },
      {
        "@type": "Question",
        "name": "Can ActARion integrate with our systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We begin with a PoC to validate data flows, and offer APIs and custom integrations for ERP (e.g., SAP, Microsoft Dynamics 365), MES, LMS, and HR/quality systems."
        }
      },
      {
        "@type": "Question",
        "name": "What data can ActARion collect and analyze?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Time-on-task and step duration, multiple-choice responses, user photos/videos, and digital checklists and numeric entries."
        }
      },
      {
        "@type": "Question",
        "name": "Is integration included by default?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basic API access is included. Complex integrations may require additional implementation support."
        }
      },
      {
        "@type": "Question",
        "name": "What is included in a Proof of Concept (PoC)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Scope target processes and workforce; baseline performance and waste; estimate improvement; define stakeholders and tech; evaluate outcomes to implement, iterate, or stop."
        }
      },
      {
        "@type": "Question",
        "name": "How does implementation work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We teach clients to own their digital guidance. Rollouts take ~2–6 months with a dedicated account manager and optional industry-specific implementation partners."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with partners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We collaborate with system integrators, training consultants, and solution providers across Europe. Our partner program includes training, co-selling, and integration support."
        }
      },
      {
        "@type": "Question",
        "name": "What support is offered after launch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Helpdesk with SLAs, feature updates every 3 weeks, and customer success reviews and feedback cycles."
        }
      },
      {
        "@type": "Question",
        "name": "What value can ActARion bring and what ROI can we expect?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Typical benefits: 50–75% faster onboarding, 80%+ fewer errors, reduced training costs, and improved compliance. Many clients see ROI in 6–12 months."
        }
      },
      {
        "@type": "Question",
        "name": "How do we build the business case?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "During prospecting and validated at PoC end, we quantify gains across onboarding time, SOP error rates, downtime, training cost, and expert dependency."
        }
      },
      {
        "@type": "Question",
        "name": "How does ActARion address workforce turnover and aging?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We preserve expert knowledge digitally and make it instantly accessible to new hires—closing experience gaps and reducing operational risk."
        }
      },
      {
        "@type": "Question",
        "name": "Which modules does ActARion offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Capture (expert knowledge), Studio (no-code 3D authoring), Holo Guidance (hands-free execution), Connect & Assistance (remote support), and Management Dashboard (skills & compliance)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Capture module?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Expert knowledge preservation via smart glasses to record the actions and instructions of experienced workers in real time, automatically generating documented procedures."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Studio module?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A no-code web authoring tool for creating and updating 3D work instructions with real-time content and data updates."
        }
      },
      {
        "@type": "Question",
        "name": "What is Holo Guidance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hands-free viewing and data capture on smart glasses and mobile devices for on-the-go execution."
        }
      },
      {
        "@type": "Question",
        "name": "What is Connect & Assistance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Real-time remote assistance so experts can guide operators live—reducing travel, solving issues faster, and minimizing errors."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Management Dashboard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Skills and compliance management with usage insights to maintain audit readiness."
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