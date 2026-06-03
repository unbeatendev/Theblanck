"use client";

import { useEffect, useState } from "react";
import type { ProposalDocument } from "@/types/proposal";
import { loadDraft } from "@/lib/proposal-draft";
import { ProposalPdfView } from "./ProposalPdfView";

type Props = {
  slug: string;
  initial: ProposalDocument;
};

/** PDF route — prefers browser draft when present (including Puppeteer-injected drafts). */
export function ProposalPdfPageClient({ slug, initial }: Props) {
  const [data, setData] = useState(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const draft = loadDraft(slug);
    if (draft) setData(draft);
    setReady(true);
  }, [slug]);

  return (
    <div data-pdf-ready={ready ? "true" : undefined}>
      <ProposalPdfView data={data} />
    </div>
  );
}
