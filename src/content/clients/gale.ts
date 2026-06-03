import type { DesignServicesAgreement } from "@/types/proposal";

const gale: DesignServicesAgreement = {
  slug: "gale",
  template: "design-services-agreement",
  clientName: "Gale",
  year: "2026",
  listMeta: {
    title: "Gale",
    description: "Design services agreement · $6,500/mo retainer · 2026",
  },
  cover: {
    eyebrow: "Design Services Agreement",
    titleLine1: "Creative partnership",
    titleLine2: "built for",
    titleEmphasis: "Gale.",
    subtitle:
      "A month-to-month design retainer covering brand, web, product, and marketing — with structured terms for funding accommodation and Framer implementation within scope.",
  },
  preamble:
    'This Design Services Agreement ("Agreement") is entered into as of 4 June 2026 by and between theblanck, with its principal place of business at Al Raha, Abu Dhabi ("Studio"), and Gale, with its principal place of business in the USA ("Client"). The Studio and the Client may be referred to individually as a "Party" and collectively as the "Parties."',
  sections: [
    {
      index: "01",
      label: "Scope of Services",
      title: "What the Studio provides",
      intro:
        "The Studio shall provide design and creative services to the Client, including but not limited to the following. Specific deliverables, timelines, and priorities shall be determined collaboratively throughout the engagement.",
      blocks: [
        {
          type: "list",
          items: [
            "Brand identity design",
            "Website design",
            "UI/UX design",
            "Product design",
            "Marketing and social media design",
            "Design strategy and consulting",
            "Other creative services as mutually agreed upon",
          ],
        },
      ],
    },
    {
      index: "02",
      label: "Term",
      title: "Engagement duration",
      blocks: [
        {
          type: "paragraphs",
          items: [
            "This Agreement shall commence on 4 June 2026 and continue on a month-to-month basis until terminated in accordance with Section 10.",
          ],
        },
      ],
    },
    {
      index: "03",
      label: "Monthly Retainer",
      title: "Retainer and funding accommodation",
      intro:
        "The Client agrees to engage the Studio on a monthly retainer basis. The Parties acknowledge that the Client is currently pre-funding and requires a temporary adjustment to Monthly Retainer payments.",
      blocks: [
        {
          type: "price",
          amount: "$6,500",
          period: "standard monthly retainer (USD)",
        },
        {
          type: "subsection",
          title: "Funding accommodation",
          paragraphs: [
            "Until a Qualified Financing Event occurs, the Client shall pay USD $4,000 per month. The unpaid portion of USD $2,500 per month shall accrue as a deferred payment obligation owed to the Studio. Deferred amounts shall be tracked monthly and remain payable under this Agreement.",
          ],
        },
        {
          type: "subsection",
          title: "Qualified Financing Event",
          paragraphs: [
            'A "Qualified Financing Event" means the closing of one or more equity financing transactions resulting in aggregate gross proceeds to the Client of at least USD $750,000, including but not limited to seed rounds, pre-seed rounds, venture capital financings, SAFEs, convertible notes, or similar investment transactions.',
          ],
        },
        {
          type: "subsection",
          title: "Payment upon funding",
          list: [
            "The Client shall immediately begin paying the full Monthly Retainer of USD $6,500 per month going forward.",
            "The Client shall notify the Studio in writing within five (5) business days of the Qualified Financing Event.",
            "All accrued deferred balances shall become immediately due and payable.",
            "The Client shall pay all outstanding deferred balances within thirty (30) days of the Qualified Financing Event.",
          ],
        },
        {
          type: "subsection",
          title: "Example",
          paragraphs: [
            "If the Client receives funding after four (4) months, the deferred balance and payment structure is as follows:",
          ],
        },
        {
          type: "table",
          headers: ["Description", "Amount"],
          rows: [
            ["Monthly Retainer", "$6,500"],
            ["Monthly payment during funding accommodation", "$4,000"],
            ["Monthly deferred balance", "$2,500"],
            ["Deferred balance after 4 months", "$10,000"],
          ],
        },
        {
          type: "note",
          text: "Upon funding, the Client shall pay the accrued deferred balance of $10,000 within thirty (30) days and continue paying the full Monthly Retainer of $6,500 per month thereafter.",
        },
      ],
    },
    {
      index: "04",
      label: "Invoicing & Payment",
      title: "Billing terms",
      blocks: [
        {
          type: "list",
          items: [
            "The Studio shall issue invoices on a monthly basis.",
            "Payment is due within fifteen (15) days of the invoice date.",
            "All fees are denominated in U.S. Dollars unless otherwise agreed in writing.",
            "The Client shall be responsible for any applicable taxes, duties, or governmental charges associated with the services, excluding taxes based on the Studio's income.",
          ],
        },
      ],
    },
    {
      index: "05",
      label: "Framer Development",
      title: "Implementation within the retainer",
      blocks: [
        {
          type: "paragraphs",
          items: [
            "No separate fees shall be charged for Framer implementation performed as part of the ongoing engagement unless the Parties mutually agree in writing to a scope materially exceeding the normal retainer engagement.",
          ],
        },
      ],
    },
    {
      index: "06",
      label: "Client Responsibilities",
      title: "What we need from Gale",
      blocks: [
        {
          type: "list",
          items: [
            "Provide timely feedback and approvals.",
            "Supply all necessary content, materials, and information required for the Studio to perform the services.",
            "Designate a primary point of contact authorised to make decisions on behalf of the Client.",
            "Cooperate reasonably with the Studio to facilitate efficient project execution.",
          ],
        },
        {
          type: "note",
          text: "Delays caused by the Client may affect project timelines and deliverable schedules.",
        },
      ],
    },
    {
      index: "07",
      label: "Intellectual Property",
      title: "Ownership of work",
      blocks: [
        {
          type: "paragraphs",
          items: [
            "Upon full payment of all fees due under this Agreement, including any deferred balances and approved additional services, the Studio assigns to the Client all rights, title, and interest in the final approved deliverables created specifically for the Client.",
          ],
        },
        {
          type: "list",
          label: "The Studio retains ownership of",
          items: [
            "Pre-existing intellectual property",
            "Proprietary processes and methodologies",
            "Internal frameworks and systems",
            "Drafts, concepts, and unused design explorations",
            "General know-how, skills, and techniques developed independently of the Client's work",
          ],
        },
        {
          type: "paragraphs",
          items: [
            "The Studio reserves the right to display completed work in portfolios, case studies, marketing materials, and award submissions unless otherwise agreed in writing.",
          ],
        },
      ],
    },
    {
      index: "08",
      label: "Confidentiality",
      title: "Non-disclosure",
      blocks: [
        {
          type: "paragraphs",
          items: [
            "Each Party agrees to keep confidential all non-public information disclosed by the other Party and to use such information solely for purposes related to this Agreement.",
            "Neither Party shall disclose confidential information to any third party except as required by law or with the prior written consent of the disclosing Party.",
            "The obligations under this section shall survive termination of this Agreement.",
          ],
        },
      ],
    },
    {
      index: "09",
      label: "Independent Contractor",
      title: "Relationship of the Parties",
      blocks: [
        {
          type: "paragraphs",
          items: [
            "The Studio is an independent contractor and not an employee, partner, joint venturer, or agent of the Client.",
            "Nothing contained in this Agreement shall be construed to create an employment relationship between the Parties.",
          ],
        },
      ],
    },
    {
      index: "10",
      label: "Termination",
      title: "Ending the engagement",
      blocks: [
        {
          type: "paragraphs",
          items: [
            "Either Party may terminate this Agreement by providing thirty (30) days' written notice to the other Party.",
          ],
        },
        {
          type: "list",
          label: "Upon termination",
          items: [
            "The Client shall pay for all services rendered through the effective termination date.",
            "Any accrued deferred balances under Section 3 shall survive termination.",
            "If a Qualified Financing Event occurs after termination, all accrued deferred balances shall remain immediately payable in accordance with this Agreement.",
          ],
        },
      ],
    },
    {
      index: "11",
      label: "Limitation of Liability",
      title: "Liability cap",
      blocks: [
        {
          type: "paragraphs",
          items: [
            "To the maximum extent permitted by law, the Studio's total liability arising out of or relating to this Agreement shall not exceed the total amount paid by the Client to the Studio during the six (6) months preceding the claim.",
            "In no event shall either Party be liable for indirect, incidental, consequential, special, or punitive damages.",
          ],
        },
      ],
    },
    {
      index: "12",
      label: "Governing Law",
      title: "Governing Law",
      blocks: [
        {
          type: "paragraphs",
          items: [
            "This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles.",
          ],
        },
      ],
    },
    {
      index: "13",
      label: "Entire Agreement",
      title: "Complete understanding",
      blocks: [
        {
          type: "paragraphs",
          items: [
            "This Agreement constitutes the entire agreement between the Parties and supersedes all prior discussions, negotiations, proposals, and understandings relating to its subject matter.",
            "Any amendment or modification to this Agreement must be in writing and signed by both Parties.",
          ],
        },
      ],
    },
  ],
  signatures: {
    studio: {
      party: "theblanck",
      name: "Taimoor Nasir",
      title: "Co-founder",
    },
    client: {
      party: "Gale",
      name: "Tom Griffith",
      title: "Co-Founder",
    },
  },
};

export default gale;
