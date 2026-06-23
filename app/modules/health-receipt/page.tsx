import type { Metadata } from "next";
import { ModuleShell } from "@/components/modules/module-shell";
import { HealthReceipt } from "@/components/modules/health-receipt";
import { getModule } from "@/lib/site";

const mod = getModule("health-receipt")!;

export const metadata: Metadata = {
  title: mod.name,
  description: mod.description,
};

export default function Page() {
  return (
    <ModuleShell module={mod}>
      <HealthReceipt />
    </ModuleShell>
  );
}
