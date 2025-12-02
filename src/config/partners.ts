export type PartnerType = "technology" | "implementation" | "education";

export interface Partner {
  slug: string;
  name: string;
  type: PartnerType;
  logoSrc: string;
  logoAlt: string;
  website: string;
  tagline: string;
  metaDescription: string;
}

export const partners: Partner[] = [
  {
    slug: "deepsight",
    name: "Deep Sight",
    type: "technology",
    logoSrc: "/images/partners/deepsight-logo.svg",
    logoAlt: "Deep Sight logo",
    website: "https://www.deepsight.ca/partners/#integration-partners",
    tagline: "AI and AR platform for industrial work",
    metaDescription:
      "ActARion is the European partner of Deep Sight to deliver AI and AR–guided work instructions, training scenarios and remote support for industrial teams.",
  },
  {
    slug: "apple-vision-pro",
    name: "Apple – Vision Pro",
    type: "technology",
    logoSrc: "/images/partners/apple-vision-pro-logo.svg",
    logoAlt: "Apple Vision Pro logo",
    website: "https://www.apple.com/apple-vision-pro/",
    tagline: "Spatial computing for industrial AR",
    metaDescription:
      "ActARion uses Apple Vision Pro to deliver immersive AR experiences for technicians, engineers and trainers in industrial environments.",
  },
  {
    slug: "microsoft-hololens",
    name: "Microsoft – HoloLens",
    type: "technology",
    logoSrc: "/images/partners/microsoft-hololens-logo.svg",
    logoAlt: "Microsoft HoloLens logo",
    website: "https://learn.microsoft.com/en-us/hololens/",
    tagline: "Mixed reality for hands-on work",
    metaDescription:
      "ActARion partners with Microsoft HoloLens for hands-free mixed reality guidance in industrial maintenance, assembly and training scenarios.",
  },
  {
    slug: "google-xr",
    name: "Google – XR",
    type: "technology",
    logoSrc: "/images/partners/google-xr-logo.svg",
    logoAlt: "Google XR logo",
    website: "https://arvr.google.com/",
    tagline: "XR technologies for AR in the field",
    metaDescription:
      "ActARion leverages Google XR technologies to deploy AR-guided work instructions on Android devices for field and service teams.",
  },
  {
    slug: "potentify",
    name: "Potentify",
    type: "implementation",
    logoSrc: "/images/partners/potentify-logo.svg",
    logoAlt: "Potentify logo",
    website: "https://potentify.nl/",
    tagline: "HR implementation partner for learning and skills",
    metaDescription:
      "ActARion and Potentify connect AR-guided work instructions with HR, learning and talent strategies for faster onboarding and skills development.",
  },
  {
    slug: "simply-change",
    name: "Simply Change",
    type: "implementation",
    logoSrc: "/images/partners/simply-change-logo.svg",
    logoAlt: "Simply Change logo",
    website: "https://www.simplychange.nl/",
    tagline: "Implementation partner for FMCG and change",
    metaDescription:
      "ActARion and Simply Change deliver structured roll-outs of AR work instructions in FMCG, logistics and operational transformation projects.",
  },
];

export const getPartnerBySlug = (slug: string): Partner | undefined =>
  partners.find((partner) => partner.slug === slug);

export const getPartnersByType = (type: PartnerType): Partner[] =>
  partners.filter((partner) => partner.type === type);

