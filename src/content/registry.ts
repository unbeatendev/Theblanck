import gale from "@/content/clients/gale";
import travelnest from "@/content/clients/travelnest";
import type { ProposalDocument } from "@/types/proposal";

export const proposals: Record<string, ProposalDocument> = {
  [travelnest.slug]: travelnest,
  [gale.slug]: gale,
};

export const proposalList = Object.values(proposals);

export function getProposal(slug: string): ProposalDocument | undefined {
  return proposals[slug];
}

export function getAllProposalSlugs(): string[] {
  return Object.keys(proposals);
}
