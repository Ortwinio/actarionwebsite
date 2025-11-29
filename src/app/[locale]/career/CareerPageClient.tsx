"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  BoltIcon,
  CheckCircleIcon,
  MapPinIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { buildLocalizedPath, Locale } from "../../../config/site";

interface CareerPageClientProps {
  locale: Locale;
  dictionary: any;
}

type Job = {
  id: string;
  title: string;
  location: string;
  intro: string;
  responsibilities: string[];
  requirements: string[];
  imageSrc: string;
  imageAlt: string;
};

type JobFormData = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  motivation: string;
};

const JOBS: Job[] = [
  {
    id: "ar-developer",
    title: "AR Developer",
    location: "Germany",
    intro: "Develop AR experiences that make complex work clearer and safer.",
    responsibilities: [
      "Build and refine AR applications for real industrial use cases",
      "Work with Unity or Unreal Engine and modern AR frameworks",
      "Collaborate with product, customer and content teams to translate procedures into intuitive AR workflows",
    ],
    requirements: [
      "Experience with Unity and/or Unreal Engine",
      "Solid C# programming skills",
      "Familiarity with AR frameworks and 3D concepts",
      "Curiosity about how people actually work in factories, plants and in the field",
    ],
    imageSrc: "/images/roles/career-ar-developer-hero.png",
    imageAlt: "AR developer building augmented reality workflows for industrial operations",
  },
  {
    id: "sales-engineer",
    title: "Sales Engineer",
    location: "The Netherlands",
    intro:
      "Help customers understand how AR and AI can make their operations smarter, safer and faster.",
    responsibilities: [
      "Work with prospects to map their processes, challenges and use cases",
      "Translate technical capabilities into clear business value",
      "Support pilots and implementations together with our partners and product team",
    ],
    requirements: [
      "A technical background (engineering, IT or similar)",
      "Experience in a customer-facing or sales-related role",
      "Affinity with AR/VR or industrial software",
      "Strong communication skills in English (and preferably another European language)",
    ],
    imageSrc: "/images/roles/career-sales-engineer-hero.png",
    imageAlt: "Sales engineer explaining AR and AI solutions to customers",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    location: "Switzerland",
    intro: "Shape the roadmap for AR and AI-guided work in industry.",
    responsibilities: [
      "Define and prioritise product features based on customer needs and market developments",
      "Work closely with customers, partners and our development team",
      "Turn feedback from pilots and roll-outs into clear requirements and improvements",
    ],
    requirements: [
      "Experience in product management for B2B or SaaS solutions",
      "A technical foundation that allows you to discuss architecture and constraints",
      "Strong analytical skills and a structured way of working",
      "Interest in operations, maintenance, training or quality in industrial environments",
    ],
    imageSrc: "/images/roles/career-product-manager-hero.png",
    imageAlt: "Product manager defining roadmap for AR and AI-guided work",
  },
];

const WHY_POINTS = [
  "We work with leading AR and AI technology to support people directly at the moment of work.",
  "We turn expert knowledge into step-by-step guidance that anyone can follow with confidence.",
  "We help customers reduce errors, shorten onboarding and make every task safer and more consistent.",
];

const HOW_WE_WORK = [
  {
    title: "Impact on real work",
    description:
      "We are close to the people who use our solutions every day: technicians, operators, maintenance, quality and HSE teams.",
    Icon: SparklesIcon,
  },
  {
    title: "Room to build",
    description:
      "You get responsibility early, with the freedom to experiment and improve how we work with customers and partners.",
    Icon: BoltIcon,
  },
  {
    title: "Collaboration over hierarchy",
    description:
      "We prefer clear ownership, open communication and short feedback loops over layers of management.",
    Icon: UsersIcon,
  },
];

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

function isValidLinkedIn(link: string) {
  try {
    const url = new URL(link);
    return url.hostname.toLowerCase().includes("linkedin.com");
  } catch {
    return false;
  }
}

