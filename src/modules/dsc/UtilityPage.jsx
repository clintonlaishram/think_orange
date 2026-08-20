import { Link } from "react-router-dom";
import { ArrowRight, Check, Download, MessageCircle, Phone, RefreshCw } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FaqSection } from "@/components/ui/FaqSection";
import { SubNav } from "@/components/layout/SubNav";
import { StepFlow } from "@/components/ui/StepFlow";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  findRoute,
  findBySlug,
  dscDocumentsPage,
  dscDriversHub,
  dscValidityFaqsPage,
  // ⛔ eSign PAUSED — 21-08-2026. dscEsignVsDscPage,
  site,
} from "@/content/nav";
import { getDriver } from "@/content/dsc/drivers";
import { dscGroupForSlug } from "@/content/dsc/groups";
import { dscProducts } from "@/content/dsc/products";
import { dscValidityRenewalContent } from "@/content/dsc/validity-renewal-faqs";
// ⛔ eSign PAUSED — 21-08-2026.
// import { esignOrDscContent } from "@/content/dsc/esign-or-dsc";
import { t } from "@/content/turnaround";
import { howToJsonLd, faqPageJsonLd } from "@/lib/jsonld";
import { dscEnquiryHref } from "@/lib/whatsapp";

// T5 — CONTENT-PLAN.md §9, §11.9; DESIGN.md §2.4. Covers 6 routes across
// three genuinely different content shapes sharing one speed-first grammar:
// the drivers hub (a plain list), 4 individual driver pages (downloads +
// compatibility + install + troubleshooting), and Documents Required (a
// single consolidated checklist). Dispatch below is by WHICH CONTENT
// COLLECTION the slug resolves against, never by a specific slug string —
// same discipline as ServiceLeaf's PendingLeaf branch in T2.
//
// Deliberately NO Reveal/Stagger anywhere in this file. CONTENT-PLAN.md §9's
// LCP < 1.2s target and "no marketing chrome" brief both point the same
// way — every animation this file would otherwise use is scroll-triggered
// motion whose whole cost buys nothing on a page whose entire job is "get
// out of the way".
//
// --- 20-08-2026, DSC premium pass -----------------------------------------
// Every view here now carries its group's background motif, resolved through
// `dscGroupForSlug` (content/dsc/groups.js). All six T5 routes belong to
// "Tokens & Resources" except eSign-or-DSC, which belongs to "eSign
// Solutions" — and neither fact is stated in this file: membership comes from
// `dscPanelColumns` in nav.js, with driver detail pages inheriting the drivers
// hub's group (they are its children, not panel items in their own right).
//
// A texture is not marketing chrome and does not touch the LCP story this
// file's brief protects: it is one inert, un-animated SVG plus one CSS
// gradient behind the content, with no image request, no JS and no layout
// work. The "no Reveal/Stagger" rule above still holds — nothing here
// animates.
//
// The motif is in the HERO ONLY. The first pass also painted it on each
// page's first light section; Clinton's note was that the design "is repeated
// to hero section and next page", and it was right — the same picture twice in
// one scroll. Content sections here get their depth from type and hairlines,
// same as the homepage's own light sections.
export default function UtilityPage({ path }) {
  const route = findRoute(path);
  const slug = route?.slug;

  if (slug === dscDriversHub.slug) return <DriverHub path={path} />;

  const driver = getDriver(slug);
  if (driver) return <DriverDetail path={path} driver={driver} />;

  if (slug === dscDocumentsPage.slug) return <DocumentsRequired path={path} />;

  // 18-08-2026: both written — see MISSING-PAGES.md. Each is its own content
  // shape (neither is "a list of products" or "a single driver"), so each
  // gets its own dispatch check and render function, same pattern as the
  // three shapes above.
  if (slug === dscValidityFaqsPage.slug) return <ValidityRenewalFaqs path={path} />;
  // ⛔ eSign PAUSED — 21-08-2026. The route is off nav.js's table too, so this
  // slug can no longer reach the template at all.
  // if (slug === dscEsignVsDscPage.slug) return <EsignOrDsc path={path} />;

  // Fallback for any future T5 slug added to nav.js with no content shape
  // written yet. Same discipline as ServiceLeaf's PendingLeaf.
  return <PendingUtility path={path} label={route?.label} slug={slug} />;
}

