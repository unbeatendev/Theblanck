import type {
  DesignServicesAgreement as Agreement,
  SectionBlock,
} from "@/types/proposal";
import { EditableRegion } from "@/components/editor/EditableRegion";
import { IncludesList } from "./IncludesList";
import { Logo } from "./Logo";
import { SignatureBlock } from "./SignatureBlock";

function SectionBlocks({ blocks }: { blocks: SectionBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraphs":
            return (
              <div key={i} className="agreement-paragraphs pdf-keep-together">
                {block.items.map((p) => (
                  <p key={p} className="section-intro agreement-p">
                    {p}
                  </p>
                ))}
              </div>
            );
          case "list":
            return (
              <div key={i} className="pdf-keep-together">
                {block.label && (
                  <div className="includes-label">{block.label}</div>
                )}
                <IncludesList items={block.items} />
              </div>
            );
          case "price":
            return (
              <div key={i} className="price-block pdf-keep-together">
                <span className="price-amount">{block.amount}</span>
                <span className="price-period">{block.period}</span>
              </div>
            );
          case "note":
            return (
              <div key={i} className="note pdf-keep-together">
                {block.text}
              </div>
            );
          case "table":
            return (
              <table
                key={i}
                className={`pdf-keep-together ${
                  block.headers.length === 3
                    ? "overview-table"
                    : "capacity-table agreement-table"
                }`}
              >
                <thead>
                  <tr>
                    {block.headers.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row.join("-")}>
                      {row.map((cell) => (
                        <td key={cell}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          case "terms":
            return (
              <div key={i} className="terms-grid pdf-keep-together">
                {block.rows.map((term) => (
                  <div className="term-row" key={term.label}>
                    <span className="term-label">{term.label}</span>
                    <span className="term-value">{term.value}</span>
                  </div>
                ))}
              </div>
            );
          case "subsection":
            return (
              <div key={i} className="agreement-subsection pdf-keep-together">
                <h3 className="agreement-subsection-title">{block.title}</h3>
                {block.paragraphs?.map((p) => (
                  <p key={p} className="section-intro agreement-p">
                    {p}
                  </p>
                ))}
                {block.list && <IncludesList items={block.list} />}
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

type Props = { data: Agreement };

export function DesignServicesAgreementView({ data }: Props) {
  return (
    <>
      <EditableRegion id="cover" label="Cover" as="section" className="cover pdf-page-after">
        <div className="cover-top">
          <div className="logo-wrap">
            <Logo />
          </div>
          <div className="cover-meta">
            <div className="cover-meta-label">Prepared for</div>
            <div className="cover-meta-value">{data.clientName}</div>
          </div>
        </div>

        <div className="cover-body">
          <div className="cover-eyebrow">{data.cover.eyebrow}</div>
          <h1 className="cover-title">
            {data.cover.titleLine1}
            <br />
            {data.cover.titleLine2}{" "}
            <em>{data.cover.titleEmphasis}</em>
          </h1>
          <p className="cover-sub">{data.cover.subtitle}</p>
        </div>

        <div className="cover-bottom">
          <div className="cover-bottom-left">theblanck.co</div>
          <div className="cover-bottom-right">
            Confidential &nbsp;·&nbsp; {data.year}
          </div>
        </div>
      </EditableRegion>

      <main className="doc">
        <EditableRegion
          id="preamble"
          label="Preamble"
          className="section agreement-preamble-section"
        >
          <p className="section-intro agreement-preamble">{data.preamble}</p>
        </EditableRegion>

        {data.sections.map((section) => (
          <EditableRegion
            key={section.index}
            id={`section-${section.index}`}
            label={`${section.index} ${section.label}`}
            className="section"
          >
            <div className="section-index">
              {section.index} &nbsp;/&nbsp; {section.label}
            </div>
            <h2 className="section-title">{section.title}</h2>
            {section.intro && (
              <p className="section-intro">{section.intro}</p>
            )}
            <SectionBlocks blocks={section.blocks} />
          </EditableRegion>
        ))}

        <EditableRegion id="signatures" label="Signatures" className="section">
          <div className="section-index">— &nbsp;/&nbsp; Signatures</div>
          <h2 className="section-title">Agreement signatories</h2>
          <p className="section-intro">
            This Agreement is executed by the authorised representatives of each
            Party.
          </p>

          <div className="signatures-grid pdf-keep-together">
            <SignatureBlock roleLabel="Studio" party={data.signatures.studio} />
            <SignatureBlock roleLabel="Client" party={data.signatures.client} />
          </div>
        </EditableRegion>
      </main>

      <section className="close-section pdf-page-before">
        <div>
          <h2 className="close-heading">
            Ready to get
            <br />
            <em>started?</em>
          </h2>
          <p className="close-body">
            We&apos;d love to hear from you. Reach out to discuss next steps and we
            can agree on a start date that works for both teams.
          </p>
        </div>
        <div className="close-contact">
          <div className="close-contact-label">Get in touch</div>
          <a href="mailto:hello@theblanck.co">hello@theblanck.co</a>
          <a href="https://www.theblanck.co" target="_blank" rel="noopener noreferrer">
            theblanck.co
          </a>
        </div>
      </section>
    </>
  );
}
