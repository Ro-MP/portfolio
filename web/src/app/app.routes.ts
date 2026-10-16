import { Routes } from '@angular/router';
import { langGuard } from './core/lang.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/root-redirect').then((m) => m.RootRedirect),
  },
  {
    path: ':lang',
    canActivate: [langGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.HomePage) },
      { path: 'cases/:slug', loadComponent: () => import('./pages/case/case').then((m) => m.CasePage) },
    ],
  },
  { path: '**', loadComponent: () => import('./pages/not-found').then((m) => m.NotFoundPage) },
];
