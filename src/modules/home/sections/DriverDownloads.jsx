import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Stagger } from "@/components/motion/Stagger";
import { cn } from "@/lib/cn";
import { dscDriversPage, dscResourcesPage } from "@/content/nav";
import { drivers } from "@/content/dsc/drivers";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Homepage section 9 — CONTENT-PLAN.md §6 row 9, DESIGN.md §11.9's tone
// ("deliberately plain — this is a service block, not a sales block").
// Light surface, no Card/hover-lift treatment — that restraint IS the point
// here, same reasoning DESIGN.md gives T5 utility pages generally.
//
// ⛔ 02-09-2026: the four driver PAGES are gone, and so are three of the four
// DRIVERS — ePass 2003, Watchdata Proxkey and mToken were deleted on Clinton's
// instruction, leaving HYP2003, the token ThinkOrange actually stocks. This
// section therefore stopped being a four-up grid and became what it now
// honestly is: the one token we ship, its driver, and where to buy it.
//
// ⛔ REAL BUG FIXED HERE, and it was live: this linked to
// `/dsc#${dscSectionIds.drivers}`, but `drivers` moved out of `dscSectionIds`
// when the DSC tree split in two — so the key was `undefined` and every card
// pointed at the literal URL "/dsc#undefined". Nothing errors, nothing logs,
// and a link-integrity scan passes it because the PATH is real; only the
// fragment is nonsense. ⚠️ A missing key on a section-id object fails silently.
// Prefer deriving a href from the page object plus its own id map, as below.
//
// Links go to a page, not a raw file: content/dsc/drivers.js
// deliberately holds `url: null` for every platform until the vendor files
// are actually sourced and hosted (BUILD-PLAN.md Phase 7) — see that file's
// own comment. A "download" glyph pointing at a page with the real
// instructions is honest; pointing it at a file that doesn't exist isn't.
export function DriverDownloads() {
  return (
    <section data-surface="light" className="section-pad bg-canvas">
      <Container>
        <SectionHeading
          eyebrow="Token driver downloads"
          heading="Driver setup for the token we issue"
          headingClassName="max-w-[26ch]"
        />

        {/* Count-aware, because there is one driver now and a four-column
            track holding a single card reads as three that failed to load. */}
        <Stagger
          className={cn(
            "mt-10 grid grid-cols-1 gap-4",
            drivers.length > 1 && "sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {drivers.map((driver) => (
            <Link
              key={driver.slug}
              // ⛔ 03-09-2026: retargeted from `dscResourcesPage.path` when Buy
              // Token split into three pages. The driver rows live on
              // /dsc/drivers now, so this pointed at a fragment on a page that
              // no longer has it. ⚠️ THE BUILD'S FRAGMENT GATE DID NOT CATCH IT
              // — this section is commented out of the homepage, so it renders
              // nowhere and nothing was there to scan. Latent, not live, and
              // fixed while the drivers list was open.
              to={`${dscDriversPage.path}#driver-${driver.slug}`}
              className="group flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-sm)] border border-ink-100 p-5 transition-colors hover:border-ink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
            >
              <div>
                <h3 className="text-h4 text-ink-600">{driver.label}</h3>
                {/* ⚠️ FALLS BACK. The initialisation tool has no OS matrix —
                    nothing is guessed for it — and an empty line here renders
                    as a card whose subtitle failed to load. Same fallback the
                    drivers page's disclosure meta uses. */}
                <p className="mt-1 font-mono text-body-sm text-ink-400">
                  {driver.supportedOs.length > 0
                    ? driver.supportedOs.map((entry) => entry.os).join(" · ")
                    : "Utility · sent on request"}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-ink-500 group-hover:text-ember-600">
                <Download className="h-4 w-4" aria-hidden="true" />
                Setup &amp; troubleshooting
              </span>
            </Link>
          ))}
        </Stagger>

        <p className="mt-6 text-body-sm text-ink-400">
          Need the hardware itself?{" "}
          <Link
            to={`${dscResourcesPage.path}#order`}
            className="rounded-sm font-medium text-ember-600 underline underline-offset-2 hover:text-ember-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
          >
            Buy a DSC token
          </Link>
          .
        </p>

      </Container>
    </section>
  );
}

// (`driverShortLabel` is gone with the driver routes: it stripped the " Driver
// Downloads" suffix nav.js added for breadcrumbs and SEO. `drivers.js` labels
// are already short — "HYP2003", "mToken" — so the card uses them directly.)
