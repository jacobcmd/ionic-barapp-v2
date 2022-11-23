import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPulserasPageRoutingModule } from './new-pulseras-routing.module';

import { NewPulserasPage } from './new-pulseras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPulserasPageRoutingModule
  ],
  declarations: [NewPulserasPage]
})
export class NewPulserasPageModule {}
