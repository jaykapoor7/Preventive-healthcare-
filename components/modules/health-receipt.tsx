"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SliderField } from "@/components/ui/controls";
import { Icons } from "@/components/ui/icons";
import {
  computeReceipt,
  defaultReceiptInput,
  type ReceiptInput,
} from "@/lib/health/receipt";
import { cn } from "@/lib/utils";

function Delta({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      className={cn(
        "font-mono text-xs",
        positive ? "text-juno-700 dark:text-juno-400" : "text-warm"
      )}
    >
      {positive ? "▲" : "▼"} {Math.abs(value)}
    </span>
  );
}

export function HealthReceipt() {
  const [input, setInput] = useState<ReceiptInput>(defaultReceiptInput);
  const result = useMemo(() => computeReceipt(input), [input]);
  const now = new Date();

  const set = <K extends keyof ReceiptInput>(key: K, value: ReceiptInput[K]) =>
    setInput((p) => ({ ...p, [key]: value }));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
      <div className="surface h-fit p-6 lg:sticky lg:top-24">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          This month’s habits
        </h2>
        <div className="mt-6 space-y-6">
          <SliderField
            label="Average sleep"
            value={input.sleep}
            min={4}
            max={10}
            step={0.1}
            unit="h"
            onChange={(v) => set("sleep", v)}
          />
          <SliderField
            label="Movement"
            value={input.movementDays}
            min={0}
            max={7}
            unit="days/wk"
            onChange={(v) => set("movementDays", v)}
          />
          <SliderField
            label="Recovery / rest"
            value={input.recoveryDays}
            min={0}
            max={7}
            unit="days/wk"
            onChange={(v) => set("recoveryDays", v)}
          />
          <SliderField
            label="Preventive actions"
            value={input.prevention}
            min={0}
            max={10}
            hint="Checkups, vaccines, screenings, mindful habits."
            onChange={(v) => set("prevention", v)}
          />
          <SliderField
            label="Routine consistency"
            value={input.consistency}
            min={1}
            max={5}
            format={(v) => `${v}/5`}
            onChange={(v) => set("consistency", v)}
          />
        </div>
      </div>

      {/* Receipt */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="relative">
            {/* perforated top */}
            <div className="receipt-edge receipt-edge-top" />
            <div className="bg-card px-7 py-8 font-mono text-sm shadow-2xl shadow-black/5">
              <div className="text-center">
                <div className="mx-auto grid h-10 w-10 place-items-center">
                  <Icons.heart width={22} height={22} className="text-juno-500" />
                </div>
                <p className="mt-2 text-lg font-semibold tracking-[0.3em]">
                  JUNO
                </p>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Health Receipt
                </p>
              </div>

              <div className="my-5 border-t border-dashed border-border" />

              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>{result.month}</span>
                <span>
                  {now.toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {result.lines.map((line, i) => (
                  <motion.div
                    key={line.key}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-baseline justify-between gap-2"
                  >
                    <div className="flex-1">
                      <span className="font-semibold">{line.label}</span>
                      <span className="ml-2 text-[11px] text-muted-foreground">
                        {line.units}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <Delta value={line.delta} />
                      <span className="w-8 text-right font-semibold tabular-nums">
                        {line.score}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="my-5 border-t border-dashed border-border" />

              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Subtotal
                </span>
                <span className="text-2xl font-bold tabular-nums">
                  {result.subtotal}
                  <span className="text-sm text-muted-foreground">/100</span>
                </span>
              </div>

              <div className="my-5 border-t border-dashed border-border" />

              <div className="space-y-3">
                <div className="rounded-lg bg-juno-500/10 p-3">
                  <p className="text-[10px] uppercase tracking-widest text-juno-700 dark:text-juno-400">
                    Biggest health win
                  </p>
                  <p className="mt-0.5 font-semibold">{result.win.label}</p>
                </div>
                <div className="rounded-lg bg-warm/10 p-3">
                  <p className="text-[10px] uppercase tracking-widest text-warm">
                    Biggest opportunity
                  </p>
                  <p className="mt-0.5 font-semibold">
                    {result.opportunity.label}
                  </p>
                </div>
              </div>

              <div className="my-5 border-t border-dashed border-border" />

              <div className="text-center text-[10px] leading-relaxed text-muted-foreground">
                <p>** THANK YOU FOR INVESTING IN PREVENTION **</p>
                <p className="mt-2">No. {result.receiptId}</p>
                <p className="mt-2">
                  Educational only · not a clinical assessment
                </p>
                {/* faux barcode */}
                <div className="mt-3 flex h-8 items-end justify-center gap-[2px]">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <span
                      key={i}
                      className="bg-foreground"
                      style={{
                        width: 2,
                        height: `${8 + ((i * result.subtotal) % 24)}px`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="receipt-edge receipt-edge-bottom" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
