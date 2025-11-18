"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PhoneArrowUpRightIcon } from "@heroicons/react/24/outline";
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

  return (
    <main className="bg-white text-slate-900">
      {/* Video hero */}
      <motion.section
        ref={heroRef}
        animate={heroControls}
        initial={{ opacity: 0, y: 40 }}
        className="relative w-full min-h-[70vh] overflow-hidden"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/ActARion header1.png"
        >
          <source src="/ActARion_intro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative flex h-full items-center justify-center px-4 py-24">
          <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight">
            Work faster, safer and smarter with AI and Augmented Reality
          </h1>
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
                      Act<span className={accent}>AR</span>ion bietet fortschrittliche AR-gestützte Software, die traditionelle SOPs in immersive, schrittweise visuelle Arbeitsabläufe verwandelt. Mit AR-Brillen oder mobilen Geräten kann Ihre Belegschaft Echtzeit-Anweisungen überlagert auf physischen Umgebungen befolgen – was Präzision, Sicherheit und betriebliche Konsistenz verbessert.
                    </span>
                  ) : locale === 'nl' ? (
                    <span>
                      Act<span className={accent}>AR</span>ion biedt geavanceerde AR-aangedreven software die traditionele SOPs omzet in immersieve, stap-voor-stap visuele workflows. Met AR-brillen of mobiele apparaten kan uw personeel real-time instructies volgen die over fysieke omgevingen heen worden geprojecteerd—wat precisie, veiligheid en operationele consistentie verbetert.
                    </span>
                  ) : (
                    <span>
                      Act<span className={accent}>AR</span>ion provides advanced AR-driven software that turns traditional SOPs into immersive, step-by-step visual workflows. Using AR glasses or mobile devices, your workforce can follow real-time instructions overlaid on physical environments—enhancing precision, safety, and operational consistency.
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
          Why “faster, safer, smarter” is the new baseline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {benefits.map(({ title, description, icon: Icon }) => (
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
        <h2 className={sectionTitle}>Where AR guidance creates value</h2>
        <p className={sectionText}>
          Explore practical use cases that show how ActARion and DeepSight help teams work faster, safer and smarter with augmented reality guidance and data capture.
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
                  View use case
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
            View all use cases
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
            src="/ActARion header2.png"
            alt="ActARion Industries Header"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg"
            priority
          />
        </div>
        <h2 className={sectionTitle}>
          Where AR and AI create impact first
        </h2>
        <p className={sectionText}>
          On the shop floor and in the field, onboarding takes too long, experts are overloaded and compliance depends on a few people. AR and AI help most in concrete situations like onboarding, guided production, changeovers and maintenance.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {industries.map(({ title, icon: Icon }) => (
            <div
              key={title}
              className="card flex items-center gap-3"
            >
              <Icon className="h-6 w-6 text-actarion-blue" />
              <span className="font-medium">{title}</span>
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
          How we start
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {howItWorksSteps.map((step, index) => (
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
            src="/ActARion header 3.png"
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
                  Act<span className={accent}>AR</span>ion ist an der Spitze der industriellen AR-Innovation und liefert Lösungen, die die Lücke zwischen digitalen Anweisungen und physischer Ausführung überbrücken. Unsere Plattform verwandelt komplexe Verfahren in intuitive, visuelle Erfahrungen, die die Arbeitsleistung und betriebliche Ergebnisse verbessern.
                </span>
              ) : locale === 'nl' ? (
                <span>
                  Act<span className={accent}>AR</span>ion staat aan de voorhoede van industriële AR-innovatie en levert oplossingen die de kloof tussen digitale instructies en fysieke uitvoering overbruggen. Ons platform transformeert complexe procedures in intuïtieve, visuele ervaringen die de werkprestaties en operationele resultaten verbeteren.
                </span>
              ) : (
                <span>
                  Act<span className={accent}>AR</span>ion is at the forefront of industrial AR innovation, delivering solutions that bridge the gap between digital instructions and physical execution. Our platform transforms complex procedures into intuitive, visual experiences that enhance work performance and operational outcomes.
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