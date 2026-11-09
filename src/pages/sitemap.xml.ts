import type { APIRoute } from "astro";
import { projects } from "../data/projects";

/**
 * /sitemap.xml — built from the real pages, so it never goes stale:
 *  • every page file in src/pages is listed automatically
 *  • each project in src/data/projects.ts gets its own /work/<slug>/ entry
 * Pages that shouldn't appear in search (404, thank-you) and dynamic templates are skipped.
 * All URLs end in "/" to match the canonical addresses.
 */
const SKIP = new Set(["404", "thank-you"]);

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL("https://halversonweb.com")).origin;

  // "./about.astro" -> "/about/", "./index.astro" -> "/", "./work/index.astro" -> "/work/"
  const pageFiles = Object.keys(import.meta.glob("./**/*.astro"));
  const staticPaths = pageFiles
    .map((file) => file.replace(/^\.\//, "").replace(/\.astro$/, "").replace(/(^|\/)index$/, ""))
    .filter((p) => !p.includes("[") && !SKIP.has(p))
    .map((p) => (p === "" ? "/" : `/${p}/`));

  const projectPaths = projects.map((project) => `/work/${project.slug}/`);
  const urls = [...new Set([...staticPaths, ...projectPaths])].sort();

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((path) => `  <url><loc>${base}${path}</loc></url>`).join("\n") +
    `\n</urlset>\n`;

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
