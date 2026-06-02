# theblanck proposals (Next.js)

Live, shareable client proposals. Same layout as the static HTML library.

## URLs

| Route | Purpose |
|-------|---------|
| `/` | Internal index — lists all proposals |
| `/p/travelnest` | Client-facing TravelNest proposal |

Share with clients: `https://your-domain.com/p/travelnest`

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Live editor (before deploy)

Edit proposals in the browser — no code changes required for drafts.

| URL | Mode |
|-----|------|
| `/p/gale` | View (uses saved draft if one exists) |
| `/p/gale?edit=1` | Edit — click a section, change content in the side panel |

**Toolbar actions**

- **Save draft** — stores in this browser’s localStorage
- **Export JSON** — download file to sync into `src/content/clients/` later
- **Reset** — discard draft and reload from codebase
- **Preview** — save draft and open client view

## Customize PDF layout

Edit **`src/lib/pdf-config.ts`**:

| Setting | What it controls |
|---------|------------------|
| `pageMarginMm` | Margins on content pages (default 14mm) |
| `cover.paddingMm` | Inner padding on the full-page cover |
| `cover.fullPage` | Cover fills entire first page (edge to edge) |
| `content.maxWidthMm` | Max width of document body |
| `close.paddingMm` | Close section padding |
| `format` | `A4` or `Letter` |

Styles: `src/styles/pdf-layout.css`

Preview the PDF layout in browser at `/p/gale/pdf` before downloading.

## Download PDF (recommended)

Click **Download PDF** — the server renders the proposal with headless Chrome and returns a real PDF file:

- Selectable text, proper fonts, dark backgrounds preserved
- Smart page breaks (cover on page 1, close on its own page, tables/blocks stay intact)
- No print dialog needed

Requires Google Chrome installed locally. On deploy, set `NEXT_PUBLIC_SITE_URL` to your live domain (e.g. `https://proposals.theblanck.co`).

API: `GET /api/pdf/gale` · Print view: `/p/gale/pdf`

## Print (Ctrl+P)

Use **Ctrl+P** / **Print / PDF** for a quick print preview. Enable **Background graphics** in the dialog.

The editor is on automatically in development. For production, set `NEXT_PUBLIC_ENABLE_PROPOSAL_EDITOR=true` in `.env.local` (hide the edit UI from clients when you’re done).

**Note:** Drafts are per-browser, not synced to the server. Before deploy, export JSON or paste changes back into the client `.ts` file so Vercel serves the updated content.

## Add a new client

1. Copy `src/content/clients/travelnest.ts` → `src/content/clients/{slug}.ts`
2. Update all copy, pricing, and `clientName`
3. Register in `src/content/registry.ts`:

```ts
import acme from "@/content/clients/acme";

export const proposals = {
  [travelnest.slug]: travelnest,
  [acme.slug]: acme,
};
```

4. Deploy — the new page is available at `/p/{slug}`

## Deploy (Vercel)

1. Import the repo (or connect `web/` as root directory)
2. Framework: Next.js
3. Deploy

Set **Root Directory** to `web` if the repo root is the parent folder.

## Project structure

```
src/
  app/
    page.tsx              # library index
    p/[slug]/page.tsx     # client proposals
  components/proposal/    # shared UI
  content/clients/        # per-client data
  styles/proposal.css     # exact proposal styles
```
