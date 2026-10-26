import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { Pending } from '../../shared/pending';
import { Reveal } from '../../shared/reveal.directive';
import { RichText } from '../../shared/rich-text';

@Component({
  selector: 'app-contact',
  imports: [Pending, Reveal, RichText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="section section--dark on-dark" aria-labelledby="contact-title">
      <div class="container inner" appReveal>
        <p class="eyebrow">{{ c().eyebrow }}</p>
        <h2 id="contact-title">{{ c().title }}</h2>
        <p class="lead"><app-t [v]="c().text" /></p>
        <div class="actions">
          <a class="btn btn--primary btn--block-mobile" [href]="'mailto:' + c().email">{{ c().emailLabel }}</a>
          <span class="mail">{{ c().email }}</span>
        </div>
        <ul class="links">
          <li>
            <a [href]="c().linkedin.href" target="_blank" rel="noopener noreferrer">{{ c().linkedin.label }}</a>
          </li>
          <li>
            @if (c().github.href; as href) {
              <a [href]="href" target="_blank" rel="noopener noreferrer">{{ c().github.label }}</a>
            } @else {
              {{ c().github.label }} <app-pending [note]="c().github.pending" />
            }
          </li>
          <!--
            CV oculto por ahora: aún no se sube el CV a la plataforma.
            <li>
              @if (c().cv.href; as href) {
                <a [href]="href" download>{{ c().cv.label }}</a>
              } @else {
                {{ c().cv.label }} <app-pending [note]="c().cv.pending" />
              }
            </li>
          -->
        </ul>
        <p class="meta muted"><app-t [v]="c().expectation" /> · {{ c().location }}</p>
      </div>
    </section>
  `,
  styles: `
    .inner {
      display: grid;
      gap: var(--space-3);
      justify-items: start;
    }
    .lead {
      font-size: 1.1875rem;
      max-width: 52ch;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-2) var(--space-3);
      width: 100%;
    }
    .mail {
      font-family: var(--font-mono);
      font-size: 0.9375rem;
      color: var(--on-dark-soft);
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1) var(--space-4);
    }
    .links li {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 44px;
    }
    .meta {
      font-size: 0.9375rem;
    }
  `,
})
export class Contact {
  protected readonly i18n = inject(I18nService);
  protected readonly c = () => this.i18n.t().contact;
}
