"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon, UserGroupIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

interface CareerPageClientProps {
  locale: string;
  dictionary: any;
}

export default function CareerPageClient({ locale, dictionary }: CareerPageClientProps) {
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
              {dictionary.pages.career.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
              {dictionary.pages.career.subtitle}
            </p>
            <p className="text-lg text-gray-400 mt-4">
              {dictionary.pages.career.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-neutral-900 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BriefcaseIcon className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">
                {dictionary.pages.career.positions.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(dictionary.pages.career.positions).map(([key, position]: [string, any]) => {
                if (key === 'title') return null;
                return (
                  <div key={key} className="bg-neutral-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                      {position.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {position.description}
                    </p>
                    <ul className="space-y-2">
                      {position.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircleIcon className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-neutral-900 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <UserGroupIcon className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">
                {dictionary.pages.career.culture.title}
              </h2>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              {dictionary.pages.career.culture.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-neutral-900 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 mb-6">
              <p className="text-lg text-gray-300 mb-4">
                {dictionary.pages.career.contact}
              </p>
              <a
                href="mailto:careers@actarion.com"
                className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-colors"
              >
                careers@actarion.com
              </a>
            </div>
            <Link
              href={locale === 'en' ? '/' : `/${locale}`}
              className="text-cyan-400 hover:underline text-base font-medium"
            >
              {dictionary.pages.career.backToHome}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 