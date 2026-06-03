import { NextResponse } from "next/server";
import { generateProposalPdf, resolveSiteUrl } from "@/lib/generate-pdf";
import { resolvePdfOptions } from "@/lib/pdf-config";
import { getProposal } from "@/lib/proposals";
import type { ProposalDocument } from "@/types/proposal";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

async function createPdf(
  request: Request,
  slug: string,
  document?: ProposalDocument,
) {
  const proposal = getProposal(slug);

  if (!proposal) {
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const { format } = resolvePdfOptions(searchParams);
  const baseUrl = resolveSiteUrl(request);
  const pdfUrl = `${baseUrl}/p/${slug}/pdf`;

  try {
    const pdf = await generateProposalPdf(pdfUrl, {
      format,
      draft: document ? { slug, data: document } : undefined,
    });

    const filename = `theblanck-${slug}.pdf`;
    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[pdf]", slug, error);
    return NextResponse.json(
      {
        error:
          "PDF generation failed. Ensure the dev server is running and Google Chrome is installed.",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  return createPdf(request, slug);
}

export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params;

  let document: ProposalDocument | undefined;
  try {
    const body = (await request.json()) as { document?: ProposalDocument };
    if (body.document && typeof body.document === "object") {
      document = body.document;
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  return createPdf(request, slug, document);
}
