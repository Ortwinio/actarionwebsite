"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ContactPageClientProps {
  locale: string;
  dictionary: any;
}

export default function ContactPageClient({ locale, dictionary }: ContactPageClientProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClient, setIsClient] = useState(false);
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

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 relative">
      {/* Sticky Background Image */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Image
          src="/actarion-sop-ar-training.jpg"
          alt="ActARion Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-6">
                Contact ActARion
              </h1>
              <p className="text-xl text-gray-800 dark:text-neutral-300 max-w-3xl mx-auto mb-4">
                Let's turn SOPs into real-world performance.
              </p>
              <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Tell us a bit about your goals—we'll reply within 1–2 business days with the right next step (call, demo, or PoC).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - USPs */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="bg-gray-50 dark:bg-neutral-900 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-neutral-700">
                  <h2 className="text-3xl font-bold text-cyan-500 dark:text-cyan-400 mb-6">
                    Why ActARion (USPs)
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Rapid adoption with a no-code Studio</h3>
                        <p className="text-gray-700 dark:text-neutral-300">Build and update instructions without code.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Quality assured with AI checks</h3>
                        <p className="text-gray-700 dark:text-neutral-300">AI verification at every step ensures accuracy.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Works on every device</h3>
                        <p className="text-gray-700 dark:text-neutral-300">HoloLens 2, Apple Vision Pro, iOS/Android (rugged supported).</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-2">European delivery via experienced partners</h3>
                        <p className="text-gray-700 dark:text-neutral-300">1st/2nd/3rd-line support with local expertise.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">5</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-2">PoC approach with clear KPIs</h3>
                        <p className="text-gray-700 dark:text-neutral-300">Solid business case with measurable outcomes.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-neutral-900 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-neutral-700">
                  <h3 className="text-2xl font-bold text-cyan-500 dark:text-cyan-400 mb-4">
                    Get in touch
                  </h3>
                  <p className="text-gray-700 dark:text-neutral-300">
                    Have a question, need a demo, or exploring a PoC? Send us a note—we'll help you move fast.
                  </p>
                </div>
              </motion.div>

              {/* Right Column - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gray-50 dark:bg-neutral-900 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-neutral-700"
              >
                                  <h2 className="text-2xl font-bold text-cyan-500 dark:text-cyan-400 mb-6">Contact form</h2>
                
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                          First name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-white dark:bg-neutral-800 border rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                          }`}
                          placeholder="First name"
                        />
                        {errors.firstName && (
                          <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                          Last name*
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-white dark:bg-neutral-800 border rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                          }`}
                          placeholder="Last name"
                        />
                        {errors.lastName && (
                          <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                        Work email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white dark:bg-neutral-800 border rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300 dark:border-neutral-600'
                        }`}
                        placeholder="work@company.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                        Company*
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                          errors.company ? 'border-red-500' : 'border-neutral-600'
                        }`}
                        placeholder="Your company name"
                      />
                      {errors.company && (
                        <p className="text-red-400 text-sm mt-1">{errors.company}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="topic" className="block text-sm font-medium text-neutral-300 mb-2">
                        Topic*
                      </label>
                      <select
                        id="topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-neutral-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                          errors.topic ? 'border-red-500' : 'border-neutral-600'
                        }`}
                      >
                        <option value="">Select a topic</option>
                        <option value="sales">Sales & Demo</option>
                        <option value="partnership">Partnership</option>
                        <option value="support">Support</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.topic && (
                        <p className="text-red-400 text-sm mt-1">{errors.topic}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                        Message* (goal, context, desired timing)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                          errors.message ? 'border-red-500' : 'border-neutral-600'
                        }`}
                        placeholder="Tell us about your goals, context, and desired timing..."
                      ></textarea>
                      {errors.message && (
                        <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-2">
                          Phone (optional)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-neutral-300 mb-2">
                          Country & time zone (optional)
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
                        className="mt-1 w-4 h-4 text-cyan-500 bg-neutral-800 border-neutral-600 rounded focus:ring-cyan-500 focus:ring-2"
                      />
                      <label htmlFor="privacyConsent" className="text-sm text-neutral-300">
                        <span className="text-red-400">*</span> I agree to the processing of my data as described in the{' '}
                        <Link href={locale === 'en' ? '/privacy' : `/${locale}/privacy`} className="text-cyan-400 hover:text-cyan-300 underline">
                          Privacy Policy
                        </Link>.
                      </label>
                    </div>
                    {errors.privacyConsent && (
                      <p className="text-red-400 text-sm mt-1">{errors.privacyConsent}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
                    >
                      Send
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                      Thanks! We'll get back to you within 1–2 business days.
                    </h2>
                    <Link
                      href={locale === 'en' ? '/' : `/${locale}`}
                      className="text-cyan-400 hover:text-cyan-300 underline text-base font-medium"
                    >
                      Back to Home
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 