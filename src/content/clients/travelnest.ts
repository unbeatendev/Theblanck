import type { ModularRetainerProposal } from "@/types/proposal";

const travelnest: ModularRetainerProposal = {
  slug: "travelnest",
  template: "modular-retainer",
  clientName: "TravelNest",
  year: "2025",
  listMeta: {
    title: "TravelNest",
    description: "Design, marketing & growth partnership · 2025",
  },
  cover: {
    eyebrow: "Design, Marketing & Growth Partnership",
    titleLine1: "A partnership",
    titleLine2: "built around",
    titleEmphasis: "your growth.",
    subtitle:
      "A modular monthly engagement across product design, brand, marketing production, and development — structured to scale with you.",
  },
  overview: {
    title: "How this engagement is structured",
    intro:
      "Rather than forcing everything into one flat package, this proposal separates design, marketing production, and implementation into distinct lanes. Each has its own scope, capacity, and pricing — so you only activate what you need, when you need it.",
    rows: [
      {
        service: "Base Retainer",
        covers: "Product, brand & strategic design",
        monthly: "$5,420",
      },
      {
        service: "Marketing Creative Retainer",
        covers: "Recurring content production",
        monthly: "$3,000",
      },
      {
        service: "Framer / Webflow Add-On",
        covers: "Build support — activated as needed",
        monthly: "$1,500",
      },
      {
        service: "Motion Design",
        covers: "Reels, animation & motion creatives",
        monthly: "Custom quote",
      },
    ],
  },
  lanes: [
    {
      index: "02",
      label: "Base Retainer",
      title: "The core design partnership",
      intro:
        "The foundation of the engagement. This covers all high-value design work across product, brand, and key marketing surfaces — sequenced through a shared priority queue.",
      price: { amount: "$5,420", period: "per month" },
      includesLabel: "What's included",
      includes: [
        "Product design — UX/UI, user flows, wireframes, feature design, and prototypes",
        "Design system refinement and extension",
        "Marketing landing page design",
        "Full rebranding or brand refresh initiatives",
        "Visual identity development and rollout assets",
        "Email design and email template design",
        "Banners, key visuals, and core campaign design surfaces",
        "Design QA and developer handoff support",
      ],
      note: "Larger workstreams — such as a full rebrand or new design system — are handled in phases within the retainer rather than run as parallel unlimited tracks. Landing page design is included; Framer or Webflow implementation is not — that's handled through the add-on.",
    },
    {
      index: "03",
      label: "Marketing Creative Retainer",
      title: "Recurring content, every month",
      intro:
        "A dedicated production lane for regular campaign content and social output. Best used once visual direction is established and a consistent monthly flow of assets is needed.",
      price: { amount: "$3,000", period: "per month" },
      includesLabel: "What's included",
      includes: [
        "Social media post design",
        "Carousel post design",
        "Static paid ad creatives",
        "Story assets",
        "Promotional graphics",
        "Campaign adaptations and design variations",
        "Launch content and recurring marketing production",
      ],
      capacity: {
        label: "Monthly capacity — up to 50 credits",
        rows: [
          { asset: "1 static post, ad, or story", credits: "1 credit" },
          { asset: "1 carousel", credits: "2 credits" },
          { asset: "Bulk adaptations or resize sets", credits: "Counted by volume" },
        ],
      },
      note: "This retainer is for recurring production only. Landing pages, email templates, rebranding, and major visual identity work sit in the Base Retainer.",
    },
    {
      index: "04",
      label: "Framer / Webflow Add-On",
      title: "Activated when you need to build",
      intro:
        "When approved designs need to move into a live environment, this add-on covers the implementation. It's only billed in months where build support is active.",
      price: { amount: "$1,500", period: "per month — as needed" },
      includesLabel: "What's included",
      includes: [
        "Framer or Webflow implementation of approved landing page designs",
        "Responsive setup and basic CMS configuration",
        "Simple interactions and animations",
        "Content population and launch support",
        "Minor updates, fixes and QA",
      ],
      note: "Capped at 15 development hours per month — equivalent to approximately one standard landing page. Work beyond this capacity is scoped separately. This add-on does not cover full website rebuilds, complex integrations, or product frontend engineering.",
    },
    {
      index: "05",
      label: "Motion Design",
      title: "Quoted per brief",
      intro:
        "Motion is not included as a flat monthly retainer. Each project is quoted based on the actual brief, production requirements, and number of deliverables.",
      includesLabel: "Motion support may include",
      includes: [
        "Reels and short-form video content",
        "Animated paid ad creatives",
        "Product teaser videos",
        "UI motion and micro-interactions",
        "Launch or campaign animation",
      ],
      note: "Each motion request is quoted based on: number of assets, length, animation complexity, turnaround time, number of versions or cutdowns, and whether source footage is provided by TravelNest.",
    },
  ],
  recommended: {
    title: "What we recommend for TravelNest",
    intro:
      "Based on current requirements across product, brand, marketing, and launch support, the recommended commercial structure is as follows.",
    rows: [
      { label: "Base Retainer", value: "$5,420 / mo" },
      { label: "Marketing Creative Retainer", value: "$3,000 / mo" },
      { label: "Core monthly total", value: "$8,420 / mo", variant: "subtotal" },
      {
        label: "+ Framer / Webflow Add-On (when active)",
        value: "+ $1,500 / mo",
      },
      {
        label: "Total with implementation",
        value: "$9,920 / mo",
        variant: "total",
      },
      { label: "Motion Design", value: "Quoted separately", variant: "muted" },
    ],
  },
  workflow: {
    title: "A structured monthly workflow",
    intro:
      "The engagement runs on a predictable rhythm so priorities stay clear and nothing falls through the gaps.",
    steps: [
      {
        num: "01",
        title: "Planning & prioritisation",
        body: "At the start of each month, we align on priorities across product design, brand work, marketing, launches, and implementation.",
      },
      {
        num: "02",
        title: "Request submission",
        body: "Requests are submitted through Slack or a shared task board with the required context, copy, assets, and references.",
      },
      {
        num: "03",
        title: "Design & production",
        body: "Each request is handled inside the correct lane — Base Retainer, Marketing Creative, Framer/Webflow Add-On, or a Motion quote.",
      },
      {
        num: "04",
        title: "Review & revisions",
        body: "Feedback is collected and revisions completed within the scope of the approved request. Consolidated feedback from one point of contact keeps delivery smooth.",
      },
      {
        num: "05",
        title: "Delivery & handoff",
        body: "Final files, design handoff packages, and implementation-ready assets are delivered in an organised, documented format.",
      },
      {
        num: "—",
        title: "Turnaround times",
        body: "Standard requests typically turn around within a few business days. Larger workstreams — rebrands, multi-asset campaigns — are planned across multiple stages.",
      },
    ],
  },
  responsibilities: {
    title: "What we need from TravelNest",
    intro:
      "To keep delivery efficient and on schedule, we ask TravelNest to provide the following.",
    items: [
      "One primary point of contact for approvals and consolidated feedback",
      "Final copy and messaging for campaigns, landing pages, emails, and ads",
      "Brand assets, references, and relevant guidelines",
      "Access credentials where needed",
      "Timely reviews and approvals to avoid delays in delivery",
      "Source content for motion requests where applicable",
    ],
  },
  terms: {
    title: "The commercial structure",
    rows: [
      { label: "Initial term", value: "3-month recommended commitment" },
      { label: "Billing", value: "Monthly in advance" },
      {
        label: "Rollover",
        value:
          "Unused monthly capacity does not roll over unless agreed separately in writing",
      },
      {
        label: "Add-On billing",
        value:
          "Framer / Webflow add-on is only billed in months where implementation support is active",
      },
      {
        label: "Motion design",
        value: "Quoted and approved separately before production begins",
      },
      {
        label: "Third-party costs",
        value:
          "Not included — stock assets, premium fonts, hosting, plugins, and paid media are billed separately",
      },
      {
        label: "Cancellation",
        value: "30 days' written notice after the initial term",
      },
    ],
  },
};

export default travelnest;
