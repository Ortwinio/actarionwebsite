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
        a: "We believe frontline (blue-collar workers) deserve the same level of innovation as the white-collar workers in the office. By empowering them with the right tools, we can boost their productivity, ensure safety, and maintain quality—turning procedures into real-world performance."
      },
      {
        q: "How do we work?",
        a: "We do this by transforming traditional, text-heavy Standard Operating Procedures into visual, interactive workflows. Our platform makes it easy to create no-code 3D and AR work instructions, deploy them across devices, integrate live remote support, capture feedback, and manage knowledge centrally—keeping teams aligned across shifts and locations."
      },
      {
        q: "What do we deliver?",
        a: "ActARion is an Augmented Reality (AR) platform for industrial companies—manufacturers, field service providers, logistics firms, and utilities—that want to deliver on-the-job training, real-time guidance, and knowledge captured at scale, accessible via mobile devices, tablets, and smart glasses."
      }
    ],
    hardware: [
      {
        q: "Compatible Hardware",
        a: "ActARion works seamlessly with:\n• Smart Glasses: Microsoft HoloLens 2, Apple Vision Pro\n• Smartphones & Tablets: iOS and Android\n• Rugged Industrial Devices for demanding environments"
      },
      {
        q: "Hardware Supply",
        a: "We don't resell hardware directly. Instead, we partner with certified suppliers to recommend and bundle the right devices for your operational needs. Purchase and lease arrangements can be part of our offering."
      }
    ],
    integrations: [
      {
        q: "Can ActARion integrate with our existing systems?",
        a: "Yes. We work with diverse clients and connect to primary data flows within your organization. To ensure data is properly identified, collected, and applied, every engagement begins with a Proof of Concept (PoC).\n\nWe offer API support and custom integration services for:\n• ERP (e.g., SAP, Microsoft Dynamics 365)\n• MES systems\n• Learning Management Systems (LMS)\n• HR and quality systems\n\nIntegration requirements are typically discussed during the prospecting and scoping stage."
      },
      {
        q: "What data can be collected and analyzed?",
        a: "ActARion can capture and analyze:\n• Time-on-task and step duration\n• Multiple-choice responses\n• User-generated photos and videos\n• Digital checklists and numeric entries"
      },
      {
        q: "Is integration included by default?",
        a: "Basic API access is included. More complex integrations may require additional implementation support or custom development."
      },
      {
        q: "What's included in a Proof of Concept (PoC)?",
        a: "• Identify targeted processes and workforce\n• Record current performance and waste (e.g., waiting time, onboarding, rework, scrap)\n• Estimate potential improvement and required measures\n• Define people, technology, departments, and contextual factors involved\n• Set the scope of the project\n\nThe PoC concludes with an evaluation, determining whether to:\na) Continue to full implementation\nb) Start a new iteration\nc) End the project if results are insufficient"
      },
      {
        q: "Implementation (your guidance, your control)",
        a: "We teach clients to own their digital guidance. During implementation, we scale up usage and ensure your team can independently operate the application. Also, during the implementation stage, we can learn 1 or more experts in your organization how to adjust the application and generate new applications so you can create and optimize further in your organization and processes.\n\nActARion works with implementation partners who have deep industry-specific knowledge and experience. A typical rollout takes 2–6 months, depending on your goals. Each client receives a dedicated account manager to oversee onboarding and deployment."
      }
    ],
    partnerships: [
      {
        q: "Do you work with implementation partners?",
        a: "Yes. We collaborate with system integrators, training consultants, and solution providers across Europe."
      },
      {
        q: "Interested in becoming a partner?",
        a: "Reach out to learn more about the ActARion Partner Program, which includes training, co-selling, and integration support for resellers and service providers."
      },
      {
        q: "What kind of support is offered after launch?",
        a: "We provide:\n• Helpdesk support with SLA options\n• Feature updates every 3 weeks\n• Customer success reviews and feedback cycles"
      }
    ],
    value: [
      {
        q: "What value can ActARion bring?",
        a: "At ActARion, we believe co-working only makes sense if we can add measurable value to your business. That's why our first priority is to assess the potential impact together—ensuring there's a strong business case before we proceed.\n\nActARion helps organizations:\n• Accelerate onboarding by 50–75%\n• Reduce operational errors by over 80%\n• Capture expert knowledge visually\n• Enable self-guided execution on the floor\n• Improve compliance and certification tracking"
      },
      {
        q: "Building the Business Case",
        a: "Does the current situation legitimate the investments or not. When evaluating a fit, we analyze improvement potential in:\n• Onboarding time: 4–6 weeks → 1–2 weeks\n• SOP error rate: 10–15% → <2%\n• Downtime per team: 8–10 hrs/month → <2 hrs/month\n• Training cost per employee: €1,000–€2,000 → up to 50% savings\n• Expert dependency: High → Reduced\n\nWe build this business case in the Prospecting stage. Also to foresee a potential mutual business fit. The business case is evaluated at the end of the Proof of Concept."
      },
      {
        q: "Expected ROI",
        a: "Most clients see ROI in 6–12 months, driven by:\n• Higher productivity\n• Fewer support escalations\n• Shorter time-to-competence\n• Improved quality and safety metrics\n\nWe recommend strongly to internally asses a few variables and research the actual performance. Here you find an Example of an Value assessment Template (link)."
      },
      {
        q: "Tackling Workforce Turnover & Aging",
        a: "We help you retain critical expertise digitally and make it instantly accessible to new hires—closing the experience gap and reducing operational risk."
      },
      {
        q: "Additional sources backing the ROI",
        a: "We recognize that every industry and organization faces unique types of 'waste or muda', improvement potential, and levels of agility. To make fair potential estimates, we draw on client reference cases. Also collective research from AREA – the Augmented Reality for Enterprise Alliance (www.thearea.org) is helpful. AREA is the global non-profit alliance helping enterprises adopt interoperable AR faster with resources, impartial guidance, and research."
      },
      {
        q: "Research and Best practices",
        a: "We understand that learning can only happen collectively. Therefore, we share links to impact research in general and per industry. Link: Research and Best Practices."
      }
    ],
    modules: [
      {
        q: "What modules do ActARion offer?",
        a: "ActARion offers five core modules designed to transform your operations:"
      },
      {
        q: "Capture",
        a: "Expert knowledge preservation\nUses smart glasses to record the actions and instructions of experienced workers in real time, automatically generating documented procedures."
      },
      {
        q: "Studio",
        a: "Code-free web authoring tool for 3D instructions\nEnables the creation and updating of 3D work instructions without coding, with real-time content and data updates."
      },
      {
        q: "Holo Guidance",
        a: "Hands-free viewing and data capture\nApp for smart glasses and mobile devices that lets workers view instructions and record operational data on the go."
      },
      {
        q: "Connect & Assistance",
        a: "Real-time remote assistance\nAllows experts to guide operators live through their tasks, reducing travel, solving problems faster, minimizing errors, and improving efficiency."
      },
      {
        q: "Management Dashboard",
        a: "Dashboard for skills management\nTracks workforce competencies and usage of tooling, ensures compliance, and maintains audit readiness."
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
                        <div className="p-4 bg-neutral-900 text-neutral-300 leading-relaxed whitespace-pre-line">
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

                  {section.id === 'value' && (
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Link
                        href={locale === 'en' ? '/contact' : `/${locale}/contact`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg transition-colors duration-200"
                      >
                        Get Value Assessment
                      </Link>
                      <Link
                        href={locale === 'en' ? '/about' : `/${locale}/about`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-cyan-500 hover:bg-cyan-500 hover:bg-opacity-10 text-cyan-400 hover:text-cyan-300 font-semibold rounded-lg transition-colors duration-200"
                      >
                        Research & Best Practices
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
                        Learn More About Modules
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