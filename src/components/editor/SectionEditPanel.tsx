"use client";

import {
  isDesignServicesAgreement,
  isModularRetainer,
  type AgreementSection,
  type DesignServicesAgreement,
  type ModularRetainerProposal,
  type SectionBlock,
} from "@/types/proposal";
import { useProposalEdit } from "@/context/ProposalEditContext";
import { Field, ListField } from "./fields";

function CoverFields({
  cover,
  clientName,
  year,
  onCover,
  onClient,
  onYear,
}: {
  cover: ModularRetainerProposal["cover"];
  clientName: string;
  year: string;
  onCover: (c: ModularRetainerProposal["cover"]) => void;
  onClient: (v: string) => void;
  onYear: (v: string) => void;
}) {
  return (
    <>
      <Field label="Client name" value={clientName} onChange={onClient} />
      <Field label="Year" value={year} onChange={onYear} />
      <Field label="Eyebrow" value={cover.eyebrow} onChange={(eyebrow) => onCover({ ...cover, eyebrow })} />
      <Field label="Title line 1" value={cover.titleLine1} onChange={(titleLine1) => onCover({ ...cover, titleLine1 })} />
      <Field label="Title line 2" value={cover.titleLine2} onChange={(titleLine2) => onCover({ ...cover, titleLine2 })} />
      <Field label="Title emphasis (italic)" value={cover.titleEmphasis} onChange={(titleEmphasis) => onCover({ ...cover, titleEmphasis })} />
      <Field label="Subtitle" value={cover.subtitle} onChange={(subtitle) => onCover({ ...cover, subtitle })} multiline rows={3} />
    </>
  );
}

