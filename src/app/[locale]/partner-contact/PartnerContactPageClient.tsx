"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { buildLocalizedPath, Locale } from "../../../config/site";
import { partners, getPartnersByType, Partner } from "../../../config/partners";
import {
  PARTNER_CONTACT_FORM_ENDPOINT,
  RATE_LIMIT_KEYS,
  RATE_LIMIT_DURATION,
} from "../../../config/loopsForms";

type FormStatus = "idle" | "loading" | "success" | "error" | "ratelimited";

interface PartnerContactPageClientProps {
  locale: Locale;
  dictionary: any;
}

function PartnerCard({ partner, locale }: { partner: Partner; locale: Locale }) {
  return (
    <Link
      href={buildLocalizedPath(locale, `partners/${partner.slug}`)}
      className="group relative flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-actarion-blue/30 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative mb-4 h-16 w-32">
        <Image
          src={partner.logoSrc}
          alt={partner.logoAlt}
          fill
          className="object-contain"
          sizes="128px"
        />
      </div>
      <p className="text-center font-semibold text-slate-800 group-hover:text-actarion-blue transition-colors">
        {partner.name}
      </p>
      <p className="mt-1 text-center text-sm text-slate-500">{partner.tagline}</p>
    </Link>
  );
}

function PartnerGrid({
  title,
  partners,
  locale,
}: {
  title: string;
  partners: Partner[];
  locale: Locale;
}) {
  if (partners.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-900">{title}</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <PartnerCard key={partner.slug} partner={partner} locale={locale} />
        ))}
      </div>
    </motion.section>
  );
}

export default function PartnerContactPageClient({
  locale,
  dictionary,
}: PartnerContactPageClientProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    partnerType: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting
    const now = Date.now();
    const previous = localStorage.getItem(RATE_LIMIT_KEYS.partnerContact);
    if (previous && Number(previous) + RATE_LIMIT_DURATION > now) {
      setStatus("ratelimited");
      setStatusMessage("Too many submissions. Please try again in a moment.");
      return;
    }

    localStorage.setItem(RATE_LIMIT_KEYS.partnerContact, String(now));
    setStatus("loading");
    setStatusMessage("");

    try {
      const body = new URLSearchParams({
        email: formData.email,
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        partnerType: formData.partnerType,
        message: formData.message,
        userGroup: "",
        mailingLists: "",
      });

      const response = await fetch(PARTNER_CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const data = await response
        .clone()
        .json()
        .catch(() => ({} as Record<string, string>));

      if (!response.ok) {
        throw new Error(data?.message || response.statusText);
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        partnerType: "",
        message: "",
      });
    } catch (error) {
      const err = error as Error;
      if (err?.message === "Failed to fetch") {
        setStatus("ratelimited");
        setStatusMessage("Too many submissions. Please try again in a moment.");
        return;
      }

      setStatus("error");
      setStatusMessage(err?.message || "Something went wrong. Please try again.");
      localStorage.removeItem(RATE_LIMIT_KEYS.partnerContact);
    }
  };

  const technologyPartners = getPartnersByType("technology");
  const implementationPartners = getPartnersByType("implementation");
  const educationPartners = getPartnersByType("education");

  return (
    <main className="section section-light text-slate-900">
      <div className="section-inner space-y-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-600 mb-6">
              {dictionary.pages?.partnerContact?.intro || "Our partners play different roles in helping organisations adopt AI and AR for smarter, safer and faster operations:"}
            </p>
            <div className="grid gap-6 md:grid-cols-3 mb-10">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-actarion-blue/10">
                  <svg className="h-6 w-6 text-actarion-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{dictionary.pages?.partnerContact?.partnerTypes?.technology?.title || "Technology vendors"}</h3>
                <p className="text-slate-600 text-sm">
                  {dictionary.pages?.partnerContact?.partnerTypes?.technology?.description || "Provide the AR, XR and AI platforms and devices that power our solutions."}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-actarion-blue/10">
                  <svg className="h-6 w-6 text-actarion-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{dictionary.pages?.partnerContact?.partnerTypes?.implementation?.title || "Implementation partners"}</h3>
                <p className="text-slate-600 text-sm">
                  {dictionary.pages?.partnerContact?.partnerTypes?.implementation?.description || "Help design processes, change programmes and roll-outs around HR, operations and change management."}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-actarion-blue/10">
                  <svg className="h-6 w-6 text-actarion-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{dictionary.pages?.partnerContact?.partnerTypes?.education?.title || "Education partners"}</h3>
                <p className="text-slate-600 text-sm">
                  {dictionary.pages?.partnerContact?.partnerTypes?.education?.description || "Help organisations embed new ways of working through training, academies and learning programmes."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partner Grids */}
        <PartnerGrid
          title={dictionary.pages?.partnerContact?.gridTitles?.technology || "Technology partners"}
          partners={technologyPartners}
          locale={locale}
        />
        <PartnerGrid
          title={dictionary.pages?.partnerContact?.gridTitles?.implementation || "Implementation partners"}
          partners={implementationPartners}
          locale={locale}
        />
        <PartnerGrid
          title={dictionary.pages?.partnerContact?.gridTitles?.education || "Education partners"}
          partners={educationPartners}
          locale={locale}
        />

        {/* Partner with ActARion Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 border-t border-slate-200 pt-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              {dictionary.pages?.partnerContact?.becomePartner?.title || "Partner with ActARion"}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {dictionary.pages?.partnerContact?.becomePartner?.description || "Interested in becoming a partner or exploring a joint project for your customers? Share a few details and we will schedule a short discovery call."}
            </p>
          </div>

          <div className="card p-8 text-slate-900">
            {status !== "success" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      {dictionary.pages.partnerContact.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60"
                      placeholder={dictionary.pages.partnerContact.form.name}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      {dictionary.pages.partnerContact.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60"
                      placeholder={dictionary.pages.partnerContact.form.email}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      {dictionary.pages.partnerContact.form.company}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60"
                      placeholder={dictionary.pages.partnerContact.form.company}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      {dictionary.pages.partnerContact.form.phone}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60"
                      placeholder={dictionary.pages.partnerContact.form.phone}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="partnerType"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    {dictionary.pages?.partnerContact?.form?.partnerTypeLabel || "Partnership type"}
                  </label>
                  <select
                    id="partnerType"
                    name="partnerType"
                    value={formData.partnerType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60"
                  >
                    <option value="">{dictionary.pages?.partnerContact?.form?.partnerTypePlaceholder || "Select a partnership type"}</option>
                    <option value="technology">{dictionary.pages?.partnerContact?.form?.partnerTypeOptions?.technology || "Technology vendor"}</option>
                    <option value="implementation">{dictionary.pages?.partnerContact?.form?.partnerTypeOptions?.implementation || "Implementation partner"}</option>
                    <option value="education">{dictionary.pages?.partnerContact?.form?.partnerTypeOptions?.education || "Education partner"}</option>
                    <option value="other">{dictionary.pages?.partnerContact?.form?.partnerTypeOptions?.other || "Other / Not sure yet"}</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    {dictionary.pages.partnerContact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60"
                    placeholder={dictionary.pages.partnerContact.form.message}
                  ></textarea>
                </div>

                {(status === "error" || status === "ratelimited") && (
                  <p className="text-red-500 text-sm text-center">{statusMessage}</p>
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn btn-primary btn-pill px-8 py-3 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Sending..." : dictionary.pages.partnerContact.form.submit}
                  </button>
                </div>
              </form>
            ) : (
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
            )}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
