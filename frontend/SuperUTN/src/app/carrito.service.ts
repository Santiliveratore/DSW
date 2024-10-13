import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {

  private storageKey = 'carrito';

  constructor() {}

  // Obtener el carrito desde localStorage
  obtenerCarrito() {
    const carrito = localStorage.getItem(this.storageKey);
    return carrito ? JSON.parse(carrito) : [];
  }

  // Guardar el carrito en localStorage
  guardarCarrito(carrito: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(carrito));
  }

  // Agregar una línea de pedido al carrito
  agregarAlCarrito(producto: any, cantidad: number) {
    const carrito = this.obtenerCarrito();
    const lineaExistente = carrito.find((item: any) => item.producto.id === producto.id);

    if (lineaExistente) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      lineaExistente.cantidad += cantidad;
    } else {
      // Si no, agrega una nueva línea de pedido
      carrito.push({ producto, cantidad });
    }

    // Guardar el carrito actualizado
    this.guardarCarrito(carrito);
  }

  // Eliminar una línea de pedido del carrito
  eliminarDelCarrito(productoId: string) {
    let carrito = this.obtenerCarrito();
    carrito = carrito.filter((item: any) => item.producto.id !== productoId);

    this.guardarCarrito(carrito);
  }

  // Limpiar el carrito (vaciarlo)
  limpiarCarrito() {
    localStorage.removeItem(this.storageKey);
  }
}
