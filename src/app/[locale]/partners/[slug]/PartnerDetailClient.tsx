"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { buildLocalizedPath, Locale } from "../../../../config/site";
import { Partner } from "../../../../config/partners";
import { PartnerContent } from "../../../../config/partnerContent";

interface PartnerDetailClientProps {
  locale: Locale;
  partner: Partner;
  content: PartnerContent;
  dictionary: any;
}

export default function PartnerDetailClient({
  locale,
  partner,
  content,
  dictionary,
}: PartnerDetailClientProps) {
  return (
    <main className="section section-light text-slate-900">
      <div className="section-inner max-w-4xl mx-auto">
        {/* Partner Logo and External Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-200"
        >
          <div className="relative h-20 w-48">
            <Image
              src={partner.logoSrc}
              alt={partner.logoAlt}
              fill
              className="object-contain"
              sizes="192px"
            />
          </div>
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-actarion-blue hover:underline font-medium"
          >
            Visit {partner.name}
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="prose prose-lg max-w-none mb-12"
        >
          {content.intro.map((paragraph, index) => (
            <p key={index} className="text-xl text-slate-600 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Sections */}
        {content.sections.map((section, sectionIndex) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * sectionIndex }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {section.title}
            </h2>
            <ul className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex items-start gap-3 text-slate-600"
                >
                  <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full bg-actarion-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        ))}

        {/* Use Cases */}
        {content.useCases && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {content.useCases.title}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.useCases.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-slate-600"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-actarion-blue"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl border border-actarion-blue/20 bg-actarion-blue/5 p-8 text-center"
        >
          <p className="text-lg text-slate-700 mb-6">{content.cta.text}</p>
          <Link
            href={buildLocalizedPath(locale, content.cta.buttonHref)}
            className="btn btn-primary btn-pill px-8 py-3 text-lg"
          >
            {content.cta.buttonText}
          </Link>
        </motion.section>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-8"
        >
          <Link
            href={buildLocalizedPath(locale, "partner-contact")}
            className="inline-flex items-center gap-2 text-actarion-blue hover:underline font-medium"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all partners
          </Link>
          <Link
            href={buildLocalizedPath(locale, "use-cases")}
            className="inline-flex items-center gap-2 text-actarion-blue hover:underline font-medium"
          >
            Explore use cases
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}


