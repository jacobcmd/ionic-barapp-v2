import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisosPrivacidadPageRoutingModule } from './avisos-privacidad-routing.module';

import { AvisosPrivacidadPage } from './avisos-privacidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisosPrivacidadPageRoutingModule
  ],
  declarations: [AvisosPrivacidadPage]
})
export class AvisosPrivacidadPageModule {}
