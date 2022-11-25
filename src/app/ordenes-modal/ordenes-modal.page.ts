import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  ModalController } from '@ionic/angular';
import { Ordenes, OrdenesService } from '../services/ordenes.service';
import { Productos, ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-ordenes-modal',
  templateUrl: './ordenes-modal.page.html',
  styleUrls: ['./ordenes-modal.page.scss'],
})
export class OrdenesModalPage implements OnInit {
  productos : Productos[];
  @Input() ordenes : Ordenes;
  isUpdate = false;
  data = {
    id_pulsera : '',
    id_producto : '',
    cantidad : '',
    id_usuario : ''
  }

  constructor(
    private serviceO : OrdenesService,
    private modalCtrl : ModalController,
    private serviceP : ProductosService
  ) { }

  ngOnInit() {
    if (this.ordenes) {
      this.isUpdate = true;
      this.data = this.ordenes;
    }
    this.serviceP.getAll().subscribe(responseP => {
      this.productos = responseP;
    });
  }

  closeModal(){
    this.modalCtrl.dismiss(null, 'closed');
  }

  onSubmit(form: NgForm){
    const orden = form.value;
    if(this.isUpdate){
      this.serviceO.update(orden, this.ordenes.id).subscribe(() => {
        this.ordenes.id = this.ordenes.id;
        this.modalCtrl.dismiss(orden, 'updated');
      });
    } else {
      this.serviceO.create(orden).subscribe(response => {
        this.modalCtrl.dismiss(response, 'created');
      });
      
    }
  }

}
