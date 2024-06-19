import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataProcessingRoutingModule } from './data-processing-routing.module';
import { DataProcessingComponent } from './data-processing/data-processing.component';


@NgModule({
  declarations: [
    DataProcessingComponent
  ],
  imports: [
    CommonModule,
    DataProcessingRoutingModule
  ]
})
export class DataProcessingModule { }
