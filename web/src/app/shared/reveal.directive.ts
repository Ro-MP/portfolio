import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, PLATFORM_ID, afterNextRender, inject, input } from '@angular/core';
import { observeOnce, prefersReducedMotion } from './motion';

/** Aparece y sube ~20 px al entrar en pantalla (una sola vez). Ver styles/motion.css. */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal', '[style.--reveal-delay]': 'delay()' },
})
export class Reveal {
  /** Retardo escalonado en pasos de 80 ms. */
  readonly delay = input(0, { alias: 'appReveal', transform: (v: unknown) => Number(v) || 0 });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser) return;
      const el = this.el.nativeElement;
      if (prefersReducedMotion(this.doc.defaultView)) {
        el.classList.add('is-visible');
        return;
      }
      observeOnce(el, () => el.classList.add('is-visible'), 0.15);
    });
  }
}
