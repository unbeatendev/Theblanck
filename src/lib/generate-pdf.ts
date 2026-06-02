import chromium from "@sparticuz/chromium-min";
import puppeteer, { type Browser } from "puppeteer-core";
import { pdfConfig, type PdfFormat } from "./pdf-config";

export type PdfOptions = {
  format?: PdfFormat;
};

/** Sparticuz pack matched to puppeteer-core@24.x / chromium-min@133 */
const CHROMIUM_PACK =
  "https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar";

/** A4 width at 96dpi — matches CSS mm layout */
const VIEWPORT = { width: 794, height: 1123, deviceScaleFactor: 1 };

async function launchBrowser(): Promise<Browser> {
  if (process.env.NODE_ENV === "development") {
    return puppeteer.launch({
      channel: "chrome",
      headless: true,
    });
  }

  return puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(CHROMIUM_PACK),
    headless: chromium.headless,
  });
}

export async function generateProposalPdf(
  pageUrl: string,
  options: PdfOptions = {},
): Promise<Buffer> {
  const format = options.format ?? pdfConfig.format;

  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    await page.emulateMediaType("print");

    await page.goto(pageUrl, {
      waitUntil: "networkidle0",
      timeout: 60_000,
    });

    await page.waitForSelector(".proposal-pdf-view", { timeout: 15_000 });
    await page.evaluateHandle(() => document.fonts.ready);

    // Margins via .doc padding + box-decoration-break:clone (see pdf-layout.css)
    const pdf = await page.pdf({
      format,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      displayHeaderFooter: false,
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

export function resolveSiteUrl(request: Request): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  const host = request.headers.get("host");
  if (!host) {
    return "http://localhost:3000";
  }
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}
