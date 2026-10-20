import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Media } from '../content/types';
import { LoopVideo } from './loop-video.directive';
import { Pending } from './pending';
import { SvgDraw } from './svg-draw.directive';

const KIND_LABEL: Record<Media['kind'], string> = {
  image: 'FOTO / IMAGEN',
  video: 'VIDEO',
  diagram: 'DIAGRAMA',
};

/** Imagen, loop de video o diagrama. Si falta el archivo, muestra un marco con la etiqueta PENDIENTE. */
@Component({
  selector: 'app-media',
  imports: [NgOptimizedImage, LoopVideo, Pending, SvgDraw],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="frame" [class.frame--diagram]="svgHtml()" [style.aspect-ratio]="media().ratio">
      @if (hasAsset()) {
        @switch (media().kind) {
          @case ('video') {
            <video
              appLoopVideo
              [muted]="true"
              loop
              playsinline
              preload="none"
              [attr.poster]="media().poster"
              [attr.aria-label]="media().alt"
            >
              @for (s of media().videoSources; track s.src) {
                <source [src]="s.src" [type]="s.type" />
              }
            </video>
          }
          @case ('diagram') {
            @if (svgHtml(); as html) {
              <div
                class="diagram"
                appSvgDraw
                role="img"
                tabindex="0"
                [attr.aria-label]="media().alt"
                [innerHTML]="html"
              ></div>
            } @else {
              <img [ngSrc]="media().src!" fill [alt]="media().alt" />
            }
          }
          @default {
            <img [ngSrc]="media().src!" fill [alt]="media().alt" [priority]="priority()" [sizes]="sizes()" />
          }
        }
      } @else {
        <div class="placeholder" role="img" [attr.aria-label]="media().alt">
          <span class="placeholder__kind">{{ kindLabel() }}</span>
          <app-pending [note]="media().pending ?? 'Falta este medio'" />
          <span class="placeholder__alt">{{ media().alt }}</span>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .frame {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-radius: var(--radius);
      border: 1px solid var(--sand);
      background: var(--paper);
    }
    img,
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .diagram {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      padding: var(--space-2);
    }
    .diagram :is(svg) {
      width: 100%;
      height: 100%;
    }
    /* En pantallas angostas el texto del diagrama quedaría ilegible: se fija un ancho mínimo y se desplaza en horizontal. */
    @media (max-width: 719px) {
      .frame--diagram {
        aspect-ratio: auto !important; /* gana al estilo en línea de la proporción */
        contain: inline-size; /* el ancho del SVG no debe ensanchar las rejillas que lo contienen */
      }
      .frame--diagram .diagram {
        display: block;
        place-items: start; /* centrado "unsafe": el borde izquierdo quedaría fuera del área desplazable */
        height: auto;
        overflow-x: auto;
        overscroll-behavior-x: contain;
      }
      /* El SVG entra por innerHTML y no lleva el atributo de encapsulación: por eso ::ng-deep. */
      .frame--diagram .diagram ::ng-deep svg {
        width: 720px;
        max-width: none;
        height: auto;
      }
    }
    .placeholder {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 10px;
      padding: var(--space-3);
      background:
        repeating-linear-gradient(135deg, transparent 0 14px, rgb(28 36 48 / 0.04) 14px 15px), var(--paper);
    }
    .placeholder__kind {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      color: var(--ink-soft);
    }
    .placeholder__alt {
      font-size: 0.875rem;
      color: var(--ink-soft);
      max-width: 40ch;
    }
  `,
})
export class MediaView {
  private readonly sanitizer = inject(DomSanitizer);

  readonly media = input.required<Media>();
  readonly priority = input(false);
  /** Solo valores responsivos (vw): NgOptimizedImage rechaza píxeles. */
  readonly sizes = input('(min-width: 900px) 50vw, 100vw');

  protected readonly hasAsset = computed(() => {
    const m = this.media();
    return !!(m.src || m.svg || m.videoSources?.length);
  });
  protected readonly kindLabel = computed(() => KIND_LABEL[this.media().kind]);
  /** El SVG es contenido propio del repositorio (no del usuario), por eso se marca como confiable. */
  protected readonly svgHtml = computed(() => {
    const svg = this.media().svg;
    return svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : null;
  });
}
