import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PulserasModalPage } from './pulseras-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PulserasModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PulserasModalPageRoutingModule {}
