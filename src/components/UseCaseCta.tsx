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
        Ready to explore this use case in your organisation?
      </h2>
      <p className="section-lead">
        Schedule a demo or discovery call to see how ActARion and DeepSight can
        support your operations with AR work instructions and connected worker solutions.
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

