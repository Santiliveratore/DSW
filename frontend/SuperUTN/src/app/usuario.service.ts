import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import {jwtDecode} from "jwt-decode"




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<any>(null);
  apiUrl='http://localhost:3000/api/usuarios'
  private usuarioActual: any = null;

  constructor(private http:HttpClient) { }

  // METODO PARA REGISTRARSE
  crearUsuario(usuario: any): Observable<any> {
    usuario.rol='cliente'
    return this.http.post(this.apiUrl, usuario);
  }

  /// METODOS LOG IN

  // Método para iniciar sesión
  login(email: string, contraseña: string): Observable<any> {
    const loginData = { email, contraseña };
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  // Método para almacenar el token en el localStorage
  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.getUsuarioActual();
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Obtener usuario actual
  getUsuarioActual(): { usuario:any } | null {
    const token = this.getToken();
    if (token) {
      try {
        // Decodifica el token para obtener la información del usuario
        const decodedToken: any = jwtDecode(token);
        this.usuarioSubject.next(decodedToken);
        return decodedToken;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }

  getUsuarioObservable(): Observable<any> {
    return this.usuarioSubject.asObservable();  // Para que otros componentes puedan escuchar cambios
  }

  // Método para eliminar el token (logout)
  clearToken(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuario');
    this.usuarioActual = null;
    this.usuarioSubject.next(null);
  }
  
  // Verificar si hay sesión iniciada
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Verifica si sos Admin,Cliente o no estas logueado
  isAdmin():boolean|null{
   
    this.usuarioActual=this.getUsuarioActual();
    if(this.usuarioActual){
      if(this.usuarioActual.rol==='admin'){return true}
      if(this.usuarioActual.rol==='cliente'){return false}
    }
    return null
  }
  
}