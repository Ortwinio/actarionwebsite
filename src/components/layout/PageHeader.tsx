"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getRandomHeaderImage, ALL_HEADER_IMAGES } from "@/lib/headerImages";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  /**
   * Optional: force a specific image instead of using a random one.
   * Use this for pages where branding requires a fixed hero image.
   */
  imageOverride?: string;
};

export default function PageHeader({
  title,
  subtitle,
  imageOverride,
}: PageHeaderProps) {
  // Use a stable initial image to avoid hydration mismatch
  const initialImage = imageOverride || ALL_HEADER_IMAGES[0] || getRandomHeaderImage();

  const [headerImage, setHeaderImage] = useState<string>(initialImage);

  useEffect(() => {
    if (!imageOverride) {
      const random = getRandomHeaderImage();
      setHeaderImage(random);
    }
  }, [imageOverride]);

  return (
    <header className="w-full">
      <div className="relative w-full h-56 md:h-72 lg:h-80">
        <Image
          src={headerImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-lg text-gray-700">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}

// Also export as named for flexibility
export { PageHeader };

