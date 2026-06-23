"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { literacyGapPoints } from "@/lib/data/landing";

export function LiteracyGap() {
  return (
    <div className="surface p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="eyebrow">The funnel</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight">
            From information to confidence
          </h3>
        </div>
        <p className="max-w-xs text-sm text-muted-foreground">
          Most people don’t lack information. They lose it on the way to
          understanding, timing, and confidence.
        </p>
      </div>

      <div className="mt-8 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={literacyGapPoints}
            margin={{ top: 8, right: 0, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "rgb(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis hide domain={[0, 100]} />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={64}>
              {literacyGapPoints.map((_, i) => (
                <Cell
                  key={i}
                  fill="rgb(var(--juno-500))"
                  fillOpacity={1 - i * 0.18}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {literacyGapPoints.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-muted/30 px-3 py-2.5"
          >
            <p className="font-mono text-lg font-semibold tabular-nums">
              {p.value}%
            </p>
            <p className="text-xs text-muted-foreground">{p.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
