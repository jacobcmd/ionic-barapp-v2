import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PulserasModalPageRoutingModule } from './pulseras-modal-routing.module';

import { PulserasModalPage } from './pulseras-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PulserasModalPageRoutingModule
  ],
  declarations: [PulserasModalPage]
})
export class PulserasModalPageModule {}
