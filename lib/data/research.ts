export type ResearchEntry = {
  id: string;
  kind: "Article" | "Field note" | "Public-health note";
  title: string;
  date: string;
  readingTime: string;
  summary: string;
  tags: string[];
  body: string[];
};

export const research: ResearchEntry[] = [
  {
    id: "literacy-gap",
    kind: "Article",
    title: "The patient literacy gap is an understanding gap",
    date: "2026-05-12",
    readingTime: "6 min",
    summary:
      "Access to information has never been higher. Yet the distance between reading a health message and acting on it remains wide.",
    tags: ["literacy", "behaviour", "prevention"],
    body: [
      "When we talk about healthcare access in India, we usually mean infrastructure: clinics, doctors, medicines, and increasingly, data connectivity. By those measures, access has improved dramatically.",
      "But access to information is not the same as understanding it. A person can hold a prescription, a discharge summary, and a search engine — and still not know what any of it means for the next 48 hours of their life.",
      "JUNO treats this as the core problem. Not the absence of information, but the absence of confidence, timing, and translation. Prevention only works when people can see the consequences of today in the shape of tomorrow.",
    ],
  },
  {
    id: "invisible-consequences",
    kind: "Public-health note",
    title: "Making invisible consequences visible",
    date: "2026-04-28",
    readingTime: "4 min",
    summary:
      "Most preventive behaviour fails not because people don't care, but because the feedback loop is too slow to feel real.",
    tags: ["prevention", "design", "feedback"],
    body: [
      "Smoking, poor sleep, and chronic stress rarely produce a same-day penalty. The bill arrives years later, which makes it easy to discount.",
      "Preventive tools work best when they shorten that loop — when they let people feel a decade of compounding in a single, calm visualisation.",
      "This is the design intuition behind My Future Patient and Health Receipt: not to frighten, but to make the long arc legible and optimistic.",
    ],
  },
  {
    id: "navigation-confidence",
    kind: "Field note",
    title: "Navigation confidence in first-time patients",
    date: "2026-03-19",
    readingTime: "5 min",
    summary:
      "Across informal conversations, the most common healthcare question was not 'what do I have?' but 'where do I even go?'",
    tags: ["navigation", "care", "access"],
    body: [
      "When people describe a health worry, the uncertainty is often about the system, not the symptom. Primary care or urgent care? Wait or act? Who do I ask?",
      "That ambiguity has a cost. People either over-escalate to crowded emergency rooms or under-escalate and wait too long.",
      "Care Compass is deliberately educational: it explains why someone might choose each setting and keeps uncertainty visible, rather than pretending to decide for them.",
    ],
  },
  {
    id: "plain-language",
    kind: "Article",
    title: "Plain language is a clinical safety feature",
    date: "2026-02-08",
    readingTime: "7 min",
    summary:
      "When instructions are readable, people follow them. Readability is not a nicety — it shapes outcomes.",
    tags: ["literacy", "safety", "communication"],
    body: [
      "A discharge note written at a postgraduate reading level is, for many patients, a closed door. Adherence drops not from unwillingness but from genuine misunderstanding.",
      "The Health Literacy Checker exists to surface this gap quantitatively — reading difficulty, jargon density, and a plainer rewrite — so communication can be improved before it reaches a patient.",
      "The goal is never to replace the clinician's words, but to make them land.",
    ],
  },
];

export function getResearch(id: string) {
  return research.find((r) => r.id === id);
}
