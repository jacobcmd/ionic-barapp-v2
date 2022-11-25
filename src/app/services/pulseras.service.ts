import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as internal from 'assert';

export interface Pulseras {
  id: string;
  pagado: string;
  total: string;
  id_usuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class PulserasService {
private url = 'https://api-appbar-v2-production.up.railway.app/api/pulseras';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<[Pulseras]>(this.url);
  }

  get(id: string){
    return this.http.get<Pulseras>(this.url + '/' + id);
  }

  create(pulseras: Pulseras){
    return this.http.post(this.url, pulseras);
  }

  update(pulseras: Pulseras, id: string){
    console.log(pulseras);
    console.log(id);
    return this.http.put(this.url + '/' + id, pulseras);
  }

  remove(id: string){
    return this.http.delete(this.url + '/' + id);
  }
}
