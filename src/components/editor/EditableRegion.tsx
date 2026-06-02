"use client";

import type { ReactNode } from "react";
import { useProposalEdit } from "@/context/ProposalEditContext";

type Props = {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
};

export function EditableRegion({
  id,
  label,
  children,
  className = "",
  as: Tag = "div",
}: Props) {
  const { editMode, selectedId, selectSection } = useProposalEdit();

  if (!editMode) {
    return <Tag className={className}>{children}</Tag>;
  }

  const selected = selectedId === id;

  return (
    <Tag
      className={`editable-region ${className} ${selected ? "editable-region--selected" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        selectSection(id, label);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectSection(id, label);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <span className="editable-region-badge">Click to edit · {label}</span>
      {children}
    </Tag>
  );
}
