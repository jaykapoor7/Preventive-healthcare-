"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/ui/icons";
import { preventiveTimeline } from "@/lib/data/timeline";
import { cn } from "@/lib/utils";

export function PreventiveTimeline() {
  const [active, setActive] = useState(1);
  const stage = preventiveTimeline[active];

  return (
    <div className="space-y-10">
      {/* Timeline rail */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-border" />
        <motion.div
          className="absolute left-0 top-5 h-0.5 bg-gradient-to-r from-juno-500 to-warm"
          initial={false}
          animate={{
            width: `${(active / (preventiveTimeline.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <div className="relative flex justify-between">
          {preventiveTimeline.map((s, i) => {
            const isActive = i === active;
            const isPast = i <= active;
            return (
              <button
                key={s.age}
                onClick={() => setActive(i)}
                className="group flex flex-col items-center gap-3"
              >
                <span
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-full border-2 bg-card font-mono text-xs font-semibold transition-all",
                    isActive
                      ? "scale-110 border-juno-500 text-juno-600 shadow-lg shadow-juno-500/20 dark:text-juno-400"
                      : isPast
                      ? "border-juno-400/50 text-foreground"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {s.age}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-medium transition-colors sm:block",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.age}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="grid gap-6 lg:grid-cols-[1fr_1.4fr]"
        >
          <div className="surface relative overflow-hidden p-8">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-juno-500/10 blur-2xl" />
            <p className="font-mono text-6xl font-bold tracking-tight text-gradient">
              {stage.age}
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {stage.theme}
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">
              {stage.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {stage.summary}
            </p>
          </div>

          <div className="surface p-8">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              What people often become aware of
            </h4>
            <ul className="mt-5 space-y-4">
              {stage.awareness.map((a, i) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex gap-3"
                >
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-juno-500/15 text-juno-600 dark:text-juno-400">
                    <Icons.check width={15} height={15} />
                  </span>
                  <span className="text-sm leading-relaxed">{a}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
              These are general, population-level awareness moments — not a
              personal medical schedule. Your clinician sets what’s right for you.
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
