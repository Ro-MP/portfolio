import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Metric, Media } from '../content/types';
import { langGuard } from '../core/lang.guard';
import { Counter } from './counter';
import { LangSwitcher } from './lang-switcher';
import { MediaView } from './media';
import { Reveal } from './reveal.directive';
import { RichText, splitPending } from './rich-text';
import { SvgDraw } from './svg-draw.directive';

function mockReducedMotion(reduce: boolean): void {
  vi.stubGlobal('matchMedia', (q: string) => ({ matches: reduce && q.includes('reduce'), media: q }));
}

afterEach(() => vi.unstubAllGlobals());

describe('splitPending', () => {
  it('separa texto y marcadores', () => {
    expect(splitPending('Hola [PENDIENTE: dato] fin')).toEqual([{ text: 'Hola ' }, { pending: 'dato' }, { text: ' fin' }]);
    expect(splitPending('sin marcador')).toEqual([{ text: 'sin marcador' }]);
  });
});

describe('RichText', () => {
  it('renderiza el marcador como etiqueta visible', async () => {
    const f = TestBed.createComponent(RichText);
    f.componentRef.setInput('v', 'Texto [PENDIENTE: falta la foto]');
    await f.whenStable();
    const el: HTMLElement = f.nativeElement;
    expect(el.textContent).toContain('Texto');
    expect(el.querySelector('.pending__tag')?.textContent).toBe('PENDIENTE');
    expect(el.querySelector('.pending__note')?.textContent).toBe('falta la foto');
  });
});

describe('MediaView', () => {
  const base: Media = { kind: 'image', ratio: '4 / 5', alt: 'Retrato', pending: 'Retrato profesional' };

  it('sin archivo muestra el marco con la etiqueta PENDIENTE', async () => {
    const f = TestBed.createComponent(MediaView);
    f.componentRef.setInput('media', base);
    await f.whenStable();
    const el: HTMLElement = f.nativeElement;
    expect(el.querySelector('.placeholder')).toBeTruthy();
    expect(el.textContent).toContain('Retrato profesional');
    expect(el.querySelector('img')).toBeNull();
  });

  it('con archivo renderiza la imagen y no el marco', async () => {
    const f = TestBed.createComponent(MediaView);
    f.componentRef.setInput('media', { ...base, src: '/media/portrait.avif' });
    await f.whenStable();
    const el: HTMLElement = f.nativeElement;
    expect(el.querySelector('img')?.getAttribute('alt')).toBe('Retrato');
    expect(el.querySelector('.placeholder')).toBeNull();
  });

  it('un video con fuentes renderiza <video> mudo en loop', async () => {
    const f = TestBed.createComponent(MediaView);
    f.componentRef.setInput('media', {
      kind: 'video',
      ratio: '16 / 10',
      alt: 'Loop',
      videoSources: [{ src: '/media/loop.mp4', type: 'video/mp4' }],
    } satisfies Media);
    await f.whenStable();
    const video = (f.nativeElement as HTMLElement).querySelector('video')!;
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.getAttribute('preload')).toBe('none');
  });
});

describe('Counter', () => {
  it('sin animación muestra el valor final con prefijo y sufijo', async () => {
    const f = TestBed.createComponent(Counter);
    const m: Metric = { prefix: '~', value: 70, suffix: '%', label: 'x', context: 'y' };
    f.componentRef.setInput('metric', m);
    await f.whenStable();
    expect((f.nativeElement as HTMLElement).textContent).toContain('~70%');
  });

  it('un texto fijo (rango) no se anima', async () => {
    const f = TestBed.createComponent(Counter);
    f.componentRef.setInput('metric', { text: '6–8', value: 8, suffix: ' hrs', label: 'x', context: 'y' } satisfies Metric);
    await f.whenStable();
    expect((f.nativeElement as HTMLElement).textContent).toContain('6–8 hrs');
  });
});

@Component({ imports: [Reveal], template: `<div appReveal="2">x</div>` })
class RevealHost {}

describe('Reveal', () => {
  it('añade la clase reveal y el retardo', async () => {
    mockReducedMotion(false);
    const f = TestBed.createComponent(RevealHost);
    await f.whenStable();
    const el = (f.nativeElement as HTMLElement).querySelector('div')!;
    expect(el.classList.contains('reveal')).toBe(true);
    expect(el.style.getPropertyValue('--reveal-delay')).toBe('2');
  });

  it('con "reducir movimiento" queda visible de inmediato', async () => {
    mockReducedMotion(true);
    const f = TestBed.createComponent(RevealHost);
    await f.whenStable();
    expect((f.nativeElement as HTMLElement).querySelector('div')!.classList.contains('is-visible')).toBe(true);
  });
});

@Component({
  imports: [SvgDraw],
  template: `<div appSvgDraw><svg><path d="M0 0L10 10" /></svg></div>`,
})
class DrawHost {}

describe('SvgDraw', () => {
  beforeEach(() => {
    (SVGElement.prototype as unknown as { getTotalLength: () => number }).getTotalLength = () => 120;
  });
  afterEach(() => {
    delete (SVGElement.prototype as unknown as { getTotalLength?: () => number }).getTotalLength;
  });

  it('prepara los trazos para dibujarse', async () => {
    mockReducedMotion(false);
    const f = TestBed.createComponent(DrawHost);
    await f.whenStable();
    const path = (f.nativeElement as HTMLElement).querySelector('path')!;
    expect(path.classList.contains('draw')).toBe(true);
    expect(path.style.strokeDasharray).toBe('120');
  });

  it('con "reducir movimiento" no toca el SVG', async () => {
    mockReducedMotion(true);
    const f = TestBed.createComponent(DrawHost);
    await f.whenStable();
    const path = (f.nativeElement as HTMLElement).querySelector('path')!;
    expect(path.classList.contains('draw')).toBe(false);
    expect(path.style.strokeDasharray).toBe('');
  });
});

@Component({ template: '' })
class Dummy {}

describe('LangSwitcher', () => {
  it('enlaza a la misma página en el otro idioma y marca el activo', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: ':lang', canActivate: [langGuard], children: [{ path: 'cases/:slug', component: Dummy }] }]),
      ],
    });
    await TestBed.inject(Router).navigateByUrl('/en/cases/tms');
    const f = TestBed.createComponent(LangSwitcher);
    await f.whenStable();
    const links = Array.from((f.nativeElement as HTMLElement).querySelectorAll('a'));
    expect(links.map((a) => a.textContent?.trim())).toEqual(['EN', 'ES']);
    expect(links[1].getAttribute('href')).toBe('/es/cases/tms');
    expect(links[0].getAttribute('aria-current')).toBe('true');
    expect(links[1].getAttribute('aria-current')).toBeNull();
    // El nombre accesible empieza con el texto visible (WCAG 2.5.3).
    expect(links[0].getAttribute('aria-label')).toBe('EN, English');
    expect(links[1].getAttribute('lang')).toBe('es');
  });
});
