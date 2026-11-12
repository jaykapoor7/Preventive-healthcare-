import { clamp } from "@/lib/utils";

/**
 * A small, transparent medical-jargon glossary used to estimate
 * patient-friendliness and to offer plainer phrasings. This is an
 * educational heuristic, not a clinical or diagnostic resource.
 */
export const JARGON: Record<string, string> = {
  hypertension: "high blood pressure",
  hypotension: "low blood pressure",
  myocardial: "heart muscle",
  infarction: "blockage that damages tissue",
  "myocardial infarction": "heart attack",
  tachycardia: "fast heartbeat",
  bradycardia: "slow heartbeat",
  dyspnea: "shortness of breath",
  dyspnoea: "shortness of breath",
  edema: "swelling from fluid",
  oedema: "swelling from fluid",
  febrile: "having a fever",
  afebrile: "no fever",
  analgesic: "pain reliever",
  antipyretic: "fever reducer",
  antibiotic: "medicine that fights bacteria",
  hyperglycemia: "high blood sugar",
  hypoglycemia: "low blood sugar",
  hyperlipidemia: "high blood fats",
  prophylaxis: "prevention",
  prophylactic: "preventive",
  contraindicated: "not safe to use",
  contraindication: "reason not to use",
  "adverse event": "harmful side effect",
  "adverse reaction": "harmful reaction",
  benign: "not harmful",
  malignant: "cancerous",
  acute: "sudden and short-term",
  chronic: "long-lasting",
  idiopathic: "of unknown cause",
  asymptomatic: "without symptoms",
  symptomatic: "showing symptoms",
  inflammation: "swelling and irritation",
  hepatic: "related to the liver",
  renal: "related to the kidneys",
  pulmonary: "related to the lungs",
  cardiac: "related to the heart",
  gastrointestinal: "related to the stomach and gut",
  intravenous: "into a vein",
  "oral administration": "taken by mouth",
  "twice daily": "two times a day",
  bid: "two times a day",
  tid: "three times a day",
  qid: "four times a day",
  "po": "by mouth",
  prn: "as needed",
  npo: "nothing by mouth",
  titrate: "adjust the dose gradually",
  "monitor": "keep an eye on",
  efficacy: "how well it works",
  comorbidity: "another condition at the same time",
  etiology: "cause",
  aetiology: "cause",
  prognosis: "likely outcome",
  diagnosis: "what the condition is",
  lesion: "an area of damage",
  pathology: "the disease process",
  systemic: "affecting the whole body",
  localized: "in one area",
  "follow-up": "next visit",
  regimen: "treatment plan",
};

const COMPLEX_CONNECTORS = [
  "notwithstanding",
  "furthermore",
  "consequently",
  "subsequently",
  "aforementioned",
  "henceforth",
];

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

export type LiteracyHighlight = {
  term: string;
  plain: string;
};

export type LiteracyResult = {
  words: number;
  sentences: number;
  avgWordsPerSentence: number;
  syllablesPerWord: number;
  fleschReadingEase: number;
  gradeLevel: number;
  difficulty: "Easy" | "Plain" | "Fairly hard" | "Hard" | "Very hard";
  jargonCount: number;
  jargonDensity: number; // per 100 words
  friendliness: number; // 0-100
  highlights: LiteracyHighlight[];
  simplified: string;
  empty: boolean;
};

export function analyzeLiteracy(text: string): LiteracyResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      words: 0,
      sentences: 0,
      avgWordsPerSentence: 0,
      syllablesPerWord: 0,
      fleschReadingEase: 0,
      gradeLevel: 0,
      difficulty: "Plain",
      jargonCount: 0,
      jargonDensity: 0,
      friendliness: 0,
      highlights: [],
      simplified: "",
      empty: true,
    };
  }

  const wordTokens = trimmed.match(/[A-Za-z][A-Za-z'-]*/g) ?? [];
  const words = wordTokens.length || 1;
  const sentences = (trimmed.match(/[.!?]+(\s|$)/g) ?? []).length || 1;
  const syllables = wordTokens.reduce((acc, w) => acc + countSyllables(w), 0);

  const avgWordsPerSentence = words / sentences;
  const syllablesPerWord = syllables / words;

  const fleschReadingEase = clamp(
    206.835 - 1.015 * avgWordsPerSentence - 84.6 * syllablesPerWord,
    0,
    100
  );
  const gradeLevel = clamp(
    0.39 * avgWordsPerSentence + 11.8 * syllablesPerWord - 15.59,
    0,
    20
  );

  // Jargon detection (multi-word terms first).
  const lower = trimmed.toLowerCase();
  const found = new Map<string, string>();
  Object.keys(JARGON)
    .sort((a, b) => b.length - a.length)
    .forEach((term) => {
      const re = new RegExp(`\\b${term.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "i");
      if (re.test(lower)) found.set(term, JARGON[term]);
    });
  COMPLEX_CONNECTORS.forEach((c) => {
    if (lower.includes(c)) found.set(c, "(wordy connector)");
  });

  const jargonCount = found.size;
  const jargonDensity = (jargonCount / words) * 100;

  const difficulty: LiteracyResult["difficulty"] =
    fleschReadingEase >= 80
      ? "Easy"
      : fleschReadingEase >= 60
      ? "Plain"
      : fleschReadingEase >= 45
      ? "Fairly hard"
      : fleschReadingEase >= 30
      ? "Hard"
      : "Very hard";

  const friendliness = Math.round(
    clamp(
      fleschReadingEase * 0.6 +
        (100 - clamp(jargonDensity * 9, 0, 100)) * 0.3 +
        (100 - clamp((avgWordsPerSentence - 12) * 5, 0, 100)) * 0.1,
      0,
      100
    )
  );

  // Build a simpler version by swapping known jargon for plain phrasings.
  let simplified = trimmed;
  Array.from(found.keys())
    .sort((a, b) => b.length - a.length)
    .forEach((term) => {
      const plain = JARGON[term];
      if (!plain) return;
      const re = new RegExp(
        `\\b${term.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`,
        "gi"
      );
      simplified = simplified.replace(re, plain);
    });

  const highlights: LiteracyHighlight[] = Array.from(found.entries())
    .filter(([, plain]) => plain !== "(wordy connector)")
    .map(([term, plain]) => ({ term, plain }));

  return {
    words,
    sentences,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    syllablesPerWord: Math.round(syllablesPerWord * 100) / 100,
    fleschReadingEase: Math.round(fleschReadingEase),
    gradeLevel: Math.round(gradeLevel * 10) / 10,
    difficulty,
    jargonCount,
    jargonDensity: Math.round(jargonDensity * 10) / 10,
    friendliness,
    highlights,
    simplified,
    empty: false,
  };
}
