import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Download, Info } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Disclosure } from "@/components/ui/Disclosure";
import { StepFlow } from "@/components/ui/StepFlow";
import { SubNav } from "@/components/layout/SubNav";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/modules/home/sections/CtaBand";
import { dscResourceSectionIds, dscSectionIds } from "@/content/nav";
import { certificateFaqs, dscProcess } from "@/content/dsc/certificates";
import { tokenProduct } from "@/content/dsc/token";
import { TokenOrder } from "@/modules/dsc/TokenOrder";
import { drivers } from "@/content/dsc/drivers";
import { dscValidityRenewalContent } from "@/content/dsc/validity-renewal-faqs";
import { collectionPageJsonLd, faqPageJsonLd, howToJsonLd } from "@/lib/jsonld";
import { dscEnquiryHref } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

// /dsc/buy-token — BUY A DSC USB TOKEN.
//
// ⛔ 02-09-2026, the day's last instruction (Clinton): "analyse
// [emudhradigital.com/purchase-token] and add[] buy token feature in my
// resource page. actually change resou[rce] page to buy token. so add[] the
// buying functionality and token det[ai]ls. also remove the data from epass,
// watchdata, mtoken."
//
// This page was the Resources tab for about an hour. It is now the Buy Token
// page: ordering first, then what the token is and why it is required, then
// the driver and setup material that was already here — which belongs, because
// it is all one object's lifecycle. Section order follows the reference page
// (explainers, then choose, then act) with the order panel pulled ABOVE the
// explainers, because a returning buyer should not have to scroll past an
// explanation they have already read.
//
// ⛔ ONE TOKEN, NOT FOUR. ePass 2003, Watchdata Proxkey and mToken were deleted
// from `drivers.js` on the same instruction. HYP2003 is what ThinkOrange
// actually stocks and issues onto, which is what this page now sells. Every
// consumer maps over `drivers` rather than assuming four, so putting one back
// is a content edit.
//
// ⛔ NO PRICE AND NO CHECKOUT — both deliberate, both with real reasons, and
// both documented at length in `content/dsc/token.js` and `TokenOrder.jsx`.
// Short version: the reference's "Rs. 600" is that site's price, and this has no
// backend or payment provider, so ordering routes to WhatsApp with the
// selection pre-filled. Set `tokenProduct.price` and the panel turns its own
// price display on.
//
// ⚠️ SURFACE CADENCE: deep → light → light-alt → dark → light-alt → light →
// light-alt → light → ember. Zero consecutive repeats and no adjacent
// dark-family pairs. ⚠️ Inserting the order and about-token sections pushed
// every surface below them along by two and produced a light-alt/light-alt
// pair at the process/renewal boundary — caught by the cadence probe, not by
// eye. Re-run it after adding or reordering ANY section here.

