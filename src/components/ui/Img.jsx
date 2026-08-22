import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/cn";

// Phase 9 prerenders every route through renderToString, where a layout effect
// warns and has nothing to measure. Same isomorphic guard StepFlow uses.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
// in this version (IMAGE-PLAN.md's `lqip` field assumed one exists).
//
// LOADING STATE (22-08-2026). Until an LQIP exists, an unloaded image left its
// reserved box TRANSPARENT — correct for CLS, but a visitor on a slow
// connection saw a hole in the layout rather than a photo on its way. Every
// image now shows `.img-skeleton` (theme.css) underneath until it decodes.
//   - The skeleton is surface-aware through custom properties, so it is never
//     a bright rectangle on a dark section. See theme.css's own note.
//   - `placeholderSrc` still WINS over the skeleton when it is supplied: a real
//     LQIP of the actual photo beats a generic shimmer. Swap one in later by
//     importing a very small width (e.g. ?w=24) whose emitted file Vite
//     auto-inlines as base64, and passing it here.
//   - Pass `skeleton={false}` for an image whose box is not a photo-shaped
//     surface (a transparent PNG on a plinth, say), where a filled rectangle
//     would be visibly wrong rather than merely early.
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
  skeleton = true,
  sizes,
  className,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  if (!alt && alt !== "") {
    throw new Error("<Img> requires an `alt` prop (empty string is valid for decorative images).");
  }

  // ⛔ THE CACHED-IMAGE TRAP. `onLoad` fires only for a load that happens after
  // React attaches the handler. A prerendered page whose image is already in
  // the HTTP cache — a repeat visit, a back navigation, any second render of a
  // photo the browser already holds — decodes it before hydration, so onLoad
  // never fires and the skeleton would shimmer forever OVER a fully loaded
  // photo. Reading `complete` on mount is the only way to catch that case.
  // `naturalWidth > 0` distinguishes a genuine decode from a failed request,
  // which also reports `complete: true`.
  useIsomorphicLayoutEffect(() => {
    const node = imgRef.current;
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, []);

  const resolvedSrc = picture?.img?.src ?? src;
  const resolvedWidth = picture?.img?.w ?? width;
  const resolvedHeight = picture?.img?.h ?? height;
  const style = ratio ? { aspectRatio: ratio } : undefined;
  const showSkeleton = skeleton && !placeholderSrc;

  // A failed image settles the state too — a permanent shimmer over a broken
  // request reads as "still loading" and is worse than the empty box.
  const settle = () => setLoaded(true);

  return (
    <span
      className={cn("relative block overflow-hidden bg-transparent", className)}
      style={style}
    >
      {showSkeleton && (
        <span
          aria-hidden="true"
          // `data-loaded` is not decoration: it is what STOPS the sheen. The
          // skeleton stays mounted at opacity 0 so the cross-fade can run, and
          // without this its infinite animation would keep ticking on every
          // loaded image on the page, forever. Measured: 4 running animations
          // still going long after all 4 images had decoded.
          data-loaded={loaded ? "true" : "false"}
          className={cn("img-skeleton", loaded && "opacity-0")}
        />
      )}
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
          ref={imgRef}
          src={resolvedSrc}
          width={resolvedWidth}
          height={resolvedHeight}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          onLoad={settle}
          onError={settle}
          className={cn(
            "relative h-full w-full object-cover transition-opacity duration-[var(--dur-slow)]",
            (placeholderSrc || showSkeleton) && !loaded ? "opacity-0" : "opacity-100"
          )}
          {...props}
        />
      </picture>
    </span>
  );
}
