"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { buildLocalizedPath, Locale } from "../../../config/site";
import { NEWS, NEWS_TYPE_LABELS, NewsType } from "../../../../content/news";

interface NewsPageClientProps {
  locale: Locale;
  dictionary: any;
}

export default function NewsPageClient({ locale, dictionary }: NewsPageClientProps) {
  const newsCopy = dictionary.pages?.news || {};
  const [selectedType, setSelectedType] = useState<NewsType | "all">("all");

  // Sort news by date (newest first)
  const sortedNews = [...NEWS].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  const filteredNews =
    selectedType === "all"
      ? sortedNews
      : sortedNews.filter((item) => item.type === selectedType);

  const newsTypes = Array.from(new Set(NEWS.map((n) => n.type)));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(
      locale === "de" ? "de-DE" : locale === "nl" ? "nl-NL" : "en-GB",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  return (
    <main className="section section-light text-slate-900">
      <div className="section-inner space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Introduction */}
          <div className="text-center mb-12 space-y-4">
            <p className="section-lead text-slate-600 max-w-3xl mx-auto">
              {newsCopy.intro ||
                "Stay up to date with the latest ActARion news, press releases, partnerships, and company announcements."}
            </p>
          </div>

          {/* Filter Tabs */}
          {newsTypes.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <button
                type="button"
                onClick={() => setSelectedType("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === "all"
                    ? "bg-actarion-blue text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {newsCopy.filterAll || "All"}
              </button>
              {newsTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedType === type
                      ? "bg-actarion-blue text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {newsCopy.types?.[type] || NEWS_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          )}

          {/* News List */}
          {filteredNews.length > 0 ? (
            <section className="mb-16">
              <div className="space-y-6">
                {filteredNews.map((newsItem, index) => (
                  <motion.article
                    key={newsItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="card flex flex-col md:flex-row gap-6"
                  >
                    {/* Image */}
                    {newsItem.image && (
                      <div className="md:w-48 md:flex-shrink-0">
                        <div className="relative aspect-video md:aspect-square bg-slate-100 rounded-lg overflow-hidden">
                          <Image
                            src={newsItem.image}
                            alt={newsItem.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 192px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-actarion-blue/10 text-actarion-blue">
                          {newsCopy.types?.[newsItem.type] || NEWS_TYPE_LABELS[newsItem.type]}
                        </span>
                        <span className="text-sm text-slate-500">
                          {formatDate(newsItem.publishedDate)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        {newsItem.title}
                      </h3>
                      <p className="text-slate-600 mb-4 flex-1">{newsItem.summary}</p>
                      {newsItem.externalUrl && (
                        <div>
                          <a
                            href={newsItem.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-actarion-blue font-medium hover:underline"
                          >
                            {newsCopy.readMore || "Read more"}
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          ) : (
            <section className="mb-16 text-center">
              <div className="card py-12">
                <p className="text-slate-500 text-lg">
                  {newsCopy.noNews ||
                    "No news available at the moment. Check back soon or subscribe to our newsletter to stay informed."}
                </p>
              </div>
            </section>
          )}

          {/* Newsletter CTA */}
          <section className="text-center">
            <div className="card bg-slate-50 border-slate-200">
              <h2 className="section-subheading text-actarion-blue mb-4">
                {newsCopy.ctaTitle || "Stay informed"}
              </h2>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                {newsCopy.ctaDescription ||
                  "Subscribe to our newsletter to receive the latest news, updates, and insights directly in your inbox."}
              </p>
              <Link href={buildLocalizedPath(locale, "contact")} className="btn btn-primary">
                {newsCopy.ctaButton || "Subscribe to Newsletter"}
              </Link>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}



