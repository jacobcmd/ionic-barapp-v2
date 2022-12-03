import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisosPrivacidadPage } from './avisos-privacidad.page';

const routes: Routes = [
  {
    path: '',
    component: AvisosPrivacidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisosPrivacidadPageRoutingModule {}
