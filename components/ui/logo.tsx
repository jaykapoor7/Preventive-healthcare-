import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="JUNO home"
    >
      <span className="relative grid h-8 w-8 place-items-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
          <defs>
            <linearGradient id="juno-mark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgb(var(--juno-500))" />
              <stop offset="100%" stopColor="rgb(var(--warm))" />
            </linearGradient>
          </defs>
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="url(#juno-mark)"
            strokeWidth="2.2"
            strokeDasharray="66 24"
            strokeLinecap="round"
            className="origin-center transition-transform duration-700 group-hover:rotate-[120deg]"
          />
          <path
            d="M9 17.5l3.5 3.5L23 11"
            fill="none"
            stroke="url(#juno-mark)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {withWordmark && (
        <span className="text-lg font-semibold tracking-tight">JUNO</span>
      )}
    </Link>
  );
}
