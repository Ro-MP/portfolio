import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { CONTENTS } from '../content';
import { Lang } from '../content/types';
import { DEFAULT_LANG, LANG_STORAGE_KEY, isLang, negotiateLang } from './lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly router = inject(Router);
  private readonly doc = inject(DOCUMENT);

  readonly lang = signal<Lang>(DEFAULT_LANG);
  /** Contenido completo en el idioma activo. */
  readonly t = computed(() => CONTENTS[this.lang()]);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  /** Misma página en el otro idioma: cambia solo el primer segmento de la ruta. */
  pathFor(lang: Lang): string {
    const url = this.url();
    const cut = url.search(/[?#]/);
    const path = cut === -1 ? url : url.slice(0, cut);
    const rest = cut === -1 ? '' : url.slice(cut);
    const segments = path.split('/').filter(Boolean);
    if (isLang(segments[0])) {
      segments[0] = lang;
    } else {
      segments.unshift(lang);
    }
    return `/${segments.join('/')}${rest}`;
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
    this.doc.documentElement.lang = lang;
  }

  /** Guarda la preferencia. `localStorage` puede fallar (modo privado, datos bloqueados). */
  remember(lang: Lang): void {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      /* sin persistencia: el sitio funciona igual */
    }
  }

  /** Idioma al entrar por la raíz: preferencia guardada, si no, el del navegador. */
  preferredLang(): Lang {
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      if (isLang(stored)) return stored;
    } catch {
      /* ignorar */
    }
    const nav = this.doc.defaultView?.navigator;
    return negotiateLang(nav?.languages?.length ? nav.languages : nav?.language ? [nav.language] : []);
  }
}
