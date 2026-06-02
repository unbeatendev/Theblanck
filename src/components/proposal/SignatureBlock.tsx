import type { SignatureParty } from "@/types/proposal";

type Props = {
  roleLabel: string;
  party: SignatureParty;
};

export function SignatureBlock({ roleLabel, party }: Props) {
  return (
    <div className="signature-card">
      <div className="signature-party-label">{roleLabel}</div>
      <div className="signature-party-name">{party.party}</div>

      <div className="signature-fields">
        <div className="signature-field">
          <span className="signature-field-label">By</span>
          <span className="signature-field-line" aria-hidden="true" />
        </div>

        <div className="signature-field signature-field-filled">
          <span className="signature-field-label">Name</span>
          <span className="signature-field-value">{party.name}</span>
        </div>

        <div className="signature-field signature-field-filled">
          <span className="signature-field-label">Title</span>
          <span className="signature-field-value">{party.title}</span>
        </div>

        <div className="signature-field">
          <span className="signature-field-label">Date</span>
          <span className="signature-field-line" aria-hidden="true" />
        </div>
      </div>

      <div className="signature-pad-wrap">
        <span className="signature-pad-label">Signature</span>
        <div className="signature-pad" aria-label={`Signature space for ${party.name}`} />
      </div>
    </div>
  );
}
