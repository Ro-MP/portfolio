import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <p class="footer__note">{{ t().footer.confidentiality }}</p>
        <div class="footer__meta">
          <span>{{ t().footer.rights }}</span>
          <span>{{ t().footer.builtWith }}</span>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      border-top: 1px solid var(--sand);
      background: var(--cream);
      padding-block: var(--space-5);
    }
    .footer__inner {
      display: grid;
      gap: var(--space-3);
    }
    .footer__note {
      color: var(--ink);
      font-size: 0.9375rem;
    }
    .footer__meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px var(--space-4);
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      color: var(--ink-soft);
    }
  `,
})
export class Footer {
  protected readonly t = inject(I18nService).t;
}
