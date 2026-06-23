import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Icons } from "@/components/ui/icons";
import { research } from "@/lib/data/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Articles, public-health notes, and field observations behind JUNO — a research terminal for prevention and patient literacy.",
};

export default function ResearchPage() {
  return (
    <div className="container-content py-16">
      <SectionHeading
        eyebrow="Research terminal"
        title="Notes from the prevention frontier"
        description="The thinking behind JUNO — articles, public-health notes, and field observations on literacy, prevention, and navigation."
      />

      {/* Terminal-style index */}
      <Reveal className="mt-12">
        <div className="overflow-hidden rounded-3xl border border-border bg-[#0c1110] text-juno-100 shadow-2xl dark:bg-card">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-rose-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-juno-400/80" />
            <span className="ml-3 font-mono text-xs text-white/50">
              juno@research ~ % ls -la /notes
            </span>
          </div>
          <div className="p-5 font-mono text-sm">
            <p className="text-white/40">
              # {research.length} entries · sorted by recency
            </p>
            <div className="mt-3 space-y-1">
              {research.map((r) => (
                <Link
                  key={r.id}
                  href={`/research/${r.id}`}
                  className="group flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg px-2 py-2 transition hover:bg-white/5"
                >
                  <span className="text-white/40">{r.date}</span>
                  <span className="rounded bg-juno-400/15 px-2 py-0.5 text-[11px] text-juno-300">
                    {r.kind}
                  </span>
                  <span className="font-medium text-white group-hover:text-juno-300">
                    {r.title}
                  </span>
                  <Icons.arrowRight
                    width={14}
                    height={14}
                    className="ml-auto text-white/30 transition group-hover:translate-x-1 group-hover:text-juno-300"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Cards */}
      <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
        {research.map((r) => (
          <StaggerItem key={r.id}>
            <Link
              href={`/research/${r.id}`}
              className="group block h-full rounded-3xl border border-border bg-card p-7 transition hover:border-juno-400/50"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="pill">{r.kind}</span>
                <span>{r.readingTime}</span>
                <span>·</span>
                <span>{r.date}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {r.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
