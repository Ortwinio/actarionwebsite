"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface AboutPageClientProps {
  locale: string;
  dictionary: any;
}

export default function AboutPageClient({ locale, dictionary }: AboutPageClientProps) {
  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans">
      {/* Sticky Background Image */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Image
          src="/ActARion header2.png"
          alt="ActARion Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
              {dictionary.pages.about.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
              {dictionary.pages.about.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-neutral-900 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 mb-8"
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              {dictionary.pages.about.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          >
            <div className="bg-neutral-900 bg-opacity-50 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                {dictionary.pages.about.mission}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {dictionary.pages.about.missionText}
              </p>
            </div>
            <div className="bg-neutral-900 bg-opacity-50 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                {dictionary.pages.about.partners}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {dictionary.pages.about.partnersText}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <Link
              href={locale === 'en' ? '/partner-contact' : `/${locale}/partner-contact`}
              className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-colors mb-6"
            >
              {dictionary.sections.partnerships.cta}
            </Link>
            <div>
              <Link
                href={locale === 'en' ? '/' : `/${locale}`}
                className="text-cyan-400 hover:underline text-base font-medium"
              >
                {dictionary.pages.about.backToHome}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 