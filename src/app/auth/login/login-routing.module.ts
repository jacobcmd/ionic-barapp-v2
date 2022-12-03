import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvisosPrivacidadPage } from 'src/app/avisos-privacidad/avisos-privacidad.page';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  /* {
    path: '/avisos-privacidad',
    component: AvisosPrivacidadPage
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
