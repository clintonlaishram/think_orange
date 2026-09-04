import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { SurfaceTexture } from "@/components/ui/SurfaceTexture";
import { tokenProduct } from "@/content/dsc/token";
import { practiceTypes, practiceTypeLabel } from "@/content/practice-types";
import { whatsappHref } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

// THE TOKEN ORDER PANEL — your details, quantity, price, order.
//
// ⛔ 02-09-2026. Structure follows emudhradigital.com/purchase-token, which
// Clinton supplied: say who you are, choose a quantity, see the price, act.
// Two of that page's four steps are deliberately different here, and both are
// honesty constraints rather than design choices — the full reasoning is in
// `content/dsc/token.js`'s header:
//
//   ⛔ NO PRICE IS PUBLISHED. `tokenProduct.price` is null, exactly as
//      `fees: null` everywhere else. The reference's "Rs. 600" is that
//      site's number, not ThinkOrange's. ⚠️ THIS COMPONENT ALREADY HANDLES A REAL
//      PRICE: set `price` in the content file and the per-unit line, the live
//      `quantity × price` total and the tax note all appear, with no change
//      here. Until then it reads "On request" and the order still carries the
//      quantity, so the quote is a reply rather than a negotiation.
//
//   ⛔ STILL NO CHECKOUT. The reference ends in "Proceed to Pay"; there is no
//      backend and no payment provider here, so ordering opens WhatsApp with
//      the order pre-filled — the established "no backend yet, route to a
//      human" pattern. Nothing is charged and nothing is stored.
//
// ⛔ 03-09-2026 (Clinton): "in the field remove operating system. added name,
// address, phone, email and Practice type." This REVERSES that header's own
// "no address fields" rule, which was written on 02-09-2026 for a real reason,
// so the reason is worth restating rather than deleting:
//
//   ⚠️ THIS FORM POSTS NOWHERE. Every value is composed into a `wa.me` deep
//      link and handed to the reader's OWN WhatsApp app. No server, no EmailJS,
//      no storage, no third party beyond WhatsApp itself — which is materially
//      different from the form POST the old note was arguing against. **If this
//      is ever switched to a real submit, the privacy policy has to be written
//      first**: all five legal pages are still `sections: null`, and a postal
//      address plus a phone number is exactly the payload that needs one.
//
//   ⚠️ Operating system is GONE as a field. It was only ever asked to pick the
//      right driver, and drivers now have their own page — asking a buyer to
//      choose one mid-order was a question about support, in the middle of a
//      purchase.
//
// ⛔ 03-09-2026 (Clinton): "make the card light theme but make the card look
// premium added texture. keep order on whatsapp button green and right side.
// show only total cost thats al on request."
//
// The panel was `.panel-dark` — an ink slab on a light section. It is
// `.card-premium` now, the light-surface card wash the DSC and services cards
// already use, with the page's own `blueprint` texture behind it.
//
//   ⚠️ EVERY FIELD, LABEL, LEGEND AND CONTROL HAD TO BE RE-TONED, not just the
//      wrapper. The form primitives take `tone`, and the surface system covers
//      headings and `var(--surface-*)` accents but NOT the plain `text-ink-*` /
//      `text-canvas` utilities the legends, stepper and price block are built
//      from. Dropping the wrapper alone would have left canvas text on canvas.
//      Fifth recorded instance of that trap in this repo.
//
//   ⚠️ THE TEXTURE NEEDS `relative isolate overflow-hidden` ON THE CARD.
//      `SurfaceTexture` paints at `z-index: -1` so it can never sit on top of
//      the form; without a stacking context it escapes the card and paints
//      behind the section instead, and without `overflow-hidden` it squares off
//      the card's radius. All three or none.
//
//   ⛔ ONE PRICE ROW, NOT TWO. The per-unit "Token cost" row is gone — with no
//      price published, "On request" twice on one card said nothing twice. The
//      qualifier under the total is kept: "On request" with no explanation of
//      what the eventual number includes is worse than the row that went.
//
// ⚠️ THE ORDER MESSAGE IS BUILT FROM THE SAME STATE THE PANEL RENDERS, so what
// a customer sees filled in and what we receive can never disagree. That is the
// whole reason every field is controlled state here rather than an uncontrolled
// input read at submit time.

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  address: "",
  practiceType: practiceTypes[0].value,
};