function DriverHub({ path }) {
  const group = dscGroupForSlug(dscDriversHub.slug);
  return (
    <>
      <PageHero
        path={path}
        eyebrow={group?.eyebrow ?? "Digital Signature Certificates"}
        h1={dscDriversHub.label}
        texture={group?.texture}
        textureId={group ? `dsc-drivers-hub-hero-${group.key}` : undefined}
        lede="Install the right driver for your USB token before signing on any government portal. Pick your token model below."
      />

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
                  <Card surface="light" className="card-premium h-full">
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
    </>
  );
}

function DriverDetail({ path, driver }) {
  const group = dscGroupForSlug(driver.slug);
  return (
    <>
      <JsonLd
        data={howToJsonLd({
          name: `How to install the ${driver.label} driver`,
          description: driver.meta?.description ?? driver.lede,
          steps: driver.installSteps,
          path,
        })}
      />

      <PageHero
        path={path}
        eyebrow="Token Driver Downloads"
        h1={driver.h1}
        lede={driver.lede}
        texture={group?.texture}
        textureId={group ? `dsc-driver-hero-${driver.slug}` : undefined}
      >
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

      {/* T5's brief (CONTENT-PLAN.md §9) is "no marketing chrome" — a sub-nav
          is navigation, not chrome, and on a driver page it is the fastest
          route to the one section a stuck user actually wants. Built from
          what renders: `troubleshooting` is optional on a driver. */}
      <SubNav
        sections={[
          { id: "compatibility", label: "Compatibility" },
          { id: "installation", label: "Installation" },
          ...(driver.troubleshooting?.length > 0
            ? [{ id: "troubleshooting", label: "Troubleshooting" }]
            : []),
        ]}
      />

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
        {/* T5's "no marketing chrome" brief (CONTENT-PLAN.md §9) rules out
            scroll REVEALS here, and this is not one: nothing is hidden, every
            step is legible from the moment it renders, and the line only tracks
            where the reader already is. */}
        <StepFlow
          eyebrow="Installation"
          heading={`${driver.installSteps.length} steps to get it working`}
          surface="light"
          steps={driver.installSteps}
        />
      </Section>

      <Section id="troubleshooting" surface="light">
        <FaqSection
          eyebrow="Troubleshooting"
          heading="If the token isn&rsquo;t working"
          intro="The failures we see most often, and what actually fixes them. Still stuck after these, send us a screenshot."
          askLabel="Send us a screenshot"
          items={driver.troubleshooting.map((item, index) => ({
            id: index,
            question: item.issue,
            answer: item.fix,
          }))}
        />
      </Section>

      <DscEnquiryStrip />
    </>
  );
}

function DocumentsRequired({ path }) {
  const group = dscGroupForSlug(dscDocumentsPage.slug);
  return (
    <>
      <PageHero
        path={path}
        eyebrow={group?.eyebrow ?? "Digital Signature Certificates"}
        h1={dscDocumentsPage.label}
        texture={group?.texture}
        textureId={group ? `dsc-documents-hero-${group.key}` : undefined}
        lede="What to have ready before you apply, grouped by certificate type — the same lists shown on each certificate's own page."
      />

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
    </>
  );
}

