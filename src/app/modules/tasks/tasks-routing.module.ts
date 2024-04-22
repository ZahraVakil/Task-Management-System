import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';

const routes: Routes = [

    {
        path: 'alltask',
        component: AllTasksComponent,
        canActivate: [AuthGuard],

      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
