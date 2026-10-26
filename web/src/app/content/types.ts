/**
 * Contrato del contenido. `en.ts` y `es.ts` lo implementan: si falta una clave en un idioma, no compila.
 *
 * Marcador de pendientes: cualquier string puede incluir `[PENDIENTE: lo que falta]` y se renderiza
 * como una etiqueta visible. Los medios faltantes usan `Media.pending`.
 * `scripts/list-pending.mjs` recorre este contenido y genera PENDING.md.
 */

export type Lang = 'en' | 'es';

export const CASE_SLUGS = ['demand-forecasting', 'wms', 'tms', 'automations'] as const;
export type CaseSlug = (typeof CASE_SLUGS)[number];

export type MediaKind = 'image' | 'video' | 'diagram';

export interface Media {
  readonly kind: MediaKind;
  /** Proporción CSS, p. ej. '4 / 5'. */
  readonly ratio: string;
  readonly alt: string;
  /** Imagen (AVIF/WebP/JPG) o SVG. Si falta, se muestra el placeholder con la etiqueta PENDIENTE. */
  readonly src?: string;
  /** Video: fuentes del loop (WebM/MP4) y portada. */
  readonly videoSources?: readonly { src: string; type: string }[];
  readonly poster?: string;
  /** SVG en línea para diagramas animables con scroll. */
  readonly svg?: string;
  /** Qué falta, exactamente. Obligatorio mientras no haya `src`/`videoSources`/`svg`. */
  readonly pending?: string;
}

export interface Metric {
  readonly prefix?: string;
  readonly value: number;
  readonly suffix?: string;
  /** Texto fijo (p. ej. un rango como "6–8"). Si existe, no se anima. */
  readonly text?: string;
  readonly label: string;
  readonly context: string;
}

export interface Decision {
  readonly topic: string;
  readonly chosen: string;
  readonly discarded: string;
  readonly why: string;
}

export interface ResultRow {
  readonly label: string;
  readonly before?: string;
  readonly after: string;
}

export interface TechGroup {
  readonly group: string;
  readonly items: readonly string[];
}

export interface CaseModule {
  readonly title: string;
  readonly problem: string;
  readonly solution: string;
  readonly result: string;
}

export interface CaseStudy {
  readonly slug: CaseSlug;
  readonly kicker: string;
  readonly title: string;
  readonly summary: string;
  readonly keyMetric: { readonly value: string; readonly label: string };
  readonly status?: string;
  readonly cover: Media;
  readonly context: readonly string[];
  readonly role: readonly string[];
  readonly decisions: readonly Decision[];
  readonly architecture: { readonly caption: string; readonly media: Media };
  readonly modules?: readonly CaseModule[];
  readonly results: readonly ResultRow[];
  readonly tech: readonly TechGroup[];
  readonly retro: readonly string[];
  readonly demo: { readonly caption: string; readonly media: Media };
}

export interface SiteContent {
  readonly lang: Lang;
  readonly meta: {
    readonly siteName: string;
    readonly title: string;
    readonly description: string;
    readonly ogLocale: string;
  };
  readonly ui: {
    readonly skipToContent: string;
    readonly menuOpen: string;
    readonly menuClose: string;
    readonly langSwitcherLabel: string;
    readonly langNames: Record<Lang, string>;
    readonly pendingTag: string;
  };
  readonly nav: {
    readonly cases: string;
    readonly about: string;
    readonly contact: string;
    readonly cv: string;
    readonly cvHref?: string;
    readonly cvPending: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly headline: string;
    readonly subtitle: string;
    readonly ctaCases: string;
    readonly ctaContact: string;
    readonly photo: Media;
  };
  readonly metrics: { readonly title: string; readonly items: readonly Metric[] };
  readonly casesSection: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly readCase: string;
    readonly metricLabel: string;
  };
  readonly caseTemplate: {
    readonly back: string;
    readonly next: string;
    readonly statusLabel: string;
    readonly summaryLabel: string;
    readonly sections: {
      readonly context: string;
      readonly role: string;
      readonly decisions: string;
      readonly architecture: string;
      readonly modules: string;
      readonly results: string;
      readonly tech: string;
      readonly retro: string;
      readonly demo: string;
    };
    readonly decisionLabels: { readonly chosen: string; readonly discarded: string; readonly why: string };
    readonly before: string;
    readonly after: string;
    readonly moduleLabels: { readonly problem: string; readonly solution: string; readonly result: string };
  };
  readonly cases: Record<CaseSlug, CaseStudy>;
  readonly about: {
    readonly eyebrow: string;
    readonly title: string;
    readonly paragraphs: readonly string[];
    readonly photos: readonly Media[];
    readonly educationTitle: string;
    readonly education: readonly string[];
    readonly certificationsTitle: string;
    readonly certifications: readonly string[];
  };
  readonly stack: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly groups: readonly TechGroup[];
  };
  readonly contact: {
    readonly eyebrow: string;
    readonly title: string;
    readonly text: string;
    readonly emailLabel: string;
    readonly email: string;
    readonly linkedin: { readonly label: string; readonly href: string };
    readonly github: { readonly label: string; readonly href?: string; readonly pending: string };
    readonly cv: { readonly label: string; readonly href?: string; readonly pending: string };
    readonly expectation: string;
    readonly location: string;
  };
  readonly footer: {
    readonly confidentiality: string;
    readonly rights: string;
    readonly builtWith: string;
  };
  readonly notFound: { readonly title: string; readonly text: string; readonly home: string };
}
