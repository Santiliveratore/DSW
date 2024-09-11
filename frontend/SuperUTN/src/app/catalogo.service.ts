import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  

  constructor(private http:HttpClient) { } 
  getProductos(){
    const url='http://localhost:3000/api/productos'
    return this.http.get<any>(url)}
}
