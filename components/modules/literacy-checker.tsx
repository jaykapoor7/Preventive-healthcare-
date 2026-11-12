"use client";

import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { StatRing } from "@/components/ui/stat-ring";
import { Icons } from "@/components/ui/icons";
import { analyzeLiteracy } from "@/lib/health/literacy";
import { cn } from "@/lib/utils";

const SAMPLE = `The patient presents with acute exacerbation of chronic hypertension and associated dyspnea. Pharmacological prophylaxis is contraindicated given hepatic impairment; therefore, we recommend titration of the current regimen with close monitoring for adverse events at the subsequent follow-up.`;

function highlightText(text: string, terms: string[]): ReactNode[] {
  if (!terms.length) return [text];
  const escaped = terms
    .map((t) => t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"))
    .sort((a, b) => b.length - a.length);
  const re = new RegExp(`\\b(${escaped.join("|")})\\b`, "gi");
  const parts = text.split(re);
  return parts.map((part, i) =>
    terms.some((t) => t.toLowerCase() === part.toLowerCase()) ? (
      <mark
        key={i}
        className="rounded bg-warm/25 px-0.5 font-medium text-foreground"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-4">
      <p className="font-mono text-2xl font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-xs font-medium">{label}</p>
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function LiteracyChecker() {
  const [text, setText] = useState("");
  const [showSimple, setShowSimple] = useState(false);
  const result = useMemo(() => analyzeLiteracy(text), [text]);

  const diffColor =
    result.difficulty === "Easy" || result.difficulty === "Plain"
      ? "text-juno-700 dark:text-juno-400 bg-juno-500/10"
      : result.difficulty === "Fairly hard"
      ? "text-amber-700 dark:text-amber-400 bg-amber-500/10"
      : "text-rose-700 dark:text-rose-400 bg-rose-500/10";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
      <div className="surface h-fit p-6 lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Paste medical text
          </h2>
          <button
            onClick={() => setText(SAMPLE)}
            className="text-xs font-medium text-juno-700 hover:underline dark:text-juno-400"
          >
            Try a sample
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          placeholder="Paste a discharge note, leaflet, or any health text…"
          className="field mt-4 resize-none text-sm leading-relaxed"
        />
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
        {result.empty ? (
          <div className="surface grid min-h-[280px] place-items-center p-10 text-center">
            <div>
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-muted">
                <Icons.book width={26} height={26} className="text-muted-foreground" />
              </div>
              <p className="mt-4 font-medium">Readability analysis appears here</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Paste text or try the sample to begin.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="surface p-6">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-sm font-semibold",
                        diffColor
                      )}
                    >
                      {result.difficulty} to read
                    </span>
                  </div>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    A friendliness score blends reading ease, jargon, and
                    sentence length. Higher is easier for patients.
                  </p>
                </div>
                <StatRing value={result.friendliness} size={130} sublabel="Friendliness" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Metric
                label="Reading ease"
                value={`${result.fleschReadingEase}`}
                hint="Flesch (0–100)"
              />
              <Metric
                label="Grade level"
                value={`${result.gradeLevel}`}
                hint="years of schooling"
              />
              <Metric
                label="Jargon"
                value={`${result.jargonCount}`}
                hint={`${result.jargonDensity}/100 words`}
              />
              <Metric
                label="Sentence length"
                value={`${result.avgWordsPerSentence}`}
                hint="words/sentence"
              />
            </div>

            {result.highlights.length > 0 && (
              <div className="surface p-6">
                <h3 className="text-base font-semibold tracking-tight">
                  Confusing terms ({result.highlights.length})
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.highlights.map((h) => (
                    <span
                      key={h.term}
                      className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs"
                    >
                      <span className="font-semibold capitalize">{h.term}</span>
                      <span className="text-muted-foreground"> → {h.plain}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="surface p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold tracking-tight">
                  {showSimple ? "Explain like I’m 15" : "Your text"}
                </h3>
                <button
                  onClick={() => setShowSimple((v) => !v)}
                  className="btn-primary px-4 py-2 text-xs"
                >
                  <Icons.spark width={15} height={15} />
                  {showSimple ? "Show original" : "Explain like I’m 15"}
                </button>
              </div>
              <motion.p
                key={showSimple ? "simple" : "orig"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 max-w-prose text-sm leading-relaxed"
              >
                {showSimple
                  ? result.simplified
                  : highlightText(
                      text,
                      result.highlights.map((h) => h.term)
                    )}
              </motion.p>
              {showSimple && (
                <p className="mt-4 text-xs text-muted-foreground">
                  Simplified by swapping known jargon for plainer words. It’s a
                  reading aid, not a rewrite of clinical meaning.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
