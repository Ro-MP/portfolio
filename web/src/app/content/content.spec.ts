import { CONTENTS } from './index';
import { CASE_SLUGS } from './types';

const MARKER = /\[PENDIENTE:[^\]]+\]/g;

function leaves(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => leaves(v, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => leaves(v, path ? `${path}.${k}` : k));
  }
  return [];
}

describe('contenido', () => {
  it('EN y ES tienen exactamente las mismas rutas', () => {
    const en = leaves(CONTENTS.en).map(([p]) => p);
    const es = leaves(CONTENTS.es).map(([p]) => p);
    expect(es).toEqual(en);
  });

  it('cada caso existe en ambos idiomas con su slug', () => {
    for (const lang of ['en', 'es'] as const) {
      for (const slug of CASE_SLUGS) {
        expect(CONTENTS[lang].cases[slug].slug).toBe(slug);
      }
    }
  });

  it('no hay strings vacíos', () => {
    for (const lang of ['en', 'es'] as const) {
      for (const [path, text] of leaves(CONTENTS[lang])) {
        expect(text.trim(), `${lang}:${path}`).not.toBe('');
      }
    }
  });

  it('los pendientes de texto están en las mismas rutas en EN y ES', () => {
    const paths = (lang: 'en' | 'es') =>
      leaves(CONTENTS[lang])
        .filter(([, t]) => MARKER.test(t) && ((MARKER.lastIndex = 0), true))
        .map(([p]) => p);
    expect(paths('es')).toEqual(paths('en'));
  });

  it('el TMS se presenta como pausado', () => {
    expect(CONTENTS.en.cases.tms.status).toMatch(/paused/i);
    expect(CONTENTS.es.cases.tms.status).toMatch(/pausado/i);
  });
});
