import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENT
import { SongDashboardComponent } from './song-dashboard/song-dashboard.component';

const routes: Routes = [
  {
    path:'',
    component:SongDashboardComponent
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
