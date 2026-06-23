# JUNO

### Healthcare shouldn’t start at the hospital.

JUNO is a **preventive healthcare and patient-literacy platform built for India**. It helps people understand healthcare *before* becoming patients — improving patient literacy, prevention awareness, and the confidence to navigate care.

> **Important — JUNO is educational only.** It does **not** provide diagnosis, treatment, emergency advice, or clinical decisions, and it never replaces a qualified clinician. Always confirm with your clinician.

Most people don’t lack access to information. They lack **understanding, timing, prevention awareness,** and **confidence**. JUNO makes invisible health consequences visible.

---

## Table of contents

1. [Product strategy](#1-product-strategy)
2. [Information architecture](#2-information-architecture)
3. [User flows](#3-user-flows)
4. [Screen map](#4-screen-map)
5. [Design system](#5-design-system)
6. [Folder structure](#6-folder-structure)
7. [Components](#7-components)
8. [Implementation & tech](#8-implementation--tech)
9. [Mock data](#9-mock-data)
10. [Database schema](#10-database-schema)
11. [Deployment](#11-deployment)
12. [Local development](#12-local-development)
13. [GitHub setup](#13-github-setup)
14. [Future roadmap](#14-future-roadmap)

---

## 1. Product strategy

**Philosophy.** The most important healthcare happens before treatment. JUNO works in the quiet, invisible window where prevention is still cheap, easy, and optimistic — and turns dense, intimidating health information into something calm and usable.

**Audience.** Students, young professionals, families, underserved communities, and preventive-health-conscious users.

**What JUNO improves** — patient literacy, prevention awareness, healthcare navigation.

**What JUNO is NOT** — diagnosis, treatment, emergency advice, clinical decision-making, or a replacement for doctors. This constraint is a first-class product principle: every module carries an explicit, contextual disclaimer, avoids fake clinical certainty, and routes back to "confirm with your clinician."

**Brand.** Minimal, warm, trustworthy — *Apple Health × WHOOP × Notion × modern public health.* Calm, breathing room, cinematic, premium, optimistic.

---

## 2. Information architecture

```
/                          Landing — hero, prevention, literacy gap, modules, research
/modules                   Index of the seven interactive tools
  /future-patient          Module 1 — habit-driven 10-year trajectory
  /health-receipt          Module 2 — habits as an Apple-style receipt
  /prescription-translator Module 3 — plain-language reading of a note
  /care-compass            Module 4 — educational care-setting navigation
  /literacy-checker        Module 5 — readability + "Explain like I’m 15"
  /preventive-timeline     Module 6 — awareness moments by age
  /preventability-map      Module 7 — interactive India cartogram
/research                  Research terminal — articles, notes, field observations
  /[id]                    Individual research entry
/about                     Why JUNO exists + origin story timeline
/build                     Public roadmap + experiments
```

---

## 3. User flows

- **Curious visitor → first value.** Landing → *Start Exploring* → `/modules` → opens *My Future Patient* → adjusts habit sliders → *Meet yourself in 10 years* → sees trajectory, factors, risks, suggestions. No account required.
- **Confused patient → understanding.** Has a prescription/discharge note → *Prescription Translator* → pastes text → reads decoded shorthand, plain-language terms, and questions to ask their clinician.
- **Worried user → navigation.** Describes a concern → *Care Compass* → sees four care settings with educational emphasis bands and explicit uncertainty (emergency language triggers a safety callout).
- **Communicator → clearer writing.** Pastes medical text → *Literacy Checker* → reads Flesch score, jargon density, friendliness, highlighted terms, and an ELI15 rewrite.
- **All modules** compute **locally in the browser** — instant, private, and offline-capable.

---

## 4. Screen map

| Route | Type | Key elements |
|---|---|---|
| `/` | Static | Animated health-timeline hero, prevention stats, literacy-gap chart, module grid, research preview, CTA |
| `/modules` | Static | 7 module cards |
| `/modules/*` | Client | `ModuleShell` (number, tagline, contextual disclaimer) + interactive tool |
| `/research` | Static | Terminal-style index + cards |
| `/research/[id]` | SSG | Article view (prerendered per entry) |
| `/about` | Static | Manifesto, focus pillars, story timeline, is/isn’t grid |
| `/build` | Static | Status-tagged roadmap + experiments |
| `404` | Static | Branded not-found |

---

## 5. Design system

Tokenised via CSS variables in [`app/globals.css`](app/globals.css), surfaced to Tailwind in [`tailwind.config.ts`](tailwind.config.ts). Full **dark + light** support through `next-themes` (class strategy).

- **Color.** Warm off-white / deep warm-slate backgrounds; a teal-emerald **`juno`** brand scale (`juno-50…900`, inverted in dark mode) and a **`warm`** coral accent. Semantic tokens: `background`, `foreground`, `card`, `muted`, `border`, `ring`.
- **Type.** `Inter` (sans) + `IBM Plex Mono` (mono, used for data/receipts/research terminal).
- **Motion.** Framer Motion: reveal-on-scroll, staggered grids, animated SVG paths, ring counters, layout-animated nav pill, delightful loading spinner.
- **Primitives.** `.btn-primary`, `.btn-ghost`, `.surface`, `.pill`, `.field`, `.text-gradient`, `.eyebrow`, themed range sliders, glassmorphism, and a radial grid background.

---

## 6. Folder structure

```
.
├── app/
│   ├── layout.tsx            # Root layout, ThemeProvider, nav/footer, metadata
│   ├── page.tsx              # Landing
│   ├── globals.css           # Design tokens + component/utility layers
│   ├── loading.tsx           # Global loading state
│   ├── not-found.tsx         # 404
│   ├── sitemap.ts / robots.ts
│   ├── modules/              # Index + 7 module routes
│   ├── research/             # Index + [id]
│   ├── about/  └── build/
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── landing/              # Hero, ModuleCard, LiteracyGap
│   ├── modules/              # ModuleShell + 7 interactive modules
│   ├── providers/            # ThemeProvider
│   └── ui/                   # Icons, Reveal, Logo, controls, StatRing, etc.
├── lib/
│   ├── site.ts               # Nav, module metadata, disclaimer
│   ├── utils.ts              # cn, clamp, lerp, formatNumber
│   ├── supabase.ts           # Lazy, optional Supabase client
│   ├── health/               # Module logic (transparent heuristics)
│   └── data/                 # Mock data (timeline, india, research, build, landing)
├── supabase/schema.sql       # DB schema + RLS
└── README.md
```

---

## 7. Components

Reusable: `Navbar`, `Footer`, `Logo`, `ThemeToggle`, `Icon`/`Icons` (inline SVG set, zero icon deps), `Reveal`/`Stagger`/`StaggerItem`, `SectionHeading`, `StatRing`, `SliderField`, `Segmented`, `ChartTooltip`, `DisclaimerBanner`, `ModuleCard`, `ModuleShell`.

Each module is a self-contained client component reading pure logic from `lib/health/*`, so the math is testable and UI-agnostic.

---

## 8. Implementation & tech

- **Next.js 14 (App Router)** + **TypeScript** (strict)
- **Tailwind CSS** with a CSS-variable token system
- **Framer Motion** for animation
- **Recharts** for charts (area/line/bar), themed via CSS variables
- **Supabase** (optional backend) + **Vercel** (deploy target)
- Fully responsive, accessible focus states, reduced-bundle inline icons

The seven modules use **transparent, documented heuristics** — never opaque "AI" pretending to clinical certainty. Examples: weighted factor scoring for trajectories, the Flesch reading-ease formula for literacy, and a small glossary-driven jargon translator.

---

## 9. Mock data

All demo content lives in [`lib/data/`](lib/data):

- `landing.ts` — hero timeline, literacy-gap funnel, prevention stats
- `timeline.ts` — preventive awareness stages by age
- `india.ts` — tile-grid cartogram + **illustrative** state composites (clearly marked *not official statistics*)
- `research.ts` — articles, public-health notes, field observations
- `build.ts` — roadmap items + experiments

---

## 10. Database schema

See [`supabase/schema.sql`](supabase/schema.sql). JUNO is **fully functional without a database**; the schema powers optional, privacy-respecting features only.

- `profiles` — optional 1:1 user profile
- `future_patient_runs` — saved trajectories
- `receipt_runs` — saved monthly receipts
- `module_events` — anonymous, aggregate usage signal (no PII)

**Row Level Security** is enabled on every table — owner-only reads/writes for user data; anonymous insert-only for analytics. No clinical or diagnostic data is ever stored.

---

## 11. Deployment

**Vercel (recommended)**

1. Push to GitHub (see below).
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected.
3. (Optional) add env vars from `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. No env vars are required for the full experience.

**Supabase (optional).** Create a project, run `supabase/schema.sql` in the SQL editor, then add the URL + anon key as env vars.

---

## 12. Local development

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

Requirements: Node 18.18+ (developed on Node 22).

---

## 13. GitHub setup

```bash
git checkout -b claude/juno-healthcare-platform-n1vecr
git add .
git commit -m "feat: JUNO preventive healthcare & literacy platform"
git push -u origin claude/juno-healthcare-platform-n1vecr
```

Recommended repo hygiene: protect `main`, require PR review, and keep secrets in Vercel/GitHub Actions secrets (never commit `.env`).

---

## 14. Future roadmap

Tracked publicly on the **[/build](app/build/page.tsx)** page. Highlights:

- 🌐 Multilingual plain-language layer (Hindi-first)
- 💾 Save & revisit your trajectory (Supabase)
- 🩺 Clinician-reviewed glossary
- 📚 Offline-first literacy packs for low-connectivity regions
- 🎓 School & campus prevention programmes

---

<div align="center">

**JUNO** — understand your health before you need treatment.
*An educational prevention & literacy project. Not a substitute for professional medical care.*

</div>
