import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Download, Info } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Disclosure } from "@/components/ui/Disclosure";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import {
  dscDriverSectionIds,
  dscDriversPage,
  dscResourcesPage,
} from "@/content/nav";
import { drivers, driversPage } from "@/content/dsc/drivers";
import { collectionPageJsonLd, howToJsonLd } from "@/lib/jsonld";
import { dscEnquiryHref } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

// /dsc/drivers — THE TOKEN DRIVER, ITS INSTALL STEPS AND ITS FIXES.
//
// ⛔ 03-09-2026 (Clinton): "buy token and driver download will be two seperate
// page." This is the driver half, lifted out of Buy Token unchanged — the
// disclosure list, the per-token panel and the "no hosted files yet" note are
// the same components with the same content, on their own URL.
//
// ⚠️ `/dsc/drivers` WAS A REDIRECT STUB until today. Its entry had to come out
// of `dscRetiredRoutes` in the same edit, or `writeRedirects()` would overwrite
// this page's own index.html with a stub pointing at itself. The four
// per-token URLs (`/dsc/drivers/hyp2003` and friends) stay retired and now land
// here.
//
// ⚠️ T5's "no marketing chrome" brief still governs the register of this page —
// it is what a stuck reader opens at 9pm — but `Reveal` is used, as it already
// was in this section when it lived on Buy Token. A texture is one inert SVG
// and costs no request.
export default function DscDrivers({ path = dscDriversPage.path }) {
  // ⚠️ The open driver is CONTROLLED here rather than left to `Disclosure`'s
  // own state, so the hero's token buttons can open one. They are ordinary
  // `#driver-<slug>` links, which means they work as anchors with no JS at all
  // (the row is in the prerendered DOM and the browser scrolls to it); this
  // effect additionally opens the panel once JS is running.
  //
  // Read in an EFFECT, never during render: `location` does not exist during
  // the Node prerender pass, and a server/client disagreement about which row
  // is open would be a hydration mismatch. Initial state is `null` on both.
  const [openDriver, setOpenDriver] = useState(null);
  useEffect(() => {
    const sync = () => {
      const match = window.location.hash.match(/^#driver-(.+)$/);
      if (match) setOpenDriver(match[1]);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: dscDriversPage.label,
            description: driversPage.meta.description,
            path,
          }),
          // ⚠️ The HowTo describes the INSTALL steps, and those render on this
          // page — schema has to sit where the steps are, or it asserts
          // structure the reader cannot see. Built from the driver's own
          // `installSteps`, which already carry `{ step, title, desc }`, so
          // there is nothing restated.
          // ⚠️ Only for entries that actually render steps. `howToJsonLd`
          // returns null on an empty array, but emitting a HowTo for the
          // initialisation tool would assert a procedure this page deliberately
          // does not publish.
          ...drivers
            .filter((driver) => driver.installSteps.length > 0)
            .map((driver) =>
              howToJsonLd({
                name: `Installing the ${driver.label} token driver`,
                description: driver.meta.description,
                steps: driver.installSteps,
                path,
              }),
            ),
        ]}
      />

      <PageHero
        path={path}
        eyebrow="Digital Signatures"
        h1={driversPage.h1}
        lede={driversPage.lede}
        texture="blueprint"
        textureId="dsc-drivers-hero"
      >
        <DriverPicker />
      </PageHero>

      {/* One section, so deliberately NO SubNav — `SubNav` renders nothing
          below two entries anyway, and a one-tab bar is decoration rather than
          navigation.

          ⛔ `light`, NOT `dark`, and this was a real defect on the first cut.
          The hero is `deep`; a `dark` band directly under it is TWO ADJACENT
          DARK-FAMILY SURFACES, which read as one continuous slab with no fold —
          and a cadence check that only compares adjacent TOKENS passes it,
          because `deep` and `dark` are different strings. Exactly the bug
          Clinton reported on /dsc on 02-09-2026. THE HERO CANNOT CHANGE: the
          layout contract requires every page's opening section to be dark,
          because the header is fixed and transparent over it. So the band went
          light. Measured after: darkPair 0.

          ⚠️ EVERY `dark` PROP CAME OFF WITH IT. `SectionHeading`, `Disclosure`
          and `DriverPanel` all take a tone, and the surface system covers
          headings and `var(--surface-*)` accents but NOT the plain `text-ink-*`
          utilities these are built from. Left on `dark` over a light band, the
          body copy would be ink-100 on canvas. */}
      <Section id={dscDriverSectionIds.drivers} surface="light">
        <Container>
          <SectionHeading
            eyebrow="Driver & setup"
            heading="Drivers and token tools"
            lede="A token needs its driver installed before any portal can see it — this is where most support calls come from, usually after a system update removes it. The reset tool is here too, with what it costs you before you run it."
          />
          {/* ⚠️ EVERYTHING IN HERE IS SURFACE-AWARE because the band is dark.
              `SectionHeading`, `Disclosure` and `DriverPanel` all take `dark` —
              the surface system covers headings and `var(--surface-*)` accents,
              NOT the plain `text-ink-*` utilities these are built from. Left
              light, the body copy measured 1.4–2.8:1 on ink. */}
          <Disclosure
            openKey={openDriver}
            onOpenChange={setOpenDriver}
            items={drivers.map((driver) => ({
              key: driver.slug,
              anchorId: `driver-${driver.slug}`,
              label: driver.label,
              // ⚠️ FALLS BACK, never renders empty. The initialisation tool has
              // no OS matrix (nothing is guessed for it), and a blank meta line
              // reads as a row whose subtitle failed to load rather than as one
              // that has none.
              meta:
                driver.supportedOs.length > 0
                  ? driver.supportedOs.map((entry) => entry.os).join(" · ")
                  : "Utility · sent on request",
              panel: <DriverPanel driver={driver} />,
            }))}
          />
          {/* Re-toned with the band. Ember-50 on light is the same callout
              treatment the renewal panel on /dsc/faqs uses. */}
          {/* <Reveal className="mt-8 flex max-w-[74ch] gap-3 rounded-[var(--radius-md)] border border-ember-200 bg-ember-50 p-5">
            <Info
              className="mt-0.5 h-5 w-5 shrink-0 text-ember-600"
              aria-hidden="true"
            />
            <p className="text-body-sm text-ink-600">
              Hosted installer files are not published here yet. Message us with
              your operating system and we will send the right one — or install
              it with you.{" "}
              <a
                href={dscEnquiryHref("a token driver")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-medium text-ember-700 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
              >
                Ask on WhatsApp
              </a>
            </p>
          </Reveal> */}
        </Container>
      </Section>

      {/* The pointer to the page a reader here most likely wants next. One
          quiet row, not a card — the three-way split only works if none of the
          pages starts rebuilding the others. */}
      {/* `light-alt`: the band above is `light` now, and two `light` sections
          back to back is a consecutive repeat. */}
      <Section surface="light-alt">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-200 pt-6">
            <p className="max-w-[62ch] text-body text-ink-500">
              Need the hardware rather than the software? The token is ordered
              on its own page, with delivery taken on WhatsApp.
            </p>
            <Link
              to={dscResourcesPage.path}
              className="group inline-flex items-center gap-2 rounded-sm text-body font-medium text-ember-600 transition-colors hover:text-ember-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
            >
              {dscResourcesPage.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBand
        heading="Token not being detected? Send us a screenshot."
        lede="Driver problems are the single most common thing we are called about, and most of them are fixed in minutes. Tell us the token model and what the portal is saying."
      />
    </>
  );
}

