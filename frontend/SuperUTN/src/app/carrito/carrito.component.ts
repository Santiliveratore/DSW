import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  eliminarDelCarrito(productoId: string) {
    this.carritoService.eliminarDelCarrito(productoId);
    this.carrito = this.carritoService.obtenerCarrito(); // Actualizar el carrito
  }

  limpiarCarrito() {
    this.carritoService.limpiarCarrito();
    this.carrito = [];
  }

  // Método para calcular el precio total del carrito
  calcularTotal(): number {
    let total = 0;
  
    // Recorremos el carrito y sumamos el precio por la cantidad
    this.carrito.forEach(item => {
     total += item.producto.precio * item.cantidad; // Multiplica el precio del producto por la cantidad
    });
  
    return total;
  }

  realizarPedido(){console.log('pedido realizado')}
}
