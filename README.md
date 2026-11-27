# Cajón de garabatos

The website for Cajón de garabatos, a bilingual literary newsletter and writing workshops. Built with [Astro](https://astro.build) from the same MIT-licensed starter as phrenstudio.com (see `LICENSE`).

Every push to `main` rebuilds the site and publishes it to GitHub Pages. It also rebuilds every morning (06:00 UTC), so the noticeboard picks up new issues on its own.

## Languages

Spanish is the default, at `/`. English lives under `/en/`. This uses Astro's built-in i18n routing (`i18n` in `astro.config.mjs`). The two versions can use different wording and different slugs:

| Page | Spanish | English |
|---|---|---|
| Inicio / Home | `/` | `/en/` |
| Talleres / Workshops | `/talleres/` | `/en/workshops/` |
| Sobre mí · Empieza aquí / About · Start here | `/sobre-mi/` | `/en/about/` |

All the interface copy for both languages is in `src/i18n/index.ts`. Slugs are in `ROUTES` in the same file.

## Where to edit things

| What | File |
|---|---|
| Copy for both languages | `src/i18n/index.ts` |
| Workshops (the next one goes on the noticeboard automatically) | `src/data/workshops.ts` |
| Class-interest form (Tally / Google Forms embed URL) | `interestFormUrl` in `src/site.config.ts` |
| Sobre mí text (highlighted placeholders) | `src/views/About.astro` |
| Colours (brand palette) | top of `src/styles/global.css` |
| Fonts (Merriweather + Merriweather Sans) | `fonts` in `astro.config.mjs` |
| Logo, tape | `public/brand/` |
| Scribbles (recolourable) | `src/assets/scribbles/`, used via `<Scribble name="…" />` |

## Brand

Colours, fonts, the logo, the scribbles and the tape come from the Figma file "IG - Cajón de Garabatos", page MAIN VAINAS. To add another scribble, export it from Figma as SVG, replace its fill colour with `currentColor`, save it in `src/assets/scribbles/`, and add its name to `ScribbleName` in `src/components/Scribble.astro`.

The "latest issue" card reads `cajondegarabatos.substack.com/feed` at build time and works out each issue's language from its words. If the feed can't be reached, the card falls back to a link to Substack.

Luma sign-ups: add `lumaUrl` to a workshop in `src/data/workshops.ts`.

## Preview vs. live

Until switch-over, the site is served at https://gabywritescode.github.io/cajon-de-garabatos/ with `noindex` and a `Disallow: /` robots.txt, so it doesn't compete with the Ghost site in search.

## Switch-over (Ghost → this site)

1. In `astro.config.mjs`, set `PRODUCTION = true` and push.
2. GitHub → this repo → Settings → Pages → Custom domain: `cajondegarabatos.com`. Then tick **Enforce HTTPS** once the certificate is issued.
3. Cloudflare DNS for cajondegarabatos.com: replace the Ghost records with
   - `A` `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` `www` → `gabywritescode.github.io`

   Set them to **DNS only** (grey cloud) until GitHub has issued the certificate. After that they can be proxied, with SSL mode **Full**.
4. Cloudflare → Rules → Redirect Rules: send old Ghost post URLs to their Substack versions (a Bulk Redirect list is easiest for many posts).
5. Search Console: add `https://cajondegarabatos.com/sitemap-index.xml`. If the Ghost site was registered as a different property, use Change of Address.

## Running locally

```sh
pnpm install
pnpm dev
```
