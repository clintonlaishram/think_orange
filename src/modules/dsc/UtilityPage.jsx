// import { Link } from "react-router-dom";
import { Download } from "lucide-react";
// import { MessageCircle, ArrowRight } from "lucide-react";
// import { Container } from "@/components/layout/Container";
// import { Section } from "@/components/layout/Section";
// import { Eyebrow } from "@/components/layout/Eyebrow";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
// import { Card } from "@/components/ui/Card";
// import { Accordion } from "@/components/ui/Accordion";
import { ComingSoon } from "@/components/ui/ComingSoon";
// import { JsonLd } from "@/components/seo/JsonLd";
import { findRoute, dscDriversHub, dscDocumentsPage } from "@/content/nav";
// import { findBySlug, site } from "@/content/nav";
import { getDriver } from "@/content/dsc/drivers";
// import { dscProducts } from "@/content/dsc/products";
// import { t } from "@/content/turnaround";
// import { howToJsonLd } from "@/lib/jsonld";

// T5 — CONTENT-PLAN.md §9, §11.9; DESIGN.md §2.4. Covers 6 routes across
// three genuinely different content shapes sharing one speed-first grammar:
// the drivers hub (a plain list), 4 individual driver pages (downloads +
// compatibility + install + troubleshooting), and Documents Required (a
// single consolidated checklist). Dispatch below is by WHICH CONTENT
// COLLECTION the slug resolves against, never by a specific slug string —
// same discipline as ServiceLeaf's PendingLeaf branch in T2.
//
// ⚠️ 13-08-2026: client preview request (Clinton) — each of the 3 branches
// below now renders its hero (with the real download buttons on a driver
// page, since those live inside PageHero itself), then <ComingSoon />
// instead of the rest of the body. Everything else is commented out in
// place, not deleted — see ServiceLeaf.jsx's matching note.
export default function UtilityPage({ path }) {
  const route = findRoute(path);
  const slug = route?.slug;

  if (slug === dscDriversHub.slug) return <DriverHub path={path} />;

  const driver = getDriver(slug);
  if (driver) return <DriverDetail path={path} driver={driver} />;

  if (slug === dscDocumentsPage.slug) return <DocumentsRequired path={path} />;

  return null;
}

function DriverHub({ path }) {
  return (
    <>
      <PageHero
        path={path}
        eyebrow="Digital Signature Certificates"
        h1={dscDriversHub.label}
        lede="Install the right driver for your USB token before signing on any government portal. Pick your token model below."
      />

      <ComingSoon />

      {/*
      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {dscDriversHub.children.map((child) => {
              const driver = getDriver(child.slug);
              return (
                <Link
                  key={child.slug}
                  to={child.path}
                  className="block h-full rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                >
                  <Card surface="light" className="h-full">
                    <h2 className="text-h4 text-ink-600">{child.label}</h2>
                    {driver?.lede && <p className="mt-2 text-body-sm text-ink-500">{driver.lede}</p>}
                    {driver?.supportedOs && (
                      <p className="mt-3 font-mono text-body-sm text-ink-400">
                        {driver.supportedOs.map((o) => o.os).join(" · ")}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-ember-600">
                      Get driver
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <DscEnquiryStrip />
      */}
    </>
  );
}

function DriverDetail({ path, driver }) {
  return (
    <>
      {/*
      <JsonLd
        data={howToJsonLd({
          name: `How to install the ${driver.label} driver`,
          description: driver.meta?.description ?? driver.lede,
          steps: driver.installSteps,
          path,
        })}
      />
      */}

      <PageHero path={path} eyebrow="Token Driver Downloads" h1={driver.h1} lede={driver.lede}>
        <div className="flex flex-wrap gap-3">
          {driver.downloads.map((download) =>
            download.url ? (
              <Button key={download.platform} as="a" href={download.url} variant="primary">
                <Download className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                {download.platform}
              </Button>
            ) : (
              <span
                key={download.platform}
                aria-disabled="true"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-ink-700 px-7 py-3.5 text-body font-medium text-ink-300"
              >
                <Download className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                {download.platform} — not yet available
              </span>
            )
          )}
        </div>
      </PageHero>

      <ComingSoon />

      {/*
      <Section id="compatibility" surface="light">
        <Container>
          <Eyebrow>Compatibility</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">Supported systems &amp; downloads</h2>
          <div className="mt-8 overflow-x-auto rounded-[var(--radius-md)] border border-ink-100">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead className="bg-ink-50">
                <tr>
                  <th className="px-5 py-3.5 text-body-sm font-medium text-ink-600">Platform</th>
                  <th className="px-5 py-3.5 text-body-sm font-medium text-ink-600">Supported versions</th>
                  <th className="px-5 py-3.5 text-body-sm font-medium text-ink-600">Driver version</th>
                  <th className="px-5 py-3.5 text-body-sm font-medium text-ink-600">File size</th>
                  <th className="px-5 py-3.5 text-body-sm font-medium text-ink-600">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {driver.downloads.map((download) => (
                  <tr key={download.platform}>
                    <td className="px-5 py-4 text-body-sm text-ink-600">{download.platform}</td>
                    <td className="px-5 py-4 font-mono text-body-sm text-ink-500">
                      {versionsFor(download.platform, driver.supportedOs)}
                    </td>
                    <td className="px-5 py-4 font-mono text-body-sm tabular-nums text-ink-500">
                      {download.version ?? "—"}
                    </td>
                    <td className="px-5 py-4 font-mono text-body-sm tabular-nums text-ink-500">
                      {download.fileSizeApprox ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-body-sm">
                      {download.url ? (
                        <a
                          href={download.url}
                          className="inline-flex items-center gap-1.5 font-medium text-ember-600 hover:underline underline-offset-4"
                        >
                          Download
                          <Download className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="text-ink-400">Not yet available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {driver.sourceNote && (
            <p className="mt-4 max-w-[68ch] text-body-sm text-ink-400">{driver.sourceNote}</p>
          )}
        </Container>
      </Section>

      <Section id="installation" surface="light-alt">
        <Container>
          <Eyebrow>Installation</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">
            {driver.installSteps.length} steps to get it working
          </h2>
          <ol className="mt-8 max-w-[68ch] space-y-6">
            {driver.installSteps.map((step) => (
              <li key={step.step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ember-400 bg-white font-mono text-body-sm text-ember-600">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-h4 text-ink-600">{step.title}</h3>
                  <p className="mt-1.5 text-body-sm text-ink-500">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="troubleshooting" surface="light">
        <Container>
          <Eyebrow>Troubleshooting</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">If the token isn&rsquo;t working</h2>
          <Accordion
            className="mt-8 max-w-[76ch]"
            items={driver.troubleshooting.map((item, index) => ({
              id: index,
              question: item.issue,
              answer: item.fix,
            }))}
          />
        </Container>
      </Section>

      <DscEnquiryStrip />
      */}
    </>
  );
}

