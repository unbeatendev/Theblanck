"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProposalDocument } from "@/types/proposal";

type ProposalEditContextValue = {
  editMode: boolean;
  slug: string;
  data: ProposalDocument;
  setData: React.Dispatch<React.SetStateAction<ProposalDocument>>;
  selectedId: string | null;
  selectedLabel: string | null;
  selectSection: (id: string, label: string) => void;
  clearSelection: () => void;
  isDirty: boolean;
  setDirty: (dirty: boolean) => void;
  hasDraft: boolean;
  setHasDraft: (v: boolean) => void;
};

const ProposalEditContext = createContext<ProposalEditContextValue | null>(null);

export function ProposalEditProvider({
  children,
  editMode,
  slug,
  initialData,
  initialHasDraft,
}: {
  children: ReactNode;
  editMode: boolean;
  slug: string;
  initialData: ProposalDocument;
  initialHasDraft?: boolean;
}) {
  const [data, setData] = useState<ProposalDocument>(initialData);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [isDirty, setDirty] = useState(false);
  const [hasDraft, setHasDraft] = useState(initialHasDraft ?? false);

  const selectSection = useCallback((id: string, label: string) => {
    setSelectedId(id);
    setSelectedLabel(label);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedId(null);
    setSelectedLabel(null);
  }, []);

  const value = useMemo(
    () => ({
      editMode,
      slug,
      data,
      setData,
      selectedId,
      selectedLabel,
      selectSection,
      clearSelection,
      isDirty,
      setDirty,
      hasDraft,
      setHasDraft,
    }),
    [
      editMode,
      slug,
      data,
      selectedId,
      selectedLabel,
      selectSection,
      clearSelection,
      isDirty,
      hasDraft,
    ],
  );

  return (
    <ProposalEditContext.Provider value={value}>
      {children}
    </ProposalEditContext.Provider>
  );
}

export function useProposalEdit() {
  const ctx = useContext(ProposalEditContext);
  if (!ctx) {
    return {
      editMode: false,
      slug: "",
      data: null as unknown as ProposalDocument,
      setData: () => undefined,
      selectedId: null,
      selectedLabel: null,
      selectSection: () => undefined,
      clearSelection: () => undefined,
      isDirty: false,
      setDirty: () => undefined,
      hasDraft: false,
      setHasDraft: () => undefined,
    };
  }
  return ctx;
}
