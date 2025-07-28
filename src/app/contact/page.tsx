"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, replace this with a real backend call (e.g. API route, email service)
    // For now, just show the success message
    setSubmitted(true);
    // Optionally, send the data to an email service or backend here
    // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
    window.open(`mailto:ortwin@actarion.com?subject=Demo%20Call%20Request%20from%20${encodeURIComponent(form.name)}&body=Name:%20${encodeURIComponent(form.name)}%0ACompany:%20${encodeURIComponent(form.company)}%0AEmail:%20${encodeURIComponent(form.email)}%0AMessage:%20${encodeURIComponent(form.message)}`);
  }

  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans">
      {/* Sticky Background Image Container */}
      <div className="fixed inset-0 w-full h-full z-0 bg-gradient-to-br from-neutral-900 to-neutral-950">
        <Image
          src="/ActARion-Studio explained.png"
          alt="ActARion Studio Explained Background"
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-cyan-400 text-center">Schedule a Demo Call</h1>
          <div className="text-lg text-gray-300 mb-6 text-center flex flex-col gap-2">
            <span className="font-semibold text-white">Ready to take action with AR?</span>
            <span>We'd love to hear from you.</span>
            <span>
              Whether you&apos;re exploring smart SOP solutions, interested in a partnership, or simply curious about how Augmented Reality can transform frontline work — reach out to us. Fill in the form and our team will get back to you shortly. Together, we&apos;ll take the next step toward smarter, visual support on the job.
            </span>
            <span className="italic text-cyan-400 mt-2">actARion – Where Action meets AR.</span>
          </div>
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-gray-300 font-medium text-sm">Name</label>
                <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="company" className="text-gray-300 font-medium text-sm">Company</label>
                <input id="company" name="company" type="text" value={form.company} onChange={handleChange} className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-gray-300 font-medium text-sm">Email</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-gray-300 font-medium text-sm">Message</label>
                <textarea id="message" name="message" required rows={3} value={form.message} onChange={handleChange} className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-base px-6 py-2 rounded-full shadow-lg transition-colors mt-2">
                Request Demo Call
              </button>
            </form>
            <div>
              <h2 className="text-xl font-bold text-white text-left mb-4 md:text-center">Why connect with act<span className="text-cyan-400">AR</span>ion?</h2>
              <ul className="text-base text-gray-200 flex flex-col gap-2 max-w-xl md:mx-auto">
                <li className="flex items-start gap-2"><span className="text-cyan-400 text-xl">✔</span> Boost frontline efficiency with AR-powered SOPs</li>
                <li className="flex items-start gap-2"><span className="text-cyan-400 text-xl">✔</span> Reduce training time and human error</li>
                <li className="flex items-start gap-2"><span className="text-cyan-400 text-xl">✔</span> Easy integration with existing workflows</li>
                <li className="flex items-start gap-2"><span className="text-cyan-400 text-xl">✔</span> Scalable solutions for industrial and technical environments</li>
                <li className="flex items-start gap-2"><span className="text-cyan-400 text-xl">✔</span> Strong network of international vendors and local implementation partners</li>
                <li className="flex items-start gap-2"><span className="text-cyan-400 text-xl">✔</span> Future-proof your operations with visual step-by-step guidance</li>
              </ul>
              <div className="text-center mt-4 text-cyan-400 font-semibold">actARion – Augmented support. Real impact.</div>
            </div>
          </div>
          {submitted ? (
            <div className="text-center py-12">
              <p className="text-2xl text-cyan-400 font-semibold mb-4">Thank you for your request!</p>
              <p className="text-lg text-gray-300">We will contact you within two business days.</p>
            </div>
          ) : null}
          <Link href="/" className="text-cyan-400 hover:underline text-base font-medium mt-4 text-center">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
} 