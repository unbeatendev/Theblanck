const PDF_ROOT_ID = "proposal-print-root";

export async function exportProposalToPdf(filename: string): Promise<void> {
  const source = document.getElementById(PDF_ROOT_ID);
  if (!source) {
    throw new Error("Proposal content not found.");
  }

  document.body.classList.add("is-generating-pdf");

  const host = document.createElement("div");
  host.className = "pdf-export-clone-host";
  host.setAttribute("aria-hidden", "true");

  const clone = source.cloneNode(true) as HTMLElement;
  clone.removeAttribute("id");

  host.appendChild(clone);
  document.body.appendChild(host);

  try {
    const html2pdf = (await import("html2pdf.js")).default;

    const safeName = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;

    const options = {
      margin: [8, 8, 8, 8] as [number, number, number, number],
      filename: safeName,
      image: { type: "jpeg" as const, quality: 0.96 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FAFAF8",
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: host.scrollWidth,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait" as const,
      },
      pagebreak: {
        mode: ["css", "legacy"],
        before: [".close-section"],
        after: [".cover"],
        avoid: [
          ".section",
          ".signatures-grid",
          ".signature-card",
          ".workflow",
          ".workflow-step",
          ".pricing-summary",
          ".terms-grid",
          ".overview-table",
          ".note",
        ],
      },
    };

    await html2pdf().set(options).from(clone).save();
  } finally {
    document.body.removeChild(host);
    document.body.classList.remove("is-generating-pdf");
  }
}
