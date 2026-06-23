import Link from "next/link";
import { Hero } from "@/components/landing/hero";
import { ModuleCard } from "@/components/landing/module-card";
import { LiteracyGap } from "@/components/landing/literacy-gap";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Icons } from "@/components/ui/icons";
import { DisclaimerBanner } from "@/components/ui/disclaimer";
import { modules } from "@/lib/site";
import { whyPrevention, preventionStats } from "@/lib/data/landing";
import { research } from "@/lib/data/research";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Trust / what JUNO is not */}
      <section className="container-content mt-8">
        <Reveal>
          <div className="surface-muted flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                JUNO is not diagnosis, treatment, or emergency advice.
              </span>{" "}
              It exists to improve patient literacy, prevention awareness, and
              healthcare navigation — and never replaces your clinician.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Literacy", "Prevention", "Navigation"].map((t) => (
                <span key={t} className="pill">
                  <Icons.check width={14} height={14} className="text-juno-500" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Why prevention matters */}
      <section className="container-content mt-28">
        <SectionHeading
          eyebrow="Why prevention matters"
          title="The most important healthcare happens before you’re a patient"
          description="Half of what shapes our health is decided long before a hospital is involved. JUNO works in that quiet, invisible window — while there’s still time to act."
        />

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {whyPrevention.map((item) => (
            <StaggerItem key={item.title}>
              <div className="surface h-full p-7">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-juno-500/10 text-juno-600 dark:text-juno-400">
                  <Icons.heart width={20} height={20} />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-6 grid gap-5 sm:grid-cols-3">
          {preventionStats.map((s) => (
            <StaggerItem key={s.stat}>
              <div className="rounded-3xl border border-border bg-gradient-to-br from-muted/40 to-transparent p-6">
                <p className="text-4xl font-bold tracking-tight text-gradient">
                  {s.stat}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Patient literacy gap */}
      <section className="container-content mt-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="The patient literacy gap"
            title="Information isn’t the problem. Understanding is."
            description="People can hold a prescription, a discharge note, and a search engine — and still not know what any of it means for the next 48 hours. JUNO closes that distance."
          />
          <LiteracyGap />
        </div>
      </section>

      {/* Interactive modules */}
      <section className="container-content mt-28">
        <SectionHeading
          eyebrow="Interactive modules"
          title="Seven calm tools for understanding your health"
          description="Each module turns something invisible — a habit, a prescription, a worry, a statistic — into something you can see and act on."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <ModuleCard key={m.slug} module={m} />
          ))}
        </div>
      </section>

      {/* Research preview */}
      <section className="container-content mt-28">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Research"
            title="Notes from the prevention frontier"
            description="Articles, public-health notes, and field observations behind the product."
          />
          <Link
            href="/research"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-foreground hover:text-juno-600 md:inline-flex dark:hover:text-juno-400"
          >
            All research
            <Icons.arrowRight width={16} height={16} />
          </Link>
        </div>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
          {research.slice(0, 2).map((r) => (
            <StaggerItem key={r.id}>
              <Link
                href={`/research/${r.id}`}
                className="group block h-full rounded-3xl border border-border bg-card p-7 transition hover:border-juno-400/50"
              >
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="pill">{r.kind}</span>
                  <span>{r.readingTime}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {r.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-juno-600 dark:text-juno-400">
                  Read note
                  <Icons.arrowRight
                    width={16}
                    height={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="container-content mt-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl border border-border bg-gradient-to-br from-juno-500/10 via-card to-warm/10 p-10 text-center md:p-16">
            <div className="pointer-events-none absolute inset-0 bg-grid-fade [background-size:24px_24px] opacity-30" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
                Meet the version of yourself prevention is trying to protect.
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground md:text-lg">
                Start with one module. No account, no diagnosis — just a clearer
                picture of your health.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/modules/future-patient"
                  className="btn-primary px-7 py-3 text-base"
                >
                  Meet your future patient
                  <Icons.arrowRight width={18} height={18} />
                </Link>
                <Link href="/modules" className="btn-ghost px-7 py-3 text-base">
                  Browse all modules
                </Link>
              </div>
              <div className="mx-auto mt-8 max-w-xl">
                <DisclaimerBanner />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
