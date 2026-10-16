import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { MediaView } from '../../shared/media';
import { Reveal } from '../../shared/reveal.directive';
import { RichText } from '../../shared/rich-text';

@Component({
  selector: 'app-about',
  imports: [MediaView, Reveal, RichText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="section section--paper" aria-labelledby="about-title">
      <div class="container grid">
        <div class="photos" appReveal>
          @for (p of a().photos; track p.alt) {
            <app-media [media]="p" sizes="(min-width: 900px) 45vw, 100vw" />
          }
        </div>
        <div class="copy" appReveal="1">
          <p class="eyebrow">{{ a().eyebrow }}</p>
          <h2 id="about-title">{{ a().title }}</h2>
          @for (p of a().paragraphs; track $index) {
            <p><app-t [v]="p" /></p>
          }
          <div class="lists">
            <div>
              <h3 class="list-title">{{ a().educationTitle }}</h3>
              <ul>
                @for (e of a().education; track e) {
                  <li><app-t [v]="e" /></li>
                }
              </ul>
            </div>
            <div>
              <h3 class="list-title">{{ a().certificationsTitle }}</h3>
              <ul>
                @for (c of a().certifications; track c) {
                  <li><app-t [v]="c" /></li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      gap: var(--space-5);
      align-items: start;
    }
    .photos {
      display: grid;
      gap: var(--space-2);
    }
    .copy {
      display: grid;
      gap: var(--space-2);
    }
    .lists {
      display: grid;
      gap: var(--space-3);
      margin-top: var(--space-2);
    }
    .list-title {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 500;
      color: var(--ink-soft);
      margin-bottom: 8px;
    }
    li {
      padding-block: 6px;
      border-bottom: 1px solid var(--sand);
    }
    @media (min-width: 900px) {
      .grid {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
        gap: var(--space-6);
      }
      .photos {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class About {
  protected readonly i18n = inject(I18nService);
  protected readonly a = () => this.i18n.t().about;
}
