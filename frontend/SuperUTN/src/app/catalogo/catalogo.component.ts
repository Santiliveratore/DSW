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

  

}
