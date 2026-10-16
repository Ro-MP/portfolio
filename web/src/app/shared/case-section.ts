import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from './reveal.directive';

/** Bloque titulado de un caso de estudio (misma estructura para todos los casos). */
@Component({
  selector: 'app-case-section',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="block" appReveal [attr.aria-labelledby]="id()">
      <h2 class="block__title" [id]="id()">{{ heading() }}</h2>
      <div class="block__body"><ng-content /></div>
    </section>
  `,
  styles: `
    .block {
      display: grid;
      gap: var(--space-3);
      padding-top: var(--space-5);
      border-top: 1px solid var(--sand);
    }
    .block__title {
      font-size: clamp(1.5rem, 2.6vw, 2rem);
    }
    .block__body {
      display: grid;
      gap: var(--space-2);
    }
  `,
})
export class CaseSection {
  readonly id = input.required<string>();
  readonly heading = input.required<string>();
}
