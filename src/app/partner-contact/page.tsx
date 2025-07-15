"use client";
import { useState } from "react";

export default function PartnerContact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    window.open(`mailto:ortwin@actarion.com?subject=Partnership%20Request%20from%20${encodeURIComponent(form.name)}&body=Name:%20${encodeURIComponent(form.name)}%0ACompany:%20${encodeURIComponent(form.company)}%0AEmail:%20${encodeURIComponent(form.email)}%0AMessage:%20${encodeURIComponent(form.message)}`);
  }

  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full mx-auto bg-neutral-900 rounded-2xl shadow-xl p-8 sm:p-12 flex flex-col gap-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-cyan-400 text-center">Become a partner of act<span className="text-cyan-400">AR</span>ion</h1>
        <div className="text-lg text-gray-300 mb-6 text-center flex flex-col gap-2">
          <span className="font-semibold text-white">Join our partner network!</span>
          <span>
            We’re always looking to collaborate with technology vendors, implementation experts, and industry leaders who share our vision for smarter, safer, and more efficient frontline work. Fill in the form below and our team will get in touch to explore partnership opportunities.
          </span>
        </div>
        <div className="bg-neutral-800 border border-cyan-700 rounded-xl p-6 mb-4 flex flex-col gap-3 text-left max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-cyan-400 mb-1">Interested in becoming an ActArion partner?</h2>
          <p className="text-gray-200 mb-2">We’re building a strong network of local implementation experts and technology integrators across Europe. Join us in bringing Augmented Reality to the frontline workforce.</p>
          <div className="flex flex-col gap-1 text-base text-gray-100">
            <span className="flex items-start gap-2"><span className="text-cyan-400">✔</span> Access to cutting-edge AR-SOP software</span>
            <span className="flex items-start gap-2"><span className="text-cyan-400">✔</span> Exclusive partner margins and incentives</span>
            <span className="flex items-start gap-2"><span className="text-cyan-400">✔</span> Technical and commercial enablement</span>
            <span className="flex items-start gap-2"><span className="text-cyan-400">✔</span> Co-marketing opportunities</span>
            <span className="flex items-start gap-2"><span className="text-cyan-400">✔</span> Leads and project support in your region</span>
            <span className="flex items-start gap-2"><span className="text-cyan-400">✔</span> Being part of a growing international ecosystem</span>
          </div>
          <p className="text-gray-300 mt-2">Fill in the form and let’s explore how we can grow together.</p>
        </div>
        {submitted ? (
          <div className="text-center py-12">
            <p className="text-2xl text-cyan-400 font-semibold mb-4">Thank you for your interest!</p>
            <p className="text-lg text-gray-300">We will contact you within two business days.</p>
          </div>
        ) : (
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
              Submit Partnership Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 