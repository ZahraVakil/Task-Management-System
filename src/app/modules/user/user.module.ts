import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/components/material.module';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { UserRoutingModule } from './user-routing.module';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AllUsersComponent, AddUserComponent, EditUserComponent],
    imports: [CommonModule,  
         MaterialModule, UserRoutingModule,
         ReactiveFormsModule,
        ],
    exports: [],
  })
  export class  userModule {}