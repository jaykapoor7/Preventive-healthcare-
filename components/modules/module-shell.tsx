import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { DisclaimerBanner } from "@/components/ui/disclaimer";
import { Reveal } from "@/components/ui/reveal";
import { type ModuleMeta } from "@/lib/site";

export function ModuleShell({
  module,
  children,
  disclaimer,
}: {
  module: ModuleMeta;
  children: React.ReactNode;
  disclaimer?: React.ReactNode;
}) {
  return (
    <div className="container-content py-12 md:py-16">
      <Link
        href="/modules"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <Icons.arrowRight width={15} height={15} className="rotate-180" />
        All modules
      </Link>

      <Reveal className="mt-6">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-juno-700 dark:text-juno-400">
            {module.number}
          </span>
          <p className="text-sm font-medium text-muted-foreground">
            {module.tagline}
          </p>
        </div>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          {module.name}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {module.description}
        </p>
      </Reveal>

      <div className="mt-6 max-w-2xl">
        <DisclaimerBanner>{disclaimer}</DisclaimerBanner>
      </div>

      <div className="mt-10">{children}</div>
    </div>
  );
}
