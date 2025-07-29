"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FAQPage() {
  const faqSections = [
    {
      title: "General",
      questions: [
        {
          q: "What is ActARion?",
          a: "ActARion is an augmented reality (AR) platform that transforms traditional Standard Operating Procedures (SOPs) into visual, interactive workflows. It enables teams to deliver on-the-job training, real-time guidance, and knowledge capture at scale—across mobile devices and smart glasses."
        },
        {
          q: "Who is ActARion for?",
          a: "ActARion is built for industrial companies—manufacturers, field service providers, logistics firms, and utilities—looking to improve efficiency, safety, and quality at the frontline."
        },
        {
          q: "What makes ActARion different?",
          a: "Unlike text-heavy SOPs or disconnected training systems, ActARion offers: No-code creation of 3D and AR work instructions, Cross-device deployment on mobile, tablet, and smart glasses, Integrated remote support and feedback loops, Centralized knowledge management for teams and shifts."
        }
      ]
    },
    {
      title: "Hardware & Devices",
      questions: [
        {
          q: "Which hardware is compatible with ActARion?",
          a: "ActARion supports: Smart glasses: Microsoft HoloLens 2, Apple Vision Pro, Smartphones and tablets: iOS and Android, Rugged devices for industrial use."
        },
        {
          q: "Do you supply hardware?",
          a: "We do not resell hardware but work with certified partners to recommend and bundle supported devices tailored to your operational environment."
        }
      ]
    },
    {
      title: "Software & Integrations",
      questions: [
        {
          q: "Can ActARion integrate with our existing systems?",
          a: "Yes. We offer API support and custom integration services for: ERP (e.g., SAP, Microsoft Dynamics 365), MES systems, Learning Management Systems (LMS), HR and quality systems."
        },
        {
          q: "What data can be collected and analyzed?",
          a: "Our platform captures: Time-on-task and step duration, Multiple-choice responses, User-generated photos and videos, Digital checklists and numeric entries."
        },
        {
          q: "Is integration included by default?",
          a: "Basic APIs are included. More complex integrations may require implementation support or customization services."
        }
      ]
    },
    {
      title: "Implementation & Partnerships",
      questions: [
        {
          q: "What does implementation look like?",
          a: "A typical rollout takes 2–6 months, depending on your goals. Each client receives a dedicated account manager to oversee onboarding and deployment."
        },
        {
          q: "Do you work with implementation partners?",
          a: "Yes. We collaborate with system integrators, training consultants, and solution providers across Europe."
        },
        {
          q: "I&apos;m interested in becoming a partner. What&apos;s the process?",
          a: "Reach out to learn more about the ActARion Partner Program, which includes training, co-selling, and integration support for resellers and service providers."
        },
        {
          q: "What kind of support is offered after launch?",
          a: "We provide: Helpdesk support with SLA options, Feature updates every 3 weeks, Customer success reviews and feedback cycles."
        }
      ]
    },
    {
      title: "Value & Business Case",
      questions: [
        {
          q: "What&apos;s the added value of ActARion?",
          a: "ActARion helps your business: Accelerate onboarding by 50–75%, Reduce operational errors by over 80%, Capture expert knowledge visually, Enable self-guided execution on the floor, Improve compliance and certification tracking."
        },
        {
          q: "How can I build a business case for ActARion?",
          a: "Evaluate impact in areas like: Time to onboard (4-6 weeks → 1-2 weeks), SOP error rate (10-15% → <2%), Monthly downtime per team (8-10 hours → <2 hours), Training cost per employee (€1,000–€2,000 → up to 50% savings), Expert dependency (High → Reduced)."
        },
        {
          q: "What ROI can I expect?",
          a: "Most clients achieve ROI within 6–12 months through: Increased productivity, Fewer support escalations, Shorter time-to-competence, Improved quality and safety metrics."
        },
        {
          q: "How does ActARion address workforce turnover and aging?",
          a: "We help organizations retain critical knowledge digitally and make it available to new employees instantly—closing the experience gap and minimizing operational risk."
        }
      ]
    },
    {
      title: "Content Creation & Training",
      questions: [
        {
          q: "Do I need coding experience to use ActARion?",
          a: "Not at all. Our no-code web authoring tool lets trainers and subject-matter experts build and deploy interactive AR instructions quickly."
        },
        {
          q: "Can I use ActARion for compliance training?",
          a: "Yes. You can define certification paths, track user progress, and log assessments for compliance and audits."
        },
        {
          q: "Is the platform multilingual?",
          a: "Yes, we support content creation and delivery in multiple languages—ideal for international and multicultural teams."
        },
        {
          q: "Does ActARion support remote assistance?",
          a: "Yes. Experts can assist frontline workers in real-time via live video and AR overlays for troubleshooting and mentoring."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-900 relative">
      {/* Sticky Background Image */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(/ActARion header2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-0" />
      
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
                Everything you need to know about ActARion&apos;s augmented reality platform for industrial SOPs and training
              </p>
            </div>

            {/* FAQ Sections */}
            <div className="space-y-12">
              {faqSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  className="bg-neutral-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700"
                >
                  <h2 className="text-3xl font-bold text-cyan-400 mb-8 flex items-center">
                    <span className="mr-3">🔹</span>
                    {section.title}
                  </h2>
                  
                  <div className="space-y-8">
                    {section.questions.map((item, questionIndex) => (
                      <motion.div
                        key={questionIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (sectionIndex * 0.1) + (questionIndex * 0.05) }}
                        className="border-l-4 border-cyan-500 pl-6"
                      >
                        <h3 className="text-xl font-semibold text-white mb-3">
                          {questionIndex + 1}. {item.q}
                        </h3>
                        <p className="text-neutral-300 leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-16 bg-neutral-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-neutral-300 mb-6">
                Ready to see ActARion in action? Schedule a personalized demo to explore how our platform can transform your operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Schedule a Demo
                </Link>
                <Link
                  href="/partner-contact"
                  className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-cyan-500 hover:bg-cyan-500 hover:bg-opacity-10 text-cyan-400 hover:text-cyan-300 font-semibold rounded-lg transition-colors duration-200"
                >
                  Become a Partner
                </Link>
              </div>
            </motion.div>

            {/* Back to Home */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-center mt-8"
            >
              <Link
                href="/"
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