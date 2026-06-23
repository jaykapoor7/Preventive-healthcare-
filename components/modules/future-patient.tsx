"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SliderField, Segmented } from "@/components/ui/controls";
import { StatRing } from "@/components/ui/stat-ring";
import { Icons } from "@/components/ui/icons";
import { ChartTooltip } from "@/components/ui/chart-tooltip";
import {
  computeFuturePatient,
  defaultFuturePatientInput,
  type FuturePatientInput,
  type CheckupFrequency,
  type Smoking,
} from "@/lib/health/future-patient";
import { cn } from "@/lib/utils";

const riskColor = {
  watch: "border-warm/40 bg-warm/10 text-warm",
  build: "border-juno-400/40 bg-juno-500/10 text-juno-600 dark:text-juno-400",
  steady: "border-border bg-muted/40 text-muted-foreground",
};

export function FuturePatient() {
  const [input, setInput] = useState<FuturePatientInput>(
    defaultFuturePatientInput
  );
  const [revealed, setRevealed] = useState(false);
  const result = useMemo(() => computeFuturePatient(input), [input]);

  const set = <K extends keyof FuturePatientInput>(
    key: K,
    value: FuturePatientInput[K]
  ) => setInput((p) => ({ ...p, [key]: value }));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
      {/* Inputs */}
      <div className="surface h-fit p-6 lg:sticky lg:top-24">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Your habits today
        </h2>
        <div className="mt-6 space-y-6">
          <SliderField
            label="Age"
            value={input.age}
            min={16}
            max={70}
            unit="yrs"
            onChange={(v) => set("age", v)}
          />
          <SliderField
            label="Sleep"
            value={input.sleep}
            min={3}
            max={10}
            step={0.5}
            unit="h/night"
            hint="Most adults feel best around 7–8 hours."
            onChange={(v) => set("sleep", v)}
          />
          <SliderField
            label="Movement"
            value={input.movement}
            min={0}
            max={7}
            unit="active days/wk"
            onChange={(v) => set("movement", v)}
          />
          <SliderField
            label="Stress"
            value={input.stress}
            min={1}
            max={5}
            format={(v) => ["Very low", "Low", "Moderate", "High", "Very high"][v - 1]}
            onChange={(v) => set("stress", v)}
          />
          <SliderField
            label="Hydration"
            value={input.hydration}
            min={1}
            max={12}
            unit="glasses/day"
            onChange={(v) => set("hydration", v)}
          />
          <SliderField
            label="Diet quality"
            value={input.diet}
            min={1}
            max={5}
            format={(v) => ["Poor", "Basic", "Okay", "Good", "Excellent"][v - 1]}
            onChange={(v) => set("diet", v)}
          />
          <Segmented<Smoking>
            label="Smoking"
            value={input.smoking}
            onChange={(v) => set("smoking", v)}
            options={[
              { value: "none", label: "None" },
              { value: "occasional", label: "Occasional" },
              { value: "regular", label: "Regular" },
            ]}
          />
          <Segmented<CheckupFrequency>
            label="Checkup frequency"
            value={input.checkup}
            onChange={(v) => set("checkup", v)}
            options={[
              { value: "never", label: "Never" },
              { value: "rare", label: "Rare" },
              { value: "sometimes", label: "Sometimes" },
              { value: "yearly", label: "Yearly" },
            ]}
          />

          <button
            onClick={() => setRevealed(true)}
            className="btn-primary w-full py-3"
          >
            <Icons.spark width={18} height={18} />
            Meet yourself in 10 years
          </button>
        </div>
      </div>

      {/* Output */}
      <div className="space-y-6">
        <motion.div
          initial={false}
          animate={{ opacity: revealed ? 1 : 0.55 }}
          className="surface relative overflow-hidden p-7"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-juno-500/10 blur-3xl" />
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Your projected profile · age {input.age + 10}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                {result.archetype}
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                A habit-driven picture — not a prediction. Small changes move
                this profile more than you’d expect.
              </p>
            </div>
            <div className="flex gap-6">
              <StatRing value={result.preventionScore} size={120} sublabel="Prevention" />
              <StatRing value={result.energyScore} size={120} sublabel="Energy" />
            </div>
          </div>
        </motion.div>

        {/* Trajectory */}
        <div className="surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold tracking-tight">
              10-year trajectory
            </h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-juno-500" />
                If habits hold
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-warm" />
                With suggested changes
              </span>
            </div>
          </div>
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={result.trajectory}
                margin={{ top: 10, right: 10, left: -18, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="fp-current" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(var(--juno-500))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="rgb(var(--juno-500))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="rgb(var(--border))"
                  strokeDasharray="3 6"
                />
                <XAxis
                  dataKey="age"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "rgb(var(--muted-foreground))", fontSize: 12 }}
                  tickFormatter={(v) => `${v}`}
                />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "rgb(var(--muted-foreground))", fontSize: 12 }}
                />
                <Tooltip content={<ChartTooltip suffix=" pts" />} />
                <Area
                  type="monotone"
                  dataKey="current"
                  stroke="rgb(var(--juno-500))"
                  strokeWidth={2.5}
                  fill="url(#fp-current)"
                  name="If habits hold"
                />
                <Line
                  type="monotone"
                  dataKey="improved"
                  stroke="rgb(var(--warm))"
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  dot={false}
                  name="With suggested changes"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Factors */}
        <div className="surface p-6">
          <h3 className="text-lg font-semibold tracking-tight">
            What’s driving it
          </h3>
          <div className="mt-5 space-y-4">
            {result.factors.map((f) => (
              <div key={f.key}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{f.label}</span>
                  <span className="font-mono tabular-nums text-muted-foreground">
                    {f.score}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-juno-500 to-warm"
                    initial={{ width: 0 }}
                    animate={{ width: `${f.score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Risks */}
          <div className="surface p-6">
            <h3 className="text-lg font-semibold tracking-tight">
              Areas to watch
            </h3>
            <div className="mt-4 space-y-3">
              {result.risks.map((r) => (
                <div
                  key={r.label}
                  className={cn(
                    "rounded-2xl border p-4",
                    riskColor[r.level]
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      {r.label}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wide">
                      {r.level}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {r.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="surface p-6">
            <h3 className="text-lg font-semibold tracking-tight">
              Suggested changes
            </h3>
            <div className="mt-4 space-y-3">
              {result.suggestions.map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-border bg-muted/30 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-juno-500/15 text-juno-600 dark:text-juno-400">
                      <Icons.check width={15} height={15} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{s.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {s.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
