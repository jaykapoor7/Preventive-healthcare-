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

// Splits "Have information" into two lines so every bar keeps its label on
// narrow screens (Recharts otherwise drops overlapping ticks).
function TwoLineTick(props: {
  x?: number;
  y?: number;
  payload?: { value: string };
}) {
  const { x = 0, y = 0, payload } = props;
  const [first, ...rest] = (payload?.value ?? "").split(" ");
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill="rgb(var(--muted-foreground))"
      fontSize={12}
    >
      <tspan x={x} dy={12}>
        {first}
      </tspan>
      {rest.length > 0 && (
        <tspan x={x} dy={14}>
          {rest.join(" ")}
        </tspan>
      )}
    </text>
  );
}

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
          Most people have the information. Far fewer understand it, act on it
          in time, or feel confident about it.
        </p>
      </div>

      <div className="mt-8 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={literacyGapPoints}
            margin={{ top: 8, right: 4, left: 4, bottom: 0 }}
          >
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              interval={0}
              height={40}
              tick={<TwoLineTick />}
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
