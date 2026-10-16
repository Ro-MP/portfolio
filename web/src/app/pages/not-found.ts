import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../core/i18n.service';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container nf">
      <p class="eyebrow">404</p>
      <h1>{{ t().notFound.title }}</h1>
      <p class="muted">{{ t().notFound.text }}</p>
      <a class="btn btn--primary" [routerLink]="['/', i18n.lang()]">{{ t().notFound.home }}</a>
    </section>
  `,
  styles: `
    .nf {
      padding-block: var(--space-7);
      display: grid;
      gap: var(--space-2);
      justify-items: start;
    }
  `,
})
export class NotFoundPage {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const t = this.t();
      seo.apply({ lang: t.lang, title: `${t.notFound.title} — ${t.meta.siteName}`, description: t.notFound.text, path: '' });
    });
  }
}