export default function DscBuyToken({ path }) {
  const faqs = [...certificateFaqs, ...dscValidityRenewalContent.faqs];

  // ⚠️ The open driver is CONTROLLED here, not left to `Disclosure`'s own
  // state, so the hero's token buttons can open one. They are ordinary
  // `#driver-<slug>` links, which means they work as anchors with no JS (the
  // row is in the prerendered DOM and the browser scrolls to it), and this
  // effect additionally opens the panel once JS is running.
  //
  // Read in an EFFECT, never during render: `location` does not exist during
  // Phase 9's Node prerender pass, and a server/client disagreement on which
  // row is open would be a hydration mismatch. Initial state is `null` on both
  // sides.
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
            name: "DSC Resources",
            description: tokenProduct.meta.description,
            path,
          }),
          // ⚠️ The HowTo moved here WITH the four-step issuance content it
          // describes. Schema has to sit on the page that actually renders the
          // steps, or it asserts structure the reader cannot see.
          howToJsonLd({
            name: "How to get a Digital Signature Certificate in India",
            description: tokenProduct.meta.description,
            steps: dscProcess,
            path,
          }),
          // The FAQ schema is built from the SAME array the accordion renders,
          // so the structured data can never assert a question the page does
          // not show.
          faqPageJsonLd(faqs),
        ]}
      />

      <PageHero
        path={path}
        eyebrow="Digital Signatures"
        h1={tokenProduct.h1}
        lede={tokenProduct.lede}
        texture="blueprint"
        textureId="dsc-resources-hero"
      >
        <DriverPicker />
      </PageHero>

      <SubNav
        sections={[
          { id: "order", label: "Order a token" },
          { id: "about-token", label: "About the token" },
          { id: dscResourceSectionIds.drivers, label: "Driver & setup" },
          { id: dscResourceSectionIds.renewal, label: "Validity & renewal" },
          { id: dscResourceSectionIds.faqs, label: "FAQs" },
        ]}
      />

      {/* Order first. A visitor who arrived from "Buy Token" is here to buy,
          and putting the explainer ahead of the panel makes them scroll past
          something they may already know. */}
      <Section id="order" surface="light">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Order a token"
                heading="Choose your platform and quantity"
                lede="The token is the same for everyone; the quantity and your operating system are all we need to quote and dispatch."
              />
              <ul className="mt-8 space-y-3">
                {tokenProduct.buyingFor.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-ink-500">
                    <Check
                      className="mt-1.5 h-4 w-4 shrink-0 text-ember-600"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Reveal delay={0.1} className="lg:col-span-6">
              <TokenOrder />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What the token is, why it is needed, and why not to share it — the
          reference page's three explainer blocks, in our own words. */}
      <Section id="about-token" surface="light-alt">
        <Container>
          <SectionHeading
            eyebrow="About the token"
            heading="What you are actually buying"
            lede="A crypto token is a small piece of secure hardware, not a memory stick. Three things are worth knowing before you order."
          />
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
            {tokenProduct.explainers.map((block, index) => (
              <Reveal key={block.key} delay={index * 0.06} className="border-t border-ink-200 pt-5">
                <span
                  aria-hidden="true"
                  className="font-mono text-body-sm tabular-nums text-ink-400"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-h4 text-ink-600">{block.title}</h3>
                <ul className="mt-4 space-y-3">
                  {block.points.map((point) => (
                    <li key={point} className="flex gap-3 text-body-sm text-ink-500">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-ember-600"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Drivers — install steps and fixes for the token we ship. This is the
          page's one genuinely dark band: without it the body ran light on
          light-alt the whole way down, which is the flatness the /dsc premium
          pass existed to fix.
          ⚠️ EVERYTHING INSIDE HAD TO BE MADE SURFACE-AWARE when this went from
          light to dark. `SectionHeading` and `Disclosure` take `dark`, and
          `DriverPanel` now does too — the surface system covers headings and
          `var(--surface-*)` accents, NOT the plain `text-ink-*` utilities this
          panel is built from. Left unchanged, its body copy measured 1.4–2.8:1
          on ink. Caught by the pixel-contrast pass, not by eye. */}
      <Section id={dscResourceSectionIds.drivers} surface="dark" className="surface-ambient">
        <Container>
          <SectionHeading
            eyebrow="Driver & setup"
            heading="Installing the token driver"
            lede="A token needs its driver installed before any portal can see it. This is where most support calls come from — usually after a system update removes it."
            dark
          />
          <Disclosure
            dark
            openKey={openDriver}
            onOpenChange={setOpenDriver}
            items={drivers.map((driver) => ({
              key: driver.slug,
              anchorId: `driver-${driver.slug}`,
              label: driver.label,
              meta: driver.supportedOs.map((entry) => entry.os).join(" · "),
              panel: <DriverPanel driver={driver} dark />,
            }))}
          />
          <Reveal className="mt-8 flex max-w-[74ch] gap-3 rounded-[var(--radius-md)] border border-ink-700 bg-ink-900/60 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-ember-300" aria-hidden="true" />
            <p className="text-body-sm text-ink-100">
              Hosted installer files are not published here yet. Message us with your operating
              system and we will send the right one — or install it with you.{" "}
              <a
                href={dscEnquiryHref("a token driver")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-medium text-ember-200 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                Ask on WhatsApp
              </a>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* How issuance works. Moved here from /dsc, where "After you get it"
          replaced it — the steps are reference material, and this is the
          reference page. StepFlow renders a Container and its own heading, not
          a <section>, so the surface and the id belong to this wrapper. */}
      <Section id="process" surface="light-alt">
        <StepFlow
          eyebrow="How issuance works"
          heading="From documents to a working certificate"
          intro="The same four steps for every certificate. What changes between them is the document list, not the process."
          surface="light"
          steps={dscProcess}
        />
      </Section>

      {/* Validity, renewal, re-issue. */}
      <Section id={dscResourceSectionIds.renewal} surface="light">
        <Container>
          <SectionHeading
            eyebrow="Renewal & re-issue"
            heading="Validity, renewal and what to do when something goes wrong"
            lede="What renewal actually means in India, and the two steps between holding a certificate and being able to use it."
          />
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7 max-w-[68ch] space-y-5 text-body text-ink-500">
              {dscValidityRenewalContent.renewalGuidance.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </Reveal>
            {/* ⚠️ The four "after you get it" cards that used to sit here moved
                to /dsc, where they replaced the issuance steps. They are not
                duplicated back — one statement of a thing, in one place. */}
            <Reveal delay={0.12} className="lg:col-span-5">
              <div className="rounded-[var(--radius-md)] border border-ember-200 bg-ember-50 p-6">
                <div className="flex gap-3">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-ember-600" aria-hidden="true" />
                  <div>
                    <h3 className="text-h4 text-ink-600">Renewing soon?</h3>
                    <p className="mt-2 text-body-sm text-ink-600">
                      Tell us your expiry date and we will start it before the certificate lapses,
                      so a filing deadline never arrives without a working signature.
                    </p>
                    <a
                      href={dscEnquiryHref("renewing my Digital Signature Certificate")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex rounded-sm text-body-sm font-medium text-ember-700 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
                    >
                      Start a renewal on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section id={dscResourceSectionIds.faqs} surface="light-alt">
        <FaqSection
          heading="DSC questions, answered"
          intro="Which certificate, what it costs to get wrong, what happens at renewal, and what to do when a token stops being recognised."
          items={faqs.map((faq, index) => ({
            id: index,
            question: faq.q,
            answer: faq.a,
          }))}
        />
      </Section>

      {/* The pointer back to the decision half, mirroring /dsc's pointer over
          here. One quiet row, not a card — the split only works if neither
          page starts rebuilding the other. */}
      <Section surface="light">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-200 pt-6">
            <p className="max-w-[62ch] text-body text-ink-500">
              Still working out which certificate you need? The finder asks two questions and names
              it, with the documents and validity for that one.
            </p>
            <Link
              to={`/dsc#${dscSectionIds.finder}`}
              className="group inline-flex items-center gap-2 rounded-sm text-body font-medium text-ember-600 transition-colors hover:text-ember-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2"
            >
              Find your certificate
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
  const withFile = drivers.filter((d) => d.downloads.some((f) => f.url));
  const allHaveFiles = withFile.length === drivers.length;

  return (
    <div>
      <p className="font-mono text-body-sm uppercase tracking-[0.1em] text-ink-300">
        Token drivers
      </p>
      <ul className="mt-4 flex flex-wrap gap-3">
        {drivers.map((driver) => {
          const file = driver.downloads.find((f) => f.url);
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
      {!allHaveFiles && (
        <p className="mt-4 max-w-[62ch] text-body-sm text-ink-300">
          Installer files are not hosted here yet — open a token for its setup steps, or{" "}
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
      <p className={cn("max-w-[68ch] text-body-sm", dark ? "text-ink-100" : "text-ink-500")}>
        {driver.lede}
      </p>

      <div>
        <h4 className={cn(HEAD, dark ? "text-ink-300" : "text-ink-400")}>Compatibility</h4>
        <dl className="mt-3 grid grid-cols-1 gap-x-10 sm:grid-cols-3">
          {driver.supportedOs.map((entry) => (
            <div key={entry.os} className={cn("border-t py-3", dark ? "border-ink-700" : "border-ink-100")}>
              <dt className={cn("text-body-sm font-medium", dark ? "text-canvas" : "text-ink-600")}>{entry.os}</dt>
              <dd className={cn("mt-1 text-body-sm", dark ? "text-ink-100" : "text-ink-500")}>{entry.versions}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <h4 className={cn(HEAD, dark ? "text-ink-300" : "text-ink-400")}>Installation</h4>
        <ol className="mt-3 space-y-4">
          {driver.installSteps.map((step) => (
            <li key={step.step} className="flex gap-4">
              <span className={cn("shrink-0 font-mono tabular-nums text-body-sm", dark ? "text-ember-300" : "text-ember-600")}>
                {String(step.step).padStart(2, "0")}
              </span>
              <span>
                <span className={cn("block text-body-sm font-medium", dark ? "text-canvas" : "text-ink-600")}>{step.title}</span>
                <span className={cn("mt-1 block text-body-sm", dark ? "text-ink-100" : "text-ink-500")}>{step.desc}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h4 className={cn(HEAD, dark ? "text-ink-300" : "text-ink-400")}>
          If something goes wrong
        </h4>
        <dl className="mt-3 space-y-4">
          {driver.troubleshooting.map((item) => (
            <div key={item.issue} className={cn("border-t pt-3", dark ? "border-ink-700" : "border-ink-100")}>
              <dt className={cn("text-body-sm font-medium", dark ? "text-canvas" : "text-ink-600")}>{item.issue}</dt>
              <dd className={cn("mt-1 max-w-[68ch] text-body-sm", dark ? "text-ink-100" : "text-ink-500")}>{item.fix}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
