"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/ui/icons";
import { translatePrescription } from "@/lib/health/prescription";
import { cn } from "@/lib/utils";

const SAMPLE = `Tab. Amoxicillin 500mg PO TID for 7 days, take PC.
Tab. Paracetamol 650mg PRN for fever, max QID.
Continue antihypertensive, review BP at follow-up in 2 weeks.
Patient afebrile. Mild edema noted. Confirm renal function before titrate.`;

export function PrescriptionTranslator() {
  const [text, setText] = useState("");
  const result = useMemo(() => translatePrescription(text), [text]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
      <div className="surface h-fit p-6 lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Paste the text
          </h2>
          <button
            onClick={() => setText(SAMPLE)}
            className="text-xs font-medium text-juno-600 hover:underline dark:text-juno-400"
          >
            Try a sample
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          placeholder="Paste a prescription, discharge note, or medicine instructions here…"
          className="field mt-4 resize-none font-mono text-sm leading-relaxed"
        />
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          JUNO decodes the <em>language</em> of the note — it never infers a
          diagnosis or suggests changing any medicine.
        </p>
        {text && (
          <button
            onClick={() => setText("")}
            className="btn-ghost mt-3 w-full py-2 text-xs"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {result.empty ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="surface grid min-h-[280px] place-items-center p-10 text-center"
            >
              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-muted">
                  <Icons.translate width={26} height={26} className="text-muted-foreground" />
                </div>
                <p className="mt-4 font-medium">Your plain-language reading appears here</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Paste text or try the sample to see how it works.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Interpretation */}
              <div className="surface p-6">
                <SectionTitle icon="spark" title="How to read these instructions" />
                <ul className="mt-4 space-y-2.5">
                  {result.interpretation.map((line, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-juno-500" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decoded shorthand */}
              {result.decoded.length > 0 && (
                <div className="surface p-6">
                  <SectionTitle icon="book" title="Shorthand, decoded" />
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {result.decoded.map((d) => (
                      <div
                        key={d.term}
                        className="flex items-center gap-3 rounded-2xl border border-border bg-muted/30 px-4 py-3"
                      >
                        <span className="grid h-9 min-w-9 place-items-center rounded-lg bg-juno-500/10 px-2 font-mono text-xs font-semibold text-juno-600 dark:text-juno-400">
                          {d.term}
                        </span>
                        <span className="text-sm">{d.plain}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Jargon */}
              {result.jargon.length > 0 && (
                <div className="surface p-6">
                  <SectionTitle icon="translate" title="Medical words in plain language" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.jargon.map((j) => (
                      <span
                        key={j.term}
                        className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs"
                      >
                        <span className="font-semibold capitalize">{j.term}</span>
                        <span className="text-muted-foreground"> → {j.plain}</span>
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    These describe what words mean — not what condition you have.
                  </p>
                </div>
              )}

              {/* Questions */}
              <div className="surface p-6">
                <SectionTitle icon="heart" title="Questions to ask your clinician" />
                <ol className="mt-4 space-y-2.5">
                  {result.questions.map((q, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-juno-500/15 font-mono text-xs font-semibold text-juno-600 dark:text-juno-400">
                        {i + 1}
                      </span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-warm/40 bg-warm/10 px-5 py-4">
                <Icons.shield width={20} height={20} className="shrink-0 text-warm" />
                <p className="text-sm font-medium">
                  Always confirm the meaning and any changes with your clinician
                  or pharmacist.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: "spark" | "book" | "translate" | "heart";
  title: string;
}) {
  const I = Icons[icon];
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-juno-500/10 text-juno-600 dark:text-juno-400">
        <I width={16} height={16} />
      </span>
      <h3 className={cn("text-base font-semibold tracking-tight")}>{title}</h3>
    </div>
  );
}
