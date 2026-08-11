import { useId } from "react";
import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/cn";

// IMAGE-PLAN.md §6. When no image is supplied, renders the designed
// typographic fallback — never a broken image, never an empty box. About's
// team section and the homepage editorial slot both use this until Phase 11
// photography lands (IMAGE-PLAN.md §6: "stock people on the About page" is
// explicitly worse than no image at all).
//
// Arc mask (DESIGN.md §13): same top-right bite as the old 78%→22% polygon,
// redrawn as a cubic path so the cut junctions and remaining outer corners
// are rounded. clipPathUnits=objectBoundingBox keeps it responsive. Swap the
// path for the logo-derived arc when DESIGN.md §18's SVG lands.
const ARC_CUT_PATH =
  "M0 0.04 C0 0.016 0.016 0 0.04 0 L0.72 0 C0.76 0 0.772 0.01 0.785 0.025 C0.86 0.095 0.94 0.155 0.98 0.21 C1 0.22 1 0.24 1 0.28 L1 0.96 C1 0.984 0.984 1 0.96 1 L0.04 1 C0.016 1 0 0.984 0 0.96 Z";

export function Figure({
  picture,
  src,
  alt,
  ratio,
  fallback = null,
  arcMask = false,
  className,
  ...rest
}) {
  const reactId = useId();
  const clipPathId = `to-figure-arc-${reactId.replace(/:/g, "")}`;
  const hasImage = Boolean(picture || src);
  if (!hasImage) return fallback;

  if (!arcMask) {
    return (
      <Img
        picture={picture}
        src={src}
        alt={alt}
        ratio={ratio}
        className={cn("to-figure", className)}
        {...rest}
      />
    );
  }

  return (
    <span
      className={cn("to-figure--arc relative block", className)}
      style={{
        ...(ratio ? { aspectRatio: ratio } : {}),
        clipPath: `url(#${clipPathId})`,
        WebkitClipPath: `url(#${clipPathId})`,
      }}
    >
      <svg
        width={0}
        height={0}
        aria-hidden="true"
        className="pointer-events-none absolute"
      >
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <path d={ARC_CUT_PATH} />
          </clipPath>
        </defs>
      </svg>
      <Img
        picture={picture}
        src={src}
        alt={alt}
        className="to-figure h-full w-full ![border-radius:0]"
        {...rest}
      />
    </span>
  );
}
