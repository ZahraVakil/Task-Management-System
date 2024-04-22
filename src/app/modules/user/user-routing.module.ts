import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AuthGuard} from 'src/app/core/guards/auth/auth.guard';

const routes: Routes = [

    {
        path: 'alluser',
        component: AllUsersComponent,
        canActivate: [AuthGuard],

      },
      {
        path: 'addUser',
        component: AddUserComponent,
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
