import Image from "next/image";
import Link from "next/link";
import { Locale, buildLocalizedPath } from "../config/site";
import { NewsletterForm } from "./NewsletterForm";

interface FooterProps {
  locale: Locale;
  dictionary: any;
}

export function Footer({ locale, dictionary }: FooterProps) {
  const homeHref = buildLocalizedPath(locale);
  const useCasesHref = buildLocalizedPath(locale, "use-cases");
  const aboutHref = buildLocalizedPath(locale, "about");
  const visionHref = buildLocalizedPath(locale, "vision");
  const managementHref = buildLocalizedPath(locale, "management");
  const contactHref = buildLocalizedPath(locale, "contact");
  const partnersHref = buildLocalizedPath(locale, "partners");
  const careerHref = buildLocalizedPath(locale, "career");
  const faqHref = buildLocalizedPath(locale, "faq");
  const eventsHref = buildLocalizedPath(locale, "events");
  const blogHref = buildLocalizedPath(locale, "blog");
  const whitepapersHref = buildLocalizedPath(locale, "whitepapers");
  const videosHref = buildLocalizedPath(locale, "videos");
  const newsHref = buildLocalizedPath(locale, "news");
  const termsHref = buildLocalizedPath(locale, "terms");
  const privacyHref = buildLocalizedPath(locale, "privacy");
  const servicesHref = buildLocalizedPath(locale, "services");
  const newsletterCopy = dictionary.footer?.newsletter ?? {};
  const newsletterDescription =
    newsletterCopy.description ??
    "Get updates on smarter, safer and faster work with AI and Augmented Reality.";

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <Link
            href={homeHref}
            aria-label="ActARion homepage"
            className="site-logo mb-4 inline-flex"
          >
            <Image
              src="/logo-actarion.png"
              alt="ActARion symbol"
              width={36}
              height={36}
              className="h-9 w-auto"
            />
            <span className="site-logo__text">
              Act<span className="logo-wordmark__accent">AR</span>ion
            </span>
          </Link>
          <p>
            {dictionary.footer?.copyright ??
              "© 2024 ActARion. All rights reserved."}
          </p>
          <a
            href="https://www.linkedin.com/company/ActARion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Follow us on LinkedIn
          </a>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="site-footer__title">
            {dictionary.footer?.company || "Company"}
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href={aboutHref}>{dictionary.navigation?.aboutSubmenu?.aboutActarion || "About ActARion"}</Link>
            </li>
            <li>
              <Link href={visionHref}>{dictionary.navigation?.aboutSubmenu?.vision || "Vision"}</Link>
            </li>
            <li>
              <Link href={managementHref}>{dictionary.navigation?.aboutSubmenu?.management || "Management"}</Link>
            </li>
            <li>
              <Link href={careerHref}>{dictionary.navigation?.aboutSubmenu?.career || "Career"}</Link>
            </li>
            <li>
              <Link href={faqHref}>{dictionary.navigation?.aboutSubmenu?.faq || "FAQ"}</Link>
            </li>
          </ul>
        </div>

        {/* Insights Section */}
        <div>
          <h3 className="site-footer__title">
            {dictionary.navigation?.insight || "Insights"}
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href={useCasesHref}>{dictionary.navigation?.insightSubmenu?.useCases || "Use cases"}</Link>
            </li>
            <li>
              <Link href={blogHref}>{dictionary.navigation?.insightSubmenu?.blogposts || "Blogposts"}</Link>
            </li>
            <li>
              <Link href={eventsHref}>{dictionary.navigation?.insightSubmenu?.events || "Events"}</Link>
            </li>
            <li>
              <Link href={whitepapersHref}>{dictionary.navigation?.insightSubmenu?.whitepapers || "Whitepapers"}</Link>
            </li>
            <li>
              <Link href={videosHref}>{dictionary.navigation?.insightSubmenu?.videos || "Videos"}</Link>
            </li>
            <li>
              <Link href={newsHref}>{dictionary.navigation?.insightSubmenu?.news || "News"}</Link>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="site-footer__title">
            {dictionary.footer?.quicklinks || "Quick Links"}
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href={servicesHref}>{dictionary.navigation?.services || "Services"}</Link>
            </li>
            <li>
              <Link href={partnersHref}>{dictionary.navigation?.partner || "Partners"}</Link>
            </li>
            <li>
              <Link href={contactHref}>{dictionary.navigation?.contact || "Contact"}</Link>
            </li>
            <li>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
              >
                {dictionary.footer?.sitemap || "Sitemap"}
              </a>
            </li>
            <li>
              <a
                href="/onepager.png"
                target="_blank"
                rel="noopener noreferrer"
              >
                {dictionary.footer?.onepager || "View our onepager"}
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="site-footer__title">Legal</h3>
          <ul className="space-y-1">
            <li>
              <Link href={termsHref}>{dictionary.footer?.terms || "Terms & Conditions"}</Link>
            </li>
            <li>
              <Link href={privacyHref}>{dictionary.footer?.privacy || "Privacy Policy"}</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="site-footer__title">
            {newsletterCopy.title || "Subscribe to our newsletter"}
          </h3>
          <p className="text-sm text-gray-300">{newsletterDescription}</p>
          <NewsletterForm
            copy={{
              placeholder: newsletterCopy.placeholder,
              buttonLabel: newsletterCopy.buttonLabel,
              loadingLabel: newsletterCopy.loadingLabel,
              successMessage: newsletterCopy.successMessage,
              errorMessage: newsletterCopy.errorMessage,
              rateLimitedMessage: newsletterCopy.rateLimitedMessage,
              backLabel: newsletterCopy.backLabel,
            }}
          />
        </div>
      </div>

      <div className="site-footer__legal">
        <span>ActARion · Benelux · DACH · Nordics</span>
        <span>Smarter · Safer · Faster operations with AR guidance</span>
      </div>
    </footer>
  );
}


