import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOrdenesPageRoutingModule } from './new-ordenes-routing.module';

import { NewOrdenesPage } from './new-ordenes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewOrdenesPageRoutingModule
  ],
  declarations: [NewOrdenesPage]
})
export class NewOrdenesPageModule {}
