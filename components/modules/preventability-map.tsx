"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  indiaStates,
  mapMetrics,
  indiaInsights,
  type MapMetricKey,
  type StateMetric,
} from "@/lib/data/india";
import { cn } from "@/lib/utils";

const COLS = 8;
const ROWS = 8;

// Interpolate from a soft low color to a vivid juno/high color.
function scaleColor(t: number) {
  const low = [234, 179, 110]; // warm sand
  const mid = [110, 220, 180];
  const high = [5, 150, 120]; // juno
  const lerp = (a: number, b: number, f: number) => Math.round(a + (b - a) * f);
  let c: number[];
  if (t < 0.5) {
    const f = t / 0.5;
    c = low.map((v, i) => lerp(v, mid[i], f));
  } else {
    const f = (t - 0.5) / 0.5;
    c = mid.map((v, i) => lerp(v, high[i], f));
  }
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
}

export function PreventabilityMap() {
  const [metric, setMetric] = useState<MapMetricKey>("literacy");
  const [selected, setSelected] = useState<StateMetric>(
    indiaStates.find((s) => s.id === "KL")!
  );

  const { min, max } = useMemo(() => {
    const vals = indiaStates.map((s) => s[metric]);
    return { min: Math.min(...vals), max: Math.max(...vals) };
  }, [metric]);

  const norm = (v: number) => (max === min ? 0.5 : (v - min) / (max - min));

  const ranked = useMemo(
    () => [...indiaStates].sort((a, b) => b[metric] - a[metric]),
    [metric]
  );

  return (
    <div className="space-y-8">
      {/* Metric selector */}
      <div className="flex flex-wrap gap-2">
        {mapMetrics.map((m) => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              metric === m.key
                ? "border-juno-500 bg-juno-500/10 text-juno-700 dark:text-juno-400"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Map */}
        <div className="surface p-6">
          <p className="text-sm text-muted-foreground">
            {mapMetrics.find((m) => m.key === metric)?.description}
          </p>
          <div
            className="mt-6 grid gap-1.5"
            style={{
              gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
              aspectRatio: "1 / 1",
            }}
          >
            {indiaStates.map((s) => {
              const t = norm(s[metric]);
              const isSel = selected.id === s.id;
              return (
                <motion.button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  onMouseEnter={() => setSelected(s)}
                  whileHover={{ scale: 1.08, zIndex: 10 }}
                  className={cn(
                    "relative grid place-items-center rounded-lg text-[10px] font-semibold transition-shadow",
                    isSel && "ring-2 ring-foreground ring-offset-1 ring-offset-card"
                  )}
                  style={{
                    gridColumnStart: s.col + 1,
                    gridRowStart: s.row + 1,
                    backgroundColor: scaleColor(t),
                    color: t > 0.55 ? "white" : "rgb(40 40 40)",
                  }}
                  title={`${s.name}: ${s[metric]}`}
                >
                  {s.short}
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{min}</span>
            <div
              className="h-2 flex-1 rounded-full"
              style={{
                background: `linear-gradient(to right, ${scaleColor(0)}, ${scaleColor(
                  0.5
                )}, ${scaleColor(1)})`,
              }}
            />
            <span className="text-xs text-muted-foreground">{max}</span>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Stylised tile cartogram. Figures are illustrative composites for an
            educational demo, not official statistics.
          </p>
        </div>

        {/* Detail + ranking */}
        <div className="space-y-6">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="surface p-6"
          >
            <p className="eyebrow">Selected state</p>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight">
              {selected.name}
            </h3>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {mapMetrics.map((m) => (
                <div
                  key={m.key}
                  className={cn(
                    "rounded-xl border p-3 text-center",
                    m.key === metric
                      ? "border-juno-400/50 bg-juno-500/5"
                      : "border-border bg-muted/20"
                  )}
                >
                  <p className="font-mono text-xl font-semibold tabular-nums">
                    {selected[m.key]}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {selected.note}
            </p>
          </motion.div>

          <div className="surface p-6">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Top by {mapMetrics.find((m) => m.key === metric)?.label}
            </h4>
            <div className="mt-4 space-y-2">
              {ranked.slice(0, 5).map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left transition hover:bg-muted/40"
                >
                  <span className="w-4 font-mono text-xs text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium">{s.name}</span>
                  <span className="font-mono text-sm tabular-nums">
                    {s[metric]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid gap-4 md:grid-cols-3">
        {indiaInsights.map((insight, i) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-3xl border border-border bg-gradient-to-br from-muted/40 to-transparent p-6"
          >
            <h4 className="font-semibold tracking-tight">{insight.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {insight.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
