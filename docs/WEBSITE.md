# KROFTON s.r.o. – new website (pass 1: homepage teaser)

Pitch demo for KROFTON s.r.o. (stavební firma, Praha 5 – Smíchov), lead from the ADV dashboard
(project "Převod webu ze starého WordPressu"). This pass builds **only the homepage**, as a teaser that has
to sell the idea of the new site on its own. Language: Czech only.

- Repo: https://github.com/MrBeardman/krofton (branch `main`)
- Stack: Astro 7, static page + one Node endpoint (`/api/contact`), `@astrojs/node` standalone
- Scrape (local only, not in the repo): `C:\Data\Dev\krofton-scrape\` (HTML, `projects.json`, original photos, theme CSS, logo)

## The client's current site (krofton.cz, scraped 2026-11-08)

The site loads normally (no Wayback Machine needed). WordPress 4.3.34, theme "twentyten" (customised),
Revolution Slider 4.6.5, Contact Form 7 4.3.1, All in One SEO 2.2.7.3, Easy FancyBox. No viewport meta tag.

| Path | Title | Content |
| --- | --- | --- |
| `/` | KROFTON s.r.o. \| Stavební firma | slider (7 photos), intro, "Proč zvolit KROFTON" list, sidebar with contacts and IČO |
| `/cinnost/` | Činnost stavební firmy KROFTON s.r.o. \| KROFTON s.r.o. | services: novostavby, rekonstrukce, zateplování a opravy fasád, práce v interiérech, list of trades |
| `/realizace/fasady/` | Fasády \| KROFTON s.r.o. | 8 projects with galleries (46 photos) |
| `/realizace/obklady-a-dlazby/` | Obklady a dlažby \| KROFTON s.r.o. | 10 photos, no project names |
| `/realizace/rekonstrukce/` | Rekonstrukce \| KROFTON s.r.o. | RD Třebonice (24 photos), ZŠ Podleskova (90 photos) |
| `/realizace/novostavby-2/` | Novostavby \| KROFTON s.r.o. | RŘD Jinočany (2 photos); not in the menu, linked from the footer widget |
| `/certifikaty/` | Certifikáty \| KROFTON s.r.o. | scans: rozhodnutí o registraci, pojistka, certifikát způsobilosti Baumit, výpis z OR, 2× výpis ze ŽR |
| `/kontakt/` | Kontakt \| KROFTON s.r.o. | address, e-mail, phone, IČO, DIČ, registration |
| `/wp-content/uploads/2018/05/gdpr.pdf` | (PDF) | GDPR information, linked from the sidebar |

Facts used (exactly as on the site): KROFTON s.r.o., Kroftova 3370/20, 150 00 Praha – Smíchov (sídlo a
provozovna), +420 608 075 884, krofton@krofton.cz, IČ 24222577, DIČ CZ24222577, spisová značka C 190114
vedená u Městského soudu v Praze. No opening hours and no prices anywhere on the site.

### Brand
- **Logo:** `public/logo-krofton.png`, the original file `wp-content/themes/twentyten/layout/logo.png`
  (208×33 PNG, white wordmark "KROFTON s.r.o." in a heavy condensed grotesque + a stacked-roof mark). No vector
  version exists on the site: it is shown at 176 px (150 px on phones) and is slightly soft on retina screens.
- **Colours** (from `style.css` and the header gradient `layout/bg.jpg`):
  `#26410a` dark green (header top, now `--les`), `#4c8415` brand green (titles, sidebar, `--zelen`),
  `#406f10` / `#26410a` menu greens, `#f0ff00` yellow accent (top bar, search button, `--signal`),
  `#b1eda2` light green nav text (`--mech`), `#2e92a4` teal (bold text, not used), `#646464` grey body text.
- **Fonts:** Roboto 400/700 from Google Fonts.

## What this pass built
One page, `/` (`src/pages/index.astro`), sections in `src/components/home/`:
1. **Hero** (dark green): h1 "Stavební firma pro fasády, rekonstrukce a novostavby v Praze", lead, call + enquiry
   CTAs, address; the Makovského facade photo framed by drawn "scaffold" lines (yellow ledgers and couplers).
2. **Proč stavět s KROFTON** (light band): their six reasons, rewritten.
3. **Služby** (dark green, the centrepiece): six services, each with who it is for, what the client gets
   (4 points) and a link to the matching project tab; each with its own animated line drawing
   (`ServiceArt.astro`): facade layers + trowel, brick slid back into a wall, crane with swinging load,
   tiles laid in sequence, paint roller, spirit level whose bubble settles.
4. **Realizace**: before/after of the Makovského panel house (both photos are in their own gallery), then
   tabs Fasády (8) / Rekonstrukce (4) / Novostavby (2) / Obklady a dlažby (4) with their project names.
5. **Jak zakázka probíhá**: 4 steps.
6. **Časté otázky**: 7 questions (who, where, for whom, prices, authorities, partial work, how to order).
7. **Kontakt**: phone, e-mail, address, opening hours (placeholder, see Open), IČO/DIČ/registration,
   OpenStreetMap embed + links to Google Maps / OSM, and the enquiry form.

Other technical parts: JSON-LD `GeneralContractor` (address, geo, IČO/DIČ, services as `OfferCatalog`) and
`FAQPage`; `noindex` + `robots.txt` Disallow during the preview; sitemap; 19 photos as WebP
(640/960/1200/1600, never upscaled, `src/data/photos.json`); fonts self-hosted.

