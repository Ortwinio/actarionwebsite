"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircleIcon, DevicePhoneMobileIcon, WrenchScrewdriverIcon, BoltIcon, Cog6ToothIcon, GlobeAltIcon, UserGroupIcon, ChartBarIcon, AcademicCapIcon, SparklesIcon, PhoneArrowUpRightIcon } from "@heroicons/react/24/outline";

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

const sectionClass = "max-w-3xl w-full mx-auto px-4 py-16 sm:py-24";
const sectionTitle = "text-3xl sm:text-4xl font-bold mb-6 text-white tracking-tight";
const sectionText = "text-lg sm:text-xl text-gray-300 mb-4";
const accent = "text-cyan-400";

interface HomePageClientProps {
  locale: string;
  dictionary: any;
}

export default function HomePageClient({ locale, dictionary }: HomePageClientProps) {
  // Video ref for programmatic control
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);



  // Hide video on scroll down, show on scroll to top
  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      const video = videoRef.current;
      
      if (window.scrollY > 100) { // Hide video after scrolling 100px
        if (showVideo) {
          setShowVideo(false);
          setIsVideoPlaying(false);
          if (video) {
            video.pause();
          }
        }
      } else { // Show video when back at top
        if (!showVideo) {
          setShowVideo(true);
          if (video) {
            // Reset video to beginning and play
            video.currentTime = 0;
            video.play().then(() => {
              setIsVideoPlaying(true);
              console.log('✅ Video restarted when scrolling to top');
            }).catch(err => {
              console.log('❌ Failed to restart video:', err);
            });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showVideo]);

  // Ensure video autoplays
  useEffect(() => {
    if (!isClient) return;
    
    const video = videoRef.current;
    if (video) {
      console.log('🎬 Video element found:', video);
      console.log('🎬 Video src:', video.src);
      console.log('🎬 Video readyState:', video.readyState);
      
      // Try to play the video
      const playVideo = async () => {
        try {
          console.log('🎬 Attempting to play video...');
          await video.play();
          console.log('✅ Video autoplay successful');
        } catch (error) {
          console.log('❌ Autoplay failed:', error);
          // Add click listener to start video on first user interaction
          const startVideo = () => {
            console.log('🎬 Starting video on user interaction...');
            video.play().then(() => {
              console.log('✅ Video started on user interaction');
            }).catch(err => {
              console.error('❌ Failed to start video on user interaction:', err);
            });
            document.removeEventListener('click', startVideo);
          };
          document.addEventListener('click', startVideo);
        }
      };
      
      if (video.readyState >= 2) {
        console.log('🎬 Video ready, attempting to play...');
        playVideo();
      } else {
        console.log('🎬 Video not ready, waiting for canplay event...');
        video.addEventListener('canplay', () => {
          console.log('🎬 Video can play event fired');
          playVideo();
        });
      }

      // Add more event listeners for debugging
      video.addEventListener('loadstart', () => {
        console.log('🎬 Video loadstart');
        setIsVideoLoading(true);
      });
      video.addEventListener('loadedmetadata', () => {
        console.log('🎬 Video loadedmetadata');
      });
      video.addEventListener('loadeddata', () => {
        console.log('🎬 Video loadeddata');
      });
      video.addEventListener('canplay', () => {
        console.log('🎬 Video canplay');
        setIsVideoLoading(false);
        // Auto-play the video when it's ready
        video.play().then(() => {
          console.log('✅ Video autoplay successful');
          setIsVideoPlaying(true);
        }).catch(err => {
          console.log('❌ Autoplay failed, waiting for user interaction:', err.message);
        });
      });
      video.addEventListener('canplaythrough', () => {
        console.log('🎬 Video canplaythrough');
      });
      video.addEventListener('play', () => {
        console.log('🎬 Video play');
        setIsVideoLoading(false);
        setIsVideoPlaying(true);
      });
      video.addEventListener('playing', () => {
        console.log('🎬 Video playing');
        setIsVideoLoading(false);
        setIsVideoPlaying(true);
      });
      video.addEventListener('pause', () => {
        console.log('🎬 Video paused');
        setIsVideoPlaying(false);
      });
      video.addEventListener('ended', () => {
        console.log('🎬 Video ended, restarting...');
        // Video will auto-restart due to loop attribute
      });
      video.addEventListener('error', (e) => {
        console.error('❌ Video error:', e);
        setIsVideoLoading(false);
        setIsVideoPlaying(false);
      });
    } else {
      console.error('❌ Video element not found');
    }
  }, []);

  // Animation refs
  const [heroRef, heroControls] = useInView(0.3);
  const [whatRef, whatControls] = useInView(0.2);
  const [whyRef, whyControls] = useInView(0.2);
  const [useCaseRef, useCaseControls] = useInView(0.2);
  const [industriesRef, industriesControls] = useInView(0.2);
  const [howRef, howControls] = useInView(0.2);
  const [aboutRef, aboutControls] = useInView(0.2);
  const [partnersRef, partnersControls] = useInView(0.2);
  const [contactRef, contactControls] = useInView(0.2);

  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans">
      {/* Sticky Background Video Container */}
      <div className="fixed inset-0 w-full h-full z-0 bg-gradient-to-br from-neutral-900 to-neutral-950">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ 
            display: isClient ? (showVideo ? 'block' : 'none') : 'block',
            opacity: 0.8,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
        >
          <source src="/Actarion_intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Hero Content */}
      <motion.section
        ref={heroRef}
        animate={heroControls}
        initial={{ opacity: 0, y: 40 }}
        className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 text-center gap-8 z-10"
      >
        <div className="relative z-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-8 sm:justify-center sm:items-center w-full">
          <Image
            src="/Actarionlogo.png"
            alt="Actarion logo"
            width={80}
            height={80}
            className="mx-auto sm:mx-0 drop-shadow-lg"
            priority
          />
          <span className="text-4xl sm:text-6xl font-extrabold tracking-widest text-white uppercase">
            act<span className="text-cyan-400">AR</span>ion
          </span>
        </div>
        <h1 className="relative z-10 text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 max-w-2xl mt-4">
          {dictionary?.hero?.title ? 
            dictionary.hero.title.split('Augmented Reality').map((part: string, index: number) => 
              index === 0 ? (
                <span key={index}>
                  {part}<span className={accent}>Augmented Reality</span>
                </span>
              ) : (
                <span key={index}>{part}</span>
              )
            ) : 
            <span>
              {locale === 'de' ? 'Revolutionieren Sie die SOP-Ausführung mit ' :
               locale === 'nl' ? 'Revolutioneer SOP-uitvoering met ' :
               'Revolutionize SOP Execution with '}
              <span className={accent}>Augmented Reality</span>
            </span>
          }
        </h1>
        <p className="relative z-10 text-xl sm:text-2xl text-gray-300 max-w-2xl mb-6">
          {dictionary?.hero?.subtitle ? 
            dictionary.hero.subtitle.split('actARion').map((part: string, index: number) => 
              index === 0 ? (
                <span key={index}>
                  act<span className={accent}>AR</span>ion{part}
                </span>
              ) : (
                <span key={index}>{part}</span>
              )
            ) : 
            <>
              {locale === 'de' ? (
                <span>
                  Transformieren Sie Ihre Frontline-Operationen mit <strong>augmentierten Realität SOPs</strong>. 
                  act<span className={accent}>AR</span>ion liefert schrittweise <strong>AR-Arbeitsanweisungen</strong> direkt ins Feld — 
                  Verbesserung von Sicherheit, Genauigkeit und Trainingsgeschwindigkeit.
                </span>
              ) : locale === 'nl' ? (
                <span>
                  Transformeer uw frontline operaties met <strong>augmented reality SOPs</strong>. 
                  act<span className={accent}>AR</span>ion levert stap-voor-stap <strong>AR-werkinstructies</strong> direct in het veld — 
                  verbetering van veiligheid, nauwkeurigheid en trainingssnelheid.
                </span>
              ) : (
                <span>
                  Transform your frontline operations with <strong>augmented reality SOPs</strong>. 
                  act<span className={accent}>AR</span>ion delivers step-by-step <strong>AR work instructions</strong> directly into the field — 
                  improving safety, accuracy, and training speed.
                </span>
              )}
            </>
          }
        </p>
        <a
          href={locale === 'en' ? '/contact' : `/${locale}/contact`}
          className="relative z-10 inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-colors flex items-center gap-2"
        >
          <PhoneArrowUpRightIcon className="h-6 w-6" />
          {dictionary?.hero?.cta || 
            (locale === 'de' ? 'AR SOPs in Aktion sehen' : 
             locale === 'nl' ? 'AR SOPs in actie zien' : 
             'See AR SOPs in Action')}
        </a>
        <a
          href={locale === 'en' ? '/about' : `/${locale}/about`}
          className="relative z-10 inline-block mt-4 text-cyan-400 hover:underline text-base font-medium"
        >
          {dictionary?.hero?.aboutLink || 
            (locale === 'de' ? 'Über uns' : 
             locale === 'nl' ? 'Over ons' : 
             'About Us')}
        </a>
      </motion.section>

      {/* What We Do */}
      <motion.section
        ref={whatRef}
        animate={whatControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass + " bg-neutral-900 bg-opacity-50 backdrop-blur-sm"}
        id="what-we-do"
      >
        <div className="flex flex-col gap-6 mb-6">
          <div>
            <h2 className={sectionTitle}>
          {dictionary?.sections?.whatWeDo?.title || 
            (locale === 'de' ? 'Augmentierte SOPs für Frontline-Exzellenz' : 
             locale === 'nl' ? 'Augmented SOPs voor Frontline Excellentie' : 
             'Augmented SOPs for Frontline Excellence')}
        </h2>
            <p className={sectionText}>
              {dictionary?.sections?.whatWeDo?.description ? 
                dictionary.sections.whatWeDo.description.split('actARion').map((part: string, index: number) => 
                  index === 0 ? (
                    <span key={index}>
                      act<span className={accent}>AR</span>ion{part}
                    </span>
                  ) : (
                    <span key={index}>{part}</span>
                  )
                ) : 
                <>
                  {locale === 'de' ? (
                    <span>
                      act<span className={accent}>AR</span>ion bietet fortschrittliche AR-gestützte Software, die traditionelle SOPs in immersive, schrittweise visuelle Arbeitsabläufe verwandelt. Mit AR-Brillen oder mobilen Geräten kann Ihre Belegschaft Echtzeit-Anweisungen überlagert auf physischen Umgebungen befolgen – was Präzision, Sicherheit und betriebliche Konsistenz verbessert.
                    </span>
                  ) : locale === 'nl' ? (
                    <span>
                      act<span className={accent}>AR</span>ion biedt geavanceerde AR-aangedreven software die traditionele SOPs omzet in immersieve, stap-voor-stap visuele workflows. Met AR-brillen of mobiele apparaten kan uw personeel real-time instructies volgen die over fysieke omgevingen heen worden geprojecteerd—wat precisie, veiligheid en operationele consistentie verbetert.
                    </span>
                  ) : (
                    <span>
                      act<span className={accent}>AR</span>ion provides advanced AR-driven software that turns traditional SOPs into immersive, step-by-step visual workflows. Using AR glasses or mobile devices, your workforce can follow real-time instructions overlaid on physical environments—enhancing precision, safety, and operational consistency.
                    </span>
                  )}
                </>
              }
            </p>
          </div>
          <div className="w-full">
            <Image
              src="/ActARion header1.png"
              alt="ActARion Header Image"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </motion.section>

      {/* Why AR-Powered SOPs */}
      <motion.section
        ref={whyRef}
        animate={whyControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass + " bg-neutral-900 bg-opacity-50 backdrop-blur-sm"}
        id="why-ar-sops"
      >
        <h2 className={sectionTitle}>
          {dictionary?.sections?.whyAR?.title || 
            (locale === 'de' ? 'Warum ActARion für SOP-Exzellenz wählen?' : 
             locale === 'nl' ? 'Waarom ActARion kiezen voor SOP-excellentie?' : 
             'Why Choose ActARion for SOP Excellence')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="flex items-start gap-4">
            <DevicePhoneMobileIcon className="h-8 w-8 text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-white">
                {dictionary?.sections?.whyAR?.features?.handsFree?.title || 
                  (locale === 'de' ? 'No-Code Digitale SOP-Erstellung:' : 
                   locale === 'nl' ? 'No-Code Digitale SOP-ontwikkeling:' : 
                   'No-Code Digital SOP Authoring:')}
              </span>
              <p className="text-gray-300">
                {dictionary?.sections?.whyAR?.features?.handsFree?.description || 
                  (locale === 'de' ? 'Unser intuitives Studio ermöglicht es Ihnen, interaktive SOPs in Minuten zu erstellen. Im Gegensatz zu traditionellen Systemen ist ActARion eine vollwertige <em>digitale SOP-Software</em>-Plattform, die für Geschwindigkeit und Flexibilität entwickelt wurde — keine Entwickler erforderlich.' : 
                   locale === 'nl' ? 'Onze intuïtieve Studio laat u interactieve SOPs in minuten maken. In tegenstelling tot traditionele systemen is ActARion een volledig uitgeruste <em>digitale SOP-software</em> platform gebouwd voor snelheid en flexibiliteit — geen ontwikkelaars nodig.' : 
                   'Our intuitive Studio lets you create interactive SOPs in minutes. Unlike traditional systems, ActARion is a full-featured <em>digital SOP software</em> platform built for speed and flexibility — no developers required.')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircleIcon className="h-8 w-8 text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-white">
                {dictionary?.sections?.whyAR?.features?.realTime?.title || 
                  (locale === 'de' ? 'AR-Training für Fertigungsteams:' : 
                   locale === 'nl' ? 'AR-training voor productieteams:' : 
                   'AR Training for Manufacturing Teams:')}
              </span>
              <p className="text-gray-300">
                {dictionary?.sections?.whyAR?.features?.realTime?.description || 
                  (locale === 'de' ? 'Liefern Sie immersives Training am Arbeitsplatz mit Echtzeit-<em>AR-Arbeitsanweisungen</em>. Arbeiter lernen schneller und leisten bessere Arbeit, wenn sie visuellen SOPs folgen können, die in ihren Arbeitsbereich projiziert werden.' : 
                   locale === 'nl' ? 'Lever immersieve training op de werkplek met real-time <em>AR-werkinstructies</em>. Werknemers leren sneller en presteren beter wanneer ze visuele SOPs kunnen volgen die in hun werkruimte worden geprojecteerd.' : 
                   'Deliver immersive, on-the-job training using real-time <em>AR work instructions</em>. Workers learn faster and perform better when they can follow visual SOPs projected into their workspace.')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <SparklesIcon className="h-8 w-8 text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-white">
                {dictionary?.sections?.whyAR?.features?.safety?.title || 
                  (locale === 'de' ? 'KI-gestützte Schrittvalidierung:' : 
                   locale === 'nl' ? 'AI-aangedreven stapvalidatie:' : 
                   'AI-Powered Step Validation:')}
              </span>
              <p className="text-gray-300">
                {dictionary?.sections?.whyAR?.features?.safety?.description || 
                  (locale === 'de' ? 'Jeder Schritt wird automatisch von unserer KI-Engine verifiziert — Fehler reduzieren und die Ausführung standardisieren.' : 
                   locale === 'nl' ? 'Elke stap wordt automatisch geverifieerd door onze AI-engine — fouten verminderen en uitvoering standaardiseren.' : 
                   'Each step is verified automatically by our AI engine — reducing mistakes and standardizing execution.')}
              </p>
            </div>
          </div>

        </div>
      </motion.section>

      {/* Use Case: AR Maintenance Instructions */}
      <motion.section
        ref={useCaseRef}
        animate={useCaseControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass + " bg-neutral-900 bg-opacity-50 backdrop-blur-sm"}
        id="use-case-maintenance"
      >
        <h2 className={sectionTitle}>
          {dictionary?.sections?.useCase?.title || 
            (locale === 'de' ? 'Feldservice-Qualität mit AR-Wartungsanweisungen steigern' : 
             locale === 'nl' ? 'Veldservice-kwaliteit verhogen met AR-onderhoudsinstructies' : 
             'Boost Field Service Quality with AR Maintenance Instructions')}
        </h2>
        <p className={sectionText}>
          {dictionary?.sections?.useCase?.description || 
            (locale === 'de' ? 'Von der Wartung bis zur Inspektion können Frontline-Mitarbeiter <strong>AR-Wartungsanweisungen</strong> freihändig mit Smart Glasses oder Tablets befolgen. Geführte Visualisierungen und Echtzeit-Warnungen stellen sicher, dass jeder Schritt richtig ausgeführt wird — auch unter Druck.' : 
             locale === 'nl' ? 'Van onderhoud tot inspecties kunnen frontline werknemers <strong>AR-onderhoudsinstructies</strong> handenvrij volgen met smart glasses of tablets. Begeleide visuals en real-time alerts zorgen ervoor dat elke stap goed wordt uitgevoerd — zelfs onder druk.' : 
             'From maintenance to inspections, frontline workers can follow <strong>AR maintenance instructions</strong> hands-free using smart glasses or tablets. Guided visuals and real-time alerts ensure every step is done right — even under pressure.')}
        </p>
      </motion.section>

      {/* Industries We Support */}
      <motion.section
        ref={industriesRef}
        animate={industriesControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass + " bg-neutral-900 bg-opacity-50 backdrop-blur-sm"}
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
          {dictionary?.sections?.industries?.title || 
            (locale === 'de' ? 'Industrien, die wir unterstützen' : 
             locale === 'nl' ? 'Industrieën die we ondersteunen' : 
             'Industries We Support')}
        </h2>
        <p className={sectionText}>
          {dictionary?.sections?.industries?.description || 
            (locale === 'de' ? 'actARions AR-gestützte SOP-Lösungen sind für Industrien konzipiert, in denen Präzision, Sicherheit und betriebliche Exzellenz kritisch sind.' : 
             locale === 'nl' ? 'actARions AR-aangedreven SOP-oplossingen zijn ontworpen voor industrieën waar precisie, veiligheid en operationele excellentie cruciaal zijn.' : 
             'actARions AR-powered SOP solutions are designed for industries where precision, safety, and operational excellence are critical.')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="flex items-center gap-3 p-4 bg-neutral-800 bg-opacity-50 rounded-lg">
            <Cog6ToothIcon className="h-6 w-6 text-cyan-400" />
            <span className="text-white font-medium">Industrial Manufacturing</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-neutral-800 bg-opacity-50 rounded-lg">
            <BoltIcon className="h-6 w-6 text-cyan-400" />
            <span className="text-white font-medium">Energy & Utilities</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-neutral-800 bg-opacity-50 rounded-lg">
            <GlobeAltIcon className="h-6 w-6 text-cyan-400" />
            <span className="text-white font-medium">Aerospace</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-neutral-800 bg-opacity-50 rounded-lg">
            <SparklesIcon className="h-6 w-6 text-cyan-400" />
            <span className="text-white font-medium">Pharma & Biotech</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-neutral-800 bg-opacity-50 rounded-lg">
            <WrenchScrewdriverIcon className="h-6 w-6 text-cyan-400" />
            <span className="text-white font-medium">Field Services</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-neutral-800 bg-opacity-50 rounded-lg">
            <UserGroupIcon className="h-6 w-6 text-cyan-400" />
            <span className="text-white font-medium">Maintenance Operations</span>
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        ref={howRef}
        animate={howControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass + " bg-neutral-900 bg-opacity-50 backdrop-blur-sm"}
        id="how-it-works"
      >
        <h2 className={sectionTitle}>
          {dictionary?.sections?.howItWorks?.title || 
            (locale === 'de' ? 'Wie es funktioniert' : 
             locale === 'nl' ? 'Hoe het werkt' : 
             'How It Works')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="text-center">
            <div className="bg-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{dictionary.sections.howItWorks.steps.step1.title}</h3>
            <p className="text-gray-300">{dictionary.sections.howItWorks.steps.step1.description}</p>
          </div>
          <div className="text-center">
            <div className="bg-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{dictionary.sections.howItWorks.steps.step2.title}</h3>
            <p className="text-gray-300">{dictionary.sections.howItWorks.steps.step2.description}</p>
          </div>
          <div className="text-center">
            <div className="bg-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{dictionary.sections.howItWorks.steps.step3.title}</h3>
            <p className="text-gray-300">{dictionary.sections.howItWorks.steps.step3.description}</p>
          </div>
        </div>
      </motion.section>

      {/* About ActARion */}
      <motion.section
        ref={aboutRef}
        animate={aboutControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass + " bg-neutral-900 bg-opacity-50 backdrop-blur-sm"}
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
          {dictionary?.sections?.about?.description ? 
            dictionary.sections.about.description.split('actARion').map((part: string, index: number) => 
              index === 0 ? (
                <span key={index}>
                  act<span className={accent}>AR</span>ion{part}
                </span>
              ) : (
                <span key={index}>{part}</span>
              )
            ) : 
            <>
              {locale === 'de' ? (
                <span>
                  act<span className={accent}>AR</span>ion ist an der Spitze der industriellen AR-Innovation und liefert Lösungen, die die Lücke zwischen digitalen Anweisungen und physischer Ausführung überbrücken. Unsere Plattform verwandelt komplexe Verfahren in intuitive, visuelle Erfahrungen, die die Arbeitsleistung und betriebliche Ergebnisse verbessern.
                </span>
              ) : locale === 'nl' ? (
                <span>
                  act<span className={accent}>AR</span>ion staat aan de voorhoede van industriële AR-innovatie en levert oplossingen die de kloof tussen digitale instructies en fysieke uitvoering overbruggen. Ons platform transformeert complexe procedures in intuïtieve, visuele ervaringen die de werkprestaties en operationele resultaten verbeteren.
                </span>
              ) : (
                <span>
                  act<span className={accent}>AR</span>ion is at the forefront of industrial AR innovation, delivering solutions that bridge the gap between digital instructions and physical execution. Our platform transforms complex procedures into intuitive, visual experiences that enhance work performance and operational outcomes.
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
        className={sectionClass + " bg-neutral-900 bg-opacity-50 backdrop-blur-sm"}
        id="partnerships"
      >
        <h2 className={sectionTitle}>{dictionary.sections.partnerships.title}</h2>
        <p className={sectionText}>{dictionary.sections.partnerships.description}</p>
        <div className="mt-8">
          <a
            href={locale === 'en' ? '/partner-contact' : `/${locale}/partner-contact`}
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-colors"
          >
            {dictionary.sections.partnerships.cta}
          </a>
        </div>
      </motion.section>

      {/* Contact Us */}
      <motion.section
        ref={contactRef}
        animate={contactControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass + " bg-neutral-900 bg-opacity-50 backdrop-blur-sm"}
        id="contact"
      >
        <h2 className={sectionTitle}>{dictionary.sections.contact.title}</h2>
        <p className={sectionText}>
          {dictionary.sections.contact.description.split('actARion').map((part: string, index: number) => 
            index === 0 ? (
              <span key={index}>
                act<span className={accent}>AR</span>ion{part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </p>
        <div className="mt-8">
          <a
            href={locale === 'en' ? '/contact' : `/${locale}/contact`}
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <PhoneArrowUpRightIcon className="h-5 w-5" />
            {dictionary.sections.contact.cta}
          </a>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-neutral-900 bg-opacity-50 backdrop-blur-sm border-t border-neutral-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/Actarionlogo.png"
                  alt="ActARion Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold text-white">
                  act<span className="text-cyan-400">AR</span>ion
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                {dictionary.footer.copyright}
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{dictionary.footer.sitemap}</h3>
              <ul className="space-y-2">
                <li>
                  <a href={locale === 'en' ? '/about' : `/${locale}/about`} className="text-gray-300 hover:text-cyan-400 transition-colors">
                    {dictionary.navigation.about}
                  </a>
                </li>
                <li>
                  <a href={locale === 'en' ? '/contact' : `/${locale}/contact`} className="text-gray-300 hover:text-cyan-400 transition-colors">
                    {dictionary.navigation.demo}
                  </a>
                </li>
                <li>
                  <a href={locale === 'en' ? '/career' : `/${locale}/career`} className="text-gray-300 hover:text-cyan-400 transition-colors">
                    {dictionary.navigation.career}
                  </a>
                </li>
                <li>
                  <a href={locale === 'en' ? '/faq' : `/${locale}/faq`} className="text-gray-300 hover:text-cyan-400 transition-colors">
                    {dictionary.navigation.faq}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href={locale === 'en' ? '/terms' : `/${locale}/terms`} className="text-gray-300 hover:text-cyan-400 transition-colors">
                    {dictionary.footer.terms}
                  </a>
                </li>
                <li>
                  <a href={locale === 'en' ? '/privacy' : `/${locale}/privacy`} className="text-gray-300 hover:text-cyan-400 transition-colors">
                    {dictionary.footer.privacy}
                  </a>
                </li>
                <li>
                  <a href="/onepager.png" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors">
                    {dictionary.footer.onepager}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 