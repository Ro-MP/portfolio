import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { I18nService } from './i18n.service';
import { DEFAULT_LANG, isLang } from './lang';

/** Valida el segmento :lang y fija el idioma antes de renderizar (también en el prerender). */
export const langGuard: CanActivateFn = (route) => {
  const lang = route.paramMap.get('lang');
  if (!isLang(lang)) {
    return inject(Router).createUrlTree(['/', DEFAULT_LANG]);
  }
  inject(I18nService).setLang(lang);
  return true;
};
