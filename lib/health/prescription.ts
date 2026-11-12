import { JARGON } from "@/lib/health/literacy";

/**
 * Prescription Translator decodes the *language and structure* of a
 * prescription or discharge note into plain English. It deliberately does
 * NOT infer diagnoses or suggest medication changes. Everything routes back
 * to "confirm with your clinician."
 */

type AbbrevEntry = { plain: string; kind: "frequency" | "timing" | "route" | "note" };

export const RX_ABBREVIATIONS: Record<string, AbbrevEntry> = {
  od: { plain: "once a day", kind: "frequency" },
  bd: { plain: "two times a day", kind: "frequency" },
  bid: { plain: "two times a day", kind: "frequency" },
  tid: { plain: "three times a day", kind: "frequency" },
  tds: { plain: "three times a day", kind: "frequency" },
  qid: { plain: "four times a day", kind: "frequency" },
  qds: { plain: "four times a day", kind: "frequency" },
  q4h: { plain: "every 4 hours", kind: "frequency" },
  q6h: { plain: "every 6 hours", kind: "frequency" },
  q8h: { plain: "every 8 hours", kind: "frequency" },
  hs: { plain: "at bedtime", kind: "timing" },
  ac: { plain: "before meals", kind: "timing" },
  pc: { plain: "after meals", kind: "timing" },
  stat: { plain: "right away, once", kind: "timing" },
  prn: { plain: "only as needed", kind: "timing" },
  po: { plain: "by mouth", kind: "route" },
  iv: { plain: "into a vein", kind: "route" },
  im: { plain: "into a muscle", kind: "route" },
  sos: { plain: "if necessary", kind: "timing" },
  npo: { plain: "nothing by mouth", kind: "note" },
  mg: { plain: "milligrams (a dose amount)", kind: "note" },
  ml: { plain: "millilitres (a liquid amount)", kind: "note" },
  tab: { plain: "tablet", kind: "note" },
  cap: { plain: "capsule", kind: "note" },
};

export type DecodedTerm = {
  term: string;
  plain: string;
  kind: string;
};

export type PrescriptionResult = {
  empty: boolean;
  decoded: DecodedTerm[];
  jargon: DecodedTerm[];
  dosages: string[];
  durations: string[];
  interpretation: string[];
  questions: string[];
};

export function translatePrescription(text: string): PrescriptionResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      empty: true,
      decoded: [],
      jargon: [],
      dosages: [],
      durations: [],
      interpretation: [],
      questions: [],
    };
  }

  const lower = trimmed.toLowerCase();

  const decoded: DecodedTerm[] = [];
  Object.entries(RX_ABBREVIATIONS).forEach(([abbr, entry]) => {
    const re = new RegExp(`\\b${abbr}\\b`, "i");
    if (re.test(lower)) {
      decoded.push({ term: abbr.toUpperCase(), plain: entry.plain, kind: entry.kind });
    }
  });

  const jargon: DecodedTerm[] = [];
  Object.keys(JARGON)
    .sort((a, b) => b.length - a.length)
    .forEach((term) => {
      const re = new RegExp(`\\b${term.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "i");
      if (re.test(lower)) jargon.push({ term, plain: JARGON[term], kind: "term" });
    });

  const dosages = Array.from(
    new Set(
      (trimmed.match(/\b\d+(\.\d+)?\s?(mg|mcg|ml|g|iu|units?)\b/gi) ?? []).map(
        (d) => d.trim()
      )
    )
  );

  const durations = Array.from(
    new Set(
      (
        trimmed.match(
          /\b(?:for\s+)?\d+\s?(?:day|days|week|weeks|month|months)\b/gi
        ) ?? []
      ).map((d) => d.trim())
    )
  );

  const interpretation: string[] = [];
  const freq = decoded.filter((d) => d.kind === "frequency");
  const timing = decoded.filter((d) => d.kind === "timing");
  if (freq.length)
    interpretation.push(
      `How often: ${freq.map((f) => f.plain).join(", ")} appears in the text.`
    );
  if (timing.length)
    interpretation.push(
      `When: ${timing.map((t) => t.plain).join(", ")} is mentioned.`
    );
  if (dosages.length)
    interpretation.push(
      `Amounts noted: ${dosages.join(", ")}. Confirm the exact amount with your clinician or pharmacist.`
    );
  if (durations.length)
    interpretation.push(`Duration noted: ${durations.join(", ")}.`);
  if (jargon.length)
    interpretation.push(
      `Some medical words were simplified above. These describe terms, not a diagnosis.`
    );
  if (!interpretation.length)
    interpretation.push(
      "No standard prescription shorthand was detected. A pharmacist can read the instructions with you."
    );

  const questions = [
    "What is each medicine for, in plain words?",
    "Exactly when and how should I take it: with food, with water, or at a certain time?",
    "What should I do if I miss a dose?",
    "Are there side effects or foods/medicines I should avoid?",
    "How long do I continue, and what changes mean I should call you?",
  ];

  return {
    empty: false,
    decoded,
    jargon,
    dosages,
    durations,
    interpretation,
    questions,
  };
}
