import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Pulseras {
  id: string;
  id_pulsera: string;
  total?: string;
  pagado?: string;
  id_usuario?: string;
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

  get(id_pulsera: string){
    return this.http.get<Pulseras>(this.url + '/' + id_pulsera);
  }

  create(pulseras: Pulseras){
    return this.http.post(this.url, pulseras);
  }

  update(pulseras: Pulseras, id_pulsera: string){
    console.log(pulseras);
    console.log(id_pulsera);
    return this.http.put(this.url + '/' + id_pulsera, pulseras);
  }

  remove(id_pulsera: string){
    return this.http.delete(this.url + '/' + id_pulsera);
  }
}
