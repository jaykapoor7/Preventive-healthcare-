export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-5">
        <span className="relative grid h-16 w-16 place-items-center">
          <svg viewBox="0 0 32 32" className="h-16 w-16 animate-spin [animation-duration:2.4s]">
            <defs>
              <linearGradient id="load-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgb(var(--juno-500))" />
                <stop offset="100%" stopColor="rgb(var(--warm))" />
              </linearGradient>
            </defs>
            <circle
              cx="16"
              cy="16"
              r="13"
              fill="none"
              stroke="url(#load-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="50 30"
            />
          </svg>
          <span className="absolute h-2.5 w-2.5 rounded-full bg-juno-500 animate-pulse-soft" />
        </span>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Preparing your view…
        </p>
      </div>
    </div>
  );
}
