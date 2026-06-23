"use client";

import { type TooltipProps } from "recharts";

export function ChartTooltip({
  active,
  payload,
  label,
  suffix = "",
  prefix = "",
}: TooltipProps<number, string> & { suffix?: string; prefix?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-border bg-card/95 px-3 py-2 shadow-lg backdrop-blur">
      {label !== undefined && (
        <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      )}
      <div className="space-y-0.5">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: entry.color as string }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="ml-auto font-mono font-semibold tabular-nums">
              {prefix}
              {entry.value}
              {suffix}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
