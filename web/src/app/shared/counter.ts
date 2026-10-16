import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { Metric } from '../content/types';
import { observeOnce, prefersReducedMotion } from './motion';

const DURATION_MS = 1400;

/** Cifra que sube de 0 al valor al entrar en pantalla (una vez). Sin JS o con "reducir movimiento" muestra el valor final. */
@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="num" aria-hidden="true">{{ display() }}</span
    ><span class="visually-hidden">{{ final() }}</span>`,
})
export class Counter {
  readonly metric = input.required<Metric>();

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly current = signal<number | null>(null);

  protected readonly final = computed(() => this.format(this.metric().value));
  protected readonly display = computed(() => {
    const m = this.metric();
    if (m.text || this.current() === null) return this.format(m.value);
    return this.format(this.current()!);
  });

  constructor() {
    afterNextRender(() => {
      const m = this.metric();
      const win = this.doc.defaultView;
      if (m.text || !win || prefersReducedMotion(win) || typeof IntersectionObserver === 'undefined') return;

      this.current.set(0);
      let frame = 0;
      const stop = observeOnce(this.el.nativeElement, () => {
        const start = win.performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          this.current.set(Math.round(m.value * eased));
          if (p < 1) frame = win.requestAnimationFrame(tick);
        };
        frame = win.requestAnimationFrame(tick);
      });
      this.destroyRef.onDestroy(() => {
        stop();
        win.cancelAnimationFrame(frame);
      });
    });
  }

  private format(n: number): string {
    const m = this.metric();
    return `${m.prefix ?? ''}${m.text ?? n}${m.suffix ?? ''}`;
  }
}
