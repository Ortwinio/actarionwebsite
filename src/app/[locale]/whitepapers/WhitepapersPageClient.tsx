"use client";

import Link from "next/link";
import { buildLocalizedPath, Locale } from "../../../config/site";

interface WhitepapersPageClientProps {
  locale: Locale;
  dictionary: Record<string, unknown>;
}

export default function WhitepapersPageClient({ locale }: WhitepapersPageClientProps) {
  return (
    <main className="section section-light">
      <div className="section-inner">
        <section className="card space-y-6 text-center">
          <h2 className="section-subheading">Coming soon</h2>
          <p className="text-slate-700">
            Our whitepapers and downloadable resources are currently being prepared.
            Check back soon for in-depth guides on AR work instructions, digital SOPs,
            and industrial knowledge management.
          </p>
          <div className="pt-4">
            <Link
              href={buildLocalizedPath(locale, "contact")}
              className="btn btn-primary"
            >
              Contact us to learn more
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
