import { clamp } from "@/lib/utils";

export type Smoking = "none" | "occasional" | "regular";
export type CheckupFrequency = "never" | "rare" | "sometimes" | "yearly";

export type FuturePatientInput = {
  age: number;
  sleep: number; // hours per night
  movement: number; // active days per week (0-7)
  stress: number; // 1 (low) - 5 (high)
  hydration: number; // glasses of water per day
  diet: number; // 1 (poor) - 5 (excellent)
  smoking: Smoking;
  checkup: CheckupFrequency;
};

export const defaultFuturePatientInput: FuturePatientInput = {
  age: 24,
  sleep: 6.5,
  movement: 2,
  stress: 3,
  hydration: 5,
  diet: 3,
  smoking: "none",
  checkup: "rare",
};

export type FactorScore = {
  key: string;
  label: string;
  score: number; // 0-100
  note: string;
};

export type RiskArea = {
  label: string;
  level: "watch" | "build" | "steady";
  note: string;
};

export type Suggestion = {
  title: string;
  detail: string;
  lever: string;
};

export type TrajectoryPoint = {
  year: number;
  age: number;
  current: number; // prevention score if habits unchanged
  improved: number; // prevention score with suggested changes
  energy: number;
};

export type FuturePatientResult = {
  preventionScore: number;
  energyScore: number;
  factors: FactorScore[];
  risks: RiskArea[];
  suggestions: Suggestion[];
  trajectory: TrajectoryPoint[];
  archetype: string;
};

function sleepScore(h: number) {
  // Best around 7.5-8h
  if (h >= 7 && h <= 9) return 100 - Math.abs(h - 8) * 6;
  if (h < 7) return clamp(100 - (7 - h) * 22, 10, 96);
  return clamp(100 - (h - 9) * 14, 30, 96);
}

function movementScore(days: number) {
  return clamp(30 + days * 11, 20, 100);
}

function stressScore(s: number) {
  return clamp(110 - s * 18, 20, 100);
}

function hydrationScore(g: number) {
  return clamp(35 + g * 9, 20, 100);
}

function dietScore(d: number) {
  return clamp(d * 19 + 5, 20, 100);
}

function smokingScore(s: Smoking) {
  return s === "none" ? 100 : s === "occasional" ? 58 : 22;
}

function checkupScore(c: CheckupFrequency) {
  return c === "yearly" ? 100 : c === "sometimes" ? 74 : c === "rare" ? 48 : 28;
}

const WEIGHTS: Record<string, number> = {
  sleep: 0.2,
  movement: 0.2,
  stress: 0.14,
  hydration: 0.1,
  diet: 0.16,
  smoking: 0.12,
  checkup: 0.08,
};

