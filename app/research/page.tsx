import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Icons } from "@/components/ui/icons";
import { research } from "@/lib/data/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Articles, public-health notes and field observations on prevention and patient literacy.",
};

export default function ResearchPage() {
  return (
    <div className="container-content py-16">
      <SectionHeading
        eyebrow="Research"
        title="Research notes"
        description="Articles, public-health notes and field observations behind JUNO’s tools."
      />

      {/* Index */}
      <Reveal className="mt-12">
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="flex items-center justify-between gap-4 border-b border-border bg-muted/40 px-5 py-3 font-mono text-xs text-muted-foreground">
            <span>Index</span>
            <span>
              {research.length} entries · newest first
            </span>
          </div>
          <div className="p-3 font-mono text-sm">
            {research.map((r) => (
              <Link
                key={r.id}
                href={`/research/${r.id}`}
                className="group flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl px-3 py-2.5 transition hover:bg-muted/60"
              >
                <span className="text-muted-foreground">{r.date}</span>
                <span className="rounded bg-juno-500/10 px-2 py-0.5 text-[11px] text-juno-700 dark:text-juno-400">
                  {r.kind}
                </span>
                <span className="font-medium text-foreground group-hover:text-juno-700 dark:group-hover:text-juno-400">
                  {r.title}
                </span>
                <Icons.arrowRight
                  width={14}
                  height={14}
                  className="ml-auto hidden text-muted-foreground transition group-hover:translate-x-1 sm:block"
                />
              </Link>
            ))}
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
