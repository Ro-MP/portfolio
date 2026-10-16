import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { SeoService } from '../../core/seo.service';
import { About } from './about';
import { Cases } from './cases';
import { Contact } from './contact';
import { Hero } from './hero';
import { Metrics } from './metrics';
import { Stack } from './stack';

@Component({
  selector: 'app-home',
  imports: [Hero, Metrics, Cases, About, Stack, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-metrics />
    <app-cases />
    <app-about />
    <app-stack />
    <app-contact />
  `,
})
export class HomePage {
  constructor() {
    const i18n = inject(I18nService);
    const seo = inject(SeoService);
    effect(() => {
      const t = i18n.t();
      seo.apply({ lang: t.lang, title: t.meta.title, description: t.meta.description, path: '' });
    });
  }
}
