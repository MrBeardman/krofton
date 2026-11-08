import type { APIRoute } from 'astro';

// Preview phase: keep crawlers out until the site runs on krofton.cz (docs/WEBSITE.md, "Open").
export const GET: APIRoute = () =>
  new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
