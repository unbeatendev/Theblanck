"use client";

import { useCallback, useState } from "react";
import type { ProposalDocument } from "@/types/proposal";
import { loadDraft } from "@/lib/proposal-draft";

type Props = {
  slug: string;
  /** Current in-memory content (edit mode). Falls back to saved browser draft. */
  data?: ProposalDocument;
  className?: string;
};

export function DownloadPdfButton({ slug, data, className = "" }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = useCallback(async () => {
    setBusy(true);
    setError(null);

    try {
      const proposalDocument = data ?? loadDraft(slug) ?? undefined;
      const res = await fetch(`/api/pdf/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proposalDocument ? { document: proposalDocument } : {}),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          (body as { error?: string }).error ?? "PDF generation failed",
        );
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const anchor = window.document.createElement("a");
      anchor.href = url;
      anchor.download = `theblanck-${slug}.pdf`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "PDF download failed");
    } finally {
      setBusy(false);
    }
  }, [slug, data]);

  return (
    <>
      <button
        type="button"
        className={`export-pdf-btn no-print ${className}`.trim()}
        onClick={handleDownload}
        disabled={busy}
        title="Generate a proper PDF file"
      >
        {busy ? "Generating…" : "Download PDF"}
      </button>
      {error && (
        <span className="pdf-download-error no-print" role="alert">
          {error}
        </span>
      )}
    </>
  );
}
