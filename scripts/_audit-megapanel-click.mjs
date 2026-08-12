// Does clicking a link inside the mega panel actually navigate? The panel is
// rendered OUTSIDE the ref the pointerdown-outside handler guards, so the
// suspicion is close() fires on pointerdown and unmounts the link before the
// click completes.
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const execPath = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].find((p) => fs.existsSync(p));

const browser = await puppeteer.launch({ executablePath: execPath, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:4300/", { waitUntil: "networkidle0" });

// Open the Services panel by hovering the trigger, the way a mouse user would.
const trigger = await page.evaluateHandle(() =>
  [...document.querySelectorAll("header nav button[aria-haspopup]")].find((b) =>
    b.textContent.includes("Services")
  )
);
await trigger.hover();
await new Promise((r) => setTimeout(r, 500));

const open = await page.evaluate(() => !!document.querySelector('[id^="panel-"]'));
console.log("panel open on hover:", open);

const linkInfo = await page.evaluate(() => {
  const link = document.querySelector('[id^="panel-"] a[href]');
  if (!link) return null;
  const r = link.getBoundingClientRect();
  return { href: link.getAttribute("href"), text: link.innerText.trim(), x: r.x + r.width / 2, y: r.y + r.height / 2 };
});
console.log("first panel link:", linkInfo);

if (linkInfo) {
  // Move along the path a real cursor would take, then click.
  await page.mouse.move(linkInfo.x, linkInfo.y, { steps: 8 });
  await new Promise((r) => setTimeout(r, 200));

  const beforeDown = await page.evaluate(() => !!document.querySelector('[id^="panel-"]'));
  await page.mouse.down();
  await new Promise((r) => setTimeout(r, 60));
  const afterDown = await page.evaluate(() => !!document.querySelector('[id^="panel-"]'));
  await page.mouse.up();
  await new Promise((r) => setTimeout(r, 800));

  const url = page.url();
  console.log(`panel open before pointerdown: ${beforeDown}`);
  console.log(`panel open after  pointerdown: ${afterDown}`);
  console.log(`URL after click: ${url}`);
  console.log(
    url.endsWith(linkInfo.href)
      ? ">> NAVIGATION WORKED"
      : ">> NAVIGATION FAILED — click was swallowed"
  );
}

await browser.close();
