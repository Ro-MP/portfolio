import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { Reveal } from '../../shared/reveal.directive';
import { RichText } from '../../shared/rich-text';

@Component({
  selector: 'app-stack',
  imports: [Reveal, RichText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="stack" class="section" aria-labelledby="stack-title">
      <div class="container">
        <header class="head" appReveal>
          <p class="eyebrow">{{ s().eyebrow }}</p>
          <h2 id="stack-title">{{ s().title }}</h2>
          <p class="muted">{{ s().intro }}</p>
        </header>
        <div class="groups">
          @for (g of s().groups; track g.group; let i = $index) {
            <section class="group" [appReveal]="i % 3">
              <h3>{{ g.group }}</h3>
              <ul class="chips">
                @for (item of g.items; track item) {
                  <li class="chip"><app-t [v]="item" /></li>
                }
              </ul>
            </section>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .head {
      display: grid;
      gap: var(--space-2);
      margin-bottom: var(--space-5);
    }
    .groups {
      display: grid;
      gap: var(--space-4) var(--space-4);
    }
    h3 {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 500;
      color: var(--ink-soft);
      margin-bottom: 12px;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .chip {
      padding: 6px 14px;
      border: 1px solid var(--sand);
      border-radius: 999px;
      background: var(--paper);
      font-size: 0.9375rem;
    }
    @media (min-width: 720px) {
      .groups {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (min-width: 1000px) {
      .groups {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
  `,
})
export class Stack {
  protected readonly i18n = inject(I18nService);
  protected readonly s = () => this.i18n.t().stack;
}
