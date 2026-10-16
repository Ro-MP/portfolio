import { RenderMode, ServerRoute } from '@angular/ssr';
import { CASE_SLUGS } from './content';
import { LANGS } from './core/lang';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => LANGS.map((lang) => ({ lang })),
  },
  {
    path: ':lang/cases/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => LANGS.flatMap((lang) => CASE_SLUGS.map((slug) => ({ lang, slug }))),
  },
  { path: '', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender },
];
