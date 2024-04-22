import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/main/main.module').then((mod) => mod.MainModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((mod) => mod.AuthModule),
  },

  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((mod) => mod.userModule),
      canActivate: [AuthGuard],

  },

  {
    path: 'task',
    loadChildren: () =>
      import('./modules/tasks/tasks.module').then((mod) => mod.TaskModule),
      canActivate: [AuthGuard],

  },

  {
    path: '**',
    loadChildren: () =>
      import('./modules/404/pageNotFound.module').then((mod) => mod.PageNotFoundModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
