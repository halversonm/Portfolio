import type { APIRoute } from "astro";

/** /robots.txt — lets search engines crawl everything and points them at the sitemap. */
export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL("https://halversonweb.com")).origin;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
