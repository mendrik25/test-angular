import { Routes } from '@angular/router';
import { authenticationGuard } from './shared/guards/authentication.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './authentication/containers/authentication-root/authentication-root.component'
      ).then((m) => m.AuthenticationRootComponent),
  },
  {
    path: 'exam',
    loadComponent: () =>
      import('./exam/containers/exam-root/exam-root.component').then(
        (m) => m.ExamRootComponent
      ),
    canActivate: [authenticationGuard],
  },
];
