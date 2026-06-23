import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function DisclaimerBanner({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-warm/40 bg-warm/10 px-4 py-3",
        className
      )}
    >
      <Icons.shield
        width={18}
        height={18}
        className="mt-0.5 shrink-0 text-warm"
      />
      <p className="text-xs leading-relaxed text-muted-foreground">
        {children ?? (
          <>
            <span className="font-semibold text-foreground">
              Educational only.
            </span>{" "}
            This is not diagnosis, treatment, or emergency advice, and never
            replaces a clinician. Always confirm with your clinician.
          </>
        )}
      </p>
    </div>
  );
}
