import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/components/material.module';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AllTasksComponent],
    imports: [CommonModule,  
         MaterialModule, TasksRoutingModule,
        ReactiveFormsModule,FormsModule],
    exports: [],
  })
  export class  TaskModule {}