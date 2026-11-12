import type { Metadata } from "next";
import { ModuleShell } from "@/components/modules/module-shell";
import { FuturePatient } from "@/components/modules/future-patient";
import { getModule } from "@/lib/site";

const mod = getModule("future-patient")!;

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
          <span className="font-semibold text-foreground">Education, not prediction.</span>{" "}
          These scores are illustrative habit-based estimates, not clinical
          risk, diagnosis or certainty. Always confirm with your clinician.
        </>
      }
    >
      <FuturePatient />
    </ModuleShell>
  );
}
