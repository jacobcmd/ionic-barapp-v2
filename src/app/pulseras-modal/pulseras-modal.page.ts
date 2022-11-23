import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NewPulserasPage } from '../new-pulseras/new-pulseras.page';
import { Pulseras, PulserasService } from '../services/pulseras.service';

@Component({
  selector: 'app-pulseras-modal',
  templateUrl: './pulseras-modal.page.html',
  styleUrls: ['./pulseras-modal.page.scss'],
})
export class PulserasModalPage implements OnInit {
  pulseras: Pulseras[];

  constructor(
    private service: PulserasService, 
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.pulseras = response;
    })
  }

  addPulsera(){
    this.modalCtrl
    .create({
      component: NewPulserasPage
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({ data, role }) => {
      if (role === 'created'){
        this.pulseras.push();
      }
    });
  }

  removePulsera(id: string){
    this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estas seguro que quieres eliminar la pulsera?',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.service.remove(id).subscribe(() => {
            this.pulseras = this.pulseras.filter(std => std.id !== id);
          });
        }
      }, 
    { text: 'No' } 
  ]
}).then(alertEl => alertEl.present());
  }

  updatePulsera(pulsera : Pulseras){
    this.modalCtrl
    .create({
      component: NewPulserasPage,
      componentProps: { pulsera }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({ data, role }) => {
      this.pulseras = this.pulseras.filter(std => {
        if(data.id === std.id){
          return data;
        }
        return std;
      });
    });
  }

}
