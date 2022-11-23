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

  code:any;
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
      this.service.getAll().subscribe(response => {
        this.pulseras = response;
      })
      this.serviceP.getAll().subscribe(responseP => {
        this.productos = responseP;
      })
      this.serviceO.getAll().subscribe(responseO => {
        this.ordenes = responseO;
      })
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

  addOrden() {
    this.modalCtrl
    .create({
      component: OrdenesModalPage
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({ data, role }) => {
      if (role === 'created'){
        this.ordenes.push();
      }
    });
  }

  buscarPulsera(){
    console.log("Holii");
    this.service.get(this.id).subscribe(response => {
      this.pulsera = response;
      console.log(this.pulsera);
    });
  }

}
