// T5 — Utility/download pages. CONTENT-PLAN.md §9, §11.9, DESIGN.md §2.4.
// No animated hero, no marketing chrome — download buttons above the fold,
// LCP target under 1.2s. The compliance-firm CTA card at the foot is the
// entire commercial mechanism; everything above it exists to be useful.
//
// ⚠️ VERSION / FILE SIZE / RELEASE DATE are deliberately `null`. Same
// discipline as `fees: null` — these are facts that must come from the actual
// vendor file once it is sourced and hosted (BUILD-PLAN.md Phase 7), not
// invented here. A fabricated "v5.2, 8.4 MB, released 12-03-2026" would be
// exactly the kind of invented fact this project's content rules forbid.
// CONTENT-PLAN.md §9 also flags: do not host vendor binaries without checking
// redistribution terms, and show a checksum if you do host them.
//
// OS support lists ARE stated, because they reflect the client's own prior
// draft copy for these exact products (not invented here) and match publicly
// known, stable vendor support matrices — unlike a version number, an OS
// compatibility list does not go stale week to week.

export const drivers = [
  {
    slug: "hyp2003",
    label: "HYP2003",
    h1: "HYP2003 Token Driver Downloads",
    meta: {
      title: "HYP2003 Driver Download | DSC Token Support | ThinkOrange",
      description:
        "HYP2003 USB token driver downloads and installation steps for Windows, macOS and Linux, plus troubleshooting.",
      keywords: ["hyp2003 driver download", "hyp2003 token driver windows", "hyp2003 dsc token"],
    },
    lede: "Driver downloads and installation steps for the HYP2003 USB token — the token we issue with new DSCs.",
    supportedOs: [
      { os: "Windows", versions: "11, 10, 8.1, 7" },
      { os: "macOS", versions: "Current releases" },
      { os: "Linux", versions: "Major distributions" },
    ],
    downloads: [
      { platform: "Windows", version: null, fileSizeApprox: null, releaseDate: null, url: null },
      { platform: "macOS", version: null, fileSizeApprox: null, releaseDate: null, url: null },
      { platform: "Linux", version: null, fileSizeApprox: null, releaseDate: null, url: null },
    ],
    sourceNote:
      "Download links, version numbers and file sizes are added once the vendor files are sourced and hosted — see BUILD-PLAN.md Phase 7. Nothing here is a placeholder for a page that ships incomplete; it's a page that isn't live until this section is real.",
    installSteps: [
      { step: 1, title: "Close any open signing application", desc: "Close your browser and any portal session before installing, so the driver isn't loading against an already-open token session." },
      { step: 2, title: "Run the installer", desc: "Run the downloaded installer as administrator on Windows, or follow the package prompts on macOS/Linux." },
      { step: 3, title: "Insert the token", desc: "Insert the HYP2003 token after installation completes, not before — installing with the token already plugged in is a common cause of it not being detected." },
      { step: 4, title: "Confirm detection", desc: "Open the token management utility installed alongside the driver and confirm the token and certificate are both visible." },
    ],
    troubleshooting: [
      { issue: "Token not detected", fix: "Try a different USB port, preferably directly on the machine rather than through a hub. Confirm the driver installed without error before assuming a hardware fault." },
      { issue: "Driver installation fails", fix: "Confirm you are running the installer as administrator, and that any previous version of the driver has been fully uninstalled first — a partial old install is the most common cause." },
      { issue: "Browser can't see the certificate", fix: "Restart the browser after installing the driver — most browsers cache the available certificate list at launch and won't pick up a newly installed token until restarted." },
      { issue: "Portal or Java-based signing fails", fix: "Some government portals use a Java applet or local signing utility that needs to be restarted after the driver installs. Confirm you're running the portal's currently supported browser version." },
    ],
  },

  {
    slug: "epass-2003",
    label: "ePass 2003",
    h1: "ePass 2003 Driver Downloads",
    meta: {
      title: "ePass 2003 Driver Download | DSC Token Support | ThinkOrange",
      description:
        "ePass 2003 USB token driver downloads and installation steps for Windows, macOS and Linux, plus troubleshooting.",
      keywords: ["epass 2003 driver download", "epass 2003 token driver windows", "epass 2003 dsc"],
    },
    lede: "Driver downloads and installation steps for the ePass 2003 USB token.",
    supportedOs: [
      { os: "Windows", versions: "11, 10, 8.1, 7" },
      { os: "macOS", versions: "Current releases" },
      { os: "Linux", versions: "x64 distributions" },
    ],
    downloads: [
      { platform: "Windows", version: null, fileSizeApprox: null, releaseDate: null, url: null },
      { platform: "macOS", version: null, fileSizeApprox: null, releaseDate: null, url: null },
      { platform: "Linux", version: null, fileSizeApprox: null, releaseDate: null, url: null },
    ],
    sourceNote:
      "Download links, version numbers and file sizes are added once the vendor files are sourced and hosted — see BUILD-PLAN.md Phase 7.",
    installSteps: [
      { step: 1, title: "Close any open signing application", desc: "Close your browser and any active portal session before installing." },
      { step: 2, title: "Run the installer", desc: "Run the downloaded installer as administrator on Windows, or follow the package prompts on macOS/Linux." },
      { step: 3, title: "Insert the token", desc: "Insert the ePass 2003 token after installation completes." },
      { step: 4, title: "Confirm detection", desc: "Open the token management utility and confirm the token and certificate are both visible." },
    ],
    troubleshooting: [
      { issue: "Token not detected", fix: "Try a different USB port directly on the machine. Confirm the driver installed without error first." },
      { issue: "Driver installation fails", fix: "Fully uninstall any previous ePass driver version before reinstalling — the two rarely coexist cleanly." },
      { issue: "Browser can't see the certificate", fix: "Restart the browser after installing the driver." },
      { issue: "Portal or Java-based signing fails", fix: "Restart the portal's signing utility after the driver installs, and confirm you're on a currently supported browser version." },
    ],
  },

  {
    slug: "watchdata-proxkey",
    label: "Watchdata Proxkey",
    h1: "Watchdata Proxkey Driver Downloads",
    meta: {
      title: "Watchdata Proxkey Driver Download | DSC Token Support | ThinkOrange",
      description:
        "Watchdata Proxkey USB token driver downloads and installation steps for Windows and Linux, plus troubleshooting.",
      keywords: ["watchdata proxkey driver download", "proxkey token driver windows", "proxkey dsc token"],
    },
    lede: "Driver downloads and installation steps for the Watchdata Proxkey USB token.",
    supportedOs: [
      { os: "Windows", versions: "11 through XP" },
      { os: "macOS", versions: "Current releases" },
      { os: "Linux", versions: "Ubuntu, BOSS, RedHat" },
    ],
    downloads: [
      { platform: "Windows", version: null, fileSizeApprox: null, releaseDate: null, url: null },
      { platform: "macOS", version: null, fileSizeApprox: null, releaseDate: null, url: null },
      { platform: "Linux", version: null, fileSizeApprox: null, releaseDate: null, url: null },
    ],
    sourceNote:
      "Download links, version numbers and file sizes are added once the vendor files are sourced and hosted — see BUILD-PLAN.md Phase 7.",
    installSteps: [
      { step: 1, title: "Close any open signing application", desc: "Close your browser and any active portal session before installing." },
      { step: 2, title: "Run the installer", desc: "Run the downloaded installer as administrator on Windows, or follow the package prompts on macOS/Linux." },
      { step: 3, title: "Insert the token", desc: "Insert the Proxkey token after installation completes." },
      { step: 4, title: "Confirm detection", desc: "Open the Proxkey token utility and confirm the token and certificate are both visible." },
    ],
    troubleshooting: [
      { issue: "Token not detected", fix: "Try a different USB port directly on the machine. On older Windows versions, confirm the driver explicitly supports that OS version before troubleshooting further." },
      { issue: "Driver installation fails", fix: "Fully uninstall any previous Proxkey driver before reinstalling, and confirm you're using the correct architecture build for your system." },
      { issue: "Browser can't see the certificate", fix: "Restart the browser after installing the driver." },
      { issue: "Portal or Java-based signing fails", fix: "Confirm the portal's signing utility has been restarted since the driver was installed." },
    ],
  },

  {
    slug: "mtoken",
    label: "mToken",
    h1: "mToken Driver Downloads",
    meta: {
      title: "mToken Driver Download | DSC Token Support | ThinkOrange",
      description:
        "mToken USB token driver downloads and installation steps for Windows 32-bit and 64-bit, plus troubleshooting.",
      keywords: ["mtoken driver download", "mtoken dsc token windows", "mtoken 32 bit 64 bit driver"],
    },
    lede: "Driver downloads and installation steps for the mToken USB token.",
    supportedOs: [{ os: "Windows", versions: "11, 10, 8.1 — 32-bit and 64-bit" }],
    downloads: [
      { platform: "Windows (32-bit)", version: null, fileSizeApprox: null, releaseDate: null, url: null },
      { platform: "Windows (64-bit)", version: null, fileSizeApprox: null, releaseDate: null, url: null },
    ],
    sourceNote:
      "Download links, version numbers and file sizes are added once the vendor files are sourced and hosted — see BUILD-PLAN.md Phase 7.",
    installSteps: [
      { step: 1, title: "Check your Windows architecture", desc: "Confirm whether your Windows installation is 32-bit or 64-bit before downloading — the wrong build will not install." },
      { step: 2, title: "Close any open signing application", desc: "Close your browser and any active portal session before installing." },
      { step: 3, title: "Run the installer", desc: "Run the installer as administrator, matched to your system architecture." },
      { step: 4, title: "Insert the token and confirm", desc: "Insert the mToken after installation, then open the token utility to confirm detection." },
    ],
    troubleshooting: [
      { issue: "Installer won't run or errors immediately", fix: "Almost always an architecture mismatch — confirm you downloaded the 32-bit build for a 32-bit Windows installation, or 64-bit for 64-bit, and reinstall with the correct one." },
      { issue: "Token not detected", fix: "Try a different USB port directly on the machine, and confirm the driver installed without error." },
      { issue: "Browser can't see the certificate", fix: "Restart the browser after installing the driver." },
      { issue: "Portal or Java-based signing fails", fix: "Restart the portal's signing utility after the driver installs, and confirm your browser version is currently supported." },
    ],
  },
];

export function getDriver(slug) {
  return drivers.find((d) => d.slug === slug);
}
