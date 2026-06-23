import type { Metadata } from "next";
import { ModuleShell } from "@/components/modules/module-shell";
import { LiteracyChecker } from "@/components/modules/literacy-checker";
import { getModule } from "@/lib/site";

const mod = getModule("literacy-checker")!;

export const metadata: Metadata = {
  title: mod.name,
  description: mod.description,
};

export default function Page() {
  return (
    <ModuleShell module={mod}>
      <LiteracyChecker />
    </ModuleShell>
  );
}
