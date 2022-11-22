import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewOrdenesPage } from './new-ordenes.page';

const routes: Routes = [
  {
    path: '',
    component: NewOrdenesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOrdenesPageRoutingModule {}
