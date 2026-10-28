import type { APIRoute } from 'astro';
import { getArtworks } from '../lib/artworks';
import { galleryPages } from '../data/gallery-pages';

export const prerender = true;

const escapeXml = (value: string) => value.replace(/[<>&"']/g, character => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[character]!);

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('Configure Astro site before generating the sitemap.');
  const absolute = (path: string) => escapeXml(new URL(path, site).href);
  const pairs = [
    { ro: '/', en: '/en/' },
    ...galleryPages.map(page => ({ ro: page.ro, en: page.en })),
    ...getArtworks('ro').map(artwork => ({
      ro: artwork.url,
      en: `/en/artworks/${artwork.slug}/`,
    })),
  ];
  const urls = pairs.flatMap(pair => [pair.ro, pair.en].map(path => `  <url>
    <loc>${absolute(path)}</loc>
    <xhtml:link rel="alternate" hreflang="ro" href="${absolute(pair.ro)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${absolute(pair.en)}" />
  </url>`));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
