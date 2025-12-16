"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { buildLocalizedPath, Locale } from "../../../config/site";
import {
  CONTACT_FORM_ENDPOINT,
  RATE_LIMIT_KEYS,
  RATE_LIMIT_DURATION,
} from "../../../config/loopsForms";

type FormStatus = "idle" | "loading" | "success" | "error" | "ratelimited";

interface ContactPageClientProps {
  locale: Locale;
  dictionary: any;
}

export default function ContactPageClient({ locale, dictionary }: ContactPageClientProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    topic: '',
    message: '',
    phone: '',
    country: '',
    privacyConsent: false
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Work email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.topic) newErrors.topic = 'Please select a topic';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.privacyConsent) newErrors.privacyConsent = 'Privacy consent is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Rate limiting
    const now = Date.now();
    const previous = localStorage.getItem(RATE_LIMIT_KEYS.contact);
    if (previous && Number(previous) + RATE_LIMIT_DURATION > now) {
      setStatus("ratelimited");
      setStatusMessage("Too many submissions. Please try again in a moment.");
      return;
    }

    localStorage.setItem(RATE_LIMIT_KEYS.contact, String(now));
    setStatus("loading");
    setStatusMessage("");

    try {
      const body = new URLSearchParams({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        topic: formData.topic,
        message: formData.message,
        phone: formData.phone,
        country: formData.country,
        userGroup: "",
        mailingLists: "",
      });

      const response = await fetch(CONTACT_FORM_ENDPOINT, {
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
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        topic: '',
        message: '',
        phone: '',
        country: '',
        privacyConsent: false
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
      localStorage.removeItem(RATE_LIMIT_KEYS.contact);
    }
  };

  return (
    <main className="section section-light text-slate-900">
      <div className="section-inner space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16 space-y-4">
            <h2 className="section-heading">
              Schedule a discovery call or demo
            </h2>
            <p className="section-lead text-slate-600 max-w-3xl mx-auto">
              Smarter, safer and faster work with AI and Augmented Reality
            </p>
            <div className="space-y-4 text-base text-slate-600 max-w-3xl mx-auto">
              <p>
                Ready to explore how AR and AI-guided work could fit into your operations?
              </p>
              <p>
                At ActARion we help industrial, logistics and energy companies turn complex procedures into clear, visual guidance. Together with our partner DeepSight we support teams in maintenance, production and field operations with AI and AR–guided work instructions that make work more consistent, safer and easier to learn.
              </p>
              <p>
                Use the form below to schedule a discovery call or a demo. We&apos;ll get back to you as soon as possible.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="card space-y-4 text-slate-700">
                <h2 className="section-subheading text-actarion-blue">
                  Why contact ActARion?
                </h2>
                <p className="text-lg">
                  Organisations typically reach out to us when they want to:
                </p>
                <ul className="mt-4 space-y-4">
                  {[
                    "Reduce errors and unplanned downtime in critical processes",
                    "Shorten onboarding and cross-training for new or rotating staff",
                    "Standardise work across sites and shift teams",
                    "Capture expert knowledge before it walks out the door",
                    "Make safety and compliance procedures easier to follow and audit",
                    "Explore practical use cases for AR and AI in day-to-day operations",
                  ].map((item) => (
                    <li key={item} className="flex items-start space-x-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-actarion-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  If this sounds familiar, a 30–45 minute conversation is often enough to identify a few concrete use cases and next steps.
                </p>
              </div>

              <div className="card space-y-4 text-slate-700">
                <h2 className="section-subheading text-actarion-blue">
                  What we can discuss in a call
                </h2>
                <p className="text-lg">
                  In a discovery call or demo we can:
                </p>
                <ul className="mt-4 space-y-4">
                  {[
                    "Walk through your current training, work instructions and troubleshooting approach",
                    "Show how AR and AI-guided workflows look on mobile devices and smart glasses",
                    "Share examples from similar companies and typical results they see",
                    "Identify 2–3 use cases that could be a good starting point for a pilot",
                  ].map((item) => (
                    <li key={item} className="flex items-start space-x-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-actarion-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  You decide whether we focus more on technology, process, use cases or business impact.
                </p>
              </div>

              <div className="card space-y-4 text-slate-700">
                <h2 className="section-subheading text-actarion-blue">
                  How to reach us
                </h2>
                <p className="text-lg">
                  Use the form to share a few details:
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Name",
                    "Company",
                    "Email",
                    "Message (for example: topics you'd like to discuss, preferred timing, and whether you want a demo or a general exploration)",
                  ].map((item) => (
                    <li key={item} className="flex items-start space-x-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-actarion-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-lg">
                  Once we receive your message, we will:
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Review your request",
                    "Get back to you by email to propose a time",
                    "Prepare a call or demo tailored to your situation",
                  ].map((item) => (
                    <li key={item} className="flex items-start space-x-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-actarion-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Prefer email instead of the form? You can also contact us directly at{" "}
                  <a href="mailto:hello@actarion.com" className="text-actarion-blue underline hover:opacity-80">
                    hello@actarion.com
                  </a>
                  .
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card space-y-6 text-slate-900"
            >
              <h2 className="section-subheading text-actarion-blue">Contact form</h2>
              
              {status !== "success" ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                        First name*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60 ${
                          errors.firstName ? 'border-red-500' : 'border-slate-200'
                        }`}
                        placeholder="First name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                        Last name*
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60 ${
                          errors.lastName ? 'border-red-500' : 'border-slate-200'
                        }`}
                        placeholder="Last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Work email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60 ${
                        errors.email ? 'border-red-500' : 'border-slate-200'
                      }`}
                      placeholder="work@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                      Company*
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60 ${
                        errors.company ? 'border-red-500' : 'border-slate-200'
                      }`}
                      placeholder="Your company name"
                    />
                    {errors.company && (
                      <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-2">
                      Topic*
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60 ${
                        errors.topic ? 'border-red-500' : 'border-slate-200'
                      }`}
                    >
                      <option value="">Select a topic</option>
                      <option value="sales">Sales & Demo</option>
                      <option value="partnership">Partnership</option>
                      <option value="support">Support</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.topic && (
                      <p className="text-red-500 text-sm mt-1">{errors.topic}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message* (goal, context, desired timing)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60 ${
                        errors.message ? 'border-red-500' : 'border-slate-200'
                      }`}
                      placeholder="Tell us about your goals, context, and desired timing..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-2">
                        Country & time zone (optional)
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60"
                        placeholder="e.g., Germany, CET"
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-actarion-blue bg-white border border-slate-300 rounded focus:ring-actarion-blue focus:ring-2"
                    />
                    <label htmlFor="privacyConsent" className="text-sm text-slate-600">
                      <span className="text-red-500">*</span> I agree to the processing of my data as described in the{" "}
                      <Link href={buildLocalizedPath(locale, "privacy")} className="text-actarion-blue hover:opacity-80 underline">
                        Privacy Policy
                      </Link>.
                    </label>
                  </div>
                  {errors.privacyConsent && (
                    <p className="text-red-500 text-sm mt-1">{errors.privacyConsent}</p>
                  )}

                  {(status === "error" || status === "ratelimited") && (
                    <p className="text-red-500 text-sm">{statusMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Sending..." : "Send"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="section-subheading text-actarion-blue mb-4">
                    Thanks! We&apos;ll get back to you within 1–2 business days.
                  </h2>
                  <Link
                    href={buildLocalizedPath(locale)}
                    className="btn btn-link"
                  >
                    Back to Home
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 