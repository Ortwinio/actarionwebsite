"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { 
  AcademicCapIcon, 
  WrenchScrewdriverIcon, 
  ShieldCheckIcon 
} from "@heroicons/react/24/outline";
import { track } from "@vercel/analytics";
import Link from "next/link";

// Storage keys for popup suppression
const STORAGE_KEYS = {
  dismissed: "actarion_newsletter_dismissed",
  subscribed: "actarion_newsletter_subscribed",
} as const;

// Suppression durations in milliseconds
const SUPPRESSION = {
  dismissed: 30 * 24 * 60 * 60 * 1000, // 30 days
  subscribed: 180 * 24 * 60 * 60 * 1000, // 180 days
} as const;

// Trigger settings
const TRIGGER = {
  delay: 35000, // 35 seconds (between 30-45s as specified)
  scrollPercent: 50, // 50% scroll
} as const;

// Pages where popup should appear (content pages)
const INCLUDED_PATH_PATTERNS = [
  "/blog",
  "/use-cases",
  "/whitepapers",
  "/insights",
];

// Pages where popup should NOT appear
const EXCLUDED_PATHS = [
  "/contact",
  "/privacy",
  "/terms",
  "/newsletter",
  "/demo",
  "/partner-contact",
  "/roi",
];

type FormStatus = "idle" | "loading" | "success" | "error";

// Value proposition items with icons
const VALUE_ITEMS = [
  {
    icon: AcademicCapIcon,
    text: "Onboarding and training playbooks (what works on site)",
  },
  {
    icon: WrenchScrewdriverIcon,
    text: "Maintenance and troubleshooting checklists",
  },
  {
    icon: ShieldCheckIcon,
    text: "Keeping SOPs up to date and audit-ready",
  },
];

// Use case chips
const USE_CASE_CHIPS = [
  "Onboarding",
  "Troubleshooting",
  "Safety & quality",
  "Knowledge retention",
];

