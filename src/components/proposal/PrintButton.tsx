"use client";

type Props = {
  className?: string;
};

/** Same as Ctrl+P / Cmd+P — opens the browser print dialog. */
export function PrintButton({ className = "" }: Props) {
  return (
    <button
      type="button"
      className={`export-pdf-btn no-print ${className}`.trim()}
      onClick={() => window.print()}
      title="Print or save as PDF (Ctrl+P)"
    >
      Print / PDF
    </button>
  );
}