export function TokenOrder() {
  const [quantity, setQuantity] = useState(1);
  const [bulk, setBulk] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const quantityLabel = bulk ? tokenProduct.bulkLabel : String(quantity);
  const hasPrice = typeof tokenProduct.price === "number";
  const total = hasPrice && !bulk ? tokenProduct.price * quantity : null;

  // ⚠️ BUILT FROM THE SAME STATE THE PANEL RENDERS, and every optional line is
  // dropped rather than sent empty — a message reading "Email:" with nothing
  // after it looks like the form lost the value.
  const message = [
    `Hi ThinkOrange, I'd like to order a ${tokenProduct.label}.`,
    `Quantity: ${quantityLabel}`,
    form.name.trim() && `Name: ${form.name.trim()}`,
    form.phone.trim() && `Phone: ${form.phone.trim()}`,
    form.email.trim() && `Email: ${form.email.trim()}`,
    form.address.trim() && `Delivery address: ${form.address.trim()}`,
    `Practice type: ${practiceTypeLabel(form.practiceType)}`,
    "Please confirm the price and delivery.",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="card-premium relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-ink-100 bg-white p-6 shadow-sm md:p-8">
      <SurfaceTexture variant="blueprint" id="token-order-texture" tone="light" />
      <div className="relative space-y-8">
        {/* ⛔ 03-09-2026: the operating-system chooser stood here. See the
            header note — it was a support question sitting inside a purchase,
            and drivers have their own page now. */}
        <fieldset className="space-y-4">
          <legend className="text-h4 text-ink-600">Your details</legend>
          {/* No `tone` — the primitives default to the light tone, which is
              what this card is now. It was `tone="dark"` on every field while
              the panel was ink. */}
          <Input
            label="Name"
            name="name"
            autoComplete="name"
            placeholder="e.g. Ramesh Kumar"
            value={form.name}
            onChange={update("name")}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
                label="Phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="10-digit mobile"
              value={form.phone}
              onChange={update("phone")}
            />
            <Input
                label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={update("email")}
            />
          </div>
          <Textarea
            label="Delivery address"
            name="address"
            rows={3}
            autoComplete="street-address"
            placeholder="Where the token should be couriered"
            value={form.address}
            onChange={update("address")}
          />
          <Select
            label="Practice type"
            name="practiceType"
            options={practiceTypes}
            value={form.practiceType}
            onChange={update("practiceType")}
          />
        </fieldset>

        <fieldset>
          <legend className="text-h4 text-ink-600">Quantity</legend>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-ink-200 bg-white">
              <StepperButton
                label="Decrease quantity"
                onClick={() => {
                  setBulk(false);
                  setQuantity((q) => Math.max(1, q - 1));
                }}
                disabled={bulk || quantity <= 1}
              >
                <Minus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </StepperButton>
              {/* aria-live so the value is announced as it changes — a stepper
                  whose number only updates visually tells a screen-reader user
                  nothing. tabular-nums so the box does not resize on 9 → 10. */}
              <span
                aria-live="polite"
                className="min-w-14 px-2 text-center font-mono text-h4 tabular-nums text-ink-600"
              >
                {quantityLabel}
              </span>
              <StepperButton
                label="Increase quantity"
                onClick={() => {
                  setBulk(false);
                  setQuantity((q) => Math.min(25, q + 1));
                }}
                disabled={bulk || quantity >= 25}
              >
                <Plus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </StepperButton>
            </div>

            <div className="flex flex-wrap gap-2">
              {tokenProduct.quantities.map((option) => (
                <QuantityChip
                  key={option}
                  active={!bulk && quantity === option}
                  onClick={() => {
                    setBulk(false);
                    setQuantity(option);
                  }}
                >
                  {option}
                </QuantityChip>
              ))}
              <QuantityChip active={bulk} onClick={() => setBulk(true)}>
                {tokenProduct.bulkLabel}
              </QuantityChip>
            </div>
          </div>
          {bulk && <p className="mt-4 text-body-sm text-ink-500">{tokenProduct.bulkNote}</p>}
        </fieldset>

        {/* ⛔ ONE ROW. The per-unit "Token cost" line was removed on Clinton's
            instruction — with `price` null it read "On request" directly above
            a total reading "On request", i.e. the same non-answer twice.
            ⚠️ `hasPrice` and `total` still drive this: set `tokenProduct.price`
            and the row shows a real `quantity × price` figure with no change
            here, which is the whole reason the arithmetic stayed. */}
        <div className="border-t border-ink-200 pt-6">
          <dl className="flex items-baseline justify-between gap-4">
            <dt className="text-h4 text-ink-600">Total</dt>
            <dd className="text-h3 tabular-nums text-ink-600">
              {total !== null ? `₹${total.toLocaleString("en-IN")}` : "On request"}
            </dd>
          </dl>
          <p className="mt-3 text-body-sm text-ink-500">{tokenProduct.priceNote}</p>
        </div>

        <div>
          {/* ⛔ 03-09-2026: green and right-aligned, on instruction.
              ⚠️ `variant="tertiary"` IS the site's WhatsApp button — the same
              one the finder result, ServiceLeaf's quote CTA and DscEsign use.
              Do not hand-roll `bg-whatsapp`; that variant carries the contrast
              fixes recorded in Button.jsx, including that its text must be
              ink-950 (white on this green measures 1.98:1).
              ⛔ THE ALIGNMENT IS ON A WRAPPER, NOT `ml-auto` ON THE BUTTON.
              `Button` is `inline-flex` and its parent is a plain block, so
              `ml-auto` has nothing to push against and silently does nothing —
              measured `rightAligned: false` with the class applied. A flex
              parent with `justify-end` is what actually moves it, and only from
              `sm` up: below that the button is full width and has no side to
              sit on. */}
          <div className="sm:flex sm:justify-end">
            <Button
              as="a"
              href={whatsappHref(message)}
              target="_blank"
              rel="noopener noreferrer"
              variant="tertiary"
              // A named funnel event ALONGSIDE the generic `whatsapp_click`
              // RootLayout's delegated listener also fires for this anchor.
              // Two different event names, not a double count — one answers
              // "how many people reach out on WhatsApp", the other "how many
              // token orders were started, and for how many tokens".
              //
              // ⛔ `quantity` only. Never the composed message or the href:
              // this form puts the buyer's name, phone, email and DELIVERY
              // ADDRESS in `?text=`, and none of that goes to GA4.
              onClick={() =>
                trackEvent("lead_submitted", {
                  form_name: "token_order",
                  quantity: bulk ? "above_25" : quantity,
                })
              }
              className="flex w-full justify-center sm:inline-flex sm:w-auto"
            >
              <IconBrandWhatsapp className="h-4.5 w-4.5" strokeWidth={1.5} aria-hidden="true" />
              Order on WhatsApp
            </Button>
          </div>
          {/* ⚠️ Says plainly where the details go. The form posts nowhere —
              this opens the reader's own WhatsApp with the order written out —
              and saying so is the honest version of a privacy note on a site
              whose privacy policy is still a placeholder. */}
          <p className="mt-3 text-body-sm text-ink-500 sm:text-right">
            This opens WhatsApp with your order written out — nothing is sent or stored until you
            press send there, and nothing is paid until you have the quote.
          </p>
        </div>
      </div>
    </div>
  );
}

function StepperButton({ children, label, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full text-ink-500 transition-colors duration-[var(--dur-fast)] hover:text-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:text-ink-300"
    >
      {children}
    </button>
  );
}

function QuantityChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 font-mono text-body-sm tabular-nums transition-colors duration-[var(--dur-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2",
        active
          ? "border-ember-400 bg-ember-400 text-ink-950"
          : "border-ink-200 bg-white text-ink-600 hover:border-ember-400 hover:text-ember-600"
      )}
    >
      {children}
    </button>
  );
}
