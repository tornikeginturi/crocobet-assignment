import { Routes } from '@angular/router';
import { MainComponent } from './layout/pages/main/main.page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
  },
];
