import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbListSchema } from "@/config/seo";
import { buildLocalizedPath, isSupportedLocale, Locale } from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";
import { VIDEOS, VIDEO_CATEGORIES } from "../../../../content/videos";

interface VideosPageProps {
  params: Promise<{ locale: 'en' | 'de' | 'nl' }>
}

const pageDescriptions = {
  en: "Watch ActARion videos and demos that show how AI and AR–guided work instructions and AR SOPs help teams work smarter, safer and faster in real operations.",
  de: "Sehen Sie ActARion Videos und Demos, die zeigen, wie KI- und AR-gestützte Arbeitsanweisungen und AR-SOPs Teams helfen, in realen Betriebsumgebungen intelligenter, sicherer und schneller zu arbeiten.",
  nl: "Bekijk ActARion video's en demo's die laten zien hoe AI en AR-gestuurde werkinstructies en AR-SOPs teams helpen om slimmer, veiliger en sneller te werken in echte operaties."
};

const pageTitles = {
  en: "Videos – AR & AI Work Instructions Demos & Tutorials",
  de: "Videos – AR- & KI-Arbeitsanweisungen Demos & Tutorials",
  nl: "Video's – AR & AI Werkinstructies Demo's & Tutorials"
};

const pageIntros = {
  en: "Watch ActARion videos and demos that show how AI and AR–guided work instructions and AR SOPs help teams work smarter, safer and faster in real operations.",
  de: "Sehen Sie ActARion Videos und Demos, die zeigen, wie KI- und AR-gestützte Arbeitsanweisungen und AR-SOPs Teams helfen, in realen Betriebsumgebungen intelligenter, sicherer und schneller zu arbeiten.",
  nl: "Bekijk ActARion video's en demo's die laten zien hoe AI en AR-gestuurde werkinstructies en AR-SOPs teams helpen om slimmer, veiliger en sneller te werken in echte operaties."
};

const watchOnYouTube = {
  en: "Watch on YouTube",
  de: "Auf YouTube ansehen",
  nl: "Bekijk op YouTube"
};

const introVideoTitle = {
  en: "ActARion Introduction",
  de: "ActARion Einführung",
  nl: "ActARion Introductie"
};

const useCasesTitle = {
  en: "Use Cases",
  de: "Anwendungsfälle",
  nl: "Use Cases"
};

const comingSoonText = {
  en: "Coming soon",
  de: "Demnächst verfügbar",
  nl: "Binnenkort beschikbaar"
};

export async function generateMetadata({ params }: VideosPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const description = pageDescriptions[locale];

  return buildPageMetadata({
    locale,
    title: `${pageTitles[locale]} | ActARion`,
    description,
    segment: 'videos',
  });
}

export default async function VideosPage({ params }: VideosPageProps) {
  const { locale } = await params;
  
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const typedLocale = locale as Locale;

  const title = pageTitles[locale];
  const description = pageDescriptions[locale];
  const intro = pageIntros[locale];

  // Build breadcrumb navigation
  const breadcrumbs = [
    { name: dictionary?.navigation?.home || 'Home', url: buildLocalizedPath(typedLocale) },
    { name: title, url: buildLocalizedPath(typedLocale, 'videos') },
  ];

  // Build structured data
  const structuredData = [
    buildWebPageSchema({
      locale: typedLocale,
      title: `${title} | ActARion`,
      description,
      segment: 'videos',
    }),
    buildBreadcrumbListSchema(breadcrumbs),
  ];

  // Filter videos by category
  const introVideos = VIDEOS.filter(v => v.category === "Intro" && v.youtubeId);
  const useCaseVideos = VIDEOS.filter(v => v.category === "Use Case");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHeader title={title} subtitle={intro} />
      <main className="section section-light">
        <div className="section-inner space-y-12">
          {/* Featured Video - ActARion Introduction from local file */}
          <section className="space-y-4">
            <h2 className="section-subheading">{introVideoTitle[locale]}</h2>
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-slate-200 shadow-card bg-slate-900">
              <video
                className="w-full h-full object-cover"
                controls
                poster="/images/usecases/ar-work-instructions-and-sops-to-preserve-corporate-memory-hero.png"
                preload="metadata"
              >
                <source src="/ActARion_intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </section>

          {/* Short intro videos from YouTube */}
          {introVideos.length > 0 && (
            <section className="space-y-4">
              <div className="card-grid card-grid--three">
                {introVideos.map((video) => {
                  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                  const videoUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

                  return (
                    <article
                      key={video.id}
                      className="card flex flex-col overflow-hidden"
                    >
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative aspect-video rounded-lg overflow-hidden mb-4 group"
                      >
                        <img
                          src={thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                            <svg className="w-8 h-8 text-[var(--color-actarion-blue)] ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        {video.category && (
                          <span className="absolute top-2 right-2 px-2 py-1 bg-[var(--color-actarion-blue)] text-white text-xs font-medium rounded">
                            {video.category}
                          </span>
                        )}
                        {video.duration && (
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/75 text-white text-xs font-medium rounded">
                            {video.duration}
                          </span>
                        )}
                      </a>
                      <h3 className="text-lg font-semibold mb-2 text-[var(--color-text)]">{video.title}</h3>
                      <p className="text-sm text-[var(--color-text-muted)] mb-4 flex-1">{video.description}</p>
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary self-start"
                      >
                        {watchOnYouTube[locale]}
                      </a>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* Use Case Videos */}
          <section className="space-y-6">
            <h2 className="section-subheading">{useCasesTitle[locale]}</h2>
            <div className="card-grid card-grid--three">
              {useCaseVideos.map((video) => {
                const hasVideo = video.youtubeId && video.youtubeId.length > 0;
                const thumbnailUrl = hasVideo
                  ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
                  : null;
                const videoUrl = hasVideo
                  ? `https://www.youtube.com/watch?v=${video.youtubeId}`
                  : null;

                return (
                  <article
                    key={video.id}
                    className={`card flex flex-col overflow-hidden ${!hasVideo ? 'opacity-60' : ''}`}
                  >
                    {hasVideo ? (
                      <a
                        href={videoUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative aspect-video rounded-lg overflow-hidden mb-4 group"
                      >
                        <img
                          src={thumbnailUrl!}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                            <svg className="w-8 h-8 text-[var(--color-actarion-blue)] ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        {video.category && (
                          <span className="absolute top-2 right-2 px-2 py-1 bg-[var(--color-actarion-blue)] text-white text-xs font-medium rounded">
                            {video.category}
                          </span>
                        )}
                        {video.duration && (
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/75 text-white text-xs font-medium rounded">
                            {video.duration}
                          </span>
                        )}
                      </a>
                    ) : (
                      <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="h-12 w-12 text-slate-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-slate-400 font-medium">{comingSoonText[locale]}</span>
                        </div>
                        {video.category && (
                          <span className="absolute top-2 right-2 px-2 py-1 bg-slate-400 text-white text-xs font-medium rounded">
                            {video.category}
                          </span>
                        )}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-2 text-[var(--color-text)]">{video.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] mb-4 flex-1">{video.description}</p>
                    {hasVideo ? (
                      <a
                        href={videoUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary self-start"
                      >
                        {watchOnYouTube[locale]}
                      </a>
                    ) : (
                      <span className="btn btn-secondary self-start opacity-50 cursor-not-allowed">
                        {comingSoonText[locale]}
                      </span>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const locales: Array<"en" | "de" | "nl"> = ["en", "de", "nl"];
  return locales.map((l) => ({ locale: l }));
}
