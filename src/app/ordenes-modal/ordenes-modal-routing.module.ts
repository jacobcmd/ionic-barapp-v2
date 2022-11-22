import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesModalPage } from './ordenes-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesModalPageRoutingModule {}
