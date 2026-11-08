# KROFTON website – handover

Read `docs/WEBSITE.md` first: the client's old site, what is built, decisions, new copy awaiting approval, open items.

- Stack: Astro 7, `output: 'static'` + `@astrojs/node` (only `/api/contact` runs on the server). Skill: `astro-marketing-site`.
- Content: `src/data/site.ts` (all texts, facts, services, projects, FAQ). Wrap visible Czech text in `nb()`
  (non-breaking space after one-letter words).
- Sections: `src/components/home/NN-*.astro`, each with its own `<style is:global>`, prefix `kr-`.
  Tokens and reveals: `src/styles/site.css`. Behaviour: `src/scripts/site.ts`.
- Photos: `public/img/<name>-<width>.webp`, widths listed in `src/data/photos.json`; use `Photo.astro`.
  Originals live in `C:\Data\Dev\krofton-scrape\img` (not in the repo).
- Motion: reveals via `[data-reveal]` (`--d` step), line art via `[data-art]` + `[data-draw]`/`[data-pop]`,
  loops in `[data-loop]` pause off screen; all of it is static under `prefers-reduced-motion`.
- Verify: `npm run build && npm run check:format`, serve `dist`, run the verify-loop capture (profile astro-site).
