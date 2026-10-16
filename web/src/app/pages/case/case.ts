import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CASE_SLUGS, CaseSlug } from '../../content';
import { I18nService } from '../../core/i18n.service';
import { SeoService } from '../../core/seo.service';
import { CaseSection } from '../../shared/case-section';
import { MediaView } from '../../shared/media';
import { RichText } from '../../shared/rich-text';
import { NotFoundPage } from '../not-found';

@Component({
  selector: 'app-case',
  imports: [RouterLink, CaseSection, MediaView, RichText, NotFoundPage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (study(); as c) {
      @let tpl = i18n.t().caseTemplate;
      <article class="container case">
        <a class="back" [routerLink]="['/', i18n.lang()]" fragment="cases">← {{ tpl.back }}</a>

        <header class="head">
          <p class="eyebrow">{{ c.kicker }}</p>
          <h1>{{ c.title }}</h1>
          <p class="lead"><app-t [v]="c.summary" /></p>
          <dl class="facts">
            <div>
              <dt>{{ i18n.t().casesSection.metricLabel }}</dt>
              <dd class="facts__value">{{ c.keyMetric.value }}</dd>
              <dd class="muted">{{ c.keyMetric.label }}</dd>
            </div>
            @if (c.status) {
              <div>
                <dt>{{ tpl.statusLabel }}</dt>
                <dd><app-t [v]="c.status" /></dd>
              </div>
            }
          </dl>
        </header>

        <app-media [media]="c.cover" [priority]="true" sizes="100vw" />
        <p class="conf muted">{{ i18n.t().footer.confidentiality }}</p>

        <div class="sections">
          <app-case-section id="context" [heading]="tpl.sections.context">
            @for (p of c.context; track $index) {
              <p><app-t [v]="p" /></p>
            }
          </app-case-section>

          <app-case-section id="role" [heading]="tpl.sections.role">
            @for (p of c.role; track $index) {
              <p><app-t [v]="p" /></p>
            }
          </app-case-section>

          @if (c.modules; as modules) {
            <app-case-section id="modules" [heading]="tpl.sections.modules">
              <div class="modules">
                @for (m of modules; track m.title) {
                  <section class="card module">
                    <h3>{{ m.title }}</h3>
                    <dl>
                      <dt>{{ tpl.moduleLabels.problem }}</dt>
                      <dd><app-t [v]="m.problem" /></dd>
                      <dt>{{ tpl.moduleLabels.solution }}</dt>
                      <dd><app-t [v]="m.solution" /></dd>
                      <dt>{{ tpl.moduleLabels.result }}</dt>
                      <dd><app-t [v]="m.result" /></dd>
                    </dl>
                  </section>
                }
              </div>
            </app-case-section>
          }

          <app-case-section id="decisions" [heading]="tpl.sections.decisions">
            <div class="decisions">
              @for (d of c.decisions; track d.topic) {
                <section class="card decision">
                  <h3>{{ d.topic }}</h3>
                  <dl>
                    <dt>{{ tpl.decisionLabels.chosen }}</dt>
                    <dd><app-t [v]="d.chosen" /></dd>
                    <dt>{{ tpl.decisionLabels.discarded }}</dt>
                    <dd><app-t [v]="d.discarded" /></dd>
                    <dt>{{ tpl.decisionLabels.why }}</dt>
                    <dd><app-t [v]="d.why" /></dd>
                  </dl>
                </section>
              }
            </div>
          </app-case-section>

          <app-case-section id="architecture" [heading]="tpl.sections.architecture">
            <app-media [media]="c.architecture.media" sizes="100vw" />
            <p class="muted caption"><app-t [v]="c.architecture.caption" /></p>
          </app-case-section>

          <app-case-section id="results" [heading]="tpl.sections.results">
            <ul class="results">
              @for (r of c.results; track r.label) {
                <li class="result">
                  <span class="result__label">{{ r.label }}</span>
                  <span class="result__value">
                    @if (r.before) {
                      <span class="result__before" [attr.aria-label]="tpl.before"><app-t [v]="r.before" /></span>
                      <span aria-hidden="true">→</span>
                    }
                    <strong [attr.aria-label]="r.before ? tpl.after : null"><app-t [v]="r.after" /></strong>
                  </span>
                </li>
              }
            </ul>
          </app-case-section>

          <app-case-section id="tech" [heading]="tpl.sections.tech">
            <div class="tech">
              @for (g of c.tech; track g.group) {
                <div>
                  <h3 class="tech__group">{{ g.group }}</h3>
                  <ul class="chips">
                    @for (item of g.items; track item) {
                      <li class="chip"><app-t [v]="item" /></li>
                    }
                  </ul>
                </div>
              }
            </div>
          </app-case-section>

          <app-case-section id="retro" [heading]="tpl.sections.retro">
            @for (p of c.retro; track $index) {
              <p><app-t [v]="p" /></p>
            }
          </app-case-section>

          <app-case-section id="demo" [heading]="tpl.sections.demo">
            <app-media [media]="c.demo.media" sizes="100vw" />
            <p class="muted caption"><app-t [v]="c.demo.caption" /></p>
          </app-case-section>
        </div>

        <nav class="next" aria-label="Case studies">
          <a [routerLink]="['/', i18n.lang(), 'cases', nextSlug()]">
            <span class="next__label">{{ tpl.next }}</span>
            <span class="next__title">{{ i18n.t().cases[nextSlug()].title }} →</span>
          </a>
        </nav>
      </article>
    } @else {
      <app-not-found />
    }
  `,
  styles: `
    .case {
      display: grid;
      gap: var(--space-4);
      padding-block: var(--space-4) var(--space-7);
    }
    .back {
      justify-self: start;
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      font-weight: 500;
      text-decoration: none;
    }
    .head {
      display: grid;
      gap: var(--space-2);
      max-width: 860px;
    }
    .lead {
      font-size: 1.1875rem;
      color: var(--ink-soft);
    }
    .facts {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2) var(--space-5);
      margin: var(--space-2) 0 0;
    }
    .facts dt {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink-soft);
    }
    .facts dd {
      margin: 0;
    }
    .facts__value {
      font-family: var(--font-mono);
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--accent-text);
    }
    .conf {
      font-size: 0.875rem;
    }
    .sections {
      display: grid;
      gap: var(--space-5);
      max-width: 860px;
    }
    .decisions,
    .modules {
      display: grid;
      gap: var(--space-2);
    }
    .decision,
    .module {
      padding: var(--space-3);
      display: grid;
      gap: var(--space-2);
    }
    dl {
      display: grid;
      gap: 4px;
      margin: 0;
    }
    dt {
      margin-top: 10px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink-soft);
    }
    dd {
      margin: 0;
    }
    .caption {
      font-size: 0.9375rem;
    }
    .results {
      display: grid;
    }
    .result {
      display: grid;
      gap: 4px;
      padding-block: 14px;
      border-bottom: 1px solid var(--sand);
    }
    .result__label {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      letter-spacing: 0.04em;
      color: var(--ink-soft);
    }
    .result__value {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 8px 12px;
      font-size: 1.125rem;
    }
    .result__before {
      color: var(--ink-soft);
      text-decoration: line-through;
      text-decoration-thickness: 1px;
    }
    .tech {
      display: grid;
      gap: var(--space-3);
    }
    .tech__group {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 500;
      color: var(--ink-soft);
      margin-bottom: 8px;
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
    .next a {
      display: grid;
      gap: 6px;
      padding: var(--space-3);
      border: 1px solid var(--sand);
      border-radius: var(--radius);
      background: var(--paper);
      text-decoration: none;
      color: var(--ink);
      transition: border-color 0.25s var(--ease);
    }
    .next a:hover {
      border-color: var(--ink);
    }
    .next__label {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink-soft);
    }
    .next__title {
      font-family: var(--font-serif);
      font-size: 1.375rem;
      letter-spacing: -0.01em;
    }
  `,
})
export class CasePage {
  /** Parámetro :slug de la ruta (withComponentInputBinding). */
  readonly slug = input.required<string>();

  protected readonly i18n = inject(I18nService);

  protected readonly study = computed(() => {
    const slug = this.slug();
    return this.isSlug(slug) ? this.i18n.t().cases[slug] : null;
  });

  protected readonly nextSlug = computed<CaseSlug>(() => {
    const slug = this.slug();
    const i = this.isSlug(slug) ? CASE_SLUGS.indexOf(slug) : -1;
    return CASE_SLUGS[(i + 1) % CASE_SLUGS.length];
  });

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const t = this.i18n.t();
      const c = this.study();
      if (!c) return;
      seo.apply({
        lang: t.lang,
        title: `${c.title} — ${t.meta.siteName}`,
        description: c.summary,
        path: `/cases/${c.slug}`,
      });
    });
  }

  private isSlug(value: string): value is CaseSlug {
    return (CASE_SLUGS as readonly string[]).includes(value);
  }
}
