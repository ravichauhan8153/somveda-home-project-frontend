import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataProcessingComponent } from './data-processing/data-processing.component';

const routes: Routes = [
  { 
    path: '', 
    component: DataProcessingComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataProcessingRoutingModule {}
