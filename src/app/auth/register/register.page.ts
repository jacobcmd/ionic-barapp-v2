import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {

  user: User = {
    username: "",
    password: "",
    firstname: "",
    lastname: ""
  };
  
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  form = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  async onSubmit(){
    if (!this.functionToValitePasswordFormat(this.user.password)) {
      this.validatingPassword();
    } else {
      const loading = await this.loadingCtrl.create({ message: 'Registering...' });
      await loading.present();
      this.authService.register(this.user).subscribe(
        // If success
        async () => {
          const toast = await this.toastCtrl.create({ message: 'User Created', duration: 2000, color: 'dark' });
          await toast.present();
          loading.dismiss();
          this.form.reset();
        },
        // If there is an error
        async () => {
          const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
          loading.dismiss();
          await alert.present();
        }
      );
    }
  }

  validatingPassword(){
    let showMessage = document.getElementById("wrong-password"); //variable to show a message in case there was an error
    Swal.fire({
      title: "Error", 
      text: "Contraseña inválida, por favor ingrese una contraseña válida", 
      icon: "error", 
      heightAuto: false
    });
    showMessage.innerHTML = `
          <ul>
              <li>Mínimo 8 caracteres</li>
              <li>Máximo 16 caracteres</li>
              <li>Al menos una letra mayúscula</li>
              <li> Al menos una letra mínuscula</li>
              <li>Al menos un número</li>
              <li>Al menos 1 caracter especial que esté entre los siguientes @$?¡!*#/-_</li>
          </ul>
    `;
    setTimeout(() => {
      showMessage.innerHTML = ``;
    }, 10000);
  }

  functionToValitePasswordFormat(password) {
    //let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    let passRegex = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡!*#/\-_]){1})\S{8,16}$/;
    /*
        Minimo 8 caracteres
        Maximo 16 caracteres
        Al menos una letra mayúscula
        Al menos una letra minuscula
        Al menos un dígito
        Al menos 1 caracter especial
    */
    if (passRegex.test(password)) {
        return true;
    } else {
        return false;
    }
  }

}
