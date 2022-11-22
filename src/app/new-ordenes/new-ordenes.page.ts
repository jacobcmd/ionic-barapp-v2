import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { OrdenesModalPage } from '../ordenes-modal/ordenes-modal.page';
import { Ordenes, OrdenesService } from '../services/ordenes.service';

@Component({
  selector: 'app-new-ordenes',
  templateUrl: './new-ordenes.page.html',
  styleUrls: ['./new-ordenes.page.scss'],
})
export class NewOrdenesPage implements OnInit {
  ordenes: Ordenes[];

  constructor(
    private service: OrdenesService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.service.getAll().subscribe(responseP => {
      this.ordenes = responseP;
    });
  }

  closeModal(){
    this.modalCtrl.dismiss(null, 'closed');
  }

  removeOrdenes(id: string){
    this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estas seguro que quieres eliminar el producto?',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.service.remove(id).subscribe(() => {
            this.ordenes = this.ordenes.filter(std => std.id !== id);
          });
        }
      }, 
    { text: 'No' } 
  ]
}).then(alertEl => alertEl.present());
  }

  updateOrdenes(ordenes: Ordenes){
    this.modalCtrl
    .create({
      component: OrdenesModalPage,
      componentProps: { ordenes }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({ data, role }) => {
      this.ordenes = this.ordenes.filter(std => {
        if(data.id === std.id){
          return data;
        }
        return std;
      });
    });
  }

}
