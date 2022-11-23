import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewProductosPage } from './new-productos.page';

const routes: Routes = [
  {
    path: '',
    component: NewProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewProductosPageRoutingModule {}
