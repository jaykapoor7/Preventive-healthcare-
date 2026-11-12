"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/ui/icons";
import { navigateCare, type CareTier } from "@/lib/health/care-compass";
import { cn } from "@/lib/utils";

const tierStyle: Record<
  CareTier["key"],
  { ring: string; bar: string; chip: string }
> = {
  monitor: {
    ring: "border-juno-400/30",
    bar: "bg-juno-400",
    chip: "bg-juno-500/10 text-juno-700 dark:text-juno-400",
  },
  primary: {
    ring: "border-sky-400/30",
    bar: "bg-sky-400",
    chip: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  },
  urgent: {
    ring: "border-amber-400/30",
    bar: "bg-amber-400",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  emergency: {
    ring: "border-rose-400/40",
    bar: "bg-rose-500",
    chip: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
  },
};

const EXAMPLES = [
  "I have a mild headache that started today",
  "Persistent cough for two weeks",
  "Sudden chest pain and trouble breathing",
  "Deep cut that won’t stop bleeding",
];

export function CareCompass() {
  const [concern, setConcern] = useState("");
  const result = useMemo(() => navigateCare(concern), [concern]);

  return (
    <div className="space-y-8">
      <div className="surface p-6">
        <label className="label">Describe a health concern in your words</label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            placeholder="e.g. I have a headache"
            className="field flex-1"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setConcern(ex)}
              className="rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {result.flagged && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-2xl border border-rose-400/40 bg-rose-500/10 px-5 py-4"
          >
            <Icons.alert width={22} height={22} className="shrink-0 text-rose-500" />
            <div>
              <p className="font-semibold text-foreground">
                Your words mention serious signs.
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                If someone has severe or sudden symptoms, people are generally
                advised to call their local emergency number right away. JUNO
                cannot assess emergencies.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!result.empty && (
        <div className="grid gap-4 md:grid-cols-2">
          {result.tiers.map((tier, i) => {
            const isTop = tier.key === result.topKey;
            const style = tierStyle[tier.key];
            return (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={cn(
                  "surface relative overflow-hidden p-6",
                  isTop && "ring-2 ring-juno-400/40",
                  style.ring
                )}
              >
                {isTop && (
                  <span className="absolute right-4 top-4 rounded-full bg-juno-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-juno-700 dark:text-juno-400">
                    Most emphasis
                  </span>
                )}
                <span
                  className={cn(
                    "inline-flex rounded-lg px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
                    style.chip
                  )}
                >
                  {tier.label}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {tier.blurb}
                </p>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Educational emphasis</span>
                    <span className="font-mono">{tier.emphasis}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className={cn("h-full rounded-full", style.bar)}
                      initial={{ width: 0 }}
                      animate={{ width: `${tier.emphasis}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {tier.reasons.map((r) => (
                    <li
                      key={r}
                      className="flex gap-2 text-xs leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-current opacity-50" />
                      {r}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      )}

      {!result.empty && (
        <div className="rounded-2xl border border-border bg-muted/30 px-5 py-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Uncertainty is normal.</span>{" "}
          These bands show where people <em>often</em> consider care. They are
          not a decision about you. When unsure, a clinician or helpline can guide the
          next step.
        </div>
      )}
    </div>
  );
}
