"use client";

import { useState } from "react";
import Image from "next/image";

export interface GalleryImage {
  id: string;
  url: string;
  alt_text: string | null;
}

export function PropertyGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-sm bg-navy/5 text-sm tracking-wide text-navy/30 uppercase">
        Photos coming soon
      </div>
    );
  }

  const active = images[activeIndex];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-navy/5">
        <Image
          src={active.url}
          alt={active.alt_text || title}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View photo ${i + 1} of ${images.length}`}
              aria-current={i === activeIndex}
              className={`relative aspect-square overflow-hidden rounded-sm border-2 transition-colors ${
                i === activeIndex ? "border-champagne" : "border-transparent"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt_text || ""}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