function AgreementBlocksEditor({
  blocks,
  onChange,
}: {
  blocks: SectionBlock[];
  onChange: (blocks: SectionBlock[]) => void;
}) {
  return (
    <div className="editor-blocks">
      {blocks.map((block, i) => (
        <div key={i} className="editor-block-card">
          <div className="editor-block-type">{block.type}</div>
          {block.type === "paragraphs" && (
            <Field
              label="Paragraphs"
              value={block.items.join("\n\n")}
              onChange={(text) => {
                const next = [...blocks];
                next[i] = {
                  type: "paragraphs",
                  items: text.split(/\n\n+/).map((s) => s.trim()).filter(Boolean),
                };
                onChange(next);
              }}
              multiline
              rows={6}
              hint="Separate paragraphs with a blank line"
            />
          )}
          {block.type === "list" && (
            <>
              <Field
                label="List label (optional)"
                value={block.label ?? ""}
                onChange={(label) => {
                  const next = [...blocks];
                  next[i] = { ...block, label: label || undefined };
                  onChange(next);
                }}
              />
              <ListField
                label="List items"
                value={block.items}
                onChange={(items) => {
                  const next = [...blocks];
                  next[i] = { type: "list", label: block.label, items };
                  onChange(next);
                }}
              />
            </>
          )}
          {block.type === "price" && (
            <>
              <Field
                label="Amount"
                value={block.amount}
                onChange={(amount) => {
                  const next = [...blocks];
                  next[i] = { type: "price", amount, period: block.period };
                  onChange(next);
                }}
              />
              <Field
                label="Period"
                value={block.period}
                onChange={(period) => {
                  const next = [...blocks];
                  next[i] = { type: "price", amount: block.amount, period };
                  onChange(next);
                }}
              />
            </>
          )}
          {block.type === "note" && (
            <Field
              label="Note"
              value={block.text}
              onChange={(text) => {
                const next = [...blocks];
                next[i] = { type: "note", text };
                onChange(next);
              }}
              multiline
              rows={4}
            />
          )}
          {block.type === "table" && (
            <Field
              label="Table rows (one per line, columns separated by |)"
              value={block.rows.map((r) => r.join(" | ")).join("\n")}
              onChange={(text) => {
                const rows = text
                  .split("\n")
                  .map((line) => line.split("|").map((c) => c.trim()))
                  .filter((r) => r.some(Boolean));
                const next = [...blocks];
                next[i] = { ...block, rows };
                onChange(next);
              }}
              multiline
              rows={6}
              hint={`Headers: ${block.headers.join(" | ")}`}
            />
          )}
          {block.type === "subsection" && (
            <>
              <Field
                label="Subsection title"
                value={block.title}
                onChange={(title) => {
                  const next = [...blocks];
                  next[i] = { ...block, title };
                  onChange(next);
                }}
              />
              <Field
                label="Paragraphs"
                value={(block.paragraphs ?? []).join("\n\n")}
                onChange={(text) => {
                  const next = [...blocks];
                  next[i] = {
                    ...block,
                    paragraphs: text.split(/\n\n+/).map((s) => s.trim()).filter(Boolean),
                  };
                  onChange(next);
                }}
                multiline
                rows={4}
              />
              {block.list && (
                <ListField
                  label="List items"
                  value={block.list}
                  onChange={(list) => {
                    const next = [...blocks];
                    next[i] = { ...block, list };
                    onChange(next);
                  }}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function updateAgreementSection(
  doc: DesignServicesAgreement,
  sectionIndex: string,
  patch: Partial<AgreementSection>,
): DesignServicesAgreement {
  return {
    ...doc,
    sections: doc.sections.map((s) =>
      s.index === sectionIndex ? { ...s, ...patch } : s,
    ),
  };
}

export function SectionEditPanel() {
  const {
    editMode,
    selectedId,
    selectedLabel,
    data,
    setData,
    setDirty,
    clearSelection,
  } = useProposalEdit();

  if (!editMode || !selectedId) {
    return (
      <aside className="editor-panel editor-panel--empty">
        <p className="editor-panel-placeholder">
          Select a section on the page to edit its content.
        </p>
      </aside>
    );
  }

  const markDirty = () => setDirty(true);

  const panel = (
    <aside className="editor-panel">
      <div className="editor-panel-header">
        <div>
          <div className="editor-panel-kicker">Editing</div>
          <h2 className="editor-panel-title">{selectedLabel}</h2>
        </div>
        <button type="button" className="editor-panel-close" onClick={clearSelection}>
          ×
        </button>
      </div>
      <div className="editor-panel-body">
        {renderFields()}
      </div>
    </aside>
  );

  function renderFields() {
    const id = selectedId!;

    if (id === "cover") {
      return (
        <CoverFields
          cover={data.cover}
          clientName={data.clientName}
          year={data.year}
          onCover={(cover) => {
            markDirty();
            setData({ ...data, cover });
          }}
          onClient={(clientName) => {
            markDirty();
            setData({ ...data, clientName });
          }}
          onYear={(year) => {
            markDirty();
            setData({ ...data, year });
          }}
        />
      );
    }

    if (isDesignServicesAgreement(data)) {
      if (id === "preamble") {
        return (
          <Field
            label="Agreement preamble"
            value={data.preamble}
            onChange={(preamble) => {
              markDirty();
              setData({ ...data, preamble });
            }}
            multiline
            rows={8}
          />
        );
      }

      if (id === "signatures") {
        return (
          <>
            <p className="editor-section-heading">Studio</p>
            <Field
              label="Party"
              value={data.signatures.studio.party}
              onChange={(party) => {
                markDirty();
                setData({
                  ...data,
                  signatures: {
                    ...data.signatures,
                    studio: { ...data.signatures.studio, party },
                  },
                });
              }}
            />
            <Field
              label="Name"
              value={data.signatures.studio.name}
              onChange={(name) => {
                markDirty();
                setData({
                  ...data,
                  signatures: {
                    ...data.signatures,
                    studio: { ...data.signatures.studio, name },
                  },
                });
              }}
            />
            <Field
              label="Title"
              value={data.signatures.studio.title}
              onChange={(title) => {
                markDirty();
                setData({
                  ...data,
                  signatures: {
                    ...data.signatures,
                    studio: { ...data.signatures.studio, title },
                  },
                });
              }}
            />
            <p className="editor-section-heading">Client</p>
            <Field
              label="Party"
              value={data.signatures.client.party}
              onChange={(party) => {
                markDirty();
                setData({
                  ...data,
                  signatures: {
                    ...data.signatures,
                    client: { ...data.signatures.client, party },
                  },
                });
              }}
            />
            <Field
              label="Name"
              value={data.signatures.client.name}
              onChange={(name) => {
                markDirty();
                setData({
                  ...data,
                  signatures: {
                    ...data.signatures,
                    client: { ...data.signatures.client, name },
                  },
                });
              }}
            />
            <Field
              label="Title"
              value={data.signatures.client.title}
              onChange={(title) => {
                markDirty();
                setData({
                  ...data,
                  signatures: {
                    ...data.signatures,
                    client: { ...data.signatures.client, title },
                  },
                });
              }}
            />
          </>
        );
      }

      if (id.startsWith("section-")) {
        const index = id.replace("section-", "");
        const section = data.sections.find((s) => s.index === index);
        if (!section) return <p>Section not found.</p>;

        return (
          <>
            <Field
              label="Section index"
              value={section.index}
              onChange={(v) => {
                markDirty();
                setData(updateAgreementSection(data, index, { index: v }));
              }}
            />
            <Field
              label="Section label"
              value={section.label}
              onChange={(label) => {
                markDirty();
                setData(updateAgreementSection(data, index, { label }));
              }}
            />
            <Field
              label="Title"
              value={section.title}
              onChange={(title) => {
                markDirty();
                setData(updateAgreementSection(data, index, { title }));
              }}
            />
            <Field
              label="Intro"
              value={section.intro ?? ""}
              onChange={(intro) => {
                markDirty();
                setData(updateAgreementSection(data, index, { intro: intro || undefined }));
              }}
              multiline
              rows={4}
            />
            <p className="editor-section-heading">Content blocks</p>
            <AgreementBlocksEditor
              blocks={section.blocks}
              onChange={(blocks) => {
                markDirty();
                setData(updateAgreementSection(data, index, { blocks }));
              }}
            />
          </>
        );
      }
    }

    if (isModularRetainer(data)) {
      if (id === "overview") {
        return (
          <>
            <Field
              label="Title"
              value={data.overview.title}
              onChange={(title) => {
                markDirty();
                setData({ ...data, overview: { ...data.overview, title } });
              }}
            />
            <Field
              label="Intro"
              value={data.overview.intro}
              onChange={(intro) => {
                markDirty();
                setData({ ...data, overview: { ...data.overview, intro } });
              }}
              multiline
              rows={4}
            />
            <p className="editor-section-heading">Overview rows</p>
            {data.overview.rows.map((row, i) => (
              <div key={i} className="editor-block-card">
                <Field
                  label="Service"
                  value={row.service}
                  onChange={(service) => {
                    const rows = [...data.overview.rows];
                    rows[i] = { ...row, service };
                    markDirty();
                    setData({ ...data, overview: { ...data.overview, rows } });
                  }}
                />
                <Field
                  label="What it covers"
                  value={row.covers}
                  onChange={(covers) => {
                    const rows = [...data.overview.rows];
                    rows[i] = { ...row, covers };
                    markDirty();
                    setData({ ...data, overview: { ...data.overview, rows } });
                  }}
                />
                <Field
                  label="Monthly"
                  value={row.monthly}
                  onChange={(monthly) => {
                    const rows = [...data.overview.rows];
                    rows[i] = { ...row, monthly };
                    markDirty();
                    setData({ ...data, overview: { ...data.overview, rows } });
                  }}
                />
              </div>
            ))}
          </>
        );
      }

      if (id.startsWith("lane-")) {
        const index = id.replace("lane-", "");
        const lane = data.lanes.find((l) => l.index === index);
        if (!lane) return <p>Lane not found.</p>;

        return (
          <>
            <Field
              label="Index"
              value={lane.index}
              onChange={(v) => {
                const lanes = data.lanes.map((l) =>
                  l.index === index ? { ...l, index: v } : l,
                );
                markDirty();
                setData({ ...data, lanes });
              }}
            />
            <Field
              label="Label"
              value={lane.label}
              onChange={(label) => {
                const lanes = data.lanes.map((l) =>
                  l.index === index ? { ...l, label } : l,
                );
                markDirty();
                setData({ ...data, lanes });
              }}
            />
            <Field
              label="Title"
              value={lane.title}
              onChange={(title) => {
                const lanes = data.lanes.map((l) =>
                  l.index === index ? { ...l, title } : l,
                );
                markDirty();
                setData({ ...data, lanes });
              }}
            />
            <Field
              label="Intro"
              value={lane.intro}
              onChange={(intro) => {
                const lanes = data.lanes.map((l) =>
                  l.index === index ? { ...l, intro } : l,
                );
                markDirty();
                setData({ ...data, lanes });
              }}
              multiline
              rows={4}
            />
            {lane.price && (
              <>
                <Field
                  label="Price amount"
                  value={lane.price.amount}
                  onChange={(amount) => {
                    const lanes = data.lanes.map((l) =>
                      l.index === index
                        ? { ...l, price: { ...l.price!, amount } }
                        : l,
                    );
                    markDirty();
                    setData({ ...data, lanes });
                  }}
                />
                <Field
                  label="Price period"
                  value={lane.price.period}
                  onChange={(period) => {
                    const lanes = data.lanes.map((l) =>
                      l.index === index
                        ? { ...l, price: { ...l.price!, period } }
                        : l,
                    );
                    markDirty();
                    setData({ ...data, lanes });
                  }}
                />
              </>
            )}
            <ListField
              label="What's included"
              value={lane.includes}
              onChange={(includes) => {
                const lanes = data.lanes.map((l) =>
                  l.index === index ? { ...l, includes } : l,
                );
                markDirty();
                setData({ ...data, lanes });
              }}
            />
            <Field
              label="Note"
              value={lane.note ?? ""}
              onChange={(note) => {
                const lanes = data.lanes.map((l) =>
                  l.index === index ? { ...l, note: note || undefined } : l,
                );
                markDirty();
                setData({ ...data, lanes });
              }}
              multiline
              rows={4}
            />
          </>
        );
      }

      if (id === "recommended") {
        return (
          <>
            <Field
              label="Title"
              value={data.recommended.title}
              onChange={(title) => {
                markDirty();
                setData({ ...data, recommended: { ...data.recommended, title } });
              }}
            />
            <Field
              label="Intro"
              value={data.recommended.intro}
              onChange={(intro) => {
                markDirty();
                setData({ ...data, recommended: { ...data.recommended, intro } });
              }}
              multiline
              rows={3}
            />
            {data.recommended.rows.map((row, i) => (
              <div key={i} className="editor-block-card">
                <Field
                  label="Label"
                  value={row.label}
                  onChange={(label) => {
                    const rows = [...data.recommended.rows];
                    rows[i] = { ...row, label };
                    markDirty();
                    setData({ ...data, recommended: { ...data.recommended, rows } });
                  }}
                />
                <Field
                  label="Value"
                  value={row.value}
                  onChange={(value) => {
                    const rows = [...data.recommended.rows];
                    rows[i] = { ...row, value };
                    markDirty();
                    setData({ ...data, recommended: { ...data.recommended, rows } });
                  }}
                />
              </div>
            ))}
          </>
        );
      }

      if (id === "workflow") {
        return (
          <>
            <Field
              label="Title"
              value={data.workflow.title}
              onChange={(title) => {
                markDirty();
                setData({ ...data, workflow: { ...data.workflow, title } });
              }}
            />
            <Field
              label="Intro"
              value={data.workflow.intro}
              onChange={(intro) => {
                markDirty();
                setData({ ...data, workflow: { ...data.workflow, intro } });
              }}
              multiline
              rows={3}
            />
            {data.workflow.steps.map((step, i) => (
              <div key={i} className="editor-block-card">
                <Field
                  label={`Step ${i + 1} — number`}
                  value={step.num}
                  onChange={(num) => {
                    const steps = [...data.workflow.steps];
                    steps[i] = { ...step, num };
                    markDirty();
                    setData({ ...data, workflow: { ...data.workflow, steps } });
                  }}
                />
                <Field
                  label="Title"
                  value={step.title}
                  onChange={(title) => {
                    const steps = [...data.workflow.steps];
                    steps[i] = { ...step, title };
                    markDirty();
                    setData({ ...data, workflow: { ...data.workflow, steps } });
                  }}
                />
                <Field
                  label="Body"
                  value={step.body}
                  onChange={(body) => {
                    const steps = [...data.workflow.steps];
                    steps[i] = { ...step, body };
                    markDirty();
                    setData({ ...data, workflow: { ...data.workflow, steps } });
                  }}
                  multiline
                  rows={3}
                />
              </div>
            ))}
          </>
        );
      }

      if (id === "responsibilities") {
        return (
          <>
            <Field
              label="Title"
              value={data.responsibilities.title}
              onChange={(title) => {
                markDirty();
                setData({
                  ...data,
                  responsibilities: { ...data.responsibilities, title },
                });
              }}
            />
            <Field
              label="Intro"
              value={data.responsibilities.intro}
              onChange={(intro) => {
                markDirty();
                setData({
                  ...data,
                  responsibilities: { ...data.responsibilities, intro },
                });
              }}
              multiline
              rows={3}
            />
            <ListField
              label="Items"
              value={data.responsibilities.items}
              onChange={(items) => {
                markDirty();
                setData({
                  ...data,
                  responsibilities: { ...data.responsibilities, items },
                });
              }}
            />
          </>
        );
      }

      if (id === "terms") {
        return (
          <>
            <Field
              label="Title"
              value={data.terms.title}
              onChange={(title) => {
                markDirty();
                setData({ ...data, terms: { ...data.terms, title } });
              }}
            />
            {data.terms.rows.map((row, i) => (
              <div key={i} className="editor-block-card">
                <Field
                  label="Label"
                  value={row.label}
                  onChange={(label) => {
                    const rows = [...data.terms.rows];
                    rows[i] = { ...row, label };
                    markDirty();
                    setData({ ...data, terms: { ...data.terms, rows } });
                  }}
                />
                <Field
                  label="Value"
                  value={row.value}
                  onChange={(value) => {
                    const rows = [...data.terms.rows];
                    rows[i] = { ...row, value };
                    markDirty();
                    setData({ ...data, terms: { ...data.terms, rows } });
                  }}
                  multiline
                  rows={2}
                />
              </div>
            ))}
          </>
        );
      }
    }

    return <p>No editor for this section yet.</p>;
  }

  return panel;
}
