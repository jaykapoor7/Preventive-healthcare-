import type { Metadata } from "next";
import { ModuleShell } from "@/components/modules/module-shell";
import { PreventabilityMap } from "@/components/modules/preventability-map";
import { getModule } from "@/lib/site";

const mod = getModule("preventability-map")!;

export const metadata: Metadata = {
  title: mod.name,
  description: mod.description,
};

export default function Page() {
  return (
    <ModuleShell
      module={mod}
      disclaimer={
        <>
          <span className="font-semibold text-foreground">Illustrative data.</span>{" "}
          The figures shown are composite, illustrative values for an
          educational demo. They are not official statistics and not for citation.
        </>
      }
    >
      <PreventabilityMap />
    </ModuleShell>
  );
}
