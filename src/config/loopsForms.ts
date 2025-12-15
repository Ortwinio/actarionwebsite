/**
 * Loops.so Form Configuration
 *
 * This file contains all the Loops.so form endpoints used across the ActARion website.
 *
 * To create new forms:
 * 1. Log in to your Loops.so dashboard
 * 2. Go to Forms → Create Form
 * 3. Configure the form fields to match what the website sends
 * 4. Copy the form ID from the form URL and update the endpoints below
 *
 * Form endpoint pattern: https://app.loops.so/api/newsletter-form/{FORM_ID}
 */

// Base URL for Loops.so form submissions
const LOOPS_BASE_URL = "https://app.loops.so/api/newsletter-form";

/**
 * Newsletter form - for email subscriptions in the footer
 * Already configured and working
 */
export const NEWSLETTER_FORM_ENDPOINT = `${LOOPS_BASE_URL}/cmi5y114d29deyo0iswg4bm00`;

/**
 * Contact form - for general contact/demo requests
 * TODO: Create this form in Loops.so dashboard with fields:
 * - email (required)
 * - firstName
 * - lastName
 * - company
 * - topic
 * - message
 * - phone
 * - country
 */
export const CONTACT_FORM_ENDPOINT = `${LOOPS_BASE_URL}/CONTACT_FORM_ID_HERE`;

/**
 * Partner contact form - for partnership inquiries
 * TODO: Create this form in Loops.so dashboard with fields:
 * - email (required)
 * - name
 * - company
 * - phone
 * - partnerType
 * - message
 */
export const PARTNER_CONTACT_FORM_ENDPOINT = `${LOOPS_BASE_URL}/PARTNER_FORM_ID_HERE`;

/**
 * Career/Job application form - for job applications
 * TODO: Create this form in Loops.so dashboard with fields:
 * - email (required)
 * - name
 * - phone
 * - linkedin
 * - motivation
 * - position
 */
export const CAREER_FORM_ENDPOINT = `${LOOPS_BASE_URL}/CAREER_FORM_ID_HERE`;

/**
 * Local storage keys for rate limiting
 */
export const RATE_LIMIT_KEYS = {
  newsletter: "loops-newsletter-timestamp",
  contact: "loops-contact-timestamp",
  partnerContact: "loops-partner-contact-timestamp",
  career: "loops-career-timestamp",
} as const;

/**
 * Rate limit duration in milliseconds (60 seconds)
 */
export const RATE_LIMIT_DURATION = 60000;
