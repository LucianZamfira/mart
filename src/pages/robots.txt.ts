import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('Configure Astro site before generating robots.txt.');
  return new Response(`User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', site).href}
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
