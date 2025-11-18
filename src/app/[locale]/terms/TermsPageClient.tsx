"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { buildLocalizedPath, Locale } from "../../../config/site";

interface TermsPageClientProps {
  locale: Locale;
  dictionary: any;
}

export default function TermsPageClient({ locale, dictionary }: TermsPageClientProps) {
  const introHeading =
    dictionary.pages.terms.introHeading ?? "Understand how we work together";
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
            {dictionary.pages.terms.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card p-8 text-slate-900"
        >
          <div className="prose max-w-none text-slate-700">
            <h2 className="text-2xl font-bold text-actarion-blue mb-6">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing and using ActARion's services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">2. Use License</h2>
            <p className="mb-6">
              Permission is granted to temporarily download one copy of the materials (information or software) on ActARion's website for personal, non-commercial transitory viewing only.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">3. Disclaimer</h2>
            <p className="mb-6">
              The materials on ActARion's website are provided on an 'as is' basis. ActARion makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">4. Limitations</h2>
            <p className="mb-6">
              In no event shall ActARion or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ActARion's website.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">5. Revisions and Errata</h2>
            <p className="mb-6">
              The materials appearing on ActARion's website could include technical, typographical, or photographic errors. ActARion does not warrant that any of the materials on its website are accurate, complete or current.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">6. Links</h2>
            <p className="mb-6">
              ActARion has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ActARion of the site.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">7. Modifications</h2>
            <p className="mb-6">
              ActARion may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
            </p>

            <h2 className="text-2xl font-bold text-actarion-blue mb-6">8. Governing Law</h2>
            <p className="mb-6">
              Any claim relating to ActARion's website shall be governed by the laws of the Netherlands without regard to its conflict of law provisions.
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
            {dictionary.pages.terms.backToHome}
          </Link>
        </motion.div>
      </div>
    </main>
  );
}