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

  obtenerCantidadProducto(productoId: string): number {
    const carrito = this.obtenerCarrito();
    const linea = carrito.find((item: any) => item.producto.id === productoId);
    return linea ? linea.cantidad : 0;
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
    const body = {
      lineas: lineas.map(linea => ({
        productoId: linea.producto.id,
        cantidad: linea.cantidad
      })),
      usuarioId: usuarioId
    };
    return this.http.post(this.url, body);
  }

  obtenerPedidosPorUsuario(usuarioId: number): Observable<any> {
    return this.http.get(`${this.url}/filtrar/${usuarioId}`);
  }

  obtenerPedidos(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  marcarComoEntregado(pedidoId: number) : Observable<any>{
    return this.http.put<any>(`${this.url}/${pedidoId}`, { estado: 'Entregado' });
  }

  eliminarPedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
