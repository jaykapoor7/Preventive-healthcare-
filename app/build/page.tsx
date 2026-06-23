import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Icons } from "@/components/ui/icons";
import { roadmap, experiments, type RoadmapItem } from "@/lib/data/build";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Build",
  description:
    "JUNO’s public roadmap — shipped work, what we’re building, what we’re exploring, and ideas for the future.",
};

const statusMeta: Record<
  RoadmapItem["status"],
  { label: string; dot: string; chip: string }
> = {
  shipped: {
    label: "Shipped",
    dot: "bg-juno-500",
    chip: "bg-juno-500/10 text-juno-600 dark:text-juno-400",
  },
  building: {
    label: "Building",
    dot: "bg-warm",
    chip: "bg-warm/10 text-warm",
  },
  exploring: {
    label: "Exploring",
    dot: "bg-sky-400",
    chip: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  idea: {
    label: "Idea",
    dot: "bg-muted-foreground",
    chip: "bg-muted text-muted-foreground",
  },
};

const order: RoadmapItem["status"][] = ["shipped", "building", "exploring", "idea"];

export default function BuildPage() {
  return (
    <div className="container-content py-16">
      <SectionHeading
        eyebrow="Public roadmap"
        title="Building JUNO in the open"
        description="Prevention is iterative. Here’s what we’ve shipped, what we’re building, and the ideas we’re still exploring."
      />

      {/* Status legend */}
      <Reveal className="mt-8">
        <div className="flex flex-wrap gap-3">
          {order.map((s) => (
            <span key={s} className="pill">
              <span className={cn("h-2 w-2 rounded-full", statusMeta[s].dot)} />
              {statusMeta[s].label}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Roadmap columns */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Stagger className="space-y-4">
          {roadmap
            .filter((_, i) => i % 2 === 0)
            .map((item) => (
              <StaggerItem key={item.title}>
                <RoadmapCard item={item} />
              </StaggerItem>
            ))}
        </Stagger>
        <Stagger className="space-y-4" delayChildren={0.12}>
          {roadmap
            .filter((_, i) => i % 2 === 1)
            .map((item) => (
              <StaggerItem key={item.title}>
                <RoadmapCard item={item} />
              </StaggerItem>
            ))}
        </Stagger>
      </div>

      {/* Experiments */}
      <section className="mt-20">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Experiments in flight
        </h2>
        <Stagger className="mt-6 grid gap-5 md:grid-cols-3">
          {experiments.map((e) => (
            <StaggerItem key={e.title}>
              <div className="surface h-full p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-juno-500/10 text-juno-600 dark:text-juno-400">
                  <Icons.spark width={18} height={18} />
                </span>
                <h3 className="mt-4 font-semibold tracking-tight">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {e.note}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <Reveal className="mt-16">
        <div className="surface-muted p-6 text-sm leading-relaxed text-muted-foreground">
          Have an idea for a module or a literacy gap we should close? JUNO is a
          living project — the roadmap evolves with the people it’s built for.
        </div>
      </Reveal>
    </div>
  );
}

function RoadmapCard({ item }: { item: RoadmapItem }) {
  const meta = statusMeta[item.status];
  return (
    <div className="surface p-6">
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
            meta.chip
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
          {meta.label}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {item.quarter}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </div>
  );
}
