import { notFound } from "next/navigation";
import { ProposalPdfView } from "@/components/proposal/ProposalPdfView";
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

  return <ProposalPdfView data={proposal} />;
}
