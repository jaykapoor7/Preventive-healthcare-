import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Icons } from "@/components/ui/icons";
import { DisclaimerBanner } from "@/components/ui/disclaimer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why JUNO exists — a preventive healthcare and patient-literacy platform built for India, focused on access, understanding, and prevention.",
};

const focus = [
  {
    icon: "shield" as const,
    title: "Access",
    body: "Meeting people where they are — before a hospital, before a crisis, in the language and context of everyday life.",
  },
  {
    icon: "book" as const,
    title: "Understanding",
    body: "Turning dense, intimidating health information into something calm, readable, and genuinely usable.",
  },
  {
    icon: "heart" as const,
    title: "Prevention",
    body: "Making the slow, invisible consequences of habits visible while there’s still time to change them.",
  },
];

const story = [
  {
    year: "The problem",
    title: "Information is everywhere. Understanding isn’t.",
    body: "We kept seeing the same gap: people with phones full of health information who still felt lost, anxious, and unsure where to begin.",
  },
  {
    year: "The insight",
    title: "Prevention fails when feedback is slow.",
    body: "Habits compound over a decade. By the time consequences are felt, the easiest window to act has often passed.",
  },
  {
    year: "The idea",
    title: "Make the invisible visible — calmly.",
    body: "Not fear, not dashboards pretending to be doctors. Tools that build literacy, confidence, and prevention awareness.",
  },
  {
    year: "JUNO today",
    title: "Seven tools, one philosophy.",
    body: "From My Future Patient to the Preventability Map, every module helps people understand healthcare before becoming patients.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-content py-16">
      <SectionHeading
        eyebrow="About JUNO"
        title="Healthcare shouldn’t start at the hospital."
        description="JUNO is a preventive healthcare and patient-literacy platform built for India. Most people don’t lack access to information — they lack understanding, timing, prevention awareness, and the confidence to navigate healthcare."
      />

      {/* Manifesto */}
      <Reveal className="mt-12">
        <div className="surface relative overflow-hidden p-8 md:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-juno-500/10 blur-3xl" />
          <p className="max-w-3xl text-balance text-2xl font-medium leading-relaxed tracking-tight md:text-3xl">
            We believe the most important healthcare happens{" "}
            <span className="text-gradient">before you ever need treatment</span>{" "}
            — in understanding, in prevention, and in the quiet confidence to
            ask the right questions.
          </p>
        </div>
      </Reveal>

      {/* Focus */}
      <section className="mt-20">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          What we focus on
        </h2>
        <Stagger className="mt-6 grid gap-5 md:grid-cols-3">
          {focus.map((f) => {
            const I = Icons[f.icon];
            return (
              <StaggerItem key={f.title}>
                <div className="surface h-full p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-juno-500/10 text-juno-600 dark:text-juno-400">
                    <I width={20} height={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.body}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* Story timeline */}
      <section className="mt-20">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          The story
        </h2>
        <div className="relative mt-8 space-y-8 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-2rem)] before:w-px before:bg-border">
          {story.map((s, i) => (
            <Reveal key={s.year} delay={i * 0.06} className="relative pl-12">
              <span className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border-2 border-juno-500 bg-card">
                <span className="h-2 w-2 rounded-full bg-juno-500" />
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-juno-600 dark:text-juno-400">
                {s.year}
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What JUNO is not */}
      <section className="mt-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="surface p-7">
            <h3 className="text-lg font-semibold tracking-tight text-juno-600 dark:text-juno-400">
              What JUNO improves
            </h3>
            <ul className="mt-4 space-y-3">
              {["Patient literacy", "Prevention awareness", "Healthcare navigation", "Confidence and timing"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-3 text-sm">
                    <Icons.check width={16} height={16} className="text-juno-500" />
                    {t}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="surface p-7">
            <h3 className="text-lg font-semibold tracking-tight text-warm">
              What JUNO is not
            </h3>
            <ul className="mt-4 space-y-3">
              {["Diagnosis", "Treatment", "Emergency advice", "A replacement for your doctor"].map(
                (t) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <Icons.close width={16} height={16} className="text-warm" />
                    {t}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <DisclaimerBanner />
        </div>
      </section>

      {/* CTA */}
      <Reveal className="mt-20">
        <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-border bg-muted/30 p-8 text-center md:flex-row md:text-left">
          <p className="text-lg font-medium">
            Ready to understand your health before you need treatment?
          </p>
          <Link href="/modules" className="btn-primary px-6 py-3">
            Start Exploring
            <Icons.arrowRight width={18} height={18} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
