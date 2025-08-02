"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface PrivacyPageClientProps {
  locale: string;
  dictionary: any;
}

export default function PrivacyPageClient({ locale, dictionary }: PrivacyPageClientProps) {
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
              {dictionary.pages.privacy.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
              {dictionary.pages.privacy.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-neutral-900 bg-opacity-50 backdrop-blur-sm rounded-lg p-8"
          >
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Information We Collect</h2>
              <p className="text-gray-300 mb-6">
                We collect information you provide directly to us, such as when you create an account, contact us, or use our services. This may include your name, email address, company information, and any other information you choose to provide.
              </p>

              <h2 className="text-2xl font-bold text-cyan-400 mb-6">How We Use Your Information</h2>
              <p className="text-gray-300 mb-6">
                We use the information we collect to provide, maintain, and improve our services, communicate with you, and develop new features. We may also use your information to send you technical notices, updates, security alerts, and support messages.
              </p>

              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Information Sharing</h2>
              <p className="text-gray-300 mb-6">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you.
              </p>

              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Data Security</h2>
              <p className="text-gray-300 mb-6">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>

              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Cookies and Tracking</h2>
              <p className="text-gray-300 mb-6">
                We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
              </p>

              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Your Rights</h2>
              <p className="text-gray-300 mb-6">
                You have the right to access, update, or delete your personal information. You may also have the right to restrict or object to certain processing of your information. Contact us to exercise these rights.
              </p>

              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Changes to This Policy</h2>
              <p className="text-gray-300 mb-6">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date.
              </p>

              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Contact Us</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about this privacy policy, please contact us at privacy@actarion.com.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-8"
          >
            <Link
              href={locale === 'en' ? '/' : `/${locale}`}
              className="text-cyan-400 hover:underline text-base font-medium"
            >
              {dictionary.pages.privacy.backToHome}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 