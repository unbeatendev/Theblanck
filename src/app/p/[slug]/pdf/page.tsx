import { notFound } from "next/navigation";
import { ProposalPdfPageClient } from "@/components/proposal/ProposalPdfPageClient";
import { getAllProposalSlugs, getProposal } from "@/lib/proposals";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProposalSlugs().map((slug) => ({ slug }));
}

export default async function ProposalPdfPage({ params }: PageProps) {
  const { slug } = await params;
  const proposal = getProposal(slug);

  if (!proposal) {
    notFound();
  }

  return <ProposalPdfPageClient slug={slug} initial={proposal} />;
}
