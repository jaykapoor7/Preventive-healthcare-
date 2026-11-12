"use client";

import { cn } from "@/lib/utils";

export function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  hint,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  hint?: string;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label className="label">{label}</label>
        <span className="font-mono text-sm font-semibold tabular-nums text-juno-700 dark:text-juno-400">
          {format ? format(value) : value}
          {unit ? ` ${unit}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="juno-range w-full"
        style={{
          background: `linear-gradient(to right, rgb(var(--juno-500)) ${pct}%, rgb(var(--muted)) ${pct}%)`,
        }}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="label">{label}</label>
      <div className="flex flex-wrap gap-1.5 rounded-2xl border border-border bg-muted/40 p-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 rounded-xl px-3 py-2 text-sm font-medium transition",
              value === opt.value
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
