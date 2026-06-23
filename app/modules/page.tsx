import type { Metadata } from "next";
import { ModuleCard } from "@/components/landing/module-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { DisclaimerBanner } from "@/components/ui/disclaimer";
import { modules } from "@/lib/site";

export const metadata: Metadata = {
  title: "Modules",
  description:
    "Seven calm, interactive tools for understanding your health before treatment — prevention, literacy, and navigation.",
};

export default function ModulesPage() {
  return (
    <div className="container-content py-16">
      <SectionHeading
        eyebrow="Interactive modules"
        title="Seven ways to understand your health"
        description="Each tool turns something invisible — a habit, a prescription, a worry, a statistic — into something calm and legible. Nothing here is diagnosis."
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
