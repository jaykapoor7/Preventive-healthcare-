import { clamp } from "@/lib/utils";

export type ReceiptInput = {
  sleep: number; // avg hours/night
  movementDays: number; // active days/week
  recoveryDays: number; // restful/rest days/week (0-7)
  prevention: number; // preventive actions taken this month (0-10)
  consistency: number; // self-rated routine consistency 1-5
};

export const defaultReceiptInput: ReceiptInput = {
  sleep: 6.8,
  movementDays: 3,
  recoveryDays: 2,
  prevention: 3,
  consistency: 3,
};

export type ReceiptLine = {
  key: string;
  label: string;
  units: string;
  score: number; // 0-100
  delta: number; // vs. a soft baseline
};

export type ReceiptResult = {
  lines: ReceiptLine[];
  subtotal: number;
  win: ReceiptLine;
  opportunity: ReceiptLine;
  month: string;
  receiptId: string;
};

export function computeReceipt(
  input: ReceiptInput,
  month = "THIS MONTH"
): ReceiptResult {
  const sleepScore = clamp(100 - Math.abs(input.sleep - 8) * 16, 10, 100);
  const movementScore = clamp(input.movementDays * 14 + 2, 5, 100);
  const recoveryScore = clamp(40 + input.recoveryDays * 9, 10, 100);
  const preventionScore = clamp(input.prevention * 10, 0, 100);
  const consistencyScore = clamp(input.consistency * 20 - 5, 5, 100);

  // Soft baselines represent a "typical" month for contrast.
  const baselines: Record<string, number> = {
    sleep: 62,
    movement: 48,
    recovery: 55,
    prevention: 35,
    consistency: 52,
  };

  const lines: ReceiptLine[] = [
    {
      key: "sleep",
      label: "Sleep",
      units: `${input.sleep.toFixed(1)} h avg`,
      score: Math.round(sleepScore),
      delta: Math.round(sleepScore - baselines.sleep),
    },
    {
      key: "movement",
      label: "Movement",
      units: `${input.movementDays} days/wk`,
      score: Math.round(movementScore),
      delta: Math.round(movementScore - baselines.movement),
    },
    {
      key: "recovery",
      label: "Recovery",
      units: `${input.recoveryDays} rest days/wk`,
      score: Math.round(recoveryScore),
      delta: Math.round(recoveryScore - baselines.recovery),
    },
    {
      key: "prevention",
      label: "Prevention",
      units: `${input.prevention} actions`,
      score: Math.round(preventionScore),
      delta: Math.round(preventionScore - baselines.prevention),
    },
    {
      key: "consistency",
      label: "Consistency",
      units: `${input.consistency}/5 rated`,
      score: Math.round(consistencyScore),
      delta: Math.round(consistencyScore - baselines.consistency),
    },
  ];

  const subtotal = Math.round(
    lines.reduce((acc, l) => acc + l.score, 0) / lines.length
  );

  const win = [...lines].sort((a, b) => b.delta - a.delta)[0];
  const opportunity = [...lines].sort((a, b) => a.delta - b.delta)[0];

  const receiptId = `JUNO-${(subtotal * 7 + lines.length)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0")}`;

  return { lines, subtotal, win, opportunity, month, receiptId };
}
