import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Pending } from './pending';

interface Segment {
  readonly text?: string;
  readonly pending?: string;
}

const MARKER = /\[PENDIENTE:\s*([^\]]+)\]/g;

/** Parte un string en texto y marcadores `[PENDIENTE: …]`. Exportado para pruebas. */
export function splitPending(value: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of value.matchAll(MARKER)) {
    const index = m.index ?? 0;
    if (index > last) out.push({ text: value.slice(last, index) });
    out.push({ pending: m[1].trim() });
    last = index + m[0].length;
  }
  if (last < value.length) out.push({ text: value.slice(last) });
  return out;
}

/** Texto del contenido: resalta los marcadores PENDIENTE como etiquetas visibles. */
@Component({
  selector: 'app-t',
  imports: [Pending],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `@for (s of segments(); track $index) {
    @if (s.pending !== undefined) {
      <app-pending [note]="s.pending" />
    } @else {
      {{ s.text }}
    }
  }`,
})
export class RichText {
  readonly v = input.required<string>();
  protected readonly segments = computed(() => splitPending(this.v()));
}
