export const site = {
  name: "JUNO",
  tagline: "Healthcare shouldn’t start at the hospital.",
  description:
    "JUNO is a preventive healthcare and patient literacy platform built for India. Understand your health before you need treatment.",
  url: "https://juno-health.vercel.app",
  email: "hello@juno.health",
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Modules", href: "/modules", description: "Seven interactive tools" },
  { label: "Research", href: "/research", description: "Public-health notes" },
  { label: "About", href: "/about", description: "Why JUNO exists" },
  { label: "Build", href: "/build", description: "Public roadmap" },
];

export type ModuleMeta = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  accent: "juno" | "warm" | "sky" | "violet";
  icon: string;
};

export const modules: ModuleMeta[] = [
  {
    slug: "future-patient",
    number: "01",
    name: "My Future Patient",
    tagline: "Meet yourself in 10 years.",
    description:
      "Most people never meet the version of themselves preventive healthcare is trying to protect. Map a habit-driven health trajectory.",
    href: "/modules/future-patient",
    accent: "juno",
    icon: "user-future",
  },
  {
    slug: "health-receipt",
    number: "02",
    name: "Health Receipt",
    tagline: "Your habits, itemised.",
    description:
      "Translate a month of lifestyle into a visible, Apple-style receipt — wins, opportunities, and consistency.",
    href: "/modules/health-receipt",
    accent: "warm",
    icon: "receipt",
  },
  {
    slug: "prescription-translator",
    number: "03",
    name: "Prescription Translator",
    tagline: "Plain language, not prescriptions.",
    description:
      "Paste a prescription or discharge note and get a calm, plain-language reading plus questions to ask your clinician.",
    href: "/modules/prescription-translator",
    accent: "sky",
    icon: "translate",
  },
  {
    slug: "care-compass",
    number: "04",
    name: "Care Compass",
    tagline: "Where might care happen?",
    description:
      "Educational navigation across monitor, primary care, urgent care, and emergency — with the uncertainty made explicit.",
    href: "/modules/care-compass",
    accent: "violet",
    icon: "compass",
  },
  {
    slug: "literacy-checker",
    number: "05",
    name: "Health Literacy Checker",
    tagline: "Explain like I’m 15.",
    description:
      "Paste medical text to surface reading difficulty, jargon, and patient-friendliness — then read a simpler version.",
    href: "/modules/literacy-checker",
    accent: "juno",
    icon: "book",
  },
  {
    slug: "preventive-timeline",
    number: "06",
    name: "Preventive Timeline",
    tagline: "What prevention looks like by age.",
    description:
      "An interactive, educational timeline of preventive-health awareness moments across a lifetime.",
    href: "/modules/preventive-timeline",
    accent: "warm",
    icon: "timeline",
  },
  {
    slug: "preventability-map",
    number: "07",
    name: "Preventability Map",
    tagline: "India, in public-health colour.",
    description:
      "Explore healthcare literacy and preventive trends across Indian states through calm, story-led data.",
    href: "/modules/preventability-map",
    accent: "sky",
    icon: "map",
  },
];

export function getModule(slug: string) {
  return modules.find((m) => m.slug === slug);
}

export const disclaimer =
  "JUNO is an educational tool for patient literacy and prevention awareness. It does not provide diagnosis, treatment, emergency advice, or clinical decisions, and it never replaces a qualified clinician. Always confirm with your clinician.";
