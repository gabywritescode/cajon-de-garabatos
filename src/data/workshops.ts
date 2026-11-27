// Workshops shown on Talleres and on the home noticeboard. The next upcoming
// one (by date) is pinned to the noticeboard automatically. The site rebuilds
// daily, so past workshops drop off without a manual edit.
//
// Example entry:
// {
//   date: '2027-01-21',
//   time: '18:30–20:30',
//   title: { es: 'Escribir el lugar', en: 'Writing place' },
//   summary: {
//     es: 'Tres ejercicios para salir de la habitación blanca.',
//     en: 'Three exercises for getting out of the white room.',
//   },
//   place: { es: 'Online', en: 'Online' },
//   lumaUrl: 'https://lu.ma/your-event',
// },
import type { Lang } from '@/i18n';

type Bilingual = Record<Lang, string>;

export interface Workshop {
  /** ISO date, YYYY-MM-DD (Madrid time). */
  date: string;
  time?: string;
  title: Bilingual;
  summary: Bilingual;
  place: Bilingual;
  /** Luma event page; until set, the workshop shows "sign-ups opening soon". */
  lumaUrl?: string;
}

export const WORKSHOPS: Workshop[] = [];

export function upcomingWorkshops(now = new Date()): Workshop[] {
  const today = now.toISOString().slice(0, 10);
  return WORKSHOPS.filter((w) => w.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

export function workshopDate(w: Workshop): Date {
  return new Date(`${w.date}T12:00:00Z`);
}
