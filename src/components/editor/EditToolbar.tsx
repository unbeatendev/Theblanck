"use client";

import { useRouter } from "next/navigation";
import { ExportPdfButton } from "@/components/proposal/ExportPdfButton";
import { useProposalEdit } from "@/context/ProposalEditContext";
import {
  clearDraft,
  downloadJson,
  saveDraft,
} from "@/lib/proposal-draft";
import { getProposal } from "@/lib/proposals";

export function EditToolbar() {
  const router = useRouter();
  const {
    slug,
    data,
    isDirty,
    setDirty,
    setHasDraft,
    hasDraft,
  } = useProposalEdit();

  const handleSave = () => {
    saveDraft(slug, data);
    setHasDraft(true);
    setDirty(false);
  };

  const handleReset = () => {
    if (
      !confirm(
        "Reset to the original file content? Your saved draft will be deleted.",
      )
    ) {
      return;
    }
    clearDraft(slug);
    const original = getProposal(slug);
    if (original) {
      router.refresh();
      window.location.href = `/p/${slug}?edit=1`;
    }
  };

  return (
    <header className="editor-toolbar">
      <div className="editor-toolbar-left">
        <span className="editor-toolbar-mode">Edit mode</span>
        {isDirty && <span className="editor-toolbar-unsaved">Unsaved changes</span>}
        {hasDraft && !isDirty && (
          <span className="editor-toolbar-saved">Draft saved in browser</span>
        )}
      </div>
      <div className="editor-toolbar-actions">
        <ExportPdfButton
          filename={`theblanck-${slug}-${data.clientName.replace(/\s+/g, "-")}`}
        />
        <button type="button" className="editor-btn" onClick={handleSave}>
          Save draft
        </button>
        <button
          type="button"
          className="editor-btn editor-btn--ghost"
          onClick={() => downloadJson(slug, data)}
        >
          Export JSON
        </button>
        <button
          type="button"
          className="editor-btn editor-btn--ghost"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          type="button"
          className="editor-btn editor-btn--primary"
          onClick={() => {
            saveDraft(slug, data);
            setHasDraft(true);
            setDirty(false);
            router.push(`/p/${slug}`);
          }}
        >
          Preview
        </button>
      </div>
    </header>
  );
}
