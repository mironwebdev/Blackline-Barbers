"use client";

/* eslint-disable @next/next/no-img-element -- Unsplash's CDN already resizes;
   a hand-built srcSet keeps the site exportable as static files. */

import { useState } from "react";
import { unsplash } from "@/lib/content";

const WIDTHS = [480, 800, 1200, 1600, 2200];

type PhotoProps = {
  id: string;
  alt: string;
  /** Tailwind aspect / sizing classes for the frame. */
  className?: string;
  /** `sizes` attribute so the browser picks a sensible width. */
  sizes: string;
  /** Load eagerly (above the fold). */
  priority?: boolean;
  /** object-position, for intentional crops. */
  position?: string;
};

/**
 * Framed photograph with a monochrome grade, a soft fade-in once loaded and
 * a quiet placeholder if the image cannot be fetched.
 */
export function Photo({
  id,
  alt,
  className = "",
  sizes,
  priority = false,
  position = "50% 50%",
}: PhotoProps) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const local = process.env.NEXT_PUBLIC_LOCAL_PHOTOS === "1";

  const src = local ? `photos/${id}.jpg` : unsplash(id, 1600);
  const srcSet = local
    ? undefined
    : WIDTHS.map((w) => `${unsplash(id, w)} ${w}w`).join(", ");

  return (
    <div
      className={`relative overflow-hidden bg-ash-800 ${className}`}
      data-state={state}
    >
      {state !== "error" && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          ref={(el) => {
            // Handles images that finished loading before hydration.
            if (el?.complete && state === "loading") {
              setState(el.naturalWidth > 0 ? "ready" : "error");
            }
          }}
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
          style={{ objectPosition: position }}
          className={`photo-grade absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            state === "ready" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      {state === "error" && (
        <div className="absolute inset-0 flex items-end p-4">
          <p className="max-w-[18rem] font-serif text-sm italic leading-snug text-ash-400">
            {alt}
          </p>
        </div>
      )}
    </div>
  );
}
