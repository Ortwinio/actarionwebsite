"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FAQPageClientProps {
  locale: string;
  dictionary: any;
}

export default function FAQPageClient({ locale, dictionary }: FAQPageClientProps) {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const faqData = {
    general: [
      {
        q: "Why does ActARion exist?",
        a: "We believe frontline (blue-collar) workers deserve the same level of innovation as office-based teams. By equipping them with the right tools, we boost productivity, improve safety, and turn procedures into real-world performance."
      },
      {
        q: "How does ActARion work?",
        a: "We transform text-heavy SOPs into visual, interactive workflows. Create no-code 3D/AR instructions, deploy to mobile, tablet and smart glasses, integrate live remote support, capture feedback and performance data, and centrally manage knowledge across locations."
      },
      {
        q: "What does ActARion deliver?",
        a: "An AR platform for industrial companies (manufacturing, field service, logistics, utilities) enabling on-the-job training, real-time guidance, and scalable knowledge capture."
      }
    ],
    hardware: [
      {
        q: "Which hardware is compatible with ActARion?",
        a: "Microsoft HoloLens 2, Apple Vision Pro, iOS and Android smartphones/tablets, and rugged industrial devices."
      },
      {
        q: "Do you supply hardware?",
        a: "We partner with certified suppliers to recommend and bundle the right devices. Purchase and leasing arrangements can be included."
      }
    ],
    integrations: [
      {
        q: "Can ActARion integrate with our systems?",
        a: "Yes. We begin with a PoC to validate data flows, and offer APIs and custom integrations for ERP (e.g., SAP, Microsoft Dynamics 365), MES, LMS, and HR/quality systems."
      },
      {
        q: "What data can ActARion collect and analyze?",
        a: "Time-on-task and step duration, multiple-choice responses, user photos/videos, and digital checklists and numeric entries."
      },
      {
        q: "Is integration included by default?",
        a: "Basic API access is included. Complex integrations may require additional implementation support."
      },
      {
        q: "What is included in a Proof of Concept (PoC)?",
        a: "Scope target processes and workforce; baseline performance and waste; estimate improvement; define stakeholders and tech; evaluate outcomes to implement, iterate, or stop."
      },
      {
        q: "How does implementation work?",
        a: "We teach clients to own their digital guidance. Rollouts take ~2–6 months with a dedicated account manager and optional industry-specific implementation partners."
      }
    ],
    partnerships: [
      {
        q: "Do you work with partners?",
        a: "Yes. We collaborate with system integrators, training consultants, and solution providers across Europe. Our partner program includes training, co-selling, and integration support."
      },
      {
        q: "What support is offered after launch?",
        a: "Helpdesk with SLAs, feature updates every 3 weeks, and customer success reviews and feedback cycles."
      }
    ],
    value: [
      {
        q: "What value can ActARion bring and what ROI can we expect?",
        a: "Typical benefits: 50–75% faster onboarding, 80%+ fewer errors, reduced training costs, and improved compliance. Many clients see ROI in 6–12 months."
      },
      {
        q: "How do we build the business case?",
        a: "During prospecting and validated at PoC end, we quantify gains across onboarding time, SOP error rates, downtime, training cost, and expert dependency."
      },
      {
        q: "How does ActARion address workforce turnover and aging?",
        a: "We preserve expert knowledge digitally and make it instantly accessible to new hires—closing experience gaps and reducing operational risk."
      }
    ],
    modules: [
      {
        q: "Which modules does ActARion offer?",
        a: "Capture (expert knowledge), Studio (no-code 3D authoring), Holo Guidance (hands-free execution), Connect & Assistance (remote support), and Management Dashboard (skills & compliance)."
      },
      {
        q: "Capture",
        a: "Expert knowledge preservation via smart glasses to record the actions and instructions of experienced workers in real time, automatically generating documented procedures."
      },
      {
        q: "Studio",
        a: "A no-code web authoring tool for creating and updating 3D work instructions with real-time content and data updates."
      },
      {
        q: "Holo Guidance",
        a: "Hands-free viewing and data capture on smart glasses and mobile devices for on-the-go execution."
      },
      {
        q: "Connect & Assistance",
        a: "Real-time remote assistance so experts can guide operators live—reducing travel, solving issues faster, and minimizing errors."
      },
      {
        q: "Management Dashboard",
        a: "Skills and compliance management with usage insights to maintain audit readiness."
      }
    ]
  };

  const sections = [
    { id: 'general', title: 'General', data: faqData.general },
    { id: 'hardware', title: 'Hardware & Devices', data: faqData.hardware },
    { id: 'integrations', title: 'Software, Integrations & Launch', data: faqData.integrations },
    { id: 'partnerships', title: 'Partnerships', data: faqData.partnerships },
    { id: 'value', title: 'Value & Business Case', data: faqData.value },
    { id: 'modules', title: 'Modules', data: faqData.modules }
  ];

  return (
    <div className="min-h-screen bg-neutral-900 relative">
      {/* Sticky Background Image */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Image
          src="/ActARion header2.png"
          alt="ActARion Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                Everything you need to know about ActARion's AR platform for SOPs—devices, integrations, PoC and rollout, support, ROI, and modules.
              </p>
            </div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <nav className="flex flex-wrap gap-3 justify-center">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-neutral-800 hover:bg-cyan-600 text-white rounded-full text-sm font-medium transition-colors duration-200 border border-neutral-700 hover:border-cyan-500"
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </motion.div>

            {/* FAQ Sections */}
            <div className="space-y-12">
              {sections.map((section, sectionIndex) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  className="bg-neutral-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700"
                >
                  <h2 className="text-3xl font-bold text-cyan-400 mb-8 flex items-center">
                    <span className="mr-3">🔹</span>
                    {section.title}
                  </h2>
                  
                  <div className="space-y-4">
                    {section.data.map((item, questionIndex) => (
                      <motion.details
                        key={questionIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (sectionIndex * 0.1) + (questionIndex * 0.05) }}
                        className="group border border-neutral-700 rounded-lg overflow-hidden"
                      >
                        <summary className="cursor-pointer p-4 bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 font-semibold text-white flex items-center justify-between">
                          <span>{item.q}</span>
                          <span className="text-cyan-400 group-open:rotate-180 transition-transform duration-200">▼</span>
                        </summary>
                        <div className="p-4 bg-neutral-900 text-neutral-300 leading-relaxed">
                          {item.a}
                        </div>
                      </motion.details>
                    ))}
                  </div>

                  {/* Section-specific CTAs */}
                  {section.id === 'general' && (
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Link
                        href={locale === 'en' ? '/contact' : `/${locale}/contact`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg transition-colors duration-200"
                      >
                        Talk to an expert
                      </Link>
                      <Link
                        href={locale === 'en' ? '/demo' : `/${locale}/demo`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-cyan-500 hover:bg-cyan-500 hover:bg-opacity-10 text-cyan-400 hover:text-cyan-300 font-semibold rounded-lg transition-colors duration-200"
                      >
                        See a demo
                      </Link>
                    </div>
                  )}

                  {section.id === 'modules' && (
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Link
                        href={locale === 'en' ? '/contact' : `/${locale}/contact`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg transition-colors duration-200"
                      >
                        Start your PoC
                      </Link>
                      <Link
                        href={locale === 'en' ? '/about' : `/${locale}/about`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-cyan-500 hover:bg-cyan-500 hover:bg-opacity-10 text-cyan-400 hover:text-cyan-300 font-semibold rounded-lg transition-colors duration-200"
                      >
                        Research & Best Practices
                      </Link>
                    </div>
                  )}
                </motion.section>
              ))}
            </div>

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-16 bg-neutral-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700"
            >
              <p className="text-neutral-300 mb-6">
                Looking for something else? <Link href={locale === 'en' ? '/contact' : `/${locale}/contact`} className="text-cyan-400 hover:text-cyan-300 underline">Contact our team</Link>.
              </p>
            </motion.div>

            {/* Back to Home */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-center mt-8"
            >
              <Link
                href={locale === 'en' ? '/' : `/${locale}`}
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
              >
                ← Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 