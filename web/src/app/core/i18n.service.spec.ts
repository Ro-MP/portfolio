import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { I18nService } from './i18n.service';
import { langGuard } from './lang.guard';

@Component({ template: '' })
class Dummy {}

describe('I18nService', () => {
  let router: Router;
  let i18n: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: ':lang', canActivate: [langGuard], children: [{ path: '', component: Dummy }, { path: 'cases/:slug', component: Dummy }] },
          { path: '**', component: Dummy },
        ]),
      ],
    });
    router = TestBed.inject(Router);
    i18n = TestBed.inject(I18nService);
  });

  it('el guard fija el idioma desde la ruta', async () => {
    await router.navigateByUrl('/es');
    expect(i18n.lang()).toBe('es');
    expect(i18n.t().lang).toBe('es');
    expect(document.documentElement.lang).toBe('es');
  });

  it('pathFor conserva la ruta, el fragmento y la query al cambiar de idioma', async () => {
    await router.navigateByUrl('/en/cases/wms?x=1#results');
    expect(i18n.pathFor('es')).toBe('/es/cases/wms?x=1#results');
    expect(i18n.pathFor('en')).toBe('/en/cases/wms?x=1#results');
  });

  it('pathFor funciona en la home', async () => {
    await router.navigateByUrl('/en');
    expect(i18n.pathFor('es')).toBe('/es');
  });

  it('un idioma inválido redirige a /en', async () => {
    await router.navigateByUrl('/fr');
    expect(router.url).toBe('/en');
  });

  it('remember no falla si localStorage lanza', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => i18n.remember('es')).not.toThrow();
    spy.mockRestore();
  });

  it('preferredLang usa la preferencia guardada y, si no, el navegador', () => {
    localStorage.setItem('portfolio.lang', 'es');
    expect(i18n.preferredLang()).toBe('es');
    localStorage.removeItem('portfolio.lang');
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['es-MX']);
    expect(i18n.preferredLang()).toBe('es');
  });
});
