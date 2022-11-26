import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Ordenes {
  id: string;
  id_pulsera: string;
  id_producto: string;
  cantidad: string;
  id_usuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private url = 'https://api-appbar-v2-production.up.railway.app/api/ordenes';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<[Ordenes]>(this.url);
  }

  get(id: string){
    return this.http.get<[Ordenes]>(this.url + '/' + id);
  }

  create(ordenes: Ordenes){
    return this.http.post(this.url, ordenes);
  }

  update(ordenes: Ordenes, id: string){
    return this.http.put(this.url + '/' + id, ordenes);
  }

  remove(id: number){
    return this.http.delete(this.url + '/' + id);
  }
}
