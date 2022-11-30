import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router
  ) {
    this.validateToken();
  }

  validateToken(){
    const validateToken = localStorage.getItem('token');
    if (validateToken !== null && validateToken !== undefined) {
      this.router.navigateByUrl('/create');
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  closeSession(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se cerrará la presente sesión, tendrás que autenticarte nuevamente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        this.router.navigateByUrl('/home');
      }
    });
  } 
}


