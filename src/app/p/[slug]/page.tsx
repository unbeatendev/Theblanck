import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProposalPageClient } from "@/components/editor/ProposalPageClient";
import { getAllProposalSlugs, getProposal } from "@/lib/proposals";
import { isDesignServicesAgreement } from "@/types/proposal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProposalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const proposal = getProposal(slug);

  if (!proposal) {
    return { title: "Proposal not found" };
  }

  const docLabel = isDesignServicesAgreement(proposal)
    ? "Design Services Agreement"
    : "Proposal";

  return {
    title: `theblanck × ${proposal.clientName} — ${docLabel}`,
    description: proposal.cover.subtitle,
    robots: { index: false, follow: false },
  };
}

export default async function ProposalPage({ params }: PageProps) {
  const { slug } = await params;
  const proposal = getProposal(slug);

  if (!proposal) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <ProposalPageClient slug={slug} initial={proposal} />
    </Suspense>
  );
}
