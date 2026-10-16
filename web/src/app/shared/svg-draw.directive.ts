import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';
import { observeOnce, prefersReducedMotion } from './motion';

const GEOMETRY = 'path, line, polyline, polygon, circle, ellipse';

/**
 * Dibuja los trazos de un SVG en línea al entrar en pantalla.
 * Con "reducir movimiento" (o sin soporte de getTotalLength) el SVG queda estático.
 */
@Directive({ selector: '[appSvgDraw]', host: { class: 'svg-draw' } })
export class SvgDraw {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly doc = inject(DOCUMENT);

  constructor() {
    afterNextRender(() => {
      if (prefersReducedMotion(this.doc.defaultView)) return;
      const shapes = Array.from(this.el.nativeElement.querySelectorAll<SVGGeometryElement>(GEOMETRY)).filter(
        (s) => typeof s.getTotalLength === 'function',
      );
      if (!shapes.length) return;

      for (const shape of shapes) {
        const length = shape.getTotalLength();
        shape.classList.add('draw');
        shape.style.strokeDasharray = `${length}`;
        shape.style.strokeDashoffset = `${length}`;
      }
      observeOnce(this.el.nativeElement, () => {
        for (const shape of shapes) shape.style.strokeDashoffset = '0';
      });
    });
  }
}
