"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface PartnerContactPageClientProps {
  locale: string;
  dictionary: any;
}

export default function PartnerContactPageClient({ locale, dictionary }: PartnerContactPageClientProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans">
      {/* Sticky Background Image */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Image
          src="/ActARion header1.png"
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
              {dictionary.pages.partnerContact.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
              {dictionary.pages.partnerContact.subtitle}
            </p>
            <p className="text-lg text-gray-400 mt-4">
              {dictionary.pages.partnerContact.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-neutral-900 bg-opacity-50 backdrop-blur-sm rounded-lg p-8"
          >
            {!isSubmitted && isClient ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      {dictionary.pages.partnerContact.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder={dictionary.pages.partnerContact.form.name}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      {dictionary.pages.partnerContact.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder={dictionary.pages.partnerContact.form.email}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      {dictionary.pages.partnerContact.form.company}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder={dictionary.pages.partnerContact.form.company}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      {dictionary.pages.partnerContact.form.phone}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder={dictionary.pages.partnerContact.form.phone}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    {dictionary.pages.partnerContact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder={dictionary.pages.partnerContact.form.message}
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-colors"
                  >
                    {dictionary.pages.partnerContact.form.submit}
                  </button>
                </div>
              </form>
            ) : isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                  {dictionary.pages.partnerContact.form.success}
                </h2>
                <Link
                  href={locale === 'en' ? '/' : `/${locale}`}
                  className="text-cyan-400 hover:underline text-base font-medium"
                >
                  {dictionary.pages.partnerContact.backToHome}
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-pulse">Loading...</div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 