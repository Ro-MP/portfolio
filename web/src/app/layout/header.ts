import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../core/i18n.service';
import { LangSwitcher } from '../shared/lang-switcher';

@Component({
  selector: 'app-header',
  imports: [RouterLink, LangSwitcher],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <div class="container header__bar">
        <a class="brand" [routerLink]="['/', i18n.lang()]" (click)="close()">{{ t().meta.siteName }}</a>

        <nav class="nav" id="site-nav" [class.nav--open]="open()" aria-label="Main">
          <a [routerLink]="['/', i18n.lang()]" fragment="cases" (click)="close()">{{ t().nav.cases }}</a>
          <a [routerLink]="['/', i18n.lang()]" fragment="about" (click)="close()">{{ t().nav.about }}</a>
          <a [routerLink]="['/', i18n.lang()]" fragment="contact" (click)="close()">{{ t().nav.contact }}</a>
          @if (t().nav.cvHref; as href) {
            <a class="btn btn--ghost btn--sm" [href]="href" download>{{ t().nav.cv }}</a>
          } @else {
            <span class="btn btn--ghost btn--sm cv-pending" [attr.title]="t().nav.cvPending"
              >{{ t().nav.cv }} <span class="mini-tag">PENDIENTE</span></span
            >
          }
        </nav>

        <div class="actions">
          <app-lang-switcher />
          <button
            type="button"
            class="burger"
            aria-controls="site-nav"
            [attr.aria-expanded]="open()"
            [attr.aria-label]="open() ? t().ui.menuClose : t().ui.menuOpen"
            (click)="open.set(!open())"
          >
            <span class="burger__line"></span>
            <span class="burger__line"></span>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: `
    .header {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgb(250 245 236 / 0.92);
      backdrop-filter: saturate(1.4) blur(10px);
      border-bottom: 1px solid var(--sand);
    }
    .header__bar {
      min-height: var(--header-h);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2);
    }
    .brand {
      font-family: var(--font-serif);
      font-size: 1.25rem;
      font-weight: 500;
      letter-spacing: -0.01em;
      color: var(--ink);
      text-decoration: none;
      white-space: nowrap;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-left: auto;
    }
    .nav a:not(.btn) {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      color: var(--ink);
      text-decoration: none;
      font-weight: 500;
    }
    .nav a:not(.btn):hover {
      color: var(--accent-text);
    }
    .btn--sm {
      min-height: 44px;
      padding: 8px 18px;
    }
    .cv-pending {
      cursor: not-allowed;
      gap: 8px;
    }
    .mini-tag {
      padding: 1px 6px;
      border-radius: 4px;
      background: var(--amber);
      color: var(--ink);
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.06em;
    }
    .actions {
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }
    .burger {
      display: none;
      width: 44px;
      height: 44px;
      border: 1px solid var(--sand);
      border-radius: 999px;
      background: var(--cream);
      cursor: pointer;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .burger__line {
      width: 18px;
      height: 1.5px;
      background: var(--ink);
    }

    @media (max-width: 860px) {
      .burger {
        display: inline-flex;
      }
      .brand {
        font-size: 1.125rem;
      }
      .nav {
        display: none;
        position: absolute;
        inset: var(--header-h) 0 auto 0;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        padding: var(--space-2) 16px var(--space-3);
        background: var(--cream);
        border-bottom: 1px solid var(--sand);
      }
      .nav--open {
        display: flex;
      }
      .nav a:not(.btn) {
        min-height: 52px;
        font-size: 1.125rem;
        border-bottom: 1px solid var(--sand);
      }
      .nav .btn {
        margin-top: var(--space-2);
        width: 100%;
      }
    }
  `,
})
export class Header {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly open = signal(false);

  protected close(): void {
    this.open.set(false);
  }
}
