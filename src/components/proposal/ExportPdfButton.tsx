"use client";

import { useCallback, useState } from "react";
import { exportProposalToPdf } from "@/lib/export-proposal-pdf";

type Props = {
  filename: string;
  className?: string;
};

export function ExportPdfButton({ filename, className = "" }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = useCallback(async () => {
    setBusy(true);
    setError(null);

    try {
      await exportProposalToPdf(filename);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "PDF export failed. Please try again.";
      setError(message);
      console.error("PDF export error:", e);
    } finally {
      setBusy(false);
    }
  }, [filename]);

  return (
    <>
      <button
        type="button"
        className={`export-pdf-btn no-print ${className}`.trim()}
        onClick={handleExport}
        disabled={busy}
        title="Download a PDF file"
      >
        {busy ? "Generating…" : "Export PDF"}
      </button>
      {error && (
        <span className="export-pdf-error no-print" role="alert">
          {error}
        </span>
      )}
    </>
  );
}
