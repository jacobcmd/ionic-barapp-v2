import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Ordenes, OrdenesService } from '../services/ordenes.service';

@Component({
  selector: 'app-ordenes-modal',
  templateUrl: './ordenes-modal.page.html',
  styleUrls: ['./ordenes-modal.page.scss'],
})
export class OrdenesModalPage implements OnInit {
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
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
    if (this.ordenes) {
      this.isUpdate = true;
      this.data = this.ordenes;
    }
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
