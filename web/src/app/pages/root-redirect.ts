import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { I18nService } from '../core/i18n.service';
import { SeoService } from '../core/seo.service';

/** Raíz del sitio. En producción CloudFront redirige según Accept-Language; esto cubre el resto. */
@Component({
  selector: 'app-root-redirect',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container root">
      <h1>Rodrigo Márquez</h1>
      <p class="muted">Software Engineer</p>
      <p class="root__links">
        <a class="btn btn--primary" routerLink="/en" hreflang="en" lang="en">English</a>
        <a class="btn btn--ghost" routerLink="/es" hreflang="es" lang="es">Español</a>
      </p>
    </section>
  `,
  styles: `
    .root {
      padding-block: var(--space-7);
      display: grid;
      gap: var(--space-2);
    }
    .root__links {
      display: flex;
      gap: var(--space-2);
      flex-wrap: wrap;
    }
  `,
})
export class RootRedirect {
  constructor() {
    const router = inject(Router);
    const i18n = inject(I18nService);
    const seo = inject(SeoService);
    seo.apply({
      lang: 'en',
      title: 'Rodrigo Márquez — Software Engineer',
      description: i18n.t().meta.description,
      path: '',
    });
    afterNextRender(() => {
      void router.navigateByUrl(`/${i18n.preferredLang()}`, { replaceUrl: true });
    });
  }
}
