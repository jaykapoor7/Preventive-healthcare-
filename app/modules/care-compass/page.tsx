import type { Metadata } from "next";
import { ModuleShell } from "@/components/modules/module-shell";
import { CareCompass } from "@/components/modules/care-compass";
import { getModule } from "@/lib/site";

const mod = getModule("care-compass")!;

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
          <span className="font-semibold text-foreground">Navigation, not triage.</span>{" "}
          Care Compass explains care settings in general terms. It does not
          diagnose or assess emergencies. In an emergency, call your local
          emergency number.
        </>
      }
    >
      <CareCompass />
    </ModuleShell>
  );
}
