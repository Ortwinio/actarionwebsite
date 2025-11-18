"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { faqSections, FAQAnswer } from "../../../config/faqContent";
import { buildLocalizedPath, Locale } from "../../../config/site";

interface FAQPageClientProps {
  locale: Locale;
  dictionary: any;
}

export default function FAQPageClient({ locale, dictionary }: FAQPageClientProps) {
  const introHeading =
    dictionary?.pages?.faq?.introHeading ?? "Answers to the most common questions";
  const pageDescription =
    dictionary?.pages?.faq?.description ??
    "Why industrial, logistics and energy companies choose AR-first, AI-guided work instructions, plus the use cases, rollout steps and ways to get started with ActARion.";

  const demoHref = buildLocalizedPath(locale, "demo");
  const contactHref = buildLocalizedPath(locale, "contact");
  const homeHref = buildLocalizedPath(locale);

  const renderAnswer = (answer: FAQAnswer) => (
    <div className="space-y-4">
      {answer.paragraphs?.map((paragraph, index) => (
        <p key={`paragraph-${index}`}>{paragraph}</p>
      ))}
      {answer.lists?.map((list, index) => {
        const ListTag = list.ordered ? "ol" : "ul";
        return (
          <div key={`list-${index}`} className="space-y-2">
            {list.title && (
              <p className="font-semibold text-slate-900">{list.title}</p>
            )}
            <ListTag
              className={`${
                list.ordered ? "list-decimal" : "list-disc"
              } list-inside space-y-1`}
            >
              {list.items.map((item, itemIndex) => (
                <li key={`list-${index}-item-${itemIndex}`}>{item}</li>
              ))}
            </ListTag>
          </div>
        );
      })}
    </div>
  );

  return (
    <main className="section section-light text-slate-900">
      <div className="section-inner space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div className="text-center space-y-4">
            <h2 className="section-heading text-actarion-blue">{introHeading}</h2>
            <p className="section-lead text-slate-800 max-w-3xl mx-auto">{pageDescription}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <nav className="flex flex-wrap gap-3 justify-center">
              {faqSections.map(section => (
                <button
                  key={section.id}
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn btn-secondary btn-pill text-actarion-blue border-actarion-blue/40 hover:bg-actarion-blue hover:text-white"
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </motion.div>

          <div className="space-y-12">
            {faqSections.map((section, sectionIndex) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                className="card space-y-6 text-slate-900"
              >
                <h2 className="section-subheading text-actarion-blue flex items-center gap-2">
                  <span role="img" aria-hidden="true">🔹</span>
                  {section.title}
                </h2>
                
                <div className="space-y-4">
                  {section.items.map((item, questionIndex) => (
                    <motion.details
                      key={item.question}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (sectionIndex * 0.1) + (questionIndex * 0.05) }}
                      className="group rounded-lg border border-slate-200 overflow-hidden bg-white"
                    >
                      <summary className="summary summary--interactive">
                        <span>{item.question}</span>
                        <span className="text-actarion-blue group-open:rotate-180 transition-transform duration-200">▼</span>
                      </summary>
                      <div className="p-4 leading-relaxed bg-transparent text-slate-700">
                        {renderAnswer(item.answer)}
                      </div>
                    </motion.details>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="summary summary--cta text-center text-actarion-blue"
          >
            <p className="section-lead text-actarion-blue/90">
              Curious what AR and AI-guided work could look like in your operations?
            </p>
            <p className="section-subheading text-actarion-blue mb-2">
              Schedule a demo or discovery call with ActARion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <Link href={demoHref} className="btn btn-primary btn-pill">
                Schedule a demo
              </Link>
              <Link href={contactHref} className="btn btn-secondary btn-pill">
                Book a discovery call
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-8"
          >
            <Link
              href={homeHref}
              className="btn btn-link"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 