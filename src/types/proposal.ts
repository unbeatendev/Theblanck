export type OverviewRow = {
  service: string;
  covers: string;
  monthly: string;
};

export type CapacityRow = {
  asset: string;
  credits: string;
};

export type PricingSummaryRow = {
  label: string;
  value: string;
  variant?: "default" | "subtotal" | "total" | "muted";
};

export type WorkflowStep = {
  num: string;
  title: string;
  body: string;
};

export type TermRow = {
  label: string;
  value: string;
};

export type ServiceLane = {
  index: string;
  label: string;
  title: string;
  intro: string;
  price?: { amount: string; period: string };
  includesLabel?: string;
  includes: string[];
  note?: string;
  capacity?: {
    label: string;
    rows: CapacityRow[];
  };
};

export type ModularRetainerProposal = {
  slug: string;
  template: "modular-retainer";
  clientName: string;
  year: string;
  listMeta: {
    title: string;
    description: string;
  };
  cover: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titleEmphasis: string;
    subtitle: string;
  };
  overview: {
    title: string;
    intro: string;
    rows: OverviewRow[];
  };
  lanes: ServiceLane[];
  recommended: {
    title: string;
    intro: string;
    rows: PricingSummaryRow[];
  };
  workflow: {
    title: string;
    intro: string;
    steps: WorkflowStep[];
  };
  responsibilities: {
    title: string;
    intro: string;
    items: string[];
  };
  terms: {
    title: string;
    rows: TermRow[];
  };
};

export type SectionBlock =
  | { type: "paragraphs"; items: string[] }
  | { type: "list"; label?: string; items: string[] }
  | { type: "price"; amount: string; period: string }
  | { type: "note"; text: string }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
      alignLast?: boolean;
    }
  | { type: "terms"; rows: TermRow[] }
  | {
      type: "subsection";
      title: string;
      paragraphs?: string[];
      list?: string[];
    };

export type AgreementSection = {
  index: string;
  label: string;
  title: string;
  intro?: string;
  blocks: SectionBlock[];
};

export type SignatureParty = {
  party: string;
  name: string;
  title: string;
};

export type DesignServicesAgreement = {
  slug: string;
  template: "design-services-agreement";
  clientName: string;
  year: string;
  listMeta: {
    title: string;
    description: string;
  };
  cover: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titleEmphasis: string;
    subtitle: string;
  };
  preamble: string;
  sections: AgreementSection[];
  signatures: {
    studio: SignatureParty;
    client: SignatureParty;
  };
};

export type ProposalDocument = ModularRetainerProposal | DesignServicesAgreement;

export function isModularRetainer(
  doc: ProposalDocument,
): doc is ModularRetainerProposal {
  return doc.template === "modular-retainer";
}

export function isDesignServicesAgreement(
  doc: ProposalDocument,
): doc is DesignServicesAgreement {
  return doc.template === "design-services-agreement";
}
