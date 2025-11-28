import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { buildLocalizedPath, defaultLocale, isSupportedLocale, Locale } from "../../config/site";
import { buildPageMetadata } from "../../config/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    locale: defaultLocale,
    title: "Page not found | ActARion",
    description:
      "The page you're looking for doesn't exist anymore. Let's get you back to smarter, safer and faster work with AI and Augmented Reality.",
  });
}

export default async function NotFoundPage() {
  // Read locale from headers set by middleware
  const headersList = await headers();
  const localeHeader = headersList.get('x-actarion-locale');
  const locale = (localeHeader && isSupportedLocale(localeHeader)) 
    ? (localeHeader as Locale) 
    : defaultLocale;
  
  const homeHref = buildLocalizedPath(locale);
  const useCasesHref = buildLocalizedPath(locale, "use-cases");
  const aboutHref = buildLocalizedPath(locale, "about");
  const blogHref = buildLocalizedPath(locale, "blog");
  const contactHref = buildLocalizedPath(locale, "contact");
  const careerHref = buildLocalizedPath(locale, "career");

  const quickLinks = [
    {
      href: homeHref,
      label: "Home",
      description: "Overview of how ActARion helps improve work and training with AI and AR.",
    },
    {
      href: useCasesHref,
      label: "Use cases",
      description: "Concrete examples in industry, logistics and energy.",
    },
    {
      href: aboutHref,
      label: "About",
      description: "Learn how ActARion combines action and augmented reality.",
    },
    {
      href: blogHref,
      label: "Blog",
      description: "Insights on safer, faster, smarter work.",
    },
    {
      href: contactHref,
      label: "Contact",
      description: "Talk to our team about your processes.",
    },
    {
      href: careerHref,
      label: "Career",
      description: "Join our team and help transform industrial work.",
    },
  ];

  return (
    <main className="section section-light">
      <div className="section-inner">
        {/* Hero Section */}
        <section className="mb-16 md:mb-20">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <p className="eyebrow">404 – page not found</p>
              <h1 className="section-heading">
                Page not found – but your next step is one click away
              </h1>
              <p className="section-lead text-lg">
                The page you're looking for doesn't exist anymore, or the link may be incorrect. Let's get you back to smarter, safer and faster ways of working with AI and Augmented Reality.
              </p>
            </div>

            {/* Right: Hero Image */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/404-header-actarion-ar-navigation.png"
                alt="Technician viewing AR work instructions with one missing tile and highlighted alternative steps."
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Explanation Section */}
        <section className="mb-16 md:mb-20">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {/* Left Column */}
            <div className="space-y-4">
              <h2 className="section-subheading">What may have happened</h2>
              <p className="text-[var(--color-text-muted)]">
                This might have happened because:
              </p>
              <ul className="space-y-2 list-disc list-inside text-[var(--color-text-muted)]">
                <li>the URL was typed incorrectly</li>
                <li>the page was moved or renamed</li>
                <li>the link you followed is outdated</li>
              </ul>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <h2 className="section-subheading">Where would you like to go instead?</h2>
              <p className="text-[var(--color-text-muted)]">
                You can use the main navigation or choose one of these quick links:
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links Grid */}
        <section className="mb-16 md:mb-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="card hover:shadow-lg transition-shadow duration-200 group"
              >
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--color-actarion-blue)] transition-colors">
                  {link.label}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Need Help / CTA Section */}
        <section>
          <div className="summary summary--cta max-w-2xl mx-auto">
            <h2 className="section-subheading mb-4">Need help?</h2>
            <p className="text-[var(--color-text-muted)] mb-6">
              If you followed a link from another website or document, feel free to share it with us so we can fix it.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href={homeHref} className="btn btn-primary btn-pill">
                Go to the ActARion homepage
              </Link>
              <Link href={contactHref} className="btn btn-secondary btn-pill">
                Schedule a discovery call
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

