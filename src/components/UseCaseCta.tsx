import Link from "next/link";
import { Locale, buildLocalizedPath } from "../config/site";

interface UseCaseCtaProps {
  locale: Locale;
}

export function UseCaseCta({ locale }: UseCaseCtaProps) {
  const contactHref = buildLocalizedPath(locale, "contact");

  return (
    <section className="summary summary--cta mt-16">
      <h2 className="section-subheading">
        Curious how this use case could work in your factory, warehouse or field operations?
      </h2>
      <p className="section-lead">
        Schedule a demo or discovery call with ActARion to see how AR and AI guided work instructions can make your operations safer, faster, and smarter.
      </p>
      <Link
        href={contactHref}
        className="btn btn-primary btn-pill"
      >
        Schedule a demo or discovery call
      </Link>
    </section>
  );
}

