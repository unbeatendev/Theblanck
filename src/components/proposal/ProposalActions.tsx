"use client";

import Link from "next/link";
import type { ProposalDocument } from "@/types/proposal";
import { DownloadPdfButton } from "./DownloadPdfButton";
import { PrintButton } from "./PrintButton";

type Props = {
  slug: string;
  data?: ProposalDocument;
  showEdit?: boolean;
};

export function ProposalActions({ slug, data, showEdit = true }: Props) {
  return (
    <>
      <p className="print-hint no-print">
        Use <strong>Download PDF</strong> for a proper file · <kbd>Ctrl</kbd>+
        <kbd>P</kbd> for print
      </p>
      <div className="proposal-actions no-print">
        <DownloadPdfButton slug={slug} data={data} />
        <PrintButton />
        {showEdit && (
          <Link href={`/p/${slug}?edit=1`} className="proposal-action-btn">
            Edit
          </Link>
        )}
      </div>
    </>
  );
}