function JobCard({ job }: { job: Job }) {
  const [formData, setFormData] = useState<JobFormData>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    motivation: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<JobFormData>>({});
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validateForm = () => {
    const errors: Partial<JobFormData> = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!isValidEmail(formData.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!formData.linkedin.trim()) {
      errors.linkedin = "LinkedIn profile is required.";
    } else if (!isValidLinkedIn(formData.linkedin.trim())) {
      errors.linkedin = "Enter a valid LinkedIn URL.";
    }
    if (!formData.motivation.trim()) {
      errors.motivation = "Please share a short motivation.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          position: job.title,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        motivation: "",
      });
      setIsApplying(false);
      setStatus("success");
      setStatusMessage(
        "Thank you for your application. We will review your profile and get back to you as soon as possible."
      );
    } catch (error) {
      console.error("Job application error:", error);
      setStatus("error");
      setStatusMessage(
        "Something went wrong while sending your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsApplying(false);
    setFormErrors({});
    setStatus("idle");
    setStatusMessage("");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name as keyof JobFormData]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="mb-4 overflow-hidden rounded-xl">
        <Image
          src={job.imageSrc}
          alt={job.imageAlt}
          width={800}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-actarion-blue">
            Open role
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{job.title}</h3>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600">
            <MapPinIcon className="h-4 w-4 text-actarion-blue" aria-hidden="true" />
            <span>{job.location}</span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-base text-slate-600">{job.intro}</p>

      <div className="mt-6 space-y-6 text-sm">
        <div>
          <h4 className="text-lg font-semibold text-slate-900">You will</h4>
          <ul className="mt-3 space-y-3">
            {job.responsibilities.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-600">
                <CheckCircleIcon
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-actarion-blue"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-slate-900">You bring</h4>
          <ul className="mt-3 space-y-3">
            {job.requirements.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-600">
                <CheckCircleIcon
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-actarion-blue"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <button
          type="button"
          onClick={() => {
            setIsApplying(true);
            setStatus("idle");
            setStatusMessage("");
          }}
          className="btn btn-primary w-full justify-center"
        >
          {status === "success" ? "Apply again" : "Apply now"}
        </button>

        {isApplying && (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            noValidate
          >
            <div>
              <label
                htmlFor={`${job.id}-position`}
                className="text-sm font-medium text-slate-700"
              >
                Position
              </label>
              <input
                id={`${job.id}-position`}
                type="text"
                value={job.title}
                readOnly
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                aria-readonly="true"
              />
              <input type="hidden" name="position" value={job.title} />
            </div>

            <div>
              <label
                htmlFor={`${job.id}-name`}
                className="text-sm font-medium text-slate-700"
              >
                Full name*
              </label>
              <input
                id={`${job.id}-name`}
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className={`mt-2 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 ${
                  formErrors.name ? "border-red-500" : "border-slate-200"
                }`}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${job.id}-email`}
                className="text-sm font-medium text-slate-700"
              >
                Email address*
              </label>
              <input
                id={`${job.id}-email`}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`mt-2 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 ${
                  formErrors.email ? "border-red-500" : "border-slate-200"
                }`}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${job.id}-phone`}
                className="text-sm font-medium text-slate-700"
              >
                Phone number (optional)
              </label>
              <input
                id={`${job.id}-phone`}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40"
              />
            </div>

            <div>
              <label
                htmlFor={`${job.id}-linkedin`}
                className="text-sm font-medium text-slate-700"
              >
                LinkedIn profile*
              </label>
              <input
                id={`${job.id}-linkedin`}
                name="linkedin"
                type="url"
                value={formData.linkedin}
                onChange={handleChange}
                required
                className={`mt-2 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 ${
                  formErrors.linkedin ? "border-red-500" : "border-slate-200"
                }`}
              />
              {formErrors.linkedin && (
                <p className="mt-1 text-sm text-red-500">
                  {formErrors.linkedin}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${job.id}-motivation`}
                className="text-sm font-medium text-slate-700"
              >
                Short motivation*
              </label>
              <textarea
                id={`${job.id}-motivation`}
                name="motivation"
                rows={4}
                value={formData.motivation}
                onChange={handleChange}
                required
                className={`mt-2 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-actarion-blue/40 ${
                  formErrors.motivation ? "border-red-500" : "border-slate-200"
                }`}
              />
              {formErrors.motivation && (
                <p className="mt-1 text-sm text-red-500">
                  {formErrors.motivation}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary flex-1 justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Apply"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary flex-1 justify-center"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {status !== "success" && statusMessage && (
          <p className="text-sm text-red-500" role="alert">
            {statusMessage}
          </p>
        )}

        {status === "success" && (
          <p className="rounded-2xl border border-actarion-blue/30 bg-actarion-blue/5 p-4 text-sm text-actarion-blue">
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default function CareerPageClient({ locale, dictionary }: CareerPageClientProps) {
  const heroSubtitle =
    dictionary?.pages?.career?.subtitle ??
    "Smarter, safer and faster work with AI and Augmented Reality";
  const heroBodyHeading =
    dictionary?.pages?.career?.heroHeading ?? "Work where action meets augmented reality";

  return (
    <main className="bg-white text-slate-900">
      <section className="relative isolate overflow-hidden border-b border-slate-200">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,128,194,0.15),_transparent_55%)] blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-actarion-blue"
          >
            Careers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight text-actarion-blue sm:text-5xl lg:text-6xl"
          >
            {heroBodyHeading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl text-slate-600"
          >
            {heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 space-y-5 text-lg text-slate-600"
          >
            <p>
              At ActARion we help industrial, logistics and energy companies work smarter, safer
              and faster with AR and AI-guided solutions. We translate complex procedures into
              clear, visual guidance that supports technicians and field teams in the flow of work.
            </p>
            <p>
              If you enjoy building practical technology, working close to real operations and
              shaping the future of work, we'd love to talk.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-slate-200 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-slate-900">Why work at ActARion?</h2>
          </div>
          <div className="space-y-6 text-lg text-slate-600">
            <p>
              Work in operations is changing quickly. Machines are more complex, safety standards
              are stricter and experienced specialists are harder to find. Many organisations still
              rely on PDFs, classroom training and informal "on the job" explanations.
            </p>
            <p className="font-semibold text-slate-900">ActARion exists to change that.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {WHY_POINTS.map((point) => (
              <div
                key={point}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700"
              >
                <CheckCircleIcon
                  className="h-6 w-6 text-actarion-blue"
                  aria-hidden="true"
                />
                <p className="mt-4 text-base">{point}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-lg text-slate-600">
            You will work in a small, entrepreneurial team with direct impact on how factories,
            plants and field teams across Europe get their work done.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 py-20" id="open-positions">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Open positions</h2>
            <p className="text-lg text-slate-600">
              Create AR and AI-guided workflows that redefine how industrial work gets done.
              Explore the roles below and apply directly.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {JOBS.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-slate-900">How we work</h2>
            <p className="mt-4 text-lg text-slate-600">
              We are a small, focused team that combines:
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {HOW_WE_WORK.map(({ title, description, Icon }) => (
              <div
                key={title}
                className="rounded-3xl border border-slate-200 bg-white p-6"
              >
                <Icon className="h-8 w-8 text-actarion-blue" aria-hidden="true" />
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-4 text-base text-slate-600">{description}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-lg text-slate-600">
            Our ambition is to build a European reference for AR and AI-guided work, together with
            our partner DeepSight and a growing network of customers.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">How to apply</h2>
          <div className="mt-6 space-y-5 text-lg text-slate-600">
            <p>
              Interested in one of the roles, or do you feel you can add value in another way? Use
              the "Apply" button under each role to share your details, LinkedIn profile and a short
              motivation.
            </p>
            <p>
              We review every application carefully. If there is a potential match, we will invite
              you for an introductory call to explore fit, expectations and next steps.
            </p>
            <p>
              Prefer email? Reach out via{" "}
              <a
                href="mailto:ortwin@actarion.com"
                className="font-semibold text-actarion-blue hover:opacity-80"
              >
                ortwin@actarion.com
              </a>{" "}
              or{" "}
              <Link
                href={buildLocalizedPath(locale, "contact")}
                className="font-semibold text-actarion-blue hover:opacity-80"
              >
                our contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}