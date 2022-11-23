import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Productos, ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-new-productos',
  templateUrl: './new-productos.page.html',
  styleUrls: ['./new-productos.page.scss'],
})
export class NewProductosPage implements OnInit {
  @Input() producto: Productos;
  isUpdate = false;
  data = {
    nombre : '',
    precio : ''
  };

  constructor(
    private modalCtrl: ModalController, 
    private service: ProductosService
    ) { }

  ngOnInit() {
    if (this.producto) {
      this.isUpdate = true;
      this.data = this.producto;
    }
  }

  closeModal(){
    this.modalCtrl.dismiss(null, 'closed');
  }

  onSubmit(form: NgForm){
    const producto = form.value;
    if(this.isUpdate){
      this.service.update(producto, this.producto.id).subscribe(() => {
        producto.id = this.producto.id;
        this.modalCtrl.dismiss(producto, 'updated');
      });
    } else {
      this.service.create(producto).subscribe(response => {
        this.modalCtrl.dismiss(response, 'created');
      }); 
    }
  }
}
