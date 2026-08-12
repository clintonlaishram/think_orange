import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Phase 10 (audit). Every route is prerendered to static HTML, so the module
// script is needed for HYDRATION only — never for first paint. Vite emits it
// ahead of the stylesheet, which on a throttled connection means the ~158KB of
// JS competes with (and delays) the 13KB of render-blocking CSS that FCP
// genuinely waits on. Measured at 3.4s FCP on mobile throttling before this.
//
// Two changes, both cheap and both only valid BECAUSE the HTML is prerendered:
//   1. the stylesheet is moved ahead of the script, and
//   2. the script is dropped to `fetchpriority="low"` so the CSS and the fonts
//      win the bandwidth race. Execution order is unchanged — a module script
//      is deferred either way — so hydration still runs after parse.
//
// Fonts are preloaded because after (2) they are the next thing gating a
// *final* paint: `font-display: swap` means text paints immediately in a
// fallback, but LCP is re-recorded when the real face swaps in. Only the two
// Satoshi cuts that body copy and headings actually use are preloaded; the
// serif and mono faces are decorative and can arrive late.
function criticalPathHtml() {
  return {
    name: "thinkorange:critical-path-html",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const scriptRe = /\s*<script type="module"[^>]*><\/script>/;
        const match = html.match(scriptRe);
        if (!match) return html;

        const script = match[0]
          .trim()
          .replace("<script ", '<script fetchpriority="low" ');
        let out = html.replace(scriptRe, "");

        // Re-insert after the LAST stylesheet, not the first, so a future
        // second CSS chunk doesn't end up behind the script again.
        const lastLink = out.lastIndexOf("<link rel=\"stylesheet\"");
        if (lastLink === -1) return html;
        const insertAt = out.indexOf(">", lastLink) + 1;
        out = `${out.slice(0, insertAt)}\n    ${script}${out.slice(insertAt)}`;

        const preloads = ["/fonts/satoshi-400.woff2", "/fonts/satoshi-900.woff2"]
          .map(
            (href) =>
              `<link rel="preload" as="font" type="font/woff2" href="${href}" crossorigin>`
          )
          .join("\n    ");
        return out.replace("</head>", `  ${preloads}\n  </head>`);
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // vite-imagetools excludes `public/**/*` by default, on the reasonable
    // assumption that public/ files are meant to be copied verbatim. The
    // homepage hero has to be both: a verbatim copy at a stable unhashed URL
    // (it is the sitewide og:image and the LocalBusiness `image`, and social
    // crawlers can't follow a content-hashed name) AND a set of optimised
    // responsive derivatives for the page itself. Clearing the exclude lets
    // that one import through; it changes nothing for images that are never
    // imported with a query, which is every other file under public/.
    imagetools({ exclude: [] }),
    criticalPathHtml(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
