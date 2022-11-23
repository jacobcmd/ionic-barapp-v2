import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewProductosPageRoutingModule } from './new-productos-routing.module';

import { NewProductosPage } from './new-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewProductosPageRoutingModule
  ],
  declarations: [NewProductosPage]
})
export class NewProductosPageModule {}
