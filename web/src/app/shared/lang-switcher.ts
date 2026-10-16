import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LANGS } from '../core/lang';
import { I18nService } from '../core/i18n.service';

/** Selector EN | ES: enlaces reales a la misma página en el otro idioma (funciona sin JS y es rastreable). */
@Component({
  selector: 'app-lang-switcher',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="switcher" [attr.aria-label]="i18n.t().ui.langSwitcherLabel">
      <svg class="globe" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5" />
        <ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="currentColor" stroke-width="1.5" />
        <path d="M3 12h18M4.5 7.5h15M4.5 16.5h15" fill="none" stroke="currentColor" stroke-width="1.5" />
      </svg>
      @for (l of langs; track l) {
        <a
          [routerLink]="i18n.pathFor(l)"
          [class.active]="l === i18n.lang()"
          [attr.hreflang]="l"
          [attr.lang]="l"
          [attr.aria-label]="l.toUpperCase() + ', ' + i18n.t().ui.langNames[l]"
          [attr.aria-current]="l === i18n.lang() ? 'true' : null"
          (click)="i18n.remember(l)"
          >{{ l.toUpperCase() }}</a
        >
      }
    </nav>
  `,
  styles: `
    .switcher {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 3px 3px 3px 10px;
      border: 1px solid var(--sand);
      border-radius: 999px;
      background: var(--cream);
      color: var(--ink-soft);
    }
    .globe {
      margin-right: 4px;
    }
    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      padding-inline: 12px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      color: var(--ink);
      text-decoration: none;
      transition:
        background-color 0.2s var(--ease),
        color 0.2s var(--ease);
    }
    a:hover {
      background: var(--paper);
      color: var(--ink);
    }
    a.active {
      background: var(--ink);
      color: var(--cream);
    }
  `,
})
export class LangSwitcher {
  protected readonly i18n = inject(I18nService);
  protected readonly langs = LANGS;
}
