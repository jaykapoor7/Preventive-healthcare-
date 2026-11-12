# JUNO

Preventive health and patient-literacy tools for India. JUNO explains habits, prescriptions and care options in plain language so people can understand their health before they need treatment.

Live: https://preventive-healthcare-xi.vercel.app

JUNO is educational only. It does not diagnose, treat or give emergency advice, and it does not replace a clinician.

## What it does

Seven tools, all computed in the browser with no account:

- My Future Patient: set your current habits and see an illustrative 10-year health trajectory.
- Health Receipt: a month of sleep, movement, rest and preventive steps shown as an itemised receipt.
- Prescription Translator: paste a prescription or discharge note to get a plain-language reading and questions for your clinician.
- Care Compass: explains when people usually consider home monitoring, primary care, urgent care or emergency care, with the uncertainty shown.
- Health Literacy Checker: paste medical text to see its reading level and jargon, plus a simpler rewrite.
- Preventive Timeline: general prevention topics by age.
- Preventability Map: illustrative health-literacy and prevention figures by Indian state (not official statistics).

The site also has research notes (`/research`), an about page (`/about`) and a public roadmap (`/build`).

## Run locally

Requires Node 18.18 or later.

```bash
npm ci
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

No environment variables are needed. `.env.example` lists optional Supabase keys, and `supabase/schema.sql` holds the optional schema (profiles, saved runs, anonymous usage events, with row-level security).

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Recharts, next-themes. Optional Supabase. Deployed on Vercel.

Module logic lives in `lib/health/`, demo content in `lib/data/`, and design tokens in `app/globals.css`.
