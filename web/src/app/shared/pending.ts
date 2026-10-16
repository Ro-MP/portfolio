import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Etiqueta visible de "falta algo aquí". Solo existe mientras haya contenido pendiente. */
@Component({
  selector: 'app-pending',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="pending" role="note"
    ><span class="pending__tag">PENDIENTE</span><span class="pending__note">{{ note() }}</span></span
  >`,
  styles: `
    .pending {
      display: inline-flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 6px;
      padding: 2px 8px;
      border: 1px dashed var(--ink);
      border-radius: 6px;
      background: var(--amber);
      color: var(--ink);
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      line-height: 1.4;
      vertical-align: baseline;
    }
    .pending__tag {
      font-weight: 500;
      letter-spacing: 0.06em;
    }
    .pending__note::before {
      content: '·';
      margin-right: 6px;
    }
  `,
})
export class Pending {
  readonly note = input.required<string>();
}
