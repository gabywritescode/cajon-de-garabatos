// Reads the Substack RSS feed at build time and picks the latest issue in each
// language. Issues are published as Spanish/English pairs without a language
// tag, so the language is guessed from common words. If the feed can't be
// reached the noticeboard falls back to a plain link, and the build carries on.
import { SITE } from '@/site.config';
import type { Lang } from '@/i18n';

export interface Issue {
  title: string;
  summary: string;
  url: string;
  date: Date;
  lang: Lang;
}

const ES_WORDS = ['el', 'la', 'los', 'las', 'de', 'del', 'que', 'y', 'un', 'una', 'para', 'con', 'sobre', 'cómo', 'lo', 'se', 'por', 'qué'];
const EN_WORDS = ['the', 'of', 'and', 'to', 'in', 'how', 'what', 'on', 'with', 'is', 'for', 'from', 'my', 'it', 'when'];

export function guessLang(text: string): Lang {
  const words = text.toLowerCase().match(/[\p{L}']+/gu) ?? [];
  let es = (text.match(/[áéíóúñ¿¡]/gi) ?? []).length * 2;
  let en = 0;
  for (const w of words) {
    if (ES_WORDS.includes(w)) es++;
    if (EN_WORDS.includes(w)) en++;
  }
  return en > es ? 'en' : 'es';
}

function decode(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();
}

function tag(xml: string, name: string): string {
  const m = xml.match(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`));
  return m ? decode(m[1]) : '';
}

export function parseFeed(xml: string): Issue[] {
  return xml
    .split('<item>')
    .slice(1)
    .map((item) => {
      const title = tag(item, 'title');
      const summary = tag(item, 'description');
      return {
        title,
        summary,
        url: tag(item, 'link'),
        date: new Date(tag(item, 'pubDate')),
        lang: guessLang(`${title} ${summary}`),
      };
    })
    .filter((i) => i.title && i.url && !Number.isNaN(i.date.getTime()))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

let cache: Promise<Issue[]> | undefined;

function loadIssues(): Promise<Issue[]> {
  cache ??= fetch(SITE.feedUrl, { signal: AbortSignal.timeout(10_000) })
    .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`))))
    .then(parseFeed)
    .catch((err) => {
      console.warn(`[substack] could not read ${SITE.feedUrl}: ${err}`);
      return [];
    });
  return cache;
}

export async function latestIssue(lang: Lang): Promise<Issue | null> {
  const issues = await loadIssues();
  return issues.find((i) => i.lang === lang) ?? issues[0] ?? null;
}
