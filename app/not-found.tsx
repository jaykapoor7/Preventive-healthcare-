import Link from "next/link";
import { Icons } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <div className="container-content grid min-h-[70vh] place-items-center py-20 text-center">
      <div>
        <p className="font-mono text-7xl font-bold tracking-tight text-gradient">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          This page isn’t on the map.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you’re looking for doesn’t exist.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary px-6 py-3">
            Back home
            <Icons.arrowRight width={18} height={18} />
          </Link>
          <Link href="/modules" className="btn-ghost px-6 py-3">
            Browse modules
          </Link>
        </div>
      </div>
    </div>
  );
}
