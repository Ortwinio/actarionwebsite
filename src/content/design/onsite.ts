import type { Locale } from '@/lib/locale';

/** "Visit on site" block on the company page (change request Mark Dercksen, 5 Nov 2026). */
export interface OnsiteCopy {
  eyebrow: string;
  h: string;
  lead: string;
  howTitle: string;
  steps: string[];
  feeTitle: string;
  fee: string;
  noObligation: string;
  formTitle: string;
  formIntro: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  site: string;
  sitePlaceholder: string;
  message: string;
  submit: string;
  note: string;
  done: string;
  failed: string;
  altJack: string;
  altMark: string;
}

export const onsiteCopy: Record<Locale, OnsiteCopy> = {
  nl: {
    eyebrow: 'Bezoek op locatie',
    h: 'Zullen we samen met u een test-AR-werkinstructie maken, bij u op locatie?',
    lead: 'Zie een AR-werkinstructie werken in uw eigen bedrijf. Mark of Jack neemt contact met u op om een bezoek in te plannen.',
    howTitle: 'Zo werkt het',
    steps: [
      'We scannen of importeren een model van de werkplek of het object waarmee u werkt.',
      'We nemen de procedure op en maken samen met uw team een eerste AR-werkinstructie, die we daarna bewerken.',
      'We presenteren het resultaat. De gedocumenteerde AR-werkinstructie mag u houden.',
      'Twee collega’s krijgen twee weken toegang tot het platform om de instructie aan te passen en ermee te experimenteren.',
      'Samen kijken we welke use cases in uw bedrijf zinvol zijn en wat ze kunnen opleveren.',
    ],
    feeTitle: 'Wat kost het?',
    fee: 'Voor het bezoek en de gesprekken met uw collega’s rekenen we een bescheiden vergoeding, afhankelijk van de reisafstand rond de €2.000. Gaat u daarna implementeren, dan trekken we dit bedrag af van de implementatiekosten.',
    noObligation: 'Besluit u niet verder te gaan, dan is dat ook prima. U en uw team weten dan precies welke technologie er op de markt is en wat die kan betekenen voor productie.',
    formTitle: 'Vraag een bezoek aan',
    formIntro: 'Laat kort uw contactgegevens achter en waar de locatie is die we mogen bezoeken.',
    name: 'Naam',
    company: 'Bedrijf',
    email: 'Zakelijk e-mailadres',
    phone: 'Telefoonnummer',
    site: 'Locatie van het bezoek',
    sitePlaceholder: 'Plaats en eventueel adres',
    message: 'Welk proces of welke werkplek wilt u laten zien? (optioneel)',
    submit: 'Bezoek aanvragen',
    note: 'Uw aanvraag gaat naar Mark Dercksen en Jack Kessels. We nemen binnen twee werkdagen contact op.',
    done: 'Bedankt! Mark of Jack neemt contact met u op om het bezoek in te plannen.',
    failed: 'Er ging iets mis. Mail ons via mark@actarion.com of jack@actarion.com.',
    altJack: 'Jack Kessels',
    altMark: 'Mark Dercksen',
  },
  en: {
    eyebrow: 'Visit on site',
    h: 'Would you like us to create a test AR work guide with you, on site?',
    lead: 'See an AR work guide working in your own business. Mark or Jack will contact you to schedule a visit.',
    howTitle: 'How it works',
    steps: [
      'We scan or import a model of the workstation or object you work with.',
      'We record the procedure and, together with your team, generate and edit a draft AR work guide.',
      'We present the result. You keep the documented AR work guide.',
      'Two colleagues get access to the platform for two weeks to adjust the guide and experiment with it.',
      'Together we look at which use cases make sense in your business and what the potential benefit is.',
    ],
    feeTitle: 'What does it cost?',
    fee: 'We charge a modest fee for the visit and the conversations with your colleagues, around €2,000 depending on travel. If you go on to implement, we deduct this fee from the implementation costs.',
    noObligation: 'If you decide not to continue, that is fine too. You and your team will know exactly which technologies are on the market and what they can mean for production.',
    formTitle: 'Request a visit',
    formIntro: 'Briefly leave your contact details and where the site is that you would like us to visit.',
    name: 'Name',
    company: 'Company',
    email: 'Business email',
    phone: 'Phone number',
    site: 'Site to visit',
    sitePlaceholder: 'City and, if you like, address',
    message: 'Which process or workstation would you like to show us? (optional)',
    submit: 'Request a visit',
    note: 'Your request goes to Mark Dercksen and Jack Kessels. We will get back to you within two working days.',
    done: 'Thank you! Mark or Jack will contact you to schedule the visit.',
    failed: 'Something went wrong. Please email mark@actarion.com or jack@actarion.com.',
    altJack: 'Jack Kessels',
    altMark: 'Mark Dercksen',
  },
  de: {
    eyebrow: 'Besuch vor Ort',
    h: 'Sollen wir gemeinsam mit Ihnen eine Test-AR-Arbeitsanweisung erstellen, bei Ihnen vor Ort?',
    lead: 'Erleben Sie eine AR-Arbeitsanweisung im eigenen Betrieb. Mark oder Jack meldet sich bei Ihnen, um einen Besuchstermin zu vereinbaren.',
    howTitle: 'So funktioniert es',
    steps: [
      'Wir scannen oder importieren ein Modell des Arbeitsplatzes oder Objekts, mit dem Sie arbeiten.',
      'Wir zeichnen den Ablauf auf und erstellen und bearbeiten gemeinsam mit Ihrem Team eine erste AR-Arbeitsanweisung.',
      'Wir präsentieren das Ergebnis. Die dokumentierte AR-Arbeitsanweisung behalten Sie.',
      'Zwei Kolleginnen oder Kollegen erhalten zwei Wochen Zugang zur Plattform, um die Anweisung anzupassen und damit zu experimentieren.',
      'Gemeinsam prüfen wir, welche Use Cases in Ihrem Betrieb sinnvoll sind und welchen Nutzen sie bringen können.',
    ],
    feeTitle: 'Was kostet es?',
    fee: 'Für den Besuch und die Gespräche mit Ihren Kolleginnen und Kollegen berechnen wir eine moderate Gebühr, je nach Anreise rund 2.000 €. Entscheiden Sie sich später für eine Implementierung, ziehen wir diesen Betrag von den Implementierungskosten ab.',
    noObligation: 'Entscheiden Sie sich gegen eine Fortsetzung, ist das ebenfalls in Ordnung. Sie und Ihr Team wissen dann genau, welche Technologien es gibt und was sie für die Produktion leisten können.',
    formTitle: 'Besuch anfragen',
    formIntro: 'Hinterlassen Sie kurz Ihre Kontaktdaten und den Standort, den wir besuchen dürfen.',
    name: 'Name',
    company: 'Unternehmen',
    email: 'Geschäftliche E-Mail',
    phone: 'Telefonnummer',
    site: 'Standort des Besuchs',
    sitePlaceholder: 'Ort und gerne die Adresse',
    message: 'Welchen Prozess oder Arbeitsplatz möchten Sie uns zeigen? (optional)',
    submit: 'Besuch anfragen',
    note: 'Ihre Anfrage geht an Mark Dercksen und Jack Kessels. Wir melden uns innerhalb von zwei Werktagen.',
    done: 'Vielen Dank! Mark oder Jack meldet sich bei Ihnen, um den Besuch zu planen.',
    failed: 'Etwas ist schiefgelaufen. Bitte schreiben Sie an mark@actarion.com oder jack@actarion.com.',
    altJack: 'Jack Kessels',
    altMark: 'Mark Dercksen',
  },
};
