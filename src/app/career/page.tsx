"use client";
import Link from "next/link";
import Image from "next/image";

export default function Career() {
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
        <div className="max-w-4xl w-full mx-auto bg-neutral-900 bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-12 flex flex-col gap-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-cyan-400 text-center">
            Careers at ActARion
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-white">
            Shape the Future of Work with Augmented Reality
          </h2>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              At ActARion, we are revolutionizing how frontline workers experience and execute Standard Operating Procedures (SOPs) through Augmented Reality (AR). Our name is a blend of Action and AR, and that's exactly what we stand for—taking action with technology that transforms industries.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              From smart manufacturing floors to cutting-edge aerospace hangars, our solutions empower workers with the knowledge and precision they need—right when they need it. We collaborate with the most innovative AR vendors globally and build bridges to implementation partners across Europe.
            </p>

            <div className="bg-neutral-800 border border-cyan-700 rounded-xl p-6 my-8">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400 flex items-center gap-2">
                <span className="text-2xl">💡</span> Why Join ActARion?
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-semibold">•</span>
                  <span><strong>Impact Beyond the Screen:</strong> Your work will directly improve safety, productivity, and training across essential industries.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-semibold">•</span>
                  <span><strong>Startup Spirit with Global Reach:</strong> We're a growing company with bold ambitions and an international network.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-semibold">•</span>
                  <span><strong>Innovation Every Day:</strong> Collaborate with AR pioneers and help design the future of digital work instruction.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-semibold">•</span>
                  <span><strong>Flexibility & Ownership:</strong> We value initiative, creativity, and autonomy in every role.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-semibold">•</span>
                  <span><strong>Meaningful Mission:</strong> Be part of something bigger—empowering workers with the tools they deserve.</span>
                </li>
              </ul>
            </div>

            <div className="bg-neutral-800 border border-cyan-700 rounded-xl p-6 my-8">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400 flex items-center gap-2">
                <span className="text-2xl">🚀</span> Don't See the Right Role?
              </h3>
              <p className="text-gray-300 mb-4">
                We're always on the lookout for passionate people who believe in our mission. Whether your strengths lie in:
              </p>
              <ul className="space-y-2 text-gray-300 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-semibold">•</span>
                  <span>AR development or XR design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-semibold">•</span>
                  <span>Software integration & cloud solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-semibold">•</span>
                  <span>Industrial training & change management</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-semibold">•</span>
                  <span>Technical sales or B2B partnerships</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-semibold">•</span>
                  <span>Marketing, operations or customer success</span>
                </li>
              </ul>
              <p className="text-gray-300 font-semibold">
                …we'd love to hear from you!
              </p>
            </div>

            <div className="bg-neutral-800 border border-cyan-700 rounded-xl p-6 my-8">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400 flex items-center gap-2">
                <span className="text-2xl">✍️</span> Send an Open Application
              </h3>
              <p className="text-gray-300 mb-4">
                Share your story, your ambitions, and your unique skills with us. Tell us how you want to contribute to ActARion's mission.
              </p>
              <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-4">
                <p className="text-gray-300 mb-2">
                  <strong>📧 Send your open application to:</strong>
                </p>
                <a 
                  href="mailto:careers@actarion.com" 
                  className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg underline"
                >
                  careers@actarion.com
                </a>
                <p className="text-gray-400 text-sm mt-2">
                  Include your resume and a short motivational message or portfolio that shows what drives you.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 