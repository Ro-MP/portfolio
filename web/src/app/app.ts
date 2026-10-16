import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './core/i18n.service';
import { Footer } from './layout/footer';
import { Header } from './layout/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main">{{ t().ui.skipToContent }}</a>
    <app-header />
    <main id="main" tabindex="-1"><router-outlet /></main>
    <app-footer />
  `,
  styles: `
    main:focus {
      outline: none;
    }
  `,
})
export class App {
  protected readonly t = inject(I18nService).t;
}
