import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Pulseras, PulserasService } from '../services/pulseras.service';

@Component({
  selector: 'app-new-pulseras',
  templateUrl: './new-pulseras.page.html',
  styleUrls: ['./new-pulseras.page.scss'],
})
export class NewPulserasPage implements OnInit {
  @Input() pulsera: Pulseras;
  isUpdate = false;
  data = {
    id_pulsera : ''
  };

  constructor(
    private modalCtrl : ModalController,
    private serviceP : PulserasService
  ) { }

  ngOnInit() {
    if (this.pulsera) {
      this.isUpdate = true;
      this.data = this.pulsera;
    }
  }

  closeModal(){
    this.modalCtrl.dismiss(null, 'closed');
  }

  onSubmit(form: NgForm){
    const pulsera = form.value;
    if(this.isUpdate){
      this.serviceP.update(pulsera, this.pulsera.id_pulsera).subscribe(() => {
        pulsera.id = this.pulsera.id_pulsera;
        this.modalCtrl.dismiss(pulsera, 'updated');
      });
    } else {
      this.serviceP.create(pulsera).subscribe(response => {
        this.modalCtrl.dismiss(response, 'created');
      }); 
    }
  }

}
