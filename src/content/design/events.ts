import type { Locale } from '@/lib/locale';

/**
 * Events where ActARion presents, exhibits or attends. Edit this list to update the Events page
 * (no CMS: changes are made via Claude and go live with the next deploy).
 *
 * - `start` / `end`: ISO dates (YYYY-MM-DD). Events whose end date has passed move to "Past events"
 *   automatically at the next build.
 * - `url`: the event's own website (opens in a new tab).
 * - `logo`: optional, file name without extension in /public/img/events/ (WebP, max 1200 px).
 * - `text`: one or two sentences per language.
 */
export interface EventItem {
  id: string;
  naam: string;
  start: string;
  end?: string;
  city: string;
  country: Record<Locale, string>;
  url: string;
  logo?: { file: string; w: number; h: number };
  text: Record<Locale, string>;
}

export const events: EventItem[] = [];

export const eventsCopy: Record<Locale, {
  eyebrow: string;
  upcoming: string;
  past: string;
  none: string;
  visit: string;
  newWindow: string;
  ctaHeading: string;
}> = {
  nl: {
    eyebrow: 'Events',
    upcoming: 'Komende events',
    past: 'Eerdere events',
    none: 'De volgende events worden binnenkort bekendgemaakt. Volg ActARion op [LinkedIn](https://www.linkedin.com/company/actarion/) of [plan een gesprek](/nl/demo/) voor een sessie met uw eigen team.',
    visit: 'Naar de eventsite',
    newWindow: '(opent in een nieuw venster)',
    ctaHeading: 'Spreek ons op een event of bij u op locatie',
  },
  en: {
    eyebrow: 'Events',
    upcoming: 'Upcoming events',
    past: 'Past events',
    none: 'Our next events will be announced shortly. Follow ActARion on [LinkedIn](https://www.linkedin.com/company/actarion/) or [book a call](/en/demo/) for a session with your own team.',
    visit: 'Visit the event site',
    newWindow: '(opens in a new window)',
    ctaHeading: 'Meet us at an event or at your site',
  },
  de: {
    eyebrow: 'Events',
    upcoming: 'Kommende Events',
    past: 'Vergangene Events',
    none: 'Unsere nächsten Events geben wir in Kürze bekannt. Folgen Sie ActARion auf [LinkedIn](https://www.linkedin.com/company/actarion/) oder [vereinbaren Sie ein Gespräch](/de/demo/) für eine Session mit Ihrem Team.',
    visit: 'Zur Event-Website',
    newWindow: '(öffnet in einem neuen Fenster)',
    ctaHeading: 'Treffen Sie uns auf einem Event oder bei Ihnen vor Ort',
  },
};
