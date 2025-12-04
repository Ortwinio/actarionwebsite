"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PhoneArrowUpRightIcon } from "@heroicons/react/24/outline";
import { HomeVideoCta } from "@/components/HomeVideoCta";
import { buildLocalizedPath, getValidLocale } from "../../config/site";
import { useCases } from "../../config/useCases";
import { benefits, howItWorksSteps, industries } from "../../config/homeContent";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement | null>(null);
  const controls = useAnimation();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [controls, threshold]);
  return [ref, controls] as const;
}

const sectionBase = "section section-light";
const sectionShell = `${sectionBase} section-inner surface-panel`;
const sectionTitle = "section-heading";
const sectionText = "section-lead text-slate-700";
const accent = "brand-accent";

const renderTextWithBrand = (text?: string) => {
  if (!text) {
    return text;
  }

  if (!text.includes("ActARion")) {
    return text;
  }

  const parts = text.split("ActARion");

  return parts.reduce<JSX.Element[]>((acc, part, index) => {
    if (part) {
      acc.push(
        <span key={`part-${index}`}>
          {part}
        </span>
      );
    }

    if (index < parts.length - 1) {
      acc.push(
        <span key={`brand-${index}`}>
          Act<span className={accent}>AR</span>ion
        </span>
      );
    }

    return acc;
  }, []);
};

interface HomePageClientProps {
  locale: string;
  dictionary: any;
}

