import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Productos {
  id: string;
  nombre: string;
  precio: string;
  disponible: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  private url = 'https://api-appbar-v2-production.up.railway.app/api/productos';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<[Productos]>(this.url);
  }

  get(id: string){
    return this.http.get<Productos>(this.url + '/' + id);
  }

  create(productos: Productos){
    return this.http.post(this.url, productos);
  }

  update(productos: Productos, id: string){
    return this.http.put(this.url + '/' + id, productos);
  }

  remove(id: string){
    return this.http.delete(this.url + '/' + id);
  }
}


