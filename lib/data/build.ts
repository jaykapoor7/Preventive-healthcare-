export type RoadmapItem = {
  title: string;
  status: "shipped" | "building" | "exploring" | "idea";
  quarter: string;
  description: string;
};

export const roadmap: RoadmapItem[] = [
  {
    title: "Seven core literacy modules",
    status: "shipped",
    quarter: "2026 · Q2",
    description:
      "My Future Patient, Health Receipt, Prescription Translator, Care Compass, Literacy Checker, Preventive Timeline, and Preventability Map.",
  },
  {
    title: "Light and dark themes",
    status: "shipped",
    quarter: "2026 · Q2",
    description:
      "One set of colour and type tokens shared by every screen and chart.",
  },
  {
    title: "Multilingual plain-language layer",
    status: "building",
    quarter: "2026 · Q3",
    description:
      "Hindi-first translations of jargon and instructions, expanding to more Indian languages.",
  },
  {
    title: "Save & revisit your trajectory",
    status: "building",
    quarter: "2026 · Q3",
    description:
      "Optional Supabase-backed profiles so people can track how their habits and understanding evolve.",
  },
  {
    title: "Clinician-reviewed glossary",
    status: "exploring",
    quarter: "2026 · Q4",
    description:
      "Partner with public-health clinicians to review and expand the plain-language glossary.",
  },
  {
    title: "Community prevention stories",
    status: "exploring",
    quarter: "2026 · Q4",
    description:
      "A space for field observations and prevention narratives from across India.",
  },
  {
    title: "Offline-first literacy packs",
    status: "idea",
    quarter: "2027",
    description:
      "Lightweight, downloadable literacy content for low-connectivity regions.",
  },
  {
    title: "School & campus programmes",
    status: "idea",
    quarter: "2027",
    description:
      "Bring prevention literacy to students before they ever become patients.",
  },
];

export const experiments = [
  {
    title: "Receipt as a shareable card",
    note: "Testing whether a shareable monthly receipt encourages repeatable habits.",
  },
  {
    title: "Uncertainty-first navigation",
    note: "Showing emphasis bands instead of a single answer in Care Compass.",
  },
  {
    title: "Trajectory framing",
    note: "Comparing 'meet your future self' framing against plain score reporting.",
  },
];
