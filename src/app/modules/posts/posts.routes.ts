import { Routes } from '@angular/router';
import { PostsComponent } from "./posts.component";
import { DetailsPostComponent } from "./details-post/details-post.component";

export const ROUTES: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: ':id',
    component: DetailsPostComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
