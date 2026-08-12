// Phase 10 — full keyboard traversal of the mega menu and the mobile overlay.
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const execPath = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].find((p) => fs.existsSync(p));

const BASE = "http://localhost:4300";

const describeActive = () =>
  document.activeElement
    ? {
        tag: document.activeElement.tagName.toLowerCase(),
        text: (document.activeElement.innerText || document.activeElement.getAttribute("aria-label") || "").trim().slice(0, 40),
        href: document.activeElement.getAttribute("href"),
        inHeader: !!document.activeElement.closest("header"),
        inMegaPanel: !!document.activeElement.closest('[id^="panel-"]'),
        inMobileNav: !!document.activeElement.closest("#mobile-nav"),
        expanded: document.activeElement.getAttribute("aria-expanded"),
      }
    : null;

const browser = await puppeteer.launch({ executablePath: execPath, headless: true });

// ---------- DESKTOP: mega menu ----------
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });

  console.log("=== DESKTOP MEGA MENU ===\n");

  // Tab from the top and log the focus order until we're past the header.
  console.log("-- tab order from document start:");
  const order = [];
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    const a = await page.evaluate(describeActive);
    order.push(a);
    console.log(
      `   ${String(i + 1).padStart(2)}. <${a.tag}> "${a.text}" ${a.href ?? ""}${a.expanded ? ` aria-expanded=${a.expanded}` : ""}${a.inMegaPanel ? "  [IN PANEL]" : ""}`
    );
  }

  // Focus the Services trigger and open it with the keyboard.
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("header nav button[aria-haspopup]")].find((b) =>
      b.textContent.includes("Services")
    );
    btn.focus();
  });
  await page.keyboard.press("Enter");
  await new Promise((r) => setTimeout(r, 400));

  const openedByKeyboard = await page.evaluate(() => !!document.querySelector('[id^="panel-"]'));
  console.log(`\n-- Enter on "Services" trigger opens panel: ${openedByKeyboard}`);

  // Now Tab forward and see whether we ever land inside the panel before it closes.
  console.log("-- tabbing forward from the open trigger:");
  let reachedPanel = false;
  let closedAfter = null;
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    await new Promise((r) => setTimeout(r, 120));
    const a = await page.evaluate(describeActive);
    const stillOpen = await page.evaluate(() => !!document.querySelector('[id^="panel-"]'));
    if (a.inMegaPanel) reachedPanel = true;
    if (!stillOpen && closedAfter === null) closedAfter = i + 1;
    console.log(
      `   ${String(i + 1).padStart(2)}. <${a.tag}> "${a.text}"  panelOpen=${stillOpen}${a.inMegaPanel ? "  [IN PANEL]" : ""}`
    );
    if (!stillOpen) break;
  }
  console.log(`\n   >> keyboard user reached panel contents: ${reachedPanel}`);
  console.log(`   >> panel closed after ${closedAfter ?? "n/a"} tab(s)`);

  // Escape behaviour.
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("header nav button[aria-haspopup]")].find((b) =>
      b.textContent.includes("Services")
    );
    btn.focus();
  });
  await page.keyboard.press("Enter");
  await new Promise((r) => setTimeout(r, 300));
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 300));
  const afterEscape = await page.evaluate(() => ({
    closed: !document.querySelector('[id^="panel-"]'),
    focusBackOnTrigger: document.activeElement?.getAttribute("aria-haspopup") === "true",
  }));
  console.log(`\n-- Escape closes: ${afterEscape.closed}, focus returned to trigger: ${afterEscape.focusBackOnTrigger}`);

  // Skip link.
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => {
    const el = document.activeElement;
    const r = el.getBoundingClientRect();
    return { text: el.innerText.trim(), href: el.getAttribute("href"), visible: r.width > 0 && r.top >= 0 && r.top < 200 };
  });
  console.log(`-- first Tab: "${skip.text}" -> ${skip.href}, visible when focused: ${skip.visible}`);
  const target = await page.evaluate(() => !!document.querySelector("#main"));
  console.log(`-- #main target exists: ${target}`);

  await page.close();
}

