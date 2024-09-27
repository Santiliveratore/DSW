import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoService } from '../catalogo.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit  {
  productos:any=[]=[];
  usuario: any = null;

  constructor(private service:CatalogoService,private usuarioService: UsuarioService){}

  ngOnInit(): void{
   // Nos suscribimos a los cambios del usuario
   this.usuarioService.getUsuarioObservable().subscribe(usuario => {
    this.usuario = usuario;
  });
  // Comprobamos si ya existe un usuario logueado al cargar el componente
  this.usuario = this.usuarioService.getUsuarioActual();

  //Obtengo lista de productos
  this.service.getProductos().subscribe(response=>this.productos=response.data);
    
  }

  isAdmin(): boolean|null {
    return this.usuarioService.isAdmin();
  }

  eliminarProducto(productoId: string,fotoUrl:string): void {
    // Mostrar alerta de confirmación
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
  
    if (confirmacion) {
      // Si el usuario confirma, proceder con la eliminación
      this.service.eliminarProducto(productoId,fotoUrl).subscribe({
        next: (response) => {
          console.log('Producto eliminado', response);
          // Eliminar el producto del arreglo local
          this.productos = this.productos.filter((p: any) => p.id !== productoId);
        },
        error: (err) => {
          console.error('Error eliminando el producto:', err);
        }
      });
    }
  }

}
