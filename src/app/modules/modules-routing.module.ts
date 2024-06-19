import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: { title: 'Dashboard Modules' },
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: { title: 'Dashboard Modules' },
  },
  {
    path: 'data-processing',
    loadChildren: () =>
      import('./data-processing/data-processing.module').then(
        (m) => m.DataProcessingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
