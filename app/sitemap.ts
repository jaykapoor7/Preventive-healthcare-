import type { MetadataRoute } from "next";
import { site, modules } from "@/lib/site";
import { research } from "@/lib/data/research";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const staticRoutes = ["", "/modules", "/research", "/about", "/build"].map(
    (p) => ({
      url: `${base}${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })
  );

  const moduleRoutes = modules.map((m) => ({
    url: `${base}${m.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const researchRoutes = research.map((r) => ({
    url: `${base}/research/${r.id}`,
    lastModified: new Date(r.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...moduleRoutes, ...researchRoutes];
}
