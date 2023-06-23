import { Routes } from '@angular/router';
import { CanLoadGuard } from './guards/canLoad.guard';
import { CanActivateGuard } from './guards/canActivate.guard';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./modules/login/login.module').then(module => module.LoginModule),
  },
  {
    path: 'registration',
    canActivate: [CanActivateGuard],
    loadChildren: () => import('./modules/registration/registration.module').then(module => module.RegistrationModule),
  },
  {
    path: 'posts',
    canLoad: [CanLoadGuard],
    loadChildren: () => import('./modules/posts/posts.module').then(module => module.PostsModule),
  },
  {
    path: 'new-post',
    canLoad: [CanLoadGuard],
    loadChildren: () => import('./modules/new-post/new-post.module').then(module => module.NewPostModule),
  },
  {
    path: '**',
    redirectTo: ''
  },
];
