import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/components/material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageNotFoundRoutingModule } from './pageNotFound-routing.module';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [CommonModule,  
         MaterialModule, PageNotFoundRoutingModule],
    exports: [],
  })
  export class  PageNotFoundModule {}