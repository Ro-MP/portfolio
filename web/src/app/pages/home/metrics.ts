import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { Counter } from '../../shared/counter';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-metrics',
  imports: [Counter, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section--dark on-dark" aria-labelledby="metrics-title">
      <div class="container">
        <h2 id="metrics-title" class="visually-hidden">{{ metrics().title }}</h2>
        <ul class="grid">
          @for (m of metrics().items; track m.label; let i = $index) {
            <li class="metric" [appReveal]="i">
              <p class="metric__value"><app-counter [metric]="m" /></p>
              <p class="metric__label">{{ m.label }}</p>
              <p class="metric__context muted">{{ m.context }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .section {
      padding-block: var(--space-6);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--space-5) var(--space-3);
    }
    .metric {
      display: grid;
      gap: 6px;
      align-content: start;
      padding-top: var(--space-2);
      border-top: 1px solid rgb(244 235 221 / 0.25);
    }
    .metric__value {
      font-family: var(--font-serif);
      font-size: clamp(2.5rem, 6vw, 4rem);
      line-height: 1;
      letter-spacing: -0.03em;
      color: var(--amber);
      max-width: none;
    }
    .metric__label {
      font-weight: 500;
      max-width: none;
    }
    .metric__context {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      line-height: 1.5;
      max-width: 30ch;
    }
    @media (min-width: 900px) {
      .grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--space-4);
      }
    }
  `,
})
export class Metrics {
  protected readonly i18n = inject(I18nService);
  protected readonly metrics = () => this.i18n.t().metrics;
}