function DocumentsRequired({ path }) {
  return (
    <>
      <PageHero
        path={path}
        eyebrow="Digital Signature Certificates"
        h1={dscDocumentsPage.label}
        lede="What to have ready before you apply, grouped by certificate type — the same lists shown on each certificate's own page."
      />

      <ComingSoon />

      {/*
      <Section surface="light">
        <Container>
          <div className="space-y-12">
            {dscProducts.map((product) => {
              const navEntry = findBySlug(product.slug);
              return (
                <div key={product.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink-100 pb-3">
                    <h2 className="text-h3">
                      {navEntry ? (
                        <Link
                          to={navEntry.path}
                          className="rounded-sm text-ink-600 transition-colors hover:text-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                        >
                          {product.label}
                        </Link>
                      ) : (
                        <span className="text-ink-600">{product.label}</span>
                      )}
                    </h2>
                  </div>
                  <ol className="mt-4 grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
                    {product.documents.map((item, index) => (
                      <li key={index} className="flex gap-3 text-body-sm text-ink-500">
                        <span className="shrink-0 font-mono tabular-nums text-ember-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                  {product.verificationNote && (
                    <p className="mt-4 max-w-[68ch] text-body-sm text-ink-400">
                      {product.verificationNote}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <DscEnquiryStrip />
      */}
    </>
  );
}

/**
 * The entire commercial mechanism on every T5 page (CONTENT-PLAN.md §9): one
 * quiet ember-bordered card, never the full-width CtaBand — a driver page's
 * visitor is here to fix a token, not to be sold to, and reusing CtaBand's
 * ember surface here would spend that full-orange moment on six pages
 * instead of the one place DESIGN.md §11.11 reserves it for.
 *
 * Commented out alongside the rest of this file's body sections (13-08-2026)
 * — <ComingSoon /> is the one commercial mechanism shown for now.
 */
// function DscEnquiryStrip() {
//   const whatsappHref = `${site.whatsappHref}?text=${encodeURIComponent(
//     "Hi ThinkOrange, I'd like to enquire about a new DSC."
//   )}`;
//
//   return (
//     <Section surface="light">
//       <Container>
//         <div className="flex flex-col items-start gap-4 rounded-[var(--radius-md)] border border-ember-200 bg-ember-50 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
//           <div>
//             <h2 className="text-h4 text-ink-600">Need a new DSC?</h2>
//             <p className="mt-1.5 max-w-[52ch] text-body-sm text-ink-500">
//               We issue Class 3 certificates for individuals and organisations, and DGFT
//               certificates for import-export.
//             </p>
//             <p className="mt-1.5 font-mono text-body-sm text-ember-700">
//               Turnaround: {t("dscIssuanceTurnaround")}
//             </p>
//           </div>
//           <Button
//             as="a"
//             href={whatsappHref}
//             target="_blank"
//             rel="noreferrer noopener"
//             variant="secondary"
//             className="shrink-0"
//           >
//             <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
//             Enquire
//           </Button>
//         </div>
//       </Container>
//     </Section>
//   );
// }

// function versionsFor(platform, supportedOs) {
//   const match = (supportedOs ?? []).find((entry) =>
//     platform.toLowerCase().startsWith(entry.os.toLowerCase())
//   );
//   return match?.versions ?? "—";
// }
