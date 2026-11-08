// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

/**
 * Two targets from one repo:
 * - DEPLOY_TARGET=pages (GitHub Pages workflow): fully static, under /krofton/, enquiry form shown but disabled.
 * - default (Hostinger Node.js preview): static page + the /api/contact endpoint on @astrojs/node.
 */
const pages = process.env.DEPLOY_TARGET === 'pages';

/** The enquiry endpoint exists only where a server runs it. */
const contactApi = {
  name: 'krofton-contact-api',
  hooks: {
    /** @param {{ injectRoute: (r: { pattern: string; entrypoint: string; prerender?: boolean }) => void }} o */
    'astro:config:setup': ({ injectRoute }) =>
      injectRoute({ pattern: '/api/contact', entrypoint: './src/server/contact.ts', prerender: false }),
  },
};

export default defineConfig({
  // Pages demo: the GitHub Pages address. Node preview: the client's domain (noindex until it moves there).
  site: pages ? 'https://mrbeardman.github.io' : 'https://www.krofton.cz',
  base: pages ? '/krofton/' : '/',
  trailingSlash: 'always',
  output: 'static',
  ...(pages ? {} : { adapter: node({ mode: 'standalone' }) }),
  build: { inlineStylesheets: 'always', format: 'directory' },
  compressHTML: true,
  security: { checkOrigin: false },
  vite: { define: { 'import.meta.env.PUBLIC_FORM_LIVE': JSON.stringify(!pages) } },
  integrations: [...(pages ? [] : [contactApi]), sitemap({ filter: (page) => !page.includes('/api/') })],
});
