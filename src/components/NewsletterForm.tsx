"use client";

import { FormEvent, useMemo, useState } from "react";

const NEWSLETTER_ENDPOINT =
  "https://app.loops.so/api/newsletter-form/cmi5y114d29deyo0iswg4bm00";
const LOCAL_STORAGE_KEY = "loops-form-timestamp";

type Status = "idle" | "loading" | "success" | "error" | "ratelimited";

type NewsletterFormCopy = {
  placeholder: string;
  buttonLabel: string;
  loadingLabel: string;
  successMessage: string;
  errorMessage: string;
  rateLimitedMessage: string;
  backLabel: string;
};

const defaultCopy: NewsletterFormCopy = {
  placeholder: "you@example.com",
  buttonLabel: "Subscribe to our Newsletter",
  loadingLabel: "Please wait...",
  successMessage: "Thanks! We'll be in touch!",
  errorMessage: "Oops! Something went wrong, please try again",
  rateLimitedMessage: "Too many signups, please try again in a little while",
  backLabel: "← Back",
};

interface NewsletterFormProps {
  copy?: Partial<NewsletterFormCopy>;
}

export function NewsletterForm({ copy }: NewsletterFormProps) {
  const mergedCopy = useMemo(
    () => ({ ...defaultCopy, ...copy }),
    [copy]
  );
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState(mergedCopy.errorMessage);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(mergedCopy.errorMessage);

    const now = Date.now();
    const previous = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (previous && Number(previous) + 60000 > now) {
      setStatus("ratelimited");
      setMessage(mergedCopy.rateLimitedMessage);
      return;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, String(now));
    setStatus("loading");

    try {
      const body = new URLSearchParams({
        userGroup: "",
        mailingLists: "",
        email,
      });

      const response = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const data = await response
        .clone()
        .json()
        .catch(() => ({} as Record<string, string>));

      if (!response.ok) {
        throw new Error(data?.message || response.statusText);
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      const err = error as Error;
      if (err?.message === "Failed to fetch") {
        setStatus("ratelimited");
        setMessage(mergedCopy.rateLimitedMessage);
        return;
      }

      setStatus("error");
      setMessage(err?.message || mergedCopy.errorMessage);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setMessage(mergedCopy.errorMessage);
  };

  const isLoading = status === "loading";
  const showForm = status === "idle" || status === "loading";
  const showErrorState = status === "error" || status === "ratelimited";

  return (
    <div className="newsletter-form-container w-full max-w-md">
      {status === "success" ? (
        <div className="flex flex-col items-start gap-2 text-sm text-white">
          <p>{mergedCopy.successMessage}</p>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-gray-300 transition hover:text-white"
          >
            {mergedCopy.backLabel}
          </button>
        </div>
      ) : showErrorState ? (
        <div className="flex flex-col items-start gap-2 text-sm text-red-300">
          <p>{message}</p>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-gray-300 transition hover:text-white"
          >
            {mergedCopy.backLabel}
          </button>
        </div>
      ) : null}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex w-full flex-col gap-3"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="newsletter-email"
            required
            autoComplete="email"
            placeholder={mergedCopy.placeholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:border-white focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#1C81CC]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[#1C81CC] px-4 text-sm font-semibold text-white transition hover:bg-[#1666a5] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? mergedCopy.loadingLabel : mergedCopy.buttonLabel}
          </button>
        </form>
      )}
    </div>
  );
}

