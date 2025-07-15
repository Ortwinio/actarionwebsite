"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
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

export default function Home() {
  // Hero
  const [heroRef, heroControls] = useInView(0.3);
  // What We Do
  const [whatRef, whatControls] = useInView(0.2);
  // Why AR-Powered SOPs
  const [whyRef, whyControls] = useInView(0.2);
  // Industries
  const [industriesRef, industriesControls] = useInView(0.2);
  // How It Works
  const [howRef, howControls] = useInView(0.2);
  // About
  const [aboutRef, aboutControls] = useInView(0.2);
  // Tech Partners
  const [partnersRef, partnersControls] = useInView(0.2);
  // Contact
  const [contactRef, contactControls] = useInView(0.2);

  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans">
      {/* Hero */}
      <motion.section
        ref={heroRef}
        animate={heroControls}
        initial={{ opacity: 0, y: 40 }}
        className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center gap-8"
      >
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8 sm:justify-center sm:items-center w-full">
          <Image
            src="/Actarionlogo.png"
            alt="Actarion logo"
            width={80}
            height={80}
            className="mx-auto sm:mx-0 drop-shadow-lg"
            priority
          />
          <span className="text-4xl sm:text-6xl font-extrabold tracking-widest text-white uppercase">act<span className="text-cyan-400">AR</span>ion</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 max-w-2xl mt-4">
          Revolutionize SOP Execution with <span className={accent}>Augmented Reality</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mb-6">
          act<span className={accent}>AR</span>ion delivers next-generation SOP solutions powered by AR technology—transforming how frontline teams work, learn, and stay safe.
        </p>
        <a
          href="#contact"
          className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-colors flex items-center gap-2"
        >
          <PhoneArrowUpRightIcon className="h-6 w-6" />
          Schedule a Demo
        </a>
        <a
          href="/about"
          className="inline-block mt-4 text-cyan-400 hover:underline text-base font-medium"
        >
          About Us
        </a>
      </motion.section>

      {/* What We Do */}
      <motion.section
        ref={whatRef}
        animate={whatControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass}
        id="what-we-do"
      >
        <h2 className={sectionTitle}>Augmented SOPs for Frontline Excellence</h2>
        <p className={sectionText}>
          act<span className={accent}>AR</span>ion provides advanced AR-driven software that turns traditional SOPs into immersive, step-by-step visual workflows. Using AR glasses or mobile devices, your workforce can follow real-time instructions overlaid on physical environments—enhancing precision, safety, and operational consistency.
        </p>
      </motion.section>

      {/* Why AR-Powered SOPs */}
      <motion.section
        ref={whyRef}
        animate={whyControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass}
        id="why-ar-sops"
      >
        <h2 className={sectionTitle}>Why AR-Powered SOPs?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          <div className="flex items-start gap-4">
            <DevicePhoneMobileIcon className="h-8 w-8 text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-white">Hands-Free Guidance:</span>
              <p className="text-gray-300">Workers receive visual instructions through AR headsets—no paper, no guesswork.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircleIcon className="h-8 w-8 text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-white">Error Reduction:</span>
              <p className="text-gray-300">Real-time SOPs minimize mistakes and ensure process adherence.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <AcademicCapIcon className="h-8 w-8 text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-white">Accelerated Training:</span>
              <p className="text-gray-300">New employees ramp up faster with AR-assisted, on-the-job learning.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <UserGroupIcon className="h-8 w-8 text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-white">Remote Support Integration:</span>
              <p className="text-gray-300">Enable live expert assistance directly in the AR environment.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ChartBarIcon className="h-8 w-8 text-cyan-400 mt-1" />
            <div>
              <span className="font-semibold text-white">Operational Analytics:</span>
              <p className="text-gray-300">Monitor SOP execution and optimize based on real-time performance data.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Industries We Support */}
      <motion.section
        ref={industriesRef}
        animate={industriesControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass}
        id="industries"
      >
        <h2 className={sectionTitle}>Industries We Support</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="flex flex-col items-center">
            <Cog6ToothIcon className="h-10 w-10 mb-2 text-cyan-400" />
            <span className="text-gray-200 text-lg">Industrial Manufacturing & Smart Factories</span>
          </div>
          <div className="flex flex-col items-center">
            <BoltIcon className="h-10 w-10 mb-2 text-cyan-400" />
            <span className="text-gray-200 text-lg">Energy & Utilities</span>
          </div>
          <div className="flex flex-col items-center">
            <GlobeAltIcon className="h-10 w-10 mb-2 text-cyan-400" />
            <span className="text-gray-200 text-lg">Aerospace & High-Tech Assembly</span>
          </div>
          <div className="flex flex-col items-center">
            <SparklesIcon className="h-10 w-10 mb-2 text-cyan-400" />
            <span className="text-gray-200 text-lg">Pharma & Biotech</span>
          </div>
          <div className="flex flex-col items-center">
            <WrenchScrewdriverIcon className="h-10 w-10 mb-2 text-cyan-400" />
            <span className="text-gray-200 text-lg">Field Services & Maintenance Operations</span>
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        ref={howRef}
        animate={howControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass}
        id="how-it-works"
      >
        <h2 className={sectionTitle}>How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          <div className="flex flex-col items-center text-center">
            <SparklesIcon className="h-12 w-12 mb-4 text-cyan-400" />
            <h3 className="text-xl font-semibold mb-2">Author SOPs Visually</h3>
            <p className="text-gray-400">Convert traditional work instructions into digital AR procedures using intuitive content creation tools.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <DevicePhoneMobileIcon className="h-12 w-12 mb-4 text-cyan-400" />
            <h3 className="text-xl font-semibold mb-2">Deploy on AR Devices</h3>
            <p className="text-gray-400">Deliver SOPs directly to frontline workers via smart glasses or tablets, even in offline environments.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <ChartBarIcon className="h-12 w-12 mb-4 text-cyan-400" />
            <h3 className="text-xl font-semibold mb-2">Execute & Optimize</h3>
            <p className="text-gray-400">Track SOP usage, flag deviations, and continuously improve processes with actionable data insights.</p>
          </div>
        </div>
      </motion.section>

      {/* About ActArion */}
      <motion.section
        ref={aboutRef}
        animate={aboutControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass}
        id="about-actarion"
      >
        <h2 className={sectionTitle}>Where Action Meets Augmented Reality</h2>
        <p className={sectionText}>
          act<span className={accent}>AR</span>ion combines deep operational understanding with cutting-edge AR solutions. Our mission: to modernize frontline work by transforming SOPs into dynamic, interactive AR workflows.
        </p>
        <p className={sectionText}>
          We operate as a trusted distributor and value-added partner—working with top-tier AR vendors and local implementation experts across Europe. Our focus is on solving real-world challenges in SOP execution, workforce training, and process compliance.
        </p>
      </motion.section>

      {/* Technology Partnerships */}
      <motion.section
        ref={partnersRef}
        animate={partnersControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass}
        id="technology-partnerships"
      >
        <h2 className={sectionTitle}>Technology Partnerships</h2>
        <p className={sectionText}>
          We partner with global AR leaders to bring best-in-class SOP software to European industries. Our local implementation partners ensure every deployment is tailored to your operational context—from factory floor to field site.
        </p>
      </motion.section>

      {/* Contact Us */}
      <motion.section
        ref={contactRef}
        animate={contactControls}
        initial={{ opacity: 0, y: 40 }}
        className={sectionClass + " pb-32"}
        id="contact"
      >
        <h2 className={sectionTitle}>Digitize. Visualize. Optimize.</h2>
        <p className="text-lg text-gray-300 mb-4">Ready to upgrade your SOPs with Augmented Reality? Let’s talk.</p>
        <div className="flex flex-col gap-2 items-center mb-6">
          <a href="mailto:hello@actarion.com" className="text-cyan-400 text-lg font-semibold hover:underline flex items-center gap-2">
            <span>📧</span> hello@actarion.com
          </a>
          <a href="https://www.actarion.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-lg font-semibold hover:underline flex items-center gap-2">
            <span>🌐</span> www.actarion.com
          </a>
          <span className="text-gray-400 text-base flex items-center gap-2"><span>📍</span> Serving Benelux, DACH & Nordics</span>
        </div>
      </motion.section>
    </div>
  );
}
