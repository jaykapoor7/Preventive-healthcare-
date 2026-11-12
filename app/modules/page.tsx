import type { Metadata } from "next";
import { ModuleCard } from "@/components/landing/module-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { DisclaimerBanner } from "@/components/ui/disclaimer";
import { modules } from "@/lib/site";

export const metadata: Metadata = {
  title: "Modules",
  description:
    "Seven interactive tools for understanding your health before you need treatment.",
};

export default function ModulesPage() {
  return (
    <div className="container-content py-16">
      <SectionHeading
        eyebrow="Interactive modules"
        title="Seven ways to understand your health"
        description="Each one takes something easy to ignore or hard to read, such as a habit, a prescription or a statistic, and makes it clear. None of them diagnose."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <ModuleCard key={m.slug} module={m} />
        ))}
      </div>

      <div className="mt-12 max-w-2xl">
        <DisclaimerBanner />
      </div>
    </div>
  );
}
