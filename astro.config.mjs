// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // The client's domain. The preview runs on a temporary Hostinger address with noindex (docs/WEBSITE.md).
  site: 'https://www.krofton.cz',
  trailingSlash: 'always',
  // Pages are pre-rendered to static HTML; only /api/contact runs on the Node server.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  build: { inlineStylesheets: 'always', format: 'directory' },
  compressHTML: true,
  security: { checkOrigin: false },
  integrations: [sitemap({ filter: (page) => !page.includes('/api/') })],
});
