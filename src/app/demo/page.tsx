"use client";
import Link from "next/link";
import Image from "next/image";

export default function Demo() {
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-cyan-400">Demo</h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-4">
            Experience the power of <span className="text-cyan-400 font-semibold">Act<span className="text-cyan-400">AR</span>ion</span> in action. 
            Our augmented reality solutions transform how frontline teams work, learn, and stay safe.
          </p>
          <p className="text-lg sm:text-xl text-gray-300 mb-4">
            See how our AR-powered Standard Operating Procedures can revolutionize your operations, 
            providing real-time guidance, enhanced safety protocols, and improved efficiency across your organization.
          </p>
          <p className="text-lg sm:text-xl text-gray-300 mb-4">
            From industrial manufacturing to energy & utilities, aerospace to pharma & biotech, 
            our solutions adapt to your specific needs and industry requirements.
          </p>
          <p className="text-lg sm:text-xl text-gray-300 mb-4">
            Ready to see the future of frontline operations? Contact us to schedule a personalized demo 
            and discover how ActARion can transform your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link 
              href="/contact" 
              className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-colors text-center"
            >
              Schedule Demo
            </Link>
            <Link 
              href="/about" 
              className="inline-block bg-neutral-700 hover:bg-neutral-600 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-colors text-center"
            >
              Learn More
            </Link>
          </div>
          
          <Link href="/" className="text-cyan-400 hover:underline text-base font-medium mt-4">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
} 