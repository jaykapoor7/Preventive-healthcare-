"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/ui/icons";
import { heroTimeline } from "@/lib/data/landing";

const W = 900;
const H = 360;

function buildPath(points: { age: number; signal: number; label: string }[]) {
  const minAge = points[0].age;
  const maxAge = points[points.length - 1].age;
  const x = (age: number) =>
    ((age - minAge) / (maxAge - minAge)) * (W - 80) + 40;
  const y = (signal: number) => H - 60 - (signal / 100) * (H - 110);

  const coords = points.map((p) => ({ x: x(p.age), y: y(p.signal), ...p }));
  let d = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const cur = coords[i];
    const cx = (prev.x + cur.x) / 2;
    d += ` C ${cx} ${prev.y}, ${cx} ${cur.y}, ${cur.x} ${cur.y}`;
  }
  return { d, coords };
}

export function Hero() {
  const { d, coords } = buildPath(heroTimeline);
  const areaPath = `${d} L ${coords[coords.length - 1].x} ${H - 40} L ${
    coords[0].x
  } ${H - 40} Z`;

  return (
    <section className="relative overflow-hidden">
      {/* Ambient gradient field */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-juno-500/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[30%] h-[280px] w-[280px] rounded-full bg-warm/20 blur-[100px]" />
        <div className="absolute inset-0 bg-grid-fade [background-size:26px_26px] opacity-40 mask-fade-b" />
      </div>

      <div className="container-content pb-10 pt-20 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="pill mx-auto mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-juno-500 animate-pulse-soft" />
            Preventive healthcare · Patient literacy · India
          </span>

          <h1 className="text-balance text-6xl font-bold tracking-tight md:text-8xl">
            JUNO
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-2xl font-semibold tracking-tight md:text-4xl">
            Healthcare shouldn’t start{" "}
            <span className="text-gradient">at the hospital.</span>
          </p>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
            Understand your health before you need treatment. JUNO makes
            invisible health consequences visible — and helps you navigate
            healthcare with confidence.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/modules" className="btn-primary px-7 py-3 text-base">
              Start Exploring
              <Icons.arrowRight width={18} height={18} />
            </Link>
            <Link href="/about" className="btn-ghost px-7 py-3 text-base">
              Why JUNO exists
            </Link>
          </div>
        </motion.div>

        {/* Animated health timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="surface overflow-hidden p-2 shadow-2xl shadow-juno-500/5">
            <div className="rounded-[1.4rem] border border-border bg-gradient-to-b from-muted/30 to-transparent p-6">
              <div className="mb-4 flex items-center justify-between px-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  A life in prevention
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  habit-driven signal · illustrative
                </p>
              </div>
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="w-full"
                role="img"
                aria-label="An illustrative health signal across life stages"
              >
                <defs>
                  <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgb(var(--juno-500))" />
                    <stop offset="100%" stopColor="rgb(var(--warm))" />
                  </linearGradient>
                  <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(var(--juno-500))" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="rgb(var(--juno-500))" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* baseline grid */}
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1="40"
                    x2={W - 40}
                    y1={60 + i * 70}
                    y2={60 + i * 70}
                    stroke="rgb(var(--border))"
                    strokeDasharray="2 6"
                  />
                ))}

                <motion.path
                  d={areaPath}
                  fill="url(#hero-area)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.6, delay: 0.8 }}
                />
                <motion.path
                  d={d}
                  fill="none"
                  stroke="url(#hero-line)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.4, ease: "easeInOut" }}
                />

                {coords.map((c, i) => (
                  <motion.g
                    key={c.age}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.18, duration: 0.4 }}
                  >
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r="14"
                      fill="rgb(var(--juno-500))"
                      opacity="0.12"
                    />
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r="5"
                      fill="rgb(var(--card))"
                      stroke="rgb(var(--juno-500))"
                      strokeWidth="2.5"
                    />
                    <text
                      x={c.x}
                      y={H - 18}
                      textAnchor="middle"
                      className="fill-[rgb(var(--muted-foreground))] font-mono text-[11px]"
                    >
                      {c.age}
                    </text>
                    <text
                      x={c.x}
                      y={c.y - 18}
                      textAnchor="middle"
                      className="fill-[rgb(var(--foreground))] text-[11px] font-medium"
                    >
                      {c.label}
                    </text>
                  </motion.g>
                ))}
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
