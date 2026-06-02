import Link from "next/link";
import { proposalList } from "@/lib/proposals";
import { isEditorEnabled } from "@/lib/proposal-draft";

export default function HomePage() {
  const editorOn = isEditorEnabled();

  return (
    <div className="library-page">
      <h1>Proposals &amp; pitch library</h1>
      <p className="library-intro">
        Share live links with clients. Each proposal has its own URL under{" "}
        <code>/p/[client]</code>.
        {editorOn && (
          <>
            {" "}
            Add <code>?edit=1</code> to any proposal URL to edit sections live
            before you deploy.
          </>
        )}
      </p>

      <div className="library-group-label">Live proposals</div>
      <div className="library-list">
        {proposalList.map((proposal) => (
          <div key={proposal.slug} className="library-item-row">
            <Link href={`/p/${proposal.slug}`} className="library-item-link">
              <div>
                <div className="library-item-title">{proposal.listMeta.title}</div>
                <div className="library-item-meta">{proposal.listMeta.description}</div>
                <div className="library-item-url">/p/{proposal.slug}</div>
              </div>
              <span className="library-item-type">Proposal</span>
            </Link>
            {editorOn && (
              <Link
                href={`/p/${proposal.slug}?edit=1`}
                className="library-item-edit"
              >
                Edit
              </Link>
            )}
          </div>
        ))}
      </div>

      <p className="library-footer">theblanck.co · internal</p>
    </div>
  );
}
