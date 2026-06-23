import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { modules, primaryNav, disclaimer, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/30">
      <div className="container-content py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {site.tagline} JUNO helps people understand healthcare before
              becoming patients — built for India.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Modules
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 text-sm">
              {modules.slice(0, 5).map((m) => (
                <li key={m.slug}>
                  <Link
                    href={m.href}
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card/60 p-5">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Important — </span>
            {disclaimer}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} JUNO. An educational prevention &amp; literacy project.</p>
          <p>Made with care for prevention-first healthcare.</p>
        </div>
      </div>
    </footer>
  );
}
