"use client";

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  hint?: string;
};

export function Field({
  label,
  value,
  onChange,
  multiline,
  rows = 4,
  hint,
}: FieldProps) {
  return (
    <label className="editor-field">
      <span className="editor-field-label">{label}</span>
      {multiline ? (
        <textarea
          className="editor-input"
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="editor-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {hint && <span className="editor-field-hint">{hint}</span>}
    </label>
  );
}

export function ListField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string[];
  onChange: (items: string[]) => void;
  hint?: string;
}) {
  return (
    <Field
      label={label}
      value={value.join("\n")}
      onChange={(text) =>
        onChange(
          text
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean),
        )
      }
      multiline
      rows={8}
      hint={hint ?? "One item per line"}
    />
  );
}
