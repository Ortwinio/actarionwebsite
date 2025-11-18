"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { buildLocalizedPath, Locale } from "../../../config/site";

interface PartnerContactPageClientProps {
  locale: Locale;
  dictionary: any;
}

export default function PartnerContactPageClient({ locale, dictionary }: PartnerContactPageClientProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const introHeading =
    dictionary.pages.partnerContact.introHeading ?? "Share a bit about your partnership idea";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="section section-light text-slate-900">
      <div className="section-inner space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            {introHeading}
          </h2>
          <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto">
            {dictionary.pages.partnerContact.subtitle}
          </p>
          <p className="text-lg text-slate-600 mt-4">
            {dictionary.pages.partnerContact.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card p-8 text-slate-900"
        >
          {!isSubmitted && isClient ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    {dictionary.pages.partnerContact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60"
                    placeholder={dictionary.pages.partnerContact.form.name}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    {dictionary.pages.partnerContact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60"
                    placeholder={dictionary.pages.partnerContact.form.email}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                    {dictionary.pages.partnerContact.form.company}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60"
                    placeholder={dictionary.pages.partnerContact.form.company}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    {dictionary.pages.partnerContact.form.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60"
                    placeholder={dictionary.pages.partnerContact.form.phone}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  {dictionary.pages.partnerContact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60"
                  placeholder={dictionary.pages.partnerContact.form.message}
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-pill px-8 py-3 text-lg"
                >
                  {dictionary.pages.partnerContact.form.submit}
                </button>
              </div>
            </form>
          ) : isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-actarion-blue mb-4">
                {dictionary.pages.partnerContact.form.success}
              </h2>
              <Link
                href={buildLocalizedPath(locale)}
                className="text-actarion-blue hover:underline text-base font-medium"
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
    </main>
  );
} 