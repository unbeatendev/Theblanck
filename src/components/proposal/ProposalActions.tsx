"use client";

import Link from "next/link";
import { DownloadPdfButton } from "./DownloadPdfButton";
import { PrintButton } from "./PrintButton";
import { isEditorEnabled } from "@/lib/proposal-draft";

type Props = {
  slug: string;
  showEdit?: boolean;
};

export function ProposalActions({ slug, showEdit = true }: Props) {
  const editorOn = isEditorEnabled() && showEdit;

  return (
    <>
      <p className="print-hint no-print">
        Use <strong>Download PDF</strong> for a proper file · <kbd>Ctrl</kbd>+
        <kbd>P</kbd> for print
      </p>
      <div className="proposal-actions no-print">
        <DownloadPdfButton slug={slug} />
        <PrintButton />
        {editorOn && (
          <Link href={`/p/${slug}?edit=1`} className="proposal-action-btn">
            Edit
          </Link>
        )}
      </div>
    </>
  );
}
