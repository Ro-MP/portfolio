import { isLang, negotiateLang } from './lang';

describe('lang', () => {
  it('reconoce solo en y es', () => {
    expect(isLang('en')).toBe(true);
    expect(isLang('es')).toBe(true);
    expect(isLang('fr')).toBe(false);
    expect(isLang(null)).toBe(false);
  });

  it('elige español solo si el primer idioma del navegador es es-*', () => {
    expect(negotiateLang(['es-MX', 'en'])).toBe('es');
    expect(negotiateLang(['en-US', 'es'])).toBe('en');
    expect(negotiateLang(['pt-BR'])).toBe('en');
    expect(negotiateLang([])).toBe('en');
  });
});
