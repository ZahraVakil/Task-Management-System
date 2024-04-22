import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './modules/main/main.module';
import { SharedModule } from './shared/shared-routing.module';
import { AuthModule } from './modules/auth/auth.module';
import { PageNotFoundModule } from './modules/404/pageNotFound.module';
import { userModule } from './modules/user/user.module';
import { TaskModule } from './modules/tasks/tasks.module';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    SharedModule,
    AuthModule,
    userModule,
    TaskModule,
    PageNotFoundModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
