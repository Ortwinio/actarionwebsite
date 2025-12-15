import React from "react";

type Props = {
  videoId: string;
  title?: string;
  className?: string;
};

export default function YouTubeEmbed({ videoId, title, className }: Props) {
  const safeTitle = title ?? "ActARion use case video";

  return (
    <div className={className}>
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%", // 16:9
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={safeTitle}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      </div>
    </div>
  );
}
