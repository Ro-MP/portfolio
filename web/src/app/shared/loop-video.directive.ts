import { DOCUMENT } from '@angular/common';
import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';
import { prefersReducedMotion } from './motion';

/** Reproduce el loop al entrar en pantalla y lo pausa al salir. Con "reducir movimiento" no se reproduce solo. */
@Directive({ selector: 'video[appLoopVideo]' })
export class LoopVideo {
  private readonly el = inject<ElementRef<HTMLVideoElement>>(ElementRef);
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const video = this.el.nativeElement;
      if (prefersReducedMotion(this.doc.defaultView)) {
        video.controls = true;
        return;
      }
      if (typeof IntersectionObserver === 'undefined') return;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              void video.play().catch(() => undefined);
            } else {
              video.pause();
            }
          }
        },
        { threshold: 0.35 },
      );
      io.observe(video);
      this.destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
