import { createFileRoute } from "@tanstack/react-router";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const host = request.headers.get("host") || "www.southernstormsheltersllc.com";
        const proto = request.headers.get("x-forwarded-proto") || "https";
        const BASE_URL = `${proto}://${host}`;

        const entries: SitemapEntry[] = [
          { path: "", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "weekly", priority: "0.9" },
          { path: "/services/in-ground-prefabricated-storm-shelters", changefreq: "weekly", priority: "0.9" },
          { path: "/services/custom-built-storm-shelters", changefreq: "weekly", priority: "0.9" },
          { path: "/free-quote", changefreq: "weekly", priority: "0.9" },
          { path: "/projects", changefreq: "monthly", priority: "0.8" },
          { path: "/reviews", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
        ];

        const urls = entries.map(
          (e) =>
            `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
