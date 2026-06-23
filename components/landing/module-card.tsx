"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icons, type IconName } from "@/components/ui/icons";
import { type ModuleMeta } from "@/lib/site";
import { cn } from "@/lib/utils";

const accentMap: Record<ModuleMeta["accent"], string> = {
  juno: "from-juno-500/15 to-juno-500/0 text-juno-600 dark:text-juno-400",
  warm: "from-warm/15 to-warm/0 text-warm",
  sky: "from-sky-500/15 to-sky-500/0 text-sky-600 dark:text-sky-400",
  violet: "from-violet-500/15 to-violet-500/0 text-violet-600 dark:text-violet-400",
};

export function ModuleCard({ module }: { module: ModuleMeta }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="h-full"
    >
      <Link
        href={module.href}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-colors hover:border-juno-400/50"
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            accentMap[module.accent]
          )}
        />
        <div className="relative flex items-start justify-between">
          <span
            className={cn(
              "grid h-12 w-12 place-items-center rounded-2xl bg-muted/70",
              accentMap[module.accent].split(" ").slice(-2).join(" ")
            )}
          >
            {Icons[module.icon as IconName]?.({ width: 22, height: 22 })}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {module.number}
          </span>
        </div>

        <h3 className="relative mt-5 text-lg font-semibold tracking-tight">
          {module.name}
        </h3>
        <p className="relative mt-1 text-sm font-medium text-juno-600 dark:text-juno-400">
          {module.tagline}
        </p>
        <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {module.description}
        </p>

        <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
          Open module
          <Icons.arrowRight
            width={16}
            height={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </Link>
    </motion.div>
  );
}
