import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CASE_SLUGS } from '../../content';
import { I18nService } from '../../core/i18n.service';
import { MediaView } from '../../shared/media';
import { Reveal } from '../../shared/reveal.directive';
import { RichText } from '../../shared/rich-text';

@Component({
  selector: 'app-cases',
  imports: [RouterLink, MediaView, Reveal, RichText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="cases" class="section" aria-labelledby="cases-title">
      <div class="container">
        <header class="head" appReveal>
          <p class="eyebrow">{{ s().eyebrow }}</p>
          <h2 id="cases-title">{{ s().title }}</h2>
          <p class="muted">{{ s().intro }}</p>
        </header>

        <ol class="list">
          @for (slug of slugs; track slug) {
            @let c = i18n.t().cases[slug];
            <li class="case card" appReveal>
              <div class="case__media"><app-media [media]="c.cover" sizes="(min-width: 900px) 50vw, 100vw" /></div>
              <div class="case__body">
                <p class="eyebrow">{{ c.kicker }}</p>
                <h3>
                  <a class="case__link" [routerLink]="['/', i18n.lang(), 'cases', c.slug]">{{ c.title }}</a>
                </h3>
                <p class="muted"><app-t [v]="c.summary" /></p>
                <p class="case__metric">
                  <span class="case__value">{{ c.keyMetric.value }}</span>
                  <span class="case__label">{{ c.keyMetric.label }}</span>
                </p>
                @if (c.status) {
                  <p class="case__status"><span class="case__status-tag">{{ i18n.t().caseTemplate.statusLabel }}</span> {{ c.status }}</p>
                }
                <span class="case__more" aria-hidden="true">{{ s().readCase }} →</span>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .head {
      display: grid;
      gap: var(--space-2);
      margin-bottom: var(--space-6);
      max-width: 60ch;
    }
    .list {
      display: grid;
      gap: var(--space-5);
    }
    .case {
      position: relative;
      display: grid;
      gap: var(--space-3);
      padding: var(--space-2);
      transition:
        border-color 0.25s var(--ease),
        opacity 0.55s var(--ease),
        transform 0.55s var(--ease);
    }
    .case:hover {
      border-color: var(--ink);
    }
    .case__body {
      display: grid;
      gap: var(--space-2);
      align-content: center;
      justify-items: start;
      padding: var(--space-2);
    }
    .case__link {
      color: var(--ink);
      text-decoration: none;
    }
    .case__link::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--radius);
    }
    .case__link:hover {
      color: var(--accent-text);
    }
    .case__link:focus-visible {
      outline: none;
    }
    .case:has(.case__link:focus-visible) {
      outline: 3px solid var(--terracotta);
      outline-offset: 3px;
    }
    .case__metric {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 6px 12px;
    }
    .case__value {
      font-family: var(--font-mono);
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--accent-text);
    }
    .case__label {
      color: var(--ink-soft);
      font-size: 0.9375rem;
    }
    .case__status {
      font-size: 0.9375rem;
      color: var(--ink-soft);
    }
    .case__status-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink);
      margin-right: 6px;
    }
    .case__more {
      font-weight: 500;
      color: var(--accent-text);
    }

    @media (min-width: 900px) {
      .case {
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
        gap: var(--space-4);
        padding: var(--space-3);
      }
      .case:nth-child(even) .case__media {
        order: 2;
      }
    }
  `,
})
export class Cases {
  protected readonly i18n = inject(I18nService);
  protected readonly slugs = CASE_SLUGS;
  protected readonly s = () => this.i18n.t().casesSection;
}
