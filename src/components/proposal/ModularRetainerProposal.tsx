import type { ModularRetainerProposal as Proposal } from "@/types/proposal";
import { EditableRegion } from "@/components/editor/EditableRegion";
import { IncludesList } from "./IncludesList";
import { Logo } from "./Logo";

type Props = { data: Proposal };

export function ModularRetainerProposalView({ data }: Props) {
  return (
    <>
      <EditableRegion id="cover" label="Cover" as="section" className="cover">
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
            {data.cover.titleLine2}
            <br />
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
        <EditableRegion id="overview" label="01 Overview" className="section">
          <div className="section-index">01 &nbsp;/&nbsp; Overview</div>
          <h2 className="section-title">{data.overview.title}</h2>
          <p className="section-intro">{data.overview.intro}</p>

          <table className="overview-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>What it covers</th>
                <th>Monthly</th>
              </tr>
            </thead>
            <tbody>
              {data.overview.rows.map((row) => (
                <tr key={row.service}>
                  <td>{row.service}</td>
                  <td>{row.covers}</td>
                  <td>{row.monthly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </EditableRegion>

        {data.lanes.map((lane) => (
          <EditableRegion
            key={lane.index}
            id={`lane-${lane.index}`}
            label={`${lane.index} ${lane.label}`}
            className="section"
          >
            <div className="section-index">
              {lane.index} &nbsp;/&nbsp; {lane.label}
            </div>
            <h2 className="section-title">{lane.title}</h2>
            <p className="section-intro">{lane.intro}</p>

            {lane.price && (
              <div className="price-block">
                <span className="price-amount">{lane.price.amount}</span>
                <span className="price-period">{lane.price.period}</span>
              </div>
            )}

            {lane.includesLabel && (
              <div className="includes-label">{lane.includesLabel}</div>
            )}
            <IncludesList items={lane.includes} />

            {lane.capacity && (
              <div className="capacity-block">
                <div className="includes-label">{lane.capacity.label}</div>
                <table className="capacity-table">
                  <thead>
                    <tr>
                      <th>Asset type</th>
                      <th>Credits used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lane.capacity.rows.map((row) => (
                      <tr key={row.asset}>
                        <td>{row.asset}</td>
                        <td>{row.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {lane.note && <div className="note">{lane.note}</div>}
          </EditableRegion>
        ))}

        <EditableRegion id="recommended" label="06 Recommended" className="section">
          <div className="section-index">06 &nbsp;/&nbsp; Recommended Structure</div>
          <h2 className="section-title">{data.recommended.title}</h2>
          <p className="section-intro">{data.recommended.intro}</p>

          <div className="pricing-summary">
            {data.recommended.rows.map((row) => (
              <div
                key={row.label}
                className={[
                  "pricing-row",
                  row.variant === "subtotal" ? "subtotal" : "",
                  row.variant === "total" ? "total" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="pricing-label">{row.label}</span>
                <span
                  className={[
                    "pricing-value",
                    row.variant === "muted" ? "pricing-value-muted" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </EditableRegion>

        <EditableRegion id="workflow" label="07 How We Work" className="section">
          <div className="section-index">07 &nbsp;/&nbsp; How We Work</div>
          <h2 className="section-title">{data.workflow.title}</h2>
          <p className="section-intro">{data.workflow.intro}</p>

          <div className="workflow">
            {data.workflow.steps.map((step) => (
              <div className="workflow-step" key={step.title}>
                <div className="workflow-step-num">{step.num}</div>
                <div className="workflow-step-title">{step.title}</div>
                <div className="workflow-step-body">{step.body}</div>
              </div>
            ))}
          </div>
        </EditableRegion>

        <EditableRegion id="responsibilities" label="08 Client responsibilities" className="section">
          <div className="section-index">08 &nbsp;/&nbsp; Client Responsibilities</div>
          <h2 className="section-title">{data.responsibilities.title}</h2>
          <p className="section-intro">{data.responsibilities.intro}</p>
          <IncludesList items={data.responsibilities.items} />
        </EditableRegion>

        <EditableRegion id="terms" label="09 Commercial terms" className="section">
          <div className="section-index">09 &nbsp;/&nbsp; Commercial Terms</div>
          <h2 className="section-title">{data.terms.title}</h2>

          <div className="terms-grid">
            {data.terms.rows.map((term) => (
              <div className="term-row" key={term.label}>
                <span className="term-label">{term.label}</span>
                <span className="term-value">{term.value}</span>
              </div>
            ))}
          </div>
        </EditableRegion>
      </main>

      <section className="close-section">
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
