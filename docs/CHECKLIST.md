# Project checklist (KROFTON) – read with the verify-loop profile astro-site

- 2026-11-08 Opening hours: the contact block shows a placeholder. Before the teaser goes to the client, fill in
  real hours (07-Contact.astro + `openingHours` in Base.astro JSON-LD) or decide the placeholder stays.
- 2026-11-08 Before/after Makovského: the two photos are not the same view (the "Před" shot shows a balcony stack
  the "Po" shots lack). It is now a comparison slider (Honza's call); confirm it is the same house and ask the
  client for an aligned pair.
- 2026-11-08 Checker probes: POST the form to `/api/contact/` (with the slash); without it a 301 turns the POST into
  a GET and you see a false 404. For 2x sharpness compare the file width in the filename with display × DPR;
  `naturalWidth` of an srcset image reports the `sizes` slot.
- 2026-11-08 Map: the OSM iframe is lazy; wait about 3 s after scrolling to it before judging it empty.
- 2026-11-08 GitHub Pages: check every asset and link under `/krofton/` (serve `dist` under the base, e.g.
  `krofton-tools/serve-base.mjs`). In Git Bash run it with `MSYS_NO_PATHCONV=1` and Windows paths, or `/krofton/`
  becomes `C:/Program Files/Git/krofton/`.
