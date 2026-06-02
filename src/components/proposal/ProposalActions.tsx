"use client";

import Link from "next/link";
import { ExportPdfButton } from "./ExportPdfButton";
import { isEditorEnabled } from "@/lib/proposal-draft";

type Props = {
  slug: string;
  clientName: string;
  showEdit?: boolean;
};

export function ProposalActions({ slug, clientName, showEdit = true }: Props) {
  const editorOn = isEditorEnabled() && showEdit;
  const filename = `theblanck-${slug}-${clientName.replace(/\s+/g, "-")}`;

  return (
    <div className="proposal-actions no-print">
      <ExportPdfButton filename={filename} />
      {editorOn && (
        <Link href={`/p/${slug}?edit=1`} className="proposal-action-btn">
          Edit
        </Link>
      )}
    </div>
  );
}