### Enquiry form (`src/pages/api/contact.ts`)
Fields: typ práce (required, 7 types), jméno/firma, telefon or e-mail (at least one), místo stavby, zpráva.
Honeypot, rate limit 5 per 10 min per IP, server-side validation. Every enquiry is stored to
`data/submissions/YYYY-MM.jsonl` first. Mail only when `SMTP_HOST` **and** a recipient are set: routing by
type through `MAIL_TO_<TYPE>` (e.g. `MAIL_TO_FASADA`), else `MAIL_TO`; the subject starts with the type.
There is deliberately **no default recipient**, so the preview never mails the client. Variables in `.env.example`.

## Decisions and why
- **Astro on Node (Hostinger)**, not static Pages: the form must really work; the page itself is static.
- **Their logo file as is** rather than a redrawn wordmark: the brief says keep their logo; a vector should
  come from the client.
- **Fonts: Barlow Condensed (headings) + Barlow (text)** instead of Roboto: the condensed cut echoes the
  logo's condensed wordmark and building-site signage; one family keeps it calm. Latin-ext covers Czech.
- **Colours:** dark green + yellow only where the old header used them (hero, services, footer, CTAs);
  the page itself is a cool plaster grey `#eef0e9`, not white or cream. Yellow never sits on light
  backgrounds (contrast); on light, green text uses `#3b6810` (AA).
- **Services as the strongest part**, built from /cinnost/ + the homepage + their list of trades. Rows
  rather than identical cards, so each service can say who it is for and what is included.
- **Before/after from their own gallery** instead of claims: the Makovského "before" photo is the gallery's
  unnumbered first file showing the grey panel facade; the "after" files show the finished facade.
- **Hero photo** `makovskeho-po-2`: a finished, colourful facade of a large building fits the lead's advice
  to lead with credibility for larger contracts.
- **No carousels, no stock photos**; sections without their photo use the line drawings.
- **Content in `src/data/site.ts`** (single language), not `src/i18n/*.json`, since there is no second language.
- **FAQ items open independently** (no exclusive accordion), so opening one never moves the one you clicked.
- **Map:** OpenStreetMap embed (no API key, no cookies), lazy, in a fixed 16:9 box (no layout shift).
- **`git` identity** in this repo is set locally (Jan Matyáš / honza.matyas@gmail.com): no global identity on this PC.

## New copy (needs the client's approval)
All texts are rewritten from their site; these parts are new wording or new structure:
- Hero h1 and lead; "Co pro vás postavíme" intro; per-service "Pro …" lines and the 4 included items each.
- Service text additions: "Dům tím dostane novou tvář i nižší tepelné ztráty" (fasády); "Jedna firma, která
  zkoordinuje všechny profese" (interiéry); "Od jednoduché bílé koupelny po dekorativní pásy a vzorovanou
  dlažbu" (obklady, from what their photos show).
- Project captions (scope per photo) and image alt texts, derived from their gallery titles and the photos.
  The obklady photos have no project names on their site: "Koupelna, Vršovice" comes from a file name
  (`ul._celjabinska_vrsovice_praha_10.jpg`), **to confirm**.
- Before/after captions "Před" / "Po" on the Makovského pair (**to confirm** that the grey photo is the
  same house before work).
- Process steps (Ozvete se, Nezávazná nabídka, Podklady a úřady, Stavba) and all FAQ answers.
- "Ceník nezveřejňujeme, cena vždy záleží na rozsahu prací, materiálu a stavu objektu" (FAQ): their site
  publishes no prices and says "zeptejte se na podmínky" / "nezávazná nabídka".
- Form texts; "Podle typu práce poptávku předáme tomu, kdo ji u nás řeší" (true once `MAIL_TO_<TYPE>` is set).

## Open
- **Opening hours:** not on their site. The contact block shows "Doplníme podle vašich údajů"; no
  `openingHours` in JSON-LD. Fill in `07-Contact.astro` + `Base.astro` when known.
- **Vector logo** (SVG/PDF) from the client; the PNG is soft on retina.
- **Mail delivery:** set SMTP + `MAIL_TO` (and optionally `MAIL_TO_<TYPE>`) in Hostinger env vars when the
  client takes the site. Until then enquiries are only stored on the server.
- **GDPR:** the form has a one-line consent note; their `gdpr.pdf` is not linked yet (old site URL).
  A privacy page belongs in the next pass.
- **Not built (other pages of the old site):** /cinnost/, /realizace/* (full galleries: 46 + 10 + 114 + 2
  photos), /certifikaty/, /kontakt/. Their content is summarised on the homepage; the next pass should build
  the project pages (one per type, with all photos) and keep the old URLs or 301 them.
- **Certificates:** the homepage mentions the Baumit certificate (a fact from /certifikaty/); scans are not shown.
- **Founding year:** ARES lists the company since 2012 (lead info); not stated on the page until confirmed.
- **Domain:** `site` is `https://www.krofton.cz`, so canonical/sitemap/OG point there. Fine while `noindex`;
  remove `noindex` and the robots Disallow when the domain moves.

## Verify
`npm run build`, `npm run check:format`, then serve (`PORT=4431 HOST=127.0.0.1 node dist/server/entry.mjs`) and run
the verify-loop capture (`review/round-N/`, git-ignored). Round 1 machine facts: no issues at 1440 and 390.
