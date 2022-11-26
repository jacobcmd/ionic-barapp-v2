import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Pulseras, PulserasService } from '../services/pulseras.service';
import { Productos, ProductosService } from '../services/productos.service';
import { Ordenes, OrdenesService } from '../services/ordenes.service';
import { AlertController, ModalController } from '@ionic/angular';
import { OrdenesModalPage } from '../ordenes-modal/ordenes-modal.page';
import { FormControl } from '@angular/forms';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  pulseras: Pulseras[];
  productos: Productos[];
  ordenes: Ordenes[];
  searchedOrdenes: any;
  control = new FormControl();
  id : string;
  pulsera : Pulseras;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private http: HttpClient, 
    private service: PulserasService, 
    private serviceP: ProductosService, 
    private serviceO: OrdenesService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    ) { }

    ngOnInit(): void {
    }

    ionViewWillEnter(){
      if(this.id ){
        this.buscarPulsera();
        console.log("Id init" ,this.id);
      }
    }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.id=barcodeData.text;      
      this.buscarPulsera();
     }).catch(err => {
         console.log('Error', err);
     });
  }

  onCreate() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    this.http.post(`http://localhost/auth_app/api/create`, 'body', { headers }).subscribe(console.log);
  }



  addOrden(id : String) {
    this.modalCtrl
    .create({
      component: OrdenesModalPage,
      componentProps: { id }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({ data, role }) => {
      console.log(id);
      if (role === 'created'){
        this.ordenes.push();
      }
    });
  }

  nuevaOrden(id : String){
    this.modalCtrl
    .create({
      component: OrdenesModalPage,
      componentProps: { id }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({ data, role }) => {
      this.ordenes = this.ordenes.filter(std => {
        console.log("Update ordenes");
        if(data.id === std.id){
          return data;
        }
        return std;
      });
    });
  }

  buscarPulsera(){
    this.service.get(this.id).subscribe(response => {
      this.pulsera = response;
      console.log(this.pulsera);
    });
    this.serviceO.get(this.id).subscribe(responseO => {
      this.ordenes = responseO;
    })
  }

  pagar(){
    this.service.update(this.pulsera, this.id).subscribe(() => {
      this.buscarPulsera();
    });
  }

  removeOrdenes(id: number){
    this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estas seguro que quieres eliminar el producto?',
      buttons: [{
        text: 'Si',
        handler: () => {
          console.log
          this.serviceO.remove(id).subscribe(() => {
            console.log('delete orden # ', id);
            this.buscarPulsera();
          });
        }
      }, 
    { text: 'No' } 
  ]
}).then(alertEl => alertEl.present());
  }

  

}
