import type { Metadata } from "next";
import { ModuleShell } from "@/components/modules/module-shell";
import { PrescriptionTranslator } from "@/components/modules/prescription-translator";
import { getModule } from "@/lib/site";

const mod = getModule("prescription-translator")!;

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
          <span className="font-semibold text-foreground">Never a diagnosis.</span>{" "}
          This tool only explains words and instructions in plain language. It
          never diagnoses or recommends medication changes. Confirm with your
          clinician.
        </>
      }
    >
      <PrescriptionTranslator />
    </ModuleShell>
  );
}
