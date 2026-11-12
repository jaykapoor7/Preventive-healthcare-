export const site = {
  name: "JUNO",
  tagline: "Healthcare shouldn’t start at the hospital.",
  description:
    "Preventive health and patient-literacy tools for India. Understand your health before you need treatment.",
  url: "https://preventive-healthcare-xi.vercel.app",
  email: "hello@juno.health",
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Modules", href: "/modules", description: "Seven tools" },
  { label: "Research", href: "/research", description: "Articles and notes" },
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
      "Enter your current habits and see an illustrative picture of where they could leave your health in 10 years.",
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
      "Turn a month of sleep, movement, rest and preventive steps into an itemised receipt: what went well and what to work on.",
    href: "/modules/health-receipt",
    accent: "warm",
    icon: "receipt",
  },
  {
    slug: "prescription-translator",
    number: "03",
    name: "Prescription Translator",
    tagline: "Your prescription in plain language.",
    description:
      "Paste a prescription or discharge note to get a plain-language reading and a list of questions to ask your clinician.",
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
      "Learn when people usually consider home monitoring, primary care, urgent care or the emergency department. The tool shows its uncertainty instead of giving one answer.",
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
      "Paste medical text to check its reading level, jargon and patient-friendliness, then read a simpler version.",
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
      "An age-by-age timeline of general prevention topics worth knowing about.",
    href: "/modules/preventive-timeline",
    accent: "warm",
    icon: "timeline",
  },
  {
    slug: "preventability-map",
    number: "07",
    name: "Preventability Map",
    tagline: "Health literacy, state by state.",
    description:
      "Compare illustrative health-literacy and prevention figures across Indian states.",
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
