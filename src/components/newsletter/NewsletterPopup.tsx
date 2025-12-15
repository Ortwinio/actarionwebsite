"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { track } from "@vercel/analytics";

// Storage keys for popup suppression
const STORAGE_KEYS = {
  dismissed: "newsletter_popup_dismissed",
  subscribed: "newsletter_popup_subscribed",
} as const;

// Suppression durations in milliseconds
const SUPPRESSION = {
  dismissed: 30 * 24 * 60 * 60 * 1000, // 30 days
  subscribed: 180 * 24 * 60 * 60 * 1000, // 180 days
} as const;

// Trigger settings
const TRIGGER = {
  delay: 20000, // 20 seconds
  scrollPercent: 50, // 50% scroll
} as const;

// Pages where popup should NOT appear
const EXCLUDED_PATHS = ["/contact", "/privacy", "/newsletter", "/terms"];

type FormStatus = "idle" | "loading" | "success" | "error";

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

    // Check excluded paths
    const path = window.location.pathname;
    if (EXCLUDED_PATHS.some((excluded) => path.includes(excluded))) {
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

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
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
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl pointer-events-auto">
              {/* Close button */}
              <button
                type="button"
                onClick={() => closePopup("close")}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                aria-label="Close newsletter popup"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>

              {formStatus === "success" ? (
                /* Success state */
                <div className="text-center py-4">
                  <div className="text-5xl mb-4">🎉</div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    You&apos;re subscribed!
                  </h2>
                  <p className="text-slate-600">
                    Thanks for joining our newsletter. We&apos;ll keep you updated with the latest
                    insights on AR and AI in industrial operations.
                  </p>
                </div>
              ) : (
                /* Form state */
                <>
                  <div className="mb-6 pr-8">
                    <h2
                      id="newsletter-popup-title"
                      className="text-xl font-bold text-slate-900 mb-2"
                    >
                      Stay ahead with AR & AI insights
                    </h2>
                    <p className="text-slate-600 text-sm">
                      Get practical tips on AR work instructions, AI-guided operations, and
                      industrial innovation. No spam, just value.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="popup-email" className="sr-only">
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
                      <label htmlFor="popup-firstName" className="sr-only">
                        First name (optional)
                      </label>
                      <input
                        type="text"
                        id="popup-firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name (optional)"
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-actarion-blue focus:outline-none focus:ring-2 focus:ring-actarion-blue/20"
                        disabled={formStatus === "loading"}
                      />
                    </div>

                    <div>
                      <label htmlFor="popup-role" className="sr-only">
                        Your role (optional)
                      </label>
                      <select
                        id="popup-role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-actarion-blue focus:outline-none focus:ring-2 focus:ring-actarion-blue/20"
                        disabled={formStatus === "loading"}
                      >
                        <option value="">Your role (optional)</option>
                        <option value="operations">Operations / Manufacturing</option>
                        <option value="maintenance">Maintenance / Field Service</option>
                        <option value="training">Training / L&D</option>
                        <option value="it">IT / Digital Transformation</option>
                        <option value="management">Management / Executive</option>
                        <option value="other">Other</option>
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
                      {formStatus === "loading" ? "Subscribing..." : "Subscribe"}
                    </button>

                    <button
                      type="button"
                      onClick={() => closePopup("dismiss")}
                      className="w-full py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      No thanks
                    </button>
                  </form>

                  <p className="mt-4 text-center text-xs text-slate-400">
                    By subscribing you agree to our privacy policy. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
