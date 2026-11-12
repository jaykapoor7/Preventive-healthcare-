import type { Metadata } from "next";
import { ModuleShell } from "@/components/modules/module-shell";
import { PreventiveTimeline } from "@/components/modules/preventive-timeline";
import { getModule } from "@/lib/site";

const mod = getModule("preventive-timeline")!;

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
          <span className="font-semibold text-foreground">General, not personal.</span>{" "}
          This timeline shows population-level awareness moments for education.
          It is not an individual medical schedule. Confirm what’s right for you with
          your clinician.
        </>
      }
    >
      <PreventiveTimeline />
    </ModuleShell>
  );
}
