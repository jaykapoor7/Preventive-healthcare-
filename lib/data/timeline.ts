export type TimelineStage = {
  age: number;
  title: string;
  theme: string;
  summary: string;
  awareness: string[];
};

/**
 * Educational, population-level awareness moments, NOT an individual medical
 * schedule. Always frame as "things people often become aware of around this
 * age," and route specifics to a clinician.
 */
export const preventiveTimeline: TimelineStage[] = [
  {
    age: 18,
    title: "Foundations",
    theme: "Vaccination & body literacy",
    summary:
      "Early adulthood is when many people first take ownership of their own health record.",
    awareness: [
      "Knowing your vaccination history and what's commonly recommended.",
      "Understanding sleep, nutrition, and mental-health basics.",
      "Learning how to describe symptoms clearly to a clinician.",
    ],
  },
  {
    age: 25,
    title: "Baselines",
    theme: "Blood pressure awareness",
    summary:
      "A quiet decade for building baseline numbers people can track over time.",
    awareness: [
      "Becoming aware of blood pressure and what the numbers mean.",
      "Noticing early lifestyle patterns around stress and movement.",
      "Establishing a relationship with a primary-care clinician.",
    ],
  },
  {
    age: 35,
    title: "Patterns",
    theme: "Lifestyle screening",
    summary:
      "Habits from earlier years start to show up as measurable patterns.",
    awareness: [
      "Awareness of blood sugar, cholesterol, and metabolic health.",
      "Understanding family history as context, not destiny.",
      "Building routines that are sustainable, not extreme.",
    ],
  },
  {
    age: 45,
    title: "Routines",
    theme: "Preventive routines",
    summary:
      "Prevention becomes a regular, unremarkable and reassuring routine.",
    awareness: [
      "Knowing which preventive checkups are commonly discussed.",
      "Paying attention to recovery, eyesight, and joint health.",
      "Treating checkups as maintenance, not alarm.",
    ],
  },
  {
    age: 55,
    title: "Stewardship",
    theme: "Long-view health",
    summary:
      "A focus on maintaining capacity, energy, and independence over time.",
    awareness: [
      "Staying engaged with regular, clinician-guided screening.",
      "Protecting strength, balance, and cognitive health.",
      "Understanding medications and how they interact.",
    ],
  },
];
