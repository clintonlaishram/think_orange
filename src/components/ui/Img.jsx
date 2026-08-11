import { useState } from "react";
import { cn } from "@/lib/cn";

// IMAGE-PLAN.md §8.4. Every image on the site goes through this component —
// no bare <img> tags anywhere (CLAUDE.md non-negotiables).
//
// `picture` is the object produced by a vite-imagetools "picture" import,
// e.g.:
//   import heroPicture from "@/assets/hero.jpg?w=480;768;1024;1440;1920&format=avif;webp&as=picture";
//   <Img picture={heroPicture} alt="..." />
// which resolves to { sources: { avif: "...", webp: "..." }, img: { src, w, h } } —
// see imagetools-core's pictureFormat. Confirmed against the installed
// vite-imagetools@12 source; there is no bundled base64 LQIP output format
// in this version (IMAGE-PLAN.md's `lqip` field assumed one exists). Until
// real photography lands in Phase 3/11, this renders a flat token-coloured
// placeholder that cross-fades to the loaded image instead of a blurred
// data-URI — swap in a true LQIP later by importing a very small width
// (e.g. ?w=24) whose emitted file Vite will auto-inline as base64 under its
// default assetsInlineLimit, and passing it as `placeholderSrc`.
//
// `src`/`width`/`height` are accepted directly as a fallback for the rare
// non-imagetools case (e.g. a path resolved at runtime) — width and height
// are REQUIRED either way so the box reserves its space before load and
// CLS stays at zero.
export function Img({
  picture,
  src,
  width,
  height,
  ratio,
  alt,
  priority = false,
  placeholderSrc,
  sizes,
  className,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);

  if (!alt && alt !== "") {
    throw new Error("<Img> requires an `alt` prop (empty string is valid for decorative images).");
  }

  const resolvedSrc = picture?.img?.src ?? src;
  const resolvedWidth = picture?.img?.w ?? width;
  const resolvedHeight = picture?.img?.h ?? height;
  const style = ratio ? { aspectRatio: ratio } : undefined;

  return (
    <span
      className={cn("relative block overflow-hidden bg-ink-50", className)}
      style={style}
    >
      {placeholderSrc && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[var(--dur-slow)]",
            loaded ? "opacity-0" : "opacity-100"
          )}
        />
      )}
      <picture>
        {picture?.sources &&
          Object.entries(picture.sources).map(([format, srcSet]) => (
            <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
          ))}
        <img
          src={resolvedSrc}
          width={resolvedWidth}
          height={resolvedHeight}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          onLoad={() => setLoaded(true)}
          className={cn(
            "relative h-full w-full object-cover transition-opacity duration-[var(--dur-slow)]",
            placeholderSrc && !loaded ? "opacity-0" : "opacity-100"
          )}
          {...props}
        />
      </picture>
    </span>
  );
}
