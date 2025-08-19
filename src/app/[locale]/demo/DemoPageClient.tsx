"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface DemoPageClientProps {
  locale: string;
  dictionary: any;
}

export default function DemoPageClient({ locale, dictionary }: DemoPageClientProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans">
      {/* Sticky Background Image Container */}
      <div className="fixed inset-0 w-full h-full z-0 bg-gradient-to-br from-neutral-900 to-neutral-950">
        <Image
          src="/ActARion header1.png"
          alt="ActARion Header Background"
          fill
          className="object-cover"
          priority
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="max-w-2xl w-full mx-auto bg-neutral-900 bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-12 flex flex-col gap-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-cyan-400">
            {dictionary?.pages?.demo?.title || 
             (locale === 'de' ? 'Demo' : 
              locale === 'nl' ? 'Demo' : 'Demo')}
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-4">
            {dictionary?.pages?.demo?.description1 || 
             (locale === 'de' ? 'Erleben Sie die Kraft von ' : 
              locale === 'nl' ? 'Ervaar de kracht van ' : 
              'Experience the power of ')}
            <span className="text-cyan-400 font-semibold">Act<span className="text-cyan-400">AR</span>ion</span>
            {dictionary?.pages?.demo?.description1End || 
             (locale === 'de' ? ' in Aktion. Unsere Augmented-Reality-Lösungen transformieren, wie Frontline-Teams arbeiten, lernen und sicher bleiben.' : 
              locale === 'nl' ? ' in actie. Onze augmented reality-oplossingen transformeren hoe frontline teams werken, leren en veilig blijven.' : 
              ' in action. Our augmented reality solutions transform how frontline teams work, learn, and stay safe.')}
          </p>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-4">
            {dictionary?.pages?.demo?.description2 || 
             (locale === 'de' ? 'Sehen Sie, wie unsere AR-gestützten Standardarbeitsanweisungen Ihre Abläufe revolutionieren können, indem sie Echtzeit-Anleitung, verbesserte Sicherheitsprotokolle und gesteigerte Effizienz in Ihrem Unternehmen bereitstellen.' : 
              locale === 'nl' ? 'Zie hoe onze AR-aangedreven standaardwerkprocedures uw operaties kunnen revolutioneren door real-time begeleiding, verbeterde veiligheidsprotocollen en verhoogde efficiëntie in uw organisatie te bieden.' : 
              'See how our AR-powered Standard Operating Procedures can revolutionize your operations, providing real-time guidance, enhanced safety protocols, and improved efficiency across your organization.')}
          </p>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-4">
            {dictionary?.pages?.demo?.description3 || 
             (locale === 'de' ? 'Von der industriellen Fertigung bis zu Energie & Versorgung, Luft- und Raumfahrt bis Pharma & Biotech passen sich unsere Lösungen Ihren spezifischen Anforderungen und Branchenanforderungen an.' : 
              locale === 'nl' ? 'Van industriële productie tot energie & nutsbedrijven, luchtvaart tot farma & biotech, onze oplossingen passen zich aan aan uw specifieke behoeften en branchevereisten.' : 
              'From industrial manufacturing to energy & utilities, aerospace to pharma & biotech, our solutions adapt to your specific needs and industry requirements.')}
          </p>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-4">
            {dictionary?.pages?.demo?.description4 || 
             (locale === 'de' ? 'Bereit, die Zukunft der Frontline-Operationen zu sehen? Kontaktieren Sie uns, um eine personalisierte Demo zu planen und zu entdecken, wie ActARion Ihr Unternehmen transformieren kann.' : 
              locale === 'nl' ? 'Klaar om de toekomst van frontline operaties te zien? Neem contact met ons op om een gepersonaliseerde demo te plannen en te ontdekken hoe ActARion uw bedrijf kan transformeren.' : 
              'Ready to see the future of frontline operations? Contact us to schedule a personalized demo and discover how ActARion can transform your business.')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link 
              href={`/${locale}/contact`}
              className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-colors text-center"
            >
              {dictionary?.pages?.demo?.scheduleButton || 
               (locale === 'de' ? 'Demo Planen' : 
                locale === 'nl' ? 'Demo Plannen' : 'Schedule Demo')}
            </Link>
            <Link 
              href={`/${locale}/about`}
              className="inline-block bg-neutral-700 hover:bg-neutral-600 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-colors text-center"
            >
              {dictionary?.pages?.demo?.learnMoreButton || 
               (locale === 'de' ? 'Mehr Erfahren' : 
                locale === 'nl' ? 'Meer Leren' : 'Learn More')}
            </Link>
          </div>
          
          <Link href={`/${locale}`} className="text-cyan-400 hover:underline text-base font-medium mt-4">
            {dictionary?.pages?.demo?.backButton || 
             (locale === 'de' ? '← Zurück zur Startseite' : 
              locale === 'nl' ? '← Terug naar Home' : '← Back to Home')}
          </Link>
        </div>
      </div>
    </div>
  );
}

