import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Stagger } from "@/components/motion/Stagger";
import { dscDriversHub } from "@/content/nav";
import { drivers } from "@/content/dsc/drivers";

// Homepage section 9 — CONTENT-PLAN.md §6 row 9, DESIGN.md §11.9's tone
// ("deliberately plain — this is a service block, not a sales block").
// Light surface, no Card/hover-lift treatment — that restraint IS the point
// here, same reasoning DESIGN.md gives T5 utility pages generally.
//
// Links go to each driver's own page, not a raw file: content/dsc/drivers.js
// deliberately holds `url: null` for every platform until the vendor files
// are actually sourced and hosted (BUILD-PLAN.md Phase 7) — see that file's
// own comment. A "download" glyph pointing at a page with the real
// instructions is honest; pointing it at a file that doesn't exist isn't.
export function DriverDownloads() {
  return (
    <section data-surface="light" className="section-pad bg-canvas">
      <Container>
        <Eyebrow>Token driver downloads</Eyebrow>
        <h2 className="mt-3 text-h2 max-w-[26ch]">
          Driver downloads for every DSC token we issue
        </h2>

        <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dscDriversHub.children.map((driver) => {
            const supportedOs = drivers.find((d) => d.slug === driver.slug)?.supportedOs;

            return (
              <Link
                key={driver.slug}
                to={driver.path}
                className="group flex flex-col justify-between gap-3 rounded-[var(--radius-sm)] border border-ink-100 p-5 transition-colors hover:border-ink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
              >
                <div>
                  <h3 className="text-h4 text-ink-600">{driverShortLabel(driver.label)}</h3>
                  {supportedOs && (
                    <p className="mt-1 font-mono text-body-sm text-ink-400">
                      {supportedOs.map((s) => s.os).join(" · ")}
                    </p>
                  )}
                </div>
                <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-ink-500 group-hover:text-ember-600">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Get drivers
                </span>
              </Link>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

// nav.js labels these for breadcrumbs/SEO ("HYP2003 Driver Downloads") —
// too long for a compact card title, so this strips the repeated suffix.
function driverShortLabel(label) {
  return label.replace(/ Driver Downloads$/, "");
}
