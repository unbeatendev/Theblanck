import type { ProposalDocument } from "@/types/proposal";

const PREFIX = "theblanck-proposal-draft:";

export function draftKey(slug: string) {
  return `${PREFIX}${slug}`;
}

export function loadDraft(slug: string): ProposalDocument | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(draftKey(slug));
    if (!raw) return null;
    return JSON.parse(raw) as ProposalDocument;
  } catch {
    return null;
  }
}

export function saveDraft(slug: string, data: ProposalDocument) {
  localStorage.setItem(draftKey(slug), JSON.stringify(data, null, 2));
}

export function clearDraft(slug: string) {
  localStorage.removeItem(draftKey(slug));
}

export function hasDraft(slug: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(draftKey(slug)) !== null;
}

export function downloadJson(slug: string, data: ProposalDocument) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slug}-proposal.json`;
  a.click();
  URL.revokeObjectURL(url);
}
