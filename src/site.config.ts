// Site-wide settings. Copy that differs by language lives in src/i18n/index.ts.
export const SITE = {
  name: 'Cajón de garabatos',
  author: 'Gabrielle van Welie',
  newsletterUrl: 'https://cajondegarabatos.substack.com',
  subscribeUrl: 'https://cajondegarabatos.substack.com/subscribe',
  feedUrl: 'https://cajondegarabatos.substack.com/feed',
  // Paste the Tally or Google Forms embed URL here to show the class-interest
  // form on the Talleres page, e.g. 'https://tally.so/embed/abc123?hideTitle=1'.
  interestFormUrl: null as string | null,
} as const;

/** True on the GitHub Pages preview (served under a sub-path), false on cajondegarabatos.com. */
export const IS_PREVIEW = import.meta.env.BASE_URL.replace(/\/$/, '') !== '';
