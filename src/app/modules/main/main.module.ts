import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from 'src/app/shared/components/material.module';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
    declarations: [HeaderComponent, HomeComponent],
    imports: [CommonModule,  
         MaterialModule, MainRoutingModule],
    exports: [HeaderComponent],
  })
  export class  MainModule {}