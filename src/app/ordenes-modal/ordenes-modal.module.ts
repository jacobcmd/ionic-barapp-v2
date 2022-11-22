import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenesModalPageRoutingModule } from './ordenes-modal-routing.module';

import { OrdenesModalPage } from './ordenes-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenesModalPageRoutingModule
  ],
  declarations: [OrdenesModalPage]
})
export class OrdenesModalPageModule {}