/**
 * The hero's token driver row — "add download link in hero also".
 *
 * ⛔ EVERY `url` IN drivers.js IS NULL, DELIBERATELY, and this component must
 * not pretend otherwise. The vendor files were never sourced: HYP2003 and
 * Watchdata Proxkey each have one unambiguous official page, but ePass 2003
 * (FEITIAN) and mToken are distributed under different names by dozens of
 * competing Indian DSC resellers — several of them direct competitors of
 * ThinkOrange's own DSC business — so linking any one of them would be an
 * undisclosed business decision. Same discipline as `fees: null`: defer the
 * unconfirmed thing rather than guess it.
 *
 * So the honest affordance is a link to that token's own row, where the
 * installation steps and troubleshooting actually are, plus one line saying
 * where the file itself comes from. No button says "Download" while doing
 * something else.
 *
 * ⚠️ WRITTEN SO IT UPGRADES ITSELF. The moment a real `url` lands on a
 * driver's Windows entry, that token's button becomes a genuine download with
 * NO change here — `hasFile` flips, the element becomes an `<a download>`, and
 * the caveat line drops away once every driver has one. Whoever sources the
 * files only has to edit drivers.js.
 */
function DriverPicker() {
  // A driver counts as downloadable only when a real file exists. `downloads`
  // rows are always present (one per platform); it is `url` that is null.
  // ⛔ A `warning` ENTRY NEVER DOWNLOADS STRAIGHT FROM THE HERO, even once its
  // file exists. The initialisation tool erases certificates with no undo, and
  // a one-click pill in a hero row hands someone that binary without their
  // having seen a word of caution. Its pill links to its own panel instead,
  // where the warning renders first and the real download button sits under it.
  // Keyed off `warning`, not off a slug, so anything destructive added later
  // gets the same treatment for free.
  const downloadable = (d) => !d.warning && d.downloads.some((f) => f.url);
  const withFile = drivers.filter(downloadable);
  const allHaveFiles = withFile.length === drivers.length;

  return (
    <div>
      <p className="font-mono text-body-sm uppercase tracking-[0.1em] text-ink-300">
        Token drivers & tools
      </p>
      <ul className="mt-4 flex flex-wrap gap-3">
        {drivers.map((driver) => {
          const file = downloadable(driver) ? driver.downloads.find((f) => f.url) : null;
          const shared =
            "group inline-flex items-center gap-2.5 rounded-full border border-ink-600 bg-ink-900/60 px-5 py-3 text-body-sm font-medium text-canvas transition-colors duration-[var(--dur-fast)] hover:border-ember-400 hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950";

          return (
            <li key={driver.slug}>
              {file ? (
                <a href={file.url} download className={shared}>
                  <Download
                    className="h-4 w-4 text-ember-300 transition-transform duration-[var(--dur-fast)] group-hover:translate-y-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {driver.label}
                </a>
              ) : (
                // A plain in-page anchor, so it works before hydration and
                // without JS. `DscBuyToken`' hashchange effect additionally
                // opens that driver's panel once JS is running.
                <a href={`#driver-${driver.slug}`} className={shared}>
                  <Download
                    className="h-4 w-4 text-ember-300 transition-transform duration-[var(--dur-fast)] group-hover:translate-y-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {driver.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
      {/* ⚠️ REWORDED 04-09-2026. It used to read "Installer files are not
          hosted here yet", which stopped being true the moment HYP2003's
          Windows build was published — and a line under a working download
          button saying nothing is hosted is worse than no line. It now says
          what is genuinely missing rather than asserting a blanket state, and
          it still disappears entirely once every entry has a file. */}
      {!allHaveFiles && (
        <p className="mt-4 max-w-[62ch] text-body-sm text-ink-300">
          Not every build is hosted here — open a token for its setup steps, or{" "}
          <a
            href={dscEnquiryHref("a token driver")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm font-medium text-ember-200 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            message us
          </a>{" "}
          and we will send the right one for your operating system.
        </p>
      )}
    </div>
  );
}

/**
 * One driver's compatibility, installation and troubleshooting — the whole of
 * what its own page used to hold.
 *
 * ⚠️ NOTHING HERE ANIMATES beyond the panel's own fade, and that is inherited
 * rather than incidental. The retired driver pages were T5 utility pages under
 * CONTENT-PLAN.md §9's "no marketing chrome" brief; a reader opening this is a
 * person whose token has stopped working, and a scroll reveal on the fix they
 * are looking for buys nothing.
 */
// Shared class for the panel's three mono sub-headings.
const HEAD = "font-mono text-body-sm uppercase tracking-[0.1em]";

function DriverPanel({ driver, dark = false }) {
  return (
    <div className="space-y-8">
      <p
        className={cn(
          "max-w-[68ch] text-body-sm",
          dark ? "text-ink-100" : "text-ink-500",
        )}
      >
        {driver.lede}
      </p>

      {/* ⛔ THE WARNING RENDERS FIRST AND CANNOT BE COLLAPSED PAST. Initialising
          a token erases the certificate on it, and a reader who scrolls to the
          steps without reading this has already lost something they cannot get
          back. It is the one filled surface in the panel for exactly that
          reason. Only the initialisation tool carries `warning` today; anything
          else destructive should. */}
      {driver.warning && (
        <p
          className={cn(
            "flex max-w-[74ch] gap-3 rounded-[var(--radius-md)] border-l-2 border-ember-400 px-5 py-4 text-body-sm leading-relaxed",
            dark ? "bg-ink-950/45 text-ink-100" : "bg-ember-50 text-ink-600",
          )}
        >
          <AlertTriangle
            className={cn(
              "mt-0.5 h-5 w-5 shrink-0",
              dark ? "text-ember-300" : "text-ember-600",
            )}
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <span>{driver.warning}</span>
        </p>
      )}

      {/* ⛔ THE DOWNLOAD SITS BELOW THE WARNING, NOT ABOVE IT, AND THAT IS THE
          WHOLE REASON IT LIVES IN THE PANEL RATHER THAN ONLY IN THE HERO. This
          file erases certificates. Anyone reaching the button has passed the
          caution on the way to it — which a hero pill cannot guarantee.
          See DriverPicker for the matching rule. */}
      {driver.downloads.filter((f) => f.url).length > 0 && (
        <div>
          <h4 className={cn(HEAD, dark ? "text-ink-300" : "text-ink-400")}>Download</h4>
          <ul className="mt-3 space-y-4">
            {driver.downloads
              .filter((f) => f.url)
              .map((file) => (
                <li key={file.platform}>
                  <a
                    href={file.url}
                    download
                    className="group inline-flex items-center gap-2.5 rounded-full bg-ember-400 px-5 py-2.5 text-body-sm font-medium text-ink-950 transition-colors duration-[var(--dur-fast)] hover:bg-ember-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                  >
                    <Download
                      className="h-4 w-4 transition-transform duration-[var(--dur-fast)] group-hover:translate-y-0.5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {/* Accessible name says WHAT is downloaded — "Download"
                        alone is the vague link text axe flags. */}
                    Download for {file.platform}
                  </a>
                  <p
                    className={cn(
                      "mt-2 text-body-sm",
                      dark ? "text-ink-100" : "text-ink-500",
                    )}
                  >
                    {[file.platform, file.version, file.fileSizeApprox]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {/* CONTENT-PLAN.md §9: show a checksum if you host the
                      binary. `break-all` because a 64-char hash has no break
                      opportunity and would otherwise force the panel wider
                      than the viewport on a phone. */}
                  {/* ⚠️ Renders BEFORE the checksum and in the caution
                      treatment, because it is the sentence that stops someone
                      running the wrong thing. See the row's own comment in
                      drivers.js for why this is a per-file `note` rather than
                      the entry-level `warning`. */}
                  {file.note && (
                    <p
                      className={cn(
                        "mt-2 flex max-w-[74ch] gap-2.5 text-body-sm",
                        dark ? "text-ink-100" : "text-ink-600",
                      )}
                    >
                      <AlertTriangle
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          dark ? "text-ember-300" : "text-ember-600",
                        )}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span>{file.note}</span>
                    </p>
                  )}
                  {file.sha256 && (
                    <p
                      className={cn(
                        "mt-1 font-mono text-body-sm break-all",
                        dark ? "text-ink-300" : "text-ink-400",
                      )}
                    >
                      SHA-256 {file.sha256}
                    </p>
                  )}
                </li>
              ))}
          </ul>
          {/* Names the platforms with no hosted build rather than leaving them
              silently absent — a reader on a Mac should not have to infer from
              an empty list whether we have one. Derived from the rows
              themselves, so it disappears when they are filled. */}
          {driver.downloads.some((f) => !f.url) && (
            <p
              className={cn(
                "mt-4 max-w-[68ch] text-body-sm",
                dark ? "text-ink-300" : "text-ink-400",
              )}
            >
              {driver.downloads
                .filter((f) => !f.url)
                .map((f) => f.platform)
                .join(" and ")}{" "}
              builds are not hosted here — ask us and we will send the right one.
            </p>
          )}
        </div>
      )}

      {driver.useCases?.length > 0 && (
        <div>
          <h4 className={cn(HEAD, dark ? "text-ink-300" : "text-ink-400")}>
            When it is used
          </h4>
          {/* Situations, not steps. We have not documented a procedure for this
              utility and will not invent one — see the ⛔ note on the entry in
              drivers.js. */}
          <ul className="mt-3 space-y-3">
            {driver.useCases.map((useCase) => (
              <li
                key={useCase}
                className={cn(
                  "flex max-w-[74ch] gap-3 text-body-sm",
                  dark ? "text-ink-100" : "text-ink-500",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                    dark ? "bg-ember-300" : "bg-ember-500",
                  )}
                />
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ⚠️ EVERY BLOCK BELOW IS GUARDED. They were unconditional while HYP2003
          was the only entry and every array was populated; the initialisation
          tool has none of them, and an unguarded map renders a heading over an
          empty list — which reads as content that failed to load rather than as
          content that does not exist. */}
      {/* {driver.supportedOs.length > 0 && (
        <div>
          <h4 className={cn(HEAD, dark ? "text-ink-300" : "text-ink-400")}>
            Compatibility
          </h4>
          <dl className="mt-3 grid grid-cols-1 gap-x-10 sm:grid-cols-3">
            {driver.supportedOs.map((entry) => (
              <div
                key={entry.os}
                className={cn(
                  "border-t py-3",
                  dark ? "border-ink-700" : "border-ink-100",
                )}
              >
                <dt
                  className={cn(
                    "text-body-sm font-medium",
                    dark ? "text-canvas" : "text-ink-600",
                  )}
                >
                  {entry.os}
                </dt>
                <dd
                  className={cn(
                    "mt-1 text-body-sm",
                    dark ? "text-ink-100" : "text-ink-500",
                  )}
                >
                  {entry.versions}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )} */}

      {driver.installSteps.length > 0 && (
        <div>
          <h4 className={cn(HEAD, dark ? "text-ink-300" : "text-ink-400")}>
            Installation
          </h4>
          <ol className="mt-3 space-y-4">
            {driver.installSteps.map((step) => (
              <li key={step.step} className="flex gap-4">
                <span
                  className={cn(
                    "shrink-0 font-mono tabular-nums text-body-sm",
                    dark ? "text-ember-300" : "text-ember-600",
                  )}
                >
                  {String(step.step).padStart(2, "0")}
                </span>
                <span>
                  <span
                    className={cn(
                      "block text-body-sm font-medium",
                      dark ? "text-canvas" : "text-ink-600",
                    )}
                  >
                    {step.title}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-body-sm",
                      dark ? "text-ink-100" : "text-ink-500",
                    )}
                  >
                    {step.desc}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {driver.troubleshooting.length > 0 && (
        <div>
          <h4 className={cn(HEAD, dark ? "text-ink-300" : "text-ink-400")}>
            If something goes wrong
          </h4>
          <dl className="mt-3 space-y-4">
            {driver.troubleshooting.map((item) => (
              <div
                key={item.issue}
                className={cn(
                  "border-t pt-3",
                  dark ? "border-ink-700" : "border-ink-100",
                )}
              >
                <dt
                  className={cn(
                    "text-body-sm font-medium",
                    dark ? "text-canvas" : "text-ink-600",
                  )}
                >
                  {item.issue}
                </dt>
                <dd
                  className={cn(
                    "mt-1 max-w-[68ch] text-body-sm",
                    dark ? "text-ink-100" : "text-ink-500",
                  )}
                >
                  {item.fix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* ⚠️ `sourceNote` is where an entry says why its file is not published.
          It renders LAST, and only when set, so the honest state is stated on
          the entry itself rather than only in the page-level note below the
          list. */}
      {driver.sourceNote && driver.downloads.every((f) => !f.url) && (
        <p
          className={cn(
            "max-w-[74ch] text-body-sm leading-relaxed",
            dark ? "text-ink-200" : "text-ink-500",
          )}
        >
          {driver.sourceNote}
        </p>
      )}
    </div>
  );
}