// ---------- MOBILE: overlay ----------
{
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });

  console.log("\n\n=== MOBILE OVERLAY ===\n");

  const inertWhenClosed = await page.evaluate(() => {
    const panel = document.querySelector("#mobile-nav");
    const links = panel.querySelectorAll("a, button");
    return { hasInert: panel.hasAttribute("inert"), linkCount: links.length };
  });
  console.log(`-- closed: inert=${inertWhenClosed.hasInert} (guards ${inertWhenClosed.linkCount} focusables)`);

  // Tab from top — should never enter the closed overlay.
  let enteredClosedOverlay = false;
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    const a = await page.evaluate(describeActive);
    if (a.inMobileNav) enteredClosedOverlay = true;
  }
  console.log(`-- tabbing with overlay closed ever enters it: ${enteredClosedOverlay}`);

  // Open it.
  await page.evaluate(() => {
    document.querySelector('button[aria-controls="mobile-nav"]').focus();
  });
  await page.keyboard.press("Enter");
  await new Promise((r) => setTimeout(r, 500));
  const afterOpen = await page.evaluate(() => ({
    open: !document.querySelector("#mobile-nav").hasAttribute("inert"),
    focusInside: !!document.activeElement.closest("#mobile-nav"),
    activeTag: document.activeElement.tagName.toLowerCase(),
    scrollLocked: document.body.style.overflow === "hidden",
  }));
  console.log(`-- opened via Enter: open=${afterOpen.open}, focus moved inside=${afterOpen.focusInside} (<${afterOpen.activeTag}>), body scroll locked=${afterOpen.scrollLocked}`);

  // Tab all the way through; does focus escape the dialog?
  let escapedDialog = false;
  let steps = 0;
  const seen = [];
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab");
    const a = await page.evaluate(describeActive);
    steps++;
    seen.push(a.inMobileNav);
    if (!a.inMobileNav) {
      escapedDialog = true;
      console.log(`-- focus ESCAPED the open dialog after ${steps} tabs, onto <${a.tag}> "${a.text}"`);
      break;
    }
  }
  if (!escapedDialog) console.log(`-- focus stayed inside the dialog for ${steps} tabs (no escape detected)`);

  // Escape key.
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 400));
  const afterEsc = await page.evaluate(() => ({
    closed: document.querySelector("#mobile-nav").hasAttribute("inert"),
    focusOnTrigger: document.activeElement?.getAttribute("aria-controls") === "mobile-nav",
    scrollRestored: document.body.style.overflow !== "hidden",
  }));
  console.log(`-- Escape: closed=${afterEsc.closed}, focus back on trigger=${afterEsc.focusOnTrigger}, scroll restored=${afterEsc.scrollRestored}`);

  await page.close();
}

// ---------- FOCUS VISIBILITY ----------
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  console.log("\n\n=== FOCUS VISIBILITY (elements with no visible focus indicator) ===\n");

  for (const route of ["/", "/contact", "/services/gst/registration"]) {
    await page.goto(BASE + route, { waitUntil: "networkidle0" });
    const bad = await page.evaluate(() => {
      const out = [];
      const els = [...document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')];
      for (const el of els.slice(0, 200)) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (el.closest("[inert]")) continue;
        el.focus();
        const cs = getComputedStyle(el);
        const hasOutline = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
        const hasRing = cs.boxShadow && cs.boxShadow !== "none";
        if (!hasOutline && !hasRing) {
          out.push({
            tag: el.tagName.toLowerCase(),
            text: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 45),
            cls: (typeof el.className === "string" ? el.className : "").slice(0, 60),
          });
        }
      }
      return out;
    });
    console.log(`${route}: ${bad.length} focusable(s) with no outline/ring`);
    for (const b of bad.slice(0, 12)) console.log(`   <${b.tag}> "${b.text}"  class="${b.cls}"`);
  }
  await page.close();
}

await browser.close();
