"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { buildLocalizedPath, Locale } from "../../../config/site";

interface PrivacyPageClientProps {
  locale: Locale;
  dictionary: any;
}

export default function PrivacyPageClient({ locale, dictionary }: PrivacyPageClientProps) {
  const introHeading =
    dictionary.pages.privacy.introHeading ?? "How we protect your data";
  return (
    <main className="section section-light text-slate-900">
      <div className="section-inner space-y-10">
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
            {dictionary.pages.privacy.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card p-8 text-slate-900"
        >
          <div className="prose max-w-none text-slate-700">
            <h2 className="text-2xl font-bold text-actarion-blue mb-6">Information We Collect</h2>
            <p className="mb-6">
              We collect information you provide directly to us, such as when you create an account, contact us, or use our services. This may include your name, email address, company information, and any other information you choose to provide.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">How We Use Your Information</h2>
            <p className="mb-6">
              We use the information we collect to provide, maintain, and improve our services, communicate with you, and develop new features. We may also use your information to send you technical notices, updates, security alerts, and support messages.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">Information Sharing</h2>
            <p className="mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">Data Security</h2>
            <p className="mb-6">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">Cookies and Tracking</h2>
            <p className="mb-6">
              We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">Your Rights</h2>
            <p className="mb-6">
              You have the right to access, update, or delete your personal information. You may also have the right to restrict or object to certain processing of your information. Contact us to exercise these rights.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">Changes to This Policy</h2>
            <p className="mb-6">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">Contact Us</h2>
            <p className="mb-6">
              If you have any questions about this privacy policy, please contact us at privacy@ActARion.com.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href={buildLocalizedPath(locale)}
            className="text-actarion-blue hover:underline text-base font-medium"
          >
            {dictionary.pages.privacy.backToHome}
          </Link>
        </motion.div>
      </div>
    </main>
  );
}