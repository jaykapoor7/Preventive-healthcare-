import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icons } from "@/components/ui/icons";
import { DisclaimerBanner } from "@/components/ui/disclaimer";
import { research, getResearch } from "@/lib/data/research";

export function generateStaticParams() {
  return research.map((r) => ({ id: r.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const entry = getResearch(params.id);
  if (!entry) return { title: "Research" };
  return { title: entry.title, description: entry.summary };
}

export default function ResearchEntryPage({
  params,
}: {
  params: { id: string };
}) {
  const entry = getResearch(params.id);
  if (!entry) notFound();

  return (
    <article className="container-content py-16">
      <Link
        href="/research"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <Icons.arrowRight width={15} height={15} className="rotate-180" />
        Research
      </Link>

      <header className="mt-6 max-w-prose">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="pill">{entry.kind}</span>
          <span>{entry.date}</span>
          <span>·</span>
          <span>{entry.readingTime}</span>
        </div>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          {entry.title}
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {entry.summary}
        </p>
      </header>

      <div className="mt-10 max-w-prose space-y-6 text-base leading-relaxed">
        {entry.body.map((p, i) => (
          <p key={i} className="text-pretty">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-1.5">
        {entry.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
          >
            #{t}
          </span>
        ))}
      </div>

      <div className="mt-10 max-w-prose">
        <DisclaimerBanner />
      </div>
    </article>
  );
}
