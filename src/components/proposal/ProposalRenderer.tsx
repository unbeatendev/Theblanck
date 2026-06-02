"use client";

import type { ProposalDocument } from "@/types/proposal";
import { isDesignServicesAgreement, isModularRetainer } from "@/types/proposal";
import { useProposalEdit } from "@/context/ProposalEditContext";
import { DesignServicesAgreementView } from "./DesignServicesAgreement";
import { ModularRetainerProposalView } from "./ModularRetainerProposal";

export function ProposalRenderer({ data: propData }: { data?: ProposalDocument }) {
  const { editMode, data: ctxData } = useProposalEdit();
  const data = editMode ? ctxData : propData;

  if (!data) return null;

  if (isModularRetainer(data)) {
    return <ModularRetainerProposalView data={data} />;
  }
  if (isDesignServicesAgreement(data)) {
    return <DesignServicesAgreementView data={data} />;
  }
  return null;
}
