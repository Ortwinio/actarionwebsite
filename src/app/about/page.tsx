"use client";
import Link from "next/link";

export default function About() {
  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full mx-auto bg-neutral-900 rounded-2xl shadow-xl p-8 sm:p-12 flex flex-col gap-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-cyan-400">About Us</h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-4">
          The name <span className="text-cyan-400 font-semibold">ActArion</span> is a fusion of &quot;Action&quot; and &quot;Augmented Reality&quot; — a reflection of our mission: turning action on the workfloor into something smarter, faster, and safer through the power of immersive technology.
        </p>
        <p className="text-lg sm:text-xl text-gray-300 mb-4">
          We believe that frontline workers deserve the same level of innovation as the digital back office. Standard Operating Procedures are more than checklists — they are the foundation of quality, safety, and performance. At ActArion, we make SOPs truly actionable through intuitive AR experiences.
        </p>
        <p className="text-lg sm:text-xl text-gray-300 mb-4">
          Our vision is a future where operational knowledge is always available — context-aware, visual, and effortless to execute. We enable industrial teams to work with confidence, consistency, and continuous improvement — every day, in every environment.
        </p>
        <p className="text-lg sm:text-xl text-gray-300 mb-4">
          By combining world-class technology with local expertise, we help companies across Europe close the gap between procedure and performance.
        </p>
        <Link href="/" className="text-cyan-400 hover:underline text-base font-medium mt-4">← Back to Home</Link>
      </div>
    </div>
  );
} 