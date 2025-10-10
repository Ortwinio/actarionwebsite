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
const sectionTitle = "text-3xl sm:text-4xl font-bold mb-6 text-black dark:text-white tracking-tight";
const sectionText = "text-lg sm:text-xl text-gray-800 dark:text-gray-300 mb-4";
const accent = "text-cyan-500 dark:text-cyan-400";

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
  const [showPromoPopup, setShowPromoPopup] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);



  // Timed promo popup (3s after mount)
  useEffect(() => {
    if (!isClient) return;
    try {
      const dismissed = sessionStorage.getItem('promoPopupDismissed') === 'true';
      if (dismissed) return;
    } catch {}
    const timer = setTimeout(() => setShowPromoPopup(true), 3000);
    return () => clearTimeout(timer);
  }, [isClient]);

  const dismissPromoPopup = () => {
    setShowPromoPopup(false);
    try { sessionStorage.setItem('promoPopupDismissed', 'true'); } catch {}
  };

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
    <div className="bg-white dark:bg-neutral-950 min-h-screen text-black dark:text-white font-sans">
      {/* Sticky Background Video Container */}
      <div className="fixed inset-0 w-full h-full z-0 bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950">
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
          <span className="text-4xl sm:text-6xl font-extrabold tracking-widest text-black dark:text-white uppercase">
            act<span className="text-cyan-500 dark:text-cyan-400">AR</span>ion
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
        <p className="relative z-10 text-xl sm:text-2xl text-gray-800 dark:text-gray-300 max-w-2xl mb-6">
          {dictionary?.hero?.subtitle ? (
            // Replace any case-insensitive occurrences of ActARion/actARion with accented brand once
            <span dangerouslySetInnerHTML={{
              __html: dictionary.hero.subtitle.replace(/actARion/gi, 'ActARion')
                .replace(/ActARion/g, `act<span class="${accent.replace(/\s+/g, ' ')}">AR</span>ion`)
            }} />
          ) : (
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
          )}
        </p>
        <a
          href={locale === 'en' ? '/contact' : `/${locale}/contact`}
          className="relative z-10 inline-block bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-cyan-400 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-colors flex items-center gap-2"
        >
          <PhoneArrowUpRightIcon className="h-6 w-6" />
          {dictionary?.hero?.cta || 
            (locale === 'de' ? 'AR SOPs in Aktion sehen' : 
             locale === 'nl' ? 'AR SOPs in actie zien' : 
             'See AR SOPs in Action')}
        </a>
        <a
          href={locale === 'en' ? '/about' : `/${locale}/about`}
          className="relative z-10 inline-block mt-4 text-cyan-500 dark:text-cyan-400 hover:underline text-base font-medium"
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
        className={sectionClass + " bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-50 backdrop-blur-sm"}
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
        className={sectionClass + " bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-50 backdrop-blur-sm"}
        id="why-ar-sops"
      >
        <h2 className={sectionTitle}>
          Why Augmented Reality guidance in operations?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div className="flex items-start gap-4">
            <DevicePhoneMobileIcon className="h-8 w-8 text-cyan-500 dark:text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-black dark:text-white">
                Hassle free on topic Guidance:
              </span>
              <p className="text-gray-800 dark:text-gray-300">
                Workers receive the actual and crucial visual instructions for the next step through their AR headsets/tablet/Smartphone—no paper, no guesswork.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircleIcon className="h-8 w-8 text-cyan-500 dark:text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-black dark:text-white">
                Better and faster onboarding:
              </span>
              <p className="text-gray-800 dark:text-gray-300">
                New employees ramp up faster and more focused with AR-guided, on-the-job learning instead of lengthy documentation.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <SparklesIcon className="h-8 w-8 text-cyan-500 dark:text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-black dark:text-white">
                Operational Analytics & Protocolling:
              </span>
              <p className="text-gray-800 dark:text-gray-300">
                Monitoring the execution of procedures and optimizing the execution with real time performance data. Also crucial steps in the procedure can be protocolled to assure compliance.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <BoltIcon className="h-8 w-8 text-cyan-500 dark:text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-black dark:text-white">
                Avoiding mistakes & safety risks:
              </span>
              <p className="text-gray-800 dark:text-gray-300">
                Real-time SOPs minimize mistakes and ensure process adherence and safety guidelines.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <GlobeAltIcon className="h-8 w-8 text-cyan-500 dark:text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-black dark:text-white">
                Remote Support Integration:
              </span>
              <p className="text-gray-800 dark:text-gray-300">
                Live Expert Assistance, Seamlessly Embedded in Augmented Reality.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <UserGroupIcon className="h-8 w-8 text-cyan-500 dark:text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-black dark:text-white">
                Your guidance, your control:
              </span>
              <p className="text-gray-800 dark:text-gray-300">
                We equip your team to create and maintain their own digital user guidance, ensuring independence and long-term value.
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
        className={sectionClass + " bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-50 backdrop-blur-sm"}
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
        className={sectionClass + " bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-50 backdrop-blur-sm"}
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
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-neutral-800 bg-opacity-80 dark:bg-opacity-50 rounded-lg border border-gray-200 dark:border-neutral-700">
            <Cog6ToothIcon className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
            <span className="text-black dark:text-white font-medium">Industrial Manufacturing</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-neutral-800 bg-opacity-80 dark:bg-opacity-50 rounded-lg border border-gray-200 dark:border-neutral-700">
            <BoltIcon className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
            <span className="text-black dark:text-white font-medium">Energy & Utilities</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-neutral-800 bg-opacity-80 dark:bg-opacity-50 rounded-lg border border-gray-200 dark:border-neutral-700">
            <GlobeAltIcon className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
            <span className="text-black dark:text-white font-medium">Aerospace</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-neutral-800 bg-opacity-80 dark:bg-opacity-50 rounded-lg border border-gray-200 dark:border-neutral-700">
            <SparklesIcon className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
            <span className="text-black dark:text-white font-medium">Pharma & Biotech</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-neutral-800 bg-opacity-80 dark:bg-opacity-50 rounded-lg border border-gray-200 dark:border-neutral-700">
            <WrenchScrewdriverIcon className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
            <span className="text-black dark:text-white font-medium">Field Services</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-neutral-800 bg-opacity-80 dark:bg-opacity-50 rounded-lg border border-gray-200 dark:border-neutral-700">
            <UserGroupIcon className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
            <span className="text-black dark:text-white font-medium">Maintenance Operations</span>
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        ref={howRef}
        animate={howControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass + " bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-50 backdrop-blur-sm"}
        id="how-it-works"
      >
        <h2 className={sectionTitle}>
          {dictionary?.sections?.howItWorks?.title || 
            (locale === 'de' ? 'Wie es funktioniert' : 
             locale === 'nl' ? 'Hoe het werkt' : 
             'How It Works')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          <div className="text-center">
            <div className="bg-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Capture</h3>
                          <p className="text-gray-800 dark:text-gray-300">While you work, we learn and capture. Show us how you work, step by step. We'll document everything for you.</p>
          </div>
          <div className="text-center">
            <div className="bg-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Build</h3>
                          <p className="text-gray-800 dark:text-gray-300">Define which info, checklists, and safety alerts appear at each step, then add them with images to the workflow to create your own AR App & Guidelines.</p>
          </div>
          <div className="text-center">
            <div className="bg-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Excellerate</h3>
            <p className="text-gray-800 dark:text-gray-300">Workers follow the step-by-step AR guidance on their AR-glasses/tablets/smartphones with real-time validation and safety alerts.</p>
          </div>
          <div className="text-center">
            <div className="bg-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">4</span>
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Empower</h3>
            <p className="text-gray-800 dark:text-gray-300">Experts in the client organization are learned and equipped to optimize the current Apps & Guidelines and also to build new ones.</p>
          </div>
        </div>
      </motion.section>

      {/* About ActARion */}
      <motion.section
        ref={aboutRef}
        animate={aboutControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass + " bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-50 backdrop-blur-sm"}
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
        className={sectionClass + " bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-50 backdrop-blur-sm"}
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
        className={sectionClass + " bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-50 backdrop-blur-sm"}
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
      <footer className="bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-50 backdrop-blur-sm border-t border-gray-200 dark:border-neutral-700 py-8">
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
                <span className="text-xl font-bold text-black dark:text-white">
                  act<span className="text-cyan-500 dark:text-cyan-400">AR</span>ion
                </span>
              </div>
              <p className="text-gray-800 dark:text-gray-300 mb-4">
                {dictionary.footer.copyright}
              </p>
                          <a 
              href="https://www.linkedin.com/company/actarion" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-gray-800 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Follow us on LinkedIn
            </a>
            </div>
            <div>
              <h3 className="text-black dark:text-white font-semibold mb-4">{dictionary.footer.sitemap}</h3>
              <ul className="space-y-2">
                <li>
                  <a href={locale === 'en' ? '/about' : `/${locale}/about`} className="text-gray-800 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                    {dictionary.navigation.about}
                  </a>
                </li>
                <li>
                  <a href={locale === 'en' ? '/contact' : `/${locale}/contact`} className="text-gray-800 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                    {dictionary.navigation.contact}
                  </a>
                </li>
                <li>
                  <a href={locale === 'en' ? '/career' : `/${locale}/career`} className="text-gray-800 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                    {dictionary.navigation.career}
                  </a>
                </li>
                <li>
                  <a href={locale === 'en' ? '/en/faq' : `/${locale}/faq`} className="text-gray-800 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                    {dictionary.navigation.faq}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-black dark:text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href={locale === 'en' ? '/terms' : `/${locale}/terms`} className="text-gray-800 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                    {dictionary.footer.terms}
                  </a>
                </li>
                <li>
                  <a href={locale === 'en' ? '/privacy' : `/${locale}/privacy`} className="text-gray-800 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                    {dictionary.footer.privacy}
                  </a>
                </li>
                <li>
                  <a href="/onepager.png" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                    {dictionary.footer.onepager}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Timed Promo Popup */}
      <div
        className={`fixed bottom-6 right-6 z-[10000] transition-all duration-300 ${
          showPromoPopup ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-2'
        }`}
      >
        <div className="relative w-[360px] max-w-[90vw] rounded-xl border bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-gray-200 dark:border-neutral-700 shadow-2xl p-5">
          <button
            type="button"
            aria-label="Close"
            onClick={dismissPromoPopup}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ×
          </button>
          <div className="text-black dark:text-white font-semibold text-lg mb-2">
            {dictionary?.promoPopup?.title || (
              locale === 'de'
                ? 'Erfahren Sie, wie ActARion digitale Transformation und Qualitätssicherung ermöglicht.'
                : locale === 'nl'
                ? 'Leer hoe ActARion digitale transformatie en kwaliteitsborging mogelijk maakt.'
                : 'Learn how ActARion enables digital transformation and quality assurance.'
            )}
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
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
            className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-cyan-400 text-white font-medium transition-colors"
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
    </div>
  );
} 