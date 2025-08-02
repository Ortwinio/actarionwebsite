"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface FAQPageClientProps {
  locale: string;
  dictionary: any;
}

export default function FAQPageClient({ locale, dictionary }: FAQPageClientProps) {
  const faqSections = [
    dictionary.pages.faq.sections.general,
    dictionary.pages.faq.sections.hardware,
    dictionary.pages.faq.sections.software,
    dictionary.pages.faq.sections.implementation,
    dictionary.pages.faq.sections.value,
    dictionary.pages.faq.sections.content
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
                {dictionary.pages.faq.title}
              </h1>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                {dictionary.pages.faq.subtitle}
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
                    {section.questions.map((item: any, questionIndex: number) => (
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
                {dictionary.pages.faq.cta.title}
              </h3>
              <p className="text-neutral-300 mb-6">
                {dictionary.pages.faq.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={locale === 'en' ? '/contact' : `/${locale}/contact`}
                  className="inline-flex items-center px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  {dictionary.pages.faq.cta.demo}
                </Link>
                <Link
                  href={locale === 'en' ? '/partner-contact' : `/${locale}/partner-contact`}
                  className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-cyan-500 hover:bg-cyan-500 hover:bg-opacity-10 text-cyan-400 hover:text-cyan-300 font-semibold rounded-lg transition-colors duration-200"
                >
                  {dictionary.pages.faq.cta.partner}
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
                href={locale === 'en' ? '/' : `/${locale}`}
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
              >
                ← {dictionary.pages.faq.backToHome}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 