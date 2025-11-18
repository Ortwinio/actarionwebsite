"use client";

const VIDEO_EMBED_BASE_URL = "https://www.youtube.com/embed/5haLmuol8MU";
const VIDEO_EMBED_URL = `${VIDEO_EMBED_BASE_URL}?rel=0`;
const VIDEO_WATCH_URL = "https://www.youtube.com/watch?v=5haLmuol8MU";

export function HomeVideoCta() {
  return (
    <section className="card w-full max-w-3xl bg-white">
      <p className="text-sm font-semibold uppercase tracking-wide text-actarion-blue">
        Product video
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-actarion-blue">
        See how ActARion works in 30 seconds
      </h2>
      <p className="mt-3 text-sm text-slate-600 sm:text-base">
        Watch this short video to see how ActARion uses AI and Augmented Reality
        to help you create SOPs and work instructions faster, safer, and smarter.
      </p>

      <div className="mt-5 aspect-video w-full overflow-hidden rounded-xl shadow-card">
        <iframe
          className="h-full w-full"
          src={VIDEO_EMBED_URL}
          title="ActARion product overview video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}

