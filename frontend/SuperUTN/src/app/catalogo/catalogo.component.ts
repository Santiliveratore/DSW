import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoService } from '../catalogo.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit  {
  productos:any=[]=[];
  constructor(private service:CatalogoService){}

  ngOnInit(): void{
    console.log('CatalogoService inyectado correctamente');
   this.service.getProductos().subscribe(response=>this.productos=response.data);
    
  }

  

}