function ValidityRenewalFaqs({ path }) {
  const group = dscGroupForSlug(dscValidityFaqsPage.slug);
  const renewalReissueRoute = findBySlug("dsc-renewal-reissue");
  const withValidity = dscProducts.filter((product) => product.validityOptions);
  // Columns are the UNION of every product's options, ordered by their leading
  // number — derived, not hardcoded, so a product offering a period nobody else
  // does adds a column rather than being silently dropped from the table.
  // `parseFloat("2 years")` is 2; anything unparseable sorts to the front and
  // keeps insertion order (Array.sort is stable).
  const validityColumns = [
    ...new Set(withValidity.flatMap((product) => product.validityOptions)),
  ].sort((a, b) => (parseFloat(a) || 0) - (parseFloat(b) || 0));

  return (
    <>
      <PageHero
        path={path}
        eyebrow={group?.eyebrow ?? "Digital Signature Certificates"}
        h1={dscValidityFaqsPage.label}
        lede={dscValidityRenewalContent.heroLede}
        texture={group?.texture}
        textureId={group ? `dsc-validity-hero-${group.key}` : undefined}
      />

      <SubNav
        sections={[
          { id: "validity", label: "Validity by certificate" },
          { id: "renewal", label: "Renewal & re-issue" },
          { id: "faqs", label: "FAQs" },
        ]}
      />

      <Section id="validity" surface="light">
        <Container>
          <Eyebrow>Validity by certificate</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">How long each certificate lasts</h2>
          <p className="mt-4 max-w-[68ch] text-body text-ink-500">
            A longer certificate costs more up front and less per year. Pick the row you need to
            see the process and documents for it.
          </p>

          {/* 20-08-2026: was five cards in a 2-column grid — three rows with a
              hole in the last one, each card holding a title and two or three
              pills, so most of it was white space. This data is a MATRIX
              (certificate × validity period), and the one question a reader
              actually has here is "which periods can I get for this
              certificate?" — which a table answers at a glance and a grid of
              cards does not. It also shows the thing the cards hid: Combo has
              no 1-year option.

              Matches the two tables already in this file (the driver
              compatibility table and the eSign comparison), including the
              `overflow-x-auto` + `min-w` pair that keeps a wide table
              scrollable inside its own box instead of widening the page.
              Nothing here animates — tables never do (CLAUDE.md), which is also
              T5's own no-motion brief. */}
          <div className="mt-8 overflow-x-auto rounded-[var(--radius-md)] border border-ink-100">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead className="bg-ink-50">
                <tr>
                  <th scope="col" className="px-5 py-3.5 text-body-sm font-medium text-ink-600">
                    Certificate
                  </th>
                  {validityColumns.map((option) => (
                    <th
                      key={option}
                      scope="col"
                      className="px-5 py-3.5 font-mono text-body-sm font-medium text-ink-600"
                    >
                      {option}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {withValidity.map((product) => {
                  const navEntry = findBySlug(product.slug);
                  return (
                    <tr key={product.slug}>
                      <th
                        scope="row"
                        className="px-5 py-4 text-body font-medium text-ink-600"
                      >
                        {navEntry ? (
                          <Link
                            to={navEntry.path}
                            className="rounded-sm transition-colors hover:text-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                          >
                            {product.label}
                          </Link>
                        ) : (
                          product.label
                        )}
                      </th>
                      {validityColumns.map((option) => {
                        const available = product.validityOptions.includes(option);
                        return (
                          <td key={option} className="px-5 py-4">
                            {/* The glyph is decorative — the accessible answer
                                is the visually-hidden word beside it, so a
                                screen reader hears "Available"/"Not available"
                                rather than an unlabelled tick in a grid of
                                identical cells. */}
                            {available ? (
                              <>
                                <Check
                                  className="h-4 w-4 text-ember-600"
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Available</span>
                              </>
                            ) : (
                              <>
                                {/* ink-400, not ink-300 — 6.48:1 vs 3.35:1 on
                                    canvas. It IS `aria-hidden`, so the pixel
                                    audit skips it (correctly: the accessible
                                    answer is the sr-only word beside it). But
                                    for a sighted reader this dash is the ONLY
                                    signal that a period is unavailable, so it
                                    is not incidental text and it carries the
                                    4.5:1 floor. Caught by computing the pair
                                    directly, not by the audit. */}
                                <span aria-hidden="true" className="text-ink-400">
                                  &mdash;
                                </span>
                                <span className="sr-only">Not available</span>
                              </>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section id="renewal" surface="light-alt">
        <Container>
          <Eyebrow>Renewal, re-issue &amp; revocation</Eyebrow>
          <h2 className="mt-3 text-h2 max-w-[32ch]">What actually happens, and when</h2>
          {/* 20-08-2026: the prose was a lone `max-w-[68ch]` column, so the
              right two thirds of the section were empty. Now 7/5, with the
              next step promoted out of a trailing sentence into a panel beside
              the copy — it was the most useful line here and it was the easiest
              one to miss at the end of three paragraphs. */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-4 lg:col-span-7">
              {dscValidityRenewalContent.renewalGuidance.map((paragraph, index) => (
                <p key={index} className="text-body text-ink-500">
                  {paragraph}
                </p>
              ))}
            </div>

            {renewalReissueRoute && (
              <div
                data-surface="dark"
                className="panel-dark grain relative self-start overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-8 lg:col-span-5"
              >
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-ember-400/60">
                  <RefreshCw
                    className="h-5 w-5 text-ember-400"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
                <h3 className="relative mt-5 text-h4 text-canvas">
                  Ready to renew or re-issue?
                </h3>
                <p className="relative mt-3 text-body text-ink-100">
                  The Renewal &amp; Re-issue page has the process and the documents needed,
                  whether your certificate is expiring or the token is lost or damaged.
                </p>
                <div className="relative mt-6">
                  <Button as={Link} to={renewalReissueRoute.path} variant="primary">
                    See Renewal &amp; Re-issue
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section id="faqs" surface="light">
        <FaqSection
          eyebrow="FAQs"
          heading="Common questions"
          intro="Validity, renewal timing and what happens if a certificate expires before you get to it."
          items={dscValidityRenewalContent.faqs.map((faq, index) => ({
            id: index,
            question: faq.q,
            answer: faq.a,
          }))}
        />
        <JsonLd data={faqPageJsonLd(dscValidityRenewalContent.faqs)} />
      </Section>

      <DscEnquiryStrip />
    </>
  );
}

// ⛔ eSign PAUSED — 21-08-2026, Clinton: "for now comment out all content and
// pages about esign". The whole renderer is preserved verbatim below; uncomment
// it together with the import, the dispatch branch above, and the ⛔ eSign
// PAUSED blocks in nav.js / groups.js / icons.js / products.js /
// hub-content.js / DscHub.jsx / content/insights/.
// function EsignOrDsc({ path }) {
//   const group = dscGroupForSlug(dscEsignVsDscPage.slug);
//   const esignRoute = findBySlug("aadhaar-esign");
//   const dscRoute = findBySlug("class-3-individual");
//
//   return (
//     <>
//       <PageHero
//         path={path}
//         eyebrow={group?.eyebrow ?? "eSign Solutions"}
//         h1={dscEsignVsDscPage.label}
//         lede={esignOrDscContent.heroLede}
//         texture={group?.texture}
//         textureId={group ? `dsc-esign-hero-${group.key}` : undefined}
//       />
//
//       <SubNav
//         sections={[
//           { id: "comparison", label: "Side by side" },
//           { id: "which-one", label: "Which one do you need" },
//           { id: "faqs", label: "FAQs" },
//         ]}
//       />
//
//       <Section id="comparison" surface="light">
//         <Container>
//           <Eyebrow>Side by side</Eyebrow>
//           <h2 className="mt-3 text-h2 max-w-[32ch]">Where each one actually differs</h2>
//           <div className="mt-8 overflow-x-auto rounded-[var(--radius-md)] border border-ink-100">
//             <table className="w-full min-w-[640px] border-collapse text-left">
//               <thead className="bg-ink-50">
//                 <tr>
//                   <th className="px-5 py-3.5 text-body-sm font-medium text-ink-600">Criterion</th>
//                   <th className="px-5 py-3.5 text-body-sm font-medium text-ink-600">Aadhaar eSign</th>
//                   <th className="px-5 py-3.5 text-body-sm font-medium text-ink-600">Class 3 DSC</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-ink-100">
//                 {esignOrDscContent.comparisonRows.map((row) => (
//                   <tr key={row.criterion}>
//                     <td className="px-5 py-4 text-body-sm font-medium text-ink-600">{row.criterion}</td>
//                     <td className="px-5 py-4 text-body-sm text-ink-500">{row.esign}</td>
//                     <td className="px-5 py-4 text-body-sm text-ink-500">{row.dsc}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Container>
//       </Section>
//
//       <Section id="which-one" surface="light-alt">
//         <Container>
//           <Eyebrow>Which one do you need</Eyebrow>
//           <h2 className="mt-3 text-h2 max-w-[32ch]">A quick way to decide</h2>
//           <ul className="mt-6 max-w-[68ch] space-y-3">
//             {esignOrDscContent.decisionGuide.map((point, index) => (
//               <li key={index} className="flex gap-3 text-body text-ink-500">
//                 <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500" aria-hidden="true" />
//                 {point}
//               </li>
//             ))}
//           </ul>
//           <div className="mt-8 flex flex-wrap gap-4">
//             {esignRoute && (
//               <Button as={Link} to={esignRoute.path} variant="secondary">
//                 Aadhaar eSign
//                 <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
//               </Button>
//             )}
//             {dscRoute && (
//               <Button as={Link} to={dscRoute.path} variant="secondary">
//                 Class 3 DSC
//                 <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
//               </Button>
//             )}
//           </div>
//         </Container>
//       </Section>
//
//       <Section id="faqs" surface="light">
//         <FaqSection
//           eyebrow="FAQs"
//           heading="Common questions"
//           intro="Which one a portal will actually accept, and when eSign is not a substitute for a Class 3 certificate."
//           items={esignOrDscContent.faqs.map((faq, index) => ({
//             id: index,
//             question: faq.q,
//             answer: faq.a,
//           }))}
//         />
//         <JsonLd data={faqPageJsonLd(esignOrDscContent.faqs)} />
//       </Section>
//
//       <DscEnquiryStrip />
//     </>
//   );
// }

/**
 * Graceful fallback for a T5 slug that matches none of the three known
 * content shapes above and has no content of its own — mirrors ServiceLeaf's
 * `PendingLeaf` and DscProduct's `PendingProduct`. Nothing invented: just the
 * nav label, a breadcrumb, and a direct route to a human. Unlike the other
 * T5 views, this one DOES use `Reveal`-free plain markup consistent with the
 * rest of this file's "no marketing chrome" discipline, but otherwise reads
 * like a T2 pending page since there's no speed-sensitive content to protect
 * yet.
 */
function PendingUtility({ path, label, slug }) {
  const group = dscGroupForSlug(slug);
  // ⛔ eSign PAUSED — 21-08-2026: was "a DSC or eSign service".
  const whatsappHref = dscEnquiryHref(label ?? "a DSC service");

  return (
    <>
      <PageHero
        path={path}
        eyebrow={group?.eyebrow ?? "Digital Signature Certificates"}
        h1={label ?? "Digital Signatures"}
        lede="This page is still being written. Message us directly and we'll help you the same way."
        texture={group?.texture}
        textureId={group ? `dsc-pending-utility-hero-${group.key}` : undefined}
      />

      <Section surface="light">
        <Container>
          <div className="max-w-[68ch]">
            <Eyebrow>Content coming soon</Eyebrow>
            <h2 className="mt-3 text-h2">We&rsquo;re still writing this page</h2>
            <p className="mt-4 text-body-lg text-ink-500">
              Call, WhatsApp or email us and we&rsquo;ll help you the same way we would through
              the page.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button as="a" href={site.phoneHref} variant="secondary">
                <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                {site.phoneDisplay}
              </Button>
              <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer noopener" variant="secondary">
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <DscEnquiryStrip />
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
 * NOTE: the source copy for this card in CONTENT-PLAN.md/DESIGN.md reads
 * "we issue Class 3 certificates in 24 hours" — that clause is dropped here.
 * It's an uncomfirmed turnaround guarantee (CLAUDE.md non-negotiables list),
 * so it goes through `t("dscIssuanceTurnaround")` like every other
 * ThinkOrange commitment, rendering "Confirm with us" until Clinton signs
 * off a real number rather than shipping the spec's example figure as fact.
 */
function DscEnquiryStrip() {
  const whatsappHref = dscEnquiryHref("a new DSC");

  return (
    <Section surface="light">
      <Container>
        <div className="flex flex-col items-start gap-4 rounded-[var(--radius-md)] border border-ember-200 bg-ember-50 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <h2 className="text-h4 text-ink-600">Need a new DSC?</h2>
            <p className="mt-1.5 max-w-[52ch] text-body-sm text-ink-500">
              We issue Class 3 certificates for individuals and organisations, and DGFT
              certificates for import-export.
            </p>
            <p className="mt-1.5 font-mono text-body-sm text-ember-700">
              Turnaround: {t("dscIssuanceTurnaround")}
            </p>
          </div>
          <Button
            as="a"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            variant="secondary"
            className="shrink-0"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            Enquire
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function versionsFor(platform, supportedOs) {
  const match = (supportedOs ?? []).find((entry) =>
    platform.toLowerCase().startsWith(entry.os.toLowerCase())
  );
  return match?.versions ?? "—";
}