export function computeFuturePatient(
  input: FuturePatientInput
): FuturePatientResult {
  const raw: Record<string, { label: string; score: number; note: string }> = {
    sleep: {
      label: "Sleep",
      score: sleepScore(input.sleep),
      note:
        input.sleep < 6.5
          ? "Short sleep tends to compound quietly over years."
          : "A steady sleep window is one of prevention's strongest levers.",
    },
    movement: {
      label: "Movement",
      score: movementScore(input.movement),
      note:
        input.movement < 3
          ? "Even short daily movement shifts long-term trajectories."
          : "Regular movement is doing a lot of invisible work for you.",
    },
    stress: {
      label: "Stress load",
      score: stressScore(input.stress),
      note:
        input.stress >= 4
          ? "Sustained stress is worth naming and managing early."
          : "Manageable stress supports recovery and focus.",
    },
    hydration: {
      label: "Hydration",
      score: hydrationScore(input.hydration),
      note:
        input.hydration < 5
          ? "Hydration is the easiest habit to nudge upward."
          : "Consistent hydration supports energy and recovery.",
    },
    diet: {
      label: "Diet quality",
      score: dietScore(input.diet),
      note:
        input.diet <= 2
          ? "Small, repeatable food swaps beat dramatic diets."
          : "A reasonable diet is a powerful preventive base.",
    },
    smoking: {
      label: "Smoking",
      score: smokingScore(input.smoking),
      note:
        input.smoking === "none"
          ? "Staying smoke-free removes a major risk multiplier."
          : "Reducing or stopping is the single most effective change here.",
    },
    checkup: {
      label: "Checkup habit",
      score: checkupScore(input.checkup),
      note:
        input.checkup === "yearly"
          ? "Regular checkups catch the invisible early."
          : "Periodic checkups make silent issues visible sooner.",
    },
  };

  const factors: FactorScore[] = Object.entries(raw).map(([key, v]) => ({
    key,
    label: v.label,
    score: Math.round(v.score),
    note: v.note,
  }));

  const preventionScore = Math.round(
    Object.entries(raw).reduce(
      (acc, [key, v]) => acc + v.score * (WEIGHTS[key] ?? 0),
      0
    )
  );

  const energyScore = Math.round(
    clamp(
      raw.sleep.score * 0.34 +
        raw.movement.score * 0.26 +
        raw.hydration.score * 0.16 +
        raw.stress.score * 0.16 +
        raw.diet.score * 0.08,
      0,
      100
    )
  );

  // Risks: lowest factors become watch/build areas.
  const sorted = [...factors].sort((a, b) => a.score - b.score);
  const risks: RiskArea[] = sorted.slice(0, 3).map((f) => ({
    label: f.label,
    level: f.score < 45 ? "watch" : f.score < 70 ? "build" : "steady",
    note: f.note,
  }));

  // Suggestions target the weakest, most movable levers.
  const suggestionBank: Record<string, Suggestion> = {
    sleep: {
      title: "Protect a 7–8h sleep window",
      detail: "Anchor a consistent bedtime; treat it as the base layer of recovery.",
      lever: "Sleep",
    },
    movement: {
      title: "Add two more active days",
      detail: "A 20-minute walk counts. Frequency matters more than intensity.",
      lever: "Movement",
    },
    stress: {
      title: "Name and offload stress weekly",
      detail: "A short daily wind-down lowers the long-term load you carry.",
      lever: "Stress",
    },
    hydration: {
      title: "Carry water you actually finish",
      detail: "Aim for a steady intake across the day rather than all at once.",
      lever: "Hydration",
    },
    diet: {
      title: "Make one meal more whole-food",
      detail: "One reliable, balanced meal a day compounds quietly.",
      lever: "Diet",
    },
    smoking: {
      title: "Plan a reduction step",
      detail: "Even structured reduction lowers long-term preventable risk.",
      lever: "Smoking",
    },
    checkup: {
      title: "Book one preventive checkup",
      detail: "A baseline today makes future changes visible early.",
      lever: "Checkups",
    },
  };
  const suggestions = sorted
    .slice(0, 3)
    .map((f) => suggestionBank[f.key])
    .filter(Boolean);

  // 10-year trajectory. Habits set a drift; suggestions model a better path.
  const drift = (preventionScore - 60) / 100; // positive if above baseline
  const trajectory: TrajectoryPoint[] = [];
  for (let i = 0; i <= 10; i++) {
    const ageDecline = i * 0.9; // gentle natural drift with age
    const current = clamp(
      preventionScore + drift * i * 2.4 - ageDecline,
      5,
      100
    );
    const improved = clamp(
      preventionScore + i * 2.1 - ageDecline * 0.7,
      5,
      100
    );
    const energy = clamp(energyScore + drift * i * 1.8 - ageDecline, 5, 100);
    trajectory.push({
      year: i,
      age: input.age + i,
      current: Math.round(current),
      improved: Math.round(improved),
      energy: Math.round(energy),
    });
  }

  const archetype =
    preventionScore >= 78
      ? "The Steady Investor"
      : preventionScore >= 60
      ? "The Quiet Builder"
      : preventionScore >= 42
      ? "The Early Mover"
      : "The Fresh Start";

  return {
    preventionScore,
    energyScore,
    factors,
    risks,
    suggestions,
    trajectory,
    archetype,
  };
}
