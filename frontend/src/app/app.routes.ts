import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'infinite-scroll', loadComponent: () => import('./infinite-scroll/infinite-scroll.component').then(m => m.IsComponent) },
];
