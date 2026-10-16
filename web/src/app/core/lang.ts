import { Lang } from '../content/types';

export const LANGS: readonly Lang[] = ['en', 'es'];
export const DEFAULT_LANG: Lang = 'en';
export const LANG_STORAGE_KEY = 'portfolio.lang';

export function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'es';
}

/** Idioma preferido del navegador: español si el primer idioma es es-*, inglés en otro caso. */
export function negotiateLang(languages: readonly string[]): Lang {
  const first = languages[0]?.toLowerCase() ?? '';
  return first.startsWith('es') ? 'es' : DEFAULT_LANG;
}
