import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'read/:id',
    loadComponent: () => import('./read/read.page').then( m => m.ReadPage)
  },
  {
    path: 'update/:id',
    loadComponent: () => import('./update/update.page').then( m => m.UpdatePage)
  },
];
