import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  usuario:any;

  constructor(private carritoService: CarritoService,private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
    this.usuario = this.usuarioService.getUsuarioActual();
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

  realizarPedido() {
    if (!this.usuario) {
      alert('Usuario no autenticado');
      return;
    }
    // Llamar al método del servicio para realizar el pedido
    this.carritoService.crearPedido(this.carrito,this.usuario.id).subscribe({
      next: (response) => {
        console.log('Pedido realizado exitosamente:', response);
        alert('Pedido realizado con éxito');
        this.limpiarCarrito(); // Limpiar el carrito después de realizar el pedido
      },
      error: (error) => {
        console.error('Error al realizar el pedido:', error);
        alert('Error al realizar el pedido, intenta nuevamente.');
      }
    });
  }
}