// Role options
const ROLE_OPTIONS = [
  { value: "", label: "Your role (optional)" },
  { value: "operations", label: "Operations" },
  { value: "maintenance", label: "Maintenance" },
  { value: "quality", label: "Quality" },
  { value: "training", label: "Training" },
  { value: "hse", label: "HSE" },
  { value: "it_digital", label: "IT / Digital" },
  { value: "other", label: "Other" },
];

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    role: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Check if popup should be suppressed
  const isSuppressed = useCallback(() => {
    if (typeof window === "undefined") return true;

    const path = window.location.pathname;

    // Check if path is in excluded list
    if (EXCLUDED_PATHS.some((excluded) => path.includes(excluded))) {
      return true;
    }

    // Check if path is in included patterns (only show on content pages)
    const isContentPage = INCLUDED_PATH_PATTERNS.some((pattern) => 
      path.includes(pattern)
    );
    
    // If not a content page, suppress
    if (!isContentPage) {
      return true;
    }

    // Check dismissed timestamp
    const dismissed = localStorage.getItem(STORAGE_KEYS.dismissed);
    if (dismissed && Date.now() - Number(dismissed) < SUPPRESSION.dismissed) {
      return true;
    }

    // Check subscribed timestamp
    const subscribed = localStorage.getItem(STORAGE_KEYS.subscribed);
    if (subscribed && Date.now() - Number(subscribed) < SUPPRESSION.subscribed) {
      return true;
    }

    return false;
  }, []);

  // Open the popup
  const openPopup = useCallback(() => {
    if (hasTriggered || isSuppressed()) return;

    setHasTriggered(true);
    setIsOpen(true);

    // Track popup view
    track("newsletter_popup_view");
  }, [hasTriggered, isSuppressed]);

  // Close the popup
  const closePopup = useCallback((reason: "dismiss" | "close" | "success") => {
    setIsOpen(false);

    if (reason === "dismiss" || reason === "close") {
      localStorage.setItem(STORAGE_KEYS.dismissed, String(Date.now()));
      track("newsletter_popup_dismiss", { reason });
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email address");
      return;
    }

    setFormStatus("loading");
    setErrorMessage("");

    track("newsletter_popup_submit");

    try {
      const response = await fetch("/api/loops/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          role: formData.role,
          source: "newsletter_popup",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setFormStatus("success");
      localStorage.setItem(STORAGE_KEYS.subscribed, String(Date.now()));

      // Auto-close after success
      setTimeout(() => closePopup("success"), 3000);
    } catch (error) {
      setFormStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Set up triggers
  useEffect(() => {
    if (typeof window === "undefined" || isSuppressed()) return;

    // Timer trigger
    const timer = setTimeout(() => {
      openPopup();
    }, TRIGGER.delay);

    // Scroll trigger
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercent >= TRIGGER.scrollPercent) {
        openPopup();
      }
    };

    // Exit intent trigger (desktop only)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        openPopup();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isSuppressed, openPopup]);

  // Focus trap and escape key handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus first input when modal opens
    setTimeout(() => firstInputRef.current?.focus(), 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup("close");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closePopup]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closePopup("dismiss")}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-popup-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl pointer-events-auto overflow-hidden">
              {/* Close button */}
              <button
                type="button"
                onClick={() => closePopup("close")}
                className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                aria-label="Close"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>

              {formStatus === "success" ? (
                /* Success state */
                <div className="text-center py-12 px-8">
                  <div className="text-5xl mb-4">✓</div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    You&apos;re on the list
                  </h2>
                  <p className="text-slate-600">
                    Thanks for subscribing. You&apos;ll receive practical notes on AI and AR–guided work instructions, starting with your next email.
                  </p>
                </div>
              ) : (
                /* Form state - Two column layout */
                <div className="grid md:grid-cols-2">
                  {/* Left column - Copy */}
                  <div className="bg-slate-50 p-6 md:p-8">
                    <h2
                      id="newsletter-popup-title"
                      className="text-xl font-bold text-slate-900 mb-3 pr-8"
                    >
                      Practical AI + AR guidance for safer, faster work
                    </h2>
                    <p className="text-slate-600 text-sm mb-6">
                      Short, useful notes for operations, maintenance, training and HSE teams. Examples from onboarding, troubleshooting and safety-critical work. No hype. No spam.
                    </p>

                    {/* Value bullets with icons */}
                    <ul className="space-y-3 mb-6">
                      {VALUE_ITEMS.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <item.icon className="h-5 w-5 text-actarion-blue flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{item.text}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Use case chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {USE_CASE_CHIPS.map((chip) => (
                        <span
                          key={chip}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-actarion-blue/10 text-actarion-blue"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    {/* Example hook */}
                    <p className="text-xs text-slate-500 italic">
                      Example: &quot;How AR SOPs reduce errors in changeovers and safety checks.&quot;
                    </p>
                  </div>

                  {/* Right column - Form */}
                  <div className="p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="popup-email" className="block text-sm font-medium text-slate-700 mb-1">
                          Email address
                        </label>
                        <input
                          ref={firstInputRef}
                          type="email"
                          id="popup-email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="you@company.com"
                          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-actarion-blue focus:outline-none focus:ring-2 focus:ring-actarion-blue/20"
                          disabled={formStatus === "loading"}
                        />
                      </div>

                      <div>
                        <label htmlFor="popup-firstName" className="block text-sm font-medium text-slate-700 mb-1">
                          First name <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <input
                          type="text"
                          id="popup-firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Your first name"
                          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-actarion-blue focus:outline-none focus:ring-2 focus:ring-actarion-blue/20"
                          disabled={formStatus === "loading"}
                        />
                      </div>

                      <div>
                        <label htmlFor="popup-role" className="block text-sm font-medium text-slate-700 mb-1">
                          Role <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <select
                          id="popup-role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-actarion-blue focus:outline-none focus:ring-2 focus:ring-actarion-blue/20"
                          disabled={formStatus === "loading"}
                        >
                          {ROLE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {formStatus === "error" && (
                        <p className="text-red-500 text-sm" role="alert">
                          {errorMessage}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={formStatus === "loading"}
                        className="w-full rounded-lg bg-actarion-blue py-3 font-semibold text-white transition-colors hover:bg-actarion-blue/90 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {formStatus === "loading" ? "Subscribing..." : "Get the practical notes"}
                      </button>

                      <button
                        type="button"
                        onClick={() => closePopup("dismiss")}
                        className="w-full py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                      >
                        Not now
                      </button>
                    </form>

                    {/* Frequency + privacy */}
                    <div className="mt-4 space-y-2 text-center">
                      <p className="text-xs text-slate-500">
                        1–2 emails per month. Unsubscribe anytime.
                      </p>
                      <p className="text-xs text-slate-400">
                        We&apos;ll only use your email for these updates.{" "}
                        <Link href="/en/privacy" className="underline hover:text-slate-600">
                          Privacy policy
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
