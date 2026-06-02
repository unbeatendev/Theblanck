/**
 * PDF layout settings — edit these to customize how Download PDF looks.
 * Used by Puppeteer (/api/pdf) and the print view at /p/[slug]/pdf.
 */
export const pdfConfig = {
  /** A4 or Letter */
  format: "A4" as "A4" | "Letter",

  /** Page size in mm (used for full-page cover) */
  page: {
    A4: { width: 210, height: 297 },
    Letter: { width: 216, height: 279 },
  },

  /** Page margins. Applied as .doc padding — repeats on every page via box-decoration-break: clone. */
  pageMarginMm: 16,

  /** Cover: edge-to-edge first page */
  cover: {
    fullPage: true,
    paddingMm: 20,
  },

  /** Main document content — uses printable area inside @page margins */
  content: {
    /** Set lower if content still feels tight; 0 = use full printable width */
    maxWidthMm: 0,
    paddingHorizontalMm: 0,
  },

  /** Close / CTA section */
  close: {
    paddingMm: 20,
    /** If true, close section bleeds edge-to-edge like cover */
    fullBleed: true,
  },
} as const;

export function getPdfPageDimensions(format: "A4" | "Letter" = pdfConfig.format) {
  return pdfConfig.page[format];
}

/** CSS custom properties injected on .proposal-pdf-view */
export function pdfCssVariables(format: "A4" | "Letter" = pdfConfig.format) {
  const dim = getPdfPageDimensions(format);
  const contentMax =
    pdfConfig.content.maxWidthMm > 0
      ? `${pdfConfig.content.maxWidthMm}mm`
      : "100%";
  return {
    "--pdf-page-width": `${dim.width}mm`,
    "--pdf-page-height": `${dim.height}mm`,
    "--pdf-page-margin": `${pdfConfig.pageMarginMm}mm`,
    "--pdf-cover-padding": `${pdfConfig.cover.paddingMm}mm`,
    "--pdf-close-padding": `${pdfConfig.close.paddingMm}mm`,
    "--pdf-content-max": contentMax,
  };
}

export type PdfFormat = "A4" | "Letter";

/** @page size + full-bleed cover/close. Content margins use .doc padding (box-decoration-break: clone). */
export function pdfPageCss(format: "A4" | "Letter" = pdfConfig.format): string {
  const size = format === "Letter" ? "letter portrait" : "A4 portrait";
  return `
@page {
  size: ${size};
  margin: 0;
}
@page cover {
  margin: 0;
}
@page close {
  margin: 0;
}
`.trim();
}

export function resolvePdfOptions(searchParams: URLSearchParams) {
  const format =
    searchParams.get("format") === "letter" ? "Letter" : pdfConfig.format;
  return { format };
}
