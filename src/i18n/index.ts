// Spanish (default) at /, English under /en/ — Astro's built-in i18n routing.
// The two languages can use different slugs and different wording.
import { getRelativeLocaleUrl, getAbsoluteLocaleUrl } from 'astro:i18n';

export type Lang = 'es' | 'en';
export const LANGS: Lang[] = ['es', 'en'];

/** Normalises Astro.currentLocale (undefined on the 404 page) to a Lang. */
export function toLang(locale: string | undefined): Lang {
  return locale === 'en' ? 'en' : 'es';
}

/** Every page and its slug in each language. */
export const ROUTES = {
  home: { es: '', en: '' },
  workshops: { es: 'talleres', en: 'workshops' },
  about: { es: 'sobre-mi', en: 'about' },
} as const satisfies Record<string, Record<Lang, string>>;

export type PageKey = keyof typeof ROUTES;

/** Link to a page in a language, with the site base applied. */
export function pageHref(page: PageKey, lang: Lang): string {
  return getRelativeLocaleUrl(lang, ROUTES[page][lang]);
}

export function pageUrl(page: PageKey, lang: Lang): string {
  return getAbsoluteLocaleUrl(lang, ROUTES[page][lang]);
}

export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

export const UI = {
  es: {
    htmlLang: 'es',
    ogLocale: 'es_ES',
    dateLocale: 'es-ES',
    nav: { workshops: 'Talleres', about: 'Sobre mí', newsletter: 'Newsletter' },
    switchLabel: 'EN',
    switchTitle: 'Read in English',
    description:
      'Cajón de garabatos: un espacio seguro donde te acompaño a desarrollar (o recuperar) el hábito de escribir. Newsletter y talleres de escritura en español e inglés.',
    // Home
    heroLead: 'Un espacio seguro para',
    heroEm: 'volver a escribir.',
    heroBody:
      'Te acompaño a desarrollar (o recuperar) el hábito de escribir, ya sea para liberar estrés, expresarte o sacar esa historia que llevas dentro.',
    readNewsletter: 'Leer la newsletter ↗',
    seeWorkshops: 'Ver talleres',
    boardTitle: 'En el tablón',
    nextWorkshop: 'Próximo taller',
    noWorkshop: 'Ahora mismo no hay ningún taller en el calendario.',
    noWorkshopCta: 'Cuéntame qué te gustaría →',
    signUp: 'Apúntate ↗',
    signUpSoon: 'Inscripciones muy pronto',
    latestIssue: 'Último número',
    noIssue: 'Lee los últimos números en Substack.',
    readIssue: 'Leer ↗',
    // Workshops
    workshopsTitle: 'Talleres',
    workshopsLead: 'Escribir en compañía.',
    workshopsBody:
      'Talleres para escribir con calma y sin miedo a la página en blanco, en grupo y con ejercicios que puedes llevarte a casa.',
    workshopsDescription: 'Talleres de escritura creativa de Cajón de garabatos.',
    upcoming: 'Próximas fechas',
    interestTitle: '¿Te interesa un taller?',
    interestBody:
      'Déjame tus datos y te aviso cuando abra nuevas plazas. Así también sé qué temas y horarios te vienen mejor.',
    interestSoon: 'El formulario llega pronto. Mientras tanto, suscríbete a la newsletter: allí anuncio cada taller primero.',
    subscribe: 'Suscribirme ↗',
    // About
    aboutTitle: 'Sobre mí',
    aboutHeading: '¡Hola! Soy Gaby',
    aboutDescription: 'Quién está detrás de Cajón de garabatos y por dónde empezar.',
    photoAlt: 'Gabrielle, sonriendo, sentada en un banco de piedra delante de una pared azul cubierta de hiedra.',
    startHere: 'Empieza aquí',
    startRead: 'Lee la newsletter',
    startReadBody: 'Ensayos, ejercicios y lecturas sobre el oficio de escribir, en español y en inglés.',
    startWorkshop: 'Ven a un taller',
    startWorkshopBody: 'Escribir con otras personas es la manera más rápida de recuperar el hábito.',
    startSubscribe: 'Recíbelo en tu correo',
    startSubscribeBody: 'Un número nuevo cada pocas semanas. Sin ruido.',
    // Misc
    top: 'Arriba ↑',
    notFound: 'Esta página no existe.',
    backHome: '← Volver al inicio',
  },
  en: {
    htmlLang: 'en',
    ogLocale: 'en_GB',
    dateLocale: 'en-GB',
    nav: { workshops: 'Workshops', about: 'About', newsletter: 'Newsletter' },
    switchLabel: 'ES',
    switchTitle: 'Leer en español',
    description:
      'Cajón de garabatos (“a drawer of scribbles”): a safe place to build, or rediscover, the habit of writing. A bilingual newsletter and writing workshops.',
    heroLead: 'A drawer full of scribbles,',
    heroEm: 'and room for yours.',
    heroBody:
      'A safe place to build (or rediscover) the habit of writing: to let off steam, to say what you mean, or to finally get that story out of your head.',
    readNewsletter: 'Read the newsletter ↗',
    seeWorkshops: 'See workshops',
    boardTitle: 'On the board',
    nextWorkshop: 'Next workshop',
    noWorkshop: 'No workshop on the calendar right now.',
    noWorkshopCta: 'Tell me what you’d like →',
    signUp: 'Sign up ↗',
    signUpSoon: 'Sign-ups opening soon',
    latestIssue: 'Latest issue',
    noIssue: 'Read the latest issues on Substack.',
    readIssue: 'Read ↗',
    workshopsTitle: 'Workshops',
    workshopsLead: 'Writing, together.',
    workshopsBody:
      'Small-group workshops for writing without the blank-page dread, with prompts you can keep using long after we’re done.',
    workshopsDescription: 'Creative writing workshops from Cajón de garabatos.',
    upcoming: 'Coming up',
    interestTitle: 'Interested in a workshop?',
    interestBody:
      'Leave your details and I’ll let you know when new places open, and which topics and times suit you best.',
    interestSoon: 'The form is on its way. Meanwhile, subscribe to the newsletter: every workshop is announced there first.',
    subscribe: 'Subscribe ↗',
    aboutTitle: 'About',
    aboutHeading: 'Hi! I’m Gaby',
    aboutDescription: 'Who’s behind Cajón de garabatos, and where to begin.',
    photoAlt: 'Gabrielle smiling, sitting on a stone bench in front of a blue wall covered in ivy.',
    startHere: 'Start here',
    startRead: 'Read the newsletter',
    startReadBody: 'Essays, prompts and reading notes on the craft of writing, in English and Spanish.',
    startWorkshop: 'Join a workshop',
    startWorkshopBody: 'Writing alongside other people is the fastest way back into the habit.',
    startSubscribe: 'Get it by email',
    startSubscribeBody: 'A new issue every few weeks. No noise.',
    top: 'Top ↑',
    notFound: 'This page doesn’t exist.',
    backHome: '← Back home',
  },
} as const;

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(UI[lang].dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Madrid',
  });
}