export default function HomePageClient({ locale, dictionary }: HomePageClientProps) {
  const [isClient, setIsClient] = useState(false);
  const [promoEnabled, setPromoEnabled] = useState(false);
  const [promoDismissed, setPromoDismissed] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const shouldShowPromo = promoEnabled && !promoDismissed && !isNearFooter;
  const normalizedLocale = getValidLocale(locale);
  const localizedUseCasesHref = buildLocalizedPath(normalizedLocale, "use-cases");
  const contactHref = buildLocalizedPath(normalizedLocale, "contact");
  const partnerContactHref = buildLocalizedPath(normalizedLocale, "partner-contact");

  useEffect(() => {
    setIsClient(true);
  }, []);



  // Timed promo popup (3s after mount)
  useEffect(() => {
    if (!isClient) return;
    let timer: ReturnType<typeof setTimeout> | null = null;

    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem('promoPopupDismissed') === 'true';
      setPromoDismissed(dismissed);
    } catch {
      dismissed = false;
    }

    if (dismissed) {
      return;
    }

    timer = setTimeout(() => setPromoEnabled(true), 3000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient || promoDismissed) return;

    const handleScroll = () => {
      const docHeight = document.body?.scrollHeight ?? 0;
      if (!docHeight) return;
      const scrollPosition = window.innerHeight + window.scrollY;
      const nearFooter = scrollPosition >= docHeight - 320;
      setIsNearFooter((prev) => (prev !== nearFooter ? nearFooter : prev));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient, promoDismissed]);

  const dismissPromoPopup = () => {
    setPromoEnabled(false);
    setPromoDismissed(true);
    try { sessionStorage.setItem('promoPopupDismissed', 'true'); } catch {}
  };


  // Animation refs
  const [heroRef, heroControls] = useInView(0.2);
  const [videoEmbedRef, videoEmbedControls] = useInView(0.2);
  const [whatRef, whatControls] = useInView(0.2);
  const [whyRef, whyControls] = useInView(0.2);
  const [useCaseRef, useCaseControls] = useInView(0.2);
  const [industriesRef, industriesControls] = useInView(0.2);
  const [howRef, howControls] = useInView(0.2);
  const [aboutRef, aboutControls] = useInView(0.2);
  const [partnersRef, partnersControls] = useInView(0.2);
  const [contactRef, contactControls] = useInView(0.2);

  const whatWeDoDescription = dictionary?.sections?.whatWeDo?.description;
  const aboutDescription = dictionary?.sections?.about?.description;
  const contactDescription = dictionary?.sections?.contact?.description;
  
  // Hero section translations
  const heroTitle = dictionary?.hero?.title || "Smarter, safer, faster work with AI and AR–guided work instructions";
  const heroDescription = dictionary?.hero?.subtitle || "ActARion helps companies capture critical know-how, guide operators in the flow of work, and build a learning organisation across sites. We transform SOPs and manuals into AI and AR–guided digital work instructions. Operators see step-by-step AR SOPs on tablets or smart glasses, so they can work safer, faster and with fewer errors.";
  const useCasesCta = dictionary?.hero?.useCasesCta || dictionary?.sections?.useCases?.cta || "Explore use cases";
  
  // Video section translations
  const videoTitle = dictionary?.sections?.video?.title || "See how ActARion works in 30 seconds";
  const videoDescription = dictionary?.sections?.video?.description || "Watch this short video to see how ActARion uses AI and Augmented Reality to help you create SOPs and work instructions faster, safer, and smarter.";
  const seeInAction = dictionary?.sections?.video?.seeInAction || "See ActARion in action";
  const inActionDescription = dictionary?.sections?.video?.inActionDescription || "ActARion is the AR-first connected worker platform. Together with Deep Sight, we transform static SOPs and manuals into interactive, AI and AR–guided work instructions that run on mobile devices and smart glasses.";
  const previewBullet = dictionary?.sections?.video?.previewBullet || "Preview how AR SOPs look through smart glasses or tablets";
  const hseBullet = dictionary?.sections?.video?.hseBullet || "Show HSE and quality teams how mandatory checks stay visible";
  const auditBullet = dictionary?.sections?.video?.auditBullet || "Highlight how ActARion captures evidence for audits automatically";
  
  // Benefits section translations
  const benefitsTitle = dictionary?.sections?.benefits?.title || "Why AI and AR–guided work instructions are the new baseline";
  const benefitTranslations = {
    captureKnowledge: {
      title: dictionary?.sections?.benefits?.captureKnowledge?.title || "Capture knowledge systematically",
      description: dictionary?.sections?.benefits?.captureKnowledge?.description || "Critical know-how is structured, versioned and available where the work happens—not hidden in emails or only in experts' heads."
    },
    guideInContext: {
      title: dictionary?.sections?.benefits?.guideInContext?.title || "Guide people in context",
      description: dictionary?.sections?.benefits?.guideInContext?.description || "Instructions appear step by step at the moment of need, so operators don't search portals while a line is down."
    },
    systemLearns: {
      title: dictionary?.sections?.benefits?.systemLearns?.title || "Let the system learn from every task",
      description: dictionary?.sections?.benefits?.systemLearns?.description || "Each execution generates time, error and confirmation data—closing the loop to improve procedures, training and equipment settings."
    },
    faster: {
      title: dictionary?.sections?.benefits?.faster?.title || "Faster",
      description: dictionary?.sections?.benefits?.faster?.description || "Employees find and apply the right instruction immediately. Onboarding shortens, troubleshooting speeds up, and changeovers become repeatable."
    },
    safer: {
      title: dictionary?.sections?.benefits?.safer?.title || "Safer",
      description: dictionary?.sections?.benefits?.safer?.description || "Standardized, visual and auditable instructions reduce variance, incidents and compliance risk—safety steps are built into the flow of work."
    },
    smarter: {
      title: dictionary?.sections?.benefits?.smarter?.title || "Smarter",
      description: dictionary?.sections?.benefits?.smarter?.description || "Knowledge improves with every execution. Lessons learned in one site can be applied everywhere, building a learning organization."
    }
  };
  
  // Use cases section translations
  const useCasesTitle = dictionary?.sections?.useCases?.title || "Where AI and AR–guided work instructions create value";
  const useCasesDescription = dictionary?.sections?.useCases?.description || "Explore practical use cases that show how ActARion and Deep Sight help teams work faster, safer and smarter with AR SOPs and digital work instructions.";
  const viewUseCase = dictionary?.sections?.useCases?.viewUseCase || "View use case";
  const viewAllUseCases = dictionary?.sections?.useCases?.viewAll || "View all use cases";
  
  // Industries section translations
  const industriesTitle = dictionary?.sections?.industries?.title || "Where AR SOPs and digital work instructions create impact first";
  const industriesDescription = dictionary?.sections?.industries?.description || "On the shop floor and in the field, onboarding takes too long, experts are overloaded and compliance depends on a few people. AI and AR–guided work instructions help most in concrete situations like onboarding, guided production, changeovers and maintenance.";
  const industryTranslations = {
    "Industrial Manufacturing": dictionary?.sections?.industries?.industrialManufacturing || "Industrial Manufacturing",
    "Energy & Utilities": dictionary?.sections?.industries?.energyUtilities || "Energy & Utilities",
    "Aerospace": dictionary?.sections?.industries?.aerospace || "Aerospace",
    "Pharma & Biotech": dictionary?.sections?.industries?.pharmaBiotech || "Pharma & Biotech",
    "Field Services": dictionary?.sections?.industries?.fieldServices || "Field Services",
    "Maintenance Operations": dictionary?.sections?.industries?.maintenanceOperations || "Maintenance Operations"
  };
  
  // How we start section translations
  const howWeStartTitle = dictionary?.sections?.howWeStart?.title || "How we start";
  const howWeStartSteps = [
    {
      title: dictionary?.sections?.howWeStart?.step1?.title || "Future of work briefing",
      description: dictionary?.sections?.howWeStart?.step1?.description || "Joint session with operations, HR/L&D and IT on the trends behind 'faster, safer, smarter' and what they mean for your sites."
    },
    {
      title: dictionary?.sections?.howWeStart?.step2?.title || "Use case discovery",
      description: dictionary?.sections?.howWeStart?.step2?.description || "Identify and prioritize 3–5 high-impact situations where AR and AI guidance could remove friction, reduce errors or shorten training."
    },
    {
      title: dictionary?.sections?.howWeStart?.step3?.title || "Pilot with clear KPIs",
      description: dictionary?.sections?.howWeStart?.step3?.description || "Implement one or two use cases with clear KPIs (e.g., First Time Right, cycle time, onboarding time, downtime) and a decision framework for scaling."
    },
    {
      title: dictionary?.sections?.howWeStart?.step4?.title || "Scale and enable",
      description: dictionary?.sections?.howWeStart?.step4?.description || "Provide playbooks and enablement so teams can standardize across lines, plants and countries with local ownership."
    }
  ];
  
  // Translated benefits for rendering
  const translatedBenefits = [
    { ...benefitTranslations.captureKnowledge, icon: benefits[0].icon },
    { ...benefitTranslations.guideInContext, icon: benefits[1].icon },
    { ...benefitTranslations.systemLearns, icon: benefits[2].icon },
    { ...benefitTranslations.faster, icon: benefits[3].icon },
    { ...benefitTranslations.safer, icon: benefits[4].icon },
    { ...benefitTranslations.smarter, icon: benefits[5].icon }
  ];

  return (
    <main className="bg-white text-slate-900">
      {/* Intro video hero */}
      <motion.section
        ref={heroRef}
        animate={heroControls}
        initial={{ opacity: 0, y: 40 }}
        className="relative isolate w-full overflow-hidden bg-black text-white"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/ActARion_intro.mp4"
          poster="/images/roles/career-product-manager-hero2.png"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-slate-900/60" aria-hidden="true" />
        <div className="relative z-10 flex min-h-[70vh] items-center justify-center px-4 py-20">
          <div className="section-inner text-center space-y-6">
            <p className="eyebrow text-actarion-blue">
              ActARion platform
            </p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl lg:text-6xl leading-tight">
              {heroTitle}
            </h1>
            <p className="section-lead mx-auto max-w-4xl text-white/85">
              {renderTextWithBrand(heroDescription)}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href={contactHref} className="btn btn-primary btn-pill">
                {dictionary.sections.contact.cta}
              </Link>
              <Link href={localizedUseCasesHref} className="btn btn-secondary btn-pill">
                {useCasesCta}
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Product video CTA */}
      <motion.section
        ref={videoEmbedRef}
        animate={videoEmbedControls}
        initial={{ opacity: 0, y: 40 }}
        className={`${sectionShell} space-y-8`}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="flex-1">
            <HomeVideoCta />
          </div>
          <div className="flex-1 space-y-4 text-slate-700">
            <h2 className={sectionTitle}>{seeInAction}</h2>
            <p className="text-base md:text-lg">
              {renderTextWithBrand(inActionDescription)}
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-600">
              <li>{previewBullet}</li>
              <li>{hseBullet}</li>
              <li>{auditBullet}</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* What We Do */}
      <motion.section
        ref={whatRef}
        animate={whatControls}
        initial={{ opacity: 0, y: 40 }}
        className={`${sectionShell} space-y-6`}
        id="what-we-do"
      >
        <div className="flex flex-col gap-6 mb-6">
          <div>
            <h2 className={sectionTitle}>
          {dictionary?.sections?.whatWeDo?.title || 
            (locale === 'de' ? 'Augmentierte Anleitung für operative Exzellenz' : 
             locale === 'nl' ? 'Augmented begeleiding voor operationele excellentie' : 
             'Augmented guidance for Operational Excellence')}
        </h2>
            <p className={sectionText}>
              {whatWeDoDescription ? 
                renderTextWithBrand(whatWeDoDescription) : 
                <>
                  {locale === 'de' ? (
                    <span>
                      Act<span className={accent}>AR</span>ion ist der europäische Partner von Deep Sight und bietet eine AR-first Connected-Worker-Plattform für Industrie, Logistik und Energie. Wir verwandeln SOPs und Handbücher in KI- und AR-gestützte digitale Arbeitsanweisungen, denen Bediener Schritt für Schritt auf Tablets oder Smart Glasses folgen können – was Präzision, Sicherheit und betriebliche Konsistenz verbessert.
                    </span>
                  ) : locale === 'nl' ? (
                    <span>
                      Act<span className={accent}>AR</span>ion is de Europese partner van Deep Sight en biedt een AR-first connected worker platform voor industrie, logistiek en energie. Wij transformeren SOPs en handleidingen naar AI en AR–geleide digitale werkinstructies die operators stap voor stap kunnen volgen op tablets of smart glasses—wat precisie, veiligheid en operationele consistentie verbetert.
                    </span>
                  ) : (
                    <span>
                      Act<span className={accent}>AR</span>ion is the European partner of Deep Sight, offering an AR-first connected worker platform for industrial, logistics and energy environments. We transform SOPs and manuals into AI and AR–guided digital work instructions that operators can follow step by step on tablets or smart glasses—enhancing precision, safety and operational consistency.
                    </span>
                  )}
                </>
              }
            </p>
          </div>
        </div>
      </motion.section>

      {/* Why AR-Powered SOPs */}
      <motion.section
        ref={whyRef}
        animate={whyControls}
        initial={{ opacity: 0, y: 40 }}
        className={`${sectionShell} space-y-6`}
        id="why-ar-sops"
      >
        <h2 className={sectionTitle}>
          {benefitsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {translatedBenefits.map(({ title, description, icon: Icon }) => (
            <div key={title} className="flex items-start gap-4">
              <Icon className="h-8 w-8 text-actarion-blue mt-1" />
              <div>
                <span className="font-semibold text-slate-900">
                  {title}
                </span>
                <p className="text-slate-600">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Use Case: AR Maintenance Instructions */}
      <motion.section
        ref={useCaseRef}
        animate={useCaseControls}
        initial={{ opacity: 0, y: 40 }}
        className={`${sectionShell} space-y-6`}
        id="use-case-maintenance"
      >
        <h2 className={sectionTitle}>{useCasesTitle}</h2>
        <p className={sectionText}>
          {renderTextWithBrand(useCasesDescription)}
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {useCases.map((useCase) => {
            const detailHref = buildLocalizedPath(
              normalizedLocale,
              useCase.slug
            );
            return (
              <article
                key={useCase.slug}
                className="card flex h-full flex-col gap-4"
              >
                <h3 className="text-xl font-semibold">
                  {useCase.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {useCase.shortDescription}
                </p>
                <Link
                  href={detailHref}
                  className="btn btn-link mt-auto justify-start px-0"
                >
                  {viewUseCase}
                  <span className="ml-1" aria-hidden="true">
                    →
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
        <div className="mt-8">
          <Link
            href={localizedUseCasesHref}
            className="btn btn-secondary btn-pill"
          >
            {viewAllUseCases}
          </Link>
        </div>
      </motion.section>

      {/* Industries We Support */}
      <motion.section
        ref={industriesRef}
        animate={industriesControls}
        initial={{ opacity: 0, y: 40 }}
        className={`${sectionShell} space-y-6`}
        id="industries"
      >
        <div className="w-full mb-6">
          <Image
            src="/images/roles/career-sales-engineer-hero.png"
            alt="ActARion Industries Header"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg"
            priority
          />
        </div>
        <h2 className={sectionTitle}>
          {industriesTitle}
        </h2>
        <p className={sectionText}>
          {industriesDescription}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {industries.map(({ title, icon: Icon }) => (
            <div
              key={title}
              className="card flex items-center gap-3"
            >
              <Icon className="h-6 w-6 text-actarion-blue" />
              <span className="font-medium">{industryTranslations[title as keyof typeof industryTranslations] || title}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        ref={howRef}
        animate={howControls}
        initial={{ opacity: 0, y: 40 }}
        className={`${sectionShell} space-y-6`}
        id="how-it-works"
      >
        <h2 className={sectionTitle}>
          {howWeStartTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {howWeStartSteps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="bg-actarion-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-card text-white">
                <span className="text-white font-bold text-xl">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* About ActARion */}
      <motion.section
        ref={aboutRef}
        animate={aboutControls}
        initial={{ opacity: 0, y: 40 }}
        className={`${sectionShell} space-y-6`}
        id="about"
      >
        <div className="w-full mb-6">
          <Image
            src="/images/roles/career-sales-engineer-hero.png"
            alt="ActARion About Header"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg"
            priority
          />
        </div>
        <h2 className={sectionTitle}>
          {dictionary?.sections?.about?.title || 
            (locale === 'de' ? 'Wo Aktion auf Augmented Reality trifft' : 
             locale === 'nl' ? 'Waar actie Augmented Reality ontmoet' : 
             'Where Action Meets Augmented Reality')}
        </h2>
        <p className={sectionText}>
          {aboutDescription ? 
            renderTextWithBrand(aboutDescription) : 
            <>
              {locale === 'de' ? (
                <span>
                  Act<span className={accent}>AR</span>ion ist der europäische Partner von Deep Sight und bietet eine AR-first Connected-Worker-Plattform für Industrie, Logistik und Energie. Wir verwandeln SOPs und Handbücher in KI- und AR-gestützte digitale Arbeitsanweisungen, denen Bediener Schritt für Schritt auf Tablets oder Smart Glasses folgen können.
                </span>
              ) : locale === 'nl' ? (
                <span>
                  Act<span className={accent}>AR</span>ion is de Europese partner van Deep Sight en biedt een AR-first connected worker platform voor industrie, logistiek en energie. Wij transformeren SOPs en handleidingen naar AI en AR–geleide digitale werkinstructies die operators stap voor stap kunnen volgen op tablets of smart glasses.
                </span>
              ) : (
                <span>
                  Act<span className={accent}>AR</span>ion is the European partner of Deep Sight, offering an AR-first connected worker platform for industrial, logistics and energy environments. We transform SOPs and manuals into AI and AR–guided digital work instructions that operators can follow step by step on tablets or smart glasses.
                </span>
              )}
            </>
          }
        </p>
      </motion.section>

      {/* Technology Partnerships */}
      <motion.section
        ref={partnersRef}
        animate={partnersControls}
        initial={{ opacity: 0, y: 40 }}
        className={`${sectionShell} space-y-6`}
        id="partnerships"
      >
        <h2 className={sectionTitle}>{dictionary.sections.partnerships.title}</h2>
        <p className={sectionText}>{dictionary.sections.partnerships.description}</p>
        <div className="mt-8">
          <Link
            href={partnerContactHref}
            className="btn btn-primary btn-pill"
          >
            {dictionary.sections.partnerships.cta}
          </Link>
        </div>
      </motion.section>

      {/* Contact Us */}
      <motion.section
        ref={contactRef}
        animate={contactControls}
        initial={{ opacity: 0, y: 40 }}
        className={`${sectionShell} space-y-6`}
        id="contact"
      >
        <h2 className={sectionTitle}>{dictionary.sections.contact.title}</h2>
      <p className={sectionText}>
        {contactDescription ? renderTextWithBrand(contactDescription) : dictionary.sections.contact.description}
        </p>
        <div className="mt-8">
          <Link
            href={contactHref}
            className="btn btn-primary btn-pill flex items-center gap-2 mx-auto"
          >
            <PhoneArrowUpRightIcon className="h-5 w-5" />
            {dictionary.sections.contact.cta}
          </Link>
        </div>
      </motion.section>

      {/* Timed Promo Popup */}
      <div
        className={`fixed left-4 right-4 bottom-4 sm:left-auto sm:right-6 sm:bottom-6 z-[10000] transition-all duration-300 ${
          shouldShowPromo ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-2'
        }`}
      >
        <div className="summary summary--floating relative w-full sm:w-[360px]">
            <button
            type="button"
            aria-label="Close"
            onClick={dismissPromoPopup}
            className="absolute top-2 right-2 text-slate-500 hover:text-slate-700"
          >
            ×
          </button>
          <div className="text-slate-900 font-semibold text-lg mb-2">
            {dictionary?.promoPopup?.title || (
              locale === 'de'
                ? 'Erfahren Sie, wie ActARion digitale Transformation und Qualitätssicherung ermöglicht.'
                : locale === 'nl'
                ? 'Leer hoe ActARion digitale transformatie en kwaliteitsborging mogelijk maakt.'
                : 'Learn how ActARion enables digital transformation and quality assurance.'
            )}
          </div>
          <p className="text-slate-600 mb-4">
            {dictionary?.promoPopup?.description || (
              locale === 'de'
                ? 'Fordern Sie unser zweiseitiges Infoblatt für die wichtigsten Einblicke an.'
                : locale === 'nl'
                ? 'Vraag onze two‑pager aan voor de belangrijkste inzichten.'
                : 'Request our two-pager for key insights.'
            )}
          </p>
          <a
            href="https://eu1.hubs.ly/H0mpm0k0"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full justify-center"
          >
            {dictionary?.promoPopup?.cta || (
              locale === 'de'
                ? 'Infoblatt herunterladen'
                : locale === 'nl'
                ? 'Two‑pager downloaden'
                : 'Download the two‑pager'
            )}
          </a>
        </div>
      </div>
    </main>
  );
} 