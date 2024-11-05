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

    getProductosPorCategoria(categoria: string) {
      return this.http.get<any>(`${this.url}?categoria=${categoria}`);
    }

    getCategorias(){return this.http.get<any>('http://localhost:3000/api/categorias')}
    getTipos(){return this.http.get<any>('http://localhost:3000/api/tipo_productos')}

 
    eliminarProducto(id:string,foto:string): Observable<any>{
      if(this.usuarioService.isAdmin()){ //solo se puede eliminar si sos admin
        return this.http.delete(`${this.url}/${id}/${foto}`);
      }else {
        return throwError(() => new Error('No tienes permisos para eliminar el producto.'));
      }
    }  

    crearProducto(producto: any,im:File): Observable<any> {
      const formData = new FormData();
      formData.append('nombre', producto.nombre);
      formData.append('descripcion', producto.descripcion);
      formData.append('precio', producto.precio.toString());
      formData.append('categoria', producto.categoria.toString());
      formData.append('tipo', producto.tipo.toString());
      formData.append('foto', im); // Agrega la imagen al FormData
      return this.http.post(this.url, formData);
    }

    crearCategoria(categoria:any):Observable<any>{
        return this.http.post('http://localhost:3000/api/categorias', categoria);
    };
    

    getProducto(id: number): Observable<any> {
      return this.http.get<any>(`${this.url}/${id}`);
    }

    editProducto(id:number,producto:any,im:File|null): Observable<any>{


      const formData = new FormData();
      // Agregar los datos del producto al FormData
      formData.append('nombre', producto.value.nombre);
      formData.append('descripcion',producto.value.descripcion);
      if (im!=null) {
        formData.append('foto', im);
      }
      
      return this.http.put<any>(`${this.url}/${id}`, formData);
    };

}
