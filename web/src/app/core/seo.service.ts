import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CONTENTS } from '../content';
import { Lang } from '../content/types';
import { SITE_URL } from '../site.config';
import { LANGS } from './lang';

export interface PageMeta {
  readonly lang: Lang;
  readonly title: string;
  readonly description: string;
  /** Ruta sin idioma, p. ej. '' o '/cases/wms'. */
  readonly path: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  apply(page: PageMeta): void {
    const t = CONTENTS[page.lang];
    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:locale', content: t.meta.ogLocale });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: t.meta.siteName });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.doc.documentElement.lang = page.lang;
    this.setLinks(page);
  }

  private setLinks(page: PageMeta): void {
    this.doc.head.querySelectorAll('link[data-seo]').forEach((el) => el.remove());
    if (!SITE_URL) return;
    const url = (lang: Lang) => `${SITE_URL}/${lang}${page.path}`;
    this.addLink('canonical', url(page.lang));
    this.meta.updateTag({ property: 'og:url', content: url(page.lang) });
    for (const lang of LANGS) {
      this.addLink('alternate', url(lang), lang);
    }
    this.addLink('alternate', url('en'), 'x-default');
  }

  private addLink(rel: string, href: string, hreflang?: string): void {
    const link = this.doc.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('href', href);
    if (hreflang) link.setAttribute('hreflang', hreflang);
    link.setAttribute('data-seo', '');
    this.doc.head.appendChild(link);
  }
}
