/**
 * Care Compass is an *educational navigation* aid. It never diagnoses or
 * tells anyone what they have. It explains the kinds of care settings that
 * exist and why people might consider each, and it always keeps uncertainty
 * visible. Emergency-sounding language pushes emphasis toward urgent/ER
 * *education*, never a verdict.
 */

export type CareTier = {
  key: "monitor" | "primary" | "urgent" | "emergency";
  label: string;
  blurb: string;
  reasons: string[];
  emphasis: number; // 0-100 relative educational emphasis
};

const EMERGENCY_SIGNALS = [
  "chest pain",
  "can't breathe",
  "cant breathe",
  "difficulty breathing",
  "trouble breathing",
  "severe bleeding",
  "unconscious",
  "fainting",
  "stroke",
  "slurred speech",
  "face drooping",
  "numb arm",
  "blue lips",
  "seizure",
  "suicidal",
  "severe allergic",
  "anaphylaxis",
  "poison",
  "overdose",
];

const URGENT_SIGNALS = [
  "high fever",
  "persistent vomiting",
  "deep cut",
  "broken",
  "fracture",
  "dehydration",
  "severe pain",
  "ear infection",
  "can't keep fluids",
  "worsening",
];

const PRIMARY_SIGNALS = [
  "rash",
  "cough",
  "sore throat",
  "back pain",
  "headache",
  "tired",
  "fatigue",
  "checkup",
  "refill",
  "ongoing",
  "weeks",
  "recurring",
];

const MONITOR_SIGNALS = [
  "mild",
  "slight",
  "started today",
  "runny nose",
  "sneezing",
  "minor",
  "occasional",
];

function countHits(text: string, signals: string[]) {
  return signals.reduce((acc, s) => (text.includes(s) ? acc + 1 : acc), 0);
}

export type CareCompassResult = {
  empty: boolean;
  tiers: CareTier[];
  topKey: CareTier["key"];
  flagged: boolean;
  echoed: string;
};

export function navigateCare(concern: string): CareCompassResult {
  const trimmed = concern.trim();
  if (!trimmed) {
    return { empty: true, tiers: [], topKey: "primary", flagged: false, echoed: "" };
  }
  const text = trimmed.toLowerCase();

  const emergencyHits = countHits(text, EMERGENCY_SIGNALS);
  const urgentHits = countHits(text, URGENT_SIGNALS);
  const primaryHits = countHits(text, PRIMARY_SIGNALS);
  const monitorHits = countHits(text, MONITOR_SIGNALS);

  const tiers: CareTier[] = ([
    {
      key: "monitor",
      label: "Monitor at home",
      blurb:
        "Watchful waiting with rest, fluids, and noting how things change.",
      reasons: [
        "Symptoms are mild and not getting worse.",
        "You can track changes over a day or two safely.",
        "Self-care steps usually help similar everyday issues.",
      ],
      emphasis: 35 + monitorHits * 18 - emergencyHits * 20 - urgentHits * 8,
    },
    {
      key: "primary",
      label: "Primary care",
      blurb:
        "A GP or family doctor for ongoing, unclear, or non-urgent concerns.",
      reasons: [
        "Something has lasted a while or keeps coming back.",
        "You want a professional opinion without an emergency.",
        "You need a checkup, prescription review, or referral.",
      ],
      emphasis: 45 + primaryHits * 14 - emergencyHits * 15,
    },
    {
      key: "urgent",
      label: "Urgent care",
      blurb:
        "Same-day care for problems that feel pressing but not life-threatening.",
      reasons: [
        "It can't comfortably wait for a routine appointment.",
        "Pain or symptoms are notable and worsening.",
        "You need quicker attention than primary care offers today.",
      ],
      emphasis: 30 + urgentHits * 20 + emergencyHits * 6,
    },
    {
      key: "emergency",
      label: "Emergency",
      blurb:
        "Call your local emergency number or go to the ER for severe, sudden, or dangerous signs.",
      reasons: [
        "Severe or sudden symptoms (e.g. trouble breathing, chest pain).",
        "Signs of a stroke, heavy bleeding, or loss of consciousness.",
        "When in doubt about something serious, people seek emergency care.",
      ],
      emphasis: 10 + emergencyHits * 45 + urgentHits * 6,
    },
  ] as CareTier[]).map((t) => ({
    ...t,
    emphasis: Math.max(5, Math.min(100, Math.round(t.emphasis))),
  }));

  const top = [...tiers].sort((a, b) => b.emphasis - a.emphasis)[0];

  return {
    empty: false,
    tiers,
    topKey: top.key,
    flagged: emergencyHits > 0,
    echoed: trimmed,
  };
}
