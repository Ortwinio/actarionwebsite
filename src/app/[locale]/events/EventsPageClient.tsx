"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, FormEvent, useRef } from "react";
import { buildLocalizedPath, Locale } from "../../../config/site";
import { EVENTS } from "../../../../content/events";

interface EventsPageClientProps {
  locale: Locale;
  dictionary: any;
}

interface RegistrationFormState {
  eventId: string;
  email: string;
  company: string;
  role: string;
  submitted: boolean;
}

export default function EventsPageClient({ locale, dictionary }: EventsPageClientProps) {
  const [form, setForm] = useState<RegistrationFormState>({
    eventId: "",
    email: "",
    company: "",
    role: "",
    submitted: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const formRef = useRef<HTMLDivElement>(null);

  const eventsCopy = dictionary.pages?.events || {};

  const handleRegisterClick = (eventId: string) => {
    setForm((prev) => ({
      ...prev,
      eventId,
      submitted: false,
    }));
    setErrors({});

    // Scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.eventId) newErrors.eventId = eventsCopy.form?.errorSelectEvent || "Please select an event";
    if (!form.email.trim()) newErrors.email = eventsCopy.form?.errorEmail || "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = eventsCopy.form?.errorEmailInvalid || "Please enter a valid email";
    if (!form.company.trim()) newErrors.company = eventsCopy.form?.errorCompany || "Company name is required";
    if (!form.role.trim()) newErrors.role = eventsCopy.form?.errorRole || "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // TODO: connect this to your backend, Loops, HubSpot or email service.
    // For now, we just simulate a successful submission.
    console.log("Event registration", form);

    setForm((prev) => ({
      ...prev,
      submitted: true,
    }));
  };

  const handleBackToForm = () => {
    setForm({
      eventId: "",
      email: "",
      company: "",
      role: "",
      submitted: false,
    });
  };

  // Filter upcoming events (events with date >= today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = EVENTS.filter((event) => new Date(event.date) >= today);

  const formatDate = (dateString: string) => {
    const eventDate = new Date(dateString);
    return eventDate.toLocaleDateString(locale === "de" ? "de-DE" : locale === "nl" ? "nl-NL" : "en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatShortDate = (dateString: string) => {
    const eventDate = new Date(dateString);
    return eventDate.toLocaleDateString(locale === "de" ? "de-DE" : locale === "nl" ? "nl-NL" : "en-GB", {
      day: "2-digit",
      month: "short",
    });
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
              {eventsCopy.intro ||
                "Join ActARion at upcoming events, webinars and workshops to learn how AI and AR–guided work instructions and AR SOPs help you capture corporate knowledge, support operators and shape the future of work."}
            </p>
          </div>

          {/* Events Grid */}
          {upcomingEvents.length > 0 ? (
            <section className="mb-16">
              <h2 className="section-subheading text-actarion-blue mb-6">
                {eventsCopy.upcomingTitle || "Upcoming Events"}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {upcomingEvents.map((event) => (
                  <motion.article
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="card flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{formatDate(event.date)}</span>
                        <span className="text-slate-300">·</span>
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 mb-6">{event.description}</p>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleRegisterClick(event.id)}
                        className="btn btn-primary"
                      >
                        {eventsCopy.registerButton || "Register for this event"}
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          ) : (
            <section className="mb-16 text-center">
              <div className="card py-12">
                <p className="text-slate-500 text-lg">
                  {eventsCopy.noEvents ||
                    "No upcoming events at the moment. Check back soon or subscribe to our newsletter to stay informed."}
                </p>
              </div>
            </section>
          )}

          {/* Registration Form */}
          <section ref={formRef} className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card max-w-2xl mx-auto"
            >
              <h2 className="section-subheading text-actarion-blue mb-6">
                {eventsCopy.formTitle || "Register for an event"}
              </h2>

              {!form.submitted ? (
                <>
                  {!form.eventId && (
                    <p className="text-sm text-slate-500 mb-6">
                      {eventsCopy.formHint ||
                        "Select an event above and click \"Register for this event\" to pre-fill the registration form, or choose from the dropdown below."}
                    </p>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Event Select */}
                    <div>
                      <label
                        htmlFor="eventId"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        {eventsCopy.form?.eventLabel || "Event"}*
                      </label>
                      <select
                        id="eventId"
                        value={form.eventId}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            eventId: e.target.value,
                          }))
                        }
                        className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60 ${
                          errors.eventId ? "border-red-500" : "border-slate-200"
                        }`}
                        required
                      >
                        <option value="">
                          {eventsCopy.form?.eventPlaceholder || "Select an event"}
                        </option>
                        {upcomingEvents.map((event) => (
                          <option key={event.id} value={event.id}>
                            {formatShortDate(event.date)} – {event.title}
                          </option>
                        ))}
                      </select>
                      {errors.eventId && (
                        <p className="text-red-500 text-sm mt-1">{errors.eventId}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        {eventsCopy.form?.emailLabel || "Email address"}*
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60 ${
                          errors.email ? "border-red-500" : "border-slate-200"
                        }`}
                        placeholder={eventsCopy.form?.emailPlaceholder || "you@company.com"}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        {eventsCopy.form?.companyLabel || "Company name"}*
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={form.company}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60 ${
                          errors.company ? "border-red-500" : "border-slate-200"
                        }`}
                        placeholder={eventsCopy.form?.companyPlaceholder || "Your company"}
                        required
                      />
                      {errors.company && (
                        <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                      )}
                    </div>

                    {/* Role */}
                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        {eventsCopy.form?.roleLabel || "Role"}*
                      </label>
                      <input
                        id="role"
                        type="text"
                        value={form.role}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            role: e.target.value,
                          }))
                        }
                        className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 focus:border-actarion-blue/60 ${
                          errors.role ? "border-red-500" : "border-slate-200"
                        }`}
                        placeholder={eventsCopy.form?.rolePlaceholder || "Your role"}
                        required
                      />
                      {errors.role && (
                        <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                      )}
                    </div>

                    <button type="submit" className="btn btn-primary w-full justify-center">
                      {eventsCopy.form?.submitButton || "Register"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {eventsCopy.successTitle || "Thank you for registering!"}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {eventsCopy.successMessage ||
                      "You are now registered for this event. You will receive an email with further details shortly."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={handleBackToForm}
                      className="btn btn-secondary"
                    >
                      {eventsCopy.registerAnother || "Register for another event"}
                    </button>
                    <Link href={buildLocalizedPath(locale)} className="btn btn-link">
                      {eventsCopy.backToHome || "Back to Home"}
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}











