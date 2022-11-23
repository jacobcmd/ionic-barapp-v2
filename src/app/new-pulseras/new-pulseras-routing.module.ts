import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPulserasPage } from './new-pulseras.page';

const routes: Routes = [
  {
    path: '',
    component: NewPulserasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPulserasPageRoutingModule {}
