"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { ProposalDocument } from "@/types/proposal";
import { ProposalEditProvider } from "@/context/ProposalEditContext";
import { ProposalRenderer } from "@/components/proposal/ProposalRenderer";
import { ProposalActions } from "@/components/proposal/ProposalActions";
import { EditToolbar } from "./EditToolbar";
import { SectionEditPanel } from "./SectionEditPanel";
import {
  hasDraft as checkHasDraft,
  loadDraft,
} from "@/lib/proposal-draft";

type Props = {
  slug: string;
  initial: ProposalDocument;
};

export function ProposalPageClient({ slug, initial }: Props) {
  const searchParams = useSearchParams();
  const editParam = searchParams.get("edit") === "1";
  const editMode = editParam;

  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<ProposalDocument>(initial);
  const [draftLoaded, setDraftLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    const draft = loadDraft(slug);
    if (draft) {
      setData(draft);
      setDraftLoaded(true);
    }
  }, [slug]);

  useEffect(() => {
    const title = `theblanck × ${data.clientName}`;
    const onBeforePrint = () => {
      document.title = title;
    };
    window.addEventListener("beforeprint", onBeforePrint);
    return () => window.removeEventListener("beforeprint", onBeforePrint);
  }, [data.clientName]);

  const showDraftBanner =
    mounted && draftLoaded && !editMode && checkHasDraft(slug);

  const content = (
    <>
      {showDraftBanner && (
        <div className="draft-banner no-print">
          <span>Viewing saved draft (not yet in codebase)</span>
          <Link href={`/p/${slug}?edit=1`}>Continue editing</Link>
        </div>
      )}

      {!editMode && (
        <ProposalActions slug={slug} data={data} />
      )}

      <div id="proposal-print-root" className="proposal-print-root">
        <ProposalRenderer data={data} />
      </div>
    </>
  );

  if (!mounted) {
    return null;
  }

  if (!editMode) {
    return <div className="proposal-page">{content}</div>;
  }

  return (
    <ProposalEditProvider
      editMode
      slug={slug}
      initialData={data}
      initialHasDraft={checkHasDraft(slug)}
    >
      <div className="proposal-page proposal-page--editing">
        <EditToolbar />
        <div className="proposal-editor-layout">
          <div className="proposal-editor-canvas">
            <div id="proposal-print-root" className="proposal-print-root">
              <ProposalRenderer />
            </div>
          </div>
          <SectionEditPanel />
        </div>
      </div>
    </ProposalEditProvider>
  );
}
