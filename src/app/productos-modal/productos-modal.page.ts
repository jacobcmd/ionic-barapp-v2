import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NewProductosPage } from '../new-productos/new-productos.page';
import { Productos, ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-productos-modal',
  templateUrl: './productos-modal.page.html',
  styleUrls: ['./productos-modal.page.scss'],
})
export class ProductosModalPage implements OnInit {
  productos: Productos[];

  constructor(
    private serviceP: ProductosService, 
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.serviceP.getAll().subscribe(responseP => {
      this.productos = responseP;
    });
  }

  addProducto() {
    this.modalCtrl
    .create({
      component: NewProductosPage
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({ data, role }) => {
      if (role === 'created'){
        this.productos.push();
      }
    });
  }

  removeProducto(id: string){
    this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estas seguro que quieres eliminar el producto?',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.serviceP.remove(id).subscribe(() => {
            this.productos = this.productos.filter(std => std.id !== id);
          });
        }
      }, 
    { text: 'No' } 
  ]
}).then(alertEl => alertEl.present());
  }

  updateProducto(producto: Productos){
    this.modalCtrl
    .create({
      component: NewProductosPage,
      componentProps: { producto }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({ data, role }) => {
      this.productos = this.productos.filter(std => {
        if(data.id === std.id){
          return data;
        }
        return std;
      });
    });
  }

}
