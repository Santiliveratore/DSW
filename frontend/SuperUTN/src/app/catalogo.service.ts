import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

   url='http://localhost:3000/api/productos'

  constructor(private http:HttpClient, private usuarioService: UsuarioService) { } 
  getProductos(){
    
    return this.http.get<any>(this.url)}

 
    eliminarProducto(id:string): Observable<any>{
      if(this.usuarioService.isAdmin()){ //solo se puede eliminar si sos admin
        return this.http.delete(`${this.url}/${id}`);
      }else {
        return throwError(() => new Error('No tienes permisos para eliminar el producto.'));
      }
    }  
}
