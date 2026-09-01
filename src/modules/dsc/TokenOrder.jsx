import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { tokenProduct } from "@/content/dsc/token";
import { drivers } from "@/content/dsc/drivers";
import { whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

// THE TOKEN ORDER PANEL — platform, quantity, price, order.
//
// ⛔ 02-09-2026. Structure follows emudhradigital.com/purchase-token, which
// Clinton supplied: choose a platform, choose a quantity, see the price, act.
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
//   ⛔ NO CHECKOUT AND NO ADDRESS FIELDS. The reference ends in "Proceed to
//      Pay" behind billing and shipping forms. There is no backend and no
//      payment provider here, so that would be a form that collects postal
//      addresses and does nothing — and every legal page, the privacy policy
//      included, is still a placeholder. The order opens WhatsApp with the
//      selection pre-filled, the established "no backend yet, route to a
//      human" pattern, and the address is taken in that conversation.
//
// ⚠️ THE ORDER MESSAGE IS BUILT FROM THE SAME STATE THE PANEL RENDERS, so what
// a customer sees selected and what we receive can never disagree. That is the
// whole reason quantity and platform are state here rather than uncontrolled
// inputs read at submit time.

// Platforms come from the token's OWN driver entry, not a hardcoded pair. The
// reference offers Windows/Mac; ours also ships a Linux driver, and hiding it
// would misdescribe what we support.
const PLATFORMS = drivers[0]?.supportedOs.map((entry) => entry.os) ?? ["Windows"];

export function TokenOrder() {
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [quantity, setQuantity] = useState(1);
  const [bulk, setBulk] = useState(false);

  const quantityLabel = bulk ? tokenProduct.bulkLabel : String(quantity);
  const hasPrice = typeof tokenProduct.price === "number";
  const total = hasPrice && !bulk ? tokenProduct.price * quantity : null;

  const message = [
    `Hi ThinkOrange, I'd like to order a ${tokenProduct.label}.`,
    `Quantity: ${quantityLabel}`,
    `Operating system: ${platform}`,
    "Please confirm the price and delivery.",
  ].join("\n");

  return (
    <div
      data-surface="dark"
      className="panel-dark grain relative overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-8"
    >
      <div className="relative space-y-8">
        <fieldset>
          <legend className="font-mono text-body-sm uppercase tracking-[0.1em] text-ink-300">
            Operating system
          </legend>
          <p className="mt-2 text-body-sm text-ink-200">{tokenProduct.platformNote}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {PLATFORMS.map((option) => {
              const active = platform === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPlatform(option)}
                  // `aria-pressed`, not a fake radio: these are buttons, and a
                  // screen reader otherwise has no way to know which is chosen.
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-body-sm font-medium transition-colors duration-[var(--dur-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
                    active
                      ? "border-ember-400 bg-ember-400 text-ink-950"
                      : "border-ink-600 text-ink-100 hover:border-ember-400 hover:text-ember-200"
                  )}
                >
                  {active && <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />}
                  {option}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-mono text-body-sm uppercase tracking-[0.1em] text-ink-300">
            Quantity
          </legend>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-ink-600">
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
                className="min-w-14 px-2 text-center font-mono text-h4 tabular-nums text-canvas"
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
          {bulk && <p className="mt-4 text-body-sm text-ink-200">{tokenProduct.bulkNote}</p>}
        </fieldset>

        <div className="border-t border-ink-700 pt-6">
          <dl className="space-y-3">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-body-sm text-ink-200">Token cost</dt>
              <dd className="text-body font-medium text-canvas">
                {hasPrice ? `₹${tokenProduct.price.toLocaleString("en-IN")} each` : "On request"}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-h4 text-canvas">Total</dt>
              <dd className="text-h3 tabular-nums text-canvas">
                {total !== null ? `₹${total.toLocaleString("en-IN")}` : "On request"}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-body-sm text-ink-200">{tokenProduct.priceNote}</p>
        </div>

        <div>
          <Button
            as="a"
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="w-full justify-center sm:w-auto"
          >
            <IconBrandWhatsapp className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            Order on WhatsApp
          </Button>
          <p className="mt-3 text-body-sm text-ink-200">
            Your selection is filled in for you. We confirm the amount and take the delivery
            address there — nothing is paid until you have the quote.
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
      className="flex h-11 w-11 items-center justify-center rounded-full text-ink-100 transition-colors duration-[var(--dur-fast)] hover:text-ember-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:cursor-not-allowed disabled:text-ink-500"
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
        "rounded-full border px-3.5 py-1.5 font-mono text-body-sm tabular-nums transition-colors duration-[var(--dur-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
        active
          ? "border-ember-400 bg-ember-400 text-ink-950"
          : "border-ink-600 text-ink-100 hover:border-ember-400 hover:text-ember-200"
      )}
    >
      {children}
    </button>
  );
}
