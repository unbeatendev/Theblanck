"use client";

import type { CSSProperties } from "react";
import type { ProposalDocument } from "@/types/proposal";
import { pdfCssVariables, pdfPageCss } from "@/lib/pdf-config";
import { ProposalRenderer } from "./ProposalRenderer";
import "@/styles/pdf-layout.css";

/** Clean view for server PDF generation — no chrome, no edit UI. */
export function ProposalPdfView({ data }: { data: ProposalDocument }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pdfPageCss() }} />
      <div
        className="proposal-pdf-view"
        style={pdfCssVariables() as CSSProperties}
      >
        <ProposalRenderer data={data} />
      </div>
    </>
  );
}
