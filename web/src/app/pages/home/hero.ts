import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { MediaView } from '../../shared/media';
import { RichText } from '../../shared/rich-text';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, MediaView, RichText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <div class="container hero__grid">
        <div class="hero__photo rise" style="--i: 0">
          <div class="parallax">
            <app-media [media]="hero().photo" [priority]="true" sizes="(min-width: 900px) 35vw, 70vw" />
          </div>
        </div>
        <div class="hero__copy">
          <p class="eyebrow rise" style="--i: 1"><app-t [v]="hero().eyebrow" /></p>
          <h1 id="hero-title" class="rise" style="--i: 2"><app-t [v]="hero().headline" /></h1>
          <p class="hero__sub rise" style="--i: 3"><app-t [v]="hero().subtitle" /></p>
          <div class="hero__cta rise" style="--i: 4">
            <a class="btn btn--primary btn--block-mobile" [routerLink]="['/', i18n.lang()]" fragment="cases">{{
              hero().ctaCases
            }}</a>
            <a class="btn btn--ghost btn--block-mobile" [routerLink]="['/', i18n.lang()]" fragment="contact">{{
              hero().ctaContact
            }}</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      padding-block: var(--space-5) var(--space-7);
    }
    .hero__grid {
      display: grid;
      gap: var(--space-4);
      align-items: center;
    }
    .hero__photo {
      width: min(260px, 70%);
    }
    .hero__copy {
      display: grid;
      gap: var(--space-3);
      justify-items: start;
    }
    .hero__sub {
      font-size: 1.1875rem;
      color: var(--ink-soft);
      max-width: 54ch;
    }
    .hero__cta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      width: 100%;
    }

    @media (min-width: 900px) {
      .hero {
        padding-block: var(--space-7) var(--space-8);
      }
      .hero__grid {
        grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
        gap: var(--space-6);
      }
      .hero__photo {
        order: 2;
        width: 100%;
        max-width: 420px;
        justify-self: end;
      }
      .hero__copy {
        order: 1;
      }
    }
  `,
})
export class Hero {
  protected readonly i18n = inject(I18nService);
  protected readonly hero = () => this.i18n.t().hero;
}
