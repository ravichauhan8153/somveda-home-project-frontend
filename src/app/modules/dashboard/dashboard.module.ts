import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Load Module
import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';

// COMPONENT
import { SongDashboardComponent } from './song-dashboard/song-dashboard.component';

@NgModule({
  declarations: [
    SongDashboardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
