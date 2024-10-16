import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {

  private storageKey = 'carrito';
  private url='http://localhost:3000/api/pedidos'

  constructor(private http:HttpClient) {}

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

  crearPedido(lineas: any[], usuarioId: number): Observable<any> {
    // Construir el cuerpo de la solicitud con las líneas del pedido y el ID del usuario
    const body = {
      lineas: lineas.map(linea => ({
        productoId: linea.producto.id,
        cantidad: linea.cantidad
      })),
      usuarioId: usuarioId
    };

    // Enviar el POST al endpoint de crear pedido
    return this.http.post(this.url, body);
  }

  obtenerPedidosPorUsuario(usuarioId: number): Observable<any> {
    return this.http.get(`${this.url}/filtrar/${usuarioId}`);
  }
}
