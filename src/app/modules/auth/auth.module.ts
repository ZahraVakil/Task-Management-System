import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/components/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { YInterceptor } from 'src/app/core/interceptors/y.interceptor';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: YInterceptor, multi: true },
  ],
})
export class AuthModule {}
