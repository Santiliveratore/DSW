import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './config/config'; // Importa la variable global de configuración
import { HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private storageKey = 'carrito';
  private url = `${API_URL}/api/pedidos`; // URL base para pedidos

  constructor(private http: HttpClient,private UsuarioService: UsuarioService,) {}

  // Obtener el carrito desde localStorage
  obtenerCarrito() {
    const carrito = localStorage.getItem(this.storageKey);
    return carrito ? JSON.parse(carrito) : [];
  }

  // Obtener la cantidad de un producto en el carrito
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

  // Crear un pedido con autenticación
crearPedido(lineas: any[], usuarioId: number): Observable<any> {
  const body = {
    lineas: lineas.map(linea => ({
      productoId: linea.producto.id,
      cantidad: linea.cantidad,
    })),
    usuarioId: usuarioId,
  };

  // Obtener el token del servicio de usuario
  const token = this.UsuarioService.getToken();


  // Configurar los headers con el token
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.post(this.url, body, { headers });
}

  // Obtener pedidos por usuario con token en los headers
obtenerPedidosPorUsuario(usuarioId: number): Observable<any> {
   // Obtener el token del servicio de usuario
  const token = this.UsuarioService.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get(`${this.url}/filtrar/${usuarioId}`, { headers });
}


 // Obtener todos los pedidos con token en los headers
obtenerPedidos(): Observable<any> {
  const token = this.UsuarioService.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<any>(this.url, { headers });
}


  // Marcar pedido como entregado
  marcarComoEntregado(pedidoId: number): Observable<any> {
    const token = this.UsuarioService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.url}/${pedidoId}`, { estado: 'Entregado' },{ headers });
  }

  // Eliminar un pedido
  eliminarPedido(id: number): Observable<void> {
    const token = this.UsuarioService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.url}/${id}`,{ headers });
  }
}

