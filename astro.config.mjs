// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// While cajondegarabatos.com still points at Ghost, the site is previewed on
// GitHub Pages at https://gabywritescode.github.io/cajon-de-garabatos/ and
// asks search engines not to index it. At switch-over, set PRODUCTION = true
// (see README → "Switch-over").
const PRODUCTION = false;

const SITE_URL = PRODUCTION ? 'https://cajondegarabatos.com' : 'https://gabywritescode.github.io';
const BASE = PRODUCTION ? '/' : '/cajon-de-garabatos';

export default defineConfig({
  site: SITE_URL,
  base: BASE,
  trailingSlash: 'always',

  // Spanish is the default language and lives at /; English lives under /en/.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [sitemap()],

  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },

  // Self-hosted at build time by Astro's Fonts API; consumed in global.css.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Bricolage Grotesque',
      cssVariable: '--ff-display',
      weights: ['400', '600', '800'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Newsreader',
      cssVariable: '--ff-body',
      weights: ['400', '500'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Space Mono',
      cssVariable: '--ff-mono',
      weights: ['400', '700'],
      subsets: ['latin'],
    },
  ],
});
